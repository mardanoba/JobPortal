// src/db/index.ts
import dotenv from "dotenv";
dotenv.config();
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js"; // ✅ Must include .js extension

// Determine SSL configuration
// Only enable SSL if explicitly required via environment variable or for cloud services
const getSSLConfig = () => {
  const dbUrl = process.env.DATABASE_URL || "";
  
  // If DATABASE_SSL is explicitly set, use it
  if (process.env.DATABASE_SSL === "true") {
    return { rejectUnauthorized: false };
  }
  if (process.env.DATABASE_SSL === "false") {
    return false;
  }
  
  // Disable SSL for local connections
  if (dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1")) {
    return false;
  }
  
  // For cloud services, check if SSL is required in the connection string
  // Many cloud providers include sslmode=require in the URL
  if (dbUrl.includes("sslmode=require") || dbUrl.includes("?sslmode=require")) {
    return { rejectUnauthorized: false };
  }
  
  // Default: no SSL (most local PostgreSQL instances don't support it)
  return false;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: getSSLConfig(),
});

export const db = drizzle(pool, { schema });
export * from "./schema.js";
