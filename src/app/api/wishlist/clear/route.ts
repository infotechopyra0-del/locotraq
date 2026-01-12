import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

export async function DELETE(req: NextRequest) {
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

    if (!wishlist) {
      return NextResponse.json(
        { success: false, message: 'Wishlist not found' },
        { status: 404 }
      );
    }

    wishlist.items = [];
    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: 'Wishlist cleared successfully',
      wishlist,
      count: 0
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to clear wishlist', error: error.message },
      { status: 500 }
    );
  }
}
