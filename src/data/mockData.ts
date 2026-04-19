export const mockUser = {
  id: 'user_1', username: 'DragonSlayer99', characterClass: 'KNIGHT' as const,
  level: 14, totalXp: 3420, xpToNextLevel: 4000, streakCount: 12, gold: 840, gems: 45,
  battlePower: 2340, equippedItems: ['helmet_iron', 'chest_knight', 'sword_flame', 'cape_dark'],
  activeSkin: 'dragon_knight',
  stats: { strength: 72, intelligence: 58, focus: 65, creativity: 41, charisma: 33, endurance: 80, luck: 29 },
  title: 'The Relentless', guildName: 'Code Breakers', winRecord: { wins: 23, losses: 11 },
}

export const mockSkillStats = [
  { category: 'TECHNOLOGY', totalPoints: 1240, logCount: 48, subSkills: [
    { name: 'Python', points: 520 }, { name: 'Game Design', points: 380 }, { name: 'Maths', points: 340 },
  ]},
  { category: 'SCIENCE', totalPoints: 680, logCount: 27, subSkills: [
    { name: 'Physics', points: 310 }, { name: 'Biology', points: 240 }, { name: 'Chemistry', points: 130 },
  ]},
  { category: 'CREATIVE', totalPoints: 520, logCount: 21, subSkills: [
    { name: 'Drawing', points: 280 }, { name: 'Music', points: 160 }, { name: 'Writing', points: 80 },
  ]},
  { category: 'SPORT', totalPoints: 890, logCount: 35, subSkills: [
    { name: 'Running', points: 440 }, { name: 'Gym', points: 290 }, { name: 'Football', points: 160 },
  ]},
  { category: 'LANGUAGES', totalPoints: 340, logCount: 14, subSkills: [
    { name: 'Spanish', points: 200 }, { name: 'Japanese', points: 140 },
  ]},
  { category: 'HUMANITIES', totalPoints: 210, logCount: 9, subSkills: [
    { name: 'History', points: 140 }, { name: 'Philosophy', points: 70 },
  ]},
  { category: 'SOCIAL', totalPoints: 180, logCount: 8, subSkills: [
    { name: 'Public Speaking', points: 110 }, { name: 'Debate', points: 70 },
  ]},
  { category: 'PRACTICAL', totalPoints: 290, logCount: 12, subSkills: [
    { name: 'Cooking', points: 160 }, { name: 'Electronics', points: 130 },
  ]},
]

export const mockRecentLogs = [
  { id: '1', skillCategory: 'TECHNOLOGY', subSkill: 'Python', effortLevel: 'DEEP', pointsAwarded: 75, loggedAt: '2026-04-18T14:30:00', description: 'Finished building my first web scraper' },
  { id: '2', skillCategory: 'SPORT', subSkill: 'Running', effortLevel: 'MEDIUM', pointsAwarded: 28, loggedAt: '2026-04-18T08:00:00', description: '5km morning run' },
  { id: '3', skillCategory: 'SCIENCE', subSkill: 'Physics', effortLevel: 'MEDIUM', pointsAwarded: 28, loggedAt: '2026-04-17T19:00:00', description: 'Watched lecture on quantum mechanics' },
  { id: '4', skillCategory: 'CREATIVE', subSkill: 'Drawing', effortLevel: 'LIGHT', pointsAwarded: 11, loggedAt: '2026-04-17T15:00:00', description: 'Practised character sketching' },
  { id: '5', skillCategory: 'LANGUAGES', subSkill: 'Spanish', effortLevel: 'MEDIUM', pointsAwarded: 28, loggedAt: '2026-04-16T20:00:00', description: 'Duolingo + 20 min podcast' },
]

