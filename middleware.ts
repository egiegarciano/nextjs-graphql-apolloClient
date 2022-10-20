import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// jsonwebtoken cannot run on the Edge environment. You have to use a library that does
// https://github.com/vercel/next.js/discussions/38227

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')
  const adminAccessToken = request.cookies.get('adminAccessToken')

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

  // Todo: setup middleware other admin pages, return to login if no admin access token

  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!adminAccessToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (adminAccessToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}
