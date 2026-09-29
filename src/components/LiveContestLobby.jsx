import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Users, 
  Zap, 
  Flame, 
  MessageSquare, 
  Share2, 
  Check, 
  Sparkles, 
  Wifi, 
  WifiOff, 
  Send,
  Trophy,
  Activity
} from 'lucide-react';
import { realtimeService } from '../services/realtimeService';
import { sounds } from '../services/soundEffects';

export function LiveContestLobby({ user, onQuickLaunchChallenge }) {
  const [roomId, setRoomId] = useState('charusat-arena-2026');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeUsersCount, setActiveUsersCount] = useState(4);
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, user: "Drashti Shah (DEPSTAR)", text: "solved Interactive Rebase Mastery (+220 XP)", time: "Just now" },
    { id: 2, user: "Meet Prajapati (CSPIT)", text: "started Cherry-Pick Hotfix challenge", time: "1m ago" },
    { id: 3, user: "Harshil Vora (CSPIT)", text: "unlocked '10-Day Streak' badge 🔥", time: "3m ago" }
  ]);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    // Join room on mount
    realtimeService.joinRoom(roomId, user);

    // Listen for connection status
    const unsubStatus = realtimeService.on('status', (isConnected) => {
      setBackendConnected(isConnected);
    });

    // Listen for submissions from other users
    const unsubSubmissions = realtimeService.on('submissions', (data) => {
      sounds.check();
      const newActivity = {
        id: Date.now(),
        user: data.user?.name || data.studentId || "A Solver",
        text: `solved ${data.challengeTitle || 'a challenge'} (+${data.xpGained || 150} XP)`,
        time: "Just now"
      };
      setRecentActivities(prev => [newActivity, ...prev.slice(0, 5)]);
    });

    // Listen for reactions
    const unsubReactions = realtimeService.on('reactions', (data) => {
      sounds.click();
      const newReaction = {
        id: Math.random(),
        emoji: data.emoji,
        user: data.user?.name || "Player"
      };
      setFloatingReactions(prev => [...prev, newReaction]);
      setTimeout(() => {
        setFloatingReactions(prev => prev.filter(r => r.id !== newReaction.id));
      }, 2500);
    });

    return () => {
      unsubStatus();
      unsubSubmissions();
      unsubReactions();
    };
  }, [roomId, user]);

  const handleSendReaction = (emoji) => {
    sounds.click();
    realtimeService.sendReaction(emoji, user);
  };

  const handleCopyInvite = () => {
    sounds.click();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Floating Reactions Overlay */}
      <div className="fixed bottom-12 right-12 pointer-events-none z-50 flex flex-col space-y-2">
        {floatingReactions.map((r) => (
          <div key={r.id} className="animate-bounce bg-slate-900/90 border border-purple-500/40 text-sm px-3 py-1.5 rounded-full shadow-2xl flex items-center space-x-2 text-white">
            <span className="text-xl">{r.emoji}</span>
            <span className="text-xs font-mono text-purple-300">{r.user}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-[#111726]/95 via-[#0D121F]/90 to-[#111726]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl shadow-purple-950/20">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Radio className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A0D14] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A0D14]" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-white text-base sm:text-lg">
                  Live Campus Race Arena
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Room: <span className="text-purple-300 font-bold">#{roomId}</span> • Real-time WebSocket & Mesh Sync
              </p>
            </div>
          </div>

          {/* Room Controls & Competitors Count */}
          <div className="flex items-center space-x-2.5">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>{activeUsersCount} Solvers Connected</span>
            </div>

            <button
              onClick={handleCopyInvite}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Invite Friend to Race'}</span>
            </button>
          </div>

        </div>

        {/* Live Contest Activity Ticker & Real-time Reactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 items-center">
          
          {/* Ticker Feed */}
          <div className="md:col-span-2 flex items-center space-x-3 overflow-hidden">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-400 shrink-0 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Live Feed:</span>
            </div>

            <div className="flex-1 overflow-x-auto scrollbar-none whitespace-nowrap py-1">
              <div className="inline-flex space-x-3 text-xs font-mono">
                {recentActivities.map((act) => (
                  <div key={act.id} className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-white">{act.user}</span>
                    <span className="text-slate-400">{act.text}</span>
                    <span className="text-slate-600 text-[10px]">({act.time})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Reactions Bar */}
          <div className="flex items-center justify-end space-x-1.5">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">React:</span>
            {['🔥', '🚀', '💻', '🎉', '⚡'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendReaction(emoji)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 flex items-center justify-center text-sm transition-transform hover:scale-125"
                title={`Send ${emoji} reaction to all competitors`}
              >
                {emoji}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
