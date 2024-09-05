
import NextAuth from "next-auth"
import { DrizzleAdapter,  } from "@auth/drizzle-adapter"
// @ts-ignore
import { DefaultPostgresSchema } from "@auth/drizzle-adapter/src/lib/pg"
import { db } from "./db"
import { users, accounts } from "../schemas/users"
import authConfig from "./auth.config"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  } as DefaultPostgresSchema),
  session: {
    strategy: "jwt",
  },
})