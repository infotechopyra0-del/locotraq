'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, Filter, ShoppingCart, Star, ArrowRight, Eye, Heart, 
  Zap, SlidersHorizontal, X, ChevronDown, Package, TrendingUp,
  Award, Shield, Truck, Clock, BadgeCheck, Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GPSProduct {
  id: string;
  _id?: string;
  productName?: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  rating?: number;
  reviewCount?: number;
  productImage?: string;
  imageUrl?: string;
  imageAlt?: string;
  images?: string[];
  features?: string[];
  isFeatured?: boolean;
  inStock?: boolean;
  specifications?: { [key: string]: string };
  isActive?: boolean;
  stockQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ProductsPage() {
  return <ProductsPageCore isSignedIn={false} />;
}

function ProductsPageCore({ isSignedIn }: { isSignedIn: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<GPSProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<GPSProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from database
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        sortBy: sortBy,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString()
      });
      
      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.products);
        setFilteredProducts(data.data.products);
        setCategories(['all', ...data.data.categories]);
        setError(null);
        console.log('Frontend Debug - Sample product:', data.data.products[0] ? {
          id: data.data.products[0].id,
          _id: data.data.products[0]._id,
          productName: data.data.products[0].productName
        } : 'No products found');
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (!loading) {
      const debounceTimeout = setTimeout(() => {
        fetchProducts();
      }, 300);
      return () => clearTimeout(debounceTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  // Local filtering for immediate UI response (optional, since API handles filtering)
  useEffect(() => {
    let filtered = products;
    setFilteredProducts(filtered);
  }, [products]);

  const handleBuyNow = (product: GPSProduct) => {
    if (!session) {
      const checkoutUrl = `/checkout?productId=${product.id}&name=${encodeURIComponent(product.productName || product.name || 'GPS Tracker')}&price=${product.price}&image=${encodeURIComponent(product.productImage || product.imageUrl || '')}&quantity=1`;
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(checkoutUrl)}`);
      return;
    }
    const checkoutUrl = `/checkout?productId=${product.id}&name=${encodeURIComponent(product.productName || product.name || 'GPS Tracker')}&price=${product.price}&image=${encodeURIComponent(product.productImage || product.imageUrl || '')}&quantity=1`;
    router.push(checkoutUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* Hero Header */}
      <section className="bg-linear-to-r from-orange-600 to-orange-500 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Premium GPS Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              GPS Tracking Solutions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Professional tracking devices for vehicles, assets, and personal safety with cutting-edge technology
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { icon: Shield, text: 'Secure Tracking' },
                { icon: Truck, text: 'Free Shipping' },
                { icon: Award, text: 'Quality Assured' }
              ].map((item, i) => (
                <div key={i} className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="z-40 bg-white border-b-2 border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-semibold"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort & Filter Toggle */}
            <div className="flex gap-3 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 lg:flex-none px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 font-semibold cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-xl font-bold"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="text-gray-600 font-semibold">
              Showing <span className="text-orange-600 font-black">{filteredProducts.length}</span> of {products.length} products
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-orange-600 hover:text-orange-700 font-bold flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-linear-to-r from-orange-50 to-orange-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: BadgeCheck, text: 'Certified Products', sub: '100% Genuine' },
              { icon: Truck, text: 'Free Shipping', sub: 'Orders above ₹10,000' },
              { icon: Clock, text: '24/7 Support', sub: 'Always Available' },
              { icon: Shield, text: 'Secure Payment', sub: '100% Protected' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center space-x-2">
                <item.icon className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900">{item.text}</div>
                  <div className="text-xs text-gray-600">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Package className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading products...</h3>
              <p className="text-gray-600">Please wait while we fetch the latest products</p>
              <div className="flex justify-center mt-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Error loading products</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-160 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100 shrink-0">
                    <Link href={`/products/${product.id}`}>
                      <img
                        src={product.productImage || product.imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'}
                        alt={product.imageAlt || product.productName || product.name || 'GPS Tracker'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isFeatured && (
                        <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                          <Star className="w-3 h-3 mr-1 fill-white" />
                          Featured
                        </div>
                      )}
                      <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {product.category}
                      </div>
                    </div>

                    {/* Discount Badge */}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                      <Heart className="w-5 h-5" />
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/products/${product.id}`}>
                        <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl">
                          <Eye className="w-5 h-5" />
                          <span>Quick View</span>
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col grow">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer min-h-14">
                        {product.productName || product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-10">
                      {product.shortDescription || product.description}
                    </p>
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-black text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through font-semibold">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-sm text-green-600 font-bold">
                          Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Buy Now
                      </button>
                      <Link href={`/products/${product.id}`} className="block">
                        <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center">
                          <Eye className="w-5 h-5 mr-2" />
                          View Details
                        </button>
                      </Link>
                    </div>

                    {/* Stock Status */}
                    <div className="mt-3 text-center">
                      {product.inStock ? (
                        <span className="text-sm text-green-600 font-bold flex items-center justify-center">
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          In Stock
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 font-bold">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-orange-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Need Help Choosing the Right Tracker?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our experts are ready to help you find the perfect GPS tracking solution for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support">
              <button
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get Expert Advice
              </button>
              </Link>
              <Link href="/quote">
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105 flex items-center justify-center">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Request Custom Quote
                </button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
              {[
                'Free Consultation',
                'Expert Support',
                'Best Prices Guaranteed'
              ].map((text, i) => (
                <div key={i} className="flex items-center">
                  <BadgeCheck className="w-5 h-5 mr-2" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}