import React, { useState } from 'react';
import { X, User, Flame, Zap, Award, RotateCcw, Save, Check } from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function UserProfileModal({ user, onClose, onUpdateUser, onResetProgress }) {
  const [name, setName] = useState(user.name);
  const [studentId, setStudentId] = useState(user.studentId);
  const [department, setDepartment] = useState(user.department);
  const [year, setYear] = useState(user.year);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    sounds.click();
    onUpdateUser({
      ...user,
      name,
      studentId,
      department,
      year,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name.replace(/\s+/g, '')}`
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0D121F] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0A0D14]/90">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <User className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white">Student Profile & Settings</h3>
              <p className="text-xs text-slate-400 font-mono">Git Club Member ID: {user.studentId}</p>
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

        {/* Profile Stats Overview */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 rounded-full border-2 border-purple-400 bg-purple-950/40 p-1"
            />
            <div>
              <h4 className="font-bold text-base text-white">{user.name}</h4>
              <p className="text-xs font-mono text-purple-300">{user.studentId} • {user.department}</p>
              <div className="flex items-center space-x-2 mt-1.5 text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center">
                  <Flame className="w-3.5 h-3.5 mr-0.5 fill-amber-400" /> {user.streak}d Streak
                </span>
                <span className="text-purple-400 font-bold flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-0.5 fill-purple-400" /> {user.xp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Badges List */}
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-1.5">Earned Badges:</span>
            <div className="flex flex-wrap gap-1.5">
              {user.badges.map((b) => (
                <span key={b} className="px-2.5 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center space-x-1">
                  <Award className="w-3 h-3 text-purple-400" />
                  <span>{b}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">CHARUSAT ID</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="24CS084"
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="CSPIT-CSE">CSPIT - Computer Science & Eng.</option>
              <option value="DEPSTAR-IT">DEPSTAR - Information Tech.</option>
              <option value="CSPIT-CE">CSPIT - Computer Engineering</option>
              <option value="DEPSTAR-CSE">DEPSTAR - Computer Science</option>
              <option value="CSPIT-AI">CSPIT - Artificial Intelligence</option>
              <option value="CMPICA-MCA">CMPICA - MCA & Computer Apps</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset all solved challenges and progress to clean state?")) {
                  sounds.click();
                  onResetProgress();
                  onClose();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Progress</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center space-x-1.5"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
