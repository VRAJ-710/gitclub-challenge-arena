import React, { useState } from 'react';
import { 
  GitBranch, 
  Flame, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  User,
  Zap
} from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function Navbar({ 
  user, 
  solvedCount, 
  totalChallenges, 
  onOpenProfile, 
  onOpenCheatsheet, 
  onOpenRules, 
  onOpenNewChallenge,
  audioMuted,
  onToggleAudio
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback) => {
    sounds.click();
    if (callback) callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0A0D14]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-3 group" onClick={() => sounds.click()}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F05032] via-purple-600 to-indigo-600 p-[2px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-[#F05032] group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                    Git Club
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#F05032] font-bold px-1.5 py-0.5 rounded bg-[#F05032]/10 border border-[#F05032]/20">
                    CHARUSAT
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono flex items-center space-x-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Season 1 • 420+ Enrolled</span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a 
              href="#challenges" 
              onClick={() => handleNavClick()}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Challenges
            </a>
            <a 
              href="#leaderboard" 
              onClick={() => handleNavClick()}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Leaderboard
            </a>
            <button 
              onClick={() => handleNavClick(onOpenCheatsheet)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Git Cheatsheet</span>
            </button>
            <button 
              onClick={() => handleNavClick(onOpenRules)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Rules</span>
            </button>
            <button 
              onClick={() => handleNavClick(onOpenNewChallenge)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-purple-300 hover:text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-purple-400" />
              <span>Propose</span>
            </button>
          </nav>

          {/* User Quick Stats Bar & Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleAudio();
                sounds.click();
              }}
              title={audioMuted ? "Unmute Sound FX" : "Mute Sound FX"}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg border border-slate-800 transition-colors"
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
            </button>

            {/* Streak Pill */}
            <div 
              className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400"
              title="Daily Challenge Streak"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{user.streak}d Streak</span>
            </div>

            {/* XP Pill */}
            <div 
              className="flex items-center space-x-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-300"
              title="Total Earned XP"
            >
              <Zap className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              <span>{user.xp} XP</span>
            </div>

            {/* Solved Ratio */}
            <div 
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400"
              title="Completed Challenges"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>{solvedCount}/{totalChallenges}</span>
            </div>

            {/* User Profile Avatar CTA */}
            <button
              onClick={() => {
                sounds.click();
                onOpenProfile();
              }}
              className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all hover:border-purple-500/50"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-6 h-6 rounded-full bg-purple-900/50 border border-purple-400/40" 
              />
              <span className="text-xs font-medium text-slate-200">{user.name.split(' ')[0]}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => {
                sounds.click();
                onOpenProfile();
              }}
              className="p-1 rounded-full border border-slate-700"
            >
              <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-[#0A0D14] px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-amber-400 flex items-center">
                <Flame className="w-3.5 h-3.5 mr-1" /> {user.streak}d
              </span>
              <span className="text-xs font-semibold text-purple-400 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1" /> {user.xp} XP
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                <Award className="w-3.5 h-3.5 mr-1" /> {solvedCount}/{totalChallenges}
              </span>
            </div>
            <button
              onClick={() => {
                onToggleAudio();
                sounds.click();
              }}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-300"
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <a 
              href="#challenges" 
              onClick={() => handleNavClick()}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Challenges
            </a>
            <a 
              href="#leaderboard" 
              onClick={() => handleNavClick()}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Leaderboard
            </a>
            <button 
              onClick={() => handleNavClick(onOpenCheatsheet)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg text-left"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Git Cheatsheet</span>
            </button>
            <button 
              onClick={() => handleNavClick(onOpenRules)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg text-left"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Club Rules</span>
            </button>
            <button 
              onClick={() => handleNavClick(onOpenNewChallenge)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-lg text-left"
            >
              <PlusCircle className="w-4 h-4 text-purple-400" />
              <span>Propose a Challenge</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
