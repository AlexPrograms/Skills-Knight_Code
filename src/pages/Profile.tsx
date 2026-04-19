import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Settings, Share2 } from 'lucide-react'
import { CLASS_META } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import XpBar from '../components/character/XpBar'
import StatBar from '../components/character/StatBar'
import CharacterAvatar from '../components/character/CharacterAvatar'

const statColors: Record<string, string> = {
  strength: 'bg-rose-500', intelligence: 'bg-blue-500', focus: 'bg-violet-500',
  creativity: 'bg-pink-500', charisma: 'bg-gold-500', endurance: 'bg-emerald-500', luck: 'bg-orange-400',
}

const quickLinks = [
  { label: 'Skills', emoji: '📊', path: '/skills' },
  { label: 'AI Coach', emoji: '🧠', path: '/coach' },
  { label: 'Journal', emoji: '📔', path: '/journal' },
  { label: 'Tasks', emoji: '📋', path: '/tasks' },
  { label: 'Pomodoro', emoji: '⏱️', path: '/pomodoro' },
  { label: 'Shop', emoji: '⚔️', path: '/shop' },
  { label: 'Battle', emoji: '🥊', path: '/battle' },
  { label: 'Friends', emoji: '👥', path: '/friends' },
  { label: 'Guild', emoji: '🏰', path: '/guild' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { user, achievements, addToast } = useAppStore()
  const [tab, setTab] = useState<'stats' | 'achievements' | 'links'>('stats')

  const earned = achievements.filter(a => a.earned)
  const locked = achievements.filter(a => !a.earned)

  return (
    <>
      <TopBar
        title="Profile"
        right={
          <div className="flex gap-3">
            <button onClick={() => addToast('info', 'Profile link copied!')} className="text-violet-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Share2 size={20} />
            </button>
            <button onClick={() => addToast('info', 'Settings coming soon')} className="text-violet-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Settings size={20} />
            </button>
          </div>
        }
      />
      <PageShell>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="card-glow mb-5">
            <div className="flex items-center gap-4 mb-4">
              <CharacterAvatar classType={user.characterClass} size="xl" animate />
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-2xl text-white truncate">{user.username}</h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge color="gold" size="xs">{user.title}</Badge>
                  <Badge color="violet" size="xs">{CLASS_META[user.characterClass]?.label}</Badge>
                </div>
                <div className="text-violet-300 text-xs mt-1">{user.guildName} · {user.winRecord.wins}W {user.winRecord.losses}L</div>
              </div>
            </div>
            <XpBar xp={user.totalXp} xpToNext={user.xpToNextLevel} level={user.level} />
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div>
                <div className="font-display text-xl text-gold-400">{user.level}</div>
                <div className="text-night-600 text-xs">Level</div>
              </div>
              <div>
                <motion.div
                  className="font-display text-xl text-orange-400"
                  animate={user.streakCount >= 7 ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🔥 {user.streakCount}d
                </motion.div>
                <div className="text-night-600 text-xs">Streak</div>
              </div>
              <div>
                <div className="font-display text-xl text-violet-400">{user.battlePower.toLocaleString()}</div>
                <div className="text-night-600 text-xs">Battle Power</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-night-800 rounded-2xl p-1 mb-5">
          {(['stats', 'achievements', 'links'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${tab === t ? 'bg-violet-600 text-white' : 'text-violet-300 hover:text-white'}`}
            >
              {t === 'links' ? 'Quick Links' : t}
            </button>
          ))}
        </div>

        {tab === 'stats' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <Card>
              <div className="text-xs text-violet-400 font-semibold mb-4 uppercase tracking-widest">Character Stats</div>
              <div className="flex flex-col gap-4">
                {Object.entries(user.stats).map(([k, v]) => (
                  <StatBar key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={v} color={statColors[k] ?? 'bg-violet-500'} />
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'achievements' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Earned ({earned.length})</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {earned.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04, type: 'spring', stiffness: 400 }}>
                  <Card className="text-center">
                    <div className="text-3xl mb-1">{a.icon}</div>
                    <div className="text-white text-xs font-semibold leading-tight">{a.name}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Locked ({locked.length})</div>
            <div className="grid grid-cols-3 gap-3">
              {locked.map(a => (
                <Card key={a.id} className="text-center opacity-40">
                  <div className="text-3xl mb-1">{a.icon}</div>
                  <div className="text-night-600 text-xs font-semibold leading-tight">{a.name}</div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'links' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className="grid grid-cols-3 gap-3">
              {quickLinks.map(({ label, emoji, path }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Card className="cursor-pointer text-center hover:border-violet-600/40" onClick={() => navigate(path)}>
                    <div className="text-3xl mb-1">{emoji}</div>
                    <div className="text-white text-xs font-semibold">{label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
