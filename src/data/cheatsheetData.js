export const GIT_CHEATSHEET = [
  {
    category: "Essential Setup & Config",
    items: [
      { cmd: 'git config --global user.name "Your Name"', desc: "Set your global commit author name" },
      { cmd: 'git config --global user.email "you@charusat.edu.in"', desc: "Set your global commit email address" },
      { cmd: "git init", desc: "Initialize a brand-new Git repository in current directory" },
      { cmd: "git clone <repo-url>", desc: "Download an existing repository along with its history" }
    ]
  },
  {
    category: "Day-to-Day Workflow",
    items: [
      { cmd: "git status", desc: "View the status of modified, staged, and untracked files" },
      { cmd: "git add .", desc: "Stage all changed files for the next commit" },
      { cmd: 'git commit -m "feat: description"', desc: "Commit staged snapshots with a descriptive message" },
      { cmd: "git diff", desc: "Show unstaged modifications compared to HEAD" },
      { cmd: "git log --oneline --graph --decorate", desc: "Visual one-line commit tree graph" }
    ]
  },
  {
    category: "Branching & Merging",
    items: [
      { cmd: "git branch", desc: "List all local branches (* denotes active branch)" },
      { cmd: "git checkout -b <branch-name>", desc: "Create and switch to a new branch in one command" },
      { cmd: "git switch <branch-name>", desc: "Modern syntax to switch to an existing branch" },
      { cmd: "git merge <branch-name>", desc: "Merge the specified branch into the current checked-out branch" },
      { cmd: "git branch -d <branch-name>", desc: "Safely delete a merged local branch" }
    ]
  },
  {
    category: "Undoing & Emergency Fixes",
    items: [
      { cmd: "git restore <file>", desc: "Discard unstaged modifications in working directory" },
      { cmd: "git restore --staged <file>", desc: "Unstage a file while retaining local edits" },
      { cmd: "git commit --amend --no-edit", desc: "Add newly staged changes to the previous commit without changing message" },
      { cmd: "git reset --soft HEAD~1", desc: "Undo last commit but keep changes staged" },
      { cmd: "git cherry-pick <commit-hash>", desc: "Apply a specific commit from another branch to current branch" }
    ]
  },
  {
    category: "Remote & Collaboration",
    items: [
      { cmd: "git remote -v", desc: "List all configured remote repositories" },
      { cmd: "git fetch origin", desc: "Download objects and refs from remote without merging" },
      { cmd: "git pull origin <branch>", desc: "Fetch and immediately integrate remote changes" },
      { cmd: "git push origin <branch>", desc: "Transmit local branch commits to the remote repository" }
    ]
  }
];

export const CLUB_RULES = {
  season: "Season 1 — Fall 2026",
  guidelines: [
    {
      title: "Fair Play & Clean Commits",
      desc: "All submissions must adhere to standard Git Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`)."
    },
    {
      title: "Streak Multiplier",
      desc: "Solve at least one challenge every 24 hours to maintain your streak. A 7-day streak awards a +15% XP multiplier on all active challenges."
    },
    {
      title: "Open Source Contribution",
      desc: "High-tier challenge solutions that solve real campus club issues will be automatically invited for a PR on the official Git Club CHARUSAT GitHub."
    },
    {
      title: "Zero Plagiarism Policy",
      desc: "Submissions undergo automated diff and AST analysis. Blatant copy-pasting may result in disqualification from the semester championship."
    }
  ],
  scoringSystem: [
    { difficulty: "Easy", xp: "80 - 120 XP", estTime: "10 mins" },
    { difficulty: "Medium", xp: "150 - 180 XP", estTime: "15 - 20 mins" },
    { difficulty: "Hard", xp: "220 - 300 XP", estTime: "25 - 30 mins" }
  ]
};
