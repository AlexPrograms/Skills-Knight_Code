import ProgressBar from '../ui/ProgressBar'

interface Props {
  xp: number
  xpToNext: number
  level: number
}

export default function XpBar({ xp, xpToNext, level }: Props) {
  const current = xp % xpToNext
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-violet-300 font-semibold">LVL {level}</span>
        <span className="text-xs text-violet-400">{current} / {xpToNext} XP</span>
      </div>
      <ProgressBar value={current} max={xpToNext} color="bg-gradient-to-r from-violet-600 to-violet-400" height="h-2.5" />
    </div>
  )
}
