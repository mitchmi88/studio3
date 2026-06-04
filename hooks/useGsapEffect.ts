import { useEffect, useRef, type RefObject, type DependencyList } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

// Re-export for convenience so components only need one import
export { gsap, ScrollTrigger, SplitText }

export function useGsapEffect<T extends HTMLElement = HTMLDivElement>(
  callback: () => void | (() => void),
  deps: DependencyList = []
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(callback as () => void, ref.current)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
