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

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
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

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: 'items.productId',
      select: 'productName price originalPrice productImage category stockQuantity'
    });

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
      cart,
      cartCount: cart.items.length,
      totalAmount: cart.totalAmount,
      totalItems: cart.totalItems
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to remove item', error: error.message },
      { status: 500 }
    );
  }
}