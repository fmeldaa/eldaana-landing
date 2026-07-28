'use client'

import { useState, useEffect, useRef } from 'react'

// ── Constantes ─────────────────────────────────────────────────────────────────
const APP_URL              = 'https://eldaana.streamlit.app'
const STRIPE_AUDIO_TEXT    = 'https://buy.stripe.com/test_28EeV7egy3qw3Hg6XL4F203'
const STRIPE_CONVERSATION  = 'https://buy.stripe.com/test_dRmfZb8We0ek6Ts6XL4F202'

// ── Traductions ────────────────────────────────────────────────────────────────
const T = {
  fr: {
    nav_try: 'Essayer gratuitement',

    title:    'Ta présence, à ton rythme',
    subtitle: 'Trois façons d\'expérimenter Eldaana',

    // Découverte
    discovery_name:     'Découverte',
    discovery_price:    'Gratuit',
    discovery_tagline:  'Pour commencer',
    discovery_features: [
      '6 messages gratuits',
      'Sans compte requis',
      'Chat texte avec Eldaana',
      'Météo et prédictions basiques',
    ],
    discovery_cta: 'Essayer sur Eldaana →',

    // Audio & Texte
    audio_text_badge:    'Le plus populaire',
    audio_text_name:     'Audio & Texte',
    audio_text_price:    '9,99€',
    audio_text_per:      '/mois',
    audio_text_tagline:  'Ta présence quotidienne',
    audio_text_features: [
      'Tout Découverte',
      'Voix Eldaana (Nova, Shimmer)',
      'Conversations illimitées',
      'Prédictions personnalisées',
      'Mémoire persistante',
    ],
    audio_text_cta: 'Choisir Audio & Texte →',

    // Conversation
    conversation_name:     'Conversation',
    conversation_price:    '29,99€',
    conversation_per:      '/mois',
    conversation_tagline:  'Ta présence en temps réel',
    conversation_features: [
      'Tout Audio & Texte',
      'Conversation vocale temps réel',
      '4 voix Eldaana Live (Zephyr, Aoede, Kore, Leda)',
      'Prédictions avancées 30 jours',
      'Accès bêta aux nouveautés',
    ],
    conversation_cta: 'Choisir Conversation →',

    // Footer
    footer_tagline: 'L\'IA qui anticipe ta vie.',
    footer_try:     'Essayer gratuitement',
    footer_privacy: 'Confidentialité',
    footer_contact: 'Contact',
    footer_rights:  '© 2026 Eldaana. Tous droits réservés.',

    // Page title (client-side)
    page_title: 'Tarifs — Eldaana',
  },
  en: {
    nav_try: 'Try for free',

    title:    'Your presence, at your pace',
    subtitle: 'Three ways to experience Eldaana',

    // Discovery
    discovery_name:     'Discovery',
    discovery_price:    'Free',
    discovery_tagline:  'To get started',
    discovery_features: [
      '6 free messages',
      'No account required',
      'Text chat with Eldaana',
      'Basic weather and predictions',
    ],
    discovery_cta: 'Try Eldaana →',

    // Audio & Text
    audio_text_badge:    'Most popular',
    audio_text_name:     'Audio & Text',
    audio_text_price:    '€9.99',
    audio_text_per:      '/month',
    audio_text_tagline:  'Your daily presence',
    audio_text_features: [
      'Everything in Discovery',
      'Eldaana voice (Nova, Shimmer)',
      'Unlimited conversations',
      'Personalized predictions',
      'Persistent memory',
    ],
    audio_text_cta: 'Choose Audio & Text →',

    // Conversation
    conversation_name:     'Conversation',
    conversation_price:    '€29.99',
    conversation_per:      '/month',
    conversation_tagline:  'Your real-time presence',
    conversation_features: [
      'Everything in Audio & Text',
      'Real-time voice conversation',
      '4 Eldaana Live voices (Zephyr, Aoede, Kore, Leda)',
      'Advanced 30-day predictions',
      'Beta access to new features',
    ],
    conversation_cta: 'Choose Conversation →',

    // Footer
    footer_tagline: 'The AI that anticipates your life.',
    footer_try:     'Try for free',
    footer_privacy: 'Privacy',
    footer_contact: 'Contact',
    footer_rights:  '© 2026 Eldaana. All rights reserved.',

    // Page title (client-side)
    page_title: 'Pricing — Eldaana',
  },
}

// ── Langues supportées ─────────────────────────────────────────────────────────
const SUPPORTED_LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
] as const

type Lang = typeof SUPPORTED_LANGUAGES[number]['code']

