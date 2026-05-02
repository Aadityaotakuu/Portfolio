import { memo, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const TRAIL_COUNT = 6

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement | null>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const prefersReducedMotion = usePrefersReducedMotion()
  const mousePos = useRef({ x: -999, y: -999 })
  const trailPositions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -999, y: -999 })),
  )
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const handleMove = (event: PointerEvent) => {
      mousePos.current.x = event.clientX
      mousePos.current.y = event.clientY
    }

    const animate = () => {
      // Update main glow
      if (glowRef.current) {
        glowRef.current.style.left = `${mousePos.current.x}px`
        glowRef.current.style.top = `${mousePos.current.y}px`
      }

      // Update trail with lerp (each follows the previous)
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target =
          i === 0 ? mousePos.current : trailPositions.current[i - 1]
        const pos = trailPositions.current[i]
        const ease = 0.15 - i * 0.015 // each slower than the last

        pos.x += (target.x - pos.x) * ease
        pos.y += (target.y - pos.y) * ease

        const el = trailRefs.current[i]
        if (el) {
          el.style.left = `${pos.x}px`
          el.style.top = `${pos.y}px`
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          className="cursor-trail"
          aria-hidden="true"
          style={{
            width: `${12 - i * 1.5}px`,
            height: `${12 - i * 1.5}px`,
            opacity: 0.4 - i * 0.05,
          }}
        />
      ))}
      {/* Main glow */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  )
}

export default memo(CursorGlow)
