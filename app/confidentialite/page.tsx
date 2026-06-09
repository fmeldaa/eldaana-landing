import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Eldaana',
  description:
    'Politique de confidentialité d’Eldaana. Comment nous collectons, utilisons et protégeons vos données personnelles, conformément au RGPD.',
  alternates: {
    canonical: 'https://eldaana.com/confidentialite',
    languages: { en: 'https://eldaana.com/privacy' },
  },
  openGraph: {
    title: 'Politique de confidentialité — Eldaana',
    description:
      'Politique de confidentialité d’Eldaana, conforme au RGPD. Vos données vous appartiennent.',
    url: 'https://eldaana.com/confidentialite',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" lang="fr">

      {/* ── Barre de navigation minimale ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Eldaana" className="w-7 h-7 rounded-xl" />
          <span className="font-bold gradient-text">Eldaana</span>
        </Link>
        <Link
          href="/privacy"
          className="text-sm text-gray-400 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-1.5"
        >
          English
        </Link>
      </nav>

      {/* ── Contenu principal ── */}
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-24">

        {/* En-tête */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            <span className="gradient-text">Politique de confidentialit&eacute;</span>
          </h1>
          <div className="text-sm text-gray-500 space-y-1 mt-6 border-l-2 border-purple-500/30 pl-4">
            <p><span className="text-gray-400">Responsable du traitement&nbsp;:</span> Eldaa Consulting</p>
            <p><span className="text-gray-400">Date d&apos;effet&nbsp;:</span> 08/06/2026</p>
            <p><span className="text-gray-400">Derni&egrave;re mise &agrave; jour&nbsp;:</span> 08/06/2026</p>
            <p><span className="text-gray-400">P&eacute;rim&egrave;tre&nbsp;:</span> France + Union europ&eacute;enne</p>
          </div>
        </div>

        <div className="space-y-14 text-gray-300 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Qui sommes-nous&nbsp;?</h2>
            <p>
              Eldaana est une pr&eacute;sence num&eacute;rique conversationnelle &eacute;dit&eacute;e par{' '}
              <strong className="text-white">Eldaa Consulting</strong>, micro-entreprise immatricul&eacute;e en France
              sous le SIRET <strong className="text-white">991&nbsp;294&nbsp;455&nbsp;00019</strong>, dont le si&egrave;ge
              social est situ&eacute; au <strong className="text-white">231 rue Saint-Honor&eacute;, 75001 Paris, France</strong>.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong className="text-white">Responsable du traitement&nbsp;:</strong> Eldaa Consulting, repr&eacute;sent&eacute;e par M. Fandril MBATA MAYELA, fondateur.</p>
              <p><strong className="text-white">Contact pour vos donn&eacute;es personnelles&nbsp;:</strong>{' '}
                <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>
              </p>
              <p><strong className="text-white">D&eacute;l&eacute;gu&eacute; &agrave; la Protection des Donn&eacute;es (DPO)&nbsp;:</strong> Non d&eacute;sign&eacute;. Le responsable du traitement assume directement les obligations en mati&egrave;re de protection des donn&eacute;es.</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. &Agrave; quoi sert cette politique&nbsp;?</h2>
            <p className="mb-4">Cette politique vous explique&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>quelles donn&eacute;es personnelles Eldaana collecte sur vous,</li>
              <li>pourquoi nous les collectons,</li>
              <li>comment nous les prot&eacute;geons,</li>
              <li>combien de temps nous les gardons,</li>
              <li>et quels sont vos droits pour les contr&ocirc;ler.</li>
            </ul>
            <p className="mt-4">
              Elle s&apos;applique &agrave; toute personne utilisant Eldaana en France et dans l&apos;Union europ&eacute;enne.
              En utilisant Eldaana, vous reconnaissez avoir lu et compris cette politique. Votre consentement explicite
              est recueilli lors de votre premi&egrave;re connexion via un &eacute;cran d&eacute;di&eacute;.
            </p>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">2.1 Ce qu&apos;est Eldaana &mdash; et ce qu&apos;elle n&apos;est pas</h3>
            <p className="mb-4">
              Eldaana est une pr&eacute;sence num&eacute;rique conversationnelle personnalis&eacute;e, con&ccedil;ue pour accompagner
              l&apos;utilisateur dans son quotidien, lui proposer des suggestions, l&apos;aider &agrave; organiser certaines d&eacute;cisions
              et lui offrir un espace d&apos;&eacute;change plus personnel.
            </p>
            <p className="mb-2"><strong className="text-white">Eldaana n&apos;est pas&nbsp;:</strong></p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>un professionnel de sant&eacute; ou un dispositif m&eacute;dical,</li>
              <li>un psychologue, un psychiatre ou un th&eacute;rapeute,</li>
              <li>un conseiller juridique ou financier,</li>
              <li>ni un substitut &agrave; une relation humaine, familiale, amicale ou amoureuse.</li>
            </ul>
            <p className="mb-4">
              Les r&eacute;ponses d&apos;Eldaana, y compris lorsqu&apos;elles prennent la forme de r&eacute;flexions sur l&apos;avenir,
              de pr&eacute;dictions probabilistes ou de conseils personnalis&eacute;s, ont pour finalit&eacute; d&apos;accompagner
              l&apos;utilisateur et de l&apos;aider &agrave; r&eacute;fl&eacute;chir. Elles ne constituent jamais des certitudes,
              des diagnostics, ni des recommandations professionnelles individualis&eacute;es.
            </p>
            <p className="mb-4">
              Eldaana est con&ccedil;ue pour soutenir l&apos;utilisateur sans encourager une d&eacute;pendance affective exclusive.
              Nous nous r&eacute;servons le droit de limiter, reformuler ou interrompre certaines interactions lorsque cela
              est n&eacute;cessaire pour prot&eacute;ger l&apos;utilisateur, pr&eacute;server une utilisation saine du service ou
              respecter nos obligations l&eacute;gales.
            </p>
            <p className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm">
              <strong className="text-white">Si vous traversez une p&eacute;riode difficile</strong> (id&eacute;es suicidaires,
              d&eacute;tresse intense, comportements &agrave; risque), Eldaana peut d&eacute;tecter ces signaux et vous orienter
              vers des ressources d&apos;aide professionnelle.{' '}
              <strong className="text-white">Num&eacute;ro national de pr&eacute;vention du suicide en France&nbsp;: 3114</strong>{' '}
              (disponible 24h/24, 7j/7, gratuit et confidentiel).
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Quelles donn&eacute;es collectons-nous&nbsp;?</h2>

            <h3 className="text-lg font-semibold text-gray-100 mt-6 mb-3">3.1 Donn&eacute;es que vous nous fournissez directement</h3>
            <p className="mb-2 font-medium text-gray-200">&Agrave; la connexion (via Google, Facebook ou LinkedIn)&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Pr&eacute;nom, nom</li>
              <li>Adresse email</li>
              <li>Photo de profil</li>
              <li>Langue pr&eacute;f&eacute;r&eacute;e</li>
              <li>Ville de r&eacute;sidence (d&eacute;clar&eacute;e par vous-m&ecirc;me, pour personnaliser m&eacute;t&eacute;o et transports)</li>
            </ul>
            <p className="mb-2 font-medium text-gray-200">Lors de vos conversations avec Eldaana&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Le contenu de vos messages textuels et vocaux</li>
              <li>Les r&eacute;ponses aux questions pos&eacute;es par Eldaana lors de l&apos;onboarding conversationnel</li>
              <li>Les corrections que vous apportez &agrave; votre profil</li>
            </ul>
            <p className="mb-2 font-medium text-gray-200">Donn&eacute;es de paiement (uniquement pour les abonnements payants Essential et Premium)&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Trait&eacute;es exclusivement par Stripe, notre prestataire de paiement</li>
              <li>Eldaa Consulting ne stocke ni ne traite directement vos coordonn&eacute;es bancaires</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">3.2 Donn&eacute;es apprises par Eldaana au fil des conversations</h3>
            <p className="mb-4">
              Avec votre consentement explicite, Eldaana peut d&eacute;tecter, inf&eacute;rer et enregistrer certaines informations
              issues de vos &eacute;changes afin de personnaliser votre exp&eacute;rience. Ces informations peuvent inclure&nbsp;:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mb-6">
              <li><strong className="text-gray-200">Donn&eacute;es socio-d&eacute;mographiques</strong>&nbsp;: ville et pays de r&eacute;sidence, ann&eacute;e de naissance, situation amoureuse, pr&eacute;sence et nombre d&apos;enfants</li>
              <li><strong className="text-gray-200">Donn&eacute;es professionnelles</strong>&nbsp;: type d&apos;activit&eacute;, m&eacute;tier, secteur</li>
              <li><strong className="text-gray-200">Donn&eacute;es de mode de vie</strong>&nbsp;: r&eacute;gime alimentaire, hobbies, transports utilis&eacute;s, r&eacute;seaux sociaux actifs</li>
              <li><strong className="text-gray-200">Donn&eacute;es de pr&eacute;f&eacute;rences et de communication</strong>&nbsp;: style de r&eacute;ponse pr&eacute;f&eacute;r&eacute;, routines, centres d&apos;int&eacute;r&ecirc;t, objectifs personnels</li>
              <li><strong className="text-gray-200">Donn&eacute;es psychographiques</strong> (utilisateurs Premium uniquement)&nbsp;: valeurs personnelles, priorit&eacute;s de vie, pr&eacute;f&eacute;rences de communication, modes d&apos;organisation, aspirations exprim&eacute;es</li>
            </ul>
            <p className="mb-4">
              Eldaana n&apos;est pas con&ccedil;ue pour collecter ni analyser de mani&egrave;re intentionnelle des donn&eacute;es sensibles
              au sens du RGPD, notamment&nbsp;: les donn&eacute;es de sant&eacute; physique ou mentale, les opinions politiques,
              les croyances religieuses ou philosophiques, l&apos;orientation sexuelle, les donn&eacute;es biom&eacute;triques,
              le num&eacute;ro de s&eacute;curit&eacute; sociale ou tout identifiant national.
            </p>
            <p>
              Certaines conversations peuvent cependant contenir des &eacute;l&eacute;ments personnels susceptibles d&apos;aborder
              indirectement ces sujets. Dans ce cas, ces &eacute;l&eacute;ments ne sont pas utilis&eacute;s &agrave; des fins publicitaires
              ou commerciales, ne servent pas &agrave; &eacute;tablir un profil sensible, et sont trait&eacute;s uniquement dans
              la mesure n&eacute;cessaire &agrave; la fourniture du service ou au respect de la loi.
            </p>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">3.3 Donn&eacute;es techniques</h3>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-3">
              <li>Logs de session (anonymis&eacute;s)</li>
              <li>Compteur d&apos;appels API quotidiens</li>
              <li>Jetons d&apos;authentification (chiffr&eacute;s)</li>
              <li>Cookies techniques n&eacute;cessaires au fonctionnement de l&apos;app</li>
            </ul>
            <p>Nous <strong className="text-white">n&apos;utilisons pas</strong> de cookies publicitaires ni de trackers tiers.</p>
          </section>

          <hr className="border-white/5" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">4. Pourquoi collectons-nous ces donn&eacute;es&nbsp;?</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Finalit&eacute;</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Base l&eacute;gale (RGPD art. 6)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Fournir le service Eldaana (conversation, pr&eacute;dictions personnalis&eacute;es)', 'Ex&eacute;cution du contrat'],
                    ['Personnaliser votre exp&eacute;rience (extraction silencieuse des conversations)', 'Consentement explicite'],
                    ['G&eacute;rer votre abonnement et vos paiements', 'Ex&eacute;cution du contrat + obligation l&eacute;gale'],
                    ['Am&eacute;liorer le service (analyse anonymis&eacute;e)', 'Int&eacute;r&ecirc;t l&eacute;gitime'],
                    ['Vous contacter pour des informations importantes', 'Int&eacute;r&ecirc;t l&eacute;gitime'],
                    ['Respecter nos obligations l&eacute;gales et fiscales', 'Obligation l&eacute;gale'],
                  ].map(([finalite, base], i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3" dangerouslySetInnerHTML={{ __html: finalite }} />
                      <td className="px-4 py-3 text-gray-400" dangerouslySetInnerHTML={{ __html: base }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 font-semibold text-white">
              Aucune donn&eacute;e n&apos;est utilis&eacute;e &agrave; des fins publicitaires, ni revendue &agrave; des tiers, en aucun cas.
            </p>
            <p className="mt-4">Plus pr&eacute;cis&eacute;ment, nous <strong className="text-white">N&apos;utilisons JAMAIS</strong> vos donn&eacute;es pour&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>construire un profil publicitaire de vous,</li>
              <li>vous d&eacute;marcher commercialement pour des produits tiers,</li>
              <li>vendre ou louer ces donn&eacute;es.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">4.1 Utilisation des conversations pour l&apos;am&eacute;lioration et l&apos;entra&icirc;nement</h3>
            <p className="mb-4">
              Par d&eacute;faut, <strong className="text-white">les conversations avec Eldaana ne sont pas utilis&eacute;es par Eldaa Consulting pour entra&icirc;ner ses propres mod&egrave;les</strong>.
            </p>
            <p className="mb-4">
              Nous pouvons en revanche utiliser certaines donn&eacute;es de mani&egrave;re <strong className="text-white">anonymis&eacute;e ou agr&eacute;g&eacute;e</strong>,
              &agrave; des fins de mesure de qualit&eacute;, d&apos;am&eacute;lioration des fonctionnalit&eacute;s, de d&eacute;tection d&apos;erreurs
              et d&apos;ajustement des sc&eacute;narios conversationnels.
            </p>
            <p>
              Lorsque nous faisons appel &agrave; des fournisseurs d&apos;infrastructure (Anthropic, Google, Perplexity, etc.),
              ces derniers peuvent traiter certaines donn&eacute;es pour ex&eacute;cuter le service, conform&eacute;ment &agrave;
              leurs conditions contractuelles. Si &agrave; l&apos;avenir Eldaa Consulting souhaite utiliser des conversations
              identifiables pour entra&icirc;ner ses propres syst&egrave;mes, cela ne sera fait qu&apos;apr&egrave;s information
              claire de l&apos;utilisateur et, lorsque le RGPD l&apos;exige, sur la base d&apos;un consentement explicite distinct.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">5. Avec qui partageons-nous vos donn&eacute;es&nbsp;?</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Sous-traitant</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">R&ocirc;le</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Localisation</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Encadrement juridique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Anthropic PBC', 'Génération des réponses Eldaana (modèles Claude)', 'États-Unis', 'CCT + EU-US Data Privacy Framework'],
                    ['Streamlit / Snowflake', 'Hébergement de l’application', 'États-Unis', 'CCT + Data Privacy Framework'],
                    ['Supabase Inc.', 'Hébergement de la base de données utilisateurs', 'Union européenne', 'Traitement intra-UE, RGPD direct'],
                    ['Google LLC', 'Authentification OAuth + modèle Gemini', 'États-Unis', 'CCT + Data Privacy Framework'],
                    ['Meta Platforms', 'Authentification OAuth Facebook', 'États-Unis', 'CCT + Data Privacy Framework'],
                    ['Microsoft Corporation', 'Authentification OAuth LinkedIn', 'États-Unis / Irlande', 'CCT + Data Privacy Framework'],
                    ['Perplexity AI', 'Recherche d’informations transport', 'États-Unis', 'Clauses contractuelles types'],
                    ['Stripe Inc.', 'Traitement des paiements (abonnés payants uniquement)', 'États-Unis / Irlande', 'CCT + Data Privacy Framework'],
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
              Nous ne vendons, ne louons, ni ne partageons jamais vos donn&eacute;es &agrave; des fins commerciales avec qui que ce soit d&apos;autre.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Transferts hors Union europ&eacute;enne</h2>
            <p className="mb-4">
              Plusieurs sous-traitants sont situ&eacute;s aux &Eacute;tats-Unis. Conform&eacute;ment au RGPD, ces transferts sont encadr&eacute;s par&nbsp;:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Les <strong className="text-white">Clauses contractuelles types</strong> (CCT) de la Commission europ&eacute;enne</li>
              <li>Le <strong className="text-white">Data Privacy Framework</strong> UE-US lorsque le sous-traitant y est certifi&eacute;</li>
              <li>Des mesures de s&eacute;curit&eacute; techniques (chiffrement en transit et au repos)</li>
            </ul>
            <p>
              Notre base de donn&eacute;es principale (Supabase) est h&eacute;berg&eacute;e dans l&apos;Union europ&eacute;enne &mdash; vos donn&eacute;es
              conversationnelles et de profil ne quittent donc pas l&apos;UE pour leur stockage. Vous pouvez demander une
              copie de ces garanties via{' '}
              <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">7. Combien de temps gardons-nous vos donn&eacute;es&nbsp;?</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Type de donn&eacute;es</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-semibold">Dur&eacute;e de conservation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Données de compte et profil utilisateur', '24 mois après votre dernière activité'],
                    ['Conversations brutes (texte et voix)', '12 mois après leur création, sauf suppression anticipée demandée par l’utilisateur'],
                    ['Mémoire conversationnelle dérivée', '24 mois après la dernière interaction pertinente, avec possibilité d’effacement granulaire à tout moment'],
                    ['Journaux ou contenus enregistrés par l’utilisateur', "Jusqu'à suppression par l'utilisateur ou 24 mois après la dernière activité"],
                    ['Logs techniques', '12 mois'],
                    ['Données de facturation', '10 ans (obligation légale fiscale française)'],
                    ['Après suppression du compte', 'Effacement sous 30 jours, sauf obligations légales'],
                  ].map(([type, duree], i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-gray-200">{type}</td>
                      <td className="px-4 py-3 text-gray-400">{duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              L&apos;utilisateur peut demander &agrave; tout moment la suppression d&apos;une conversation pr&eacute;cise,
              d&apos;un fait appris, d&apos;un ensemble de souvenirs, ou de l&apos;int&eacute;gralit&eacute; de son historique.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Comment prot&eacute;geons-nous vos donn&eacute;es&nbsp;?</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">Chiffrement</strong> des jetons d&apos;authentification (Fernet)</li>
              <li><strong className="text-white">HTTPS obligatoire</strong> sur toutes les connexions</li>
              <li><strong className="text-white">Row Level Security</strong> sur Supabase&nbsp;: chaque utilisateur n&apos;acc&egrave;de qu&apos;&agrave; ses propres donn&eacute;es</li>
              <li><strong className="text-white">Sauvegardes</strong> r&eacute;guli&egrave;res chiffr&eacute;es</li>
              <li><strong className="text-white">Audits de s&eacute;curit&eacute;</strong> p&eacute;riodiques</li>
              <li><strong className="text-white">Plan de r&eacute;ponse aux incidents</strong>&nbsp;: notification sous 72 heures en cas de violation susceptible de pr&eacute;senter un risque pour vos droits (RGPD art. 33)</li>
            </ul>
          </section>

          <hr className="border-white/5" />

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Vos droits</h2>
            <p className="mb-6">Conform&eacute;ment au RGPD (articles 15 &agrave; 22) et &agrave; la loi fran&ccedil;aise Informatique et Libert&eacute;s&nbsp;:</p>
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.1 Droit d&apos;acc&egrave;s</h3>
                <p>Voir l&apos;ensemble de vos donn&eacute;es depuis la page <strong className="text-white">&laquo;&nbsp;Mon profil&nbsp;&raquo;</strong>, section &ldquo;Ce qu&apos;Eldaana a appris en discutant avec toi&rdquo;.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.2 Droit de rectification</h3>
                <p>Modifier vos donn&eacute;es depuis la page <strong className="text-white">&laquo;&nbsp;Mon profil&nbsp;&raquo;</strong>, manuellement ou en demandant &agrave; Eldaana.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.3 Droit &agrave; l&apos;effacement (&laquo;&nbsp;droit &agrave; l&apos;oubli&nbsp;&raquo;)</h3>
                <p className="mb-2">Effacer une information apprise (bouton ✕) ou tout votre historique d&apos;apprentissage (bouton &laquo;&nbsp;🗑️ Tout effacer&nbsp;&raquo;). Pour la suppression compl&egrave;te de votre compte&nbsp;: <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>.</p>
                <p>Vous pouvez &eacute;galement utiliser la commande <code className="bg-white/10 px-1.5 py-0.5 rounded text-purple-300 text-sm">!supprimer</code> directement dans le chat.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.3 bis &mdash; Droit d&apos;effacement cibl&eacute; de la m&eacute;moire relationnelle</h3>
                <p>
                  Vous pouvez demander la suppression d&apos;une information, d&apos;une pr&eacute;f&eacute;rence ou d&apos;un &laquo;&nbsp;souvenir&nbsp;&raquo;
                  appris par Eldaana, sans supprimer l&apos;int&eacute;gralit&eacute; de votre compte. Cette suppression cibl&eacute;e s&apos;applique
                  &agrave; l&apos;affichage dans votre profil, &agrave; la m&eacute;moire relationnelle et aux donn&eacute;es dans nos syst&egrave;mes actifs.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.4 Droit &agrave; la portabilit&eacute;</h3>
                <p>Exporter vos donn&eacute;es en JSON depuis la page &laquo;&nbsp;Mon profil&nbsp;&raquo; &rarr; &laquo;&nbsp;Exporter mes donn&eacute;es&nbsp;&raquo;.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.5 Droit d&apos;opposition</h3>
                <p>D&eacute;sactiver l&apos;extraction silencieuse tout en continuant &agrave; utiliser Eldaana, depuis les param&egrave;tres.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.6 Droit &agrave; la limitation</h3>
                <p>Suspendre temporairement le traitement. Contactez <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.7 Droit de retirer votre consentement</h3>
                <p>&Agrave; tout moment, sans que cela compromette la lic&eacute;it&eacute; des traitements ant&eacute;rieurs.</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-100 mb-1">9.8 Droit d&apos;introduire une r&eacute;clamation</h3>
                <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                  <li><strong className="text-white">France&nbsp;:</strong> CNIL &mdash; <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">www.cnil.fr</a></li>
                  <li><strong className="text-white">Union europ&eacute;enne&nbsp;:</strong> autorit&eacute; de contr&ocirc;le de votre pays de r&eacute;sidence</li>
                </ul>
                <p className="mt-2 text-sm text-gray-400"><strong className="text-gray-300">D&eacute;lai de r&eacute;ponse&nbsp;:</strong> un mois maximum &agrave; compter de la r&eacute;ception de votre demande.</p>
              </div>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Cookies</h2>
            <p className="mb-3">Eldaana utilise uniquement des cookies <strong className="text-white">strictement n&eacute;cessaires</strong>&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Cookie de session (maintien de votre connexion)</li>
              <li>Cookie de pr&eacute;f&eacute;rences (langue, th&egrave;me)</li>
            </ul>
            <p className="font-semibold text-white">Aucun cookie publicitaire, analytique tiers, ou de pistage n&apos;est utilis&eacute;.</p>
          </section>

          <hr className="border-white/5" />

          {/* 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Mineurs</h2>
            <p className="mb-4">
              Eldaana est destin&eacute;e aux utilisateurs <strong className="text-white">&acirc;g&eacute;s de 15 ans et plus</strong>,
              conform&eacute;ment &agrave; l&apos;article 8 du RGPD et &agrave; la majorit&eacute; num&eacute;rique applicable en France.
            </p>
            <p className="mb-4">
              <strong className="text-white">Pour les utilisateurs &acirc;g&eacute;s de 15 &agrave; 18 ans&nbsp;:</strong> certaines fonctionnalit&eacute;s
              peuvent &ecirc;tre limit&eacute;es ou adapt&eacute;es, et certains types d&apos;interactions peuvent faire l&apos;objet
              de garde-fous renforc&eacute;s. Nous recommandons une utilisation accompagn&eacute;e ou supervis&eacute;e par un parent
              ou un responsable l&eacute;gal lorsque cela est appropri&eacute;.
            </p>
            <p>
              <strong className="text-white">V&eacute;rification d&apos;&acirc;ge &agrave; l&apos;inscription&nbsp;:</strong> un champ de date
              de naissance est requis lors de la cr&eacute;ation du compte. Les comptes d&eacute;clarant un &acirc;ge inf&eacute;rieur
              &agrave; 15 ans sont automatiquement rejet&eacute;s.
            </p>
          </section>

          <hr className="border-white/5" />

          {/* 12 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Modifications</h2>
            <p className="mb-4">
              Cette politique peut &ecirc;tre mise &agrave; jour. En cas de modification substantielle, nous vous en informerons&nbsp;:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Par email</li>
              <li>Par notification dans l&apos;application</li>
              <li>Par mise &agrave; jour visible sur eldaana.com/confidentialite</li>
            </ul>
            <p>La date de la derni&egrave;re mise &agrave; jour est indiqu&eacute;e en haut du document.</p>
          </section>

          <hr className="border-white/5" />

          {/* 13 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Nous contacter</h2>
            <div className="space-y-2">
              <p><strong className="text-white">Email&nbsp;:</strong>{' '}
                <a href="mailto:privacy@eldaana.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@eldaana.com</a>
              </p>
              <p><strong className="text-white">Courrier&nbsp;:</strong> Eldaa Consulting, 231 rue Saint-Honor&eacute;, 75001 Paris, France</p>
            </div>
          </section>

        </div>

        {/* Lien retour */}
        <div className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">&larr; Retour &agrave; l&apos;accueil</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">English &rarr;</Link>
        </div>
      </main>

    </div>
  )
}
