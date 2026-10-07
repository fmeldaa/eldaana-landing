// Garde-fou : ancien tier « Audio & Texte » (9,99 €/mois), retiré de l'offre.
// Un paiement qui arrive encore par un vieux lien n'active rien : l'abonnement est
// annulé, le paiement remboursé, et la personne prévenue par email.
// Logique pure + dépendances injectées pour être testable sans Stripe ni Supabase.

export const LEGACY_AUDIO_TEXT_AMOUNT = 999 // 9,99 € en centimes
export const CURRENT_OFFER_URL = 'https://eldaana.com/pricing'

export interface LegacySessionLike {
  id?: string
  metadata?: { tier?: string | null } | null
  amount_total?: number | null
  currency?: string | null
  customer?: string | { id: string } | null
  customer_details?: { email?: string | null } | null
  customer_email?: string | null
  subscription?: string | { id: string } | null
  locale?: string | null
}

/**
 * Vrai uniquement pour une session de l'ancien tier audio_text :
 *  - metadata.tier === 'audio_text' (checkout créé par l'app), ou
 *  - sans metadata.tier, montant exactement 9,99 € (Payment Link du dashboard).
 * Une session Conversation (metadata 'conversation', 29,99 €) n'est jamais concernée.
 */
export function isLegacyAudioTextSession(session: LegacySessionLike): boolean {
  const tier = session.metadata?.tier ?? null
  if (tier === 'conversation') return false
  if (tier === 'audio_text') return true
  if (tier) return false // tout autre tier explicite : pas notre affaire
  const currency = (session.currency ?? 'eur').toLowerCase()
  return session.amount_total === LEGACY_AUDIO_TEXT_AMOUNT && currency === 'eur'
}

export interface LegacyRefundDeps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stripe: any
  sendEmail: (email: string, lang: 'fr' | 'en') => Promise<unknown>
  log?: (msg: string) => void
  logError?: (msg: string, err: unknown) => void
}

export interface LegacyRefundResult {
  cancelled: boolean
  refunded: boolean
  emailed: boolean
  refundId: string | null
}

function idOf(v: string | { id: string } | null | undefined): string | null {
  if (!v) return null
  return typeof v === 'string' ? v : v.id
}

/**
 * Refus silencieux d'un paiement audio_text : annule l'abonnement, rembourse le
 * paiement de 9,99 € (dernier PaymentIntent réussi du client pour ce montant),
 * prévient la personne. Aucune écriture dans profiles_eldaana.
 */
export async function refuseLegacyAudioText(
  session: LegacySessionLike,
  deps: LegacyRefundDeps,
): Promise<LegacyRefundResult> {
  const log = deps.log ?? console.log
  const logError = deps.logError ?? ((m, e) => console.error(m, e))
  const email = session.customer_details?.email ?? session.customer_email ?? null
  const lang: 'fr' | 'en' = session.locale?.startsWith('en') ? 'en' : 'fr'
  const customerId = idOf(session.customer)
  const subscriptionId = idOf(session.subscription)
  const result: LegacyRefundResult = { cancelled: false, refunded: false, emailed: false, refundId: null }

  log(`[stripe-webhook] ancien tier audio_text refuse — session=${session.id} customer=${customerId} email=${email}`)

  // 1. Annuler l'abonnement : aucun prélèvement futur
  if (subscriptionId) {
    try {
      await deps.stripe.subscriptions.cancel(subscriptionId)
      result.cancelled = true
      log(`[stripe-webhook] abonnement audio_text annule — ${subscriptionId}`)
    } catch (err) {
      logError('[stripe-webhook] annulation abonnement audio_text impossible:', err)
    }
  }

  // 2. Rembourser le paiement de 9,99 € (PaymentIntent réussi le plus récent de ce montant)
  if (customerId) {
    try {
      const intents = await deps.stripe.paymentIntents.list({ customer: customerId, limit: 5 })
      const target = (intents?.data ?? []).find(
        (pi: { amount: number; status: string }) =>
          pi.amount === LEGACY_AUDIO_TEXT_AMOUNT && pi.status === 'succeeded',
      )
      if (target) {
        const refund = await deps.stripe.refunds.create({ payment_intent: target.id })
        result.refunded = true
        result.refundId = refund?.id ?? null
        log(`[stripe-webhook] paiement audio_text rembourse — refund=${result.refundId} pi=${target.id}`)
      } else {
        log('[stripe-webhook] aucun PaymentIntent 9,99 € reussi a rembourser (paiement peut-etre differe)')
      }
    } catch (err) {
      logError('[stripe-webhook] remboursement audio_text impossible:', err)
    }
  }

  // 3. Prévenir la personne (non bloquant)
  if (email) {
    try {
      await deps.sendEmail(email, lang)
      result.emailed = true
    } catch (err) {
      logError('[stripe-webhook] email remboursement audio_text impossible:', err)
    }
  }

  return result
}
