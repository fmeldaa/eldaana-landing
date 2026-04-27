'use client'

import { useState } from 'react'

// ── Traductions ────────────────────────────────────────────────────────────────
const T = {
  fr: {
    nav_try: 'Essayer gratuitement',
    hero_tagline: 'Eldaana sait ce dont tu as besoin.',
    hero_tagline2: 'Avant même que tu le saches.',
    hero_sub: "L'assistant IA personnel qui prédit ton humeur, anticipe tes besoins et simplifie chaque matin.",
    hero_cta: 'Essayer gratuitement →',
    hero_cta2: 'Rejoindre la liste d\'attente',
    hero_badge: '✨ Bêta ouverte — Accès gratuit',

    prob_title: 'Tu te reconnais ?',
    prob_1_title: 'Fatigue décisionnelle',
    prob_1_text: 'Que porter ? Quoi manger ? Comment gérer son budget ? Des centaines de micro-décisions qui épuisent chaque jour.',
    prob_2_title: 'Assistants trop limités',
    prob_2_text: 'Siri, Alexa, ChatGPT réagissent quand tu demandes. Mais ils n\'anticipent jamais vraiment tes besoins.',
    prob_3_title: 'Manque de temps',
    prob_3_text: 'Entre le travail, la famille, les obligations — tu voudrais juste que quelqu\'un gère le reste pour toi.',

    sol_title: 'Eldaana anticipe. Toi, tu vis.',
    sol_sub: 'Une IA qui te connaît vraiment et agit avant même que tu aies à demander.',
    feat_1_title: 'Réveil personnalisé',
    feat_1_text: 'Chaque matin : météo, humeur, message positif. Eldaana démarre ta journée à ta place.',
    feat_2_title: 'Prédictions intelligentes',
    feat_2_text: '"Tu vas ressentir de la fatigue jeudi — prévois du temps pour toi." Des alertes basées sur tes patterns réels.',
    feat_3_title: 'Confidente bienveillante',
    feat_3_text: 'Pas un robot. Une présence chaleureuse qui te comprend, te challenge et te soutient vraiment.',
    feat_4_title: 'Alertes transport & budget',
    feat_4_text: 'Perturbations sur ta ligne, budget dépassé, rendez-vous oublié — Eldaana t\'avertit avant que ça devienne un problème.',

    how_title: 'En 3 étapes, Eldaana change ton quotidien',
    step_1_title: 'Tu crées ton profil',
    step_1_text: 'Prénom, ville, habitudes, transports. 2 minutes pour que Eldaana te connaisse.',
    step_2_title: 'Elle apprend et s\'adapte',
    step_2_text: 'À chaque conversation, Eldaana affine ses prédictions et ses suggestions pour toi.',
    step_3_title: 'Tu profites',
    step_3_text: 'Moins de stress, moins de décisions subies, plus de moments qui comptent vraiment.',

    testimonials_title: 'Ils ont testé Eldaana',
    t1_text: '"Eldaana m\'a dit jeudi matin que j\'allais être épuisé ce soir-là. Elle avait raison. Et elle m\'avait déjà préparé un message de motivation."',
    t1_name: 'Karim, 34 ans — Consultant',
    t2_text: '"Pour la première fois, j\'ai l\'impression que quelqu\'un pense à moi avant même que j\'en aie besoin. C\'est bluffant."',
    t2_name: 'Sophie, 28 ans — Infirmière',
    t3_text: '"Les alertes transport du matin m\'ont sauvé la mise 3 fois en une semaine. Et les messages positifs me donnent vraiment de l\'énergie."',
    t3_name: 'Marc, 41 ans — Chef de projet',

    pricing_title: 'Simple et honnête',
    pricing_free_title: 'Gratuit',
    pricing_free_price: '0€',
    pricing_free_desc: 'Pour découvrir Eldaana',
    pricing_free_f1: 'Chat IA illimité',
    pricing_free_f2: 'Météo du matin',
    pricing_free_f3: 'Profil de base',
    pricing_free_f4: 'Accès bêta',
    pricing_free_cta: 'Commencer gratuitement',
    pricing_premium_title: 'Premium',
    pricing_premium_price: '9,99€',
    pricing_premium_per: '/mois',
    pricing_premium_desc: 'Pour le plein potentiel d\'Eldaana',
    pricing_premium_f1: 'Tout le gratuit +',
    pricing_premium_f2: 'Prédictions avancées',
    pricing_premium_f3: 'Alertes transport temps réel',
    pricing_premium_f4: 'Mode vocal',
    pricing_premium_f5: 'Analyse humeur & bien-être',
    pricing_premium_cta: 'Essayer 14 jours gratuits',
    pricing_badge: '🔥 Le plus populaire',

    waitlist_title: 'Sois parmi les premiers',
    waitlist_sub: 'Rejoins la liste d\'attente et accède en priorité à Eldaana Premium — gratuitement pendant 3 mois.',
    waitlist_placeholder: 'ton@email.com',
    waitlist_cta: 'Je rejoins la liste →',
    waitlist_success: '🎉 Tu es sur la liste ! On te prévient dès que c\'est prêt.',
    waitlist_error: 'Une erreur est survenue. Réessaie.',
    waitlist_count: 'Déjà +247 personnes en attente',

    footer_tagline: 'L\'IA qui anticipe ta vie.',
    footer_try: 'Essayer gratuitement',
    footer_privacy: 'Confidentialité',
    footer_contact: 'Contact',
    footer_rights: '© 2025 Eldaana. Tous droits réservés.',
  },
  en: {
    nav_try: 'Try for free',
    hero_tagline: 'Eldaana knows what you need.',
    hero_tagline2: 'Before you do.',
    hero_sub: 'The personal AI assistant that predicts your mood, anticipates your needs and simplifies every morning.',
    hero_cta: 'Try for free →',
    hero_cta2: 'Join the waitlist',
    hero_badge: '✨ Open Beta — Free access',

    prob_title: 'Sound familiar?',
    prob_1_title: 'Decision fatigue',
    prob_1_text: 'What to wear? What to eat? How to manage your budget? Hundreds of micro-decisions that drain you every single day.',
    prob_2_title: 'Assistants too limited',
    prob_2_text: 'Siri, Alexa, ChatGPT react when you ask. But they never truly anticipate your needs.',
    prob_3_title: 'Not enough time',
    prob_3_text: 'Work, family, obligations — you just wish someone could handle the rest for you.',

    sol_title: 'Eldaana anticipates. You live.',
    sol_sub: 'An AI that truly knows you and acts before you even have to ask.',
    feat_1_title: 'Personalized wake-up',
    feat_1_text: 'Every morning: weather, mood, positive message. Eldaana starts your day for you.',
    feat_2_title: 'Smart predictions',
    feat_2_text: '"You\'ll feel tired on Thursday — schedule some time for yourself." Alerts based on your real patterns.',
    feat_3_title: 'Caring confidante',
    feat_3_text: 'Not a robot. A warm presence that understands you, challenges you and truly supports you.',
    feat_4_title: 'Transport & budget alerts',
    feat_4_text: 'Line disruptions, budget exceeded, forgotten appointments — Eldaana warns you before it becomes a problem.',

    how_title: 'In 3 steps, Eldaana changes your daily life',
    step_1_title: 'You create your profile',
    step_1_text: 'Name, city, habits, transport. 2 minutes for Eldaana to get to know you.',
    step_2_title: 'She learns and adapts',
    step_2_text: 'With every conversation, Eldaana refines her predictions and suggestions just for you.',
    step_3_title: 'You enjoy life',
    step_3_text: 'Less stress, fewer forced decisions, more moments that truly matter.',

    testimonials_title: 'They\'ve tried Eldaana',
    t1_text: '"Eldaana told me Thursday morning that I\'d be exhausted that evening. She was right. And she had already prepared a motivational message for me."',
    t1_name: 'Karim, 34 — Consultant',
    t2_text: '"For the first time, I feel like someone is thinking of me before I even need it. It\'s mind-blowing."',
    t2_name: 'Sophie, 28 — Nurse',
    t3_text: '"The morning transport alerts saved me 3 times in one week. And the positive messages genuinely give me energy."',
    t3_name: 'Marc, 41 — Project Manager',

    pricing_title: 'Simple and honest',
    pricing_free_title: 'Free',
    pricing_free_price: '€0',
    pricing_free_desc: 'Discover Eldaana',
    pricing_free_f1: 'Unlimited AI chat',
    pricing_free_f2: 'Morning weather',
    pricing_free_f3: 'Basic profile',
    pricing_free_f4: 'Beta access',
    pricing_free_cta: 'Start for free',
    pricing_premium_title: 'Premium',
    pricing_premium_price: '€9.99',
    pricing_premium_per: '/month',
    pricing_premium_desc: 'Eldaana\'s full potential',
    pricing_premium_f1: 'Everything in Free +',
    pricing_premium_f2: 'Advanced predictions',
    pricing_premium_f3: 'Real-time transport alerts',
    pricing_premium_f4: 'Voice mode',
    pricing_premium_f5: 'Mood & wellness analysis',
    pricing_premium_cta: 'Try free for 14 days',
    pricing_badge: '🔥 Most popular',

    waitlist_title: 'Be among the first',
    waitlist_sub: 'Join the waitlist and get priority access to Eldaana Premium — free for 3 months.',
    waitlist_placeholder: 'your@email.com',
    waitlist_cta: 'Join the list →',
    waitlist_success: '🎉 You\'re on the list! We\'ll notify you as soon as it\'s ready.',
    waitlist_error: 'An error occurred. Please try again.',
    waitlist_count: 'Already 247+ people waiting',

    footer_tagline: 'The AI that anticipates your life.',
    footer_try: 'Try for free',
    footer_privacy: 'Privacy',
    footer_contact: 'Contact',
    footer_rights: '© 2025 Eldaana. All rights reserved.',
  },
}

