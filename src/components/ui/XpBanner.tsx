import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../stores/appStore'

export default function XpBanner() {
  const { showXpBanner, xpBannerAmount } = useAppStore()
  return (
    <AnimatePresence>
      {showXpBanner && (
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -60, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-gold-500 text-night-950 font-display text-xl px-8 py-2.5 rounded-full shadow-2xl pointer-events-none"
        >
          +{xpBannerAmount} XP ✨
        </motion.div>
      )}
    </AnimatePresence>
  )
}
