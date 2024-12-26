import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware for Firebase Auth
export function middleware(request: NextRequest) {
  // Check if user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Get Firebase session cookie
    const session = request.cookies.get('session')

    // If no session exists, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to protect
export const config = {
  matcher: ['/dashboard/:path*']
}

