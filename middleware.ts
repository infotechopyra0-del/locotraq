// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirect to login if not authenticated
    if (!token && (path.startsWith('/admin') || path.startsWith('/dashboard'))) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Redirect non-admin users trying to access admin routes
    if (path.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Redirect authenticated users away from login page
    if (token && path === '/login') {
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/login'
  ],
};