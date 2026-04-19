import { SKILL_META } from '../../data/mockData'

interface Props {
  category: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const sizes = { sm: 'text-sm', md: 'text-xl', lg: 'text-3xl' }

export default function SkillCategoryIcon({ category, size = 'md', showLabel }: Props) {
  const meta = SKILL_META[category as keyof typeof SKILL_META] ?? { emoji: '⚡', label: category, color: 'text-violet-400' }
  return (
    <span className={`inline-flex items-center gap-1 ${meta.color}`}>
      <span className={sizes[size]}>{meta.emoji}</span>
      {showLabel && <span className="text-xs font-semibold">{meta.label}</span>}
    </span>
  )
}
