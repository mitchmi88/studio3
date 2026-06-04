import Lenis from 'lenis'
import { ScrollTrigger } from './gsap'

export function initLenis() {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
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