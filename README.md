# ⚡ Dev Arena — Developer Skill Benchmarking Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"Put your developer knowledge to the test."**  
> Fast-paced coding quizzes, real-time community rankings, and skill benchmarking for developers leveling up their craft.

---

## 🌟 Features

- **Domain Tracks:** Curated challenges spanning JavaScript fundamentals, React & frontend architecture, Node.js internals, algorithms, and system design.
- **Timed Assessment Runner:** Clean, distraction-free examination interface with countdown timers, warning alerts, and instant answer locking.
- **Quick Warm-Up:** Rapid zero-friction practice sessions for quick syntax and logic drills.
- **Dynamic Leaderboard:** Real-time global community rankings, win streaks, and score tracking.
- **Granular Diagnostics:** Instant answer explanations, time-per-question metrics, and category accuracy breakdowns.
- **Developer Profiles:** Track completed challenges, mastery distribution, and verified badges.
- **Audio Feedback:** Synthesized micro-interactions and chimes built natively with the browser Web Audio API.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 8, React Router 7, Lucide Icons, Custom CSS Design System
- **Backend:** Node.js, Express 5, MongoDB, Mongoose 9
- **Security:** JWT authentication, bcryptjs, rate limiting, and CORS

---

## 📂 Project Structure

```text
Quiz-project/
├── client/                     # Frontend Vite + React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Global state (Auth, Toast)
│   │   ├── pages/              # Arena pages (Home, Quizzes, Practice, Leaderboard, Profile)
│   │   ├── utils/              # Client helpers, level calculations, audio synth
│   │   └── index.css           # Global stylesheets & design tokens
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express REST API
│   ├── src/
│   │   ├── models/             # Database schemas
│   │   ├── routes/             # API endpoints
│   │   └── scripts/            # Challenge seed scripts
│   ├── server.js               # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Nahom-prog/Dev-Arena.git
cd Dev-Arena
git checkout dev-version
```

### 2. Configure Environment (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dev-arena
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies
```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 4. Seed Challenges (Optional)
```bash
npm run seed
```

### 5. Start the Application
```bash
# Terminal 1 - Backend Server
npm run server

# Terminal 2 - Frontend Client
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted by <a href="https://github.com/Nahom-prog">Nahom</a> ⚡
</p>
