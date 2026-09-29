import React from 'react';
import { GitBranch, Github, Linkedin, MessageSquare, ExternalLink, Heart, Shield, Terminal } from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function Footer({ onOpenRules, onOpenCheatsheet }) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#080B12] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F05032] to-purple-600 p-[2px]">
                <div className="w-full h-full bg-[#080B12] rounded-[6px] flex items-center justify-center">
                  <GitBranch className="w-4 h-4 text-[#F05032]" />
                </div>
              </div>
              <span className="font-bold text-white text-base">Git Club CHARUSAT</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Fostering open-source culture, version control mastery, and production-grade engineering across CSPIT, DEPSTAR & CMPICA institutes.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h4 className="font-mono uppercase font-bold text-white tracking-wider text-xs mb-3">Arena Modules</h4>
            <ul className="space-y-2">
              <li>
                <a href="#challenges" className="hover:text-purple-400 transition-colors">
                  Interactive Challenges
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="hover:text-purple-400 transition-colors">
                  Campus Leaderboard
                </a>
              </li>
              <li>
                <button onClick={() => { sounds.click(); onOpenCheatsheet(); }} className="hover:text-purple-400 transition-colors">
                  Git Command Cheatsheet
                </button>
              </li>
              <li>
                <button onClick={() => { sounds.click(); onOpenRules(); }} className="hover:text-purple-400 transition-colors">
                  Contest Rules & XP System
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: CHARUSAT Ecosystem */}
          <div>
            <h4 className="font-mono uppercase font-bold text-white tracking-wider text-xs mb-3">CHARUSAT Institutes</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>CSPIT — Chandubhai S. Patel Inst. of Tech</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>DEPSTAR — Devang Patel Inst. of Advance Tech</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>CMPICA — Inst. of Computer Applications</span>
              </li>
              <li className="pt-1">
                <a 
                  href="https://www.charusat.ac.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-purple-400 hover:text-purple-300 font-semibold"
                >
                  <span>charusat.ac.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Why Git Club */}
          <div>
            <h4 className="font-mono uppercase font-bold text-white tracking-wider text-xs mb-3">Why Git Club?</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              "We believe great software engineers are forged by doing, breaking, and resolving merge conflicts in real team repositories."
            </p>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 font-mono">
              <span className="text-emerald-400 font-bold">git status:</span> All systems operational for Season 1.
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © 2026 Git Club CHARUSAT. Built for the Website Challenge.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with passion for open source</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1 inline" />
            <span>at CHARUSAT Campus, Changa</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
