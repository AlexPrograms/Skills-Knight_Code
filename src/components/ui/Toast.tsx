import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react'
import { useAppStore } from '../../stores/appStore'

const icons = {
  success: <CheckCircle size={18} className="text-emerald-400" />,
  info: <Info size={18} className="text-blue-400" />,
  warning: <AlertTriangle size={18} className="text-gold-400" />,
  error: <XCircle size={18} className="text-rose-400" />,
}

const borders = {
  success: 'border-emerald-500/40',
  info: 'border-blue-500/40',
  warning: 'border-gold-500/40',
  error: 'border-rose-500/40',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore()
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            className={`pointer-events-auto flex items-center gap-3 bg-night-800 border ${borders[t.type]} rounded-xl px-4 py-3 shadow-xl min-w-[220px] max-w-xs`}
          >
            {icons[t.type]}
            <span className="text-sm text-white flex-1">{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="text-violet-400 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
