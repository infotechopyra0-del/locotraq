import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  console.log('🚀 Middleware triggered for path:', path);

  // Skip API routes and static files
  if (
    path.startsWith('/api/') ||
    path.startsWith('/_next/') ||
    path.startsWith('/favicon') ||
    path.includes('.') ||
    path.startsWith('/auth/')  // Skip all auth pages from middleware
  ) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({ req });
    console.log('🔑 Token exists:', !!token, 'for path:', path);

    // Protected routes that require authentication
    const protectedRoutes = [
      '/admin',
      '/dashboard',
      '/profile',
      '/checkout',
      '/my-orders',
      '/payment-success',
      '/payment-failed',
      '/wishlist',
      '/cart'  // Add cart to protected routes
    ];

    // Check if current path requires authentication
    const isProtectedRoute = protectedRoutes.some(route => {
      return path === route || path.startsWith(route + '/');
    });

    console.log('🛡️  Is protected route:', isProtectedRoute);

    // Handle unauthenticated users accessing protected routes
    if (!token && isProtectedRoute) {
      console.log('🚫 Redirecting unauthenticated user from:', path);
      
      // Special handling for admin routes - redirect to home
      if (path.startsWith('/admin')) {
        console.log('🏠 Unauthenticated user trying to access admin, redirecting to home');
        return NextResponse.redirect(new URL('/', req.url));
      }
      
      // Special handling for wishlist - redirect to home instead of login
      if (path === '/wishlist') {
        console.log('🏠 Redirecting to home page from wishlist');
        return NextResponse.redirect(new URL('/', req.url));
      }
      
      // For other protected routes, redirect to login
      console.log('🔑 Redirecting to login page');
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    // Special handling for admin routes
    if (path.startsWith('/admin')) {
      console.log('🛡️  Admin route accessed by user with role:', token?.role);
      console.log('🔍 Token details:', {
        exists: !!token,
        role: token?.role,
        email: token?.email,
        id: token?.id
      });
      
      if (!token) {
        console.log('🚫 No token, redirecting to home');
        return NextResponse.redirect(new URL('/', req.url));
      }
      
      // Check user role for admin access
      if (token.role !== 'admin') {
        console.log('❌ Non-admin user trying to access admin route, redirecting to home');
        return NextResponse.redirect(new URL('/', req.url));
      }
      
      // Admin user accessing /admin - redirect to dashboard
      if (path === '/admin') {
        console.log('👑 Admin accessing /admin, redirecting to dashboard');
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      
      console.log('✅ Admin user accessing admin route:', path);
      return NextResponse.next();
    }

    // Redirect authenticated users away from login page
    if (token && path === '/auth/login') {
      const callbackUrl = req.nextUrl.searchParams.get('callbackUrl');
      if (callbackUrl) {
        console.log('✅ Redirecting to callback URL:', callbackUrl);
        return NextResponse.redirect(new URL(callbackUrl, req.url));
      }
      
      if (token.role === 'admin') {
        console.log('👑 Admin user, redirecting to dashboard');
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      
      console.log('👤 Regular user, redirecting to home');
      return NextResponse.redirect(new URL('/', req.url));
    }

    console.log('✅ Allowing access to:', path);
    return NextResponse.next();
  } catch (error) {
    console.error('❌ Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};