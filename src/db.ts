// @ts-ignore
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

console.log('AUTH_DRIZZLE_URL',process.env.DATABASE_URL)

const connectionString = process.env.DATABASE_URL as string
const pool = postgres(connectionString, { max: 1 })
 
export const db = drizzle(pool)