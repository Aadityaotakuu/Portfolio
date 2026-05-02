import { useCallback, useEffect, useRef } from 'react'
import Lenis from 'lenis'

export type ScrollTarget = string | number | HTMLElement
export type ScrollOptions = {
  offset?: number
  duration?: number
  immediate?: boolean
  lock?: boolean
}

const easing = (t: number) => 1 - Math.pow(1 - t, 3)

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing,
    })

    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(raf)
    }
    frame = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((target: ScrollTarget, options?: ScrollOptions) => {
    lenisRef.current?.scrollTo(target, {
      offset: -12,
      duration: 1.2,
      ...options,
    })
  }, [])

  return { lenisRef, scrollTo }
}
