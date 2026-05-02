import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import CommandPalette from './components/CommandPalette'
import CursorGlow from './components/CursorGlow'
import IntroScreen from './components/IntroScreen'
import ScrollProgress from './components/ScrollProgress'
import { ScrollProvider, useSmoothScroll } from './context/ScrollContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { commandDefinitions } from './data/commands'

const HomePage = lazy(() => import('./pages/HomePage'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AppShell = () => {
  const location = useLocation()
  const { scrollTo } = useSmoothScroll()
  const { toggleTheme } = useTheme()
  const [showIntro, setShowIntro] = useState(true)

  const commands = useMemo(
    () =>
      commandDefinitions.map((definition) => {
        if (definition.action === 'scroll') {
          return {
            ...definition,
            action: () => scrollTo(`#${definition.target}`),
          }
        }

        if (definition.action === 'theme') {
          return { ...definition, action: () => toggleTheme() }
        }

        return {
          ...definition,
          action: () =>
            window.open(definition.target, '_blank', 'noopener,noreferrer'),
        }
      }),
    [scrollTo, toggleTheme],
  )

  return (
    <>
      {showIntro ? (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          <ScrollProgress />
          <CursorGlow />
          <div className="noise-layer" aria-hidden="true" />
          <CommandPalette commands={commands} />

          <AnimatePresence mode="wait">
            <Suspense fallback={null}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </>
      )}
    </>
  )
}

const App = () => (
  <ThemeProvider>
    <ScrollProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ScrollProvider>
  </ThemeProvider>
)

export default App
