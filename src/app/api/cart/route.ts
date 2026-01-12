// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';

// GET - Fetch Cart
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const emailParam = req.nextUrl.searchParams.get('email');
    
    const userEmail = session?.user?.email || emailParam;
    
    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const cart = await Cart.findOne({ userEmail: userEmail })
      .populate({
        path: 'items.productId',
        select: 'productName price originalPrice productImage category stockQuantity isActive specifications features'
      })
      .lean();

    if (!cart) {
      return NextResponse.json({
        success: true,
        cart: null,
        items: [],
        totalAmount: 0,
        totalItems: 0,
        cartCount: 0
      });
    }

    const validItems = cart.items.filter((item: any) => 
      item.productId && 
      item.productId.isActive && 
      item.productId.stockQuantity > 0
    );

    const formattedItems = validItems.map((item: any) => ({
      _id: item._id,
      productId: item.productId._id,
      productName: item.productId.productName,
      price: item.price,
      originalPrice: item.productId.originalPrice,
      quantity: item.quantity,
      productImage: item.productId.productImage,
      category: item.productId.category,
      stockQuantity: item.productId.stockQuantity,
      specifications: item.productId.specifications,
      features: item.productId.features,
      inStock: item.productId.stockQuantity >= item.quantity,
      maxQuantity: Math.min(item.productId.stockQuantity, 10),
      subtotal: item.price * item.quantity,
      addedAt: item.addedAt
    }));

    const totalAmount = formattedItems.reduce((sum: number, item: any) => sum + item.subtotal, 0);
    const totalItems = formattedItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

    return NextResponse.json({
      success: true,
      cart: cart,
      items: formattedItems,
      totalAmount,
      totalItems,
      cartCount: formattedItems.length
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch cart', error: error.message },
      { status: 500 }
    );
  }
}

// POST - Add to Cart
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Please login to add items to cart' },
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
    const product = await Product.findById(productId).lean();
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    if (!product.isActive) {
      return NextResponse.json(
        { success: false, message: 'Product is not available' },
        { status: 400 }
      );
    }

    if (product.stockQuantity < quantity) {
      return NextResponse.json(
        { success: false, message: 'Insufficient stock' },
        { status: 400 }
      );
    }
    let cart = await Cart.findOne({ userEmail: session.user.email });

    if (!cart) {
      cart = new Cart({
        userId: session.user.id,
        userEmail: session.user.email,
        items: []
      });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stockQuantity) {
        return NextResponse.json(
          { success: false, message: 'Cannot add more items than available stock' },
          { status: 400 }
        );
      }

      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].price = product.price;
    } else {
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price,
        addedAt: new Date()
      });
    }

    // Calculate totals before saving
    cart.totalItems = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Save cart WITHOUT populating (to avoid triggering Product model hooks)
    await cart.save();

    // Return response WITHOUT populated data
    return NextResponse.json({
      success: true,
      message: 'Product added to cart successfully',
      cartCount: cart.items.length,
      totalItems: cart.totalItems,
      totalAmount: cart.totalAmount
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to add to cart', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Remove from Cart
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

    await dbConnect();

    const cart = await Cart.findOne({ userEmail: session.user.email });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }

    if (productId) {
      cart.items = cart.items.filter(
        (item: any) => item.productId.toString() !== productId
      );
    } else {
      cart.items = [];
    }

    cart.totalItems = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    await cart.save();

    return NextResponse.json({
      success: true,
      message: productId ? 'Item removed from cart' : 'Cart cleared',
      cartCount: cart.items.length,
      totalItems: cart.totalItems
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to remove from cart', error: error.message },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
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

    if (!productId || quantity < 1) {
      return NextResponse.json(
        { success: false, message: 'Invalid request data' },
        { status: 400 }
      );
    }

    await dbConnect();

    const product = await Product.findById(productId).lean();
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    if (quantity > product.stockQuantity) {
      return NextResponse.json(
        { success: false, message: 'Insufficient stock' },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userEmail: session.user.email });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Item not found in cart' },
        { status: 404 }
      );
    }

    cart.items[itemIndex].quantity = quantity;
    cart.totalItems = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    await cart.save();

    return NextResponse.json({
      success: true,
      message: 'Cart updated successfully',
      cartCount: cart.items.length,
      totalItems: cart.totalItems
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to update cart', error: error.message },
      { status: 500 }
    );
  }
}