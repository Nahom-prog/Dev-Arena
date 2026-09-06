import express from "express"
import { createQuestion, getQuestionByQuiz, deleteQuestion } from "../controllers/question.controller.js"
import { auth, optionalAuth } from "../middleware/auth.js"

const router = express.Router()

router.post("/", auth , createQuestion)
router.get("/quiz/:quizId", optionalAuth , getQuestionByQuiz)
router.delete("/:questionId", auth, deleteQuestion)

export default router;