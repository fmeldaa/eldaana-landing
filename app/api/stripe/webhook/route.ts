// Node.js runtime obligatoire : Edge Runtime ne supporte pas req.text() avec
// les contraintes de signature Stripe (raw body requis pour constructEvent).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import {
  sendPaymentConfirmEmail,
  sendLegacyTierRefundEmail,
  sendPaymentFailedEmail,
  sendPaymentRestoredEmail,
} from '@/app/lib/email'
import { isLegacyAudioTextSession, refuseLegacyAudioText } from '@/app/lib/legacyTier'
import {
  PORTAL_LOGIN_URL,
  activationFields,
  invoiceSubscriptionId,
  onPaymentFailed,
  onPaymentSucceeded,
  onSubscriptionDeleted,
  type DunningDecision,
  type ProfileData,
} from '@/app/lib/dunning'

// Lazy init : évite le crash au build Next.js quand les env vars ne sont pas
// définies au moment de la collecte des pages statiques.
let _stripe: Stripe | null = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStripe(): any {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  return _stripe
}

let _supabase: ReturnType<typeof createClient> | null = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSupabase(): any {
  if (!_supabase)
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // service_role, PAS anon
    )
  return _supabase
}

// RPC PostgreSQL : évite PGRST125 — le SDK Supabase JS génère des URLs mal
// encodées pour les chemins JSONB (data->>field). Via .rpc(), le SDK envoie
// juste un nom de fonction + params JSON, sans construction d'URL JSONB.
async function findProfileByEmail(email: string) {
  console.log('[stripe-webhook] rpc find_profile_by_email:', email)
  const { data, error } = await getSupabase().rpc('find_profile_by_email', { p_email: email })
  if (error) {
    console.error('[stripe-webhook] rpc find_profile_by_email error:', error)
    return null
  }
  return data && data.length > 0 ? data[0] : null
}

