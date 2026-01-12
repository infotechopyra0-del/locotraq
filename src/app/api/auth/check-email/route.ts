import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email parameter is required' 
        },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    try {
      await connectToMongoDB();
      const existingUser = await User.findOne({ 
        email: email.toLowerCase() 
      }).select('_id email').lean();

      return NextResponse.json({
        success: true,
        exists: !!existingUser,
        message: existingUser 
          ? 'Email is already registered' 
          : 'Email is available'
      });
    } catch (dbError: any) {
      if (dbError.name === 'MongooseServerSelectionError' || 
          dbError.message?.includes('Could not connect to any servers')) {
        return NextResponse.json({
          success: true,
          exists: false,
          message: 'Email check temporarily unavailable - proceeding with registration',
          warning: 'Database connection failed - email uniqueness will be verified during registration'
        });
      }
      throw dbError;
    }

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Email validation service temporarily unavailable',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 503 } 
    );
  }
}