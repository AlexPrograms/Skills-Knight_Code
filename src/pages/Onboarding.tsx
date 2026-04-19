import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { CLASS_META, SKILL_META } from '../data/mockData'
import Button from '../components/ui/Button'

const classes = Object.entries(CLASS_META)
const categories = Object.entries(SKILL_META).slice(0, 8)

const steps = ['welcome', 'class', 'skills', 'ready']

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const toggleSkill = (key: string) => {
    setSelectedSkills(p => p.includes(key) ? p.filter(s => s !== key) : p.length < 4 ? [...p, key] : p)
  }

  const next = () => step < steps.length - 1 ? setStep(s => s + 1) : navigate('/home')

  return (
    <div className="min-h-screen bg-night-950 flex flex-col items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="welcome" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="text-center max-w-sm w-full">
            <motion.div className="text-8xl mb-6" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>⚔️</motion.div>
            <h1 className="font-display text-4xl text-white mb-3">Skills Knight</h1>
            <p className="text-violet-300 text-lg mb-2">Your real life is the game.</p>
            <p className="text-night-600 text-sm mb-10">Every skill you practice earns XP. Level up your actual self.</p>
            <Button size="lg" fullWidth onClick={next}>Begin your journey <ChevronRight size={20} /></Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="class" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-sm">
            <h2 className="font-display text-2xl text-white text-center mb-1">Choose your class</h2>
            <p className="text-violet-300 text-sm text-center mb-6">This is your adventurer archetype. You can change it later.</p>
            <div className="grid grid-cols-1 gap-3 mb-8">
              {classes.map(([key, meta]) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedClass(key)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${selectedClass === key ? 'bg-violet-900/50 border-violet-500' : 'bg-night-800 border-night-700 hover:border-violet-700'}`}
                >
                  <span className="text-3xl">{meta.emoji}</span>
                  <div>
                    <div className="text-white font-bold">{meta.label}</div>
                    <div className="text-violet-300 text-xs">{meta.tagline}</div>
                  </div>
                </motion.button>
              ))}
            </div>
            <Button size="lg" fullWidth onClick={next} disabled={!selectedClass}>Continue <ChevronRight size={20} /></Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="skills" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-sm">
            <h2 className="font-display text-2xl text-white text-center mb-1">What do you love?</h2>
            <p className="text-violet-300 text-sm text-center mb-6">Pick up to 4 skill categories to start with.</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {categories.map(([key, meta]) => {
                const selected = selectedSkills.includes(key)
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSkill(key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${selected ? 'border-violet-500 bg-violet-900/40' : 'border-night-700 bg-night-800 hover:border-violet-700'}`}
                  >
                    <span className="text-3xl">{meta.emoji}</span>
                    <span className="text-white text-sm font-semibold">{meta.label}</span>
                    {selected && <div className="w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center text-white text-[10px]">✓</div>}
                  </motion.button>
                )
              })}
            </div>
            <Button size="lg" fullWidth onClick={next} disabled={selectedSkills.length === 0}>Continue <ChevronRight size={20} /></Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="ready" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center max-w-sm w-full">
            <motion.div className="text-8xl mb-6" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 0.6 }}>🎉</motion.div>
            <h2 className="font-display text-3xl text-white mb-3">You're ready, Knight!</h2>
            <p className="text-violet-300 mb-8">Your adventure begins. Every session you log makes your character stronger — and your real skills sharper.</p>
            <div className="card p-4 mb-8">
              <div className="text-xs text-violet-400 mb-3 font-semibold uppercase tracking-widest">Your starting stats</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-violet-300">Class</div><div className="text-white font-bold">{CLASS_META[selectedClass]?.label ?? 'Knight'}</div>
                <div className="text-violet-300">Focus skills</div><div className="text-white font-bold">{selectedSkills.length} selected</div>
                <div className="text-violet-300">Starting level</div><div className="text-white font-bold">Level 1</div>
              </div>
            </div>
            <Button size="lg" fullWidth onClick={next}>Enter the realm ⚔️</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* step dots */}
      <div className="flex gap-2 mt-10">
        {steps.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-violet-500 w-6' : i < step ? 'bg-violet-700' : 'bg-night-700'}`} />
        ))}
      </div>
    </div>
  )
}
