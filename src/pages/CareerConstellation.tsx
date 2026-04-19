import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mockCareerConstellation, SKILL_META } from '../data/mockData'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'

export default function CareerConstellation() {
  const [selected, setSelected] = useState<typeof mockCareerConstellation[0] | null>(null)

  return (
    <>
      <TopBar title="Career Constellation" back />
      <PageShell nopad className="pb-28">
        <div className="px-4 pt-4">
          <p className="text-violet-300 text-sm mb-4">Stars brighten as your skills align. Tap a star to explore that career path.</p>
        </div>

        {/* Star map */}
        <div className="relative mx-4 rounded-2xl overflow-hidden bg-night-950 border border-night-800" style={{ height: 320 }}>
          {/* bg stars */}
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}

          {mockCareerConstellation.map(star => {
            const isSelected = selected?.id === star.id
            const size = 8 + star.brightness * 20
            return (
              <motion.button
                key={star.id}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelected(isSelected ? null : star)}
              >
                <motion.div
                  className="rounded-full"
                  style={{
                    width: size, height: size,
                    background: `rgba(167, 139, 250, ${star.brightness})`,
                    boxShadow: `0 0 ${size * 1.5}px rgba(167, 139, 250, ${star.brightness * 0.6})`,
                  }}
                  animate={isSelected ? { scale: [1, 1.3, 1] } : { scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
                <div className="absolute top-full mt-1 text-[9px] text-violet-300 whitespace-nowrap font-semibold"
                  style={{ opacity: star.brightness }}>
                  {star.name.split(' ')[0]}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Detail panel */}
        <div className="px-4 mt-4">
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
              >
                <Card className="card-glow border-violet-600/40">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-lg text-white">{selected.name}</h3>
                    <div className="text-xs text-violet-400">{Math.round(selected.brightness * 100)}% aligned</div>
                  </div>
                  <p className="text-violet-300 text-sm mb-3">{selected.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.skills.map(s => {
                      const key = s.toUpperCase() as keyof typeof SKILL_META
                      const meta = SKILL_META[key]
                      return (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-xl bg-violet-900/40 text-violet-300 border border-violet-700/40">
                          {meta?.emoji ?? '⚡'} {s}
                        </span>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {!selected && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {mockCareerConstellation.slice(0, 4).map(star => (
                <Card key={star.id} onClick={() => setSelected(star)} className="cursor-pointer">
                  <div className="text-white font-semibold text-sm">{star.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-night-800 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${star.brightness * 100}%` }} />
                    </div>
                    <span className="text-violet-300 text-xs">{Math.round(star.brightness * 100)}%</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </PageShell>
      <BottomNav />
    </>
  )
}
