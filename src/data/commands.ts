export type CommandDefinition = {
  id: string
  label: string
  keywords: string[]
  action: 'scroll' | 'link' | 'theme'
  target: string
}

export const commandDefinitions: CommandDefinition[] = [
  {
    id: 'nav-hero',
    label: 'Go to Hero',
    keywords: ['hero', 'home', 'top'],
    action: 'scroll',
    target: 'hero',
  },
  {
    id: 'nav-about',
    label: 'Go to About',
    keywords: ['about', 'story', 'bio'],
    action: 'scroll',
    target: 'about',
  },
  {
    id: 'nav-stack',
    label: 'Go to Tech Stack',
    keywords: ['stack', 'tech', 'tools'],
    action: 'scroll',
    target: 'stack',
  },
  {
    id: 'nav-skills',
    label: 'Go to Skills',
    keywords: ['skills', 'stack', 'tooling'],
    action: 'scroll',
    target: 'skills',
  },
  {
    id: 'nav-projects',
    label: 'Go to Projects',
    keywords: ['projects', 'work', 'case studies'],
    action: 'scroll',
    target: 'projects',
  },

  {
    id: 'nav-contact',
    label: 'Go to Contact',
    keywords: ['contact', 'email', 'connect'],
    action: 'scroll',
    target: 'contact',
  },
  {
    id: 'toggle-theme',
    label: 'Toggle Light/Dark Mode',
    keywords: ['theme', 'light', 'dark'],
    action: 'theme',
    target: 'toggle',
  },
  {
    id: 'open-github',
    label: 'Open GitHub',
    keywords: ['github', 'code', 'repo'],
    action: 'link',
    target: 'https://github.com/aaditya95-parab',
  },
  {
    id: 'open-linkedin',
    label: 'Open LinkedIn',
    keywords: ['linkedin', 'network', 'profile'],
    action: 'link',
    target: 'https://linkedin.com/in/aaditya-parab-5486212b7/',
  },
]
