import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { mockUser } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import CharacterAvatar from '../components/character/CharacterAvatar'

type Phase = 'intro' | 'fight' | 'result'

export default function BattleAnimation() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: { opponent: { username: string; battlePower: number; characterClass: string; level: number } | null; wager: number } | null }
  const opp = state?.opponent ?? { username: 'StarCoder', battlePower: 2180, characterClass: 'WIZARD', level: 18 }
  const wager = state?.wager ?? 50

  const { addGold, addToast, showXp } = useAppStore(s => ({
    addGold: s.addGold, addToast: s.addToast, showXp: s.showXp,
  }))
  const [phase, setPhase] = useState<Phase>('intro')
  const [myHp, setMyHp] = useState(100)
  const [oppHp, setOppHp] = useState(100)
  const [log, setLog] = useState<string[]>([])
  const playerWins = mockUser.battlePower >= opp.battlePower * 0.85

  useEffect(() => {
    if (phase === 'intro') {
      const t = setTimeout(() => setPhase('fight'), 2000)
      return () => clearTimeout(t)
    }
    if (phase === 'fight') {
      const turns = [
        { text: `⚔️ ${mockUser.username} strikes for 24 damage!`, oppHp: 76, myHp: 100, delay: 400 },
        { text: `🧙 ${opp.username} counters for 18 damage!`, oppHp: 76, myHp: 82, delay: 1200 },
        { text: `⚔️ ${mockUser.username} unleashes ${playerWins ? 'a devastating blow' : 'a wild swing'}! ${playerWins ? '−35' : '−15'} HP!`, oppHp: playerWins ? 41 : 61, myHp: 82, delay: 2200 },
        { text: `🧙 ${opp.username} ${playerWins ? 'stumbles' : 'retaliates hard'}! ${playerWins ? '−10' : '−40'} HP!`, oppHp: playerWins ? 41 : 61, myHp: playerWins ? 72 : 42, delay: 3200 },
        { text: playerWins ? `💥 FINAL BLOW — ${mockUser.username} wins!` : `💥 ${opp.username} lands the killing strike!`, oppHp: playerWins ? 0 : 61, myHp: playerWins ? 72 : 0, delay: 4400 },
      ]
      turns.forEach(({ text, oppHp, myHp, delay }) => {
        setTimeout(() => {
          setLog(l => [...l, text])
          setMyHp(myHp)
          setOppHp(oppHp)
        }, delay)
      })
      const t = setTimeout(() => setPhase('result'), 5600)
      return () => clearTimeout(t)
    }
    if (phase === 'result' && playerWins) {
      addGold(wager + 50)
      showXp(40)
      addToast('success', `Victory! +${wager + 50} 🪙 +40 XP`)
    }
  }, [phase])

  return (
    <div className="min-h-screen bg-night-950 flex flex-col">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro" className="flex-1 flex flex-col items-center justify-center gap-6 px-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="font-display text-3xl text-white text-center" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              ⚔️ DUEL STARTING ⚔️
            </motion.div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <CharacterAvatar classType={mockUser.characterClass} size="xl" animate />
                <span className="text-white font-display mt-2">{mockUser.username}</span>
                <span className="text-gold-400 text-sm">{mockUser.battlePower} BP</span>
              </div>
              <div className="font-display text-4xl text-rose-500">VS</div>
              <div className="flex flex-col items-center">
                <CharacterAvatar classType={opp.characterClass} size="xl" animate />
                <span className="text-white font-display mt-2">{opp.username}</span>
                <span className="text-gold-400 text-sm">{opp.battlePower} BP</span>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'fight' && (
          <motion.div key="fight" className="flex-1 flex flex-col px-4 pt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-end gap-4 mb-6">
              <div className="flex-1">
                <div className="text-xs text-violet-300 mb-1">{mockUser.username}</div>
                <div className="h-3 bg-night-800 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-emerald-500 rounded-full" animate={{ width: `${myHp}%` }} />
                </div>
              </div>
              <div className="text-white font-display text-sm">VS</div>
              <div className="flex-1">
                <div className="text-xs text-violet-300 mb-1 text-right">{opp.username}</div>
                <div className="h-3 bg-night-800 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-rose-500 rounded-full" animate={{ width: `${oppHp}%` }} />
                </div>
              </div>
            </div>

            <div className="flex justify-around mb-6">
              <motion.div animate={{ x: phase === 'fight' ? [0, 20, 0] : 0 }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <CharacterAvatar classType={mockUser.characterClass} size="xl" />
              </motion.div>
              <motion.div animate={{ x: phase === 'fight' ? [0, -20, 0] : 0 }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>
                <CharacterAvatar classType={opp.characterClass} size="xl" />
              </motion.div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {log.map((entry, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="text-violet-300 text-sm py-1.5 border-b border-night-800">
                  {entry}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div key="result" className="flex-1 flex flex-col items-center justify-center px-6 gap-6"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <motion.div className="text-7xl" animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: 2, duration: 0.4 }}>
              {playerWins ? '🏆' : '💀'}
            </motion.div>
            <div className={`font-display text-4xl ${playerWins ? 'text-gold-400' : 'text-rose-400'}`}>
              {playerWins ? 'VICTORY!' : 'DEFEAT'}
            </div>
            <div className="card p-4 w-full max-w-xs text-center">
              {playerWins ? (
                <>
                  <div className="text-emerald-400 font-bold">+{wager + 50} 🪙 Gold</div>
                  <div className="text-violet-300 text-sm">+40 XP • Win streak continues</div>
                </>
              ) : (
                <>
                  <div className="text-rose-400 font-bold">−{wager} 🪙 Gold lost</div>
                  <div className="text-violet-300 text-sm">+10 XP for fighting</div>
                </>
              )}
            </div>
            <div className="flex gap-3 w-full max-w-xs">
              <button onClick={() => navigate('/battle/duel')} className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-semibold">Rematch</button>
              <button onClick={() => navigate('/battle')} className="flex-1 bg-night-800 text-violet-300 py-3 rounded-xl font-semibold">Exit</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
