import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';
import Product from '@/models/Product';

// GET - Fetch Wishlist
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const wishlist = await Wishlist.findOne({ userId: session.user.id })
      .populate({
        path: 'items.productId',
        select: 'productName price originalPrice productImage category subcategory rating reviewCount stockQuantity isActive inStock features specifications slug'
      })
      .lean();

    if (!wishlist) {
      return NextResponse.json({
        success: true,
        wishlist: null,
        items: [],
        count: 0,
        totalItems: 0
      });
    }

    // Filter out inactive products or deleted products
    const validItems = wishlist.items.filter((item: any) => 
      item.productId && item.productId.isActive
    );

    // Format wishlist items with product details
    const formattedItems = validItems.map((item: any) => {
      const product = item.productId;
      const priceDropped = product.price < item.priceWhenAdded;
      const priceDropAmount = priceDropped ? item.priceWhenAdded - product.price : 0;
      
      return {
        _id: item._id,
        productId: product._id,
        productName: product.productName,
        price: product.price,
        originalPrice: product.originalPrice,
        priceWhenAdded: item.priceWhenAdded,
        priceDropped,
        priceDropAmount,
        productImage: product.productImage,
        category: product.category,
        subcategory: product.subcategory,
        rating: product.rating,
        reviewCount: product.reviewCount,
        stockQuantity: product.stockQuantity,
        inStock: product.inStock,
        isActive: product.isActive,
        features: product.features,
        specifications: product.specifications,
        slug: product.slug,
        discountPercentage: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
        addedAt: item.addedAt
      };
    });

    // Sort by most recently added
    formattedItems.sort((a: any, b: any) => 
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      wishlist: wishlist,
      items: formattedItems,
      count: formattedItems.length,
      totalItems: formattedItems.length,
      priceDropCount: formattedItems.filter((item: any) => item.priceDropped).length
    });

  } catch (error: any) {
    console.error('Wishlist GET Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch wishlist', error: error.message },
      { status: 500 }
    );
  }
}

// POST - Add to Wishlist
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Please login to add items to wishlist' },
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

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ userId: session.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: session.user.id,
        items: []
      });
    }

    // Check if product already in wishlist
    const existingItem = wishlist.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      return NextResponse.json(
        { success: false, message: 'Product already in wishlist' },
        { status: 400 }
      );
    }

    // Add new item
    wishlist.items.push({
      productId: product._id,
      addedAt: new Date(),
      priceWhenAdded: product.price
    });

    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: 'Product added to wishlist successfully',
      wishlist,
      count: wishlist.items.length
    });

  } catch (error: any) {
    console.error('Wishlist POST Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add to wishlist', error: error.message },
      { status: 500 }
    );
  }
}