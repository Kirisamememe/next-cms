import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { authConfig } from "./auth.config"
import { getUserRoleByEmail, isAllowedEmail } from "./actions/user"

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
    async signIn({user, account}) {
      // providerから認証成功のオブジェクトが返却されると、まずここに来る
      if (!user.email) return false

      if (!await isAllowedEmail(user.email)) {
        throw new Error("Email not allowed")
      }
      
      return true
    },
    async jwt({ token, user }) {
      // signInに成功すると、ここにでJWTの加工が行われる
      // 非同期関数のため、ここでの早期returnはあまり意味ない
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