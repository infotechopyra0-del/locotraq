import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

// POST - Remove from Wishlist (for compatibility with frontend)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
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

    // Remove item using string comparison
    wishlist.items = wishlist.items.filter(
      item => item.productId !== productId // Direct string comparison
    );

    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: 'Item removed from wishlist',
      wishlist,
      count: wishlist.items.length
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to remove from wishlist', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Remove from Wishlist (alternative method using query params)
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
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

    // Remove item using string comparison
    wishlist.items = wishlist.items.filter(
      item => item.productId !== productId // Direct string comparison
    );

    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: 'Item removed from wishlist',
      wishlist,
      count: wishlist.items.length
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to remove item', error: error.message },
      { status: 500 }
    );
  }
}