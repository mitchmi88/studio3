import type { Metadata } from 'next'
import Link from 'next/link'
import { GalleryGrid } from '@/components/GalleryGrid'
import { Marquee } from '@/components/Marquee'
import { ThinCircle, DiagonalLine } from '@/components/ui/Decorations'

export const metadata: Metadata = {
  title: 'Galerie — Studio III Tätowierstudio Recklinghausen',
  description:
    'Unsere Arbeiten: Custom Design, Fine Line, Realismus und Cover-Up. Individuelle Tattoos aus Recklinghausen.',
}

export default function GalleriePage() {
  return (
    <div className="bg-bg min-h-screen">
      {/* Page hero */}
      <div className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <ThinCircle size={400} className="shape-slow absolute -right-24 top-0 pointer-events-none opacity-20" />
        <DiagonalLine className="shape-fast absolute left-16 bottom-8 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 label-track text-muted hover:text-text transition-colors duration-300 mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <polyline points="10 3 5 8 10 13" />
            </svg>
            Zurück zur Startseite
          </Link>

          <p className="label-track mb-5">Unsere Arbeiten</p>
          <h1
            className="font-display font-light text-text tracking-widest"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95 }}
          >
            Galerie
          </h1>
          <p className="font-body text-muted mt-5 text-sm leading-relaxed max-w-xl">
            Jedes Motiv erzählt eine Geschichte. Entdecke unsere Arbeiten — von filigraner
            Feinlinie bis hin zu großflächigem Realismus.
          </p>
        </div>
      </div>

      {/* — Effect 10: Infinite marquee — */}
      <Marquee />

      {/* Gallery grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 pb-24">
        <GalleryGrid />
      </div>
    </div>
  )
}
