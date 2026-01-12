'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, ShoppingCart, Trash2, ArrowLeft, 
  Package, Star, TrendingDown, Loader2, 
  RefreshCw, Share2, Filter, SortAsc, X,
  Clock, Grid, List
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface WishlistItem {
  _id: string;
  productId: string;
  productName: string;
  price: number;
  originalPrice: number;
  priceWhenAdded: number;
  priceDropped: boolean;
  priceDropAmount: number;
  productImage: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  stockQuantity: number;
  inStock: boolean;
  isActive: boolean;
  features: string[];
  specifications: any;
  slug: string;
  discountPercentage: number;
  addedAt: string;
}

const DynamicWishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [processing, setProcessing] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high' | 'discount'>('recent');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const [priceDropCount, setPriceDropCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true);
      }
      
      const response = await fetch('/api/wishlist');
      const data = await response.json();

      if (data.success) {
        setWishlistItems(data.items || []);
        setTotalItems(data.totalItems || 0);
        setPriceDropCount(data.priceDropCount || 0);
      } else {
        setWishlistItems([]);
        setTotalItems(0);
        setPriceDropCount(0);
      }
    } catch (err: any) {
      setWishlistItems([]);
      setTotalItems(0);
      setPriceDropCount(0);
    } finally {
      if (showRefreshIndicator) {
        setRefreshing(false);
      }
      setInitialLoad(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!confirm('Remove this item from wishlist?')) return;

    try {
      setProcessing(productId);
      
      const response = await fetch(`/api/wishlist/remove?productId=${productId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
        setTotalItems(prev => prev - 1);
      } else {
        alert(data.message || 'Failed to remove item');
      }
    } catch (err) {
      console.error('Remove error:', err);
      alert('Failed to remove item');
    } finally {
      setProcessing(null);
    }
  };

  const moveToCart = async (productId: string) => {
    try {
      setProcessing(productId);
      
      const response = await fetch('/api/wishlist/move-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 })
      });

      const data = await response.json();

      if (data.success) {
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
        setTotalItems(prev => prev - 1);
        alert('Item moved to cart successfully!');
      } else {
        alert(data.message || 'Failed to move item');
      }
    } catch (err) {
      console.error('Move to cart error:', err);
      alert('Failed to move item to cart');
    } finally {
      setProcessing(null);
    }
  };

  const clearWishlist = async () => {
    if (!confirm('Are you sure you want to clear your entire wishlist?')) return;

    try {
      setRefreshing(true);
      
      const response = await fetch('/api/wishlist/clear', {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setWishlistItems([]);
        setTotalItems(0);
        setPriceDropCount(0);
      } else {
        alert(data.message || 'Failed to clear wishlist');
      }
    } catch (err) {
      console.error('Clear wishlist error:', err);
      alert('Failed to clear wishlist');
    } finally {
      setRefreshing(false);
    }
  };

  const shareWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist/share', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.success) {
        setShareUrl(data.shareUrl);
        setShowShareModal(true);
      } else {
        alert(data.message || 'Failed to generate share link');
      }
    } catch (err) {
      console.error('Share error:', err);
      alert('Failed to share wishlist');
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const categories = ['all', ...new Set(wishlistItems.map(item => item.category))];
  
  const filteredItems = wishlistItems.filter(item => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'discount':
        return b.discountPercentage - a.discountPercentage;
      case 'recent':
      default:
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
  });

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-orange-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">No Items Found</h2>
            <p className="text-gray-600 mb-8">
              Your wishlist is empty. Start adding your favorite GPS trackers!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/products"
                className="inline-flex items-center justify-center bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105"
              >
                <Package className="w-5 h-5 mr-2" />
                Explore Products
              </a>
              <button
                onClick={() => fetchWishlist(true)}
                disabled={refreshing}
                className="inline-flex items-center justify-center bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      {/* Page Header */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center">
                <Heart className="w-8 h-8 mr-3 fill-white" />
                My Wishlist
              </h1>
              <p className="text-white/90">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => fetchWishlist(true)}
                disabled={refreshing}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden md:inline">Refresh</span>
              </button>
              <button
                onClick={shareWishlist}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Share</span>
              </button>
              {wishlistItems.length > 0 && (
                <button
                  onClick={clearWishlist}
                  disabled={refreshing}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Price Drop Alert */}
      {priceDropCount > 0 && (
        <div className="bg-green-50 border-y border-green-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center text-green-700">
              <TrendingDown className="w-5 h-5 mr-3 text-green-600" />
              <span className="font-bold">
                Great News! {priceDropCount} {priceDropCount === 1 ? 'item has' : 'items have'} dropped in price!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filters & View Controls */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filters */}
            <div className="flex items-center space-x-4 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 font-semibold text-sm focus:border-orange-500 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <SortAsc className="w-4 h-4 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 font-semibold text-sm focus:border-orange-500 focus:outline-none"
                >
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow text-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow text-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {sortedItems.map((item) => (
            <div
              key={item._id}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden relative ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {processing === item.productId && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                  <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                </div>
              )}

              {/* Price Drop Badge */}
              {item.priceDropped && (
                <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  Price Drop!
                </div>
              )}

              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(item.productId)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-red-600 hover:text-white p-2 rounded-full shadow transition-all z-10 group"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Out of Stock Badge */}
              {!item.inStock && (
                <div className="absolute top-12 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  Out of Stock
                </div>
              )}

              {/* Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 shrink-0' : 'aspect-4/3'
              }`}>
                <a href={`/product/${item.slug || item.productId}`}>
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </a>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs text-orange-600 font-bold mb-1">
                  {item.category}
                </span>

                <a href={`/product/${item.slug || item.productId}`}>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
                    {item.productName}
                  </h3>
                </a>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({item.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                      {item.discountPercentage}% OFF
                    </span>
                    {item.priceDropped && (
                      <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded">
                        ↓ ₹{item.priceDropAmount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Added Date */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <button
                  onClick={() => moveToCart(item.productId)}
                  disabled={!item.inStock || processing === item.productId}
                  className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mt-auto"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {item.inStock ? 'Move to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-gray-900">Share Wishlist</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Share your wishlist with friends and family
            </p>
            <div className="bg-gray-100 rounded-lg p-3 mb-4 flex items-center">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              />
              <button
                onClick={copyShareLink}
                className="ml-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700 transition-all text-sm"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DynamicWishlistPage;