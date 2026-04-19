import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  glow?: boolean
  onClick?: () => void
  animate?: boolean
}

export default function Card({ children, className = '', glow, onClick, animate = false }: Props) {
  const base = `card p-4 ${glow ? 'card-glow' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`

  if (animate) {
    return (
      <motion.div
        className={base}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={onClick ? { scale: 1.01 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={base}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
