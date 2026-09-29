# Git Club CHARUSAT — Challenge Arena ⚔️
> **Problem Statement 4:** Learn by Building — Gamified Community Platform  
> **Built for:** Git Club CHARUSAT Website Challenge

---

## 🚀 Live Demo & Deployment
- **Deployment Platform**: Vercel / Netlify / GitHub Pages
- **Build Status**: ✅ Production Ready (0 Errors, 0 Warnings)

### Instant Local Run:
```bash
# 1. Enter project directory
cd gitclub-challenge-arena

# 2. Run local development server
npm run dev
```

### Instant 1-Click Production Build:
```bash
npm run build
```
The output will be placed cleanly into `dist/` ready to be hosted anywhere.

---

## 🎯 Features Checklist (Problem Statement 4)

- [x] **Git Club CHARUSAT Navigation**: Live season status pill ("Season 1 Active • 420+ Members"), audio synthesizer toggle, dynamic streak & XP counters.
- [x] **Sprint Countdown & Hero**: Interactive weekly sprint countdown timer (`03d : 14h : 22m`), real-time debounced search, category filter chips (Git & GitHub, Frontend, Algorithmic, System Design), tier filters, and status filters.
- [x] **Simulated Sandbox & Workspace**:
  - Problem Context, Objective, Constraints & Mentor Hints.
  - Interactive file code editor with quick copy and reset.
  - Simulated Git terminal with live prompt `gitclub@charusat:~$`.
  - One-click suggested Git commands (`$ git status`, `$ git add ...`, `$ git commit ...`).
  - Automated step-by-step test runner panel with async assertion checks.
  - Celebration confetti blast 🎉, XP award toasts, sound effects chime, and dynamic leaderboard rank elevation!
  - **"Demo Auto-Solve" button** for instant seamless demonstration during the 5-minute video presentation.
- [x] **Daily Habit Quest**: Streak multiplier reward with daily Git trivia.
- [x] **Campus Leaderboard**:
  - 3D Podium for Top 3 (1st Gold Champion, 2nd Silver, 3rd Bronze).
  - Searchable standings table with filters by department (CSPIT-CSE, DEPSTAR-IT, CSPIT-CE, CMPICA) and academic year.
  - Live "Top 5%" position tracker.
- [x] **Git Cheatsheet Modal**: Searchable reference of 20+ everyday Git workflows with 1-click clipboard copy.
- [x] **Propose Community Challenge**: Dynamic form allowing participants to contribute new challenges (no hardcoded limits).
- [x] **Student Profile Modal**: Customize name, CHARUSAT ID, department, year, view earned badges, and reset test progress.
- [x] **Tactile Web Audio Feedback**: Built-in Web Audio API synthesizer for clicks, test checks, errors, and victory fanfares (with mute toggle, 0 external audio dependencies).

---

## 📹 5–6 Minute Video Structure & Checklist

> ⚠️ **Compulsory Video File Name Format:**  
> `ID_Name_phone number`  
> *Example:* `24CS084_Om_Rashiya_9876543210.mp4`

| Timestamp | Screen Action & Script Guidance |
| :--- | :--- |
| **0:00 – 0:30** | Introduce your Name, Student ID (e.g. 24CS084), Branch, and state: *"I was assigned Problem Statement 4: Git Club Challenge Arena."* |
| **0:30 – 1:30** | Explain problem context: *"Most student clubs struggle with passive workshops. Git Club Challenge Arena gamifies learning with interactive simulated Git scenarios, instant test feedback, and campus leaderboards."* |
| **1:30 – 3:30** | **Live Interactive Flow**: <br>1. Explore the Sprint Hero & filters.<br>2. Launch *"Merge Conflict Mayhem"* or *"Portal Regex Validator"*.<br>3. Walk through the problem spec, click **Demo Auto-Solve**.<br>4. Run the automated test runner — show the test assertions passing, sound effect, celebratory confetti, and XP toast! |
| **3:30 – 4:30** | **Leaderboard & Community Features**: <br>1. Show how your rank and XP updated in real-time.<br>2. Filter by department (CSPIT vs DEPSTAR) and year.<br>3. Open Git Cheatsheet & Club Rules modals. |
| **4:30 – 5:30** | **Responsiveness & Design Polish**: <br>Toggle Chrome DevTools mobile view to demonstrate seamless mobile responsiveness.<br>Show Propose Challenge modal to prove data is dynamic. |
| **5:30 – 6:00** | **Future Vision**: Mention adding GitHub Webhook integration for automatic grading of live Pull Requests on GitHub. |

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Dark Developer Experience / Linear Theme)
- **Icons**: Lucide React
- **Celebrations**: Canvas Confetti
- **Audio Synthesizer**: Native HTML5 Web Audio API
- **Persistence**: Browser `localStorage` (Offline-first, instant reload persistence)
