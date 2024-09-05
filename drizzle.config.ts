import { defineConfig } from "drizzle-kit";

console.log('AUTH_DRIZZLE_URL',process.env.DATABASE_URL)

export default defineConfig({
  dialect: "postgresql",
  schema: "./schemas/*",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});