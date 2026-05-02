import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  eyebrow?: string
  title: string
  children: ReactNode
  className?: string
}

const Section = ({ id, eyebrow, title, children, className }: SectionProps) => (
  <motion.section
    id={id}
    className={`py-16 md:py-24 ${className ?? ''}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-120px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="mb-10">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="section-title text-glow">{title}</h2>
    </div>
    {children}
  </motion.section>
)

export default Section
