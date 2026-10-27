// Banc du dunning flow (logique pure). Lancer : node --test tests/
// Node >= 23.6 exécute directement le TypeScript de app/lib/dunning.ts.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  onPaymentFailed, onPaymentSucceeded, onSubscriptionDeleted, activationFields,
  invoiceSubscriptionId, paidTier,
} from '../app/lib/dunning.ts'

const NOW = '2026-10-27T10:00:00.000Z'
const abonne = () => ({ user_id: 'u1', email: 'a@exemple.fr', ...activationFields('conversation') })

test('1. payment_failed : mode texte, past_due, email', () => {
  const d = onPaymentFailed(abonne(), { invoiceId: 'in_1', subscriptionStatus: 'past_due', nowIso: NOW })
  assert.equal(d.changed, true)
  assert.equal(d.data.effective_tier, 'text')
  assert.equal(d.data.tier, 'conversation')          // le contrat ne change pas
  assert.equal(d.data.payment_status, 'past_due')
  assert.equal(d.data.last_failed_invoice_id, 'in_1')
  assert.equal(d.email, 'payment_failed')
})

test('3. payment_succeeded apres echec : conversation restaure, email', () => {
  const failed = onPaymentFailed(abonne(), { invoiceId: 'in_1', subscriptionStatus: 'past_due', nowIso: NOW }).data
  const d = onPaymentSucceeded(failed, { nowIso: NOW })
  assert.equal(d.changed, true)
  assert.equal(d.data.effective_tier, 'conversation')
  assert.equal(d.data.payment_status, 'active')
  assert.equal(d.data.conversation_status, 'active')
  assert.equal(d.email, 'payment_restored')
})

test('3b. renouvellement mensuel normal : rien, pas d email', () => {
  const d = onPaymentSucceeded(abonne(), { nowIso: NOW })
  assert.equal(d.changed, false)
  assert.equal(d.email, null)
})

test('4. subscription.deleted : bascule texte + modal', () => {
  const d = onSubscriptionDeleted(abonne(), { otherLiveSubscription: false, nowIso: NOW })
  assert.equal(d.data.tier, 'text')
  assert.equal(d.data.effective_tier, 'text')
  assert.equal(d.data.payment_status, 'cancelled')
  assert.equal(d.data.conversation_status, 'inactive')
  assert.equal(d.data.blocking_modal_pending, true)
})

test('4b. deleted avec un autre abonnement vivant : rien', () => {
  const d = onSubscriptionDeleted(abonne(), { otherLiveSubscription: true, nowIso: NOW })
  assert.equal(d.changed, false)
})

test('4c. deleted d un ancien paiement audio_text rembourse : pas de modal', () => {
  const d = onSubscriptionDeleted({ user_id: 'u2', tier: 'text' }, { otherLiveSubscription: false, nowIso: NOW })
  assert.equal(d.data.blocking_modal_pending, false)
})

test('6. idempotence : relance Stripe sur la meme facture, pas de double traitement', () => {
  const first = onPaymentFailed(abonne(), { invoiceId: 'in_1', subscriptionStatus: 'past_due', nowIso: NOW })
  const replay = onPaymentFailed(first.data, { invoiceId: 'in_1', subscriptionStatus: 'past_due', nowIso: NOW })
  assert.equal(replay.changed, false)
  assert.equal(replay.email, null)
})

test('6b. deleted rejoue : pas de double traitement', () => {
  const first = onSubscriptionDeleted(abonne(), { otherLiveSubscription: false, nowIso: NOW })
  const replay = onSubscriptionDeleted(first.data, { otherLiveSubscription: false, nowIso: NOW })
  assert.equal(replay.changed, false)
})

test('6c. echec arrive en retard (abonnement deja regle ou annule) : ignore', () => {
  for (const status of ['active', 'canceled', null]) {
    const d = onPaymentFailed(abonne(), { invoiceId: 'in_old', subscriptionStatus: status, nowIso: NOW })
    assert.equal(d.changed, false, `statut ${status}`)
  }
})

test('6d. nouvelle facture en echec le mois suivant : nouvel email', () => {
  const m1 = onPaymentFailed(abonne(), { invoiceId: 'in_1', subscriptionStatus: 'past_due', nowIso: NOW }).data
  const d = onPaymentFailed(m1, { invoiceId: 'in_2', subscriptionStatus: 'unpaid', nowIso: NOW })
  assert.equal(d.changed, true)
  assert.equal(d.email, 'payment_failed')
})

test('reabonnement apres annulation : modal efface, conversation', () => {
  const cancelled = onSubscriptionDeleted(abonne(), { otherLiveSubscription: false, nowIso: NOW }).data
  const back = { ...cancelled, ...activationFields('conversation') }
  assert.equal(back.blocking_modal_pending, false)
  assert.equal(back.effective_tier, 'conversation')
  assert.equal(back.payment_status, 'active')
})

test('helpers : id d abonnement des deux formats d API, tier paye', () => {
  assert.equal(invoiceSubscriptionId({ parent: { subscription_details: { subscription: 'sub_new' } } }), 'sub_new')
  assert.equal(invoiceSubscriptionId({ subscription: { id: 'sub_old' } }), 'sub_old')
  assert.equal(invoiceSubscriptionId({ id: 'in_x' }), null)
  assert.equal(paidTier({ tier: 'text' }), 'conversation')
  assert.equal(paidTier({}), 'conversation')
})
