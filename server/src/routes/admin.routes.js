import express from "express";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import {
  getSystemStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllQuizzesAdmin,
  toggleQuizStatus,
  deleteQuizAdmin,
  getQuestionsAdmin,
  dismissQuestionReportsAdmin,
  deleteQuestionAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

// All routes require valid auth + role === 'admin'
router.use(auth, requireAdmin);

router.get("/stats", getSystemStats);
router.get("/users", getAllUsers);
router.patch("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);

router.get("/quizzes", getAllQuizzesAdmin);
router.patch("/quizzes/:quizId/status", toggleQuizStatus);
router.delete("/quizzes/:quizId", deleteQuizAdmin);

router.get("/questions", getQuestionsAdmin);
router.patch("/questions/:questionId/dismiss-reports", dismissQuestionReportsAdmin);
router.delete("/questions/:questionId", deleteQuestionAdmin);

export default router;
