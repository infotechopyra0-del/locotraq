import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';
import { products } from '@/lib/products';

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

    const wishlist = await Wishlist.findOne({ userId: session.user.id }).lean();

    if (!wishlist) {
      return NextResponse.json({
        success: true,
        wishlist: null,
        items: [],
        count: 0,
        totalItems: 0
      });
    }

    // Get static products data
    const staticProducts = products();

    // Filter out items that don't have corresponding static products
    const validItems = wishlist.items.filter((item: any) => {
      const staticProduct = staticProducts.find(p => p.id === item.productId.toString());
      return staticProduct && staticProduct.isActive;
    });

    // Format wishlist items with static product details
    const formattedItems = validItems.map((item: any) => {
      const staticProduct = staticProducts.find(p => p.id === item.productId.toString());
      const priceDropped = staticProduct!.price < item.priceWhenAdded;
      const priceDropAmount = priceDropped ? item.priceWhenAdded - staticProduct!.price : 0;
      
      return {
        _id: item._id,
        productId: staticProduct!.id,
        productName: staticProduct!.productName,
        price: staticProduct!.price,
        originalPrice: staticProduct!.originalPrice,
        priceWhenAdded: item.priceWhenAdded,
        priceDropped,
        priceDropAmount,
        productImage: staticProduct!.productImage,
        category: staticProduct!.category,
        subcategory: staticProduct!.subcategory,
        rating: staticProduct!.rating,
        reviewCount: staticProduct!.reviewCount,
        stockQuantity: staticProduct!.stockQuantity,
        inStock: staticProduct!.inStock,
        isActive: staticProduct!.isActive,
        features: staticProduct!.features,
        specifications: staticProduct!.specifications,
        discountPercentage: Math.round(((staticProduct!.originalPrice - staticProduct!.price) / staticProduct!.originalPrice) * 100),
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
    const { productId, productName, price, image } = body;

    if (!productId || !productName || price === undefined) {
      return NextResponse.json(
        { success: false, message: 'Product ID, name, and price are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ userId: session.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: session.user.id,
        items: []
      });
    }

    // Check if product already in wishlist (using string productId)
    const existingItem = wishlist.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      return NextResponse.json(
        { success: false, message: 'Product already in wishlist' },
        { status: 400 }
      );
    }

    // Add new item (store as string, will be converted by mongoose)
    wishlist.items.push({
      productId: productId, // This will work as string
      addedAt: new Date(),
      priceWhenAdded: price
    });

    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: 'Product added to wishlist successfully',
      wishlist,
      count: wishlist.items.length
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to add to wishlist', error: error.message },
      { status: 500 }
    );
  }
}