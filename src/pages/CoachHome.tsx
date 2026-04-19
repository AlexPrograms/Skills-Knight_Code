import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { mockInsights } from '../data/mockData'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const INSIGHT_TYPE_META: Record<string, { emoji: string; label: string; color: 'violet' | 'gold' | 'blue' | 'rose' }> = {
  WEEKLY_SUMMARY:     { emoji: '📊', label: 'Weekly Review', color: 'violet' },
  STRENGTH_IDENTIFIED:{ emoji: '💪', label: 'Strength Found', color: 'gold' },
  INTEREST_ALERT:     { emoji: '🔥', label: 'On Fire!', color: 'rose' },
  CAREER_SUGGESTION:  { emoji: '🌟', label: 'Career Path', color: 'blue' },
}

export default function CoachHome() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <>
      <TopBar title="AI Coach" back />
      <PageShell>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="text-5xl mb-3">🧠</div>
          <h2 className="font-display text-xl text-white">Your personal AI Coach</h2>
          <p className="text-violet-300 text-sm mt-1">Insights powered by your real learning data. No fluff — just signal.</p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {mockInsights.map((insight, i) => {
            const meta = INSIGHT_TYPE_META[insight.insightType]
            const isExpanded = expanded === insight.id
            return (
              <motion.div key={insight.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Card
                  onClick={() => setExpanded(isExpanded ? null : insight.id)}
                  className={`cursor-pointer transition-all ${!insight.readAt ? 'border-violet-600/40' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{meta?.emoji ?? '💡'}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge color={meta?.color ?? 'violet'} size="xs">{meta?.label ?? insight.insightType}</Badge>
                        {!insight.readAt && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                      </div>
                      <div className="text-white font-semibold text-sm">{insight.title}</div>
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-violet-300 text-sm mt-2 leading-relaxed">{insight.content}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[10px] text-night-600">{insight.aiSource === 'CLAUDE_API' ? '⚡ Claude AI' : '🏠 Local AI'}</span>
                          <span className="text-[10px] text-night-600">{new Date(insight.generatedAt).toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                      {!isExpanded && <p className="text-violet-300 text-xs mt-1 line-clamp-1">{insight.content}</p>}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <Card className="mt-5 border-violet-700/30">
          <div className="text-xs text-violet-400 font-semibold mb-2 uppercase tracking-widest">Career Constellation</div>
          <p className="text-violet-300 text-sm mb-3">See which careers your skills are pointing toward — visualized as a star map.</p>
          <button
            onClick={() => navigate('/coach/constellation')}
            className="w-full bg-violet-900/50 text-violet-300 hover:text-white border border-violet-700/40 rounded-xl py-3 text-sm font-semibold transition-all hover:border-violet-500"
          >
            View Career Constellation 🌌
          </button>
        </Card>
      </PageShell>
      <BottomNav />
    </>
  )
}
