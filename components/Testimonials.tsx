'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'

const testimonials = [
  {
    quote:
      'Ich bin absolut begeistert von meinem neuen Tattoo. Das Team hat sich wirklich Zeit genommen, um meine Idee zu verstehen und perfekt umzusetzen. Jedes Detail sitzt.',
    name: 'Markus B.',
    location: 'Recklinghausen',
  },
  {
    quote:
      'Nach einem Cover-Up-Termin bin ich endlich glücklich mit meinem Arm. Die Arbeit ist präzise, sauber und das Ergebnis übertrifft alle meine Erwartungen.',
    name: 'Lena K.',
    location: 'Herne',
  },
  {
    quote:
      'Das Studio hat eine besondere Atmosphäre — professionell und gleichzeitig entspannt. Mein Fine-Line-Tattoo ist ein Kunstwerk. Ich komme definitiv wieder.',
    name: 'Tobias M.',
    location: 'Gelsenkirchen',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('.testimonials-heading', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.testimonials-heading', start: 'top 82%' },
      })
      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.testimonials-grid', start: 'top 78%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-pad bg-surface relative"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="testimonials-heading mb-14">
          <p className="label-track mb-4">— 04 Stimmen</p>
          <h2
            className="font-display font-light text-text"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}
          >
            Was unsere Kunden sagen.
          </h2>
        </div>

        <div
          className="testimonials-grid flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card snap-start flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-auto bg-bg border border-border p-8 flex flex-col gap-5 relative overflow-hidden"
            >
              <div
                className="absolute -top-4 -left-2 font-display text-8xl text-accent/10 select-none pointer-events-none leading-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p className="font-body text-text/80 leading-relaxed text-sm relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto flex flex-col gap-0.5">
                <p className="font-display text-text text-lg">{t.name}</p>
                <p className="font-body text-muted text-xs tracking-wider">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
