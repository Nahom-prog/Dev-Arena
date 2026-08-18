import express from "express";
import { createQuiz , getAllQuizzes, getQuizById, publishQuiz, submitQuiz } from "../controllers/quiz.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createQuiz);
router.get("/", auth , getAllQuizzes)
router.get("/:quizId" , auth , getQuizById)
router.patch("/:quizId/publish" , auth , publishQuiz)
router.post("/:quizId/submit", auth , submitQuiz)

export default router;

