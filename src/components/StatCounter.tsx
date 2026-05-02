import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import type { Achievement } from '../data/achievements'

type StatCounterProps = {
  item: Achievement
}

const StatCounter = ({ item }: StatCounterProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })
  const value = useCountUp(item.value, isInView)

  return (
    <div ref={ref} className="glass-panel neon-border rounded-2xl p-6">
      <p className="text-3xl font-semibold text-[var(--text)]">
        {value}
        {item.suffix ?? ''}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted">
        {item.label}
      </p>
      <p className="mt-3 text-sm text-muted">{item.detail}</p>
    </div>
  )
}

export default StatCounter
