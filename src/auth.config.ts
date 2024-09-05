import GitHub from "next-auth/providers/github"
 
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub],
  trustHost: true,
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig