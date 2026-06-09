import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Eldaana',
  description:
    'Eldaana Privacy Policy. How we collect, use and protect your personal data, in accordance with GDPR.',
  alternates: {
    canonical: 'https://eldaana.com/privacy',
    languages: { fr: 'https://eldaana.com/confidentialite' },
  },
  openGraph: {
    title: 'Privacy Policy — Eldaana',
    description:
      'Eldaana Privacy Policy, GDPR-compliant. Your data belongs to you.',
    url: 'https://eldaana.com/privacy',
    locale: 'en_US',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" lang="en">

      {/* ── Minimal nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Eldaana" className="w-7 h-7 rounded-xl" />
          <span className="font-bold gradient-text">Eldaana</span>
        </Link>
        <Link
          href="/confidentialite"
          className="text-sm text-gray-400 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-1.5"
        >
          Fran&ccedil;ais
        </Link>
      </nav>

      {/* ── Main content ── */}
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-24">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <div className="text-sm text-gray-500 space-y-1 mt-6 border-l-2 border-purple-500/30 pl-4">
            <p><span className="text-gray-400">Data Controller:</span> Eldaa Consulting</p>
            <p><span className="text-gray-400">Effective date:</span> 08/06/2026</p>
            <p><span className="text-gray-400">Last updated:</span> 08/06/2026</p>
            <p><span className="text-gray-400">Scope:</span> France + European Union</p>
          </div>
        </div>

        <div className="space-y-14 text-gray-300 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Who we are</h2>
            <p>
              Eldaana is a conversational digital presence operated by{' '}
              <strong className="text-white">Eldaa Consulting</strong>, a micro-enterprise registered in France
              under SIRET number <strong className="text-white">991&nbsp;294&nbsp;455&nbsp;00019</strong>,
              headquartered at{' '}
              <strong className="text-white">231 rue Saint-Honor&eacute;, 75001 Paris, France</strong>.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong className="text-white">Data Controller:</strong> Eldaa Consulting, represented by Mr. Fandril MBATA MAYELA, Founder.</p>
              <p><strong className="text-white">Contact for personal data:</strong>{' '}
                <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>
              </p>
              <p><strong className="text-white">Data Protection Officer (DPO):</strong> Not appointed. The Data Controller directly assumes data protection obligations.</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. What this policy is for</h2>
            <p className="mb-4">This policy explains:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>what personal data Eldaana collects about you,</li>
              <li>why we collect it,</li>
              <li>how we protect it,</li>
              <li>how long we keep it,</li>
              <li>and what rights you have to control it.</li>
            </ul>
            <p className="mt-4">
              It applies to anyone using Eldaana in France and the European Union. By using Eldaana,
              you acknowledge that you have read and understood this policy. Your explicit consent is
              collected at first login via a dedicated screen.
            </p>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">2.1 What Eldaana is &mdash; and what it is not</h3>
            <p className="mb-4">
              Eldaana is a personalized conversational digital presence, designed to support users in
              their daily life, suggest options, help organize certain decisions, and offer a more
              personal space for exchange.
            </p>
            <p className="mb-2"><strong className="text-white">Eldaana is not:</strong></p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>a healthcare professional or medical device,</li>
              <li>a psychologist, psychiatrist, or therapist,</li>
              <li>a legal or financial advisor,</li>
              <li>nor a substitute for a human, family, friendly, or romantic relationship.</li>
            </ul>
            <p className="mb-4">
              Eldaana&apos;s responses, even when they take the form of reflections on the future,
              probabilistic predictions, or personalized advice, are intended to accompany the user
              and help them think. They never constitute certainties, diagnoses, or individualized
              professional recommendations.
            </p>
            <p className="mb-4">
              Eldaana is designed to support users without encouraging exclusive emotional dependency.
              We reserve the right to limit, rephrase, or interrupt certain interactions when
              necessary to protect the user, preserve healthy use of the service, or comply with our
              legal obligations.
            </p>
            <p className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm">
              <strong className="text-white">If you are going through a difficult time</strong>{' '}
              (suicidal thoughts, intense distress, risky behaviors), Eldaana may detect these signals
              and direct you toward professional help resources.{' '}
              <strong className="text-white">In France: National Suicide Prevention Number 3114</strong>{' '}
              (available 24/7, free and confidential).
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. What data we collect</h2>

            <h3 className="text-lg font-semibold text-gray-100 mt-6 mb-3">3.1 Data you provide directly</h3>
            <p className="mb-2 font-medium text-gray-200">At login (via Google, Facebook, or LinkedIn):</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>First name, last name</li>
              <li>Email address</li>
              <li>Profile picture</li>
              <li>Preferred language</li>
              <li>City of residence (declared by you, to personalize weather and transport)</li>
            </ul>
            <p className="mb-2 font-medium text-gray-200">During your conversations with Eldaana:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Content of your text and voice messages</li>
              <li>Answers to questions Eldaana asks during conversational onboarding</li>
              <li>Corrections you make to your profile</li>
            </ul>
            <p className="mb-2 font-medium text-gray-200">Payment data (only for paid Essential and Premium subscriptions):</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Processed exclusively by Stripe, our payment provider</li>
              <li>Eldaa Consulting neither stores nor processes your payment card details directly</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">3.2 Data Eldaana learns from conversations</h3>
            <p className="mb-4">
              With your explicit consent, Eldaana may detect, infer, and store certain information
              from your exchanges to personalize your experience. This information may include:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mb-6">
              <li><strong className="text-gray-200">Socio-demographic data:</strong> city and country of residence, year of birth, relationship status, presence and number of children</li>
              <li><strong className="text-gray-200">Professional data:</strong> type of activity, profession, sector</li>
              <li><strong className="text-gray-200">Lifestyle data:</strong> dietary preferences, hobbies, modes of transport, active social networks</li>
              <li><strong className="text-gray-200">Communication and preference data:</strong> preferred response style, routines, interests, personal goals</li>
              <li><strong className="text-gray-200">Psychographic data</strong> (Premium users only): personal values, life priorities, communication preferences, organizational patterns, expressed aspirations</li>
            </ul>
            <p className="mb-4">
              Eldaana is not designed to intentionally collect or analyze sensitive data within the
              meaning of GDPR, in particular: physical or mental health data, political opinions,
              religious or philosophical beliefs, sexual orientation, biometric data, social security
              number or any national identifier.
            </p>
            <p>
              Some conversations may contain personal elements that indirectly touch upon these topics.
              In such cases, these elements are not used for advertising or commercial purposes, are
              not exploited to establish a sensitive profile, and are processed only to the extent
              necessary to provide the service or comply with the law.
            </p>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">3.3 Technical data</h3>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-3">
              <li>Session logs (anonymized)</li>
              <li>Daily API call counter</li>
              <li>Authentication tokens (encrypted)</li>
              <li>Technical cookies necessary for app operation</li>
            </ul>
            <p>We <strong className="text-white">do not use</strong> advertising cookies or third-party trackers.</p>
          </section>

          <hr className="border-white/5" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">4. Why we collect this data</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Purpose</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Legal basis (GDPR Article 6)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Provide the Eldaana service (conversation, personalized predictions)', 'Performance of contract'],
                    ['Personalize your experience (silent extraction from conversations)', 'Explicit consent'],
                    ['Manage your subscription and payments', 'Performance of contract + legal obligation'],
                    ['Improve the service (anonymized analysis)', 'Legitimate interest'],
                    ['Contact you for important information', 'Legitimate interest'],
                    ['Comply with legal and tax obligations', 'Legal obligation'],
                  ].map(([purpose, basis], i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3">{purpose}</td>
                      <td className="px-4 py-3 text-gray-400">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 font-semibold text-white">
              No data is used for advertising or sold to third parties under any circumstances.
            </p>
            <p className="mt-4">More specifically, we <strong className="text-white">NEVER use</strong> your data to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>build an advertising profile of you,</li>
              <li>approach you commercially for third-party products,</li>
              <li>sell or rent this data.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">4.1 Use of conversations for improvement and training</h3>
            <p className="mb-4">
              By default,{' '}
              <strong className="text-white">conversations with Eldaana are not used by Eldaa Consulting to train its own models</strong>.
            </p>
            <p className="mb-4">
              We may, however, use certain data in an{' '}
              <strong className="text-white">anonymized or aggregated</strong> manner for quality
              measurement, feature improvement, error detection, and adjustment of conversational scenarios.
            </p>
            <p>
              When we rely on infrastructure providers (Anthropic, Google, Perplexity, etc.), they may
              process certain data to execute the service, in accordance with their contractual terms.
              If in the future Eldaa Consulting wishes to use identifiable conversations to train its own
              systems, this will only be done after clear information to the user and, where GDPR
              requires it, on the basis of distinct explicit consent.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">5. Who we share your data with</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Processor</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Role</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Location</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Legal framework</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Anthropic PBC', 'Eldaana response generation (Claude models)', 'USA', 'EU SCCs + Data Privacy Framework'],
                    ['Streamlit / Snowflake', 'Application hosting', 'USA', 'SCCs + Data Privacy Framework'],
                    ['Supabase Inc.', 'User database hosting', 'European Union', 'Intra-EU processing, GDPR'],
                    ['Google LLC', 'OAuth authentication + Gemini model', 'USA', 'SCCs + Data Privacy Framework'],
                    ['Meta Platforms Inc.', 'Facebook OAuth authentication', 'USA', 'SCCs + Data Privacy Framework'],
                    ['Microsoft Corporation', 'LinkedIn OAuth authentication', 'USA / Ireland', 'SCCs + Data Privacy Framework'],
                    ['Perplexity AI', 'Transport information search', 'USA', 'Standard Contractual Clauses'],
                    ['Stripe Inc.', 'Payment processing (paid subscriptions only)', 'USA / Ireland', 'SCCs + Data Privacy Framework'],
                  ].map(([name, role, loc, legal], i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-gray-200">{name}</td>
                      <td className="px-4 py-3">{role}</td>
                      <td className="px-4 py-3 text-gray-400">{loc}</td>
                      <td className="px-4 py-3 text-gray-400">{legal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We never sell, rent, or share your data for commercial purposes with anyone else.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. International transfers (outside EU)</h2>
            <p className="mb-4">
              Several processors are based in the United States. Under GDPR, these transfers are governed by:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li><strong className="text-white">EU Standard Contractual Clauses (SCCs)</strong></li>
              <li><strong className="text-white">EU-US Data Privacy Framework</strong> when the processor is certified</li>
              <li>Technical security measures (encryption in transit and at rest)</li>
            </ul>
            <p>
              Our main database (Supabase) is hosted within the European Union &mdash; your conversational
              and profile data do not leave the EU for storage. You may request a copy of these
              safeguards via{' '}
              <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">7. How long we keep your data</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Data type</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Retention period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Account data and user profile', '24 months after your last activity'],
                    ['Raw conversations (text and voice)', '12 months after creation, unless early deletion is requested'],
                    ['Derived conversational memory (preferences, learned facts, profile elements)', '24 months after last relevant interaction, with granular erasure available at any time'],
                    ['Logs or content explicitly saved by the user', 'Until user deletion or 24 months after last activity'],
                    ['Technical logs', '12 months'],
                    ['Billing data', '10 years (French legal tax obligation)'],
                    ['After account deletion', 'Erased within 30 days, except legal obligations'],
                  ].map(([type, period], i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-gray-200">{type}</td>
                      <td className="px-4 py-3 text-gray-400">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Users may request at any time the deletion of a specific conversation, a learned fact,
              a set of memories, or their entire history.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. How we protect your data</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">Encryption</strong> of authentication tokens (Fernet)</li>
              <li><strong className="text-white">Mandatory HTTPS</strong> on all connections</li>
              <li><strong className="text-white">Row Level Security</strong> on Supabase: each user only accesses their own data</li>
              <li><strong className="text-white">Regular encrypted backups</strong></li>
              <li><strong className="text-white">Periodic security audits</strong></li>
              <li><strong className="text-white">Incident response plan</strong>: notification within 72 hours in case of a breach likely to pose a risk to your rights, in accordance with GDPR Article 33</li>
            </ul>
          </section>

          <hr className="border-white/5" />

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Your rights</h2>
            <p className="mb-6">In accordance with GDPR (Articles 15&ndash;22) and the French Data Protection Act:</p>
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.1 Right of access</h3>
                <p>View all your data from the <strong className="text-white">&ldquo;My Profile&rdquo;</strong> page, section &ldquo;What Eldaana has learned from chatting with you&rdquo;.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.2 Right to rectification</h3>
                <p>Modify your data from the <strong className="text-white">&ldquo;My Profile&rdquo;</strong> page, manually or by asking Eldaana.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.3 Right to erasure (&ldquo;right to be forgotten&rdquo;)</h3>
                <p className="mb-2">Erase a learned piece of information (✕ button) or your entire learning history (&ldquo;🗑️ Erase everything&rdquo; button). For complete account deletion: <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>.</p>
                <p>You can also use the <code className="bg-white/10 px-1.5 py-0.5 rounded text-purple-300 text-sm">!delete</code> command directly in the chat.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.3 bis &mdash; Right to targeted erasure of relational memory</h3>
                <p>
                  You may request the deletion of a specific information, a preference, or a
                  &ldquo;memory&rdquo; learned by Eldaana, without deleting your entire account.
                  This targeted deletion applies to the display in your profile, the relational
                  memory used by Eldaana, and the data stored in our active systems.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.4 Right to portability</h3>
                <p>Export your data in JSON from the &ldquo;My Profile&rdquo; page &rarr; &ldquo;Export my data&rdquo;.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.5 Right to object</h3>
                <p>Disable silent extraction while continuing to use Eldaana, from settings.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.6 Right to restriction</h3>
                <p>Temporarily suspend processing. Contact <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.7 Right to withdraw consent</h3>
                <p>At any time, without affecting the lawfulness of prior processing.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.8 Right to lodge a complaint</h3>
                <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                  <li><strong className="text-white">France:</strong> CNIL &mdash; <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">www.cnil.fr</a></li>
                  <li><strong className="text-white">European Union:</strong> supervisory authority of your country of residence</li>
                </ul>
                <p className="mt-2 text-sm text-gray-400"><strong className="text-gray-300">Response time:</strong> maximum one month from receipt of your request.</p>
              </div>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Cookies</h2>
            <p className="mb-3">Eldaana uses only <strong className="text-white">strictly necessary</strong> cookies:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Session cookie (maintaining your login)</li>
              <li>Preferences cookie (language, theme)</li>
            </ul>
            <p className="font-semibold text-white">No advertising, third-party analytics, or tracking cookies.</p>
          </section>

          <hr className="border-white/5" />

          {/* 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Minors</h2>
            <p className="mb-4">
              Eldaana is intended for users <strong className="text-white">aged 15 and above</strong>,
              in accordance with GDPR Article 8 and French digital majority age.
            </p>
            <p className="mb-4">
              <strong className="text-white">For users aged 15 to 18:</strong> some features may be
              limited or adapted, some types of interactions may be subject to enhanced safeguards,
              and we recommend supervised use by a parent or legal guardian when appropriate.
            </p>
            <p>
              <strong className="text-white">Age verification at signup:</strong> a date of birth field
              is required when creating an account. Accounts declaring an age below 15 are
              automatically rejected.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 12 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes</h2>
            <p className="mb-4">
              This policy may be updated. In case of substantial change, we will notify you:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>By email</li>
              <li>By in-app notification</li>
              <li>By visible update on eldaana.com/privacy</li>
            </ul>
            <p>The last update date is shown at the top of the document.</p>
          </section>

          <hr className="border-white/5" />

          {/* 13 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact us</h2>
            <div className="space-y-2">
              <p><strong className="text-white">Email:</strong>{' '}
                <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>
              </p>
              <p><strong className="text-white">Mail:</strong> Eldaa Consulting, 231 rue Saint-Honor&eacute;, 75001 Paris, France</p>
            </div>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">&larr; Back to home</Link>
          <Link href="/confidentialite" className="hover:text-white transition-colors">Fran&ccedil;ais &rarr;</Link>
        </div>
      </main>

    </div>
  )
}
