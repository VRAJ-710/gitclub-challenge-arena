export const INITIAL_CHALLENGES = [
  {
    id: "git-01",
    title: "Merge Conflict Mayhem",
    slug: "merge-conflict-mayhem",
    category: "Git & GitHub",
    difficulty: "Medium",
    xp: 150,
    timeEst: "15 mins",
    solvedCount: 142,
    tags: ["git-merge", "conflict-resolution", "git-status"],
    author: "Git Club CHARUSAT Core",
    summary: "Two developers committed changes to the same `navbar.config.js` file on `main` and `feature/dark-mode`. Safely resolve the conflicting markers without losing either feature.",
    description: `### Context
During the Git Club CHARUSAT website overhaul, Dev A updated the header navigation links while Dev B simultaneously overhauled the theme toggle buttons inside \`navbar.config.js\`.

When attempting to run \`git merge feature/dark-mode\`, Git threw a merge conflict:
\`\`\`bash
CONFLICT (content): Merge conflict in navbar.config.js
Automatic merge failed; fix conflicts and then commit the result.
\`\`\`

### Objective
1. Inspect the conflicting markers (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`).
2. Keep **both** the new \`events\` navigation link from \`main\` AND the new \`themeToggle: true\` config from \`feature/dark-mode\`.
3. Stage the resolved file with \`git add navbar.config.js\`.
4. Create the final merge commit: \`git commit -m "resolve: merge dark-mode nav"\`.`,
    hints: [
      "Use `git status` to identify unresolved paths.",
      "Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).",
      "Combine the changes into a valid syntax object before committing."
    ],
    initialFiles: {
      "navbar.config.js": `// Git Club CHARUSAT Nav Config
export const navConfig = {
<<<<<<< HEAD
  links: ["Home", "Challenges", "Leaderboard", "Events"],
  version: "2.1.0"
=======
  links: ["Home", "Challenges", "Leaderboard"],
  themeToggle: true,
  version: "2.2.0"
>>>>>>> feature/dark-mode
};`
    },
    solutionExample: `// Git Club CHARUSAT Nav Config
export const navConfig = {
  links: ["Home", "Challenges", "Leaderboard", "Events"],
  themeToggle: true,
  version: "2.2.0"
};`,
    suggestedCommands: [
      "git status",
      "git add navbar.config.js",
      'git commit -m "resolve: merge dark-mode nav"'
    ],
    tests: [
      { id: "t1", name: "No conflict markers remain in codebase", validate: (content) => !content.includes("<<<<<<<") && !content.includes(">>>>>>>") && !content.includes("=======") },
      { id: "t2", name: "Includes 'Events' link from main branch", validate: (content) => content.includes('"Events"') },
      { id: "t3", name: "Includes 'themeToggle: true' from feature branch", validate: (content) => content.includes("themeToggle: true") },
      { id: "t4", name: "Valid JavaScript configuration export", validate: (content) => content.includes("export const navConfig") }
    ]
  },
  {
    id: "git-02",
    title: "Interactive Rebase Mastery",
    slug: "interactive-rebase-mastery",
    category: "Git & GitHub",
    difficulty: "Hard",
    xp: 220,
    timeEst: "20 mins",
    solvedCount: 88,
    tags: ["git-rebase", "squash-commits", "clean-history"],
    author: "Keval Patel (DEPSTAR-IT)",
    summary: "Clean up a messy pull request with 4 sloppy WIP commits into a single atomic conventional commit before merging to the upstream repository.",
    description: `### Context
A contributor submitted a Pull Request to the Git Club open-source portal with messages like:
- \`wip fix navbar\`
- \`typo fix\`
- \`forgot semicolon\`
- \`cleanup console.log\`

The Git Club CHARUSAT contribution policy requires all feature branches to be squashed into clean conventional commits prior to PR review.

### Objective
1. Use interactive rebase to squash the last 3 WIP commits into the base commit.
2. Formulate a clean commit message: \`feat(ui): implement responsive navbar and cleanup debugging\`.
3. Verify your Git graph has exactly one atomic commit ahead of main.`,
    hints: [
      "Remember that 'pick' retains a commit, while 'squash' (or 's') melds it into the preceding commit.",
      "Always verify with `git log --oneline` after rebasing."
    ],
    initialFiles: {
      "git-rebase-todo.txt": `pick 7f4a21d feat(ui): initial navbar structure
pick 3a91b0c wip fix navbar styling
pick 9e24f81 typo fix
pick 4b82c10 cleanup console.log`
    },
    solutionExample: `pick 7f4a21d feat(ui): implement responsive navbar and cleanup debugging
squash 3a91b0c wip fix navbar styling
squash 9e24f81 typo fix
squash 4b82c10 cleanup console.log`,
    suggestedCommands: [
      "git rebase -i HEAD~4",
      "git status",
      'git log --oneline -n 3'
    ],
    tests: [
      { id: "t1", name: "Base commit retained with pick instruction", validate: (content) => content.trim().startsWith("pick") },
      { id: "t2", name: "Subsequent commits set to squash or fixup", validate: (content) => (content.match(/squash|fixup|s|f/g) || []).length >= 3 },
      { id: "t3", name: "Conventional commit format followed", validate: (content) => content.includes("feat(ui):") }
    ]
  },
  {
    id: "web-01",
    title: "CHARUSAT Portal Regex Validator",
    slug: "charusat-portal-regex-validator",
    category: "Frontend",
    difficulty: "Easy",
    xp: 100,
    timeEst: "10 mins",
    solvedCount: 236,
    tags: ["regex", "charusat-id", "validation"],
    author: "Riya Shah (CSPIT-CE)",
    summary: "Write a strict regular expression to validate official CHARUSAT Student IDs (e.g. 24CS084, 23IT102, 22CE001) for the event registration system.",
    description: `### Context
The Git Club registration kiosk needs to restrict event registration solely to verified CHARUSAT students. Valid student IDs follow the format:
- 2 digits for Admission Year (e.g. \`21\` to \`26\`)
- 2 uppercase department letters (\`CS\`, \`IT\`, \`CE\`, \`EC\`, \`AI\`)
- 3 digits for Roll Number (e.g. \`001\` through \`999\`)

### Examples
- \`24CS084\` -> **Valid**
- \`23IT102\` -> **Valid**
- \`20CE00\` -> **Invalid** (Only 2 digits in roll number)
- \`24cs084\` -> **Invalid** (Must be uppercase)

### Objective
Complete the \`validateCharusatId\` function using a precise regular expression.`,
    hints: [
      "Use `^` and `$` to anchor the full string.",
      "Admission year can be represented by `^(2[1-6])`.",
      "Department codes can be an alternation `(CS|IT|CE|EC|AI)`."
    ],
    initialFiles: {
      "validator.js": `// CHARUSAT Student ID Validator
export function validateCharusatId(studentId) {
  // TODO: Replace with your regex pattern
  const pattern = /YOUR_REGEX_HERE/;
  return pattern.test(studentId);
}`
    },
    solutionExample: `// CHARUSAT Student ID Validator
export function validateCharusatId(studentId) {
  const pattern = /^(2[1-6])(CS|IT|CE|EC|AI)[0-9]{3}$/;
  return pattern.test(studentId);
}`,
    suggestedCommands: [
      "node test-validator.js",
      "npm test"
    ],
    tests: [
      { id: "t1", name: "Validates 24CS084 as TRUE", validate: (content) => {
        try {
          const match = content.match(/pattern\s*=\s*\/(.*?)\/([a-z]*)/);
          if (!match) return false;
          const re = new RegExp(match[1], match[2]);
          return re.test("24CS084");
        } catch { return false; }
      }},
      { id: "t2", name: "Validates 23IT102 as TRUE", validate: (content) => {
        try {
          const match = content.match(/pattern\s*=\s*\/(.*?)\/([a-z]*)/);
          if (!match) return false;
          const re = new RegExp(match[1], match[2]);
          return re.test("23IT102");
        } catch { return false; }
      }},
      { id: "t3", name: "Rejects lowercase 24cs084", validate: (content) => {
        try {
          const match = content.match(/pattern\s*=\s*\/(.*?)\/([a-z]*)/);
          if (!match) return false;
          const re = new RegExp(match[1], match[2]);
          return !re.test("24cs084");
        } catch { return false; }
      }},
      { id: "t4", name: "Rejects invalid roll number length 24CS08", validate: (content) => {
        try {
          const match = content.match(/pattern\s*=\s*\/(.*?)\/([a-z]*)/);
          if (!match) return false;
          const re = new RegExp(match[1], match[2]);
          return !re.test("24CS08");
        } catch { return false; }
      }}
    ]
  },
  {
    id: "git-03",
    title: "Cherry-Pick Emergency Hotfix",
    slug: "cherry-pick-emergency-hotfix",
    category: "Git & GitHub",
    difficulty: "Medium",
    xp: 160,
    timeEst: "15 mins",
    solvedCount: 110,
    tags: ["git-cherry-pick", "hotfix", "production-deploy"],
    author: "Aakash Mehta (CSPIT-IT)",
    summary: "Production website crashed due to a bad payment webhook. Apply only the single critical hotfix commit `c48e91f` from `staging` directly into `production`.",
    description: `### Context
The annual Git Club Hackathon registration is live, but production is dropping webhook confirmations.
A club mentor fixed the exact bug in commit \`c48e91f\` on branch \`staging\`.
However, \`staging\` contains 12 other unverified experimental features that CANNOT be merged into production right now.

### Objective
1. Switch to \`production\` branch.
2. Cherry-pick only commit \`c48e91f\`.
3. Push the hotfix to remote origin.`,
    hints: [
      "`git cherry-pick <commit-hash>` applies the changes introduced by that exact commit.",
      "Ensure you switch to the target branch first with `git checkout production`."
    ],
    initialFiles: {
      "deploy-script.sh": `#!/bin/bash
# Emergency Production Hotfix Script
# Step 1: Switch to production
git checkout production

# Step 2: Apply the critical commit from staging
# TARGET_COMMIT=c48e91f
# TODO: Add cherry-pick command here

# Step 3: Verify and push
git log -1 --stat
git push origin production`
    },
    solutionExample: `#!/bin/bash
# Emergency Production Hotfix Script
git checkout production
git cherry-pick c48e91f
git log -1 --stat
git push origin production`,
    suggestedCommands: [
      "git checkout production",
      "git cherry-pick c48e91f",
      "git status"
    ],
    tests: [
      { id: "t1", name: "Switches to production branch", validate: (content) => content.includes("git checkout production") },
      { id: "t2", name: "Applies commit c48e91f with cherry-pick", validate: (content) => content.includes("git cherry-pick c48e91f") },
      { id: "t3", name: "Pushes hotfix to remote origin", validate: (content) => content.includes("git push origin production") }
    ]
  },
  {
    id: "algo-01",
    title: "Git Commit Tree DAG Traversal",
    slug: "git-commit-tree-dag-traversal",
    category: "Algorithmic",
    difficulty: "Hard",
    xp: 250,
    timeEst: "25 mins",
    solvedCount: 64,
    tags: ["graphs", "dag", "lowest-common-ancestor"],
    author: "Dr. Dave (Club Mentor)",
    summary: "Implement the algorithm Git uses under the hood to find the Lowest Common Ancestor (merge-base) of two divergent branch pointers.",
    description: `### Context
Underneath the CLI, Git is a Directed Acyclic Graph (DAG) of commit objects, where every commit points backward to its parents.
When merging two branches, Git determines the \`merge-base\` by finding the Lowest Common Ancestor (LCA) in the graph.

### Objective
Given a dictionary of commits and their parents:
\`\`\`js
const gitGraph = {
  "c1": [],
  "c2": ["c1"],
  "c3": ["c2"],
  "c4": ["c2"],
  "c5": ["c3", "c4"]
};
\`\`\`
Find the lowest common ancestor of \`c3\` and \`c4\` (which is \`c2\`).`,
    hints: [
      "Traverse ancestors of commitA and store them in a Set.",
      "Perform a BFS/DFS from commitB until an ancestor in the set is reached."
    ],
    initialFiles: {
      "mergeBase.js": `// Git Merge Base (Lowest Common Ancestor)
export function findMergeBase(graph, commitA, commitB) {
  const ancestorsA = new Set();
  
  // Step 1: Collect all ancestors of commitA
  function dfs(commit) {
    if (!commit || ancestorsA.has(commit)) return;
    ancestorsA.add(commit);
    const parents = graph[commit] || [];
    parents.forEach(p => dfs(p));
  }
  dfs(commitA);

  // Step 2: Traverse commitB to find first common ancestor
  const queue = [commitB];
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    if (ancestorsA.has(current)) {
      return current; // Found LCA!
    }
    visited.add(current);
    const parents = graph[current] || [];
    for (const p of parents) {
      if (!visited.has(p)) queue.push(p);
    }
  }

  return null;
}`
    },
    solutionExample: `// Git Merge Base (Lowest Common Ancestor)
export function findMergeBase(graph, commitA, commitB) {
  const ancestorsA = new Set();
  function dfs(commit) {
    if (!commit || ancestorsA.has(commit)) return;
    ancestorsA.add(commit);
    const parents = graph[commit] || [];
    parents.forEach(p => dfs(p));
  }
  dfs(commitA);
  const queue = [commitB];
  const visited = new Set();
  while (queue.length > 0) {
    const current = queue.shift();
    if (ancestorsA.has(current)) return current;
    visited.add(current);
    for (const p of (graph[current] || [])) {
      if (!visited.has(p)) queue.push(p);
    }
  }
  return null;
}`,
    suggestedCommands: [
      "git merge-base branch-a branch-b",
      "npm test"
    ],
    tests: [
      { id: "t1", name: "Has traversal logic for commit ancestors", validate: (content) => content.includes("ancestorsA.has") || content.includes("Set") },
      { id: "t2", name: "Correctly handles parent lookups", validate: (content) => content.includes("graph[") },
      { id: "t3", name: "Returns valid ancestor identifier", validate: (content) => content.includes("return current") || content.includes("return") }
    ]
  },
  {
    id: "sys-01",
    title: "GitHub Actions CI/CD Pipeline Linter",
    slug: "github-actions-cicd-pipeline-linter",
    category: "System Design",
    difficulty: "Medium",
    xp: 180,
    timeEst: "15 mins",
    solvedCount: 95,
    tags: ["ci-cd", "github-actions", "devops"],
    author: "Tanvi Patel (CSPIT-IT)",
    summary: "Fix broken YAML syntax and security vulnerabilities in the club's automated test and deployment workflow.",
    description: `### Context
The Git Club CHARUSAT website deployment failed because of missing permissions and an insecure runner configuration in \`.github/workflows/deploy.yml\`.

### Objective
1. Add strict \`permissions: contents: read\`.
2. Ensure the workflow triggers on \`push\` to \`main\` and \`pull_request\`.
3. Use the latest \`actions/checkout@v4\` and \`actions/setup-node@v4\`.`,
    hints: [
      "Check indentation carefully — YAML is sensitive to 2-space indentation.",
      "Ensure `runs-on: ubuntu-latest` is defined for every job."
    ],
    initialFiles: {
      "deploy.yml": `name: Deploy Git Club Portal

on:
  push:
    branches: [ main ]
  # TODO: Add pull_request trigger

# TODO: Add secure read-only permissions block

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install & Test
        run: |
          npm ci
          npm run build`
    },
    solutionExample: `name: Deploy Git Club Portal

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install & Test
        run: |
          npm ci
          npm run build`,
    suggestedCommands: [
      "gh workflow run deploy.yml",
      "git commit -m 'ci: secure workflow permissions'"
    ],
    tests: [
      { id: "t1", name: "Includes pull_request trigger", validate: (content) => content.includes("pull_request:") },
      { id: "t2", name: "Explicit read-only contents permissions defined", validate: (content) => content.includes("permissions:") && content.includes("contents: read") },
      { id: "t3", name: "Builds on ubuntu-latest runner", validate: (content) => content.includes("runs-on: ubuntu-latest") }
    ]
  }
];
