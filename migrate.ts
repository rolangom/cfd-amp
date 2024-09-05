
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { db } from "./src/db"
 
// This will run migrations on the database, skipping the ones already applied
// await migrate(db, { migrationsFolder: "./drizzle" })
 
// Don't forget to close the connection, otherwise the script will hang
// await connection.end()

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" })
  console.log("Migrations applied.")
}

main()

