import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Map, Plus, BarChart2, User } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'Quests', icon: Map, path: '/quests' },
  { label: 'Log', icon: Plus, path: '/log', fab: true },
  { label: 'Skills', icon: BarChart2, path: '/skills' },
  { label: 'Profile', icon: User, path: '/profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-night-900/95 backdrop-blur border-t border-night-700 safe-bottom" style={{ height: 72 }}>
      <div className="flex items-stretch h-full">
        {tabs.map(({ label, icon: Icon, path, fab }) => {
          const active = pathname === path || pathname.startsWith(path + '/')
          if (fab) {
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className="w-13 h-13 w-[52px] h-[52px] -mt-5 rounded-full bg-violet-600 border-4 border-night-950 flex items-center justify-center shadow-xl shadow-violet-900/40"
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
                <span className="text-[10px] font-semibold text-violet-300 mt-0.5">{label}</span>
              </button>
            )
          }
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-violet-500"
                />
              )}
              <Icon size={22} className={active ? 'text-violet-400' : 'text-night-600'} />
              <span className={`text-[10px] font-semibold ${active ? 'text-violet-300' : 'text-night-600'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