const APP_URL = 'https://eldaana.streamlit.app'

export default function LandingPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [email, setEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const t = T[lang]

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setWaitlistStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      })
      if (res.ok) {
        setWaitlistStatus('success')
        setEmail('')
      } else {
        setWaitlistStatus('error')
      }
    } catch {
      setWaitlistStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Eldaana" className="w-8 h-8 rounded-xl" />
          <span className="font-bold text-lg gradient-text">Eldaana</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <div className="flex rounded-lg overflow-hidden border border-white/10 text-sm">
            <button
              onClick={() => setLang('fr')}
              className={`px-3 py-1 transition-colors ${lang === 'fr' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇫🇷 FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 transition-colors ${lang === 'en' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              🇬🇧 EN
            </button>
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
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px]" />
          <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-300 mb-8 border border-purple-500/20">
            {t.hero_badge}
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="float">
              <img src="/logo.png" alt="Eldaana" className="w-24 h-24 rounded-3xl shadow-2xl glow" />
            </div>
          </div>

          {/* Tagline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-4">
            <span className="gradient-text">{t.hero_tagline}</span>
            <br />
            <span className="text-white/90">{t.hero_tagline2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
            {t.hero_sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn text-white font-bold text-lg px-8 py-4 rounded-2xl w-full sm:w-auto"
            >
              {t.hero_cta}
            </a>
            <a
              href="#waitlist"
              className="glass border border-white/10 text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-white/5 transition-colors w-full sm:w-auto"
            >
              {t.hero_cta2}
            </a>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-gray-500 text-sm">{t.waitlist_count}</p>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            {t.prob_title} <span className="gradient-text">😮‍💨</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: t.prob_1_title, text: t.prob_1_text },
              { icon: '🤖', title: t.prob_2_title, text: t.prob_2_text },
              { icon: '⏰', title: t.prob_3_title, text: t.prob_3_text },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION / FEATURES ── */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">{t.sol_title}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">{t.sol_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '☀️', title: t.feat_1_title, text: t.feat_1_text, color: 'from-yellow-500/10 to-orange-500/10' },
              { icon: '🔮', title: t.feat_2_title, text: t.feat_2_text, color: 'from-purple-500/10 to-indigo-500/10' },
              { icon: '💜', title: t.feat_3_title, text: t.feat_3_text, color: 'from-pink-500/10 to-purple-500/10' },
              { icon: '🚦', title: t.feat_4_title, text: t.feat_4_text, color: 'from-sky-500/10 to-cyan-500/10' },
            ].map((item, i) => (
              <div key={i} className={`glass rounded-2xl p-6 bg-gradient-to-br ${item.color} hover:border-white/15 transition-all hover:-translate-y-1`}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            {t.how_title}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-500 opacity-30" />

            {[
              { num: '1', icon: '👤', title: t.step_1_title, text: t.step_1_text },
              { num: '2', icon: '🧬', title: t.step_2_title, text: t.step_2_text },
              { num: '3', icon: '✨', title: t.step_3_title, text: t.step_3_text },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-3xl mb-4 shadow-lg glow z-10">
                  {item.icon}
                </div>
                <div className="text-xs text-purple-400 font-bold mb-1">ÉTAPE {item.num}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            {t.testimonials_title} 💬
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: t.t1_text, name: t.t1_name, stars: '⭐⭐⭐⭐⭐' },
              { text: t.t2_text, name: t.t2_name, stars: '⭐⭐⭐⭐⭐' },
              { text: t.t3_text, name: t.t3_name, stars: '⭐⭐⭐⭐⭐' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 flex flex-col gap-4">
                <div className="text-lg">{item.stars}</div>
                <p className="text-gray-300 text-sm leading-relaxed italic">{item.text}</p>
                <p className="text-purple-400 text-sm font-semibold">— {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            {t.pricing_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">

            {/* Free */}
            <div className="glass rounded-3xl p-8 flex flex-col">
              <div className="text-gray-400 font-semibold mb-1">{t.pricing_free_title}</div>
              <div className="text-5xl font-black mb-1">{t.pricing_free_price}</div>
              <div className="text-gray-500 text-sm mb-6">{t.pricing_free_desc}</div>
              <ul className="space-y-3 flex-1 mb-8">
                {[t.pricing_free_f1, t.pricing_free_f2, t.pricing_free_f3, t.pricing_free_f4].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center glass border border-white/15 text-white font-semibold py-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                {t.pricing_free_cta}
              </a>
            </div>

            {/* Premium */}
            <div className="relative rounded-3xl p-8 flex flex-col bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {t.pricing_badge}
              </div>
              <div className="gradient-text font-semibold mb-1">{t.pricing_premium_title}</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-black text-white">{t.pricing_premium_price}</span>
                <span className="text-gray-400 mb-2">{t.pricing_premium_per}</span>
              </div>
              <div className="text-gray-400 text-sm mb-6">{t.pricing_premium_desc}</div>
              <ul className="space-y-3 flex-1 mb-8">
                {[t.pricing_premium_f1, t.pricing_premium_f2, t.pricing_premium_f3, t.pricing_premium_f4, t.pricing_premium_f5].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                    <span className="text-purple-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center shimmer-btn text-white font-bold py-3 rounded-xl"
              >
                {t.pricing_premium_cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto text-center">
          {/* Glow */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.waitlist_title}
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {t.waitlist_sub}
          </p>

          {waitlistStatus === 'success' ? (
            <div className="glass border border-green-500/30 rounded-2xl p-6 text-green-400 text-lg font-semibold">
              {t.waitlist_success}
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.waitlist_placeholder}
                required
                className="flex-1 glass border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors bg-transparent"
              />
              <button
                type="submit"
                disabled={waitlistStatus === 'loading'}
                className="shimmer-btn text-white font-bold px-6 py-3 rounded-xl whitespace-nowrap disabled:opacity-50"
              >
                {waitlistStatus === 'loading' ? '...' : t.waitlist_cta}
              </button>
            </form>
          )}

          {waitlistStatus === 'error' && (
            <p className="text-red-400 text-sm mt-3">{t.waitlist_error}</p>
          )}

          <p className="text-gray-600 text-sm mt-6">{t.waitlist_count}</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Eldaana" className="w-8 h-8 rounded-xl" />
            <div>
              <div className="font-bold gradient-text">Eldaana</div>
              <div className="text-gray-500 text-xs">{t.footer_tagline}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t.footer_try}
            </a>
            <a href="mailto:contact@eldaana.com" className="hover:text-white transition-colors">
              {t.footer_contact}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t.footer_privacy}
            </a>
          </div>

          <div className="text-gray-600 text-xs">{t.footer_rights}</div>
        </div>
      </footer>

    </div>
  )
}
