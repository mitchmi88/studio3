'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { LogoMark } from './LogoMark'

const navLinks = [
  { label: 'Studio',     href: '/' },
  { label: 'Über uns',   href: '/#ueber-uns' },
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Galerie',    href: '/galerie' },
  { label: 'Kontakt',    href: '/#kontakt' },
]

export function Navigation() {
  const navRef  = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  // — Effect 3: Transparent → frosted glass on scroll —
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const st = ScrollTrigger.create({
      start: 'top -80',
      onEnter: () =>
        gsap.to(nav, {
          backgroundColor: 'rgba(18, 18, 18, 0.88)',
          backdropFilter: 'blur(12px)',
          borderBottomColor: 'rgba(46,46,46,0.8)',
          duration: 0.4,
          ease: 'power2.out',
        }),
      onLeaveBack: () =>
        gsap.to(nav, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          borderBottomColor: 'transparent',
          duration: 0.3,
        }),
    })

    return () => st.kill()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={{ willChange: 'background-color, backdrop-filter' }}
      >
        <nav
          className="max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20"
          aria-label="Hauptnavigation"
        >
          <Link href="/" aria-label="Studio III — Startseite" className="flex-shrink-0">
            <LogoMark height={52} />
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative group text-muted hover:text-text transition-colors duration-300"
                >
                  <span className="tracking-widest uppercase text-xs font-body">{link.label}</span>
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center text-muted hover:text-accent transition-colors duration-300 ml-2 w-9 h-9"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="block">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
          >
            <span className={`block h-px w-6 bg-text transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block h-px w-6 bg-text transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-px w-6 bg-text transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-display font-light text-text hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <a href="#" aria-label="Instagram" className="text-muted hover:text-accent transition-colors mt-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
