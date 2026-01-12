import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dbndsbndsdsdbdsbs';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Not authenticated',
          user: null 
        },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      name?: string;
    };

    // Return user data
    return NextResponse.json({
      success: true,
      message: 'Authenticated',
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      },
    });

  } catch (error) {
    const response = NextResponse.json(
      { 
        success: false, 
        message: 'Invalid token',
        user: null 
      },
      { status: 401 }
    );

    response.cookies.delete('auth_token');
    
    return response;
  }
}