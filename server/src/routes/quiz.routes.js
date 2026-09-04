import express from "express";
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
} from "../controllers/quiz.controller.js";
import { auth, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createQuiz);
router.get("/", optionalAuth, getAllQuizzes);
router.get("/daily", optionalAuth, getDailyChallenge);
router.get("/my/authored", auth, getMyQuizzes);
router.get("/:quizId", optionalAuth, getQuizById);
router.patch("/:quizId/publish", auth, publishQuiz);
router.post("/:quizId/submit", auth, submitQuiz);
router.post("/questions/:questionId/vote", auth, voteQuestion);
router.post("/questions/:questionId/report", auth, reportQuestion);

export default router;


