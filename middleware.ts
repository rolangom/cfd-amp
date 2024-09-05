import NextAuth from "next-auth"
import authConfig from "./src/auth.config"

console.log("middleware AUTH_TRUST_HOST", process.env.AUTH_TRUST_HOST);
 
export const { auth: middleware } = NextAuth(authConfig)