import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookiesToDelete = [
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
      'next-auth.state',
      'next-auth.pkce.code_verifier',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token',
    ];
    cookiesToDelete.forEach(cookieName => {
      cookieStore.delete(cookieName);
    });
    cookieStore.delete('authToken');
    cookieStore.delete('userSession');
    return NextResponse.json(
      { 
        success: true, 
        message: 'Logged out successfully',
        redirect: '/'
      },
      { status: 200 }
    );

  } catch (error) {
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
    const cookiesToDelete = [
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
      'next-auth.state',
      'next-auth.pkce.code_verifier',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token',
    ];
    cookiesToDelete.forEach(cookieName => {
      cookieStore.delete(cookieName);
    });
    cookieStore.delete('authToken');
    cookieStore.delete('userSession');
    return NextResponse.redirect(new URL('/', req.url));

  } catch (error) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}