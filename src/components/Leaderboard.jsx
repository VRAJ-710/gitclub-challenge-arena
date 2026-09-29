import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame, 
  Zap, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Filter,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function Leaderboard({ leaderboard, currentUser }) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchMember, setSearchMember] = useState('');

  // Department filters
  const departments = ['All', 'CSPIT-CSE', 'DEPSTAR-IT', 'CSPIT-CE', 'DEPSTAR-CSE', 'CSPIT-AI', 'CMPICA-MCA'];
  const years = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  // Filter leaderboard
  const filteredBoard = leaderboard.filter(item => {
    const matchesDept = selectedDept === 'All' || item.department === selectedDept;
    const matchesYear = selectedYear === 'All' || item.year === selectedYear;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchMember.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchMember.toLowerCase());
    return matchesDept && matchesYear && matchesSearch;
  });

  // Top 3 for podium (from the global list)
  const topThree = leaderboard.slice(0, 3);
  const currentUserRank = leaderboard.find(item => item.isCurrentUser)?.rank || 4;

  return (
    <section id="leaderboard" className="py-12 sm:py-16 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Campus Standings</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              CHARUSAT Arena Leaderboard
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Real-time rankings based on Git challenges solved, streaks maintained, and AST evaluation accuracy.
            </p>
          </div>

          {/* User Rank Indicator Card */}
          <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-extrabold text-lg">
              #{currentUserRank}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-white">Your Rank: #{currentUserRank}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Top 5%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {currentUser.xp} XP • {currentUser.solvedChallengeIds.length} Solved • 🔥 {currentUser.streak}d Streak
              </p>
            </div>
          </div>
        </div>

        {/* Podium for Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12 items-end">
          
          {/* 2nd Place (Silver) */}
          {topThree[1] && (
            <div className="order-2 md:order-1 relative rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/90 border border-slate-700/60 p-6 text-center shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-300 border-2 border-slate-100 flex items-center justify-center text-slate-900 font-black text-xs shadow-lg">
                2
              </div>
              <img 
                src={topThree[1].avatar} 
                alt={topThree[1].name} 
                className="w-20 h-20 mx-auto rounded-full border-2 border-slate-300 bg-slate-800 p-1 mb-3"
              />
              <h3 className="font-bold text-lg text-white">{topThree[1].name}</h3>
              <p className="text-xs font-mono text-slate-400 mb-2">{topThree[1].studentId} • {topThree[1].department}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                  {topThree[1].xp} XP
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold flex items-center">
                  <Flame className="w-3 h-3 mr-1 fill-amber-400" /> {topThree[1].streak}d
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-1">
                {topThree[1].badges.map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 1st Place (Gold Champion) */}
          {topThree[0] && (
            <div className="order-1 md:order-2 relative rounded-2xl bg-gradient-to-b from-amber-950/40 via-purple-950/30 to-slate-900 border-2 border-amber-500/60 p-7 text-center shadow-2xl shadow-amber-500/10 md:-translate-y-3">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 border-2 border-amber-200 flex items-center justify-center text-slate-950 font-black text-sm shadow-xl animate-bounce">
                <Crown className="w-5 h-5 text-amber-950 fill-amber-950" />
              </div>
              <img 
                src={topThree[0].avatar} 
                alt={topThree[0].name} 
                className="w-24 h-24 mx-auto rounded-full border-4 border-amber-400 bg-amber-950/50 p-1 mb-3 shadow-lg shadow-amber-500/20"
              />
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
                Sprint Leader
              </div>
              <h3 className="font-extrabold text-xl text-white">{topThree[0].name}</h3>
              <p className="text-xs font-mono text-slate-300 mb-3">{topThree[0].studentId} • {topThree[0].department}</p>
              
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm font-mono font-extrabold">
                  {topThree[0].xp} XP
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center">
                  <Flame className="w-3.5 h-3.5 mr-1 fill-amber-400" /> {topThree[0].streak}d Streak
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5">
                {topThree[0].badges.map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200 font-semibold">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3rd Place (Bronze) */}
          {topThree[2] && (
            <div className="order-3 relative rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/90 border border-amber-800/40 p-6 text-center shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-700 border-2 border-amber-600 flex items-center justify-center text-white font-black text-xs shadow-lg">
                3
              </div>
              <img 
                src={topThree[2].avatar} 
                alt={topThree[2].name} 
                className="w-20 h-20 mx-auto rounded-full border-2 border-amber-700 bg-slate-800 p-1 mb-3"
              />
              <h3 className="font-bold text-lg text-white">{topThree[2].name}</h3>
              <p className="text-xs font-mono text-slate-400 mb-2">{topThree[2].studentId} • {topThree[2].department}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                  {topThree[2].xp} XP
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold flex items-center">
                  <Flame className="w-3 h-3 mr-1 fill-amber-400" /> {topThree[2].streak}d
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-1">
                {topThree[2].badges.map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Filter Controls Row */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-6 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search filter */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                placeholder="Search by student name or CHARUSAT ID..."
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Department chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-mono text-slate-400 uppercase hidden lg:inline">Dept:</span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => {
                    sounds.click();
                    setSelectedDept(dept);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedDept === dept
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Year selector */}
            <div className="flex items-center space-x-1">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    sounds.click();
                    setSelectedYear(year);
                  }}
                  className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedYear === year
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Leaderboard Table View */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0A0D14]/90 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 text-center w-16">Rank</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Department & Year</th>
                  <th className="py-3.5 px-4 text-center">Solves</th>
                  <th className="py-3.5 px-4 text-center">Streak</th>
                  <th className="py-3.5 px-4 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {filteredBoard.map((student) => (
                  <tr 
                    key={student.studentId}
                    className={`transition-colors ${
                      student.isCurrentUser
                        ? 'bg-purple-950/30 hover:bg-purple-900/30 border-l-4 border-l-purple-500'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-bold">
                      {student.rank === 1 ? '🥇' :
                       student.rank === 2 ? '🥈' :
                       student.rank === 3 ? '🥉' :
                       `#${student.rank}`}
                    </td>

                    {/* Student Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700" 
                        />
                        <div>
                          <div className="font-sans font-bold text-white flex items-center space-x-1.5">
                            <span>{student.name}</span>
                            {student.isCurrentUser && (
                              <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">{student.studentId}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department & Year */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{student.department}</div>
                      <div className="text-[11px] text-slate-500">{student.year}</div>
                    </td>

                    {/* Solves */}
                    <td className="py-3.5 px-4 text-center font-semibold text-emerald-400">
                      {student.solves}
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center text-amber-400 font-semibold">
                      🔥 {student.streak}d
                    </td>

                    {/* Total XP */}
                    <td className="py-3.5 px-4 text-right font-extrabold text-purple-400 text-sm">
                      {student.xp.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
