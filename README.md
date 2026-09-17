# ⚔️ Dev Arena (Quiz Master) — Next-Gen Evaluation & Assessment Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A high-performance full-stack evaluation engine and competitive assessment arena. Built with role-based authorization for educators and students, real-time timed test sessions, instant automated grading, sound effects, level progression, and competitive global leaderboards.

---

## 🌟 Key Features

### 🎓 For Educators & Creators (Teacher Studio)
- **Interactive Quiz Builder:** Create, configure, publish, and draft custom quizzes with granular time limits and category tags.
- **Dynamic Question Manager:** Add multiple-choice questions, custom options, answer keys, and point weightings.
- **Live Class Performance Analytics:** Monitor student submissions, question breakdown statistics, and pass/fail distributions.

### ⚔️ For Students & Developers (Quiz Arena)
- **Timed Assessment Runner:** Clean, distraction-free examination interface with countdown timers and warning triggers.
- **Gamified Level Engine & XP:** Earn experience points, unlock achievement badges, and level up your developer rank.
- **Global & Daily Leaderboards:** Compete in daily challenges with real-time scoring, streaks, and ranking tiers.
- **Immediate Granular Feedback:** Instant breakdown of answers, correct explanations, and overall performance metrics.
- **Audio Feedback & Micro-Interactions:** Immersive sound effects and tactile feedback powered by the Web Audio API.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Analytics:** Vercel Analytics ready

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express 5](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Security & Performance:** `bcryptjs`, JWT (`jsonwebtoken`), `cors`, and `express-rate-limit`

---

## 📂 Project Structure

```text
Quiz-project/
├── client/                     # Frontend Vite + React application
│   ├── src/
│   │   ├── components/         # Navbar, DailyChallengeCard, Footer, UI elements
│   │   ├── context/            # AuthContext & state providers
│   │   ├── pages/              # Arena, Teacher Studio, Dashboard, Leaderboards
│   │   ├── utils/              # Sound effects, level engine, API client helpers
│   │   ├── App.jsx             # Main router and layout
│   │   └── index.css           # Design tokens, typography & dark theme
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API & evaluation services
│   ├── src/
│   │   ├── models/             # User, Quiz, Question, and Submission schemas
│   │   ├── routes/             # Auth, Quiz, and Result API endpoints
│   │   └── scripts/            # Seed data and challenge generators
│   ├── server.js               # Express application entry point
│   ├── package.json
│   └── .env.example
│
├── package.json                # Monorepo scripts (client/server shortcuts)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas cluster)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Nahom-prog/Quiz-app.git
cd Quiz-app
```

### 2. Configure Environment Variables
Inside `server/`, create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/quiz-master
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies
Install dependencies from the root directory or in both `client` and `server`:
```bash
# Install root & seed tooling
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

### 4. Seed Daily Challenges (Optional)
Populate initial challenge questions and categories:
```bash
npm run seed
```

### 5. Start Development Servers
Run both backend and frontend concurrently:

```bash
# Terminal 1 - Backend Server
npm run server

# Terminal 2 - Frontend Client
npm run dev
```

- **Frontend Client:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`

---

## 🔒 Roles & Permissions

| Feature | Student / Candidate | Educator / Admin |
| :--- | :---: | :---: |
| Browse & Search Quizzes | ✅ | ✅ |
| Take Timed Assessments | ✅ | ✅ |
| Earn XP & Climb Leaderboard | ✅ | ✅ |
| Create & Edit Quizzes | ❌ | ✅ |
| Manage Question Bank | ❌ | ✅ |
| View Class Analytics & Submissions | ❌ | ✅ |

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted with care by <a href="https://github.com/Nahom-prog">Nahom</a> ⚡
</p>
