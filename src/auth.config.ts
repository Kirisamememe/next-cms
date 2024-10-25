import { NextAuthConfig } from 'next-auth';
import { locales } from "./i18n-config";

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
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = request.nextUrl.pathname.match(`^(/(${locales.join('|')}))?/admin/.+`);

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL(`/admin`, request.nextUrl)); // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin/dashboard', request.nextUrl));
      }

      return false;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
} satisfies NextAuthConfig;
