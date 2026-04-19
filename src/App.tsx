import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ToastContainer from './components/ui/Toast'
import XpBanner from './components/ui/XpBanner'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import LogActivity from './pages/LogActivity'
import LogSuccess from './pages/LogSuccess'
import SkillsDashboard from './pages/SkillsDashboard'
import JournalHome from './pages/JournalHome'
import JournalWrite from './pages/JournalWrite'
import TimeCapsule from './pages/TimeCapsule'
import TaskManager from './pages/TaskManager'
import PomodoroTimer from './pages/PomodoroTimer'
import Shop from './pages/Shop'
import BattleHub from './pages/BattleHub'
import DuelSetup from './pages/DuelSetup'
import BattleAnimation from './pages/BattleAnimation'
import Quests from './pages/Quests'
import FriendsPage from './pages/FriendsPage'
import GuildPage from './pages/GuildPage'
import CoachHome from './pages/CoachHome'
import CareerConstellation from './pages/CareerConstellation'
import Profile from './pages/Profile'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/log" element={<LogActivity />} />
        <Route path="/log/success" element={<LogSuccess />} />
        <Route path="/skills" element={<SkillsDashboard />} />
        <Route path="/journal" element={<JournalHome />} />
        <Route path="/journal/write" element={<JournalWrite />} />
        <Route path="/journal/capsule" element={<TimeCapsule />} />
        <Route path="/tasks" element={<TaskManager />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/battle" element={<BattleHub />} />
        <Route path="/battle/duel" element={<DuelSetup />} />
        <Route path="/battle/fight" element={<BattleAnimation />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/guild" element={<GuildPage />} />
        <Route path="/coach" element={<CoachHome />} />
        <Route path="/coach/constellation" element={<CareerConstellation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Desktop framing */}
      <div className="min-h-screen bg-[#02010a] flex items-start justify-center">
        <div className="relative w-full max-w-[430px] min-h-screen bg-night-950 overflow-hidden">
          <ToastContainer />
          <XpBanner />
          <AnimatedRoutes />
        </div>
        {/* Desktop hint */}
        <div className="hidden lg:flex fixed bottom-4 left-1/2 -translate-x-1/2 text-night-600 text-xs gap-2 items-center pointer-events-none">
          <span>⚔️</span>
          <span>Best experienced on mobile — or resize to 430px</span>
          <span>⚔️</span>
        </div>
      </div>
    </BrowserRouter>
  )
}
