import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

type Tab = 'daily' | 'weekly' | 'milestone'

export default function Quests() {
  const [tab, setTab] = useState<Tab>('daily')
  const { addToast, showXp, addGold, quests } = useAppStore()

  const claimDaily = () => {
    showXp(quests.daily.rewardXp)
    addGold(quests.daily.rewardGold)
    addToast('success', `Daily quest claimed! +${quests.daily.rewardXp} XP 🎉`)
  }

  return (
    <>
      <TopBar title="Quests" back />
      <PageShell>
        <div className="flex gap-1 bg-night-800 rounded-2xl p-1 mb-5">
          {(['daily', 'weekly', 'milestone'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${tab === t ? 'bg-violet-600 text-white' : 'text-violet-300 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'daily' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-gold-700/40 card-glow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-3">
                  <div className="text-[10px] text-gold-400 font-semibold uppercase tracking-widest mb-1">Daily Quest</div>
                  <div className="text-white font-bold text-base">{quests.daily.title}</div>
                  <div className="text-violet-300 text-sm mt-0.5">{quests.daily.description}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-gold-300 font-bold">+{quests.daily.rewardXp} XP</div>
                  <div className="text-gold-400 text-sm">+{quests.daily.rewardGold} 🪙</div>
                </div>
              </div>
              <ProgressBar value={quests.daily.currentCount} max={quests.daily.targetCount} color="bg-gold-500" height="h-2" className="mb-2" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-400">{quests.daily.currentCount}/{quests.daily.targetCount}</span>
                {quests.daily.currentCount >= quests.daily.targetCount ? (
                  <Button size="sm" variant="gold" onClick={claimDaily}>Claim!</Button>
                ) : (
                  <span className="text-xs text-night-600">Resets at midnight</span>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'weekly' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
            {quests.weekly.map((q, i) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 mr-3">
                      <div className="text-white font-bold">{q.title}</div>
                      <div className="text-violet-300 text-xs mt-0.5">{q.description}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-gold-300 font-bold text-sm">+{q.rewardXp} XP</div>
                      {'rewardItem' in q && q.rewardItem && <Badge color="gold" size="xs">{q.rewardItem as string}</Badge>}
                    </div>
                  </div>
                  <ProgressBar value={q.currentCount} max={q.targetCount} color="bg-violet-500" height="h-1.5" className="mb-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-violet-400">{q.currentCount}/{q.targetCount}</span>
                    <span className="text-night-600">Resets Sunday</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === 'milestone' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
            {quests.milestones.map((q, i) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Card className={q.completed ? 'opacity-70' : ''}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 mr-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="text-white font-bold">{q.title}</div>
                        {q.completed && <Badge color="gold" size="xs">✓ Done</Badge>}
                      </div>
                      <div className="text-violet-300 text-xs mt-0.5">{q.description}</div>
                    </div>
                    <Badge color="gold" size="xs">{q.rewardItem}</Badge>
                  </div>
                  {!q.completed && (
                    <>
                      <ProgressBar value={q.currentCount} max={q.targetCount} color="bg-gold-500" height="h-1.5" className="mb-1" />
                      <span className="text-xs text-violet-400">{q.currentCount}/{q.targetCount}</span>
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
