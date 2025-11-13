// src/db/schema.ts
import { pgTable, serial, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // 'job_seeker' | 'employer' | 'admin'
  is_verified: boolean("is_verified").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const email_verification_tokens = pgTable("email_verification_tokens", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const password_reset_tokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ---------------- Jobs ----------------
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  employer_id: integer("employer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // e.g., full-time, part-time
  location: varchar("location", { length: 255 }).notNull(),
  salary: varchar("salary", { length: 100 }),
  requirements: text("requirements"),
  is_open: boolean("is_open").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// ---------------- Applications ----------------
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  job_id: integer("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }),
  job_seeker_id: integer("job_seeker_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  cv_url: varchar("cv_url", { length: 500 }),
  status: varchar("status", { length: 50 }).default("applied"), // applied | shortlisted | rejected | accepted
  created_at: timestamp("created_at").defaultNow().notNull(),
});
