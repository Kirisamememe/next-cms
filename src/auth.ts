import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "@/lib/utils"
import { getUserByName } from "./actions/user"
import { compare } from 'bcrypt-ts';
import { signInSchema } from "./types/auth-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/admin',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      authorize: async ({ name, password }) => {
        const { data, error } = await signInSchema.safeParseAsync({ name, password })

        if (error) {
          throw new Error(error.format()._errors.join(', '))
        }
        
        const user = await getUserByName(data.name)
        if (!user) {
          throw new Error("User not found.")
        }

        const pwHash = saltAndHashPassword(data.password)
        const passwordsMatch = await compare(pwHash, user?.password)

        if (!passwordsMatch) {
          throw new Error("Password not matched.")
        }

        return user
      },
    }),
  ],
})