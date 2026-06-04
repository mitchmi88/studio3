'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'

const services = [
  {
    title: 'Custom Design',
    description: 'Einzigartige Motive, die nur für dich entstehen.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 24l4-4 12-12-4-4L4 16v4h4z" />
        <path d="M16 4l4 4" />
        <path d="M19 7l2-2a2 2 0 012 2l-1 1" />
      </svg>
    ),
  },
  {
    title: 'Cover-Up',
    description: 'Professionelle Überarbeitung bestehender Tattoos.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="2" />
        <path d="M4 12h20M12 4v20" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: 'Feinlinie',
    description: 'Zarte, detailreiche Linienarbeit mit höchster Präzision.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="14" x2="24" y2="14" />
        <line x1="7" y1="9" x2="21" y2="9" />
        <line x1="10" y1="19" x2="18" y2="19" />
      </svg>
    ),
  },
  {
    title: 'Realismus',
    description: 'Fotorealistische Portraits und naturgetreue Motive.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="14" cy="10" r="5" />
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Section label + heading
      gsap.from('.services-heading-wrap', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services-heading-wrap', start: 'top 82%' },
      })

      // — Effect 9: Staggered card entrance —
      gsap.from('.service-card', {
        opacity: 0,
        y: 60,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.services-grid', start: 'top 78%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      className="section-pad relative bg-surface"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="services-heading-wrap mb-16 lg:mb-20">
          <p className="label-track mb-4">— 02 Leistungen</p>
          <h2
            className="font-display font-light text-text"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}
          >
            Was wir tun.
          </h2>
        </div>

        {/* — Effect 9: CSS hover (no JS) — */}
        <style>{`
          .service-card {
            transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                        border-color 0.35s ease;
          }
          .service-card:hover {
            transform: translateY(-8px);
            border-color: #C9A074;
          }
          .service-card:hover .service-icon {
            color: #C9A074;
          }
          .service-card .service-accent-line {
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .service-card:hover .service-accent-line {
            transform: scaleX(1);
          }
        `}</style>

        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card relative bg-bg border border-border p-8 flex flex-col gap-5 cursor-default overflow-hidden"
            >
              <div className="service-accent-line absolute top-0 left-0 h-px w-full bg-accent" />
              <div className="service-icon text-muted transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-display font-light text-text text-xl tracking-wide">
                {service.title}
              </h3>
              <p className="font-body text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
