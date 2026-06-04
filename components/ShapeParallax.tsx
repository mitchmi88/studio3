'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'

// — Effect 8: Multi-speed parallax on decorative SVG shapes —
// Assign .shape-slow to large circles, .shape-fast to small dots/lines via className props.
// This component initialises the parallax globally after the DOM is ready.

export function ShapeParallax() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.shape-slow').forEach((el) => {
        const section = el.closest('section') || document.body
        gsap.to(el, {
          y: -80,
          ease: 'none',
          scrollTrigger: { trigger: section, scrub: 1.5 },
        })
      })

      document.querySelectorAll<HTMLElement>('.shape-fast').forEach((el) => {
        const section = el.closest('section') || document.body
        gsap.to(el, {
          y: -180,
          ease: 'none',
          scrollTrigger: { trigger: section, scrub: 1.5 },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
