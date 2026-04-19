import { create } from 'zustand'
import {
  mockUser, mockSkillStats, mockRecentLogs, mockInsights, mockQuests,
  mockAchievements, mockCosmetics, mockFriends, mockGuild, mockBattleHistory,
  mockJournalEntries, mockPomodoroStats,
} from '../data/mockData'

export type ToastType = 'success' | 'info' | 'warning' | 'error'
interface Toast { id: string; type: ToastType; message: string }

function calcLevel(xp: number) {
  return Math.floor((-1 + Math.sqrt(1 + 8 * xp / 300)) / 2) + 1
}
function xpForLevel(level: number) {
  return level * (level - 1) * 150
}

interface AppState {
  user: typeof mockUser
  skillStats: typeof mockSkillStats
  recentLogs: typeof mockRecentLogs
  insights: typeof mockInsights
  quests: typeof mockQuests
  achievements: typeof mockAchievements
  cosmetics: typeof mockCosmetics
  friends: typeof mockFriends
  guild: typeof mockGuild
  battleHistory: typeof mockBattleHistory
  journalEntries: typeof mockJournalEntries
  pomodoroStats: typeof mockPomodoroStats

  // UI state
  toasts: Toast[]
  showXpBanner: boolean
  xpBannerAmount: number
  activeModal: string | null

  // Actions
  addLog: (log: { skillCategory: string; subSkill: string; effortLevel: string; description: string }) => void
  completeQuest: (questId: string) => void
  equipItem: (itemId: string, slot: string) => void
  buyItem: (itemId: string, slot: string) => void
  addJournalEntry: (entry: { date: string; mood: string; content: string; promptUsed: string | null }) => void
  incrementPomodoro: () => void
  addToast: (type: ToastType, message: string) => void
  removeToast: (id: string) => void
  showXp: (amount: number) => void
  openModal: (id: string) => void
  closeModal: () => void
  addGold: (amount: number) => void
  spendGold: (amount: number) => boolean
  spendGems: (amount: number) => boolean
}

