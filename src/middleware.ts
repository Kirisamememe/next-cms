// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { locales } from "./i18n/config";
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []

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

export const authApi = [
  '/api/generate-article'
]


const { auth } = NextAuth(authConfig)

const authMiddleware = auth((req) => intlMiddleware(req))

const authMIddlewareWithoutIntl = auth

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  if (pathname.startsWith('/api/auth')) {
    return
  }

  if (authApi.includes(pathname)) {
    return (authMIddlewareWithoutIntl as any)(req)
  }

  if (pathname.startsWith('/api') && !authApi.includes(pathname)) {
    const origin = req.headers.get('origin') ?? ''
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
      return new Response(undefined, { status: 500 })
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