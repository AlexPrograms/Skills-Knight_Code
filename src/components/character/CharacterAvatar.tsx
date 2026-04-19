import { motion } from 'framer-motion'
import { CLASS_META } from '../../data/mockData'

interface Props {
  classType: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}

const sizes = { sm: 'w-10 h-10 text-2xl', md: 'w-16 h-16 text-4xl', lg: 'w-24 h-24 text-5xl', xl: 'w-32 h-32 text-6xl' }

export default function CharacterAvatar({ classType, size = 'md', animate: doAnimate }: Props) {
  const meta = CLASS_META[classType as keyof typeof CLASS_META] ?? CLASS_META['Warrior']
  return (
    <motion.div
      className={`${sizes[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-violet-900 to-night-800 border-2 border-violet-600/40 shadow-lg`}
      animate={doAnimate ? { y: [0, -6, 0] } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span>{meta.emoji}</span>
    </motion.div>
  )
}
