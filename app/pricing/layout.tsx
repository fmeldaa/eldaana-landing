import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — Eldaana',
  description: "Choisissez votre façon d'expérimenter Eldaana. Découverte gratuite, Audio & Texte 9,99€/mois, Conversation 29,99€/mois.",
  openGraph: {
    title: 'Tarifs — Eldaana',
    description: "Choisissez votre façon d'expérimenter Eldaana.",
    url: 'https://eldaana.com/pricing',
    siteName: 'Eldaana',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Eldaana' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs — Eldaana',
    description: "Choisissez votre façon d'expérimenter Eldaana.",
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
