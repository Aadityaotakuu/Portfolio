export type StackItem = {
  name: string
  role: string
  icon: string
}

export type StackGroup = {
  title: string
  description: string
  items: StackItem[]
}

export const techStack: StackGroup[] = [
  {
    title: 'Frontend Core',
    description: 'UI architecture and component delivery.',
    items: [
      { name: 'React', role: 'Component architecture', icon: 'RE' },
      { name: 'TypeScript', role: 'Typed UI workflows', icon: 'TS' },
      { name: 'Vite', role: 'Fast build tooling', icon: 'VT' },
      { name: 'React Router', role: 'Client routing', icon: 'RR' },
    ],
  },
  {
    title: 'UI & Motion',
    description: 'Visual polish and interaction patterns.',
    items: [
      { name: 'Tailwind CSS', role: 'Utility-first styling', icon: 'TW' },
      { name: 'Framer Motion', role: 'Motion systems', icon: 'FM' },
      { name: 'Figma', role: 'UX design handoff', icon: 'FG' },
      { name: 'Accessibility', role: 'Inclusive UI', icon: 'A11Y' },
    ],
  },
  {
    title: 'Backend & Data',
    description: 'Integration-ready frontends with data context.',
    items: [
      { name: 'FastAPI', role: 'API integration', icon: 'FA' },
      { name: 'MongoDB', role: 'Data persistence', icon: 'DB' },
      { name: 'PostgreSQL', role: 'Relational data', icon: 'PG' },
      { name: 'Mapbox', role: 'Geospatial UI', icon: 'MB' },
    ],
  },
  {
    title: 'Delivery',
    description: 'Quality, performance, and release workflows.',
    items: [
      { name: 'Git', role: 'Version control', icon: 'GT' },
      { name: 'Vercel', role: 'Frontend hosting', icon: 'VC' },
      { name: 'Lighthouse', role: 'Performance checks', icon: 'LH' },
      { name: 'CI/CD', role: 'Automated releases', icon: 'CI' },
    ],
  },
]
