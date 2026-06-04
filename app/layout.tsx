import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio III — Tätowierstudio Recklinghausen',
  description:
    'Individuelles Tattoo-Studio in Recklinghausen. Custom Design, Fine Line, Cover-Up und Realismus. Vereinbare jetzt deinen Termin.',
  keywords: 'Tattoo Studio Recklinghausen, Tätowierer NRW, Custom Tattoo, Fine Line Tattoo',
  openGraph: {
    title: 'Studio III — Tätowierstudio Recklinghausen',
    description: 'Individuelle Tattoo-Kunst auf höchstem Niveau.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{ backgroundColor: '#1D1D1D' }}
    >
      <body className="bg-bg text-text font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:rounded text-sm font-body"
        >
          Zum Inhalt springen
        </a>
        {/* <SmoothScrollProvider /> */}
        <Navigation />
        <main id="main">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  )
}
