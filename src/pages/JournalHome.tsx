import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function JournalHome() {
  const navigate = useNavigate()
  const { journalEntries } = useAppStore()

  return (
    <>
      <TopBar title="Daily Journal" back />
      <PageShell>
        <p className="text-violet-300 text-sm mb-5">
          Your adventure log — write daily to unlock the <span className="text-gold-400 font-bold">Lore Keeper</span> achievement.
        </p>

        <Button fullWidth onClick={() => navigate('/journal/write')} className="mb-5">
          <Plus size={18} /> Write today's entry
        </Button>

        <div className="flex flex-col gap-3">
          {journalEntries.map((entry, i) => (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card onClick={() => navigate('/journal/write', { state: { entry } })} className="cursor-pointer hover:border-violet-600/40">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{entry.mood}</span>
                    <span className="text-violet-300 text-sm">{formatDate(entry.date)}</span>
                  </div>
                  {entry.promptUsed && (
                    <span className="text-[10px] text-violet-500 bg-violet-900/40 rounded-lg px-2 py-1 max-w-[120px] text-right leading-tight">
                      {entry.promptUsed}
                    </span>
                  )}
                </div>
                <p className="text-white text-sm line-clamp-3">{entry.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mt-5 border-violet-700/30 cursor-pointer hover:border-violet-500/50" onClick={() => navigate('/journal/capsule')}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">⏳</span>
            <div>
              <div className="text-white font-semibold">Time Capsule</div>
              <div className="text-violet-300 text-xs">Write a message to your future self. Open in 30, 90, or 365 days.</div>
            </div>
          </div>
        </Card>
      </PageShell>
      <BottomNav />
    </>
  )
}
