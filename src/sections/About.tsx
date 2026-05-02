import { useEffect, useRef, useState, useCallback } from 'react'
import './About.css'
import Section from '../components/Section'

/* ── helpers ── */
const SKILLS = [
  { label: 'Full-stack product engineering', icon: '⚡' },
  { label: 'Machine learning & predictive systems', icon: '🧠' },
  { label: 'System design and architecture', icon: '🏗️' },
  { label: 'Human-centered UX and motion design', icon: '🎨' },
]

const FOCUS_ITEMS = [
  'Smart India Hackathon finalist projects',
  'Full-stack + ML pipeline delivery',
  'Motion-first, premium UI engineering',
]

const STATS = [
  { value: 15, suffix: '+', label: 'Projects Built' },
  { value: 3, suffix: '+', label: 'Hackathons Participated' },
  { value: 10, suffix: 'K+', label: 'Lines of Code' },
]

/* ── animated counter hook ── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    const t0 = performance.now()
    const tick = (now: number) => {
      const elapsed = now - t0
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return count
}

/* ── tilt card component ── */
function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8

    el.style.setProperty('--rx', `${rotateX}deg`)
    el.style.setProperty('--ry', `${rotateY}deg`)
    el.style.setProperty('--glow-x', `${x}px`)
    el.style.setProperty('--glow-y', `${y}px`)
  }, [])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* glow spotlight */}
      <div className="tilt-card__glow" />
      {/* animated gradient border */}
      <div className="tilt-card__border" />
      {children}
    </div>
  )
}

/* ── main component ── */
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Designing systems that feel like sorcery"
    >
      <div ref={sectionRef} className="about-grid">
        {/* ───── LEFT CARD ───── */}
        <TiltCard className={`about-card about-card--left ${visible ? 'revealed' : ''}`}>
          <p className="about-card__intro">
            I&apos;m <span className="text-gradient">Aaditya</span>, a B.Tech
            student obsessed with building full-stack experiences that merge AI,
            system design, and cinematic motion. My focus is on intelligent
            platforms that scale gracefully, feel premium, and tell a story with
            every interaction.
          </p>

          {/* skill pills */}
          <div className="skill-grid">
            {SKILLS.map((item, i) => (
              <div
                key={item.label}
                className="skill-pill"
                style={{ animationDelay: `${0.6 + i * 0.12}s` }}
              >
                <span className="skill-pill__icon">{item.icon}</span>
                <span>{item.label}</span>
                <div className="skill-pill__shimmer" />
              </div>
            ))}
          </div>

          {/* stats row */}
          <div className="stats-row">
            {STATS.map((s) => (
              <StatBlock key={s.label} {...s} animate={visible} />
            ))}
          </div>
        </TiltCard>

        {/* ───── RIGHT CARD ───── */}
        <TiltCard className={`about-card about-card--right ${visible ? 'revealed' : ''}`}>
          <p className="about-card__eyebrow">Current Focus</p>

          <h3 className="about-card__heading">
            Building AI-powered systems that reduce friction
          </h3>

          <p className="about-card__body">
            From healthcare surveillance to logistics intelligence, I architect
            platforms that connect real-world operations with precise data
            intelligence. My work blends product thinking with scalable tech.
          </p>

          <div className="focus-list">
            {FOCUS_ITEMS.map((item, i) => (
              <div
                key={item}
                className="focus-item"
                style={{ animationDelay: `${0.8 + i * 0.15}s` }}
              >
                <span className="focus-item__dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* floating decorative orbs */}
          <div className="orb orb--1" />
          <div className="orb orb--2" />
        </TiltCard>
      </div>
    </Section>
  )
}

/* ── stat block sub-component ── */
function StatBlock({
  value,
  suffix,
  label,
  animate,
}: {
  value: number
  suffix: string
  label: string
  animate: boolean
}) {
  const count = useCounter(value, 2000, animate)
  return (
    <div className="stat-block">
      <span className="stat-block__number">
        {count}
        <span className="stat-block__suffix">{suffix}</span>
      </span>
      <span className="stat-block__label">{label}</span>
    </div>
  )
}

export default About