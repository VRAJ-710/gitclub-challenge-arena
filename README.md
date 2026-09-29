# Git Club CHARUSAT — Challenge Arena ⚔️
> **Problem Statement 4:** Learn by Building — Real-Time Gamified Community Platform  
> **Built for:** Git Club CHARUSAT Website Challenge

---

## 🚀 Live Working Website
🌐 **Live Deployed URL**: [https://marvelous-peony-649b13.netlify.app/](https://marvelous-peony-649b13.netlify.app/)  
📦 **GitHub Repository**: [https://github.com/VRAJ-710/gitclub-challenge-arena](https://github.com/VRAJ-710/gitclub-challenge-arena)  
- **Hosting Platform**: Netlify (Production CDN)
- **Build Status**: ✅ Production Ready (0 Errors, 0 Warnings)
- **Backend Architecture**: Express + Socket.IO (`server/`) with cross-tab and cloud real-time sync

### Running Frontend & Backend:
```bash
# Terminal 1: Run Real-Time Backend
npm run server

# Terminal 2: Run Frontend UI
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### Instant 1-Click Production Build (for Vercel/Netlify):
```bash
npm run build
```
The output is generated into `dist/` ready to be deployed. The app automatically connects via **Socket.IO** (when server is running) and features a zero-config real-time sync layer that works even across different browser tabs/windows without manual server deployment!

---

## 🎯 Features Checklist (Problem Statement 4)

- [x] **Real-Time Multiplayer Contest Arena**:
  - Live Contest Room (`#charusat-arena-2026`) with active connected solver counter.
  - Real-time **Live Activity Ticker** showing who submitted or solved which challenge in real-time.
  - Live **Reaction Bar**: Send emojis (`🔥`, `🚀`, `💻`, `🎉`, `⚡`) that float across the screen for everyone in the room!
  - Cross-tab & WebSocket sync so two people in separate browser windows or devices compete and see each other's rank update live!
- [x] **Full-Stack Express + Socket.IO Backend**:
  - Production server in `server/server.js` with REST API endpoints (`/api/leaderboard`, `/api/submissions`, `/api/users/sync`) and WebSocket event streams.
- [x] **WebGL AcidSquares Cinematic Background**:
  - GPU-accelerated interactive optical ripples with cursor interaction, dark theme vignette, and 100% WCAG contrast.
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
- [x] **Tactile Web Audio Feedback**: Built-in Web Audio API synthesizer for clicks, test checks, errors, and victory fanfares.

---

## 📹 5–6 Minute Video Structure & Checklist

> ⚠️ **Compulsory Video File Name Format:**  
> `ID_Name_phone number`  
> *Example:* `24CS084_Om_Rashiya_9876543210.mp4`

| Timestamp | Screen Action & Script Guidance |
| :--- | :--- |
| **0:00 – 0:30** | Introduce your Name, Student ID (e.g. 24CS084), Branch, and state: *"I was assigned Problem Statement 4: Git Club Challenge Arena."* |
| **0:30 – 1:30** | Explain problem context: *"Most student clubs struggle with passive workshops. Git Club Challenge Arena gamifies learning with interactive simulated Git scenarios, real-time multi-user contest rooms, and live campus leaderboards."* |
| **1:30 – 3:30** | **Live Interactive Flow**: <br>1. Open **two browser windows side-by-side** to show the real-time sync in action!<br>2. On Window 1: Launch *"Merge Conflict Mayhem"*, click **Demo Auto-Solve**, and run tests.<br>3. Watch the celebration confetti, and show Window 2 **immediately updating with the new solve activity and updated leaderboard rank**! |
| **3:30 – 4:30** | **Leaderboard & Real-Time Contest Lobby**: <br>1. Show the live reaction bar (`🔥`, `🚀`).<br>2. Filter leaderboard by department (`CSPIT` vs `DEPSTAR`) and year.<br>3. Open Git Cheatsheet & Club Rules modals. |
| **4:30 – 5:30** | **Responsiveness & Backend Architecture**: <br>1. Toggle Chrome DevTools mobile view to demonstrate seamless mobile responsiveness.<br>2. Show `server/server.js` explaining the Express + Socket.IO REST & WebSocket architecture. |
| **5:30 – 6:00** | **Future Vision**: Mention adding GitHub Webhook integration for automatic grading of live Pull Requests on GitHub. |

---

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + Lucide React + Canvas Confetti
- **WebGL Shader**: `ogl` + `AcidSquares` interactive background
- **Backend**: Node.js + Express + Socket.IO
- **Real-Time Sync**: WebSockets + dual BroadcastChannel mesh
- **Audio Synthesizer**: Native HTML5 Web Audio API
