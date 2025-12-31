 'use client';

import React, { useState, useEffect, useContext } from 'react';
import {
  Heart, Trash2, ShoppingCart, ArrowRight, Star, X, Package,
  TrendingUp, Sparkles, AlertCircle, ChevronRight, Plus
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { ClerkAvailableContext } from '@/components/ClerkProviderWrapper';
import Link from 'next/link';
import Header from '@/components/Header';

interface WishlistItem {
  _id: string;
  productId: string;
  product: {
    productName: string;
    price: number;
    originalPrice?: number;
    productImage: string;
    category?: string;
    rating?: number;
    inStock?: boolean;
  };
  addedAt: string;
}

export default function WishlistPage() {
  const clerkAvailable = useContext(ClerkAvailableContext);

  if (clerkAvailable) {
    return <WishlistPageWithUser />;
  }

  return <WishlistPageCore isSignedIn={false} />;
}

function WishlistPageWithUser() {
  const { isSignedIn, user } = useUser();
  return <WishlistPageCore isSignedIn={!!isSignedIn} />;
}

function WishlistPageCore({ isSignedIn }: { isSignedIn: boolean }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wishlist');
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setRemovingId(productId);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(prev => prev.filter(item => item.productId !== productId));
      }
    } catch (error) {
      alert('Failed to remove from wishlist');
    } finally {
      setRemovingId(null);
    }
  };

  const moveToCart = async (item: WishlistItem) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: item.productId,
          product: item.product,
          quantity: 1
        })
      });
      const data = await res.json();
      if (data.success) {
        await removeFromWishlist(item.productId);
        alert('Product moved to cart!');
      }
    } catch (error) {
      alert('Failed to move to cart');
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Sign In to View Your Wishlist
            </h2>
            <p className="text-gray-600 mb-8">
              Save your favorite products and access them anytime
            </p>
            <Link
              href="/sign-in"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-pink-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Heart className="w-8 h-8 text-white mr-3 fill-white" />
                <h1 className="text-3xl md:text-4xl font-black text-white">
                  My Wishlist
                </h1>
              </div>
              <p className="text-white/90">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save your favorite products here and shop them later!
            </p>
            <Link
              href="/products"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-100 to-pink-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-black text-gray-900">Product</th>
                    <th className="px-6 py-4 text-center font-black text-gray-900">Price</th>
                    <th className="px-6 py-4 text-center font-black text-gray-900">Stock</th>
                    <th className="px-6 py-4 text-center font-black text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item) => (
                    <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.productImage}
                              alt={item.product.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link
                              href={`/product/${item.productId}`}
                              className="font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2"
                            >
                              {item.product.productName}
                            </Link>
                            {item.product.category && (
                              <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                            )}
                            {item.product.rating && (
                              <div className="flex items-center mt-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="text-sm text-gray-600">{item.product.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-black text-gray-900 text-lg">
                          ₹{item.product.price.toLocaleString()}
                        </div>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{item.product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.product.inStock !== false ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => moveToCart(item)}
                            disabled={item.product.inStock === false}
                            className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            title="Move to Cart"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.productId)}
                            disabled={removingId === item.productId}
                            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300"
                            title="Remove"
                          >
                            {removingId === item.productId ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {wishlist.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.product.productImage}
                      alt={item.product.productName}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {item.product.inStock === false && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <Link
                      href={`/product/${item.productId}`}
                      className="font-bold text-gray-900 hover:text-orange-600 line-clamp-2 mb-2 block"
                    >
                      {item.product.productName}
                    </Link>
                    {item.product.category && (
                      <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-black text-gray-900 text-xl">
                          ₹{item.product.price.toLocaleString()}
                        </div>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{item.product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      {item.product.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm font-bold">{item.product.rating}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => moveToCart(item)}
                      disabled={item.product.inStock === false}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="flex-1 bg-white border-2 border-orange-600 text-orange-600 py-3 px-6 rounded-lg font-bold hover:bg-orange-50 transition-colors text-center"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  wishlist.forEach(item => moveToCart(item));
                }}
                className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Move All to Cart
              </button>
            </div>
          </>
        )}
      </div>

      {/* Recommendations */}
      {wishlist.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-orange-600" />
              You May Also Like
            </h2>
            <p className="text-gray-600 mb-8">Based on your wishlist items</p>
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700"
              >
                View Similar Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}