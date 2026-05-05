import { motion } from 'framer-motion'
import './TechStack.css'
import Section from '../components/Section'
import { techStack } from '../data/techStack'

const TechStack = () => (
  <Section id="stack" eyebrow="Tech Stack" title="Tools I ship with">
    <div className="stack-grid">
      {techStack.map((group, index) => (
        <motion.article
          key={group.title}
          className="stack-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <div className="stack-card__header">
            <p className="stack-card__title">{group.title}</p>
            <p className="stack-card__desc">{group.description}</p>
          </div>

          <div className="stack-items">
            {group.items.map((item) => (
              <div key={item.name} className="stack-item">
                <span className="stack-icon">{item.icon}</span>
                <div className="stack-text">
                  <span className="stack-name">{item.name}</span>
                  <span className="stack-role">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
)

export default TechStack
