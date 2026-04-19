import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SKILL_META } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const SUB_SKILLS: Record<string, string[]> = {
  TECHNOLOGY: ['Python', 'JavaScript', 'Game Design', 'Maths', 'Data Science', 'Robotics', 'Web Dev'],
  SCIENCE: ['Physics', 'Biology', 'Chemistry', 'Astronomy', 'Neuroscience'],
  CREATIVE: ['Drawing', 'Music', 'Writing', 'Photography', 'Video Editing', 'Animation'],
  SPORT: ['Running', 'Gym', 'Football', 'Basketball', 'Swimming', 'Cycling', 'Martial Arts'],
  LANGUAGES: ['Spanish', 'Japanese', 'French', 'German', 'Mandarin', 'Portuguese'],
  HUMANITIES: ['History', 'Philosophy', 'Psychology', 'English Lit', 'Economics'],
  SOCIAL: ['Public Speaking', 'Debate', 'Leadership', 'Networking', 'Teaching'],
  PRACTICAL: ['Cooking', 'Electronics', 'DIY', 'Finance', 'Gardening'],
}

const EFFORT = [
  { key: 'LIGHT', label: 'Light', desc: 'Casual – under 20 mins', pts: '5–15', color: 'border-emerald-500 bg-emerald-900/30', dot: 'bg-emerald-500' },
  { key: 'MEDIUM', label: 'Medium', desc: 'Solid – 20–60 mins', pts: '20–40', color: 'border-violet-500 bg-violet-900/30', dot: 'bg-violet-500' },
  { key: 'DEEP', label: 'Deep', desc: 'Focused – 1h+', pts: '60–100', color: 'border-gold-500 bg-gold-900/20', dot: 'bg-gold-500' },
]

export default function LogActivity() {
  const navigate = useNavigate()
  const { addLog } = useAppStore()
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState('')
  const [subSkill, setSubSkill] = useState('')
  const [effort, setEffort] = useState('')
  const [desc, setDesc] = useState('')

  const pts = effort === 'DEEP' ? 75 : effort === 'MEDIUM' ? 28 : 11

  const handleSubmit = () => {
    addLog({ skillCategory: category, subSkill, effortLevel: effort, description: desc })
    navigate('/log/success', { state: { pts, subSkill, category, effort } })
  }

  return (
    <>
      <TopBar title="Log Activity" back />
      <PageShell>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {['Category', 'Skill', 'Effort', 'Notes'].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i <= step ? 'bg-violet-600 text-white' : 'bg-night-800 text-night-600'}`}>{i + 1}</div>
              {i < 3 && <div className={`flex-1 h-0.5 transition-all ${i < step ? 'bg-violet-600' : 'bg-night-800'}`} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <motion.div key="cat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-display text-xl text-white mb-4">What did you work on?</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(SKILL_META).map(([key, meta]) => (
                <motion.div key={key} whileTap={{ scale: 0.95 }}>
                  <Card
                    onClick={() => { setCategory(key); setStep(1) }}
                    className={`cursor-pointer ${category === key ? 'border-violet-500' : 'hover:border-violet-700/40'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{meta.emoji}</span>
                      <div>
                        <div className="text-white font-semibold text-sm">{meta.label}</div>
                        <div className="text-night-600 text-[10px]">{meta.examples.slice(0, 2).join(', ')}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="sub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-display text-xl text-white mb-4">Which skill specifically?</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {(SUB_SKILLS[category] ?? []).map(s => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => { setSubSkill(s); setStep(2) }}
                  className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${subSkill === s ? 'bg-violet-600 border-violet-500 text-white' : 'bg-night-800 border-night-700 text-violet-300 hover:border-violet-600'}`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
            <input
              placeholder="Or type your own skill…"
              value={subSkill}
              onChange={e => setSubSkill(e.target.value)}
              className="w-full bg-night-800 border border-night-700 rounded-xl px-4 py-3 text-white placeholder-night-600 focus:outline-none focus:border-violet-500 text-sm"
            />
            {subSkill && !(SUB_SKILLS[category] ?? []).includes(subSkill) && (
              <Button className="mt-3 w-full" onClick={() => setStep(2)}>Next →</Button>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="effort" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-display text-xl text-white mb-4">How hard did you work?</h2>
            <div className="flex flex-col gap-3">
              {EFFORT.map(e => (
                <motion.button
                  key={e.key}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setEffort(e.key); setStep(3) }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${effort === e.key ? e.color : 'bg-night-800 border-night-700 hover:border-violet-700'}`}
                >
                  <div className={`w-3 h-3 rounded-full ${e.dot} flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="text-white font-bold">{e.label}</div>
                    <div className="text-violet-300 text-xs">{e.desc}</div>
                  </div>
                  <div className="text-gold-400 font-bold text-sm">{e.pts} pts</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="notes" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-display text-xl text-white mb-2">What did you do?</h2>
            <p className="text-violet-300 text-sm mb-4">Optional — describe what you worked on.</p>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="e.g. Built a web scraper in Python…"
              rows={5}
              className="w-full bg-night-800 border border-night-700 rounded-xl px-4 py-3 text-white placeholder-night-600 focus:outline-none focus:border-violet-500 text-sm resize-none mb-4"
            />
            <div className="card p-3 mb-5">
              <div className="text-xs text-violet-400 mb-2 font-semibold uppercase tracking-widest">Logging:</div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span className="text-violet-300">Category</span><span className="text-white">{SKILL_META[category]?.emoji} {SKILL_META[category]?.label}</span>
                <span className="text-violet-300">Skill</span><span className="text-white">{subSkill}</span>
                <span className="text-violet-300">Effort</span><span className="text-white">{effort}</span>
                <span className="text-violet-300">XP earned</span><span className="text-gold-400 font-bold">+{pts} XP</span>
              </div>
            </div>
            <Button size="lg" fullWidth onClick={handleSubmit}>Log Activity ⚡</Button>
          </motion.div>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
