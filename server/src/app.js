import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import questionRoutes from "./routes/question.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import rateLimit from "express-rate-limit";

const app = express();

// Dynamic CORS: Permissively allow Vercel production, preview deployments, and local dev
app.use(
  cors({
    origin: true,
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

export default app;
