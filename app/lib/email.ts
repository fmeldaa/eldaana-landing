import { Resend } from 'resend'

// Initialisation lazy : évite le crash au build Next.js quand RESEND_API_KEY
// n'est pas définie localement (Vercel l'injecte uniquement au runtime).
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!)
  return _resend
}

// ── Templates ─────────────────────────────────────────────────────────────────

function magicLinkFR(url: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9fafb}
    .container{background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    h1{font-size:24px;font-weight:700;margin:0 0 16px;color:#7c3aed}
    p{line-height:1.6;color:#4b5563;font-size:15px}
    .cta{display:inline-block;background:linear-gradient(135deg,#7c3aed,#6366f1);color:white!important;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;margin:24px 0;font-size:15px}
    .footer{color:#9ca3af;font-size:13px;margin-top:32px;text-align:center}
  </style>
</head>
<body>
  <div class="container">
    <h1>Ton lien de connexion</h1>
    <p>Bonjour,</p>
    <p>Voici ton lien pour te connecter à Eldaana :</p>
    <p style="text-align:center"><a href="${url}" class="cta">Me connecter</a></p>
    <p>Ce lien est valide 15 minutes. Si tu n'as pas demandé cette connexion, ignore ce message.</p>
    <div class="footer">À très vite,<br/>Eldaana</div>
  </div>
</body>
</html>`
}

function magicLinkEN(url: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9fafb}
    .container{background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    h1{font-size:24px;font-weight:700;margin:0 0 16px;color:#7c3aed}
    p{line-height:1.6;color:#4b5563;font-size:15px}
    .cta{display:inline-block;background:linear-gradient(135deg,#7c3aed,#6366f1);color:white!important;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;margin:24px 0;font-size:15px}
    .footer{color:#9ca3af;font-size:13px;margin-top:32px;text-align:center}
  </style>
</head>
<body>
  <div class="container">
    <h1>Your login link</h1>
    <p>Hello,</p>
    <p>Here is your link to connect to Eldaana:</p>
    <p style="text-align:center"><a href="${url}" class="cta">Log in</a></p>
    <p>This link is valid for 15 minutes. If you didn't request this, please ignore this email.</p>
    <div class="footer">See you soon,<br/>Eldaana</div>
  </div>
</body>
</html>`
}

function paymentConfirmFR(url: string, tierLabel: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9fafb}
    .container{background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    h1{font-size:24px;font-weight:700;margin:0 0 16px;color:#7c3aed}
    p{line-height:1.6;color:#4b5563;font-size:15px}
    .cta{display:inline-block;background:linear-gradient(135deg,#7c3aed,#6366f1);color:white!important;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;margin:24px 0;font-size:15px}
    .footer{color:#9ca3af;font-size:13px;margin-top:32px;text-align:center}
  </style>
</head>
<body>
  <div class="container">
    <h1>Bienvenue dans Eldaana ${tierLabel} 🎧</h1>
    <p>Bonjour,</p>
    <p>Ton paiement a bien été reçu. Ton accès <strong>${tierLabel}</strong> est activé.</p>
    <p>Voici ton lien de première connexion :</p>
    <p style="text-align:center"><a href="${url}" class="cta">Accéder à Eldaana</a></p>
    <p>Ce lien est valide 15 minutes. Une fois connecté·e, tu pourras te reconnecter avec ton email seul.</p>
    <div class="footer">Merci pour ta confiance,<br/>Eldaana</div>
  </div>
</body>
</html>`
}

function paymentConfirmEN(url: string, tierLabel: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9fafb}
    .container{background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    h1{font-size:24px;font-weight:700;margin:0 0 16px;color:#7c3aed}
    p{line-height:1.6;color:#4b5563;font-size:15px}
    .cta{display:inline-block;background:linear-gradient(135deg,#7c3aed,#6366f1);color:white!important;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;margin:24px 0;font-size:15px}
    .footer{color:#9ca3af;font-size:13px;margin-top:32px;text-align:center}
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Eldaana ${tierLabel} 🎧</h1>
    <p>Hello,</p>
    <p>Your payment was received. Your <strong>${tierLabel}</strong> access is now active.</p>
    <p>Here is your first login link:</p>
    <p style="text-align:center"><a href="${url}" class="cta">Access Eldaana</a></p>
    <p>This link is valid for 15 minutes. Once logged in, you can reconnect using just your email.</p>
    <div class="footer">Thank you for your trust,<br/>Eldaana</div>
  </div>
</body>
</html>`
}

// ── Send functions ─────────────────────────────────────────────────────────────

export async function sendMagicLinkEmail(email: string, url: string, lang: 'fr' | 'en') {
  const from = lang === 'fr' ? 'bonjour@eldaana.com' : 'hello@eldaana.com'
  const subject = lang === 'fr' ? 'Ton lien de connexion à Eldaana' : 'Your Eldaana login link'
  const html = lang === 'fr' ? magicLinkFR(url) : magicLinkEN(url)
  return getResend().emails.send({ from, to: email, subject, html })
}

export async function sendPaymentConfirmEmail(
  email: string,
  url: string,
  tierLabel: string,
  lang: 'fr' | 'en',
) {
  const from = lang === 'fr' ? 'bonjour@eldaana.com' : 'hello@eldaana.com'
  const subject =
    lang === 'fr'
      ? `Bienvenue dans Eldaana ${tierLabel} 🎧`
      : `Welcome to Eldaana ${tierLabel} 🎧`
  const html = lang === 'fr' ? paymentConfirmFR(url, tierLabel) : paymentConfirmEN(url, tierLabel)
  return getResend().emails.send({ from, to: email, subject, html })
}

function legacyRefundFR(pricingUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9fafb}
    .container{background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    h1{font-size:24px;font-weight:700;margin:0 0 16px;color:#7c3aed}
    p{line-height:1.6;color:#4b5563;font-size:15px}
    .cta{display:inline-block;background:linear-gradient(135deg,#7c3aed,#6366f1);color:white!important;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;margin:24px 0;font-size:15px}
    .footer{color:#9ca3af;font-size:13px;margin-top:32px;text-align:center}
  </style>
</head>
<body>
  <div class="container">
    <h1>Ton paiement a été remboursé</h1>
    <p>Bonjour,</p>
    <p>Nous avons remboursé ton paiement : l'offre <strong>Audio &amp; Texte</strong> n'est plus proposée, et aucun prélèvement ne suivra.</p>
    <p>Si tu souhaites accéder à Eldaana Live, voici l'offre actuelle, <strong>Conversation</strong> à 29,99&nbsp;€/mois :</p>
    <p style="text-align:center"><a href="${pricingUrl}" class="cta">Découvrir Conversation</a></p>
    <p>Le remboursement apparaît sur ton relevé sous quelques jours, selon ta banque.</p>
    <div class="footer">Merci pour ta confiance,<br/>Eldaana</div>
  </div>
</body>
</html>`
}

function legacyRefundEN(pricingUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9fafb}
    .container{background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    h1{font-size:24px;font-weight:700;margin:0 0 16px;color:#7c3aed}
    p{line-height:1.6;color:#4b5563;font-size:15px}
    .cta{display:inline-block;background:linear-gradient(135deg,#7c3aed,#6366f1);color:white!important;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;margin:24px 0;font-size:15px}
    .footer{color:#9ca3af;font-size:13px;margin-top:32px;text-align:center}
  </style>
</head>
<body>
  <div class="container">
    <h1>Your payment has been refunded</h1>
    <p>Hello,</p>
    <p>We have refunded your payment: the <strong>Audio &amp; Text</strong> plan is no longer offered, and nothing further will be charged.</p>
    <p>If you would like to access Eldaana Live, here is the current plan, <strong>Conversation</strong> at €29.99/month:</p>
    <p style="text-align:center"><a href="${pricingUrl}" class="cta">Discover Conversation</a></p>
    <p>The refund will show on your statement within a few days, depending on your bank.</p>
    <div class="footer">Thank you for your trust,<br/>Eldaana</div>
  </div>
</body>
</html>`
}

export async function sendLegacyTierRefundEmail(email: string, lang: 'fr' | 'en') {
  const from = lang === 'fr' ? 'bonjour@eldaana.com' : 'hello@eldaana.com'
  const subject = lang === 'fr' ? 'Ton paiement Eldaana a été remboursé' : 'Your Eldaana payment has been refunded'
  const pricingUrl = 'https://eldaana.com/pricing?lang=' + lang
  const html = lang === 'fr' ? legacyRefundFR(pricingUrl) : legacyRefundEN(pricingUrl)
  return getResend().emails.send({ from, to: email, subject, html })
}
