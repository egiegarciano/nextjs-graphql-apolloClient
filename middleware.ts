import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// jsonwebtoken cannot run on the Edge environment. You have to use a library that does
// https://github.com/vercel/next.js/discussions/38227

export function middleware(request: NextRequest) {
  const { nextUrl } = request
  const accessToken = request.cookies.get('accessToken')

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}
