import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  nopad?: boolean
}

export default function PageShell({ children, className = '', nopad }: Props) {
  return (
    <motion.main
      className={`w-full ${nopad ? '' : 'px-4 pt-4 pb-[88px]'} min-h-screen ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}
