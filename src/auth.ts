import { allowedEmailService, userService } from "./di/services"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { authConfig } from "./auth.config"
import { Role } from "./types/schema-editor"

declare module "next-auth" {
  interface User {
    role: Role,
    nickname?: string
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

      const data = await allowedEmailService.getAll()

      if (!data?.length) {
        return true
      }

      if (!data.some(val => val.email === email)) {
        throw new Error("Email not allowed")
      }

      return true
    },
    async jwt({ token, user, trigger }) {
      // signInに成功すると、ここにでJWTの加工が行われる
      // ここのuserはなぜか同期的に取得できない
      // まず、allowed_emailがuserにリンク済みか確認
      // まだリンクしていない場合、リンクを開始
      if ((trigger === "signUp" || trigger === "signIn") && await userService.noSuperAdmin() && user.email) {
        await userService.setSuperAdmin(user.email)
      }

      // 要検証！！
      if ((trigger === "signUp" || trigger === "signIn") && user.email) {
        await userService.authenticateEmail(user.email)
      }

      if (user) {
        token = {
          ...token,
          id: user.id,
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
        console.error('common.form.permission')
        return { ...session, user: { role: "BLOCKED" } }
      }
      const data = await userService.getByEmail(token.email)
      if (!data) {
        console.error('common.form.permission')
        return { ...session, user: { role: "BLOCKED" } }
      }

      const { email, name } = token as { email: string, name: string, nickname: string, role: Role }
      const { user } = session

      console.log(`---- session実行 ${new Date()} -----`)

      session = {
        ...session,
        operatorId: data.id,
        user: {
          ...user,
          email,
          name,
          role: data.role,
          nickname: data.nickname || "",
          image: data.image
        }
      }

      return session
    }
  },
})