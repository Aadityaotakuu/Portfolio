import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'

const NotFound = () => (
  <motion.main
    className="flex min-h-screen items-center justify-center px-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
  >
    <div className="glass-panel neon-border rounded-3xl p-10 text-center">
      <p className="eyebrow">Lost in the void</p>
      <h1 className="mt-4 text-3xl text-white">404</h1>
      <p className="mt-3 text-sm text-muted">
        The page you are looking for slipped into another dimension.
      </p>
      <div className="mt-6 flex justify-center">
        <MagneticButton href="/" variant="secondary">
          Return Home
        </MagneticButton>
      </div>
    </div>
  </motion.main>
)

export default NotFound
