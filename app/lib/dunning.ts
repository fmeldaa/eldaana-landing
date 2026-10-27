// Dunning flow : dégradation progressive quand un paiement d'abonnement échoue.
//
// Champs du profil (JSONB `data` de profiles_eldaana) :
//   tier                   tier payé contractuellement ('conversation' | 'text')
//   effective_tier         tier réellement appliqué par l'app ('conversation' | 'text')
//   payment_status         'active' | 'past_due' | 'cancelled'
//   last_failed_invoice_id dernière facture en échec déjà traitée (dédoublonnage)
//   blocking_modal_pending modal « abonnement annulé » à afficher à la prochaine connexion
//
// Logique pure, sans Stripe ni Supabase ni Resend : chaque fonction reçoit le profil et
// les faits Stripe utiles, et rend le nouveau profil + l'email éventuel à envoyer.
// Idempotence à deux niveaux : event.id dans route.ts (rejeu d'un même événement), et ici
// par facture et par état (Stripe émet un nouvel événement à chaque relance de paiement).

export const PORTAL_LOGIN_URL = 'https://billing.stripe.com/p/login/9B69AMgVO36k8Ka2zvdjO00'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProfileData = Record<string, any>

export type DunningEmail = 'payment_failed' | 'payment_restored' | null

export interface DunningDecision {
  changed: boolean
  data: ProfileData
  email: DunningEmail
  reason: string
}

const DEGRADED_STATUSES = new Set(['past_due', 'unpaid'])
const FREE_TIERS = new Set(['text', 'discovery'])

function unchanged(data: ProfileData, reason: string): DunningDecision {
  return { changed: false, data, email: null, reason }
}

/** Tier payé à restaurer : le seul tier payant est Conversation. */
export function paidTier(data: ProfileData): string {
  const tier = data?.tier
  return tier && !FREE_TIERS.has(tier) ? tier : 'conversation'
}

/** Id d'abonnement d'une facture, quel que soit le format de l'API Stripe. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function invoiceSubscriptionId(invoice: any): string | null {
  const v =
    invoice?.parent?.subscription_details?.subscription ?? // API Stripe 2025-03 et suivantes
    invoice?.subscription ??                               // anciennes versions de l'API
    null
  if (!v) return null
  return typeof v === 'string' ? v : v.id ?? null
}

/** La personne avait-elle vraiment un abonnement Conversation ? */
export function wasPaying(data: ProfileData): boolean {
  return (
    data?.effective_tier === 'conversation' ||
    data?.conversation_status === 'active' ||
    data?.tier === 'conversation' ||
    data?.payment_status === 'past_due'
  )
}

/**
 * invoice.payment_failed : passage en mode texte, statut past_due.
 * - ignoré si Stripe ne confirme pas past_due/unpaid (événement en retard, abonnement
 *   déjà réglé ou déjà annulé) ;
 * - ignoré si cette facture a déjà été traitée (relances Stripe successives) ;
 * - un email par facture en échec, jamais un par relance.
 */
export function onPaymentFailed(
  data: ProfileData,
  facts: { invoiceId: string; subscriptionStatus: string | null; nowIso: string },
): DunningDecision {
  if (!facts.subscriptionStatus || !DEGRADED_STATUSES.has(facts.subscriptionStatus)) {
    return unchanged(data, `abonnement ${facts.subscriptionStatus ?? 'inconnu'}, pas de degradation`)
  }
  if (data?.payment_status === 'past_due' && data?.last_failed_invoice_id === facts.invoiceId) {
    return unchanged(data, 'facture deja traitee')
  }
  const next: ProfileData = {
    ...data,
    tier: paidTier(data),
    effective_tier: 'text',
    payment_status: 'past_due',
    last_failed_invoice_id: facts.invoiceId,
    payment_failed_at: facts.nowIso,
  }
  return { changed: true, data: next, email: 'payment_failed', reason: 'degradation en mode texte' }
}

/**
 * invoice.payment_succeeded : n'agit qu'après un échec (sinon chaque renouvellement
 * mensuel enverrait un email). Restaure le tier payé.
 */
export function onPaymentSucceeded(
  data: ProfileData,
  facts: { nowIso: string },
): DunningDecision {
  if (data?.payment_status !== 'past_due') {
    return unchanged(data, `statut ${data?.payment_status ?? 'absent'}, rien a restaurer`)
  }
  const tier = paidTier(data)
  const next: ProfileData = {
    ...data,
    tier,
    effective_tier: tier,
    payment_status: 'active',
    conversation_status: 'active',
    payment_restored_at: facts.nowIso,
  }
  return { changed: true, data: next, email: 'payment_restored', reason: 'service restaure' }
}

/**
 * customer.subscription.deleted : bascule contractuelle en mode texte.
 * - ignoré si le client garde un autre abonnement vivant ;
 * - modal à la prochaine connexion seulement si la personne payait vraiment
 *   (pas pour un ancien paiement audio_text remboursé).
 */
export function onSubscriptionDeleted(
  data: ProfileData,
  facts: { otherLiveSubscription: boolean; nowIso: string },
): DunningDecision {
  if (facts.otherLiveSubscription) {
    return unchanged(data, 'un autre abonnement est encore actif')
  }
  if (data?.payment_status === 'cancelled' && data?.effective_tier === 'text') {
    return unchanged(data, 'annulation deja traitee')
  }
  const next: ProfileData = {
    ...data,
    conversation_status: 'inactive',
    tier_ended: facts.nowIso,
    tier: 'text',
    effective_tier: 'text',
    payment_status: 'cancelled',
    blocking_modal_pending: wasPaying(data) ? true : Boolean(data?.blocking_modal_pending),
  }
  return { changed: true, data: next, email: null, reason: 'abonnement annule' }
}

/** Champs à poser à l'activation d'un abonnement (checkout réussi, y compris réabonnement). */
export function activationFields(tier: string): ProfileData {
  return {
    tier,
    effective_tier: tier,
    payment_status: 'active',
    conversation_status: 'active',
    blocking_modal_pending: false,
  }
}
