import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mockUser, mockBattleHistory, CLASS_META } from '../data/mockData'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import CharacterAvatar from '../components/character/CharacterAvatar'

export default function BattleHub() {
  const navigate = useNavigate()

  return (
    <>
      <TopBar title="Battle Arena" back />
      <PageShell>
        {/* My battle card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="card-glow mb-5">
            <div className="flex items-center gap-4">
              <CharacterAvatar classType={mockUser.characterClass} size="lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-display text-lg">{mockUser.username}</span>
                  <Badge color="violet" size="xs">LVL {mockUser.level}</Badge>
                </div>
                <div className="text-gold-400 font-display text-2xl">{mockUser.battlePower.toLocaleString()} BP</div>
                <div className="text-violet-300 text-xs">{mockUser.winRecord.wins}W / {mockUser.winRecord.losses}L</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Battle modes */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { title: 'Quick Duel', desc: 'Random opponent near your rank', emoji: '⚔️', path: '/battle/duel', color: 'border-violet-700/40' },
            { title: 'Skill Battle', desc: 'Win with your top skill category', emoji: '🧠', path: '/battle/duel', color: 'border-blue-700/40' },
            { title: 'Guild War', desc: 'Team fight — top guild wins', emoji: '🏰', path: '/guild', color: 'border-gold-700/40' },
            { title: 'Boss Raid', desc: 'Guild vs The Procrastination Demon', emoji: '👹', path: '/guild', color: 'border-rose-700/40' },
          ].map(({ title, desc, emoji, path, color }) => (
            <Card key={title} className={`cursor-pointer ${color} hover:border-opacity-80`} onClick={() => navigate(path)}>
              <div className="text-2xl mb-2">{emoji}</div>
              <div className="text-white font-semibold text-sm">{title}</div>
              <div className="text-night-600 text-xs mt-0.5">{desc}</div>
            </Card>
          ))}
        </div>

        {/* Battle history */}
        <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Recent Battles</div>
        <div className="flex flex-col gap-2">
          {mockBattleHistory.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
              <Card>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display text-sm font-bold ${b.result === 'WIN' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/40' : 'bg-rose-900/50 text-rose-400 border border-rose-700/40'}`}>
                    {b.result}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{b.opponent}</div>
                    <div className="text-violet-300 text-xs">{b.myBP.toLocaleString()} vs {b.oppBP.toLocaleString()} BP</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold-400 font-bold text-sm">+{b.goldEarned} 🪙</div>
                    <div className="text-night-600 text-[10px]">{b.date}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button fullWidth size="lg" onClick={() => navigate('/battle/duel')} className="mt-5">
          ⚔️ Start a Duel
        </Button>
      </PageShell>
      <BottomNav />
    </>
  )
}
