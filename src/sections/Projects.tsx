import { useState, useMemo } from 'react'
import './Projects.css'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'recent'>('default')
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = useMemo(() => {
    let result = [...projects]

    if (activeFilter !== 'All') {
      result = result.filter(p => p.category === activeFilter)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'recent') {
      result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    }

    return result
  }, [activeFilter, searchQuery, sortBy])

  return (
    <Section id="projects" eyebrow="Case Studies" title="Product-grade builds with measurable impact">
      {/* ── Controls Bar ── */}
      <div className="projects-controls">
        {/* Search */}
        <div className="projects-search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="projects-search"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Sort */}
        <select
          className="projects-sort"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="default">Default order</option>
          <option value="name">Sort by name</option>
          <option value="recent">Sort by recent</option>
        </select>

        {/* View Toggle */}
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="4" width="18" height="3" rx="1" />
              <rect x="3" y="10.5" width="18" height="3" rx="1" />
              <rect x="3" y="17" width="18" height="3" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="projects-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-pill ${activeFilter === cat ? 'active' : ''} ${hoveredFilter === cat ? 'hovered' : ''}`}
            onClick={() => setActiveFilter(cat)}
            onMouseEnter={() => setHoveredFilter(cat)}
            onMouseLeave={() => setHoveredFilter(null)}
          >
            {cat}
            <span className="pill-count">
              {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Results Meta ── */}
      <div className="projects-meta">
        <span className="meta-count">
          Showing <strong>{filteredProjects.length}</strong> of {projects.length} case studies
        </span>
        {(activeFilter !== 'All' || searchQuery) && (
          <button
            className="meta-reset"
            onClick={() => {
              setActiveFilter('All')
              setSearchQuery('')
              setSortBy('default')
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Project Grid / List ── */}
      {filteredProjects.length > 0 ? (
        <div className={`projects-grid ${viewMode === 'list' ? 'list-mode' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card-wrapper"
              style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
              onClick={() => setSelectedProject(project)}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="projects-empty">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">No projects found</h3>
          <p className="empty-desc">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button
            className="empty-reset"
            onClick={() => {
              setActiveFilter('All')
              setSearchQuery('')
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      {/* ── Stats Strip ── */}
      <div className="projects-stats">
        {[
          { label: 'Case Studies', value: projects.length },
          { label: 'Categories', value: categories.length - 1 },
          { label: 'Focus Areas', value: Array.from(new Set(projects.flatMap(p => p.tags ?? []))).length },
        ].map(stat => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">{stat.value}+</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── Project Detail Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  )
}

export default Projects