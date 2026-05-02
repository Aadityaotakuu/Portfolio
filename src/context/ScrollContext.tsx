import { createContext, useContext, useMemo } from 'react'
import { useLenis } from '../hooks/useLenis'
import type { ScrollOptions, ScrollTarget } from '../hooks/useLenis'

type ScrollContextValue = {
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void
}

const ScrollContext = createContext<ScrollContextValue | undefined>(undefined)

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const { scrollTo } = useLenis()

  const value = useMemo(() => ({ scrollTo }), [scrollTo])

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export const useSmoothScroll = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useSmoothScroll must be used within ScrollProvider')
  }
  return context
}
