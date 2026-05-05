import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { GitHubIcon } from './Icons'
import { useSmoothScroll } from '../context/ScrollContext'

const navItems = [
  { label: 'Home', target: 'hero' },
  { label: 'Projects', target: 'projects' },
  { label: 'Skills', target: 'skills' },
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
            ? 'rgba(8, 12, 22, 0.9)'
            : 'rgba(8, 12, 22, 0.7)',
          borderColor: scrolled
            ? 'rgba(57, 208, 255, 0.35)'
            : 'rgba(57, 208, 255, 0.18)',
          boxShadow: scrolled
            ? '0 10px 30px -10px rgba(57, 208, 255, 0.2)'
            : '0 4px 20px -10px rgba(4, 10, 24, 0.4)'
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
                  textShadow: isActive ? '0 0 10px rgba(57, 208, 255, 0.5)' : 'none'
                }}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Sliding Highlight Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="nav-capsule"
                    className="absolute inset-0 z-0 rounded-full"
                    style={{
                      background: 'rgba(57, 208, 255, 0.12)',
                      boxShadow: 'inset 0 0 10px rgba(57, 208, 255, 0.2), 0 0 15px rgba(57, 208, 255, 0.2)',
                      border: '1px solid rgba(57, 208, 255, 0.35)'
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
          <a
            href="https://github.com/Aadityaotakuu"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/70 transition hover:border-[rgba(57,208,255,0.5)] hover:text-white sm:inline-flex"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <ThemeToggle />
        </div>

        {/* Smooth Progress Indicator at the bottom of the pill */}
        <div className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="absolute bottom-0 left-0 top-0 w-full origin-left"
            style={{ 
              scaleX,
              background: 'linear-gradient(90deg, rgba(57, 208, 255, 0.9), rgba(245, 182, 94, 0.9))',
              boxShadow: '0 0 10px rgba(57, 208, 255, 0.6)'
            }}
          />
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header
