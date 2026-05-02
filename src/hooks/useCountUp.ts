import { useEffect, useState } from 'react'

export const useCountUp = (
  value: number,
  isActive: boolean,
  duration = 1400,
) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let start: number | null = null
    let frame = 0

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [value, isActive, duration])

  return count
}
