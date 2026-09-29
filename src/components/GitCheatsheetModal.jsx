import React, { useState } from 'react';
import { X, Search, Copy, Check, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { GIT_CHEATSHEET } from '../data/cheatsheetData';
import { sounds } from '../services/soundEffects';

export function GitCheatsheetModal({ onClose }) {
  const [search, setSearch] = useState('');
  const [copiedCmd, setCopiedCmd] = useState('');

  const handleCopy = (cmd) => {
    sounds.click();
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  const filteredCategories = GIT_CHEATSHEET.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.cmd.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0D121F] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0A0D14]/90">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white">Git Club Command Cheatsheet</h3>
              <p className="text-xs text-slate-400 font-mono">Curated reference for CHARUSAT challenge solvers</p>
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

        {/* Search */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search command (e.g. cherry-pick, rebase, branch, stash)..."
              className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Commands List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {filteredCategories.map((cat) => (
            <div key={cat.category} className="space-y-2.5">
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-purple-400 flex items-center space-x-2">
                <span>{cat.category}</span>
                <span className="text-slate-600 text-[10px]">({cat.items.length})</span>
              </h4>

              <div className="space-y-2">
                {cat.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs font-semibold text-emerald-400">
                        {item.cmd}
                      </div>
                      <div className="text-xs text-slate-400">
                        {item.desc}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(item.cmd)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center space-x-1 shrink-0"
                    >
                      {copiedCmd === item.cmd ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#0A0D14]/90 flex justify-end">
          <button
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
          >
            Close Cheatsheet
          </button>
        </div>

      </div>
    </div>
  );
}
