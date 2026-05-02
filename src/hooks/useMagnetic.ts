import { useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent } from 'react'

export const useMagnetic = (strength = 0.35) => {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 220, damping: 18 })
  const y = useSpring(rawY, { stiffness: 220, damping: 18 })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left - rect.width / 2) * strength
    const offsetY = (event.clientY - rect.top - rect.height / 2) * strength
    rawX.set(offsetX)
    rawY.set(offsetY)
  }

  const handleLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return { x, y, handleMove, handleLeave }
}
