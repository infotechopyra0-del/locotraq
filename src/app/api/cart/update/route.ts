import Promo from '@/models/Promo';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, message: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { success: false, message: 'Quantity must be at least 1' },
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

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Product not found in cart' },
        { status: 404 }
      );
    }

    // Verify stock availability
    const product = await Product.findById(productId);
    if (product && quantity > product.stockQuantity) {
      return NextResponse.json(
        { success: false, message: 'Requested quantity exceeds available stock' },
        { status: 400 }
      );
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: 'items.productId',
      select: 'productName price originalPrice productImage category stockQuantity'
    });

    return NextResponse.json({
      success: true,
      message: 'Cart updated successfully',
      cart,
      totalAmount: cart.totalAmount,
      totalItems: cart.totalItems
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to update cart', error: error.message },
      { status: 500 }
    );
  }
}
