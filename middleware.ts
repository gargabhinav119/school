import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // Admin login page - always accessible
  if (pathname === '/admin/login') {
    // If already logged in, redirect to home
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Admin routes (except login) - need authentication
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // Protected API routes - need authentication
  if (pathname.startsWith('/api/students')) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return NextResponse.next();
  }

  // API auth routes - always accessible
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Public routes - always accessible
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/students/:path*',
    '/api/auth/:path*',
  ],
};