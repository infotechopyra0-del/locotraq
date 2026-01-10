import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const wishlist = await Wishlist.findOne({ userId: session.user.id });

    if (!wishlist || wishlist.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Wishlist is empty' },
        { status: 400 }
      );
    }

    // Generate shareable link (can be enhanced with encryption)
    const shareId = Buffer.from(session.user.id).toString('base64');
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/wishlist/shared/${shareId}`;

    return NextResponse.json({
      success: true,
      shareUrl,
      message: 'Shareable link generated'
    });

  } catch (error: any) {
    console.error('Share Wishlist Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate share link', error: error.message },
      { status: 500 }
    );
  }
}