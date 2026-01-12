import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const emailParam = req.nextUrl.searchParams.get('email');
    
    // Check if user is authenticated via session OR email param
    const userEmail = session?.user?.email || emailParam;
    
    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Find cart by email instead of userId
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
        totalItems: 0
      });
    }

    const validItems = cart.items.filter((item: any) => 
      item.productId && 
      item.productId.isActive && 
      item.productId.stockQuantity > 0
    );

    // Format cart items with product details
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
    console.error('Cart GET Error:', error);
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

    // Verify product exists and is available
    const product = await Product.findById(productId);
    
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

    // Find or create cart using userEmail instead of userId
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
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
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
      // Add new item
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price,
        addedAt: new Date()
      });
    }

    await cart.save();

    // Populate and return updated cart
    await cart.populate({
      path: 'items.productId',
      select: 'productName price originalPrice productImage category stockQuantity'
    });

    return NextResponse.json({
      success: true,
      message: 'Product added to cart successfully',
      cart,
      cartCount: cart.items.length,
      totalItems: cart.totalItems
    });

  } catch (error: any) {
    console.error('Cart POST Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add to cart', error: error.message },
      { status: 500 }
    );
  }
}