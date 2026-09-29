import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DailyQuest } from './components/DailyQuest';
import { ChallengeCard } from './components/ChallengeCard';
import { ChallengeModal } from './components/ChallengeModal';
import { Leaderboard } from './components/Leaderboard';
import { GitCheatsheetModal } from './components/GitCheatsheetModal';
import { ClubRulesModal } from './components/ClubRulesModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SubmitCustomChallengeModal } from './components/SubmitCustomChallengeModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { storageService } from './services/storageService';
import { sounds } from './services/soundEffects';
import { Sparkles, Terminal, Code2, Layers, AlertCircle, RefreshCw } from 'lucide-react';

export function App() {
  // Core Persistent State
  const [user, setUser] = useState(() => storageService.getUser());
  const [challenges, setChallenges] = useState(() => storageService.getChallenges());
  const [leaderboard, setLeaderboard] = useState(() => storageService.getLeaderboard());
  const [audioMuted, setAudioMuted] = useState(() => storageService.getAudioMuted());

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals State
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewChallengeOpen, setIsNewChallengeOpen] = useState(false);

  // Floating Toast State
  const [toast, setToast] = useState(null);

  // Initialize sounds mute state
  useEffect(() => {
    sounds.setMuted(audioMuted);
  }, [audioMuted]);

  // Sync leaderboard when user changes
  useEffect(() => {
    setLeaderboard(storageService.getLeaderboard());
  }, [user]);

  // Audio Toggle
  const handleToggleAudio = () => {
    const nextState = !audioMuted;
    setAudioMuted(nextState);
    storageService.setAudioMuted(nextState);
    sounds.setMuted(nextState);
  };

  // Trigger Toast Notification helper
  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Complete Challenge Handler
  const handleCompleteChallenge = (challengeId, xpGained) => {
    const updatedUser = storageService.completeChallenge(challengeId, xpGained);
    setUser({ ...updatedUser });
    setChallenges(storageService.getChallenges());
    showToast("Challenge Solved! 🎉", `+${xpGained} XP awarded! Leaderboard updated.`);
  };

  // Complete Daily Quest Handler
  const handleCompleteDailyQuest = (bonusXp) => {
    const updatedUser = {
      ...user,
      xp: user.xp + bonusXp,
      streak: user.streak + 1
    };
    storageService.saveUser(updatedUser);
    setUser(updatedUser);
    showToast("Daily Quest Completed! 🔥", `+${bonusXp} XP streak bonus added.`);
  };

  // Add Custom Challenge Handler
  const handleAddCustomChallenge = (newChallenge) => {
    const updated = storageService.addChallenge(newChallenge);
    setChallenges(updated);
    showToast("Challenge Published! 🚀", `"${newChallenge.title}" is now live in the Arena.`);
  };

  // Update User Profile Handler
  const handleUpdateUser = (updatedProfile) => {
    storageService.saveUser(updatedProfile);
    setUser(updatedProfile);
    showToast("Profile Saved! ✨", `Member ID ${updatedProfile.studentId} updated.`);
  };

  // Reset Progress Handler
  const handleResetProgress = () => {
    storageService.resetAll();
    setUser(storageService.getUser());
    setChallenges(storageService.getChallenges());
    setLeaderboard(storageService.getLeaderboard());
    showToast("Arena Reset 🔄", "All test data restored to factory state.");
  };

  // Filter Categories & Difficulties Lists
  const categories = ['All', 'Git & GitHub', 'Frontend', 'Algorithmic', 'System Design'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Filtered Challenges logic
  const filteredChallenges = challenges.filter(c => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const isSolved = user.solvedChallengeIds.includes(c.id);
    const matchesStatus = 
      selectedStatus === 'All' || 
      (selectedStatus === 'Completed' && isSolved) ||
      (selectedStatus === 'Available' && !isSolved);
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesDiff && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Top Fixed Navbar */}
      <Navbar 
        user={user}
        solvedCount={user.solvedChallengeIds.length}
        totalChallenges={challenges.length}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenNewChallenge={() => setIsNewChallengeOpen(true)}
        audioMuted={audioMuted}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section with Sprint Countdown & Filters */}
        <Hero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          categories={categories}
          difficulties={difficulties}
        />

        {/* Daily Quest Section */}
        <DailyQuest 
          user={user} 
          onCompleteDailyQuest={handleCompleteDailyQuest} 
        />

        {/* Challenges Arena Grid */}
        <section id="challenges" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Simulated Sandboxes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Active Sprint Challenges
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Showing {filteredChallenges.length} of {challenges.length} challenges based on current filters.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsNewChallengeOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 transition-colors"
              >
                <span>+ Propose Challenge</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={user.solvedChallengeIds.includes(challenge.id)}
                  onLaunch={(c) => setActiveChallenge(c)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400 mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No matching challenges found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                Try adjusting your search query, difficulty tier, or category filter to discover more challenges.
              </p>
              <button
                onClick={() => {
                  sounds.click();
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                  setSelectedStatus('All');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white inline-flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </section>

        {/* Campus Leaderboard Section */}
        <Leaderboard 
          leaderboard={leaderboard}
          currentUser={user}
        />

      </main>

      {/* Footer */}
      <Footer 
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
      />

      {/* Active Modals */}
      {activeChallenge && (
        <ChallengeModal 
          challenge={activeChallenge}
          isCompleted={user.solvedChallengeIds.includes(activeChallenge.id)}
          onClose={() => setActiveChallenge(null)}
          onComplete={handleCompleteChallenge}
        />
      )}

      {isCheatsheetOpen && (
        <GitCheatsheetModal 
          onClose={() => setIsCheatsheetOpen(false)} 
        />
      )}

      {isRulesOpen && (
        <ClubRulesModal 
          onClose={() => setIsRulesOpen(false)} 
        />
      )}

      {isProfileOpen && (
        <UserProfileModal 
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onUpdateUser={handleUpdateUser}
          onResetProgress={handleResetProgress}
        />
      )}

      {isNewChallengeOpen && (
        <SubmitCustomChallengeModal 
          onClose={() => setIsNewChallengeOpen(false)}
          onAddChallenge={handleAddCustomChallenge}
        />
      )}

      {/* Toast Notification */}
      <Toast 
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
export default App;
