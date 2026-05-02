import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
}

const MagneticButton = ({
  children,
  className,
  href,
  onClick,
  target,
  rel,
  variant = 'primary',
  type = 'button',
}: MagneticButtonProps) => {
  const { x, y, handleMove, handleLeave } = useMagnetic()
  const styles = `${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${
    className ?? ''
  }`

  if (href) {
    return (
      <motion.a
        href={href}
        className={styles}
        style={{ x, y }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={target}
        rel={rel}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={styles}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}

export default MagneticButton
