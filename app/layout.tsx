import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eldaana — L\'IA qui anticipe ta vie',
  description: 'Eldaana sait ce dont tu as besoin. Avant même que tu le saches. L\'assistant IA personnel qui prédit, suggère et simplifie ton quotidien.',
  openGraph: {
    title: 'Eldaana — L\'IA qui anticipe ta vie',
    description: 'Eldaana sait ce dont tu as besoin. Avant même que tu le saches.',
    url: 'https://eldaana.com',
    siteName: 'Eldaana',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eldaana — L\'IA qui anticipe ta vie',
    description: 'Eldaana sait ce dont tu as besoin. Avant même que tu le saches.',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
