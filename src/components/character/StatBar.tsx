interface Props {
  label: string
  value: number
  max?: number
  color?: string
  icon?: string
}

export default function StatBar({ label, value, max = 100, color = 'bg-violet-500', icon }: Props) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-base w-5 text-center">{icon}</span>}
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-violet-300">{label}</span>
          <span className="text-white font-bold">{value}</span>
        </div>
        <div className="h-1.5 bg-night-800 rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
