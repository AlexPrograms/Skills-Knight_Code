import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'

type Phase = 'focus' | 'break' | 'long'
const PHASES: Record<Phase, { label: string; duration: number; emoji: string; color: string; stroke: string }> = {
  focus: { label: 'Focus', duration: 25 * 60, emoji: '🧠', color: 'text-violet-400', stroke: '#a78bfa' },
  break: { label: 'Short Break', duration: 5 * 60, emoji: '☕', color: 'text-emerald-400', stroke: '#34d399' },
  long: { label: 'Long Break', duration: 15 * 60, emoji: '😴', color: 'text-blue-400', stroke: '#60a5fa' },
}

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export default function PomodoroTimer() {
  const { incrementPomodoro, pomodoroStats } = useAppStore()
  const [phase, setPhase] = useState<Phase>('focus')
  const [timeLeft, setTimeLeft] = useState(PHASES.focus.duration)
  const [running, setRunning] = useState(false)
  const [localSessions, setLocalSessions] = useState(0)
  const intervalRef = useRef<number | null>(null)

  const phaseMeta = PHASES[phase]
  const pct = (timeLeft / phaseMeta.duration) * 100
  const circumference = 2 * Math.PI * 90
  const strokeDash = circumference - (pct / 100) * circumference

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            if (phase === 'focus') {
              incrementPomodoro()
              setLocalSessions(s => s + 1)
            }
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current!)
    }
    return () => clearInterval(intervalRef.current!)
  }, [running, phase])

  const switchPhase = (p: Phase) => {
    setRunning(false)
    setPhase(p)
    setTimeLeft(PHASES[p].duration)
  }

  const reset = () => { setRunning(false); setTimeLeft(PHASES[phase].duration) }

  return (
    <>
      <TopBar title="Focus Timer" back />
      <PageShell>
        <div className="flex gap-1 bg-night-800 rounded-2xl p-1 mb-8">
          {(Object.keys(PHASES) as Phase[]).map(p => (
            <button
              key={p}
              onClick={() => switchPhase(p)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${phase === p ? 'bg-violet-600 text-white' : 'text-violet-300 hover:text-white'}`}
            >
              {PHASES[p].emoji} {PHASES[p].label}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg width="220" height="220" className="-rotate-90">
              <circle cx="110" cy="110" r="90" fill="none" stroke="#1a1730" strokeWidth="12" />
              <motion.circle
                cx="110" cy="110" r="90" fill="none"
                stroke={running ? phaseMeta.stroke : '#4c1d95'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: strokeDash }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-5xl font-display ${phaseMeta.color}`}>{fmt(timeLeft)}</div>
              <div className="text-violet-300 text-sm mt-1">{phaseMeta.emoji} {phaseMeta.label}</div>
              {running && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-violet-500 mt-2"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <motion.button whileTap={{ scale: 0.85 }} onClick={reset} className="w-12 h-12 rounded-full bg-night-800 text-violet-400 hover:text-white flex items-center justify-center transition-colors">
            <RotateCcw size={20} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setRunning(r => !r)}
            className="w-16 h-16 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-900/50 transition-colors"
          >
            {running ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
          </motion.button>
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => switchPhase(phase === 'focus' ? 'break' : 'focus')} className="w-12 h-12 rounded-full bg-night-800 text-violet-400 hover:text-white flex items-center justify-center transition-colors">
            <SkipForward size={20} />
          </motion.button>
        </div>

        <Card className="text-center mb-4">
          <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Today's Sessions</div>
          <div className="flex justify-center gap-2 mb-2">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className={`w-6 h-6 rounded-full ${i < pomodoroStats.todaySessions ? 'bg-violet-500' : 'bg-night-800'}`}
                animate={i < pomodoroStats.todaySessions ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              />
            ))}
          </div>
          <div className="font-display text-gold-400 text-2xl">{pomodoroStats.todaySessions}</div>
          <div className="text-night-600 text-xs mt-1">Each focus session = +50 XP +10 🪙</div>
        </Card>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card className="text-center">
            <div className="text-violet-400 font-display text-lg">{pomodoroStats.totalSessions}</div>
            <div className="text-night-600 text-[10px]">All time</div>
          </Card>
          <Card className="text-center">
            <div className="text-emerald-400 font-display text-lg">{Math.floor(pomodoroStats.totalMinutes / 60)}h</div>
            <div className="text-night-600 text-[10px]">Total focus</div>
          </Card>
          <Card className="text-center">
            <div className="text-gold-400 font-display text-lg">{pomodoroStats.weekSessions}</div>
            <div className="text-night-600 text-[10px]">This week</div>
          </Card>
        </div>

        <Card>
          <div className="text-xs text-violet-400 font-semibold mb-2 uppercase tracking-widest">Focus tip</div>
          <p className="text-violet-300 text-sm">"The secret to deep work isn't motivation — it's structure. 25 minutes is enough to change everything."</p>
        </Card>
      </PageShell>
      <BottomNav />
    </>
  )
}
