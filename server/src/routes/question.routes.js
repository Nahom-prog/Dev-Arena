import express from "express"
import { createQuestion, getQuestionByQuiz } from "../controllers/question.controller.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.post("/", auth , createQuestion)
router.get("/quiz/:quizId", auth , getQuestionByQuiz)

export default router;