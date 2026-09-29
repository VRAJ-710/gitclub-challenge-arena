import React from 'react';
import { Zap, CheckCircle2, Award, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-900/90 to-indigo-950/90 border border-purple-500/40 shadow-2xl backdrop-blur-xl text-white text-xs animate-bounce">
      <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
        <Zap className="w-4 h-4 fill-purple-400" />
      </div>
      <div>
        <h5 className="font-bold text-white">{toast.title}</h5>
        <p className="text-slate-300 text-[11px] font-mono">{toast.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white ml-2"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