export const mockInsights = [
  { id: '1', insightType: 'WEEKLY_SUMMARY', title: 'Your week in review', content: "Huge week, DragonSlayer99! You crushed 8 sessions — your best week yet. Python is clearly your obsession right now, and honestly? Lean into it. Your Focus stat jumped by 12 points.", aiSource: 'LOCAL_GEMMA', readAt: null, generatedAt: '2026-04-14T20:00:00' },
  { id: '2', insightType: 'STRENGTH_IDENTIFIED', title: 'Your emerging strength', content: "After 3 months of data, one thing is clear: you're becoming a technical thinker. Your Python and Maths logs are consistent, deep, and growing. This is what a future engineer or developer actually looks like in the making.", aiSource: 'CLAUDE_API', readAt: '2026-04-10T10:00:00', generatedAt: '2026-04-09T09:00:00' },
  { id: '3', insightType: 'INTEREST_ALERT', title: "You're loving Technology this week!", content: "You've logged Technology 6 times in 7 days. That's not a coincidence — that's a signal. Whatever you're building or studying right now, it's clicking. Keep going.", aiSource: 'LOCAL_GEMMA', readAt: null, generatedAt: '2026-04-18T08:00:00' },
  { id: '4', insightType: 'CAREER_SUGGESTION', title: 'Where your skills could take you', content: "Based on your Technology + Science combo, three paths are lighting up: Software Engineering, Data Science, or Game Development. You already have the curiosity for all three. The Game Design sub-skill you've been logging? That one's interesting — not many people mix it with solid Python skills.", aiSource: 'CLAUDE_API', readAt: null, generatedAt: '2026-04-15T09:00:00' },
]

export const mockQuests = {
  daily: { id: 'dq1', title: 'Log a Technology activity', description: 'Keep that Python streak alive.', targetCount: 1, currentCount: 0, rewardXp: 50, rewardGold: 25, expiresAt: '2026-04-18T23:59:59', questType: 'DAILY', skillCategory: 'TECHNOLOGY' },
  weekly: [
    { id: 'wq1', title: 'Log in all 8 skill categories', description: 'A true Renaissance Knight logs everything.', targetCount: 8, currentCount: 5, rewardXp: 200, rewardGold: 100, rewardItem: 'Rare Cosmetic', expiresAt: '2026-04-21T23:59:59', questType: 'WEEKLY' },
    { id: 'wq2', title: 'Complete 10 Pomodoro sessions', description: 'Deep focus. Real power.', targetCount: 10, currentCount: 7, rewardXp: 300, rewardGold: 150, expiresAt: '2026-04-21T23:59:59', questType: 'WEEKLY' },
    { id: 'wq3', title: 'Win 3 duels', description: 'Prove your worth in the arena.', targetCount: 3, currentCount: 1, rewardXp: 150, rewardGold: 75, rewardItem: 'Title: Conqueror', expiresAt: '2026-04-21T23:59:59', questType: 'WEEKLY' },
  ],
  milestones: [
    { id: 'mq1', title: "The Scholar's Path", description: 'Log 50 total hours of study across any categories.', targetCount: 50, currentCount: 38, rewardItem: "Scholar's Robes Set", questType: 'MILESTONE', completed: false },
    { id: 'mq2', title: "The Coder's Blade", description: 'Log 25 Technology sessions.', targetCount: 25, currentCount: 25, rewardItem: 'Code Blade Weapon', questType: 'MILESTONE', completed: true },
    { id: 'mq3', title: "The Warrior's Discipline", description: 'Complete 30 consecutive days of activity.', targetCount: 30, currentCount: 12, rewardItem: 'Champion Armour Set', questType: 'MILESTONE', completed: false },
    { id: 'mq4', title: 'Renaissance Knight', description: 'Log at least 10 times in every skill category.', targetCount: 80, currentCount: 34, rewardItem: 'Prismatic Aura', questType: 'MILESTONE', completed: false },
  ],
}

export const mockAchievements = [
  { id: 'a1', name: 'First Strike', description: 'Log your first activity', icon: '⚡', earned: true, earnedAt: '2026-01-01' },
  { id: 'a2', name: 'Week Warrior', description: '7-day activity streak', icon: '🔥', earned: true, earnedAt: '2026-01-08' },
  { id: 'a3', name: 'Code Initiate', description: 'Log 10 Technology sessions', icon: '💻', earned: true, earnedAt: '2026-02-01' },
  { id: 'a4', name: 'Science Nerd', description: 'Log 10 Science sessions', icon: '🔬', earned: true, earnedAt: '2026-02-15' },
  { id: 'a5', name: "The Coder's Blade", description: 'Log 25 Technology sessions', icon: '⚔️', earned: true, earnedAt: '2026-03-10' },
  { id: 'a6', name: 'Deep Thinker', description: 'Complete 5 Deep-effort sessions', icon: '🧠', earned: true, earnedAt: '2026-02-20' },
  { id: 'a7', name: 'Month Master', description: '30-day streak', icon: '📅', earned: false },
  { id: 'a8', name: 'Renaissance Knight', description: 'Log in all 8 skill categories', icon: '🌟', earned: false },
  { id: 'a9', name: 'Arena Champion', description: 'Win 10 duels in a row', icon: '🏆', earned: false },
  { id: 'a10', name: 'Lore Keeper', description: 'Journal for 30 consecutive days', icon: '📜', earned: false },
  { id: 'a11', name: 'Guild Master', description: 'Create and lead a guild', icon: '🏰', earned: false },
  { id: 'a12', name: 'Legendary Focus', description: 'Complete 100 Pomodoro sessions', icon: '⏱️', earned: false },
]

