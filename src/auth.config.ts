import { NextAuthConfig } from 'next-auth';
import { locales } from "./i18n-config";

/**
 * ミドルウェア(edge runtime)用のNextAuthオブジェクト
 * 通常のPrismaClientはここでは使えない
 */
export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.match(`^(/(${locales.join('|')}))?/dashboard.*`);

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }

      // if (!isLoggedIn) {
      //   return false
      // }

      return false;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
} satisfies NextAuthConfig;
