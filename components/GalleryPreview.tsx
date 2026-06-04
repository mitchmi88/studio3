'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'

export function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to('.gallery-title-left', {
        x: -60,
        ease: 'none',
        scrollTrigger: { trigger: '.gallery-section', scrub: 1 },
      })
      gsap.to('.gallery-title-right', {
        x: 60,
        ease: 'none',
        scrollTrigger: { trigger: '.gallery-section', scrub: 1 },
      })

      gsap.from('.gallery-label', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.gallery-label', start: 'top 85%' },
      })

      gsap.from('.gallery-preview-img', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.gallery-preview-grid',
          start: 'top 75%',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="gallery-section section-pad bg-bg relative" style={{ overflowX: 'clip', overflowY: 'visible' }}>
      <div className="w-full px-0">
        {/* Label */}
        <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
          <p className="gallery-label label-track mb-6">— 03 Ausgewählte Werke</p>
        </div>

        {/* Split Title — full width, no overflow-hidden */}
        <div className="hidden lg:flex items-baseline justify-between gap-8 mb-12 w-full px-12" style={{ boxSizing: 'border-box' }}>
          <span
            className="gallery-title-left font-display font-light text-text will-change-transform whitespace-nowrap flex-shrink-0"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', letterSpacing: '0.3em', lineHeight: 1 }}
          >
            G a l
          </span>
          <Link
            href="/galerie"
            className="font-body text-accent hover:text-accent-hover transition-colors text-sm tracking-widest uppercase flex-shrink-0"
          >
            Alle Werke ansehen →
          </Link>
          <span
            className="gallery-title-right font-display font-light text-text text-right will-change-transform whitespace-nowrap flex-shrink-0"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', letterSpacing: '0.3em', lineHeight: 1 }}
          >
            e r i e
          </span>
        </div>

        {/* Mobile Title + Grid wrapper */}
        <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8 lg:hidden">
          <h2 className="font-display font-light text-text tracking-widest" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1 }}>
            Galerie
          </h2>
          <Link href="/galerie" className="text-accent hover:text-accent-hover text-xs tracking-widest uppercase">
            Alle →
          </Link>
        </div>

        {/* 2-Column Grid */}
        <div className="gallery-preview-grid grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
          <div className="gallery-preview-img relative overflow-hidden h-[320px] md:h-[580px]">
            <Image
              src="https://images.pexels.com/photos/7005723/pexels-photo-7005723.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Tätowierer bei der Arbeit – Vogelperspektive"
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>

          <div className="flex flex-col gap-4 md:mt-20">
            <div className="gallery-preview-img relative overflow-hidden h-[200px] md:h-[260px]">
              <Image
                src="https://images.pexels.com/photos/2183131/pexels-photo-2183131.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Farbiges Sleeve-Tattoo am linken Arm"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="gallery-preview-img relative overflow-hidden h-[200px] md:h-[260px]">
              <Image
                src="https://images.pexels.com/photos/11619031/pexels-photo-11619031.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Zeus-Portrait-Tattoo am Unterarm"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/galerie"
            className="border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-300 px-8 py-3 font-body text-sm tracking-widest uppercase"
          >
            Alle Werke ansehen
          </Link>
        </div>
        </div>{/* end inner wrapper */}
      </div>
    </section>
  )
}
