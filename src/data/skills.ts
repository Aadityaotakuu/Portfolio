export type Skill = {
  name: string
  level: number
}

export type SkillCategory = {
  title: string
  description: string
  items: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    description: 'Systems-first foundations with modern type safety.',
    items: [
      { name: 'TypeScript', level: 92 },
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 84 },
      { name: 'Java', level: 78 },
    ],
  },
  {
    title: 'Frameworks',
    description: 'Full-stack delivery from UI to intelligent APIs.',
    items: [
      { name: 'React', level: 93 },
      { name: 'FastAPI', level: 88 },
      { name: 'Node.js', level: 82 },
      { name: 'Streamlit', level: 80 },
    ],
  },
  {
    title: 'Databases',
    description: 'Relational depth with scalable NoSQL choices.',
    items: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 83 },
      { name: 'Redis', level: 76 },
      { name: 'SQLite', level: 72 },
    ],
  },
  {
    title: 'Tools',
    description: 'Design, delivery, and ML-focused toolchains.',
    items: [
      { name: 'Docker', level: 82 },
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 78 },
      { name: 'Figma', level: 70 },
    ],
  },
]
