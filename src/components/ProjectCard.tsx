import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Project, ProjectLink } from '../data/projects'
import MagneticButton from './MagneticButton'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 24,
  })

  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
      glowX.set(((e.clientX - rect.left) / rect.width) * 100)
      glowY.set(((e.clientY - rect.top) / rect.height) * 100)
    },
    [mouseX, mouseY, glowX, glowY]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }, [mouseX, mouseY])

  const statusColor =
    project.status === 'live'
      ? '#22c55e'
      : project.status === 'in-progress'
      ? '#f59e0b'
      : '#94a3b8'

  const preview = project.preview ?? {
    label: project.subtitle,
    metric: 'Product case study',
    accent: 'var(--accent)',
    secondary: 'var(--accent-2)',
  }

  const links: ProjectLink = project.links ?? {}
  const hasGithub = Boolean(links.github)
  const hasDemo = Boolean(links.demo)
  const hasLinks = hasGithub || hasDemo
  const showTrustNotes = !hasLinks && (project.uiOverview || project.systemBehavior)
  const previewFeatures = isExpanded ? project.features : project.features.slice(0, 3)

  return (
    <motion.article
      ref={cardRef}
      className={`pcard ${isHovered ? 'hovered' : ''}`}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <motion.div
        className="pcard-glow"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(620px circle at ${x}% ${y}%, rgba(57,208,255,0.12), transparent 60%)`
          ),
        }}
      />

      <div className="pcard-preview" style={{
        '--preview-accent': preview.accent,
        '--preview-secondary': preview.secondary,
      } as React.CSSProperties}>
        <div className="pcard-preview__top">
          <span className="pcard-preview__pill">Case Study</span>
          {project.confidentiality && (
            <span className="pcard-preview__tag">{project.confidentiality}</span>
          )}
        </div>
        <div className="pcard-preview__body">
          <span className="pcard-preview__metric">{preview.metric}</span>
          <span className="pcard-preview__label">{preview.label}</span>
        </div>
        <div className="pcard-preview__grid">
          <span className="pcard-preview__line" />
          <span className="pcard-preview__line" />
          <span className="pcard-preview__line" />
          <span className="pcard-preview__line" />
        </div>
      </div>

      <div className="pcard-header">
        <div className="pcard-header-left">
          <div className="pcard-eyebrow-row">
            <span className="pcard-eyebrow">{project.subtitle}</span>
            {project.status && (
              <span className="pcard-status" style={{ '--status-color': statusColor } as React.CSSProperties}>
                <span className="status-dot" />
                {project.status}
              </span>
            )}
          </div>
          <div className="pcard-title-row">
            <span className="pcard-icon">{project.icon}</span>
            <h3 className="pcard-title">{project.title}</h3>
          </div>
          <div className="pcard-meta">
            <span>{project.category}</span>
            <span className="pcard-meta-dot" />
            <span>{project.year}</span>
          </div>
        </div>

        <div className="pcard-header-right">
          <motion.span
            className="pcard-index"
            whileHover={{ scale: 1.12, rotate: 6 }}
            whileTap={{ scale: 0.9 }}
          >
            0{index + 1}
          </motion.span>
        </div>
      </div>

      <div className="pcard-body">
        <p className="pcard-summary">{project.summary}</p>

        <div className="pcard-section">
          <p className="pcard-section__label">Problem</p>
          <p className="pcard-section__text">{project.problem}</p>
        </div>

        <div className="pcard-section">
          <p className="pcard-section__label">Key Features</p>
          <ul className="pcard-features">
            {previewFeatures.map((feature) => (
              <li key={feature} className="pcard-feature">
                <span className="feature-bullet" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="pcard-toggle"
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded((prev) => !prev)
          }}
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'View less' : 'View more'}
        </button>

        {isExpanded && (
          <div className="pcard-details">
            <div className="pcard-section">
              <p className="pcard-section__label">Tech Stack</p>
              <div className="pcard-tech-grid">
                {project.tech.map((tech) => (
                  <span key={tech} className="pcard-tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pcard-section">
              <p className="pcard-section__label">My Contribution</p>
              <p className="pcard-section__text">{project.contribution}</p>
            </div>

            {showTrustNotes && (
              <div className="pcard-section pcard-trust">
                {project.uiOverview && (
                  <div className="pcard-trust__item">
                    <span className="pcard-trust__label">UI Overview</span>
                    <span className="pcard-trust__text">{project.uiOverview}</span>
                  </div>
                )}
                {project.systemBehavior && (
                  <div className="pcard-trust__item">
                    <span className="pcard-trust__label">System Behavior</span>
                    <span className="pcard-trust__text">{project.systemBehavior}</span>
                  </div>
                )}
              </div>
            )}

            {project.highlight && (
              <div className="pcard-highlight">
                <span className="highlight-icon">●</span>
                <span>{project.highlight}</span>
              </div>
            )}

            <div className="pcard-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="pcard-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pcard-footer">
        <div className="pcard-actions-right" onClick={(e) => e.stopPropagation()}>
          {hasLinks ? (
            <>
              {hasDemo && (
                <MagneticButton
                  href={links.demo}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  className="pcard-link"
                >
                  Live Demo
                </MagneticButton>
              )}
              {hasGithub && (
                <MagneticButton
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="pcard-link"
                >
                  GitHub
                </MagneticButton>
              )}
            </>
          ) : (
            <span className="pcard-private">🔒 Code Private (Available on request)</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard