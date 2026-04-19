import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { mockUser } from '../data/mockData'
import { useAppStore } from '../stores/appStore'
import TopBar from '../components/layout/TopBar'
import PageShell from '../components/layout/PageShell'
import BottomNav from '../components/layout/BottomNav'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

type Tab = 'head' | 'body' | 'weapons' | 'accessories' | 'consumables'
const TABS: Tab[] = ['head', 'body', 'weapons', 'accessories', 'consumables']
const TAB_LABELS: Record<Tab, string> = { head: '⛑️ Head', body: '🦺 Body', weapons: '⚔️ Weapons', accessories: '🎭 Extras', consumables: '🧪 Potions' }
const RARITY_COLORS: Record<string, 'violet' | 'emerald' | 'gold' | 'rose' | 'blue'> = {
  COMMON: 'violet', UNCOMMON: 'emerald', RARE: 'blue', LEGENDARY: 'gold', MYTHIC: 'rose',
}

type AnyItem = {
  id: string; name: string; rarity: string; owned: boolean; equipped?: boolean
  cost: number; currency: string; statBonus: string; assetEmoji: string
  levelRequired?: number; questReward?: boolean
}

type Consumable = {
  id: string; name: string; description: string; cost: number; currency: string; emoji: string; owned: number
}

export default function Shop() {
  const { cosmetics, buyItem, equipItem, spendGold, spendGems, addToast, user } = useAppStore()
  const [tab, setTab] = useState<Tab>('weapons')
  const [selected, setSelected] = useState<AnyItem | null>(null)

  const items = cosmetics[tab] as AnyItem[]

  const handleBuy = () => {
    if (!selected) return
    buyItem(selected.id, tab)
    setSelected(null)
  }

  const handleEquip = () => {
    if (!selected) return
    equipItem(selected.id, tab)
    setSelected(null)
  }

  const handleConsumableBuy = (item: Consumable) => {
    if (item.currency === 'gold') {
      if (!spendGold(item.cost)) { addToast('error', 'Not enough gold!'); return }
    } else {
      if (!spendGems(item.cost)) { addToast('error', 'Not enough gems!'); return }
    }
    addToast('success', `Bought ${item.name}! 🎉`)
  }

  return (
    <>
      <TopBar title="Knight's Armory" back currency />
      <PageShell>
        <div className="overflow-x-auto -mx-4 px-4 mb-5">
          <div className="flex gap-2 pb-1 min-w-max">
            {TABS.map(t => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${tab === t ? 'bg-violet-600 border-violet-500 text-white' : 'bg-night-800 border-night-700 text-violet-300'}`}
              >
                {TAB_LABELS[t]}
              </motion.button>
            ))}
          </div>
        </div>

        {tab === 'consumables' ? (
          <div className="grid grid-cols-1 gap-3">
            {(cosmetics.consumables as Consumable[]).map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="text-white font-semibold">{item.name}</div>
                      <div className="text-violet-300 text-xs">{item.description}</div>
                      {item.owned > 0 && <div className="text-emerald-400 text-xs mt-1">Owned: {item.owned}</div>}
                    </div>
                    <Button size="sm" variant={item.currency === 'gems' ? 'secondary' : 'gold'} onClick={() => handleConsumableBuy(item)}>
                      {item.currency === 'gems' ? '💎' : '🪙'} {item.cost}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => {
              const locked = item.levelRequired !== undefined && item.levelRequired > user.level
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <motion.div whileTap={!locked ? { scale: 0.95 } : undefined}>
                    <Card
                      className={`cursor-pointer relative ${item.equipped ? 'border-violet-500/60' : ''} ${locked ? 'opacity-60' : 'hover:border-violet-600/40'}`}
                      onClick={() => !locked && setSelected(item)}
                    >
                      {item.equipped && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />}
                      {locked && <div className="absolute top-2 right-2"><Lock size={12} className="text-night-600" /></div>}
                      <div className="text-4xl text-center mb-2 mt-1">{item.assetEmoji}</div>
                      <div className="text-white font-semibold text-sm text-center leading-tight">{item.name}</div>
                      <div className="flex justify-center mt-1.5">
                        <Badge color={RARITY_COLORS[item.rarity] ?? 'violet'} size="xs">{item.rarity}</Badge>
                      </div>
                      <div className="text-violet-300 text-[10px] text-center mt-1">{item.statBonus}</div>
                      {!item.owned && item.currency !== 'none' && (
                        <div className={`text-center mt-2 text-xs font-bold ${item.currency === 'gems' ? 'text-violet-300' : 'text-gold-400'}`}>
                          {item.currency === 'gems' ? '💎' : '🪙'} {item.cost}
                        </div>
                      )}
                      {item.owned && !item.equipped && <div className="text-center mt-2 text-xs text-emerald-400 font-semibold">Owned</div>}
                      {item.equipped && <div className="text-center mt-2 text-xs text-emerald-400 font-semibold">✓ Equipped</div>}
                      {item.questReward && <div className="text-center mt-1 text-[10px] text-gold-400">Quest reward</div>}
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Item detail modal */}
        <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
          {selected && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="text-6xl mb-4"
              >
                {selected.assetEmoji}
              </motion.div>
              <Badge color={RARITY_COLORS[selected.rarity] ?? 'violet'}>{selected.rarity}</Badge>
              <p className="text-violet-300 text-sm mt-3">{selected.statBonus}</p>
              {selected.levelRequired && selected.levelRequired > user.level && (
                <p className="text-rose-400 text-xs mt-2">Requires Level {selected.levelRequired}</p>
              )}
              <div className="flex gap-3 mt-6">
                {!selected.owned && selected.currency !== 'none' && (
                  <Button fullWidth onClick={handleBuy} variant={selected.currency === 'gems' ? 'secondary' : 'gold'}>
                    Buy {selected.currency === 'gems' ? '💎' : '🪙'} {selected.cost}
                  </Button>
                )}
                {selected.owned && !selected.equipped && (
                  <Button fullWidth onClick={handleEquip}>Equip</Button>
                )}
                {selected.owned && selected.equipped && (
                  <Button fullWidth variant="secondary" disabled>✓ Equipped</Button>
                )}
              </div>
            </div>
          )}
        </Modal>
      </PageShell>
      <BottomNav />
    </>
  )
}
