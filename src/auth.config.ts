import GitHub from "next-auth/providers/github"
 
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  // providers: [GitHub({
  //   clientId: process.env.AUTH_GITHUB_ID,
  //   clientSecret: process.env.AUTH_GITHUB_SECRET,
  //   checks: ['none'],
  // })],
  providers: [GitHub],
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  // useSecureCookies: process.env.NODE_ENV === "production",
} satisfies NextAuthConfig