import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, Search, Swords } from 'lucide-react'
import { mockFriends, mockUser } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import CharacterAvatar from '../components/character/CharacterAvatar'

export default function FriendsPage() {
  const navigate = useNavigate()
  const { addToast } = useAppStore()
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'friends' | 'leaderboard'>('friends')

  const leaderboard = [
    { username: 'IronBuilder', level: 22, weeklyXp: 720, rank: 1 },
    { username: 'StarCoder', level: 18, weeklyXp: 540, rank: 2 },
    { username: mockUser.username, level: mockUser.level, weeklyXp: 380, rank: 3 },
    { username: 'PixelQueen', level: 16, weeklyXp: 310, rank: 4 },
    { username: 'NightRunner', level: 11, weeklyXp: 200, rank: 5 },
  ]

  return (
    <>
      <TopBar title="Friends & Rivals" back right={
        <button onClick={() => addToast('info', 'Friend request sent!')} className="text-violet-400 hover:text-white">
          <UserPlus size={20} />
        </button>
      } />
      <PageShell>
        <div className="flex gap-1 bg-night-800 rounded-2xl p-1 mb-5">
          <button onClick={() => setTab('friends')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${tab === 'friends' ? 'bg-violet-600 text-white' : 'text-violet-300'}`}>
            Friends ({mockFriends.length})
          </button>
          <button onClick={() => setTab('leaderboard')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${tab === 'leaderboard' ? 'bg-violet-600 text-white' : 'text-violet-300'}`}>
            Leaderboard
          </button>
        </div>

        {tab === 'friends' && (
          <>
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-night-600" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search friends…"
                className="w-full bg-night-800 border border-night-700 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-night-600 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="flex flex-col gap-3">
              {mockFriends.filter(f => f.username.toLowerCase().includes(search.toLowerCase())).map((f, i) => (
                <motion.div key={f.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Card>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <CharacterAvatar classType={f.characterClass} size="md" />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-night-800 ${f.isOnline ? 'bg-emerald-500' : 'bg-night-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{f.username}</span>
                          <Badge color="violet" size="xs">LVL {f.level}</Badge>
                        </div>
                        <div className="text-violet-300 text-xs">🔥 {f.streakCount}d · ⚡ {f.battlePower.toLocaleString()} BP</div>
                        <div className="text-night-600 text-xs">{f.winRecord.wins}W / {f.winRecord.losses}L</div>
                      </div>
                      <button
                        onClick={() => navigate('/battle/duel', { state: { opponent: f } })}
                        className="text-violet-400 hover:text-white transition-colors"
                      >
                        <Swords size={20} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'leaderboard' && (
          <div className="flex flex-col gap-2">
            <div className="text-xs text-violet-400 font-semibold mb-1 uppercase tracking-widest">Weekly XP Leaderboard</div>
            {leaderboard.map((entry, i) => {
              const isMe = entry.username === mockUser.username
              return (
                <motion.div key={entry.username} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Card className={isMe ? 'border-violet-500/50 bg-violet-900/10' : ''}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold ${entry.rank === 1 ? 'bg-gold-500 text-night-950' : entry.rank === 2 ? 'bg-slate-400 text-night-950' : entry.rank === 3 ? 'bg-orange-700 text-white' : 'bg-night-800 text-night-600'}`}>
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isMe ? 'text-violet-300' : 'text-white'}`}>{entry.username}</span>
                          {isMe && <Badge color="violet" size="xs">You</Badge>}
                        </div>
                        <div className="text-night-600 text-xs">LVL {entry.level}</div>
                      </div>
                      <div className="text-gold-400 font-bold">{entry.weeklyXp} XP</div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
