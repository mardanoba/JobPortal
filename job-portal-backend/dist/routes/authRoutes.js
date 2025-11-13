// src/routes/authRoutes.ts
import { Router } from "express";
import { register, verifyEmail, login, forgotPassword, resetPassword } from "../controllers/authController.js";
const router = Router();
router.post("/register", register);
router.get("/verify-email", verifyEmail); // token in query
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
//# sourceMappingURL=authRoutes.js.map