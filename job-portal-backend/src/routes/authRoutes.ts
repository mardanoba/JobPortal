import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = Router();

// Routes for registration, login, email verification, and password reset
router.post("/register", register);
router.post("/verify-email", verifyEmail); // POST request with { email, code }
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
