import React from 'react';
import { X, ShieldCheck, Award, Zap, GitPullRequest, AlertCircle } from 'lucide-react';
import { CLUB_RULES } from '../data/cheatsheetData';
import { sounds } from '../services/soundEffects';

export function ClubRulesModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D121F] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0A0D14]/90">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white">Git Club Arena Rules & Scoring</h3>
              <p className="text-xs text-slate-400 font-mono">{CLUB_RULES.season} Guidelines</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm text-slate-300">
          
          {/* Scoring Matrix */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-emerald-400 mb-3 flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>XP Scoring Matrix</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {CLUB_RULES.scoringSystem.map((tier) => (
                <div key={tier.difficulty} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="font-bold text-white mb-0.5">{tier.difficulty}</div>
                  <div className="text-xs font-mono text-purple-400 font-semibold">{tier.xp}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">Est. {tier.estTime}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-purple-400 mb-3 flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Community Regulations</span>
            </h4>
            <div className="space-y-3">
              {CLUB_RULES.guidelines.map((rule, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white text-xs flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>{rule.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-3.5">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real PR Badge Notice */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start space-x-3">
            <GitPullRequest className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-bold text-white block mb-0.5">Top Solvers Open-Source Pathway</span>
              Students who place in the campus Top 10% gain direct contributor access to official CHARUSAT community repositories and fast-track invitations to the Git Club Hackathon Core Team.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#0A0D14]/90 flex justify-end">
          <button
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
          >
            I Understand the Rules
          </button>
        </div>

      </div>
    </div>
  );
}
