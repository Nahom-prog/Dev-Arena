import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import questionRoutes from "./routes/question.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cors());
app.use(express.json());

// limiter for general api requests
const apilimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many request , please try later" }
});

// limiter for auth requests specifically for password requests
const authlimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: "Too many attempts, try again later" }
});

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/api", apilimiter);
app.use("/api/auth", authlimiter);
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/admin", adminRoutes);

export default app;
