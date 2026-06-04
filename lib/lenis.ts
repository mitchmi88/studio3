import Lenis from '@studio-freight/lenis'
import { gsap, ScrollTrigger } from './gsap'

export function initLenis() {
  const lenis = new Lenis({
    duration: 0.8,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  const tickerFn = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  lenis.on('scroll', ScrollTrigger.update)

  return {
    destroy() {
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
    },
  }
}