// ── Composant ──────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [lang, setLang]               = useState<Lang>('fr')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [langOpen, setLangOpen]       = useState(false)
  const langRef    = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs   = useRef<(HTMLButtonElement | null)[]>([])
  const t = T[lang]

  // Lecture du param ?lang=
  useEffect(() => {
    const params    = new URLSearchParams(window.location.search)
    const langParam = params.get('lang')
    if (SUPPORTED_LANGUAGES.some(l => l.code === langParam)) {
      setLang(langParam as Lang)
    }
  }, [])

  // Mise à jour document.title selon la langue
  useEffect(() => {
    document.title = t.page_title
  }, [lang, t.page_title])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le dropdown sur clic extérieur
  useEffect(() => {
    if (!langOpen) return
    function handleOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [langOpen])

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setLangOpen(o => !o)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setLangOpen(true)
      setTimeout(() => itemRefs.current[0]?.focus(), 0)
    } else if (e.key === 'Escape') {
      setLangOpen(false)
    }
  }

  function handleItemKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, idx: number) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      itemRefs.current[idx + 1]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (idx === 0) triggerRef.current?.focus()
      else itemRefs.current[idx - 1]?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setLangOpen(false)
      triggerRef.current?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Eldaana" className="w-8 h-8 rounded-xl" />
          <span className="font-bold text-lg gradient-text">Eldaana</span>
        </a>
        <div className="flex items-center gap-3">
          {/* Sélecteur de langue */}
          <div ref={langRef} className="relative">
            <button
              ref={triggerRef}
              onClick={() => setLangOpen(o => !o)}
              onKeyDown={handleTriggerKeyDown}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors min-h-[44px] min-w-[44px]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
                style={{ transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms ease' }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {langOpen && (
              <div
                role="listbox"
                aria-label="Language selection"
                className="lang-dropdown absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/10 bg-[#13131a] shadow-2xl shadow-black/60 overflow-hidden z-[200]"
              >
                {SUPPORTED_LANGUAGES.map((l, idx) => (
                  <button
                    key={l.code}
                    role="option"
                    aria-selected={lang === l.code}
                    ref={el => { itemRefs.current[idx] = el }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setLang(l.code)
                      setLangOpen(false)
                    }}
                    onKeyDown={(e) => handleItemKeyDown(e, idx)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none ${
                      lang === l.code ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{l.label}</span>
                    {lang === l.code && (
                      <span className="text-purple-400 text-xs font-semibold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block shimmer-btn text-white font-semibold text-sm px-4 py-2 rounded-xl"
          >
            {t.nav_try}
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 px-6 text-center overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-500/8 rounded-full blur-[120px]" />
          <div className="absolute top-32 left-1/4 w-[250px] h-[250px] bg-indigo-500/8 rounded-full blur-[80px]" />
          <div className="absolute top-32 right-1/4 w-[250px] h-[250px] bg-sky-500/8 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
            <span className="gradient-text">{t.title}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mt-4 leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="pb-28 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Carte 1 — Découverte */}
          <div className="glass rounded-3xl p-8 flex flex-col h-full">
            <div className="text-gray-400 font-semibold mb-1">{t.discovery_name}</div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-black">{t.discovery_price}</span>
            </div>
            <div className="text-gray-500 text-sm mb-6">{t.discovery_tagline}</div>
            <ul className="space-y-3 flex-1 mb-8">
              {t.discovery_features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400 flex-shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center glass border border-white/15 text-white font-semibold py-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              {t.discovery_cta}
            </a>
          </div>

          {/* Carte 2 — Audio & Texte — mise en avant */}
          <div className="relative rounded-3xl p-8 flex flex-col h-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {t.audio_text_badge}
            </div>
            <div className="gradient-text font-semibold mb-1">{t.audio_text_name}</div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-black text-white">{t.audio_text_price}</span>
              <span className="text-gray-400 mb-2">{t.audio_text_per}</span>
            </div>
            <div className="text-gray-400 text-sm mb-6">{t.audio_text_tagline}</div>
            <ul className="space-y-3 flex-1 mb-8">
              {t.audio_text_features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-purple-400 flex-shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href={STRIPE_AUDIO_TEXT}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center shimmer-btn text-white font-bold py-3 rounded-xl"
            >
              {t.audio_text_cta}
            </a>
          </div>

          {/* Carte 3 — Conversation */}
          <div className="relative rounded-3xl p-8 flex flex-col h-full bg-gradient-to-br from-indigo-500/10 to-sky-500/10 border border-indigo-500/30">
            <div className="text-indigo-300 font-semibold mb-1">{t.conversation_name}</div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-black text-white">{t.conversation_price}</span>
              <span className="text-gray-400 mb-2">{t.conversation_per}</span>
            </div>
            <div className="text-gray-400 text-sm mb-6">{t.conversation_tagline}</div>
            <ul className="space-y-3 flex-1 mb-8">
              {t.conversation_features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-sky-400 flex-shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href={STRIPE_CONVERSATION}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              {t.conversation_cta}
            </a>
          </div>

        </div>
      </section>

      {/* ── SCROLL TO TOP ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shimmer-btn text-white flex items-center justify-center shadow-lg text-xl"
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Eldaana" className="w-8 h-8 rounded-xl" />
            <div>
              <div className="font-bold gradient-text">Eldaana</div>
              <div className="text-gray-500 text-xs">{t.footer_tagline}</div>
            </div>
          </a>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t.footer_try}
            </a>
            <a href="mailto:contact@eldaana.com" className="hover:text-white transition-colors">
              {t.footer_contact}
            </a>
            <a href={lang === 'fr' ? '/confidentialite' : '/privacy'} className="hover:text-white transition-colors">
              {t.footer_privacy}
            </a>
          </div>

          <div className="text-gray-600 text-xs">{t.footer_rights}</div>
        </div>
      </footer>

    </div>
  )
}
