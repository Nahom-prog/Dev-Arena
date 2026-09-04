import express from "express";
import rateLimit from "express-rate-limit";
import { login, me, register, updateProfile } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Specific rate limiter for password brute-force prevention
const authlimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many authentication attempts. Please try again in 15 minutes." },
});

router.post("/register", authlimiter, register);
router.post("/login", authlimiter, login);
router.get("/me", auth, me);
router.patch("/profile", auth, updateProfile);

export default router;