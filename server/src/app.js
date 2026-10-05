import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import questionRoutes from "./routes/question.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import rateLimit from "express-rate-limit";

const app = express();

// CORS: Whitelist Vercel production, preview deployments, and local dev
const allowedOriginPatterns = [
  /^https:\/\/.*\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, Postman, mobile apps)
      if (!origin) return callback(null, true);
      // Check custom FRONTEND_URL env var first (for custom domains)
      if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL.replace(/\/+$/, '')) {
        return callback(null, true);
      }
      // Check against allowed patterns
      if (allowedOriginPatterns.some(pattern => pattern.test(origin))) {
        return callback(null, true);
      }
      callback(new Error('CORS: Origin not allowed'));
    },
    credentials: true,
  })
);
app.use(express.json());

// Limiter for general API requests
const apilimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/api", apilimiter);
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/admin", adminRoutes);

// Global error handler — prevents raw stack traces leaking in production
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
});

export default app;
