import express from "express";
import { login, me, register, updateProfile } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.patch("/profile", auth, updateProfile);

export default router;