export const mockCosmetics = {
  head: [
    { id: 'helmet_iron', name: 'Iron Helm', rarity: 'COMMON', owned: true, equipped: true, cost: 100, currency: 'gold', statBonus: '+2 Endurance', assetEmoji: '⛑️' },
    { id: 'helmet_dragon', name: 'Dragon Crown', rarity: 'RARE', owned: true, equipped: false, cost: 500, currency: 'gold', statBonus: '+5 Strength', assetEmoji: '👑' },
    { id: 'helmet_wizard', name: 'Arcane Hood', rarity: 'LEGENDARY', owned: false, equipped: false, cost: 80, currency: 'gems', statBonus: '+8 Intelligence', assetEmoji: '🎩' },
    { id: 'helmet_ghost', name: 'Ghost Mask', rarity: 'MYTHIC', owned: false, equipped: false, cost: 150, currency: 'gems', statBonus: '+5 Luck +5 Agility', assetEmoji: '😶‍🌫️', levelRequired: 25 },
  ],
  body: [
    { id: 'chest_knight', name: 'Knight Armour', rarity: 'COMMON', owned: true, equipped: true, cost: 200, currency: 'gold', statBonus: '+5 Endurance', assetEmoji: '🦺' },
    { id: 'chest_dark', name: 'Dark Plate', rarity: 'RARE', owned: false, equipped: false, cost: 600, currency: 'gold', statBonus: '+8 Strength +3 Endurance', assetEmoji: '🛡️' },
    { id: 'chest_scholar', name: "Scholar's Robes", rarity: 'LEGENDARY', owned: false, equipped: false, cost: 100, currency: 'gems', statBonus: '+10 Intelligence', assetEmoji: '👘', questReward: true },
  ],
  weapons: [
    { id: 'sword_flame', name: 'Flame Sword', rarity: 'RARE', owned: true, equipped: true, cost: 400, currency: 'gold', statBonus: '+10 Strength', assetEmoji: '🗡️' },
    { id: 'sword_code', name: 'Code Blade', rarity: 'LEGENDARY', owned: true, equipped: false, cost: 0, currency: 'none', statBonus: '+8 Intelligence +5 Focus', assetEmoji: '⚔️', questReward: true },
    { id: 'staff_crystal', name: 'Crystal Staff', rarity: 'LEGENDARY', owned: false, equipped: false, cost: 120, currency: 'gems', statBonus: '+12 Intelligence', assetEmoji: '🪄' },
    { id: 'bow_shadow', name: 'Shadow Bow', rarity: 'RARE', owned: false, equipped: false, cost: 500, currency: 'gold', statBonus: '+8 Agility +4 Luck', assetEmoji: '🏹' },
  ],
  accessories: [
    { id: 'cape_dark', name: 'Dark Cape', rarity: 'UNCOMMON', owned: true, equipped: true, cost: 250, currency: 'gold', statBonus: '+3 Agility', assetEmoji: '🦸' },
    { id: 'pet_dragon', name: 'Baby Dragon', rarity: 'RARE', owned: false, equipped: false, cost: 60, currency: 'gems', statBonus: '+5 Luck', assetEmoji: '🐉' },
    { id: 'aura_gold', name: 'Golden Aura', rarity: 'LEGENDARY', owned: false, equipped: false, cost: 150, currency: 'gems', statBonus: '+10 Charisma', assetEmoji: '✨', levelRequired: 20 },
    { id: 'mount_phoenix', name: 'Phoenix Mount', rarity: 'MYTHIC', owned: false, equipped: false, cost: 300, currency: 'gems', statBonus: '+8 Strength +8 Luck', assetEmoji: '🦅', levelRequired: 30 },
  ],
  consumables: [
    { id: 'xp_boost', name: 'XP Booster', description: '×2 XP for 24 hours', cost: 30, currency: 'gems', emoji: '⚡', owned: 2 },
    { id: 'gold_boost', name: 'Gold Booster', description: '×2 Gold for 12 hours', cost: 40, currency: 'gems', emoji: '💰', owned: 1 },
    { id: 'streak_freeze', name: 'Streak Freeze', description: 'Protect streak on a missed day', cost: 150, currency: 'gold', emoji: '🧊', owned: 3 },
    { id: 'luck_potion', name: 'Luck Potion', description: '+10 Luck for 48 hours', cost: 20, currency: 'gems', emoji: '🍀', owned: 0 },
    { id: 'focus_elixir', name: 'Focus Elixir', description: '+5 Focus for today', cost: 15, currency: 'gems', emoji: '🧪', owned: 1 },
  ],
}

