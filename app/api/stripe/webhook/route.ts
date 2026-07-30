// Node.js runtime obligatoire : Edge Runtime ne supporte pas req.text() avec
// les contraintes de signature Stripe (raw body requis pour constructEvent).
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Clients initialisés au niveau module (réutilisés entre invocations Lambda)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service_role, PAS anon
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Fetch + filter côté JS : contourne PGRST125 (PostgREST v12+ refuse
// .filter('data->>field') quand la clé n'existe dans aucune ligne).
// Acceptable en early stage (peu de comptes). À migrer vers RPC PostgreSQL
// custom quand > 1000 comptes.
async function findProfileByEmail(email: string) {
  const { data: profiles, error } = await supabase
    .from('profiles_eldaana')
    .select('user_id, data')

  if (error) {
    console.error('[stripe-webhook] error fetching profiles:', error)
    return null
  }

  if (!profiles || profiles.length === 0) {
    console.log('[stripe-webhook] profiles table is empty')
    return null
  }

  const emailFields = ['email', 'google_email', 'fb_email', 'li_email']
  const match = profiles.find(
    p => p.data && emailFields.some(field => p.data[field] === email)
  )

  return match || null
}

async function findProfileByStripeCustomerId(customerId: string) {
  const { data: profiles, error } = await supabase
    .from('profiles_eldaana')
    .select('user_id, data')

  if (error) {
    console.error('[stripe-webhook] error fetching profiles:', error)
    return null
  }

  if (!profiles) return null
  return profiles.find(p => p.data?.stripe_customer_id === customerId) || null
}

export async function POST(req: NextRequest) {
  // 1. Body brut + signature (req.text() préserve les bytes exacts, indispensable)
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  // 2. Vérification signature (anti-spoofing)
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] Invalid signature:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // 3. Idempotence — rejeter les events déjà traités
  const { data: alreadyProcessed } = await supabase
    .from('stripe_events_processed')
    .select('event_id')
    .eq('event_id', event.id)
    .maybeSingle()

  if (alreadyProcessed) {
    return NextResponse.json({ received: true, idempotent: true })
  }

  // 4. Dispatch selon le type
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      default:
        // Types non écoutés — ack sans traitement
        break
    }

    // 5. Marquer l'event comme traité
    await supabase.from('stripe_events_processed').insert({
      event_id: event.id,
      event_type: event.type,
      processed_at: new Date().toISOString(),
    })

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[stripe-webhook] Processing error:', err)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}

// ── checkout.session.completed ─────────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email ?? session.customer_email
  const tier = session.metadata?.tier         // "audio_text" | "conversation"
  const customerId = session.customer as string

  if (!email || !tier) {
    throw new Error(
      `[stripe-webhook] checkout.session.completed — champs manquants : email=${email}, tier=${tier}`
    )
  }

  console.log(`[stripe-webhook] checkout completed — email=${email}, tier=${tier}`)
  console.log('[stripe-webhook] searching profile for email:', email)

  const existing = await findProfileByEmail(email)
  console.log('[stripe-webhook] found profile:', existing ? existing.user_id : 'none')

  if (existing) {
    console.log('[stripe-webhook] merging tier into existing profile')
    const updatedData = {
      ...existing.data,
      conversation_status: 'active',
      stripe_customer_id: customerId,
      tier,
      tier_since: new Date().toISOString(),
    }
    const { error } = await supabase
      .from('profiles_eldaana')
      .update({ data: updatedData, updated_at: new Date().toISOString() })
      .eq('user_id', existing.user_id)
    if (error) throw error
    console.log(`[stripe-webhook] profil mis à jour — user_id=${existing.user_id}`)
  } else {
    console.log('[stripe-webhook] creating new profile')
    const newUserId = crypto.randomUUID()
    const newData = {
      user_id: newUserId,
      email,
      conversation_status: 'active',
      stripe_customer_id: customerId,
      tier,
      tier_since: new Date().toISOString(),
    }
    const { error } = await supabase
      .from('profiles_eldaana')
      .insert({
        user_id: newUserId,
        data: newData,
        updated_at: new Date().toISOString(),
      })
    if (error) throw error
    console.log(`[stripe-webhook] nouveau profil créé — user_id=${newUserId}`)
  }
}

// ── customer.subscription.deleted ─────────────────────────────────────────

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  console.log('[stripe-webhook] subscription deleted — searching customer:', customerId)
  const profile = await findProfileByStripeCustomerId(customerId)

  if (!profile) {
    console.warn(
      `[stripe-webhook] subscription.deleted — aucun profil pour customer=${customerId}`
    )
    return
  }

  const updatedData = {
    ...profile.data,
    conversation_status: 'inactive',
    tier_ended: new Date().toISOString(),
  }
  const { error } = await supabase
    .from('profiles_eldaana')
    .update({ data: updatedData, updated_at: new Date().toISOString() })
    .eq('user_id', profile.user_id)
  if (error) throw error
  console.log(
    `[stripe-webhook] abonnement annulé — user_id=${profile.user_id}, customer=${customerId}`
  )
}
