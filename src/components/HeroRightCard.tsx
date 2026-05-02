import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'

const STATUS_ITEMS = [
  'Agentic workflows & ML pipelines',
  'Realtime systems and data layers',
  'High-performance UI and motion design',
]

const contentVariants: Variants = {
  enter: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit:  { opacity: 0, filter: 'blur(8px)', scale: 0.97 },
}

const imageVariants: Variants = {
  enter: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit:  { opacity: 0, filter: 'blur(10px)', scale: 1.06 },
}

const TRANSITION = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

const HeroRightCard = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    /* Outer wrapper — must be relative so the button can be positioned */
    <div style={{ position: 'relative' }}>

      {/* ── "View Profile" pill — always top-right corner of the card ── */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            key="view-btn"
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid rgba(167, 139, 250, 0.25)',
              background: 'rgba(139, 92, 246, 0.08)',
              backdropFilter: 'blur(8px)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget
              btn.style.borderColor = 'rgba(167, 139, 250, 0.55)'
              btn.style.background = 'rgba(139, 92, 246, 0.18)'
              btn.style.color = '#fff'
              btn.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.25)'
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget
              btn.style.borderColor = 'rgba(167, 139, 250, 0.25)'
              btn.style.background = 'rgba(139, 92, 246, 0.08)'
              btn.style.color = 'rgba(255,255,255,0.7)'
              btn.style.boxShadow = 'none'
            }}
          >
            {/* Pulsing dot */}
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: '#a78bfa',
              boxShadow: '0 0 6px rgba(167, 139, 250, 0.7)',
              flexShrink: 0,
            }} />
            View Profile
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Card Body (status content OR profile image) ── */}
      <AnimatePresence mode="wait">
        {!isExpanded ? (

          /* ── Status Content ── */
          <motion.div
            key="content"
            className="hero-status-card__inner"
            variants={contentVariants}
            initial="exit"
            animate="enter"
            exit="exit"
            transition={TRANSITION}
          >
            {/* live indicator */}
            <div className="hero-status__live">
              <span className="hero-status__live-dot" />
              <span>Status</span>
            </div>

            <h3 className="hero-status__heading">
              Building the next wave of intelligent systems
            </h3>

            <p className="hero-status__body">
              Focused on AI-first products, resilient architectures, and
              premium user experiences that feel like the future.
            </p>

            <div className="hero-status__items">
              {STATUS_ITEMS.map((item, i) => (
                <div
                  key={item}
                  className="hero-status__item"
                  style={{ animationDelay: `${1.4 + i * 0.12}s` }}
                >
                  <span className="hero-status__item-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* decorative orb */}
            <div className="hero-status__orb" />
          </motion.div>

        ) : (

          /* ── Profile Image View ── */
          <motion.div
            key="image"
            variants={imageVariants}
            initial="exit"
            animate="enter"
            exit="exit"
            transition={TRANSITION}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1rem',
              minHeight: '340px',
            }}
          >
            {/* Profile pic with slow cinematic zoom */}
            <motion.img
              src="/Aaditya resume pic.png"
              alt="Aaditya"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 4, ease: 'easeOut' }}
              style={{
                width: '100%',
                height: '100%',
                minHeight: '340px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Bottom gradient for name readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%, rgba(0,0,0,0.15) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Name overlay */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                zIndex: 2,
              }}
            >
              <p style={{
                fontFamily: "'Unbounded', 'Space Grotesk', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}>
                Aaditya
              </p>
              <p style={{
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                margin: '0.2rem 0 0',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              }}>
                Full Stack · AI Systems
              </p>
            </motion.div>

            {/* Close (✕) button */}
            <motion.button
              onClick={() => setIsExpanded(false)}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                zIndex: 10,
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget
                btn.style.background = 'rgba(0,0,0,0.7)'
                btn.style.borderColor = 'rgba(167, 139, 250, 0.45)'
                btn.style.color = '#fff'
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget
                btn.style.background = 'rgba(0,0,0,0.45)'
                btn.style.borderColor = 'rgba(255,255,255,0.15)'
                btn.style.color = 'rgba(255,255,255,0.8)'
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroRightCard
