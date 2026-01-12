import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';

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

    const cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }

    cart.items = [];
    await cart.save();

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully',
      cart,
      cartCount: 0,
      totalAmount: 0,
      totalItems: 0
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to clear cart', error: error.message },
      { status: 500 }
    );
  }
}

