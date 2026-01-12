import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Try to connect to database with error handling
    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('Database connection failed:', dbError.message);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database connection failed. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
        },
        { status: 503 } // Service Unavailable
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const inquiryType = searchParams.get('inquiryType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (inquiryType) query.inquiryType = inquiryType;

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Contact.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error: any) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}