export const useAppStore = create<AppState>((set, get) => ({
  user: { ...mockUser },
  skillStats: mockSkillStats.map(s => ({ ...s, subSkills: s.subSkills.map(ss => ({ ...ss })) })),
  recentLogs: [...mockRecentLogs],
  insights: [...mockInsights],
  quests: {
    daily: { ...mockQuests.daily },
    weekly: mockQuests.weekly.map(q => ({ ...q })),
    milestones: mockQuests.milestones.map(q => ({ ...q })),
  },
  achievements: mockAchievements.map(a => ({ ...a })),
  cosmetics: {
    head: mockCosmetics.head.map(i => ({ ...i })),
    body: mockCosmetics.body.map(i => ({ ...i })),
    weapons: mockCosmetics.weapons.map(i => ({ ...i })),
    accessories: mockCosmetics.accessories.map(i => ({ ...i })),
    consumables: mockCosmetics.consumables.map(i => ({ ...i })),
  },
  friends: [...mockFriends],
  guild: { ...mockGuild, members: mockGuild.members.map(m => ({ ...m })) },
  battleHistory: [...mockBattleHistory],
  journalEntries: [...mockJournalEntries],
  pomodoroStats: { ...mockPomodoroStats },

  toasts: [],
  showXpBanner: false,
  xpBannerAmount: 0,
  activeModal: null,

  addLog: (log) => {
    const pts = log.effortLevel === 'DEEP' ? 75 : log.effortLevel === 'MEDIUM' ? 28 : 11
    const gold = Math.floor(pts / 3)
    const newLog = {
      id: Date.now().toString(),
      skillCategory: log.skillCategory,
      subSkill: log.subSkill,
      effortLevel: log.effortLevel,
      pointsAwarded: pts,
      loggedAt: new Date().toISOString(),
      description: log.description,
    }
    set(s => {
      const newXp = s.user.totalXp + pts
      const newLevel = Math.max(s.user.level, calcLevel(newXp))
      const xpToNext = xpForLevel(newLevel + 1)
      const newGold = s.user.gold + gold

      const updatedStats = s.skillStats.map(stat => {
        if (stat.category !== log.skillCategory) return stat
        const updatedSubs = stat.subSkills.map(ss =>
          ss.name === log.subSkill ? { ...ss, points: ss.points + pts } : ss
        )
        const hasExisting = updatedSubs.find(ss => ss.name === log.subSkill)
        return {
          ...stat,
          totalPoints: stat.totalPoints + pts,
          logCount: stat.logCount + 1,
          subSkills: hasExisting ? updatedSubs : [...updatedSubs, { name: log.subSkill, points: pts }],
        }
      })

      return {
        recentLogs: [newLog, ...s.recentLogs.slice(0, 19)],
        skillStats: updatedStats,
        user: { ...s.user, totalXp: newXp, level: newLevel, xpToNextLevel: xpToNext, gold: newGold },
      }
    })
    get().showXp(pts)
    get().addToast('success', `+${pts} XP • +${gold} 🪙 for ${log.subSkill}!`)
  },

  completeQuest: (questId) => {
    const s = get()
    const daily = s.quests.daily
    if (daily.id === questId) {
      get().showXp(daily.rewardXp)
      set(state => ({ user: { ...state.user, gold: state.user.gold + daily.rewardGold } }))
      get().addToast('success', `Quest complete! +${daily.rewardXp} XP +${daily.rewardGold} 🪙`)
    }
  },

  equipItem: (itemId, slot) => {
    set(s => {
      const slotKey = slot as keyof typeof s.cosmetics
      const items = s.cosmetics[slotKey] as Array<{ id: string; equipped: boolean }>
      return {
        cosmetics: {
          ...s.cosmetics,
          [slotKey]: items.map(item => ({ ...item, equipped: item.id === itemId })),
        },
      }
    })
    get().addToast('success', 'Item equipped!')
  },

  buyItem: (itemId, slot) => {
    const s = get()
    const slotKey = slot as keyof typeof s.cosmetics
    const items = s.cosmetics[slotKey] as Array<{ id: string; owned: boolean; cost: number; currency: string }>
    const item = items.find(i => i.id === itemId)
    if (!item) return
    if (item.currency === 'gold' && s.user.gold < item.cost) { get().addToast('error', 'Not enough gold!'); return }
    if (item.currency === 'gems' && s.user.gems < item.cost) { get().addToast('error', 'Not enough gems!'); return }
    set(state => ({
      user: {
        ...state.user,
        gold: item.currency === 'gold' ? state.user.gold - item.cost : state.user.gold,
        gems: item.currency === 'gems' ? state.user.gems - item.cost : state.user.gems,
      },
      cosmetics: {
        ...state.cosmetics,
        [slotKey]: (state.cosmetics[slotKey] as typeof items).map(i => i.id === itemId ? { ...i, owned: true } : i),
      },
    }))
    get().addToast('success', 'Item purchased! 🎉')
  },

  addJournalEntry: (entry) => {
    const newEntry = { id: Date.now().toString(), ...entry }
    set(s => ({ journalEntries: [newEntry, ...s.journalEntries] }))
    get().showXp(15)
    get().addToast('success', 'Journal entry saved! +15 XP ✨')
  },

  incrementPomodoro: () => {
    set(s => ({
      pomodoroStats: {
        ...s.pomodoroStats,
        totalSessions: s.pomodoroStats.totalSessions + 1,
        todaySessions: s.pomodoroStats.todaySessions + 1,
        totalMinutes: s.pomodoroStats.totalMinutes + 25,
      },
    }))
    get().showXp(50)
    set(s => ({ user: { ...s.user, gold: s.user.gold + 10 } }))
    get().addToast('success', 'Focus session done! +50 XP 🧠')
  },

  addToast: (type, message) => {
    const id = Math.random().toString(36).slice(2)
    set(s => ({ toasts: [...s.toasts.slice(-2), { id, type, message }] }))
    setTimeout(() => get().removeToast(id), 3500)
  },

  removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),

  showXp: (amount) => {
    set({ showXpBanner: true, xpBannerAmount: amount })
    setTimeout(() => set({ showXpBanner: false }), 2200)
  },

  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),

  addGold: (amount) => set(s => ({ user: { ...s.user, gold: s.user.gold + amount } })),
  spendGold: (amount) => {
    if (get().user.gold < amount) return false
    set(s => ({ user: { ...s.user, gold: s.user.gold - amount } }))
    return true
  },
  spendGems: (amount) => {
    if (get().user.gems < amount) return false
    set(s => ({ user: { ...s.user, gems: s.user.gems - amount } }))
    return true
  },
}))
