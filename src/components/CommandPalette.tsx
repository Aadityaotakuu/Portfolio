import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type Command = {
  id: string
  label: string
  keywords: string[]
  action: () => void
}

type CommandPaletteProps = {
  commands: Command[]
}

const CommandPalette = ({ commands }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommand = (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === 'k'

      if (isCommand) {
        event.preventDefault()
        setOpen((current) => !current)
      }

      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((command) =>
      [command.label, ...command.keywords].some((text) =>
        text.toLowerCase().includes(q),
      ),
    )
  }, [commands, query])

  const handleSelect = (command: Command) => {
    command.action()
    setOpen(false)
    setQuery('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="glass-strong neon-border w-[min(720px,92vw)] rounded-2xl p-5"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-xs uppercase tracking-[0.35em] text-muted">
                Command
              </span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections, actions, links"
                className="flex-1 bg-transparent text-sm text-white outline-none"
              />
            </div>

            <div className="mt-4 max-h-72 space-y-2 overflow-auto">
              {filtered.map((command) => (
                <button
                  key={command.id}
                  type="button"
                  onClick={() => handleSelect(command)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white/90 transition hover:bg-white/5"
                >
                  <span>{command.label}</span>
                  <span className="text-xs uppercase tracking-[0.28em] text-muted">
                    Enter
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm text-muted">
                  No commands found. Try another keyword.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
