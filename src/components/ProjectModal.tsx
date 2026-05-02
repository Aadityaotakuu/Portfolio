import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { Project } from '../data/projects'
import './ProjectModal.css'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const staggerContainer: Variants = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const chipVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, handleKeyDown])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="pmodal-backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="pmodal"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative glow */}
            <div className="pmodal__glow" />

            {/* Close button */}
            <button
              className="pmodal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {/* Header */}
              <motion.div className="pmodal__header" variants={fadeIn}>
                <span className="pmodal__icon">{project.icon}</span>
                <div className="pmodal__title-group">
                  <h2 className="pmodal__title">{project.title}</h2>
                  <p className="pmodal__subtitle">{project.subtitle}</p>
                  <span className="pmodal__year-badge">
                    {project.category} · {project.year}
                  </span>
                </div>
              </motion.div>

              {/* Problem */}
              <motion.div className="pmodal__section" variants={fadeIn}>
                <p className="pmodal__section-label">The Problem</p>
                <p className="pmodal__section-text">{project.problem}</p>
              </motion.div>

              {/* Solution / Description */}
              <motion.div className="pmodal__section" variants={fadeIn}>
                <p className="pmodal__section-label">The Solution</p>
                <p className="pmodal__section-text">{project.description}</p>
              </motion.div>

              {/* Key Features */}
              <motion.div className="pmodal__section" variants={fadeIn}>
                <p className="pmodal__section-label">Key Features</p>
                <ul className="pmodal__features">
                  {project.features.map((feature) => (
                    <motion.li
                      key={feature}
                      className="pmodal__feature"
                      variants={fadeIn}
                    >
                      <span className="pmodal__feature-dot" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Tech Stack */}
              <motion.div className="pmodal__section" variants={fadeIn}>
                <p className="pmodal__section-label">Tech Stack</p>
                <div className="pmodal__tech">
                  {project.tech.map((t) => (
                    <motion.span
                      key={t}
                      className="pmodal__tech-chip"
                      variants={chipVariant}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Impact */}
              <motion.div className="pmodal__section" variants={fadeIn}>
                <p className="pmodal__section-label">Impact</p>
                <p className="pmodal__section-text">{project.impact}</p>
              </motion.div>

              {/* Highlight */}
              <motion.div variants={fadeIn}>
                <div className="pmodal__highlight">
                  <span className="pmodal__highlight-icon">⚡</span>
                  {project.highlight}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div className="pmodal__section" variants={fadeIn}>
                <div className="pmodal__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="pmodal__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
