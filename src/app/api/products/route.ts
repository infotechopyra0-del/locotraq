import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'featured';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    await connectDB();
    let query: any = { isActive: true };
    if (category && category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    let sort: any = {};
    switch (sortBy) {
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'featured':
      default:
        sort = { isFeatured: -1, rating: -1, salesCount: -1 };
        break;
    }

    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean(),
      Product.countDocuments(query)
    ]);

    // Transform _id to id for frontend compatibility
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: product._id.toString()
    }));

    console.log('API Debug - Sample product:', transformedProducts[0] ? {
      id: transformedProducts[0].id,
      _id: transformedProducts[0]._id,
      productName: transformedProducts[0].productName
    } : 'No products found');

    // Get categories for filter
    const categories = await Product.distinct('category', { isActive: true });

    return NextResponse.json({
      success: true,
      data: {
        products: transformedProducts,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        categories
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}