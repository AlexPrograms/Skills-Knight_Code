import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Flame, Zap, Trophy, Brain } from 'lucide-react'
import { SKILL_META } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import CharacterAvatar from '../components/character/CharacterAvatar'
import Badge from '../components/ui/Badge'

const effort_colors: Record<string, string> = {
  LIGHT: 'bg-emerald-500', MEDIUM: 'bg-violet-500', DEEP: 'bg-gold-500',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'just now'
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function Home() {
  const navigate = useNavigate()
  const { user, recentLogs, insights, quests } = useAppStore()
  const daily = quests.daily
  const insight = insights.find(i => !i.readAt)
  const xpCurrent = user.totalXp % user.xpToNextLevel

  return (
    <>
      <TopBar currency />

      <PageShell>
        {/* Hero card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card card-glow p-5 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <CharacterAvatar classType={user.characterClass} size="lg" animate />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="font-display text-xl text-white truncate">{user.username}</h2>
                <Badge color="gold" size="xs">LVL {user.level}</Badge>
              </div>
              <p className="text-violet-300 text-xs mb-2">{user.title} · {user.guildName}</p>
              <ProgressBar value={xpCurrent} max={user.xpToNextLevel} color="bg-gradient-to-r from-violet-600 to-violet-400" height="h-2.5" />
              <div className="flex justify-between text-xs text-violet-400 mt-1">
                <span>{xpCurrent.toLocaleString()} XP</span>
                <span>{user.xpToNextLevel.toLocaleString()} to next level</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Flame, label: 'Streak', value: `${user.streakCount}d`, color: 'text-orange-400' },
              { icon: Zap, label: 'BP', value: user.battlePower.toLocaleString(), color: 'text-gold-400' },
              { icon: Trophy, label: 'Wins', value: user.winRecord.wins, color: 'text-emerald-400' },
              { icon: Brain, label: 'Focus', value: user.stats.focus, color: 'text-blue-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex flex-col items-center bg-night-800 rounded-xl py-2 px-1">
                <Icon size={16} className={color} />
                <span className="text-white font-bold text-sm mt-0.5">{value}</span>
                <span className="text-night-600 text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily quest */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <Card className="mb-4 border-gold-700/30 cursor-pointer" onClick={() => navigate('/quests')}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 mr-2">
                <div className="text-[10px] text-gold-400 font-semibold uppercase tracking-widest mb-0.5">Daily Quest</div>
                <div className="text-white font-semibold text-sm">{daily.title}</div>
                <div className="text-violet-300 text-xs">{daily.description}</div>
              </div>
              <div className="text-right text-xs text-gold-300 font-bold flex-shrink-0">
                +{daily.rewardXp} XP<br />+{daily.rewardGold} 🪙
              </div>
            </div>
            <ProgressBar value={daily.currentCount} max={daily.targetCount} color="bg-gold-500" height="h-1.5" />
            <div className="text-[10px] text-violet-400 mt-1">{daily.currentCount}/{daily.targetCount} complete</div>
          </Card>
        </motion.div>

        {/* AI Insight */}
        {insight && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}>
            <Card className="mb-4 border-violet-700/40 cursor-pointer" onClick={() => navigate('/coach')}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧠</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-violet-400 font-semibold uppercase tracking-widest mb-0.5">Coach Insight</div>
                  <div className="text-white text-sm font-semibold">{insight.title}</div>
                  <p className="text-violet-300 text-xs mt-1 line-clamp-2">{insight.content}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent activity */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-white text-base">Recent Activity</h3>
            <button onClick={() => navigate('/skills')} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View all</button>
          </div>
          <div className="flex flex-col gap-2">
            {recentLogs.slice(0, 3).map((log, i) => {
              const meta = SKILL_META[log.skillCategory]
              return (
                <motion.div key={log.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + i * 0.06 }}>
                  <Card>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${meta?.bg ?? 'bg-violet-500/20'}`}>
                        {meta?.emoji ?? '⚡'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{log.subSkill}</span>
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${effort_colors[log.effortLevel]}`} />
                        </div>
                        <p className="text-violet-300 text-xs truncate">{log.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-gold-400 font-bold text-sm">+{log.pointsAwarded}</div>
                        <div className="text-night-600 text-[10px]">{timeAgo(log.loggedAt)}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Pomodoro Timer', emoji: '⏱️', path: '/pomodoro', color: 'border-orange-700/40' },
            { label: 'Daily Journal', emoji: '📔', path: '/journal', color: 'border-violet-700/40' },
            { label: 'Task Board', emoji: '📋', path: '/tasks', color: 'border-blue-700/40' },
            { label: 'Battle Arena', emoji: '⚔️', path: '/battle', color: 'border-rose-700/40' },
            { label: 'Guild', emoji: '🏰', path: '/guild', color: 'border-gold-700/40' },
            { label: 'Friends', emoji: '👥', path: '/friends', color: 'border-emerald-700/40' },
          ].map(({ label, emoji, path, color }) => (
            <motion.div key={path} whileTap={{ scale: 0.95 }}>
              <Card className={`${color} cursor-pointer`} onClick={() => navigate(path)}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-white font-semibold text-sm">{label}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </PageShell>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        onClick={() => navigate('/log')}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-violet-600 hover:bg-violet-500 rounded-full shadow-2xl shadow-violet-900/50 flex items-center justify-center border-2 border-violet-400/20"
        style={{ right: 'calc(50% - 215px + 16px)' }}
      >
        <Plus size={28} className="text-white" />
      </motion.button>

      <BottomNav />
    </>
  )
}
