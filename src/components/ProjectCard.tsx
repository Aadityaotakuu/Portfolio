import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Project } from '../data/projects'
import MagneticButton from './MagneticButton'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<'features' | 'tech'>('features')
  const [copiedLink, setCopiedLink] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10)
  const cardRef = useRef<HTMLDivElement>(null)

  /* ── 3D tilt ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
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

  /* ── Share / Copy ── */
  const handleShare = async () => {
    const url = project.links.demo || project.links.github || ''
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } catch {
      /* fallback */
    }
  }

  /* ── Like ── */
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  /* ── Status color ── */
  const statusColor =
    project.status === 'live'
      ? '#34d399'
      : project.status === 'in-progress'
      ? '#fbbf24'
      : '#94a3b8'

  const showGitHubButton = ['startup-predictor', 'annam', 'coderedai'].includes(project.id)

  return (
    <motion.article
      ref={cardRef}
      className={`pcard ${isExpanded ? 'expanded' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      {/* ── Glow effect ── */}
      <motion.div
        className="pcard-glow"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}% ${y}%, rgba(167,139,250,0.12), transparent 60%)`
          ),
        }}
      />

      {/* ── Top accent bar ── */}
      <div className="pcard-accent-bar" />

      {/* ── Header ── */}
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
          <h3 className="pcard-title">{project.title}</h3>
        </div>

        <div className="pcard-header-right">
          {/* Index chip */}
          <motion.span
            className="pcard-index"
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
          >
            0{index + 1}
          </motion.span>
        </div>
      </div>

      {/* ── Description ── */}
      <p className="pcard-desc">{project.description}</p>

      {/* ── Highlight strip ── */}
      {project.highlight && (
        <motion.div
          className="pcard-highlight"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.25 }}
        >
          <span className="highlight-icon">⚡</span>
          <span>{project.highlight}</span>
        </motion.div>
      )}

      {/* ── Interactive Tabs ── */}
      <div className="pcard-tabs">
        {(['features', 'tech'] as const).map((tab) => (
          <button
            key={tab}
            className={`pcard-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setActiveTab(tab)
            }}
          >
            {tab === 'features' ? '✦ Features' : '⚙ Tech Stack'}
            {activeTab === tab && <motion.div className="pcard-tab-line" layoutId={`tab-${project.id}`} />}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'features' ? (
          <motion.div
            key="features"
            className="pcard-tab-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="pcard-features">
              {project.features.slice(0, isExpanded ? undefined : 3).map((feature, i) => (
                <motion.li
                  key={feature}
                  className="pcard-feature"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="feature-bullet" />
                  {feature}
                </motion.li>
              ))}
            </ul>
            {project.features.length > 3 && (
              <button
                className="pcard-expand"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded((prev) => !prev)
                }}
              >
                {isExpanded ? '← Show less' : `+${project.features.length - 3} more features →`}
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="tech"
            className="pcard-tab-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pcard-tech-grid">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="pcard-tech-chip"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tags ── */}
      <div className="pcard-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="pcard-tag">
            #{tag}
          </span>
        ))}
      </div>

      {/* ── Footer actions ── */}
      <div className="pcard-footer">
        <div className="pcard-actions-left">
          {/* Like */}
          <motion.button
            className={`pcard-action-btn like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
            whileTap={{ scale: 0.85 }}
            title="Like"
          >
            <motion.span
              animate={liked ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.35 }}
            >
              {liked ? '❤️' : '🤍'}
            </motion.span>
            <span className="action-count">{likeCount}</span>
          </motion.button>

          {/* Share */}
          <motion.button
            className="pcard-action-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleShare()
            }}
            whileTap={{ scale: 0.9 }}
            title="Copy link"
          >
            <AnimatePresence mode="wait">
              {copiedLink ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  ✅
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  🔗
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="pcard-actions-right">
          {showGitHubButton && (
            <MagneticButton
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              <span className="btn-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
                GitHub
              </span>
            </MagneticButton>
          )}
        </div>

      </div>

      {/* ── Hover border particles ── */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="pcard-particle"
                style={{ '--p-delay': `${i * 0.6}s` } as React.CSSProperties}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default ProjectCard