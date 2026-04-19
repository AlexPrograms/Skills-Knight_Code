import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts'
import { SKILL_META } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const SKILL_COLORS: Record<string, string> = {
  TECHNOLOGY: '#a78bfa', SCIENCE: '#22d3ee', CREATIVE: '#f472b6',
  SPORT: '#facc15', LANGUAGES: '#34d399', HUMANITIES: '#fb923c',
  SOCIAL: '#60a5fa', PRACTICAL: '#a3e635',
}

export default function SkillsDashboard() {
  const navigate = useNavigate()
  const { skillStats, user } = useAppStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'details'>('overview')

  const radarData = skillStats.map(s => ({
    category: (SKILL_META[s.category]?.emoji ?? '') + ' ' + (SKILL_META[s.category]?.label ?? s.category),
    value: Math.min(100, Math.round((s.totalPoints / 1500) * 100)),
  }))

  return (
    <>
      <TopBar title="Skills Dashboard" back />
      <PageShell>
        <div className="flex gap-1 bg-night-800 rounded-2xl p-1 mb-5">
          {(['overview', 'stats', 'details'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-violet-300 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <Card className="mb-5">
              <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Skill Radar</div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#252242" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#c4b5fd', fontSize: 10 }} />
                  <Radar dataKey="value" fill="#a78bfa" fillOpacity={0.3} stroke="#a78bfa" strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Cogsworth card → Coach */}
            <Card className="mb-5 border-violet-700/30 cursor-pointer hover:border-violet-500/50" onClick={() => navigate('/coach')}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                <div>
                  <div className="text-white font-semibold">AI Coach Analysis</div>
                  <div className="text-violet-300 text-xs">See what your skill data says about you →</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {skillStats.slice(0, 6).map((s, i) => {
                const meta = SKILL_META[s.category]
                return (
                  <motion.div key={s.category} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{meta?.emoji}</span>
                        <span className="text-white font-semibold text-xs">{meta?.label}</span>
                      </div>
                      <div className="text-gold-400 font-display text-xl">{s.totalPoints.toLocaleString()}</div>
                      <div className="text-night-600 text-[10px]">{s.logCount} sessions</div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <Card className="mb-5">
              <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Points by Category</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={skillStats} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <XAxis dataKey="category" tick={{ fill: '#c4b5fd', fontSize: 9 }} tickFormatter={v => SKILL_META[v]?.emoji ?? v} />
                  <Tooltip
                    contentStyle={{ background: '#1c1935', border: '1px solid #252242', borderRadius: 8, color: '#fff', fontSize: 12 }}
                    labelFormatter={v => SKILL_META[v as string]?.label ?? v}
                    formatter={(val) => [`${val} pts`, 'Points']}
                  />
                  <Bar dataKey="totalPoints" radius={[4, 4, 0, 0]}>
                    {skillStats.map(s => <Cell key={s.category} fill={SKILL_COLORS[s.category] ?? '#a78bfa'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Character Stats</div>
              <div className="flex flex-col gap-3">
                {Object.entries(user.stats).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="text-violet-300 text-sm w-24 capitalize">{name}</span>
                    <div className="flex-1 h-2 bg-night-800 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-violet-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }} />
                    </div>
                    <span className="text-white font-bold text-sm w-8 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'details' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col gap-4">
              {skillStats.map((s, i) => {
                const meta = SKILL_META[s.category]
                return (
                  <motion.div key={s.category} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{meta?.emoji}</span>
                          <div>
                            <div className="text-white font-bold">{meta?.label}</div>
                            <div className="text-night-600 text-xs">{s.logCount} sessions</div>
                          </div>
                        </div>
                        <div className="text-gold-400 font-display text-lg">{s.totalPoints.toLocaleString()}</div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.subSkills.map(sub => (
                          <Badge key={sub.name} color="violet" size="xs">{sub.name} · {sub.points}</Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
