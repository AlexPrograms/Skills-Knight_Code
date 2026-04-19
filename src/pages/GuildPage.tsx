import { motion } from 'framer-motion'
import { mockGuild, CLASS_META } from '../data/mockData'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'
import { useAppStore } from '../stores/appStore'

const RANK_COLORS: Record<string, 'gold' | 'violet' | 'blue'> = { Gold: 'gold', Silver: 'violet', Bronze: 'blue' }
const ROLE_COLORS: Record<string, 'gold' | 'violet' | 'emerald'> = { MASTER: 'gold', OFFICER: 'violet', MEMBER: 'emerald' }

export default function GuildPage() {
  const { addToast } = useAppStore()
  const boss = mockGuild.currentBoss
  const bossHpPct = (boss.currentHp / boss.maxHp) * 100

  return (
    <>
      <TopBar title={mockGuild.name} back />
      <PageShell>
        {/* Guild header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="card-glow mb-5 text-center">
            <div className="text-5xl mb-2">🏰</div>
            <h2 className="font-display text-2xl text-white">{mockGuild.name}</h2>
            <div className="flex justify-center mt-2">
              <Badge color={RANK_COLORS[mockGuild.rank] ?? 'violet'}>{mockGuild.rank} Rank</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div><div className="text-gold-400 font-display text-xl">{mockGuild.memberCount}</div><div className="text-night-600 text-xs">Members</div></div>
              <div><div className="text-violet-400 font-display text-xl">{(mockGuild.guildPower / 1000).toFixed(1)}K</div><div className="text-night-600 text-xs">Guild Power</div></div>
              <div><div className="text-emerald-400 font-display text-xl">{mockGuild.weeklyLogs}</div><div className="text-night-600 text-xs">Weekly Logs</div></div>
            </div>
          </Card>
        </motion.div>

        {/* Boss raid */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-rose-700/30 mb-5">
            <div className="text-[10px] text-rose-400 font-semibold uppercase tracking-widest mb-2">Guild Boss Active</div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">👹</span>
              <div className="flex-1">
                <div className="text-white font-bold">{boss.name}</div>
                <div className="text-violet-300 text-xs">Time left: {boss.timeLeft}</div>
              </div>
              <div className="text-rose-400 font-bold">{boss.currentHp}/{boss.maxHp} HP</div>
            </div>
            <ProgressBar value={boss.currentHp} max={boss.maxHp} color="bg-rose-500" height="h-3" />
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-violet-300">{Math.round(100 - bossHpPct)}% defeated</div>
              <Button size="sm" variant="danger" onClick={() => addToast('success', 'You dealt 45 damage! 💥')}>
                Attack! 💥
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Members */}
        <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">
          Members ({mockGuild.memberCount}/{mockGuild.maxMembers})
        </div>
        <div className="flex flex-col gap-2">
          {mockGuild.members.map((m, i) => (
            <motion.div key={m.username} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-night-800 flex items-center justify-center text-xl">
                    {CLASS_META[m.characterClass]?.emoji ?? '⚔️'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{m.username}</span>
                      <Badge color={ROLE_COLORS[m.role] ?? 'violet'} size="xs">{m.role}</Badge>
                    </div>
                    <div className="text-night-600 text-xs">LVL {m.level} · {CLASS_META[m.characterClass]?.label}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold-400 font-bold text-sm">{m.weeklyContribution}</div>
                    <div className="text-night-600 text-[10px]">this week</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button fullWidth variant="secondary" className="mt-5" onClick={() => addToast('info', 'Invite link copied!')}>
          + Invite Members
        </Button>
      </PageShell>
      <BottomNav />
    </>
  )
}
