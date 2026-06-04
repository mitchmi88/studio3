import Link from 'next/link'
import { LogoMark } from './LogoMark'
import { ThinCircle, DiagonalLine } from './ui/Decorations'

const footerLinks = [
  { label: 'Studio',     href: '/' },
  { label: 'Über uns',   href: '/#ueber-uns' },
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Galerie',    href: '/galerie' },
  { label: 'Kontakt',    href: '/#kontakt' },
]

export function Footer() {
  return (
    <footer className="relative bg-bg border-t border-border overflow-hidden">
      {/* Decorations */}
      <ThinCircle size={300} className="absolute -right-20 -bottom-20 opacity-30 pointer-events-none" />
      <DiagonalLine className="absolute left-12 top-12 opacity-40 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Next page teaser */}
        <div className="border-b border-border pb-12 mb-12">
          <p className="label-track mb-4">Nächste Seite</p>
          <Link
            href="/galerie"
            className="group inline-flex items-center gap-4 font-display font-light text-4xl lg:text-5xl text-text hover:text-accent transition-colors duration-500"
          >
            <span className="tracking-wider">Galerie</span>
            <span className="transition-transform duration-500 group-hover:translate-x-3 text-accent">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <LogoMark height={40} />
            <p className="text-muted text-sm font-body leading-relaxed mt-2">
              Jedes Tattoo erzählt eine Geschichte.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer-Navigation">
            <ul className="flex flex-col gap-3 list-none">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-text transition-colors duration-300 text-sm tracking-widest uppercase font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Address */}
          <address className="not-italic font-body text-sm text-muted leading-relaxed flex flex-col gap-1">
            <strong className="text-text font-normal tracking-wide">Studio III</strong>
            <span>Musterstraße 12</span>
            <span>45657 Recklinghausen</span>
            <a
              href="mailto:info@studio-iii.de"
              className="mt-2 text-accent hover:text-accent-hover transition-colors duration-300"
            >
              info@studio-iii.de
            </a>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-muted text-xs font-body">
            &copy; {new Date().getFullYear()} Studio III. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted hover:text-text text-xs transition-colors duration-300 font-body">
              Impressum
            </Link>
            <Link href="#" className="text-muted hover:text-text text-xs transition-colors duration-300 font-body">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
