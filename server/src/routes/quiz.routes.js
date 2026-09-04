import express from "express";
import rateLimit from "express-rate-limit";
import {
  createQuiz,
  getAllQuizzes,
  getMyQuizzes,
  getDailyChallenge,
  getQuizById,
  publishQuiz,
  submitQuiz,
  voteQuestion,
  reportQuestion,
  deleteQuiz,
} from "../controllers/quiz.controller.js";
import { auth, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Dedicated rate limiter for quiz submissions (prevents brute-forcing & bot spam)
const submitLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 6, // max 6 submissions per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many quiz submissions in rapid succession. Please wait a minute before submitting again." },
});

router.post("/", auth, createQuiz);
router.get("/", optionalAuth, getAllQuizzes);
router.get("/daily", optionalAuth, getDailyChallenge);
router.get("/my/authored", auth, getMyQuizzes);
router.get("/:quizId", optionalAuth, getQuizById);
router.patch("/:quizId/publish", auth, publishQuiz);
router.delete("/:quizId", auth, deleteQuiz);
router.post("/:quizId/submit", auth, submitLimiter, submitQuiz);
router.post("/questions/:questionId/vote", auth, voteQuestion);
router.post("/questions/:questionId/report", auth, reportQuestion);

export default router;


