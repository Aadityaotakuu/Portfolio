import {
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import './Hero.css'
import MagneticButton from '../components/MagneticButton'
import HeroRightCard from '../components/HeroRightCard'
import { useSmoothScroll } from '../context/ScrollContext'
import { useTypewriter } from '../hooks/useTypewriter'

const roles = ['AI Systems Builder', 'Full Stack Engineer', 'Product Architect']

/* ── Canvas Particle Field ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -999, y: -999 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const count = Math.min(Math.floor((w * h) / 12000), 120)

    interface Particle {
      x: number; y: number; vx: number; vy: number
      size: number; baseAlpha: number; alpha: number; hue: number
      flicker: number; flickerSpeed: number
    }

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 1.8 + 0.5,
      baseAlpha: Math.random() * 0.5 + 0.15,
      alpha: 0,
      hue: 260 + Math.random() * 40,
      flicker: Math.random() * Math.PI * 2,
      flickerSpeed: 0.02 + Math.random() * 0.03,
    }))

    const handleResize = () => {
      const oldW = w || window.innerWidth
      const oldH = h || window.innerHeight
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      particles.forEach(p => {
        p.x = (p.x / oldW) * w
        p.y = (p.y / oldH) * h
      })
    }
    window.addEventListener('resize', handleResize, { passive: true })

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.flicker += p.flickerSpeed
        p.alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.flicker))

        // mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.8
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
        }

        // damping
        p.vx *= 0.98
        p.vy *= 0.98

        p.x += p.vx
        p.y += p.vy

        // wrap
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha})`
        ctx.fill()
      }

      // connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(275, 70%, 60%, ${0.08 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}

/* ── Tilt Card ── */
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
    el.style.setProperty('--rx', `${((y - cy) / cy) * -8}deg`)
    el.style.setProperty('--ry', `${((x - cx) / cx) * 8}deg`)
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
      className={`hero-tilt ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="hero-tilt__glow" />
      <div className="hero-tilt__border" />
      {children}
    </div>
  )
}

/* ╔════════════════════════════════╗
   ║       MAIN HERO COMPONENT      ║
   ╚════════════════════════════════╝ */
const Hero = () => {
  const { scrollTo } = useSmoothScroll()
  const { text } = useTypewriter(roles, { speed: 70, deleteSpeed: 35 })
  const sectionRef = useRef<HTMLElement>(null)

  /* mouse parallax */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // parallax layers
  const textX = useTransform(springX, (v) => v * 0.008)
  const textY = useTransform(springY, (v) => v * 0.008)
  const orbX = useTransform(springX, (v) => v * 0.025)
  const orbY = useTransform(springY, (v) => v * 0.025)
  const gridX = useTransform(springX, (v) => v * 0.015)
  const gridY = useTransform(springY, (v) => v * 0.015)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set(e.clientX - cx)
      mouseY.set(e.clientY - cy)
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  /* stagger variants */
  const stagger: Variants = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    }),
    []
  )
  const fadeUp: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 25 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    }),
    []
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
    >
      {/* ── Background Layers ── */}
      <ParticleCanvas />

      {/* aurora orbs */}
      <motion.div className="hero-orb hero-orb--1" style={{ x: orbX, y: orbY }} />
      <motion.div className="hero-orb hero-orb--2" style={{ x: orbX, y: orbY }} />
      <motion.div className="hero-orb hero-orb--3" style={{ x: orbX, y: orbY }} />

      {/* perspective grid */}
      <motion.div className="hero-grid" style={{ x: gridX, y: gridY }} aria-hidden="true" />

      {/* noise overlay */}
      <div className="hero-noise" aria-hidden="true" />

      {/* ── Content ── */}
      <motion.div
        className="hero-content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className="hero-content__grid">
          {/* ─── LEFT COLUMN ─── */}
          <motion.div className="hero-left" style={{ x: textX, y: textY }}>
            {/* eyebrow badge */}
            <motion.div className="hero-badge" variants={fadeUp}>
              <span className="hero-badge__dot" />
               PORTFOLIO
            </motion.div>

            {/* heading */}
            <motion.h1 className="hero-heading" variants={fadeUp}>
              Hi, I&apos;m{' '}
              <span className="hero-heading__name">Aaditya</span>
            </motion.h1>

            {/* subtitle */}
            <motion.p className="hero-subtitle" variants={fadeUp}>
              Full Stack Developer | AI &amp; Systems Builder
            </motion.p>

            {/* typewriter */}
            <motion.div className="hero-typewriter" variants={fadeUp}>
              <span className="hero-typewriter__text">{text}</span>
              <span className="hero-typewriter__cursor" />
            </motion.div>

            {/* CTA buttons */}
            <motion.div className="hero-cta" variants={fadeUp}>
              <MagneticButton onClick={() => scrollTo('#projects')}>
                View Projects
              </MagneticButton>
              <MagneticButton
                href="/Aaditya cv.pdf"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => scrollTo('#contact')}
              >
                Contact
              </MagneticButton>
            </motion.div>

            {/* chips */}
            <motion.div className="hero-chips" variants={fadeUp}>
              {['B.Tech Student', 'Full-Stack + ML', 'System Design'].map(
                (chip, i) => (
                  <span
                    key={chip}
                    className="hero-chip"
                    style={{ animationDelay: `${1.2 + i * 0.1}s` }}
                  >
                    {chip}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN: STATUS CARD ─── */}
          <motion.div variants={fadeUp}>
            <TiltCard className="hero-status-card">
              <HeroRightCard />
            </TiltCard>
          </motion.div>
        </div>

        {/* ── scroll indicator ── */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <span className="hero-scroll-indicator__text">Scroll</span>
          <span className="hero-scroll-indicator__line" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero