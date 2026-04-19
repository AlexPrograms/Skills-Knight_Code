import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import CurrencyDisplay from '../ui/CurrencyDisplay'

interface Props {
  title?: string
  back?: boolean
  right?: ReactNode
  currency?: boolean
}

export default function TopBar({ title, back, right, currency }: Props) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-30 bg-night-950/95 backdrop-blur border-b border-night-800 px-4" style={{ height: 60 }}>
      <div className="flex items-center justify-between gap-3 h-full">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {back && (
            <button onClick={() => navigate(-1)} className="text-violet-400 hover:text-white transition-colors -ml-1 flex-shrink-0">
              <ChevronLeft size={26} />
            </button>
          )}
          {title && <h1 className="font-display text-lg text-white truncate">{title}</h1>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {currency && <CurrencyDisplay />}
          {right}
        </div>
      </div>
    </header>
  )
}
