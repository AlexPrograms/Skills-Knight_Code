import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const DURATIONS = [
  { label: '30 days', days: 30, emoji: '📆' },
  { label: '90 days', days: 90, emoji: '🗓️' },
  { label: '365 days', days: 365, emoji: '🌟' },
]

const mockCapsules = [
  { id: 'cap1', message: 'Future me — did you make it to level 25? I hope you kept going with Python. Keep going.', createdAt: '2026-01-01', opensAt: '2026-07-01', opened: false },
]

export default function TimeCapsule() {
  const navigate = useNavigate()
  const { addToast } = useAppStore()
  const [writing, setWriting] = useState(false)
  const [message, setMessage] = useState('')
  const [duration, setDuration] = useState(30)

  const handleSend = () => {
    addToast('success', `Time capsule sealed — opens in ${duration} days! ⏳`)
    setWriting(false)
    setMessage('')
  }

  return (
    <>
      <TopBar title="Time Capsule" back />
      <PageShell>
        {!writing ? (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="font-display text-2xl text-white mb-2">Write to your future self</h2>
              <p className="text-violet-300 text-sm">Seal a message. You'll see it again when the timer unlocks — a snapshot of who you were today.</p>
            </motion.div>

            <Button fullWidth size="lg" onClick={() => setWriting(true)} className="mb-6">
              Write a Time Capsule ✉️
            </Button>

            {mockCapsules.length > 0 && (
              <>
                <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Sealed Capsules</div>
                {mockCapsules.map(cap => (
                  <Card key={cap.id} className="border-violet-700/30">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <div className="text-white font-semibold text-sm">Opens {new Date(cap.opensAt).toLocaleDateString()}</div>
                        <div className="text-violet-300 text-xs mt-1">Written {new Date(cap.createdAt).toLocaleDateString()}</div>
                        <div className="text-night-600 text-xs mt-2 italic">Contents sealed…</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-xl text-white mb-1">Write to future you</h2>
            <p className="text-violet-300 text-sm mb-5">What do you want your future self to know, remember, or be proud of?</p>

            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Hey future me…"
              rows={8}
              className="w-full bg-night-800 border border-night-700 rounded-xl px-4 py-3 text-white placeholder-night-600 focus:outline-none focus:border-violet-500 text-sm resize-none mb-5"
            />

            <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">When does it unlock?</div>
            <div className="flex gap-3 mb-6">
              {DURATIONS.map(d => (
                <button
                  key={d.days}
                  onClick={() => setDuration(d.days)}
                  className={`flex-1 flex flex-col items-center py-3 rounded-2xl border text-sm font-semibold transition-all ${duration === d.days ? 'bg-violet-900/50 border-violet-500 text-white' : 'bg-night-800 border-night-700 text-violet-300 hover:border-violet-600'}`}
                >
                  <span className="text-xl">{d.emoji}</span>
                  <span className="mt-1">{d.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button fullWidth onClick={handleSend} disabled={message.length < 10}>Seal it ⏳</Button>
              <Button fullWidth variant="ghost" onClick={() => setWriting(false)}>Cancel</Button>
            </div>
          </motion.div>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
