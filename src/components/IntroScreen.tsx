import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './IntroScreen.css'

type IntroScreenProps = {
  onComplete: () => void
}

/* ── Intro Particle System ── */
function IntroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const count = Math.min(Math.floor((w * h) / 8000), 200)

    interface Star {
      x: number; y: number; z: number
      size: number; alpha: number; hue: number
      speed: number; flicker: number; flickerSpeed: number
    }

    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 2 + 0.5,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      hue: 240 + Math.random() * 60,
      speed: Math.random() * 0.15 + 0.02,
      flicker: Math.random() * Math.PI * 2,
      flickerSpeed: 0.01 + Math.random() * 0.02,
    }))

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        s.flicker += s.flickerSpeed
        const flAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.flicker))

        // slow drift upward
        s.y -= s.speed * s.z
        if (s.y < -10) {
          s.y = h + 10
          s.x = Math.random() * w
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * s.z, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, 70%, 70%, ${flAlpha})`
        ctx.fill()

        // subtle glow
        if (s.size > 1) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size * s.z * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${s.hue}, 70%, 70%, ${flAlpha * 0.08})`
          ctx.fill()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="intro__canvas" aria-hidden="true" />
}

/* ╔════════════════════════════════╗
   ║     INTRO SCREEN COMPONENT     ║
   ╚════════════════════════════════╝ */
const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<'loading' | 'ready' | 'exiting'>('loading')
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number>(0)
  const autoRef = useRef<number>(0)

  // Progress bar animation
  useEffect(() => {
    const startTime = performance.now()
    const duration = 3500 // 3.5 seconds

    const tick = () => {
      const elapsed = performance.now() - startTime
      const pct = Math.min(elapsed / duration, 1)
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - pct, 3)
      setProgress(eased)

      if (pct < 1) {
        timerRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('ready')
      }
    }

    timerRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(timerRef.current)
  }, [])

  // Auto-transition after ready + 2 seconds
  useEffect(() => {
    if (phase === 'ready') {
      autoRef.current = window.setTimeout(() => {
        handleEnter()
      }, 4000)
    }
    return () => window.clearTimeout(autoRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const handleEnter = useCallback(() => {
    if (phase === 'exiting') return
    window.clearTimeout(autoRef.current)
    setPhase('exiting')
    // Wait for exit animation to complete
    setTimeout(onComplete, 1200)
  }, [phase, onComplete])

  // Allow skip during loading too
  const handleSkip = useCallback(() => {
    cancelAnimationFrame(timerRef.current)
    window.clearTimeout(autoRef.current)
    setPhase('exiting')
    setTimeout(onComplete, 1200)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exiting' ? null : null}
      <motion.div
        className="intro"
        initial={{ opacity: 1 }}
        animate={
          phase === 'exiting'
            ? { opacity: 0, scale: 1.08, filter: 'blur(20px)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={
          phase === 'exiting'
            ? { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0.3 }
        }
        onClick={phase === 'loading' ? handleSkip : undefined}
      >
        {/* Background layers */}
        <IntroParticles />
        <div className="intro__orb intro__orb--1" />
        <div className="intro__orb intro__orb--2" />
        <div className="intro__orb intro__orb--3" />
        <div className="intro__scanlines" />
        <div className="intro__vignette" />

        {/* Corner decorations */}
        <div className="intro__corner intro__corner--tl" />
        <div className="intro__corner intro__corner--tr" />
        <div className="intro__corner intro__corner--bl" />
        <div className="intro__corner intro__corner--br" />

        {/* Main content */}
        <div className="intro__content">
          {/* Name reveal */}
          <motion.div
            style={{ position: 'relative', display: 'inline-block' }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <span className="intro__name-glow" aria-hidden="true">
              AADITYA
            </span>
            <h1 className="intro__name">AADITYA</h1>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="intro__divider"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Subtitle */}
          <motion.p
            className="intro__subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Building Systems. Solving Reality.
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="intro__progress-track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <motion.div
              className="intro__progress-fill"
              style={{ scaleX: progress }}
            />
          </motion.div>

          {/* Loading text / Enter button */}
          <AnimatePresence mode="wait">
            {phase === 'loading' ? (
              <motion.p
                key="loading"
                className="intro__loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 2.0 }}
              >
                Initializing experience...
              </motion.p>
            ) : phase === 'ready' ? (
              <motion.button
                key="enter"
                className="intro__enter"
                onClick={handleEnter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Enter Experience
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default IntroScreen
