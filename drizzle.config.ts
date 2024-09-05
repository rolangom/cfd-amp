import { defineConfig } from "drizzle-kit";

console.log('AUTH_DRIZZLE_URL',process.env.AUTH_DRIZZLE_URL)

export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./schemas/*",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL as string,
  },
});