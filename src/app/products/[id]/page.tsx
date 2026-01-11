'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ArrowLeft, ShoppingCart, Heart, Share2, Star, Check, X,
  Shield, Truck, Clock, BadgeCheck, Package, Zap, Award,
  ChevronLeft, ChevronRight, Phone, Mail, MapPin, TrendingUp,
  Sparkles, MessageCircle, Info, AlertCircle, Gift, Percent
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { products, GPSProducts } from '@/lib/products';

const getRelatedProducts = () => {
  const productList = products();
  return productList
    .filter(p => p.isFeatured) // Show featured products as related
    .slice(0, 3) // Limit to 3 products
    .map(p => ({
      id: p.id,
      name: p.productName,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.productImage,
      rating: p.rating
    }));
};

export default function ProductDetailPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<GPSProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Get product by ID from static products
    const productId = params.id as string;
    const productList = products();
    const foundProduct = productList.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    // Check if product is in wishlist
    if (product && session) {
      checkWishlistStatus();
    }
  }, [product, session]);

  const checkWishlistStatus = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        const isInList = data.items.some((item: any) => item.productId === product?.id);
        setIsInWishlist(isInList);
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link 
              href="/products" 
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleBuyNow = () => {
    const checkoutUrl = `/checkout?productId=${product.id}&name=${encodeURIComponent(product.productName)}&price=${product.price}&image=${encodeURIComponent(product.productImage)}&quantity=${quantity}`;
    router.push(checkoutUrl);
  };

  const handleWishlist = async () => {
    // Check if user is authenticated
    if (!session) {
      toast.error('Please login first', {
        description: 'You need to be logged in to add items to wishlist',
        duration: 3000,
      });
      router.push('/auth/login');
      return;
    }

    try {
      if (!isInWishlist) {
        // Add to wishlist
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            productName: product.productName,
            price: product.price,
            image: product.productImage,
          }),
        });

        if (response.ok) {
          setIsInWishlist(true);
          toast.success('Added to wishlist!', {
            description: 'Product has been added to your wishlist',
            duration: 3000,
          });
        } else {
          const error = await response.json();
          toast.error('Failed to add to wishlist', {
            description: error.message || 'Something went wrong',
            duration: 3000,
          });
        }
      } else {
        // Remove from wishlist
        const response = await fetch('/api/wishlist/remove', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
          }),
        });

        if (response.ok) {
          setIsInWishlist(false);
          toast.success('Removed from wishlist!', {
            description: 'Product has been removed from your wishlist',
            duration: 3000,
          });
        } else {
          const error = await response.json();
          toast.error('Failed to remove from wishlist', {
            description: error.message || 'Something went wrong',
            duration: 3000,
          });
        }
      }
    } catch (error) {
      toast.error('Network error', {
        description: 'Please check your connection and try again',
        duration: 3000,
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.productName,
      text: `Check out this ${product.productName} - ₹${product.price.toLocaleString('en-IN')}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        toast.success('Link copied to clipboard!', {
          description: 'Product link has been copied to your clipboard',
          duration: 3000,
        });
      }
    } catch (error) {
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      const userCopied = prompt('Copy this link to share:', shareText);
      if (userCopied !== null) {
        toast.info('Share link provided', {
          description: 'You can copy and share the link manually',
          duration: 3000,
        });
      }
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-orange-100">
              <img
                src={product.images?.[selectedImage] || product.productImage}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isFeatured && (
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                    <Star className="w-4 h-4 mr-2 fill-white" />
                    Featured
                  </div>
                )}
                {discount > 0 && (
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse flex items-center">
                    <Percent className="w-4 h-4 mr-2" />
                    {discount}% OFF
                  </div>
                )}
              </div>

              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + product.images!.length) % product.images!.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images!.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-4 transition-all ${
                      selectedImage === idx
                        ? 'border-orange-600 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Shield, text: 'Secure' },
                { icon: BadgeCheck, text: 'Genuine' },
                { icon: Award, text: 'Quality' },
                { icon: Truck, text: 'Fast Delivery' }
              ].map((badge, i) => (
                <div key={i} className="bg-white rounded-xl p-3 shadow-md text-center border-2 border-orange-100">
                  <badge.icon className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">{badge.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div className="flex items-center space-x-2">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
                {product.category}
              </span>
              {product.inStock && (
                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  In Stock
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">
                {product.productName}
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                {product.shortDescription}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="bg-linear-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl md:text-5xl font-black text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through font-semibold">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-green-600" />
                  <span className="text-lg text-green-600 font-bold">
                    You save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')} ({discount}% off)
                  </span>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-2 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                Inclusive of all taxes
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-gray-900">Quantity:</span>
              <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-900 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 font-black text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-900 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Buy Now</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleWishlist}
                  className={`border-2 py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
                    isInWishlist 
                      ? 'bg-orange-600 text-white border-orange-600 hover:bg-orange-700' 
                      : 'border-orange-600 text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
                  <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 hover:border-orange-600 hover:text-orange-600"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Service Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 space-y-3">
              {[
                { icon: Truck, text: 'Free Shipping on orders above ₹10,000' },
                { icon: Clock, text: '24/7 Customer Support' },
                { icon: Package, text: '7-Day Easy Returns' },
                { icon: BadgeCheck, text: '1 Year Warranty' }
              ].map((service, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <service.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{service.text}</span>
                </div>
              ))}
            </div>

            {/* Contact Sales */}
            <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-black mb-3 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Our experts are ready to assist you with your purchase
              </p>
              <div className="space-y-2 text-sm">
                <a href="tel:+916390057777" className="flex items-center hover:text-orange-400 transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 639 005 7777
                </a>
                <a href="mailto:support@locotraq.com" className="flex items-center hover:text-orange-400 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  support@locotraq.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b-2 border-gray-100 overflow-x-auto">
              {[
                { id: 'description', label: 'Description', icon: Info },
                { id: 'features', label: 'Features', icon: Zap },
                { id: 'specifications', label: 'Specifications', icon: Package }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[150px] px-6 py-4 font-bold transition-all flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose max-w-none"
                >
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
                      <Check className="w-5 h-5 text-orange-600 shrink-0" />
                      <span className="text-gray-900 font-semibold">{feature}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'specifications' && product.specifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {Object.entries(product.specifications).map(([key, value], i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <span className="font-bold text-gray-900">{key}:</span>
                      <span className="text-gray-700 font-semibold">{value}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-orange-600" />
              Related Products
            </h2>
            <Link href="/products" className="text-orange-600 font-bold hover:text-orange-700 flex items-center">
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRelatedProducts().map((item) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {item.originalPrice && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center mb-3">
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
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-600 shadow-2xl p-4 z-50">
        <div className="flex gap-3">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Buy Now</span>
          </button>
          <button 
            onClick={handleWishlist}
            className={`py-4 px-6 rounded-xl font-bold transition-all ${
              isInWishlist 
                ? 'bg-orange-600 text-white hover:bg-orange-700' 
                : 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}