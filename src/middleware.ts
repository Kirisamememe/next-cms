// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextRequest } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}