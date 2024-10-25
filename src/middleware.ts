// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { locales } from "./i18n-config";
import { NextRequest, NextResponse } from "next/server";
import { getLocale } from "./lib/get-locale";

export const publicPages = [
  '/docs',
  '/article',
  '/timeline',
  '/work',
  '/about-me'
];

export const authPages = [
  '/admin',
]


const { auth } = NextAuth(authConfig)

const authMiddleware = auth((req) => intlMiddleware(req))

const intlMiddleware = (req: NextRequest) => {
  const { nextUrl } = req;

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !nextUrl.pathname.startsWith(`/${locale}/`) && nextUrl.pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || getLocale(req);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${nextUrl.pathname.startsWith("/") ? "" : "/"}${nextUrl.pathname}`,
        req.url,
      ),
    );
  }

  return
}

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  const authPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${authPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage && !isAuthPage) {
    console.log("------ intlMiddleware が実行されます！ --------")
    return intlMiddleware(req);
  } else {
    console.log("------ auth が実行されます！ --------")
    return (authMiddleware as any)(req);
  }
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}