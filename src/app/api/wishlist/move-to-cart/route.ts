import Cart from '@/models/Cart';
import Product from '@/models/Product';
import Wishlist from '@/models/Wishlist';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';

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
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify product
    const product = await Product.findById(productId);
    
    if (!product || !product.isActive) {
      return NextResponse.json(
        { success: false, message: 'Product not available' },
        { status: 404 }
      );
    }

    if (product.stockQuantity < quantity) {
      return NextResponse.json(
        { success: false, message: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Add to cart
    let cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      cart = new Cart({ userId: session.user.id, items: [] });
    }

    const existingCartItem = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingCartItem > -1) {
      cart.items[existingCartItem].quantity += quantity;
    } else {
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price,
        addedAt: new Date()
      });
    }

    await cart.save();

    // Remove from wishlist
    const wishlist = await Wishlist.findOne({ userId: session.user.id });
    
    if (wishlist) {
      wishlist.items = wishlist.items.filter(
        item => item.productId.toString() !== productId
      );
      await wishlist.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Product moved to cart successfully',
      cart,
      wishlist,
      cartCount: cart.items.length,
      wishlistCount: wishlist ? wishlist.items.length : 0
    });

  } catch (error: any) {
    console.error('Move to Cart Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to move item to cart', error: error.message },
      { status: 500 }
    );
  }
}
