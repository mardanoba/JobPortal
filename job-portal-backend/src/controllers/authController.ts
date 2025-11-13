import { Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  createEmailToken,
  findEmailToken,
  deleteEmailToken,
  createPasswordResetToken,
  findPasswordToken,
  deletePasswordToken,
  updateUserPassword,
  setUserVerified,
} from "../db/repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signJwt } from "../utils/jwt.js";
import { sendEmail } from "../utils/email.js";

// ---------------- Register ----------------
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ error: "Missing fields" });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const password_hash = await hashPassword(password);
    const user = await createUser({
      name,
      email: normalizedEmail,
      password_hash,
      role,
    });

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await createEmailToken({ user_id: user.id, token: code, expires_at });

    // Send verification code via email
    try {
      await sendEmail(
        email,
        "Job Portal Verification Code",
        `Your verification code is: ${code}\nIt will expire in 10 minutes.`
      );
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      return res.status(500).json({ error: "Failed to send verification email." });
    }

    return res.json({
      message: "Registered successfully. Check your email for the verification code.",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// ---------------- Verify Email ----------------
export async function verifyEmail(req: Request, res: Response) {
  try {
    const { email, code } = req.body;
    if (!email || !code)
      return res.status(400).json({ error: "Email and code are required" });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);
    if (!user) return res.status(400).json({ error: "User not found" });

    const record = await findEmailToken(code);
    if (!record || record.user_id !== user.id)
      return res.status(400).json({ error: "Invalid or incorrect code" });

    if (new Date(record.expires_at) < new Date()) {
      await deleteEmailToken(record.id);
      return res.status(400).json({ error: "Code expired" });
    }

    await setUserVerified(user.id);
    await deleteEmailToken(record.id);

    return res.json({ message: "Email verified successfully. You can now login." });
  } catch (err) {
    console.error("VerifyEmail error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// ---------------- Login ----------------
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    if (!user.is_verified) return res.status(403).json({ error: "Email not verified" });

    const ok = await comparePassword(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = signJwt({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// ---------------- Forgot Password ----------------
export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);
    if (!user)
      return res.json({ message: "If that email exists, a reset code has been sent." });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000);
    await createPasswordResetToken({ user_id: user.id, token: code, expires_at });

    try {
      await sendEmail(
        user.email,
        "Reset Your Job Portal Password",
        `Your password reset code is: ${code}\nIt will expire in 10 minutes.`
      );
    } catch (emailErr) {
      console.error("Failed to send password reset email:", emailErr);
    }

    return res.json({ message: "If that email exists, a reset code has been sent." });
  } catch (err) {
    console.error("ForgotPassword error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// ---------------- Reset Password ----------------
export async function resetPassword(req: Request, res: Response) {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword)
      return res.status(400).json({ error: "Missing fields" });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);
    if (!user) return res.status(400).json({ error: "User not found" });

    const record = await findPasswordToken(code);
    if (!record || record.user_id !== user.id)
      return res.status(400).json({ error: "Invalid or incorrect code" });

    if (new Date(record.expires_at) < new Date()) {
      await deletePasswordToken(record.id);
      return res.status(400).json({ error: "Code expired" });
    }

    const hashed = await hashPassword(newPassword);
    await updateUserPassword(record.user_id, hashed);
    await deletePasswordToken(record.id);

    return res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error("ResetPassword error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
