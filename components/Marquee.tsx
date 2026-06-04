'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'

const TEXT =
  '— Studio III  — Recklinghausen  — Tattoo Art  — Custom Design  — Fine Line  — Realismus  — Cover-Up  '

export function Marquee() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!innerRef.current) return

    const tween = gsap.to(innerRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 22,
      repeat: -1,
    })

    return () => { tween.kill() }
  }, [])

  return (
    <div
      className="overflow-hidden border-y border-border py-3 bg-surface"
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        <span className="label-track text-muted/60">{TEXT}</span>
        <span className="label-track text-muted/60">{TEXT}</span>
      </div>
    </div>
  )
}
