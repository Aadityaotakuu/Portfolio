export type Achievement = {
  label: string
  value: number
  suffix?: string
  detail: string
}

export const achievements: Achievement[] = [
  {
    label: 'Hackathons Participated',
    value: 7,
    suffix: '+',
    detail: 'Regional and national circuits',
  },
  {
    label: 'Projects Built',
    value: 24,
    suffix: '+',
    detail: 'Production-grade systems and prototypes',
  },
  {
    label: 'Technologies Mastered',
    value: 38,
    suffix: '+',
    detail: 'Across AI, web, and system design',
  },
]
