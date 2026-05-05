import { useState, useRef } from 'react'
import './Skills.css'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Section from '../components/Section'
import { skillCategories } from '../data/skills'

/* ── tiny helpers ── */
const levelLabel = (lvl: number) => {
  if (lvl >= 90) return { text: 'Expert', color: '#39d0ff' }
  if (lvl >= 75) return { text: 'Advanced', color: '#f5b65e' }
  if (lvl >= 55) return { text: 'Proficient', color: '#14b8a6' }
  return { text: 'Familiar', color: '#94a3b8' }
}

/* ── Radar mini-chart ── */
const RadarChart = ({ items }: { items: { name: string; level: number }[] }) => {
  const size = 160
  const cx = size / 2
  const cy = size / 2
  const r = 60
  const count = items.length

  const angleStep = (2 * Math.PI) / count
  const getPoint = (i: number, radius: number) => ({
    x: cx + radius * Math.sin(i * angleStep),
    y: cy - radius * Math.cos(i * angleStep),
  })

  const webPoints = items
    .map((item, i) => {
      const pt = getPoint(i, (item.level / 100) * r)
      return `${pt.x},${pt.y}`
    })
    .join(' ')

  return (
    <svg className="radar-svg" viewBox={`0 0 ${size} ${size}`}>
      {/* grid rings */}
      {[0.25, 0.5, 0.75, 1].map((ratio) => (
        <polygon
          key={ratio}
          className="radar-ring"
          points={Array.from({ length: count }, (_, i) => {
            const pt = getPoint(i, r * ratio)
            return `${pt.x},${pt.y}`
          }).join(' ')}
        />
      ))}

      {/* spokes */}
      {Array.from({ length: count }, (_, i) => {
        const pt = getPoint(i, r)
        return <line key={i} className="radar-spoke" x1={cx} y1={cy} x2={pt.x} y2={pt.y} />
      })}

      {/* data shape */}
      <motion.polygon
        className="radar-data"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        points={webPoints}
      />

      {/* labels */}
      {items.map((item, i) => {
        const pt = getPoint(i, r + 16)
        return (
          <text key={i} x={pt.x} y={pt.y} className="radar-label" textAnchor="middle" dominantBaseline="middle">
            {item.name.length > 6 ? item.name.slice(0, 5) + '…' : item.name}
          </text>
        )
      })}
    </svg>
  )
}

/* ── Single skill bar ── */
const SkillBar = ({
  skill,
  delay,
}: {
  skill: { name: string; level: number; icon?: string }
  delay: number
}) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const badge = levelLabel(skill.level)

  return (
    <div
      ref={ref}
      className={`skill-bar-row ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* name + badge */}
      <div className="skill-bar-header">
        <div className="skill-name-group">
          {skill.icon && <span className="skill-icon">{skill.icon}</span>}
          <span className="skill-name">{skill.name}</span>
          <AnimatePresence>
            {hovered && (
              <motion.span
                className="skill-badge"
                style={{ background: badge.color }}
                initial={{ opacity: 0, x: -6, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -6, scale: 0.85 }}
                transition={{ duration: 0.18 }}
              >
                {badge.text}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.span
          className="skill-pct"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* track */}
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* glow pulse on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="skill-fill-glow"
              style={{ width: `${skill.level}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* milestone ticks */}
        {[25, 50, 75].map((tick) => (
          <div key={tick} className="skill-tick" style={{ left: `${tick}%` }} />
        ))}
      </div>
    </div>
  )
}

/* ── Category card ── */
const CategoryCard = ({
  category,
  index,
  isSelected,
  onSelect,
}: {
  category: (typeof skillCategories)[0]
  index: number
  isSelected: boolean
  onSelect: () => void
}) => {
  const [showRadar, setShowRadar] = useState(false)
  const avg = Math.round(category.items.reduce((s, i) => s + i.level, 0) / category.items.length)

  return (
    <motion.div
      className={`category-card ${isSelected ? 'selected' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onSelect}
    >
      {/* card header */}
      <div className="card-header">
        <div className="card-header-left">
          <span className="card-eyebrow">{category.title}</span>
          <h3 className="card-title">{category.description}</h3>
        </div>

        <div className="card-header-right">
          {/* avg ring */}
          <div className="avg-ring" title={`Average proficiency: ${avg}%`}>
            <svg viewBox="0 0 48 48">
              <circle className="avg-track" cx="24" cy="24" r="20" />
              <motion.circle
                className="avg-fill"
                cx="24"
                cy="24"
                r="20"
                strokeDasharray={`${(avg / 100) * 125.6} 125.6`}
                initial={{ strokeDasharray: '0 125.6' }}
                whileInView={{ strokeDasharray: `${(avg / 100) * 125.6} 125.6` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: index * 0.12 + 0.3 }}
              />
            </svg>
            <span className="avg-text">{avg}%</span>
          </div>

          {/* radar toggle */}
          <button
            className={`radar-toggle ${showRadar ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setShowRadar((v) => !v)
            }}
            title="Toggle radar view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,7 17,10 17,14 12,17 7,14 7,10" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* radar chart */}
      <AnimatePresence>
        {showRadar && (
          <motion.div
            className="radar-wrapper"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 180 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            <RadarChart items={category.items} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* skill bars */}
      <div className="skills-list">
        {category.items.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} delay={index * 0.08 + i * 0.1} />
        ))}
      </div>

      {/* selection indicator */}
      <div className="card-select-hint">
        {isSelected ? '✓ Selected' : 'Click to highlight'}
      </div>
    </motion.div>
  )
}

/* ── Main component ── */
const Skills = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | string>('all')

  const tabs = ['all', ...skillCategories.map((c) => c.title)]

  const visible =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.title === activeTab)

  const totalSkills = skillCategories.reduce((s, c) => s + c.items.length, 0)
  const overallAvg = Math.round(
    skillCategories.flatMap((c) => c.items).reduce((s, i) => s + i.level, 0) / totalSkills
  )

  return (
    <Section id="skills" eyebrow="Skills" title="The craft behind every interface">
      {/* ── Summary bar ── */}
      <motion.div
        className="skills-summary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {[
          { label: 'Categories', value: skillCategories.length },
          { label: 'Total Skills', value: totalSkills },
          { label: 'Avg Proficiency', value: `${overallAvg}%` },
          { label: 'Expert Level', value: skillCategories.flatMap(c => c.items).filter(i => i.level >= 90).length },
        ].map((s) => (
          <div key={s.label} className="summary-item">
            <span className="summary-value">{s.value}</span>
            <span className="summary-label">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Tab filter ── */}
      <div className="skills-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`skills-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' ? 'All Categories' : tab}
            {activeTab === tab && (
              <motion.div className="tab-underline" layoutId="tab-underline" />
            )}
          </button>
        ))}
      </div>

      {/* ── Cards grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="skills-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
        >
          {visible.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
              isSelected={selectedId === category.title}
              onSelect={() =>
                setSelectedId((prev) => (prev === category.title ? null : category.title))
              }
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Legend ── */}
      <motion.div
        className="skills-legend"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {[
          { label: 'Expert', color: '#39d0ff', min: 90 },
          { label: 'Advanced', color: '#f5b65e', min: 75 },
          { label: 'Proficient', color: '#14b8a6', min: 55 },
          { label: 'Familiar', color: '#94a3b8', min: 0 },
        ].map((l) => (
          <div key={l.label} className="legend-item">
            <span className="legend-dot" style={{ background: l.color }} />
            <span className="legend-label">
              {l.label} {l.min > 0 ? `(${l.min}%+)` : '(< 55%)'}
            </span>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}

export default Skills