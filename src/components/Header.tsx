import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useSmoothScroll } from '../context/ScrollContext'

const navItems = [
  { label: 'Home', target: 'hero' },
  { label: 'Work', target: 'about' },
  { label: 'Projects', target: 'projects' },
  { label: 'Stack', target: 'skills' },
  { label: 'Contact', target: 'contact' },
]

const Header = () => {
  const { scrollTo } = useSmoothScroll()
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero') // Default to hero

  // Spring animation for the progress bar to make it smooth
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  // Track active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const sections = navItems.map((item) => ({
      id: item.target,
      el: document.getElementById(item.target),
    }))

    const scrollPos = window.scrollY + window.innerHeight / 3

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if (section.el && section.el.offsetTop <= scrollPos) {
        setActiveSection(section.id)
        return
      }
    }
    // Fallback
    if (window.scrollY < 100) {
      setActiveSection('hero')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection() // Initial check
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [updateActiveSection])

  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-30 flex justify-center px-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
    >
      <motion.div
        className="relative flex items-center justify-between gap-4 rounded-full border px-5 py-3 shadow-lg backdrop-blur-md"
        animate={{
          backgroundColor: scrolled
            ? 'rgba(10, 14, 24, 0.85)'
            : 'rgba(10, 14, 24, 0.62)',
          borderColor: scrolled
            ? 'rgba(139, 92, 246, 0.3)'
            : 'rgba(139, 92, 246, 0.1)',
          boxShadow: scrolled
            ? '0 10px 30px -10px rgba(139, 92, 246, 0.2)'
            : '0 4px 20px -10px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.3 }}
        style={{ width: 'min(100%, 900px)' }}
      >
        {/* Brand/Logo */}
        <button
          type="button"
          onClick={() => scrollTo('#hero')}
          className="text-xs font-semibold uppercase tracking-[0.38em] text-white transition-colors hover:text-[var(--accent)]"
        >
          Aaditya
        </button>

        {/* Navigation Items */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.target

            return (
              <motion.button
                key={item.target}
                type="button"
                onClick={() => scrollTo(`#${item.target}`)}
                className="relative px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  fontWeight: isActive ? 600 : 500,
                  textShadow: isActive ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'
                }}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Sliding Highlight Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="nav-capsule"
                    className="absolute inset-0 z-0 rounded-full bg-purple-500/20"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(139, 92, 246, 0.2), 0 0 15px rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 20,
                    }}
                  />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <span className="hidden text-[0.65rem] font-medium tracking-widest text-white/40 sm:inline">
            CTRL + K
          </span>
          <ThemeToggle />
        </div>

        {/* Smooth Progress Indicator at the bottom of the pill */}
        <div className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="absolute bottom-0 left-0 top-0 w-full origin-left bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400"
            style={{ 
              scaleX,
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
            }}
          />
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header
