'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'
import { ThinCircle } from './ui/Decorations'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (prefersReducedMotion()) {
      gsap.set(section.querySelectorAll('.about-reveal'), { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // — Effect 5: Heading lines fade up (stable: no parentNode manipulation) —
      const headingEl = section.querySelector<HTMLElement>('.section-heading')
      if (headingEl) {
        const split = new SplitText(headingEl, { type: 'lines' })
        gsap.set(headingEl, { opacity: 1 })
        gsap.from(split.lines, {
          opacity: 0,
          y: 70,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: headingEl, start: 'top 80%' },
        })
      }

      // — Effect 6: Word-by-word body text —
      const bodyEls = section.querySelectorAll('.about-body')
      bodyEls.forEach((el) => {
        const split = new SplitText(el, { type: 'words' })
        gsap.set(el, { opacity: 1 })
        gsap.from(split.words, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.015,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        })
      })

      // Section label + gold line
      gsap.from('.about-label', {
        opacity: 0,
        x: -32,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-label', start: 'top 85%' },
      })

      // — Effect 4: Stacked images reveal with clip-path —
      gsap.from('.stack-img--back', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-images-stack', start: 'top 75%' },
      })
      gsap.from('.stack-img--mid', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { trigger: '.about-images-stack', start: 'top 75%' },
      })
      gsap.from('.stack-img--front', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: '.about-images-stack', start: 'top 75%' },
      })

      // — Effect 4: Multi-speed parallax on stacked images —
      gsap.to('.stack-img--back img',  { yPercent: -15, ease: 'none', scrollTrigger: { trigger: '.about-section', scrub: true } })
      gsap.to('.stack-img--mid img',   { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '.about-section', scrub: true } })
      gsap.to('.stack-img--front img', { yPercent: -35, ease: 'none', scrollTrigger: { trigger: '.about-section', scrub: true } })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="ueber-uns"
      className="about-section section-pad relative overflow-hidden bg-bg"
    >
      <ThinCircle
        size={500}
        className="shape-slow absolute -right-40 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text column */}
          <div>
            <p className="about-label label-track mb-5" style={{ opacity: 0 }}>
              — 01 Über uns
            </p>

            <h2
              className="section-heading font-display font-light text-text mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                opacity: 0,
              }}
            >
              Kunst, die bleibt.
            </h2>

            <div className="gold-line mb-8" />

            <p
              className="about-body font-body text-muted leading-relaxed mb-5"
              style={{ fontSize: '1.0625rem', opacity: 0 }}
            >
              Jedes Tattoo ist mehr als Tinte auf Haut — es ist eine Geschichte, die du für immer
              trägst. Wir arbeiten eng mit dir zusammen, um deine Vision in ein einzigartiges
              Kunstwerk zu verwandeln.
            </p>

            <p
              className="about-body font-body text-muted leading-relaxed"
              style={{ fontSize: '1.0625rem', opacity: 0 }}
            >
              Unser Studio in Recklinghausen steht für individuelle Tattoo-Kunst auf höchstem
              Niveau. Seit Jahren verewigen wir Geschichten, Gefühle und Ideen auf der Haut unserer
              Kunden — präzise, einzigartig, unvergesslich.
            </p>
          </div>

          {/* Stacked images column */}
          <div className="flex justify-center lg:justify-end">
            {/* Mobile: single image */}
            <div className="relative w-full h-[400px] overflow-hidden lg:hidden">
              <Image
                src="https://images.pexels.com/photos/5088459/pexels-photo-5088459.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Nahaufnahme Tattoo-Prozess am Arm"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 border border-accent/20 pointer-events-none" />
            </div>

            {/* Desktop: stacked layout — Effect 4 */}
            <div
              className="about-images-stack hidden lg:block relative flex-shrink-0"
              style={{ width: 480, height: 580 }}
            >
              {/* Back image */}
              <div
                className="stack-img stack-img--back absolute overflow-hidden"
                style={{ top: 0, left: 0, width: 300, height: 380, zIndex: 1 }}
              >
                <Image
                  src="https://images.pexels.com/photos/955938/pexels-photo-955938.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Schwarz-Weiß Tätowierer-Hände mit Maschine"
                  fill
                  className="object-cover object-center scale-[1.2]"
                  sizes="300px"
                />
              </div>

              {/* Mid image */}
              <div
                className="stack-img stack-img--mid absolute overflow-hidden"
                style={{ top: 80, left: 60, width: 280, height: 340, zIndex: 2 }}
              >
                <Image
                  src="https://images.pexels.com/photos/5088482/pexels-photo-5088482.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Tätowierer arbeitet nah an Kundenarmen"
                  fill
                  className="object-cover object-center scale-[1.2]"
                  sizes="280px"
                />
              </div>

              {/* Front image */}
              <div
                className="stack-img stack-img--front absolute overflow-hidden"
                style={{ top: 160, left: 120, width: 320, height: 400, zIndex: 3 }}
              >
                <Image
                  src="https://images.pexels.com/photos/2221319/pexels-photo-2221319.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Frau mit komplett tätowiertem Rücken im Studio"
                  fill
                  className="object-cover object-center scale-[1.2]"
                  sizes="320px"
                />
                <div className="absolute inset-0 border border-accent/15 pointer-events-none" />
              </div>

              {/* Accent corner */}
              <div
                className="absolute pointer-events-none"
                style={{ bottom: -12, right: -12, width: 60, height: 60, borderRight: '1px solid rgba(201,160,116,0.3)', borderBottom: '1px solid rgba(201,160,116,0.3)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
