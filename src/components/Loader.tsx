import { AnimatePresence, motion } from 'framer-motion'

type LoaderProps = {
  isLoading: boolean
}

const Loader = ({ isLoading }: LoaderProps) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="glass-strong neon-border rounded-3xl px-8 py-7 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
        >
          <div className="relative mx-auto mb-4 h-12 w-12">
            <span className="absolute inset-0 rounded-full border border-white/20" />
            <span className="absolute inset-0 rounded-full border-t-2 border-b-2 border-accent animate-spin" />
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            Initializing
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default Loader
