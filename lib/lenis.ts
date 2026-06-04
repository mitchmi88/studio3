import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from './gsap'

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  lenis.on('scroll', ScrollTrigger.update)

  return {
    destroy() {
      lenis.destroy()
    },
  }
}