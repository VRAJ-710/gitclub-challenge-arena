import { INITIAL_CHALLENGES } from '../data/challengesData';
import { INITIAL_LEADERBOARD, CURRENT_USER_DEFAULT } from '../data/leaderboardData';

const STORAGE_KEYS = {
  USER: 'gitclub_arena_user',
  CHALLENGES: 'gitclub_arena_challenges',
  LEADERBOARD: 'gitclub_arena_leaderboard',
  AUDIO_MUTED: 'gitclub_arena_audio_muted',
};

export const storageService = {
  // Load current user profile & progress
  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return CURRENT_USER_DEFAULT;
  },

  saveUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  },

  // Load all challenges (initial + user added)
  getChallenges() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CHALLENGES;
  },

  saveChallenges(challenges) {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
    } catch (e) {
      console.error(e);
    }
  },

  // Add custom challenge
  addChallenge(newChallenge) {
    const challenges = this.getChallenges();
    const updated = [newChallenge, ...challenges];
    this.saveChallenges(updated);
    return updated;
  },

  // Complete a challenge
  completeChallenge(challengeId, xpGained) {
    const user = this.getUser();
    if (!user.solvedChallengeIds.includes(challengeId)) {
      user.solvedChallengeIds.push(challengeId);
      user.xp += xpGained;
      user.streak = (user.streak || 0) + 1;

      // Unlock badges based on milestones
      if (user.solvedChallengeIds.length >= 2 && !user.badges.includes("Git Apprentice")) {
        user.badges.push("Git Apprentice");
      }
      if (user.solvedChallengeIds.length >= 4 && !user.badges.includes("Merge Specialist")) {
        user.badges.push("Merge Specialist");
      }
      if (user.xp >= 600 && !user.badges.includes("XP Collector")) {
        user.badges.push("XP Collector");
      }

      this.saveUser(user);

      // Increment solve count on challenge
      const challenges = this.getChallenges();
      const chIdx = challenges.findIndex(c => c.id === challengeId);
      if (chIdx !== -1) {
        challenges[chIdx].solvedCount = (challenges[chIdx].solvedCount || 0) + 1;
        this.saveChallenges(challenges);
      }
    }
    return user;
  },

  // Audio preference
  getAudioMuted() {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUDIO_MUTED) === 'true';
    } catch {
      return false;
    }
  },

  setAudioMuted(isMuted) {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIO_MUTED, isMuted ? 'true' : 'false');
    } catch {}
  },

  // Leaderboard with user injected
  getLeaderboard() {
    const user = this.getUser();
    let board = [...INITIAL_LEADERBOARD];

    const userEntry = {
      rank: 0,
      name: `${user.name} (You)`,
      studentId: user.studentId,
      department: user.department,
      year: user.year,
      xp: user.xp,
      streak: user.streak,
      solves: user.solvedChallengeIds.length,
      avatar: user.avatar,
      badges: user.badges,
      isCurrentUser: true
    };

    board.push(userEntry);
    board.sort((a, b) => b.xp - a.xp);
    board = board.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    return board;
  },

  // Reset to default for testing
  resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.CHALLENGES);
      localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    } catch {}
  }
};
