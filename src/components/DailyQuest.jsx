import React, { useState } from 'react';
import { Flame, Sparkles, CheckCircle2, ArrowRight, Zap, Gift } from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function DailyQuest({ user, onCompleteDailyQuest }) {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    sounds.victory();
    setClaimed(true);
    if (onCompleteDailyQuest) {
      onCompleteDailyQuest(50);
    }
  };

  return (
    <section className="py-6 border-b border-slate-800/80 bg-gradient-to-r from-purple-950/20 via-[#0A0D14] to-amber-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-500/30 bg-[#0E1424]/90 p-5 sm:p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg shadow-black/30">
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Daily Habit Quest
                </span>
                <span className="text-xs text-slate-400 font-mono">Resets in 9h 37m</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                "Inspect the Reflog" — Recover an accidentally deleted branch
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Answer today's Git trivia or practice commit navigation to maintain your 🔥 {user.streak}d streak and earn a bonus +50 XP!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {claimed ? (
              <div className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>+50 XP Claimed!</span>
              </div>
            ) : (
              <button
                onClick={handleClaim}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Claim Daily Streak Bonus</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
