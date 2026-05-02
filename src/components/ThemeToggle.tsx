import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-panel border-faint flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted"
      aria-label="Toggle light and dark mode"
    >
      <span className="hidden sm:inline">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
      <div className="relative h-4 w-9 rounded-full bg-white/10">
        <motion.span
          className="absolute top-0.5 h-3 w-3 rounded-full bg-accent"
          animate={{ x: theme === 'dark' ? 0 : 18 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </div>
    </button>
  )
}

export default ThemeToggle
