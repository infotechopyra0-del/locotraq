import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    // Find product by ID or slug
    let product;
    
    // First try to find by MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id).lean();
    }
    
    // If not found or invalid ObjectId, try to find by slug
    if (!product) {
      product = await Product.findOne({ slug: id }).lean();
    }

    if (!product || !product.isActive) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform _id to id for frontend compatibility
    const transformedProduct = {
      ...product,
      id: product._id.toString(),
      _id: product._id.toString()
    };

    // Increment view count
    await Product.findByIdAndUpdate(product._id, { $inc: { views: 1 } });

    // Get related products (same category, excluding current product)
    let relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
      inStock: true
    })
    .limit(6)
    .select('productName name price originalPrice productImage imageUrl rating _id slug category')
    .lean();

    // If no related products in same category, get any other products
    if (relatedProducts.length < 3) {
      const additionalProducts = await Product.find({
        _id: { $ne: product._id },
        isActive: true,
        inStock: true
      })
      .limit(6 - relatedProducts.length)
      .select('productName name price originalPrice productImage imageUrl rating _id slug category')
      .lean();

      relatedProducts = [...relatedProducts, ...additionalProducts];
    }

    const transformedRelatedProducts = relatedProducts.map(p => ({
      ...p,
      id: p._id.toString(),
      _id: p._id.toString()
    }));

    return NextResponse.json({
      success: true,
      data: {
        product: transformedProduct,
        relatedProducts: transformedRelatedProducts
      }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}