export const mockFriends = [
  { id: 'f1', username: 'StarCoder', level: 18, characterClass: 'WIZARD', streakCount: 24, battlePower: 3100, weeklyXp: 540, isOnline: true, winRecord: { wins: 31, losses: 9 } },
  { id: 'f2', username: 'NightRunner', level: 11, characterClass: 'ROGUE', streakCount: 6, battlePower: 1890, weeklyXp: 320, isOnline: false, winRecord: { wins: 14, losses: 18 } },
  { id: 'f3', username: 'MelodyMaker', level: 9, characterClass: 'BARD', streakCount: 3, battlePower: 1540, weeklyXp: 190, isOnline: true, winRecord: { wins: 8, losses: 12 } },
  { id: 'f4', username: 'IronBuilder', level: 22, characterClass: 'ENGINEER', streakCount: 45, battlePower: 3980, weeklyXp: 720, isOnline: false, winRecord: { wins: 47, losses: 13 } },
]

export const mockGuild = {
  id: 'g1', name: 'Code Breakers', memberCount: 12, maxMembers: 20,
  guildPower: 28400, weeklyLogs: 234, rank: 'Gold',
  currentBoss: { name: 'The Procrastination Demon', hp: 1000, maxHp: 1000, currentHp: 340, timeLeft: '2d 14h' },
  members: [
    { username: 'DragonSlayer99', level: 14, role: 'MASTER', weeklyContribution: 380, characterClass: 'KNIGHT' },
    { username: 'StarCoder', level: 18, role: 'OFFICER', weeklyContribution: 540, characterClass: 'WIZARD' },
    { username: 'NightRunner', level: 11, role: 'MEMBER', weeklyContribution: 200, characterClass: 'ROGUE' },
    { username: 'PixelQueen', level: 16, role: 'MEMBER', weeklyContribution: 310, characterClass: 'BARD' },
    { username: 'IronBuilder', level: 22, role: 'OFFICER', weeklyContribution: 720, characterClass: 'ENGINEER' },
  ],
}

export const mockBattleHistory = [
  { id: 'b1', opponent: 'StarCoder', result: 'WIN', myBP: 2340, oppBP: 2180, goldEarned: 120, date: '2026-04-17', type: 'STANDARD' },
  { id: 'b2', opponent: 'IronBuilder', result: 'LOSS', myBP: 2340, oppBP: 3980, goldEarned: 30, date: '2026-04-16', type: 'STANDARD' },
  { id: 'b3', opponent: 'NightRunner', result: 'WIN', myBP: 2340, oppBP: 1890, goldEarned: 80, date: '2026-04-15', type: 'SKILL', skillUsed: 'TECHNOLOGY' },
]

export const mockJournalEntries = [
  { id: 'j1', date: '2026-04-18', mood: '😄', content: 'Finally got my Python web scraper working. Took 3 days but it actually pulls data now. Feeling like I could build anything.', promptUsed: null },
  { id: 'j2', date: '2026-04-17', mood: '😐', content: 'Physics lecture was dense. Struggled with the quantum mechanics part. Need to re-watch it.', promptUsed: 'What felt hard today?' },
  { id: 'j3', date: '2026-04-16', mood: '🚀', content: 'Morning run was great. Clear head after. Did 2 Pomodoro sessions straight after and was completely locked in.', promptUsed: null },
  { id: 'j4', date: '2026-04-15', mood: '😴', content: 'Tired day. Only managed Spanish for 20 mins but showed up. That counts.', promptUsed: 'What made today worth logging?' },
]

