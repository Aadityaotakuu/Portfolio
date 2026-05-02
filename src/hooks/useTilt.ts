import { useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent } from 'react'

export const useTilt = (maxTilt = 12) => {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(rawY, { stiffness: 150, damping: 20 })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    rawX.set(-y * maxTilt)
    rawY.set(x * maxTilt)

    const xPercent = (x + 0.5) * 100
    const yPercent = (y + 0.5) * 100
    event.currentTarget.style.setProperty('--x', `${xPercent}%`)
    event.currentTarget.style.setProperty('--y', `${yPercent}%`)
  }

  const handleLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return { rotateX, rotateY, handleMove, handleLeave }
}
