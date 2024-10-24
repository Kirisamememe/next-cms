import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { authConfig } from "./auth.config"
import { getUserRoleByEmail, getAllowedEmails, addAllowedEmail } from "./actions/user"

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "USER"
  }

  interface Session {
    expires: Date
  }

  interface JWT {
    absoluteExp: number
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Resend,
  ],
  callbacks: {
    async signIn({ user }) {
      // providerから認証成功のオブジェクトが返却されると、まずここに来る
      const { email } = user
      if (!email) {
        console.error("User email is missing")
        return false
      }

      const allowedEmails = await getAllowedEmails()

      if (allowedEmails.length === 0) {
        const result = await addAllowedEmail(email)
        if (!result.email) {
          throw new Error("DB Error")
        }
        return true
      }

      if (!allowedEmails.some(val => val.email === email)) {
        throw new Error("Email not allowed")
      }

      return true
    },
    async jwt({ token, user }) {
      // signInに成功すると、ここにでJWTの加工が行われる
      // ここのuserはなぜか同期的に取得できない
      if (user) {
        const role = await getUserRoleByEmail(user.email || "")
        token = {
          ...token,
          name: user.name,
          email: user.email,
          image: user.image,
          role: role?.role
        }
      }
      return token
    },
    async session({ session, token }) {
      // JWTの加工が完了すると、ここでセッションに入れられる
      if (token) {
        const { email, name, role } = token as { email: string, name: string, role: "ADMIN" | "USER" }
        const { user } = session

        session = {
          ...session,
          user: { ...user, email, role, name }
        }
      }

      return session
    }
  },
})