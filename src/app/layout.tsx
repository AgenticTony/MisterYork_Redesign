import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mister York | Smash Burgers Sweden',
  description: 'Den nya generationens burgare. Premium smash burgers utan premium-priser. 20+ platser över hela Sverige.',
  keywords: ['smash burger', 'burgare', 'Stockholm', 'Sverige', 'Mister York'],
  openGraph: {
    title: 'Mister York | Smash Burgers Sweden',
    description: 'Den nya generationens burgare. Premium smash burgers utan premium-priser.',
    type: 'website',
    locale: 'sv_SE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mister York | Smash Burgers Sweden',
    description: 'Den nya generationens burgare. Premium smash burgers utan premium-priser.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
