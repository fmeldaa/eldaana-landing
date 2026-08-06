'use client'

import { useState, useEffect } from 'react'

export default function UsedPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('eldaana_lang') : null
    if (stored === 'en') setLang('en')
  }, [])

  const t = {
    title:  lang === 'fr' ? 'Lien déjà utilisé' : 'Link already used',
    body:   lang === 'fr' ? 'Ce lien a déjà été utilisé. Demande-en un nouveau :' : 'This link has already been used. Request a new one:',
    label:  lang === 'fr' ? 'Ton email' : 'Your email',
    submit: lang === 'fr' ? 'Recevoir un nouveau lien →' : 'Send a new link →',
    sent:   lang === 'fr' ? 'Si un compte existe avec cet email, tu vas recevoir un lien. Vérifie tes emails 📧' : 'If an account exists with this email, you\'ll receive a link. Check your emails 📧',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    await fetch('/api/auth/magic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), lang }),
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#0f0f12' }}>
      <div style={{ background: '#1a1a24', borderRadius: '16px', padding: '40px 32px', maxWidth: '420px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
        <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>🔒</div>
        <h1 style={{ color: '#c084fc', fontWeight: 700, fontSize: '1.4rem', margin: '0 0 12px', textAlign: 'center' }}>{t.title}</h1>

        {sent ? (
          <p style={{ color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>{t.sent}</p>
        ) : (
          <>
            <p style={{ color: '#9ca3af', marginBottom: '20px', lineHeight: 1.6 }}>{t.body}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.label}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(192,132,252,0.3)', background: '#0f0f12', color: '#e9d5ff', fontSize: '0.95rem', boxSizing: 'border-box', marginBottom: '12px', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#7c3aed,#6366f1)', color: 'white', fontWeight: 600, fontSize: '0.95rem', cursor: loading ? 'wait' : 'pointer' }}
              >
                {loading ? '…' : t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
