import { useEffect, useState } from 'react'

type TypewriterOptions = {
  speed?: number
  deleteSpeed?: number
  pause?: number
}

export const useTypewriter = (
  words: string[],
  { speed = 80, deleteSpeed = 40, pause = 1200 }: TypewriterOptions = {},
) => {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    if (!deleting && subIndex === words[index].length) {
      const timeout = window.setTimeout(() => setDeleting(true), pause)
      return () => window.clearTimeout(timeout)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((current) => (current + 1) % words.length)
      return
    }

    const timeout = window.setTimeout(
      () => {
        setSubIndex((current) => current + (deleting ? -1 : 1))
      },
      deleting ? deleteSpeed : speed,
    )

    return () => window.clearTimeout(timeout)
  }, [words, index, subIndex, deleting, speed, deleteSpeed, pause])

  return {
    text: words[index]?.substring(0, subIndex) ?? '',
    deleting,
    index,
  }
}