export const mockCareerConstellation = [
  { id: 'c1', name: 'Software Engineer', x: 25, y: 30, brightness: 0.95, skills: ['Technology', 'Maths'], description: 'Build the systems of the future. Your Python skills are already pointing here.' },
  { id: 'c2', name: 'Game Developer', x: 48, y: 18, brightness: 0.88, skills: ['Technology', 'Creative', 'Maths'], description: 'The intersection of code and creativity. Your Game Design logs caught our eye.' },
  { id: 'c3', name: 'Data Scientist', x: 68, y: 32, brightness: 0.72, skills: ['Technology', 'Science', 'Maths'], description: 'Patterns in noise. Your analytical logs suggest a real aptitude here.' },
  { id: 'c4', name: 'UX Designer', x: 28, y: 62, brightness: 0.55, skills: ['Creative', 'Technology', 'Social'], description: 'Worth exploring if your Creative side grows.' },
  { id: 'c5', name: 'Physicist', x: 75, y: 52, brightness: 0.48, skills: ['Science', 'Maths'], description: 'Your Science logs are solid. Push deeper into Physics and this star gets brighter.' },
  { id: 'c6', name: 'Sports Coach', x: 14, y: 75, brightness: 0.40, skills: ['Sport', 'Social'], description: 'A path that rewards your physical dedication.' },
  { id: 'c7', name: 'Musician', x: 56, y: 72, brightness: 0.28, skills: ['Creative'], description: "Dim right now — you haven't logged much music lately." },
  { id: 'c8', name: 'Entrepreneur', x: 82, y: 14, brightness: 0.35, skills: ['Social', 'Practical', 'Technology'], description: 'Log more leadership and practical skills. The seeds are there.' },
]

export const SKILL_META: Record<string, { emoji: string; color: string; bg: string; border: string; label: string; examples: string[] }> = {
  SCIENCE:     { emoji: '🔬', color: '#22d3ee', bg: 'bg-cyan-500/20',    border: 'border-cyan-500',    label: 'Science',    examples: ['Physics', 'Biology', 'Chemistry'] },
  TECHNOLOGY:  { emoji: '💻', color: '#a78bfa', bg: 'bg-violet-500/20',  border: 'border-violet-500',  label: 'Tech & Logic', examples: ['Python', 'Maths', 'Game Design'] },
  CREATIVE:    { emoji: '🎨', color: '#f472b6', bg: 'bg-pink-500/20',    border: 'border-pink-500',    label: 'Creative',   examples: ['Drawing', 'Music', 'Writing'] },
  HUMANITIES:  { emoji: '📚', color: '#fb923c', bg: 'bg-orange-500/20',  border: 'border-orange-500',  label: 'Humanities', examples: ['History', 'Philosophy', 'English'] },
  LANGUAGES:   { emoji: '🌍', color: '#34d399', bg: 'bg-emerald-500/20', border: 'border-emerald-500', label: 'Languages',  examples: ['Spanish', 'Japanese', 'French'] },
  SOCIAL:      { emoji: '🤝', color: '#60a5fa', bg: 'bg-blue-500/20',    border: 'border-blue-500',    label: 'Social',     examples: ['Public Speaking', 'Debate', 'Leadership'] },
  SPORT:       { emoji: '⚡', color: '#facc15', bg: 'bg-yellow-500/20',  border: 'border-yellow-500',  label: 'Sport',      examples: ['Running', 'Gym', 'Football'] },
  PRACTICAL:   { emoji: '🛠️', color: '#a3e635', bg: 'bg-lime-500/20',   border: 'border-lime-500',    label: 'Practical',  examples: ['Cooking', 'Electronics', 'DIY'] },
}

export const mockPomodoroStats = {
  totalSessions: 47,
  totalMinutes: 1175,
  todaySessions: 2,
  weekSessions: 14,
  longestStreak: 8,
}

export const CLASS_META: Record<string, { emoji: string; label: string; tagline: string }> = {
  KNIGHT:   { emoji: '⚔️',  label: 'Knight',   tagline: 'Balanced & brave. Born for anything.' },
  WIZARD:   { emoji: '🧙',  label: 'Wizard',   tagline: 'Master of logic, science & code.' },
  ROGUE:    { emoji: '🗡️', label: 'Rogue',    tagline: 'Creative, quick & unpredictable.' },
  BARD:     { emoji: '🎵',  label: 'Bard',     tagline: 'Storyteller, artist, performer.' },
  ENGINEER: { emoji: '⚙️',  label: 'Engineer', tagline: 'Builder, problem-solver, creator.' },
}
