'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return
    if (window.innerWidth <= 768) return // Mobile: no GSAP, CSS handles visibility

    const ctx = gsap.context(() => {
      // All hero entry animations: no scrollTrigger, fire on load
      gsap.from('.hero__label', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', delay: 0.2,
      })
      gsap.from('.hero__title', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', delay: 0.3,
      })
      gsap.from('.hero__divider', {
        opacity: 0, duration: 0.5, delay: 0.7,
      })
      gsap.from('.hero__tagline', {
        opacity: 0, y: 20, duration: 0.7, ease: 'power2.out', delay: 0.8,
      })
      gsap.from('.hero__description', {
        opacity: 0, y: 15, duration: 0.6, ease: 'power2.out', delay: 1.0,
      })
      gsap.from('.hero__stats', {
        opacity: 0, y: 15, duration: 0.6, ease: 'power2.out', delay: 1.1,
      })
      gsap.from('.hero__cta-row', {
        opacity: 0, y: 15, duration: 0.6, ease: 'power2.out', delay: 1.2,
      })
      gsap.from('.hero__image-frame', {
        opacity: 0, x: 40, duration: 1.0, ease: 'power3.out', delay: 0.4,
      })
      gsap.from('.hero__badge', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', delay: 1.0,
      })

      // Parallax scroll only for image
      gsap.to('.hero__image-frame', {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero">

      {/* Decorative background shapes */}
      <div className="hero__bg-layer" aria-hidden="true">
        <div className="hero__shape hero__shape--ring" />
        <div className="hero__shape hero__shape--line-h" />
        <div className="hero__shape hero__shape--line-v" />
        <div className="hero__shape hero__shape--dot-grid" />
      </div>

      {/* Left: Content */}
      <div className="hero__content">
        <div className="hero__label">
          <span className="hero__label-line" />
          Tattoo Studio · Recklinghausen
        </div>

        <h1 className="hero__title">
          Studio <span className="hero__title-accent">III</span>
        </h1>

        <div className="hero__divider">
          <span className="hero__divider-line" />
          <span className="hero__divider-dot" />
          <span className="hero__divider-line" />
        </div>

        <p className="hero__tagline">
          Deine Haut.<br />Unsere Kunst.
        </p>

        <p className="hero__description">
          Individuelle Tattoo-Designs in Recklinghausen.
          Präzise, einzigartig, für immer.
        </p>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">10+</span>
            <span className="hero__stat-label">Jahre Erfahrung</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">800+</span>
            <span className="hero__stat-label">Tattoos</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">100%</span>
            <span className="hero__stat-label">Custom Design</span>
          </div>
        </div>

        <div className="hero__cta-row">
          <Link href="/#kontakt" className="hero__cta-primary">
            Termin anfragen
          </Link>
          <Link href="/galerie" className="hero__cta-secondary">
            Galerie ansehen →
          </Link>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hero__image-wrap">
        <div className="hero__image-frame">
          <Image
            src="https://images.pexels.com/photos/6024213/pexels-photo-6024213.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Tattoo-Künstler bei der Arbeit in einem professionellen Studio"
            fill
            priority
            className="hero__image"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="hero__image-accent" aria-hidden="true" />
        </div>
        <div className="hero__badge">
          <span className="hero__badge-text">Custom Tattoo</span>
          <span className="hero__badge-sub">Studio III · REC</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>

    </section>
  )
}
