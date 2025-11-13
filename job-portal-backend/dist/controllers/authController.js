import { createUser, findUserByEmail, createEmailToken, findEmailToken, deleteEmailToken, createPasswordResetToken, findPasswordToken, deletePasswordToken, updateUserPassword, setUserVerified, } from "../db/repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signJwt } from "../utils/jwt.js";
import { randomBytes } from "crypto";
import { sendEmail } from "../utils/email.js";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// ---------------- Register ----------------
export async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role)
            return res.status(400).json({ error: "Missing fields" });
        const existing = await findUserByEmail(email);
        if (existing)
            return res.status(400).json({ error: "Email already in use" });
        const password_hash = await hashPassword(password);
        const user = await createUser({ name, email, password_hash, role });
        // Create email verification token
        const token = randomBytes(32).toString("hex");
        const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
        await createEmailToken({ user_id: user.id, token, expires_at });
        const verifyLink = `${FRONTEND_URL}/verify-email?token=${token}`;
        await sendEmail(email, "Verify your Job Portal account", `Click the link to verify your account: ${verifyLink}`);
        return res.json({ message: "Registered successfully. Check your email to verify." });
    }
    catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
// ---------------- Verify Email ----------------
export async function verifyEmail(req, res) {
    try {
        const token = req.query.token;
        if (!token)
            return res.status(400).json({ error: "Token required" });
        const record = await findEmailToken(token);
        if (!record)
            return res.status(400).json({ error: "Invalid token" });
        if (new Date(record.expires_at) < new Date()) {
            await deleteEmailToken(record.id);
            return res.status(400).json({ error: "Token expired" });
        }
        await setUserVerified(record.user_id);
        await deleteEmailToken(record.id);
        return res.json({ message: "Email verified. You can now login." });
    }
    catch (err) {
        console.error("VerifyEmail error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
// ---------------- Login ----------------
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Missing fields" });
        const user = await findUserByEmail(email);
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" });
        if (!user.is_verified)
            return res.status(403).json({ error: "Email not verified" });
        const ok = await comparePassword(password, user.password_hash);
        if (!ok)
            return res.status(400).json({ error: "Invalid credentials" });
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
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
// ---------------- Forgot Password ----------------
export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ error: "Email required" });
        const user = await findUserByEmail(email);
        if (!user) {
            // Always return success message to prevent enumeration
            return res.json({ message: "If that email exists, a reset link has been sent." });
        }
        const token = randomBytes(32).toString("hex");
        const expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await createPasswordResetToken({ user_id: user.id, token, expires_at });
        const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;
        await sendEmail(user.email, "Reset your password", `Click the link to reset: ${resetLink}`);
        return res.json({ message: "If that email exists, a reset link has been sent." });
    }
    catch (err) {
        console.error("ForgotPassword error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
// ---------------- Reset Password ----------------
export async function resetPassword(req, res) {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword)
            return res.status(400).json({ error: "Missing fields" });
        const record = await findPasswordToken(token);
        if (!record)
            return res.status(400).json({ error: "Invalid token" });
        if (new Date(record.expires_at) < new Date()) {
            await deletePasswordToken(record.id);
            return res.status(400).json({ error: "Token expired" });
        }
        const hashed = await hashPassword(newPassword);
        await updateUserPassword(record.user_id, hashed);
        await deletePasswordToken(record.id);
        return res.json({ message: "Password reset successful." });
    }
    catch (err) {
        console.error("ResetPassword error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
//# sourceMappingURL=authController.js.map