async function findProfileByStripeCustomerId(customerId: string) {
  console.log('[stripe-webhook] rpc find_profile_by_stripe_customer:', customerId)
  const { data, error } = await getSupabase().rpc('find_profile_by_stripe_customer', { p_customer_id: customerId })
  if (error) {
    console.error('[stripe-webhook] rpc find_profile_by_stripe_customer error:', error)
    return null
  }
  return data && data.length > 0 ? data[0] : null
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
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[stripe-webhook] Invalid signature:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // 3. Idempotence — rejeter les events déjà traités
  const { data: alreadyProcessed } = await getSupabase()
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
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      default:
        // Types non écoutés — ack sans traitement
        break
    }

    // 5. Marquer l'event comme traité
    await getSupabase().from('stripe_events_processed').insert({
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
  // ── Garde-fou : ancien tier Audio & Texte (9,99 €), retiré de l'offre ──────
  // Refus silencieux : pas de profil créé ni activé, abonnement annulé, paiement
  // remboursé, email d'explication. L'event est marqué traité par l'appelant.
  // Une session Conversation (metadata 'conversation', 29,99 €) n'est jamais concernée.
  if (isLegacyAudioTextSession(session)) {
    await refuseLegacyAudioText(session, { stripe: getStripe(), sendEmail: sendLegacyTierRefundEmail })
    return
  }

  const email = session.customer_details?.email ?? session.customer_email
  const tier = session.metadata?.tier         // "conversation"
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

  let resolvedUserId: string

  if (existing) {
    console.log('[stripe-webhook] merging tier into existing profile')
    const updatedData = {
      ...existing.data,
      ...activationFields(tier),
      stripe_customer_id: customerId,
      tier_since: new Date().toISOString(),
      onboarding_complete: true,
    }
    const { error } = await getSupabase()
      .from('profiles_eldaana')
      .update({ data: updatedData, updated_at: new Date().toISOString() })
      .eq('user_id', existing.user_id)
    if (error) throw error
    resolvedUserId = existing.user_id
    console.log(`[stripe-webhook] profil mis à jour — user_id=${resolvedUserId}`)
  } else {
    console.log('[stripe-webhook] creating new profile')
    resolvedUserId = uuidv4()
    const newData = {
      user_id: resolvedUserId,
      email,
      ...activationFields(tier),
      stripe_customer_id: customerId,
      tier_since: new Date().toISOString(),
      onboarding_complete: true,
    }
    const { error } = await getSupabase()
      .from('profiles_eldaana')
      .insert({
        user_id: resolvedUserId,
        data: newData,
        updated_at: new Date().toISOString(),
      })
    if (error) throw error
    console.log(`[stripe-webhook] nouveau profil créé — user_id=${resolvedUserId}`)
  }

  // Envoyer l'email de confirmation paiement avec magic link inclus
  try {
    const magicToken = uuidv4()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()
    await getSupabase().from('magic_links').insert({
      token: magicToken,
      user_id: resolvedUserId,
      email,
      expires_at: expiresAt,
    })
    const magicUrl = `https://eldaana.com/api/auth/magic?token=${magicToken}`
    const lang: 'fr' | 'en' = session.locale?.startsWith('en') ? 'en' : 'fr'
    const tierLabel = 'Conversation'
    await sendPaymentConfirmEmail(email, magicUrl, tierLabel, lang)
    console.log(`[stripe-webhook] email confirmation envoyé — email=${email}`)
  } catch (err) {
    // Non bloquant : l'email peut échouer sans invalider le paiement
    console.error('[stripe-webhook] email confirmation error:', err)
  }
}

// ── Dunning : helpers communs ─────────────────────────────────────────────

function idOf(v: string | { id: string } | null | undefined): string | null {
  if (!v) return null
  return typeof v === 'string' ? v : v.id
}

function profileLang(data: ProfileData): 'fr' | 'en' {
  const lang = String(data?.lang ?? data?.language ?? 'fr').toLowerCase()
  return lang.startsWith('en') ? 'en' : 'fr'
}

function profileEmail(data: ProfileData, fallback?: string | null): string | null {
  return fallback || data?.email || data?.google_email || null
}

async function applyDecision(userId: string, decision: DunningDecision, label: string) {
  console.log(`[stripe-webhook] ${label} — user_id=${userId} : ${decision.reason}`)
  if (!decision.changed) return
  const { error } = await getSupabase()
    .from('profiles_eldaana')
    .update({ data: decision.data, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
  if (error) throw error
}

// ── invoice.payment_failed ─────────────────────────────────────────────────

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoiceSubscriptionId(invoice)
  const customerId = idOf(invoice.customer as string | { id: string } | null)
  if (!subscriptionId || !customerId) {
    console.log(`[stripe-webhook] payment_failed — facture ${invoice.id} hors abonnement, ignoree`)
    return
  }
  // Statut réel de l'abonnement, lu AVANT le profil (fenêtre d'écriture la plus courte)
  const subscription = await getStripe().subscriptions.retrieve(subscriptionId)
  const profile = await findProfileByStripeCustomerId(customerId)
  if (!profile) {
    console.warn(`[stripe-webhook] payment_failed — aucun profil pour customer=${customerId}`)
    return
  }
  const decision = onPaymentFailed(profile.data, {
    invoiceId: invoice.id as string,
    subscriptionStatus: subscription?.status ?? null,
    nowIso: new Date().toISOString(),
  })
  await applyDecision(profile.user_id, decision, 'payment_failed')
  if (decision.email === 'payment_failed') {
    const email = profileEmail(profile.data, invoice.customer_email)
    if (!email) return
    try {
      await sendPaymentFailedEmail(email, PORTAL_LOGIN_URL, profileLang(profile.data))
      console.log(`[stripe-webhook] email paiement echoue envoye — user_id=${profile.user_id}`)
    } catch (err) {
      console.error('[stripe-webhook] email paiement echoue impossible:', err)
    }
  }
}

// ── invoice.payment_succeeded ──────────────────────────────────────────────

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoiceSubscriptionId(invoice)
  const customerId = idOf(invoice.customer as string | { id: string } | null)
  if (!subscriptionId || !customerId) return
  const profile = await findProfileByStripeCustomerId(customerId)
  if (!profile) return // premier paiement : le profil est créé par checkout.session.completed
  const decision = onPaymentSucceeded(profile.data, { nowIso: new Date().toISOString() })
  await applyDecision(profile.user_id, decision, 'payment_succeeded')
  if (decision.email === 'payment_restored') {
    const email = profileEmail(profile.data, invoice.customer_email)
    if (!email) return
    try {
      await sendPaymentRestoredEmail(email, profileLang(profile.data))
      console.log(`[stripe-webhook] email service retabli envoye — user_id=${profile.user_id}`)
    } catch (err) {
      console.error('[stripe-webhook] email service retabli impossible:', err)
    }
  }
}

// ── customer.subscription.deleted ─────────────────────────────────────────

const LIVE_SUBSCRIPTION_STATUSES = new Set(['active', 'trialing', 'past_due', 'unpaid'])

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  console.log('[stripe-webhook] subscription deleted — searching customer:', customerId)
  // Un autre abonnement encore vivant chez ce client ? Alors on ne coupe rien.
  const others = await getStripe().subscriptions.list({ customer: customerId, status: 'all', limit: 10 })
  const otherLiveSubscription = (others?.data ?? []).some(
    (s: { id: string; status: string }) => s.id !== subscription.id && LIVE_SUBSCRIPTION_STATUSES.has(s.status),
  )
  const profile = await findProfileByStripeCustomerId(customerId)

  if (!profile) {
    console.warn(
      `[stripe-webhook] subscription.deleted — aucun profil pour customer=${customerId}`
    )
    return
  }

  const decision = onSubscriptionDeleted(profile.data, {
    otherLiveSubscription,
    nowIso: new Date().toISOString(),
  })
  await applyDecision(profile.user_id, decision, 'subscription.deleted')
}
