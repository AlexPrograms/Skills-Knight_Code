import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SKILL_META } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const colors = ['#a78bfa', '#f59e0b', '#34d399', '#f472b6', '#60a5fa']
const confetti = Array.from({ length: 24 }, (_, i) => ({
  x: Math.random() * 100, y: -(Math.random() * 40 + 10),
  size: Math.random() * 9 + 4,
  color: colors[i % colors.length],
  rotation: Math.random() * 360,
  delay: Math.random() * 0.6,
  duration: 2.2 + Math.random() * 1.2,
}))

export default function LogSuccess() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: { pts: number; subSkill: string; category: string; effort: string } | null }
  const { user } = useAppStore()
  const pts = state?.pts ?? 28
  const subSkill = state?.subSkill ?? 'Activity'
  const category = state?.category ?? 'TECHNOLOGY'
  const meta = SKILL_META[category]

  useEffect(() => {
    const t = setTimeout(() => navigate('/home'), 5000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen bg-night-950 flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Confetti */}
      {confetti.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm pointer-events-none"
          style={{ left: `${c.x}%`, top: `${c.y}%`, width: c.size, height: c.size, backgroundColor: c.color, rotate: c.rotation }}
          animate={{ y: '115vh', rotate: c.rotation + 720 }}
          transition={{ duration: c.duration, delay: c.delay, ease: 'easeIn' }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="text-7xl mb-4"
      >
        {meta?.emoji ?? '⚡'}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="font-display text-3xl text-white mb-1 text-center"
      >
        Activity Logged!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="text-violet-300 text-center mb-8"
      >
        {subSkill} — well done, Knight.
      </motion.p>

      <div className="w-full max-w-xs">
        <Card className="mb-5 text-center card-glow">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.4 }}
            className="font-display text-6xl text-gold-400 mb-1"
          >
            +{pts}
          </motion.div>
          <div className="text-violet-300 text-sm mb-3">XP earned</div>
          <div className="flex justify-center gap-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <div className="text-emerald-400 font-bold">+{Math.floor(pts / 3)} 🪙</div>
              <div className="text-night-600 text-xs">gold</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
              <div className="text-orange-400 font-bold">🔥 {user.streakCount}d</div>
              <div className="text-night-600 text-xs">streak</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <div className="text-violet-400 font-bold">LVL {user.level}</div>
              <div className="text-night-600 text-xs">level</div>
            </motion.div>
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          <Button size="lg" fullWidth onClick={() => navigate('/log')}>Log Another ⚡</Button>
          <Button size="lg" fullWidth variant="secondary" onClick={() => navigate('/home')}>Back to Home</Button>
        </div>
        <p className="text-center text-night-600 text-xs mt-4">Auto-returning in 5 seconds…</p>
      </div>
    </div>
  )
}
