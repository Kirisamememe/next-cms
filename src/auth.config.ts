import { NextAuthConfig } from 'next-auth';

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
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }

      if (!isLoggedIn) {
        return false
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
} satisfies NextAuthConfig;
