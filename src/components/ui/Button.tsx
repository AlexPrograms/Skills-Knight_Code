import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-violet-600 hover:bg-violet-500 text-white border border-violet-500',
  secondary: 'bg-night-800 hover:bg-night-700 text-white border border-night-700',
  ghost: 'bg-transparent hover:bg-night-800 text-violet-300 border border-transparent',
  danger: 'bg-rose-700 hover:bg-rose-600 text-white border border-rose-600',
  gold: 'bg-gold-500 hover:bg-gold-400 text-night-950 border border-gold-400 font-bold',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-base rounded-2xl',
  lg: 'px-7 py-3.5 text-lg rounded-2xl',
}

export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled, className = '', fullWidth }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} font-semibold transition-colors inline-flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </motion.button>
  )
}
