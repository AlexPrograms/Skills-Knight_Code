import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../stores/appStore'

export default function CurrencyDisplay() {
  const { user } = useAppStore()
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 bg-night-800 rounded-xl px-3 py-1.5 border border-night-700">
        <span className="text-base">🪙</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={user.gold}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-gold-300 font-bold text-sm font-display"
          >
            {user.gold.toLocaleString()}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-1.5 bg-night-800 rounded-xl px-3 py-1.5 border border-night-700">
        <span className="text-base">💎</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={user.gems}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-violet-300 font-bold text-sm font-display"
          >
            {user.gems}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
