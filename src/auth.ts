import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"
import { getUserByEmail, getAllowedEmails, addAllowedEmail, noSuperAdmin, setAsSuperAdmin } from "./actions/user"
import { Role } from "./types/editor-schema"

declare module "next-auth" {
  interface User {
    role: Role,
    nickname: string
  }

  interface Session {
    operatorId: number
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

      if (!allowedEmails.length) {
        const result = await addAllowedEmail(email)
        if (!result.email) {
          throw new Error("common.error.databaseError")
        }
        return true
      }

      if (!allowedEmails.some(val => val.email === email)) {
        throw new Error("Email not allowed")
      }

      return true
    },
    async jwt({ token, user, trigger }) {
      // signInに成功すると、ここにでJWTの加工が行われる
      // ここのuserはなぜか同期的に取得できない
      if (trigger === "signUp" && await noSuperAdmin() && user.email) {
        const res = await setAsSuperAdmin(user.email)
        if (!res) {
          console.error("Database error has occurred: setAsSuperAdmin")
        }
      }

      if (user) {
        token = {
          ...token,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      }
      return token
    },
    async session({ session, token }) {
      // JWTの加工が完了すると、ここでセッションに入れられる
      if (!token.email) {
        throw new Error('common.error.permission')
      }
      const res = await getUserByEmail(token.email)
      if (!res) {
        throw new Error('common.error.databaseError')
      }

      const { email, name } = token as { email: string, name: string, nickname: string, role: Role }
      const { user } = session

      console.log(`---- session実行 ${new Date()} -----`)

      session = {
        ...session,
        operatorId: res.id,
        user: {
          ...user,
          email,
          name,
          role: res.role,
          nickname: res.nickname || "",
          image: res.image
        }
      }

      return session
    }
  },
})