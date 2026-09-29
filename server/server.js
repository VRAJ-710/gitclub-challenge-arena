import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// In-Memory Database Store (with initial realistic campus data)
let database = {
  users: [
    {
      id: "usr-1",
      name: "Om Rashiya",
      studentId: "24CS084",
      department: "CSPIT-CSE",
      year: "2nd Year",
      xp: 2850,
      streak: 18,
      solves: 24,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=OmRashiya",
      badges: ["Git Architect", "15-Day Streak", "Merge Master"],
      lastActive: new Date().toISOString()
    },
    {
      id: "usr-2",
      name: "Drashti Shah",
      studentId: "23IT042",
      department: "DEPSTAR-IT",
      year: "3rd Year",
      xp: 2620,
      streak: 14,
      solves: 22,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DrashtiShah",
      badges: ["Rebase Ninja", "Open Source Hero"],
      lastActive: new Date().toISOString()
    },
    {
      id: "usr-3",
      name: "Harshil Vora",
      studentId: "24CE015",
      department: "CSPIT-CE",
      year: "2nd Year",
      xp: 2380,
      streak: 11,
      solves: 20,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=HarshilVora",
      badges: ["Bug Squasher", "Streak Pro"],
      lastActive: new Date().toISOString()
    }
  ],
  submissions: [],
  liveRooms: {
    "charusat-arena-2026": {
      id: "charusat-arena-2026",
      name: "CHARUSAT Campus Open Contest",
      participants: [],
      activities: []
    }
  }
};

// Helper: compute dynamic leaderboard
function getSortedLeaderboard() {
  const sorted = [...database.users].sort((a, b) => b.xp - a.xp);
  return sorted.map((u, idx) => ({ ...u, rank: idx + 1 }));
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

// GET Leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json({
    success: true,
    totalUsers: database.users.length,
    leaderboard: getSortedLeaderboard()
  });
});

// Register / Upsert User
app.post('/api/users/sync', (req, res) => {
  const { studentId, name, department, year, xp, streak, avatar } = req.body;
  if (!studentId) return res.status(400).json({ error: 'studentId required' });

  let existing = database.users.find(u => u.studentId === studentId);
  if (existing) {
    existing.name = name || existing.name;
    existing.department = department || existing.department;
    existing.year = year || existing.year;
    existing.xp = Math.max(existing.xp, Number(xp) || 0);
    existing.streak = Math.max(existing.streak, Number(streak) || 1);
    existing.avatar = avatar || existing.avatar;
    existing.lastActive = new Date().toISOString();
  } else {
    existing = {
      id: `usr-${Date.now()}`,
      studentId,
      name: name || 'CHARUSAT Solver',
      department: department || 'CSPIT-CSE',
      year: year || '2nd Year',
      xp: Number(xp) || 100,
      streak: Number(streak) || 1,
      solves: 1,
      avatar: avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${studentId}`,
      badges: ["First Commit"],
      lastActive: new Date().toISOString()
    };
    database.users.push(existing);
  }

  const updatedBoard = getSortedLeaderboard();
  io.emit('leaderboard-updated', updatedBoard);

  res.json({ success: true, user: existing, leaderboard: updatedBoard });
});

// Submit Challenge
app.post('/api/submissions', (req, res) => {
  const { studentId, challengeId, challengeTitle, xpGained, roomId } = req.body;
  if (!studentId || !challengeId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const submission = {
    id: `sub-${Date.now()}`,
    studentId,
    challengeId,
    challengeTitle: challengeTitle || 'Git Challenge',
    xpGained: Number(xpGained) || 100,
    timestamp: new Date().toISOString()
  };

  database.submissions.unshift(submission);

  // Update user in DB
  const user = database.users.find(u => u.studentId === studentId);
  if (user) {
    user.xp += submission.xpGained;
    user.solves = (user.solves || 0) + 1;
    user.streak = (user.streak || 0) + 1;
  }

  const updatedBoard = getSortedLeaderboard();

  // Broadcast real-time activity to all players
  io.emit('new-submission', {
    submission,
    user: user || { name: studentId, studentId },
    leaderboard: updatedBoard
  });

  if (roomId && database.liveRooms[roomId]) {
    io.to(roomId).emit('room-activity', {
      type: 'solve',
      text: `${user?.name || studentId} solved ${challengeTitle}! (+${xpGained} XP)`,
      timestamp: new Date().toISOString()
    });
  }

  res.json({ success: true, submission, leaderboard: updatedBoard });
});

// Socket.IO Real-Time Engine
io.on('connection', (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  // Send current leaderboard on connect
  socket.emit('leaderboard-updated', getSortedLeaderboard());

  // Join a contest room
  socket.on('join-room', ({ roomId, user }) => {
    const roomKey = roomId || 'charusat-arena-2026';
    socket.join(roomKey);

    if (!database.liveRooms[roomKey]) {
      database.liveRooms[roomKey] = {
        id: roomKey,
        name: `Room ${roomKey}`,
        participants: [],
        activities: []
      };
    }

    const room = database.liveRooms[roomKey];
    // Add participant if not existing
    if (user && !room.participants.some(p => p.studentId === user.studentId)) {
      room.participants.push({
        socketId: socket.id,
        ...user,
        joinedAt: new Date().toISOString()
      });
    }

    // Broadcast updated room participants
    io.to(roomKey).emit('room-users-updated', {
      roomId: roomKey,
      participants: room.participants,
      count: room.participants.length
    });

    socket.to(roomKey).emit('room-activity', {
      type: 'join',
      text: `${user?.name || 'A new solver'} entered the live contest room.`,
      timestamp: new Date().toISOString()
    });
  });

  // Real-time chat & reaction
  socket.on('send-reaction', ({ roomId, emoji, user }) => {
    const roomKey = roomId || 'charusat-arena-2026';
    io.to(roomKey).emit('room-reaction', {
      emoji,
      user: user?.name || 'Solver',
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    // Clean up rooms
    for (const [rId, room] of Object.entries(database.liveRooms)) {
      room.participants = room.participants.filter(p => p.socketId !== socket.id);
      io.to(rId).emit('room-users-updated', {
        roomId: rId,
        participants: room.participants,
        count: room.participants.length
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Git Club CHARUSAT Real-Time Backend running on http://localhost:${PORT}`);
});
