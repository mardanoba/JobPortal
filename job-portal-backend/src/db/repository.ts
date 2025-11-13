// src/db/repository.ts
import { db } from "./index.js";
import {
  users,
  email_verification_tokens,
  password_reset_tokens,
  jobs,
  applications,
} from "./schema.js";
import { eq } from "drizzle-orm";

// ---------------- Users ----------------
export async function createUser({ name, email, password_hash, role }: { name: string; email: string; password_hash: string; role: string }) {
  const [u] = await db.insert(users).values({ name, email: email.trim().toLowerCase(), password_hash, role }).returning();
  return u;
}

export async function findUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));
  return result[0] ?? null;
}

export async function findUserById(id: number) {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] ?? null;
}

export async function setUserVerified(userId: number) {
  return db.update(users).set({ is_verified: true }).where(eq(users.id, userId)).returning();
}

// ---------------- Email tokens ----------------
export async function createEmailToken({ user_id, token, expires_at }: { user_id: number; token: string; expires_at: Date }) {
  const [t] = await db.insert(email_verification_tokens).values({ user_id, token, expires_at }).returning();
  return t;
}

export async function findEmailToken(token: string) {
  const result = await db.select().from(email_verification_tokens).where(eq(email_verification_tokens.token, token));
  return result[0] ?? null;
}

export async function deleteEmailToken(id: number) {
  return db.delete(email_verification_tokens).where(eq(email_verification_tokens.id, id));
}

// ---------------- Password tokens ----------------
export async function createPasswordResetToken({ user_id, token, expires_at }: { user_id: number; token: string; expires_at: Date }) {
  const [t] = await db.insert(password_reset_tokens).values({ user_id, token, expires_at }).returning();
  return t;
}

export async function findPasswordToken(token: string) {
  const result = await db.select().from(password_reset_tokens).where(eq(password_reset_tokens.token, token));
  return result[0] ?? null;
}

export async function deletePasswordToken(id: number) {
  return db.delete(password_reset_tokens).where(eq(password_reset_tokens.id, id));
}

export async function updateUserPassword(userId: number, password_hash: string) {
  return db.update(users).set({ password_hash }).where(eq(users.id, userId));
}

// ---------------- Jobs ----------------
export async function createJob({ employer_id, title, description, category, type, location, salary, requirements }:
  { employer_id: number; title: string; description: string; category: string; type: string; location: string; salary?: string; requirements?: string }) {
  const [job] = await db.insert(jobs).values({ employer_id, title, description, category, type, location, salary, requirements }).returning();
  return job;
}

export async function getJobs() {
  return db.select().from(jobs).where(eq(jobs.is_open, true));
}

export async function getJobById(jobId: number) {
  const result = await db.select().from(jobs).where(eq(jobs.id, jobId));
  return result[0] ?? null;
}

export async function updateJob(jobId: number, data: Partial<typeof jobs>) {
  return db.update(jobs).set({ ...data, updated_at: new Date() }).where(eq(jobs.id, jobId)).returning();
}

export async function closeJob(jobId: number) {
  return db.update(jobs).set({ is_open: false, updated_at: new Date() }).where(eq(jobs.id, jobId));
}

// ---------------- Applications ----------------
export async function applyToJob({ job_id, job_seeker_id, cv_url }: { job_id: number; job_seeker_id: number; cv_url: string }) {
  const [app] = await db.insert(applications).values({ job_id, job_seeker_id, cv_url }).returning();
  return app;
}

export async function getApplicationsByJob(job_id: number) {
  return db.select().from(applications).where(eq(applications.job_id, job_id));
}

export async function getApplicationsByUser(job_seeker_id: number) {
  return db.select().from(applications).where(eq(applications.job_seeker_id, job_seeker_id));
}

export async function updateApplicationStatus(appId: number, status: string) {
  return db.update(applications).set({ status }).where(eq(applications.id, appId));
}
