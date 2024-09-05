import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer
} from "drizzle-orm/pg-core"
// @ts-ignore
import { createId } from "@paralleldrive/cuid2"
// import type { AdapterAccount } from "@auth/core/adapters"

// import type { AdapterAccount } from "next-auth/adapters"
// import { drizzle } from "drizzle-orm/postgres-js"

type AdapterAccount = {
  type: string
}
 
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().$onUpdateFn(() => new Date()),
})

export type User = typeof users.$inferSelect
 
export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    // compoundKey: primaryKey(account.provider, account.providerAccountId),
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export type Account = typeof accounts.$inferSelect