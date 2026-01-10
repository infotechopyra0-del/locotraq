import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    // Delete NextAuth cookies
    const cookiesToDelete = [
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
      'next-auth.state',
      'next-auth.pkce.code_verifier',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token',
    ];

    // Delete each cookie
    cookiesToDelete.forEach(cookieName => {
      cookieStore.delete(cookieName);
    });

    // Also clear any custom cookies if you have them
    cookieStore.delete('authToken');
    cookieStore.delete('userSession');

    // Return success response with redirect instruction
    return NextResponse.json(
      { 
        success: true, 
        message: 'Logged out successfully',
        redirect: '/'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Logout failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    // Delete NextAuth cookies
    const cookiesToDelete = [
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
      'next-auth.state',
      'next-auth.pkce.code_verifier',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token',
    ];

    // Delete each cookie
    cookiesToDelete.forEach(cookieName => {
      cookieStore.delete(cookieName);
    });

    // Also clear any custom cookies
    cookieStore.delete('authToken');
    cookieStore.delete('userSession');

    // Redirect to home page
    return NextResponse.redirect(new URL('/', req.url));

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}