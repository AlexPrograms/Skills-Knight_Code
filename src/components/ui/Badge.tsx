import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  color?: 'violet' | 'gold' | 'rose' | 'emerald' | 'blue' | 'orange'
  size?: 'xs' | 'sm'
}

const colors = {
  violet: 'bg-violet-900/60 text-violet-300 border-violet-700/40',
  gold: 'bg-gold-900/40 text-gold-300 border-gold-700/40',
  rose: 'bg-rose-900/40 text-rose-300 border-rose-700/40',
  emerald: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  blue: 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  orange: 'bg-orange-900/40 text-orange-300 border-orange-700/40',
}

const sizes = {
  xs: 'text-[10px] px-1.5 py-0.5 rounded-md',
  sm: 'text-xs px-2.5 py-1 rounded-xl',
}

export default function Badge({ children, color = 'violet', size = 'sm' }: Props) {
  return (
    <span className={`border font-semibold inline-flex items-center gap-1 ${colors[color]} ${sizes[size]}`}>
      {children}
    </span>
  )
}
