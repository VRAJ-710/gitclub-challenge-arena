import React from 'react';
import { 
  Terminal, 
  Clock, 
  Zap, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Code, 
  GitBranch, 
  Cpu, 
  Boxes,
  Sparkles
} from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function ChallengeCard({ challenge, isCompleted, onLaunch }) {
  // Category icon mapping
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Git & GitHub':
        return <GitBranch className="w-4 h-4 text-[#F05032]" />;
      case 'Frontend':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Algorithmic':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'System Design':
        return <Boxes className="w-4 h-4 text-emerald-400" />;
      default:
        return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  // Difficulty badge colors
  const getDifficultyStyles = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/25';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/25';
    }
  };

  return (
    <div 
      className={`group relative rounded-2xl bg-[#0D121F]/90 border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl backdrop-blur-xl ${
        isCompleted 
          ? 'border-emerald-500/40 hover:border-emerald-400/80 hover:shadow-emerald-950/30' 
          : 'border-slate-800/80 hover:border-purple-500/60 hover:shadow-purple-950/30'
      }`}
    >
      {/* Subtle glowing ambient back-layer */}
      <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm ${
        isCompleted ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20' : 'bg-gradient-to-r from-purple-600/25 via-[#F05032]/20 to-indigo-600/25'
      }`} />

      {/* Top row: Category tag & Status badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 text-xs font-medium text-slate-200">
          {getCategoryIcon(challenge.category)}
          <span>{challenge.category}</span>
        </div>

        {isCompleted ? (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Solved</span>
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-800">
            Available
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-2">
        {challenge.title}
      </h3>

      {/* Short Summary */}
      <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
        {challenge.summary}
      </p>

      {/* Meta Specs: Difficulty, XP, Time */}
      <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-[#080B12]/90 border border-slate-800/80 mb-4 text-xs font-mono">
        {/* Difficulty */}
        <div className="flex flex-col items-center justify-center border-r border-slate-800 pr-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Tier</span>
          <span className={`px-2 py-0.5 rounded-md font-semibold border ${getDifficultyStyles(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
        </div>

        {/* XP */}
        <div className="flex flex-col items-center justify-center border-r border-slate-800 px-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Reward</span>
          <span className="font-bold text-purple-400 flex items-center">
            <Zap className="w-3 h-3 mr-0.5 fill-purple-400" />
            +{challenge.xp} XP
          </span>
        </div>

        {/* Estimated Time */}
        <div className="flex flex-col items-center justify-center pl-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Est. Time</span>
          <span className="text-slate-300 flex items-center">
            <Clock className="w-3 h-3 mr-1 text-slate-400" />
            {challenge.timeEst}
          </span>
        </div>
      </div>

      {/* Tags list */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {challenge.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/60 text-slate-400 border border-slate-800">
            #{tag}
          </span>
        ))}
      </div>

      {/* Bottom Footer: Author & Launch Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <span className="text-xs text-slate-500 flex items-center truncate max-w-[130px]" title={`Author: ${challenge.author}`}>
          By {challenge.author}
        </span>

        <button
          onClick={() => {
            sounds.click();
            onLaunch(challenge);
          }}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
            isCompleted 
              ? 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 border border-slate-700' 
              : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 group-hover:scale-[1.03]'
          }`}
        >
          <span>{isCompleted ? 'Review Sandbox' : 'Launch Challenge'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
