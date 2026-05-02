import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { ScrollTarget } from './useLenis'

type ScrollTo = (target: ScrollTarget) => void

export const useScrollToHash = (scrollTo: ScrollTo) => {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const target = document.getElementById(id)
    if (target) scrollTo(target)
  }, [location.hash, scrollTo])
}
