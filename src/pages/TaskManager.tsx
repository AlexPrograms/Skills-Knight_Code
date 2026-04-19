import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Trash2 } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'

interface Task { id: string; text: string; done: boolean; xp: number; priority: 'low' | 'medium' | 'high' }

const seed: Task[] = [
  { id: '1', text: 'Finish Python web scraper', done: false, xp: 30, priority: 'high' },
  { id: '2', text: '5km morning run', done: true, xp: 20, priority: 'medium' },
  { id: '3', text: 'Review physics notes', done: false, xp: 15, priority: 'medium' },
  { id: '4', text: 'Duolingo Spanish session', done: false, xp: 10, priority: 'low' },
]

const priorityColors = { high: 'bg-rose-500', medium: 'bg-gold-500', low: 'bg-emerald-500' }
const priorityXp = { high: 30, medium: 15, low: 10 }

export default function TaskManager() {
  const { addToast, showXp } = useAppStore()
  const [tasks, setTasks] = useState<Task[]>(seed)
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const addTask = () => {
    if (!input.trim()) return
    setTasks(p => [...p, { id: Date.now().toString(), text: input.trim(), done: false, xp: priorityXp[priority], priority }])
    setInput('')
  }

  const toggle = (id: string) => {
    setTasks(p => p.map(t => {
      if (t.id !== id) return t
      if (!t.done) { showXp(t.xp); addToast('success', `Task done! +${t.xp} XP ✓`) }
      return { ...t, done: !t.done }
    }))
  }

  const remove = (id: string) => setTasks(p => p.filter(t => t.id !== id))

  const pending = tasks.filter(t => !t.done)
  const done = tasks.filter(t => t.done)

  return (
    <>
      <TopBar title="Task Board" back />
      <PageShell>
        {/* Add task */}
        <div className="flex gap-2 mb-5">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a task…"
            className="flex-1 bg-night-800 border border-night-700 rounded-xl px-4 py-3 text-white placeholder-night-600 focus:outline-none focus:border-violet-500 text-sm"
          />
          <div className="flex gap-1 items-center">
            {(['low', 'medium', 'high'] as const).map(p => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.8 }}
                onClick={() => setPriority(p)}
                className={`w-3 h-8 rounded-full transition-all ${priorityColors[p]} ${priority === p ? 'opacity-100 scale-110' : 'opacity-30'}`}
              />
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={addTask}
            className="bg-violet-600 text-white rounded-xl w-11 h-11 flex items-center justify-center hover:bg-violet-500 flex-shrink-0"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        {/* Stats bar */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 card p-3 text-center">
            <div className="text-gold-400 font-display text-xl">{pending.length}</div>
            <div className="text-night-600 text-xs">Active</div>
          </div>
          <div className="flex-1 card p-3 text-center">
            <div className="text-emerald-400 font-display text-xl">{done.length}</div>
            <div className="text-night-600 text-xs">Done</div>
          </div>
          <div className="flex-1 card p-3 text-center">
            <div className="text-violet-400 font-display text-xl">{done.reduce((s, t) => s + t.xp, 0)}</div>
            <div className="text-night-600 text-xs">XP earned</div>
          </div>
        </div>

        {pending.length > 0 && (
          <div className="mb-5">
            <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Active ({pending.length})</div>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {pending.map(task => (
                  <motion.div key={task.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 60, scale: 0.8 }}>
                    <Card>
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggle(task.id)}
                          className="w-6 h-6 rounded-full border-2 border-violet-500 flex items-center justify-center hover:bg-violet-500 transition-all flex-shrink-0"
                        />
                        <div className={`w-1.5 h-1.5 rounded-full ${priorityColors[task.priority]} flex-shrink-0`} />
                        <span className="text-white text-sm flex-1">{task.text}</span>
                        <span className="text-gold-400 text-xs font-bold">+{task.xp} XP</span>
                        <motion.button whileTap={{ scale: 0.8 }} onClick={() => remove(task.id)} className="text-night-600 hover:text-rose-400 transition-colors min-w-[32px] flex justify-center">
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {done.length > 0 && (
          <div>
            <div className="text-xs text-violet-400 font-semibold mb-3 uppercase tracking-widest">Completed ({done.length})</div>
            <div className="flex flex-col gap-2">
              {done.map(task => (
                <Card key={task.id} className="opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-white text-sm line-through flex-1">{task.text}</span>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => remove(task.id)} className="text-night-600 hover:text-rose-400 transition-colors min-w-[32px] flex justify-center">
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center text-violet-300 mt-16">
            <div className="text-5xl mb-4">📋</div>
            <p className="font-display text-xl text-white mb-2">Quest board is empty</p>
            <p className="text-sm">Add a task above to start earning XP!</p>
          </div>
        )}
      </PageShell>
      <BottomNav />
    </>
  )
}
