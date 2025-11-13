// src/db/repository.ts
import { db } from "./index.js";
import { users, email_verification_tokens, password_reset_tokens } from "./schema.js";
import { eq } from "drizzle-orm";
export async function createUser({ name, email, password_hash, role }) {
    const [u] = await db.insert(users).values({ name, email, password_hash, role }).returning();
    return u;
}
export async function findUserByEmail(email) {
    return db.select().from(users).where(eq(users.email, email)).then(r => r[0]);
}
export async function findUserById(id) {
    return db.select().from(users).where(eq(users.id, id)).then(r => r[0]);
}
export async function setUserVerified(userId) {
    return db.update(users).set({ is_verified: true }).where(eq(users.id, userId)).returning();
}
// email token
export async function createEmailToken({ user_id, token, expires_at }) {
    const [t] = await db.insert(email_verification_tokens).values({ user_id, token, expires_at }).returning();
    return t;
}
export async function findEmailToken(token) {
    try {
        return await db.select().from(email_verification_tokens).where(eq(email_verification_tokens.token, token)).then(r => r[0]);
    }
    catch (error) {
        console.error("Error finding email token:", error);
        // Preserve the original error for better debugging
        if (error instanceof Error) {
            error.message = `Database error while finding email token: ${error.message}`;
            throw error;
        }
        throw new Error(`Database error while finding email token: ${String(error)}`);
    }
}
export async function deleteEmailToken(id) {
    try {
        return await db.delete(email_verification_tokens).where(eq(email_verification_tokens.id, id));
    }
    catch (error) {
        console.error("Error deleting email token:", error);
        throw new Error(`Database error while deleting email token: ${error.message}`);
    }
}
// password tokens
export async function createPasswordResetToken({ user_id, token, expires_at }) {
    const [t] = await db.insert(password_reset_tokens).values({ user_id, token, expires_at }).returning();
    return t;
}
export async function findPasswordToken(token) {
    return db.select().from(password_reset_tokens).where(eq(password_reset_tokens.token, token)).then(r => r[0]);
}
export async function deletePasswordToken(id) {
    return db.delete(password_reset_tokens).where(eq(password_reset_tokens.id, id));
}
export async function updateUserPassword(userId, password_hash) {
    return db.update(users).set({ password_hash }).where(eq(users.id, userId));
}
//# sourceMappingURL=repository.js.map