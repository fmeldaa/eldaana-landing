# Vercel Environment Variables — Palier C (Stripe Webhook)

## 1. Variables à ajouter dans Vercel Dashboard

> Settings → Environment Variables → ajouter pour **Production + Preview + Development**

| Variable | Valeur | Source |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_xxx` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_xxx` | Généré lors de la config webhook (étape 3) |
| `SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase Dashboard → Settings → API → **service_role** (pas anon) |

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` est différente de `SUPABASE_SERVICE_KEY` utilisée dans `app/api/waitlist/route.ts`. Les deux coexistent — ne pas modifier la waitlist.

## 2. Table Supabase à créer

Dans **Supabase Dashboard → SQL Editor** :

```sql
CREATE TABLE stripe_events_processed (
  event_id   text        PRIMARY KEY,
  event_type text        NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_stripe_events_processed_type
  ON stripe_events_processed(event_type);
```

Pas de RLS (Row Level Security) nécessaire — accès uniquement via `service_role` côté serveur.

## 3. Webhook Stripe à configurer

Dans **Stripe Dashboard (test mode)** → Developers → Webhooks → Add endpoint :

- **URL** : `https://eldaana.com/api/stripe/webhook`
- **Événements à écouter** :
  - `checkout.session.completed`
  - `customer.subscription.deleted`
- Copier le **Signing secret** (`whsec_xxx`) → mettre dans `STRIPE_WEBHOOK_SECRET` Vercel

## 4. Test avec Stripe CLI

```bash
# Installer Stripe CLI (si pas déjà fait)
# https://stripe.com/docs/stripe-cli

# Authentifier
stripe login

# Écouter en local et forwarder vers le dev server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Dans un second terminal — simuler un paiement
stripe trigger checkout.session.completed

# Simuler une annulation
stripe trigger customer.subscription.deleted
```

> Note : en mode `stripe listen`, le `STRIPE_WEBHOOK_SECRET` local est celui affiché par la commande `stripe listen` (différent du whsec_ Stripe dashboard). Pour le dev local, copier ce secret dans `.env.local`.

## 5. Vérification post-déploiement

Après configuration des 3 étapes ci-dessus :

1. **Vercel** : Functions log → `api/stripe/webhook` doit apparaître après le premier appel
2. **Supabase** → Table Editor → `profiles_eldaana` : nouveau profil avec `conversation_status: "active"`
3. **Supabase** → Table Editor → `stripe_events_processed` : `event_id` de la session

Test paiement réel (mode test) : carte `4242 4242 4242 4242`, exp. quelconque, CVC quelconque.
