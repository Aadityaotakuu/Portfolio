export type Skill = {
  name: string
  level: number
  icon?: string
}

export type SkillCategory = {
  title: string
  description: string
  items: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    description: 'Core web languages with strong type safety.',
    items: [
      { name: 'TypeScript', level: 92, icon: 'TS' },
      { name: 'JavaScript', level: 90, icon: 'JS' },
      { name: 'HTML', level: 88, icon: 'HTML' },
      { name: 'CSS', level: 86, icon: 'CSS' },
    ],
  },
  {
    title: 'Frameworks',
    description: 'Component-driven UI foundations.',
    items: [
      { name: 'React', level: 93, icon: 'RE' },
      { name: 'Vite', level: 86, icon: 'VT' },
      { name: 'React Router', level: 84, icon: 'RR' },
      { name: 'Node.js', level: 78, icon: 'ND' },
    ],
  },
  {
    title: 'UI & Motion',
    description: 'Interfaces that feel fast and polished.',
    items: [
      { name: 'Tailwind CSS', level: 88, icon: 'TW' },
      { name: 'Framer Motion', level: 86, icon: 'FM' },
      { name: 'Design Systems', level: 82, icon: 'DS' },
      { name: 'Accessibility', level: 80, icon: 'A11Y' },
    ],
  },
  {
    title: 'Tools',
    description: 'Shipping, testing, and delivery workflows.',
    items: [
      { name: 'Git', level: 90, icon: 'GIT' },
      { name: 'Vercel', level: 84, icon: 'VC' },
      { name: 'Figma', level: 78, icon: 'FIG' },
      { name: 'Lighthouse', level: 76, icon: 'LH' },
    ],
  },
]
