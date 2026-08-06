export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import { sendMagicLinkEmail } from '@/app/lib/email'

// Lazy : évite le crash au build quand les env vars ne sont pas définies localement.
// Retourné en `any` : pas de types Supabase générés pour ce projet.
let _supabase: ReturnType<typeof createClient> | null = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSupabase(): any {
  if (!_supabase) _supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  return _supabase
}

// ── POST — Demander un magic link ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { email, lang = 'fr' } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  }

  const normalizedEmail = email.trim().toLowerCase()

  // Rate limiting : max 3 demandes par email par heure
  const { data: recent } = await getSupabase()
    .from('magic_links')
    .select('created_at')
    .eq('email', normalizedEmail)
    .gte('created_at', new Date(Date.now() - 3600000).toISOString())

  if (recent && recent.length >= 3) {
    const message =
      lang === 'fr'
        ? 'Trop de demandes. Attends quelques minutes.'
        : 'Too many requests. Please wait a few minutes.'
    return NextResponse.json({ message }, { status: 429 })
  }

  // Chercher le profil via RPC (évite PGRST125)
  const { data: profiles } = await getSupabase().rpc('find_profile_by_email', {
    p_email: normalizedEmail,
  })
  const profile = profiles && profiles.length > 0 ? profiles[0] : null

  // Anti-énumération : répondre 200 même si le compte n'existe pas
  if (!profile) {
    return NextResponse.json({ sent: false })
  }

  // Générer le token et l'insérer dans magic_links
  const { v4: uuidv4 } = await import('uuid')
  const token = uuidv4()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

  const { error: insertError } = await getSupabase().from('magic_links').insert({
    token,
    user_id: profile.user_id,
    email: normalizedEmail,
    expires_at: expiresAt,
  })

  if (insertError) {
    console.error('[magic-link] insert error:', insertError)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }

  const magicUrl = `https://eldaana.com/api/auth/magic?token=${token}`
  const resolvedLang: 'fr' | 'en' = lang === 'en' ? 'en' : 'fr'

  try {
    await sendMagicLinkEmail(normalizedEmail, magicUrl, resolvedLang)
  } catch (err) {
    console.error('[magic-link] email send error:', err)
    // On ne révèle pas l'erreur pour respecter l'anti-énumération
  }

  return NextResponse.json({ sent: true })
}

// ── GET — Consommer le token (clic depuis l'email) ────────────────────────────

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/auth/expired', req.url))
  }

  // Chercher le token dans magic_links
  const { data: link, error } = await getSupabase()
    .from('magic_links')
    .select('token, user_id, email, expires_at, used_at')
    .eq('token', token)
    .maybeSingle()

  if (error || !link) {
    return NextResponse.redirect(new URL('/auth/expired', req.url))
  }

  // Expiré (vérifier avant used_at car un token expiré + used reste expired)
  if (new Date(link.expires_at) < new Date()) {
    return NextResponse.redirect(new URL('/auth/expired', req.url))
  }

  // Token déjà utilisé : grace period 60 s pour absorber les pré-scans Gmail / antivirus.
  // Ces scanners font un GET automatique quelques secondes après réception de l'email,
  // avant même que l'utilisateur clique. Sans cette logique, le token serait consommé
  // par le scanner et le vrai clic atterrirait sur /auth/used.
  if (link.used_at) {
    const secondsSinceUsed = (Date.now() - new Date(link.used_at).getTime()) / 1000
    if (secondsSinceUsed >= 60) {
      // Vraie double utilisation après la grace period → refus
      return NextResponse.redirect(new URL('/auth/used', req.url))
    }
    // Dans les 60 s : pré-scan détecté, on re-génère une session pour le vrai clic
    console.log(`[magic] pre-scan grace (${Math.round(secondsSinceUsed)}s), re-issuing session`)
  } else {
    // Premier GET : marquer comme utilisé
    await getSupabase()
      .from('magic_links')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token)
  }

  // Générer un session JWT court terme (5 min)
  const sessionToken = jwt.sign(
    { user_id: link.user_id, email: link.email },
    process.env.JWT_SECRET!,
    { expiresIn: '5m' }
  )

  // Rediriger vers Streamlit avec le token en param
  const streamlitUrl = new URL('https://eldaana.streamlit.app/')
  streamlitUrl.searchParams.set('session', sessionToken)

  return NextResponse.redirect(streamlitUrl)
}
