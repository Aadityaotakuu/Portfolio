import './CTA.css'
import Section from '../components/Section'
import MagneticButton from '../components/MagneticButton'

const CTA = () => (
  <Section id="cta" eyebrow="Collaboration" title="Let's build something impactful together">
    <div className="cta-card">
      <div className="cta-copy">
        <h3>Open to frontend roles and product collaborations</h3>
        <p>
          If you are looking for a frontend engineer who can translate product
          intent into high-performance, recruiter-ready UI, let&apos;s talk.
        </p>
      </div>

      <div className="cta-actions">
        <MagneticButton
          href="https://linkedin.com/in/aaditya-parab-5486212b7/"
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          LinkedIn
        </MagneticButton>
        <MagneticButton
          href="/Aaditya cv.pdf"
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          Download Resume
        </MagneticButton>
      </div>

      <p className="cta-meta">Based in India - Available for full-time and contract roles</p>
    </div>
  </Section>
)

export default CTA
