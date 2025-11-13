import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
    dialect: "postgresql",  // ✅ Use 'dialect' instead of 'driver'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
