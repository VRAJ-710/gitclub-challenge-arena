import { io } from 'socket.io-client';

class RealtimeService {
  constructor() {
    this.socket = null;
    this.broadcastChannel = null;
    this.listeners = {
      leaderboard: [],
      submissions: [],
      roomUsers: [],
      reactions: [],
      status: []
    };
    this.connected = false;
    this.backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    this.roomId = 'charusat-arena-2026';
    this.init();
  }

  init() {
    // 1. Cross-tab BroadcastChannel (guaranteed 0-latency instant sync across all browser tabs/windows without server)
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('gitclub_arena_sync');
      this.broadcastChannel.onmessage = (event) => {
        const { type, data } = event.data || {};
        this.emitLocalEvent(type, data);
      };
    }

    // 2. Connect to Socket.IO backend if available
    try {
      this.socket = io(this.backendUrl, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 3,
        timeout: 3000
      });

      this.socket.on('connect', () => {
        this.connected = true;
        this.notifyStatus(true);
      });

      this.socket.on('disconnect', () => {
        this.connected = false;
        this.notifyStatus(false);
      });

      this.socket.on('connect_error', () => {
        this.connected = false;
        this.notifyStatus(false);
      });

      this.socket.on('leaderboard-updated', (board) => {
        this.emitLocalEvent('leaderboard', board);
      });

      this.socket.on('new-submission', (data) => {
        this.emitLocalEvent('submissions', data);
      });

      this.socket.on('room-users-updated', (data) => {
        this.emitLocalEvent('roomUsers', data);
      });

      this.socket.on('room-reaction', (data) => {
        this.emitLocalEvent('reactions', data);
      });
    } catch (err) {
      console.warn("Socket.IO client initialization skipped:", err);
    }
  }

  setBackendUrl(url) {
    this.backendUrl = url;
    if (this.socket) {
      this.socket.disconnect();
    }
    this.init();
  }

  joinRoom(roomId, user) {
    this.roomId = roomId || this.roomId;
    if (this.socket && this.socket.connected) {
      this.socket.emit('join-room', { roomId: this.roomId, user });
    }
    // Also broadcast locally across all connected tabs/windows
    this.postMessage('roomUsers', {
      user,
      action: 'join',
      timestamp: new Date().toISOString()
    });
  }

  submitSolution(submissionData) {
    // 1. Send to WebSocket server if connected
    if (this.socket && this.socket.connected) {
      this.socket.emit('submit-solution', submissionData);
    }

    // 2. Try REST POST to backend
    fetch(`${this.backendUrl}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    }).catch(() => {
      // Offline / standalone fallback
    });

    // 3. Broadcast to all other browser tabs/windows instantly
    this.postMessage('submissions', submissionData);
  }

  sendReaction(emoji, user) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('send-reaction', { roomId: this.roomId, emoji, user });
    }
    this.postMessage('reactions', { emoji, user, timestamp: new Date().toISOString() });
  }

  postMessage(type, data) {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type, data });
    }
    this.emitLocalEvent(type, data);
  }

  emitLocalEvent(type, data) {
    if (this.listeners[type]) {
      this.listeners[type].forEach(fn => fn(data));
    }
  }

  notifyStatus(isConnected) {
    if (this.listeners.status) {
      this.listeners.status.forEach(fn => fn(isConnected));
    }
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
    return () => {
      this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
    };
  }
}

export const realtimeService = new RealtimeService();
