import { NextAuthConfig } from 'next-auth';
import { locales } from "./i18n/config";

const authApi = [
  '/api/generate-article'
]

/**
 * ミドルウェア(edge runtime)用のNextAuthオブジェクト
 * 通常のPrismaClientはここでは使えない
 */
export const authConfig = {
  pages: {
    signIn: '/admin',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = pathname.match(`^/(${locales.join('|')})/admin/.+`);
      const isOnAuthPage = pathname.match(`^/(${locales.join('|')})/admin$`);
      const isAuthApi = authApi.includes(pathname)

      if (!isLoggedIn && isAuthApi) {
        return new Response(undefined, { status: 500 })
      }

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL(`/admin`, request.nextUrl)); // Redirect unauthenticated users to login page
      }

      if (isLoggedIn && isOnAuthPage) {
        // 
        return Response.redirect(new URL(`/admin/dashboard`, request.nextUrl));
      }

      if (isLoggedIn) {
        return true;
      }

      return false;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  trustHost: true
} satisfies NextAuthConfig;
