// src/db/schema.ts
import { pgTable, serial, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
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
//# sourceMappingURL=schema.js.map