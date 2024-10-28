// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { locales } from "./i18n/config";
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export const publicPages = [
  '/docs',
  '/articles',
  '/timeline',
  '/work',
  '/about-me'
];

export const authPages = [
  '/admin',
]


const { auth } = NextAuth(authConfig)

const authMiddleware = auth((req) => intlMiddleware(req))

const intlMiddleware = createMiddleware(routing);


// const intlMiddleware = (req: NextRequest) => {
//   // console.log("！！！！！！！　intlMiddlewareに入った　！！！！！！！")
//   const { nextUrl } = req;
//   // console.log(`今回のURL：${nextUrl}`)
//   // console.log(`今回のpathname：${nextUrl.pathname}`)

//   const pathnameIsMissingLocale = locales.every(
//     (locale) =>
//       !nextUrl.pathname.startsWith(`/${locale}/`) && nextUrl.pathname !== `/${locale}`,
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     // console.log("！！！！！！！　pathnameIsMissingLocaleに入った　！！！！！！！")
//     const locale = req.cookies.get('NEXT_LOCALE')?.value || getLocale(req);
//     const query = nextUrl.toString().split('?')[1] || ""

//     const newUrl = new URL(
//       `/${locale}${nextUrl.pathname.startsWith("/") ? "" : "/"}${nextUrl.pathname}${query ? `?${query}` : ""}`,
//       req.url,
//     )
//     // console.log(`リダイレクト先: ${newUrl}`)
//     // e.g. incoming request is /products
//     // The new URL is now /en-US/products
//     return NextResponse.redirect(newUrl);
//   }

//   return
// }

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})(/.*)/?$`,
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
    // console.log("------ intlMiddleware が実行されます！ --------")
    return intlMiddleware(req);
  } else {
    // console.log("------ auth が実行されます！ --------")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}