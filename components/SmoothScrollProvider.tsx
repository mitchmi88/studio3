'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initLenis } from '@/lib/lenis'
import { ScrollTrigger } from '@/lib/gsap'

export function SmoothScrollProvider() {
  const pathname = usePathname()

  useEffect(() => {
    const { destroy } = initLenis()
    const timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => {
      clearTimeout(timer)
      destroy()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
