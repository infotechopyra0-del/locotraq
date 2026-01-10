// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protected routes that require authentication
    const protectedRoutes = [
      '/admin',
      '/dashboard',
      '/profile',
      '/checkout',
      '/my-orders',
      '/payment-success',
      '/payment-failed'
    ];

    // Check if current path requires authentication
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // Redirect to login if not authenticated and trying to access protected route
    if (!token && isProtectedRoute) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect non-admin users trying to access admin routes
    if (path.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Redirect authenticated users away from login page
    if (token && path === '/auth/login') {
      const callbackUrl = req.nextUrl.searchParams.get('callbackUrl');
      if (callbackUrl) {
        return NextResponse.redirect(new URL(callbackUrl, req.url));
      }
      
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to API routes
        if (req.nextUrl.pathname.startsWith('/api')) {
          return true;
        }
        
        // Protected routes require authentication
        const protectedRoutes = [
          '/admin',
          '/dashboard', 
          '/profile',
          '/checkout',
          '/my-orders',
          '/payment-success',
          '/payment-failed'
        ];
        
        const isProtectedRoute = protectedRoutes.some(route => 
          req.nextUrl.pathname.startsWith(route)
        );
        
        if (isProtectedRoute) {
          return !!token;
        }
        
        // Allow access to public routes
        return true;
      },
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/checkout/:path*',
    '/my-orders/:path*',
    '/payment-success/:path*',
    '/payment-failed/:path*',
    '/auth/login',
    '/api/orders/:path*',
    '/api/razorpay/:path*'
  ],
};