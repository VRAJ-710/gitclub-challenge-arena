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
  X,
  GitBranch,
  GitCommit,
  Flame,
  Zap
} from 'lucide-react';
import { AcidSquares } from './AcidSquares';
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
    <div className="relative pt-8 pb-10 sm:pt-14 sm:pb-16 overflow-hidden border-b border-slate-800/80">
      
      {/* Dynamic Interactive WebGL Background */}
      <div className="absolute inset-0 w-full h-[650px] overflow-hidden pointer-events-auto opacity-75">
        <AcidSquares
          color1="#5227FF"
          color2="#F05032"
          color3="#FFFFFF"
          detail="medium"
          speed={0.65}
          waveDepth={1}
          zoom={1.25}
          density={9}
          glow={1.1}
          exposure={2600}
          spread={0.28}
          stepSize={0.002}
          colorShift={0}
          contrast={1.1}
          brightness={1.05}
          opacity={0.85}
          mouseInteraction={true}
          mouseStrength={0.14}
          mouseRadius={0.4}
          blur={0}
          grain={true}
          grainIntensity={0.04}
        />
        {/* Cinematic Vignette Overlay to ensure 100% contrast & readable typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/40 via-[#0A0D14]/20 to-[#0A0D14] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0D14]/50 to-[#0A0D14] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Top announcement pill & countdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-xs font-medium text-slate-200 backdrop-blur-xl shadow-lg shadow-purple-950/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-purple-300 font-bold font-mono tracking-wide">SPRINT #4 LIVE</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-sans">Git Tree & Open-Source Mastery</span>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 backdrop-blur-xl shadow-lg">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Sprint Closes in:</span>
            <span className="font-extrabold text-amber-400">
              {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        {/* Main Cinematic Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F05032]/10 border border-[#F05032]/30 text-[#F05032] text-xs font-mono font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Interactive Campus Code Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-sm">
            Master Git & Code Through{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-[#F05032] to-amber-300">
              Real Community Challenges
            </span>
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Solve simulated merge conflicts, interactive rebases, and algorithm puzzles designed by the Git Club CHARUSAT core team. Earn XP, rank on the campus leaderboard, and become open-source ready.
          </p>

          {/* Interactive Commit Node Badge */}
          <div className="mt-5 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300 backdrop-blur-xl shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-purple-400 font-bold">git log:</span>
            <span className="text-slate-400">7f83a1c (HEAD -&gt; main)</span>
            <span className="text-emerald-400 font-semibold">fix(merge): zero conflicts [PASS]</span>
          </div>

          {/* Quick Metrics highlight */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-slate-800/90 backdrop-blur-xl hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-center space-x-1.5 text-purple-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="font-extrabold text-xl text-white">420+</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono font-medium">CHARUSAT Solvers</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-slate-800/90 backdrop-blur-xl hover:border-[#F05032]/40 transition-colors">
              <div className="flex items-center justify-center space-x-1.5 text-[#F05032] mb-1">
                <GitPullRequest className="w-4 h-4" />
                <span className="font-extrabold text-xl text-white">1,840+</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono font-medium">Simulated PRs</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-slate-800/90 backdrop-blur-xl hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-center space-x-1.5 text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-extrabold text-xl text-white">99.4%</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono font-medium">AST Linter Rate</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-slate-800/90 backdrop-blur-xl hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-center space-x-1.5 text-amber-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="font-extrabold text-xl text-white">Top 10%</span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-mono font-medium">Core Club Swag</p>
            </div>
          </div>
        </div>

        {/* Search & Comprehensive Filters Glass Panel */}
        <div className="bg-[#111726]/90 border border-slate-700/80 rounded-2xl p-4 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/70">
          
          {/* Search Row */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges by title, tags (e.g. rebase, merge, regex, cherry-pick) or author..."
              className="w-full bg-[#080B12]/90 border border-slate-700/80 rounded-xl pl-12 pr-10 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  sounds.click();
                  setSearchQuery('');
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills Groups */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-slate-800">
            
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
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40 font-bold'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
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
                        ? diff === 'Easy' ? 'bg-emerald-600 text-white font-bold' :
                          diff === 'Medium' ? 'bg-amber-600 text-white font-bold' :
                          diff === 'Hard' ? 'bg-rose-600 text-white font-bold' :
                          'bg-slate-700 text-white font-bold'
                        : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
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
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
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
