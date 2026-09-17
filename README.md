# ⚡ Dev Arena — Developer Battleground & Skill Benchmarking Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Web Audio API](https://img.shields.io/badge/Sound-Web%20Audio%20Synth-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"Put your developer knowledge to the test."**  
> Fast-paced coding challenges, progressive level rankings, live battleground sessions, and granular performance diagnostics designed for engineers leveling up their craft.

---

## 🌟 Core Features

### ⚔️ Battleground & Arena Challenges
- **Curated Domain Tracks:** Specialize across core tracks:
  - `JavaScript Core Fundamentals` (Scope, Closures, Event Loop, ES6+)
  - `React & Frontend Architecture` (Hook Lifecycles, Virtual DOM, Performance)
  - `Node.js & Backend Internals` (Express chains, JWT, Streams, Async IO)
  - `Algorithms & System Design` (Data Structures, Big-O, Scalability)
- **Exam Room Experience:** Timed assessment runs with instant answer locking, dynamic countdown warnings, question navigation, and real-time state persistence.
- **Quick Warm-Up Mode:** Zero-friction practice drills to warm up fingers and syntax before entering rated arena sessions.

### 🎮 Level Progression Engine & Gamification
- **Custom XP Algorithm:** Mathematical level progression engine (`calculateLevelData`) where each tier requires scaling XP thresholds:
  $$\text{XP}_{\text{next}} = 250 + (\text{level} - 1) \times 150$$
- **One-Time Verified XP:** Anti-grind mechanism preventing duplicate score inflation on repeated runs.
- **Synthesized Web Audio Engine:** Pure zero-dependency browser Web Audio API oscillator synthesizing custom chimes, countdown ticks, and victory sound effects.
- **Live Community Leaderboard:** Real-time global developer rankings with tier badges, streaks, and completed challenge counts.

### 📊 Detailed Diagnostic Breakdown
- **Instant Result Analytics:** Score percentages, time-per-question metrics, accuracy breakdowns, and detailed answer explanations.
- **Developer Profile Hub:** Historical submission log, XP progress bar, mastery distribution, and quick challenge replays.

### 🛡️ Stealth Admin "God Mode"
- **Platform Telemetry:** Live system health, total registered developers, active challenges, and global submission volume.
- **User Management & Role Assignment:** Search, edit XP allocations, ban/unban, and manage permissions.
- **Community Question Moderation:** Review user-reported flagged questions, upvotes/downvotes, and adjust question validity inline.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2 + Vite 8 (ESM)
- **Routing:** React Router 7
- **UI & Icons:** Lucide React + Bespoke Cyber/Dark Mode Design System
- **Sound:** Custom Web Audio API Oscillator Synthesizer
- **Telemetry:** Vercel Analytics

### Backend
- **Runtime:** Node.js + Express 5
- **Database:** MongoDB via Mongoose 9
- **Security & Auth:** JWT (`jsonwebtoken`), `bcryptjs`, `cors`, and `express-rate-limit`
- **Data Tooling:** Custom automated challenge seed scripts

---

## 📂 Project Architecture

```text
Quiz-project/
├── client/                     # Frontend SPA
│   ├── src/
│   │   ├── components/         # Navbar, DailyChallengeCard, ProtectedRoute, UI
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── pages/
│   │   │   ├── ExploreHome.jsx    # Season 1 Battleground landing & tracks
│   │   │   ├── ExamRoom.jsx       # Real-time timed assessment engine
│   │   │   ├── QuickPractice.jsx  # Zero-stakes quick challenge drills
│   │   │   ├── DetailedResult.jsx # Score & explanation diagnostics
│   │   │   ├── Leaderboard.jsx    # Global community rankings
│   │   │   ├── Profile.jsx        # Developer stats & progress tracking
│   │   │   └── AdminGodMode.jsx   # Founder / admin telemetry & moderation
│   │   ├── utils/
│   │   │   ├── levelEngine.js     # Tier XP calculation logic
│   │   │   └── soundEffects.js    # Browser Web Audio API synthesizer
│   │   └── index.css              # Cyber-dark design tokens & typography
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API
│   ├── src/
│   │   ├── models/             # User, Quiz, Question, Submission schemas
│   │   ├── routes/             # Auth, Arena, Admin routes
│   │   └── scripts/            # Challenge seeders
│   ├── server.js               # API entry point & middleware chain
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

---

### 1. Clone & Checkout
```bash
git clone https://github.com/Nahom-prog/Dev-Arena.git
cd Dev-Arena
git checkout dev-version
```

### 2. Configure Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dev-arena
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

### 3. Install & Seed
```bash
# Install root, client, and server dependencies
npm install
npm install --prefix client
npm install --prefix server

# Seed initial challenge tracks
npm run seed
```

### 4. Run Development Servers
```bash
# Start backend API (Port 5000)
npm run server

# Start frontend client (Port 5173)
npm run dev
```

---

<p align="center">
  Crafted with precision by <a href="https://github.com/Nahom-prog">Nahom</a> ⚡
</p>
