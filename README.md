# Skills Knight UI

A fully clickable mobile-first UI prototype for **Skills Knight** — a gamified learning RPG where your real-life skills become your character's power.

Built for HackCarpathia 2026.

## What is Skills Knight?

Skills Knight turns real-world learning into an RPG. Every time you study, train, or practice a skill, you log it and earn XP, Gold, and character stats. Your character grows as you grow.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (port 5175)
- **Tailwind CSS** with a custom dark design system
- **Framer Motion** for all animations
- **Zustand** for global state
- **Recharts** for skill visualizations
- **React Router v6**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5175](http://localhost:5175)

> Best viewed at 430px width (iPhone viewport). On desktop the app is centred with a mobile frame.

## Pages

| Route | Page |
|---|---|
| `/onboarding` | Class + skill picker wizard |
| `/home` | Dashboard — XP, quests, activity feed |
| `/log` | Log an activity (category → skill → effort → notes) |
| `/log/success` | XP reward + confetti animation |
| `/skills` | Radar chart, bar chart, skill breakdown |
| `/journal` | Daily journal entry list |
| `/journal/write` | Write or edit a journal entry |
| `/journal/capsule` | Time capsule — sealed messages to your future self |
| `/tasks` | Task board with XP rewards on completion |
| `/pomodoro` | Focus timer with live session tracking |
| `/shop` | Buy and equip gear with Gold and Gems |
| `/battle` | Battle hub — modes and history |
| `/battle/duel` | Duel setup — opponent, wager, mode |
| `/battle/fight` | Animated turn-by-turn duel sequence |
| `/quests` | Daily, weekly, and milestone quests |
| `/friends` | Friends list + weekly XP leaderboard |
| `/guild` | Guild page with live boss raid |
| `/coach` | AI coach insights |
| `/coach/constellation` | Career constellation star map |
| `/profile` | Stats, achievements, quick links |

## Features

- **Live Zustand state** — logging activities updates XP, level, gold, and skill stats in real time
- **Framer Motion** on every screen — page transitions, spring animations, staggered lists
- **Working Pomodoro timer** — counts down, awards XP on completion
- **Shop purchase flow** — tap item → modal → buy → currency deducted → owned badge appears
- **Battle animation** — sequential attack turns with HP bars and a win/loss result screen
- **Journal saves to state** — new entries appear immediately in the journal list
- **Task completion** — marks done with animation and awards XP

## Design System

- Background: `#06040f` / `#0d0b1e`
- Gold accent: `#f59e0b`
- Fonts: **Fredoka One** (headings) · **Nunito** (body)
- Max width: 430px (iPhone 14 Pro Max)
