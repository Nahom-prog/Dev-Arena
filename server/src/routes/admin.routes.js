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

export default router;
