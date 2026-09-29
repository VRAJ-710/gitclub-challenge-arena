import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Clock, 
  Sparkles, 
  SlidersHorizontal, 
  Layers, 
  Filter, 
  GitPullRequest, 
  Users, 
  Code2, 
  CheckCircle2,
  X
} from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function Hero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  categories,
  difficulties
}) {
  // Live sprint countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 22,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 6, hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden border-b border-slate-800/60">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#F05032]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top announcement pill & countdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs font-medium text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span className="text-purple-300 font-semibold">Weekly Sprint #4</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Git & Open Source Mastery</span>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Sprint Ends in:</span>
            <span className="font-bold text-amber-400">
              {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Master Git & Code Through{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-[#F05032] to-amber-300">
              Real Community Challenges
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Solve simulated merge conflicts, interactive rebases, and algorithm puzzles designed by the Git Club CHARUSAT core team. Earn XP, rank on the campus leaderboard, and become open-source ready.
          </p>

          {/* Quick Metrics highlight */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-center space-x-1.5 text-purple-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="font-bold text-lg text-white">420+</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono">CHARUSAT Solvers</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-center space-x-1.5 text-[#F05032] mb-1">
                <GitPullRequest className="w-4 h-4" />
                <span className="font-bold text-lg text-white">1,840+</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono">Simulated PRs</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-center space-x-1.5 text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-bold text-lg text-white">99.4%</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono">Test Accuracy</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-center space-x-1.5 text-amber-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-lg text-white">Top 10%</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono">Win Club Swag</p>
            </div>
          </div>
        </div>

        {/* Search & Comprehensive Filters Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl shadow-black/40">
          
          {/* Search Row */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges by title, tags (e.g. rebase, merge, regex, actions) or author..."
              className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  sounds.click();
                  setSearchQuery('');
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills Groups */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
            
            {/* Category Chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 uppercase font-mono mr-1.5 hidden sm:inline">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.click();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Difficulty & Status Chips */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-1 sm:pb-0">
              {/* Difficulty */}
              <div className="flex items-center space-x-1">
                <span className="text-xs font-semibold text-slate-400 uppercase font-mono mr-1 hidden sm:inline">Tier:</span>
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      sounds.click();
                      setSelectedDifficulty(diff);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      selectedDifficulty === diff
                        ? diff === 'Easy' ? 'bg-emerald-600 text-white' :
                          diff === 'Medium' ? 'bg-amber-600 text-white' :
                          diff === 'Hard' ? 'bg-rose-600 text-white' :
                          'bg-slate-700 text-white'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center space-x-1 border-l border-slate-800 pl-3">
                {['All', 'Available', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      sounds.click();
                      setSelectedStatus(status);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      selectedStatus === status
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
