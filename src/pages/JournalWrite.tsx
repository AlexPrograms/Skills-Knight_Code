import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Button from '../components/ui/Button'

const MOODS = ['😴', '😐', '🙂', '😄', '🚀']
const PROMPTS = [
  'What felt hard today?',
  'What made today worth logging?',
  'What did you learn that surprised you?',
  'How did you show up for yourself today?',
  "What's one thing you'll do differently tomorrow?",
]

export default function JournalWrite() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: { entry?: Record<string, string> } | null }
  const { addJournalEntry } = useAppStore()

  const [mood, setMood] = useState(state?.entry?.mood ?? '😄')
  const [content, setContent] = useState(state?.entry?.content ?? '')
  const [prompt, setPrompt] = useState(state?.entry?.promptUsed ?? '')

  const handleSave = () => {
    addJournalEntry({
      date: new Date().toISOString().split('T')[0],
      mood,
      content,
      promptUsed: prompt || null,
    })
    navigate('/journal')
  }

  return (
    <>
      <TopBar title="Today's Entry" back />
      <PageShell>
        <div className="mb-5">
          <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">How are you feeling?</div>
          <div className="flex gap-3">
            {MOODS.map(m => (
              <motion.button
                key={m}
                whileTap={{ scale: 0.8 }}
                onClick={() => setMood(m)}
                className={`text-3xl p-2 rounded-xl transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${mood === m ? 'bg-violet-900/60 ring-2 ring-violet-500' : 'hover:bg-night-800'}`}
              >
                {m}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Writing Prompt (optional)</div>
          <div className="flex flex-wrap gap-2 mb-3">
            {PROMPTS.map(p => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPrompt(prompt === p ? '' : p)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${prompt === p ? 'bg-violet-600 border-violet-500 text-white' : 'bg-night-800 border-night-700 text-violet-300 hover:border-violet-600'}`}
              >
                {p}
              </motion.button>
            ))}
          </div>
          {prompt && <div className="text-violet-300 text-sm italic mb-2">"{prompt}"</div>}
        </div>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write what happened today, what you learned, how you felt…"
          rows={9}
          className="w-full bg-night-800 border border-night-700 rounded-xl px-4 py-3 text-white placeholder-night-600 focus:outline-none focus:border-violet-500 text-sm resize-none mb-5"
        />

        <div className="flex gap-3">
          <Button fullWidth onClick={handleSave} disabled={content.length < 10}>
            Save Entry ✨
          </Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/journal')}>Cancel</Button>
        </div>
        {content.length > 0 && content.length < 10 && (
          <p className="text-xs text-rose-400 mt-2 text-center">Write at least 10 characters to save</p>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
