// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { locales } from "./i18n/config";
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1']
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

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
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    const origin = req.headers.get('origin') ?? ''
    console.log(`origin: ${origin}`)
    const isAllowedOrigin = allowedOrigins.includes(origin)

    const isPreflight = req.method === 'OPTIONS'
    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
      }
      return NextResponse.json({}, { headers: preflightHeaders })
    }
    
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const response = NextResponse.next()
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  }

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}