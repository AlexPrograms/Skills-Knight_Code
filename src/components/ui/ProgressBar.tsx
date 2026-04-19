import { motion } from 'framer-motion'

interface Props {
  value: number
  max: number
  color?: string
  height?: string
  showLabel?: boolean
  className?: string
}

export default function ProgressBar({ value, max, color = 'bg-violet-500', height = 'h-2', showLabel, className = '' }: Props) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-violet-300 mb-1">
          <span>{value.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      )}
      <div className={`w-full bg-night-800 rounded-full overflow-hidden ${height}`}>
        <motion.div
          className={`${height} ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
