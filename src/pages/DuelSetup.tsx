import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mockFriends, mockUser, CLASS_META, SKILL_META } from '../data/mockData'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import CharacterAvatar from '../components/character/CharacterAvatar'

const WAGER = [0, 50, 100, 250]

export default function DuelSetup() {
  const navigate = useNavigate()
  const [opponent, setOpponent] = useState<typeof mockFriends[0] | null>(null)
  const [wager, setWager] = useState(50)
  const [mode, setMode] = useState<'standard' | 'skill'>('standard')
  const [skillCategory, setSkillCategory] = useState('TECHNOLOGY')

  const handleStart = () => {
    navigate('/battle/fight', { state: { opponent: opponent ?? mockFriends[0], wager, mode } })
  }

  return (
    <>
      <TopBar title="Duel Setup" back />
      <PageShell>
        <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Choose Opponent</div>
        <div className="flex flex-col gap-2 mb-5">
          {mockFriends.map(f => (
            <Card
              key={f.id}
              onClick={() => setOpponent(f)}
              className={`cursor-pointer transition-all ${opponent?.id === f.id ? 'border-violet-500 bg-violet-900/20' : 'hover:border-violet-700/40'}`}
            >
              <div className="flex items-center gap-3">
                <CharacterAvatar classType={f.characterClass} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{f.username}</span>
                    <Badge color="violet" size="xs">LVL {f.level}</Badge>
                    {f.isOnline && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                  <div className="text-violet-300 text-xs">{f.battlePower.toLocaleString()} BP</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-night-600">{f.winRecord.wins}W / {f.winRecord.losses}L</div>
                  {f.battlePower > mockUser.battlePower ? (
                    <Badge color="rose" size="xs">Harder</Badge>
                  ) : (
                    <Badge color="emerald" size="xs">Easier</Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Battle Mode</div>
        <div className="flex gap-2 mb-5">
          <button onClick={() => setMode('standard')} className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${mode === 'standard' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-night-800 border-night-700 text-violet-300'}`}>⚔️ Standard</button>
          <button onClick={() => setMode('skill')} className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${mode === 'skill' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-night-800 border-night-700 text-violet-300'}`}>🧠 Skill Battle</button>
        </div>

        {mode === 'skill' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-5">
            <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Your Battle Skill</div>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(SKILL_META).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setSkillCategory(key)}
                  className={`flex flex-col items-center py-2 rounded-xl border text-xs transition-all ${skillCategory === key ? 'bg-violet-900/60 border-violet-500 text-white' : 'bg-night-800 border-night-700 text-violet-300'}`}
                >
                  <span className="text-lg">{meta.emoji}</span>
                  <span className="text-[10px] mt-0.5">{meta.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Gold Wager</div>
        <div className="flex gap-2 mb-6">
          {WAGER.map(w => (
            <button
              key={w}
              onClick={() => setWager(w)}
              className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all ${wager === w ? 'bg-gold-600/30 border-gold-500 text-gold-300' : 'bg-night-800 border-night-700 text-violet-300'}`}
            >
              {w === 0 ? 'Free' : `🪙 ${w}`}
            </button>
          ))}
        </div>

        <Button fullWidth size="lg" onClick={handleStart}>
          ⚔️ Start Duel
        </Button>
      </PageShell>
      <BottomNav />
    </>
  )
}
