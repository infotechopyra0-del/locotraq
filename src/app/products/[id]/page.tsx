'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ShoppingCart, Heart, Share2, Star, Check, X,
  Shield, Truck, Clock, BadgeCheck, Package, Zap, Award,
  ChevronLeft, ChevronRight, Phone, Mail, MapPin, TrendingUp,
  Sparkles, MessageCircle, Info, AlertCircle, Gift, Percent
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  productName: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  productImage: string;
  images?: string[];
  features: string[];
  specifications?: { [key: string]: string };
  inStock: boolean;
  isFeatured?: boolean;
}

// Mock product data
const product: Product = {
  id: '1',
  productName: 'Loco Professional Vehicle GPS Tracker',
  shortDescription: 'Real-time tracking with high precision positioning',
  description: 'Professional-grade GPS tracking device designed for vehicles with real-time monitoring, geofencing capabilities, and advanced security features. Perfect for fleet management and personal vehicle tracking with 99.9% uptime guarantee.',
  price: 5500,
  originalPrice: 6500,
  category: 'Vehicle',
  subcategory: 'Professional',
  rating: 4.8,
  reviewCount: 245,
  productImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
  images: [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  ],
  features: [
    'Real-time GPS tracking',
    'Geofencing alerts',
    'History playback',
    'Mobile app support',
    'Long battery life',
    'Waterproof design',
    'SOS button',
    '24/7 monitoring'
  ],
  specifications: {
    'GPS Accuracy': '3-15 meters',
    'Network': '2G/3G/4G LTE',
    'Battery': '5000mAh',
    'Waterproof': 'IP67',
    'Dimensions': '90 x 50 x 25mm',
    'Weight': '180g',
    'Working Temp': '-20°C to 70°C',
    'Warranty': '1 Year'
  },
  inStock: true,
  isFeatured: true
};

const relatedProducts = [
  {
    id: '2',
    name: 'GPS Vehicle Tracker Pro',
    price: 4500,
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&q=80',
    rating: 4.6
  },
  {
    id: '3',
    name: 'Fleet Management Tracker',
    price: 7500,
    originalPrice: 9000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Personal Safety GPS',
    price: 3500,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&q=80',
    rating: 4.7
  }
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleBuyNow = () => {
    const message = `Hi! I want to purchase:

🔹 *Product:* ${product.productName}
🔹 *Price:* ₹${product.price.toLocaleString('en-IN')}
🔹 *Quantity:* ${quantity}
🔹 *Total:* ₹${(product.price * quantity).toLocaleString('en-IN')}

Please confirm availability and provide payment details.`;

    window.open(`https://wa.me/916390057777?text=${encodeURIComponent(message)}`, '_blank');
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb & Back Button */}
      <div className="bg-white border-b-2 border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/products">
              <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-bold transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Products</span>
              </button>
            </Link>
            <div className="hidden md:flex items-center text-sm text-gray-600 space-x-2">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-orange-600 transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-600 font-semibold">{product.productName}</span>
            </div>
          </div>
        </div>
      </div>

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
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
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
                <span>Buy Now via WhatsApp</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="border-2 border-orange-600 text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>
                <button className="border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
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
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
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
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
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
            {relatedProducts.map((item) => (
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
          <button className="border-2 border-orange-600 text-orange-600 py-4 px-6 rounded-xl font-bold hover:bg-orange-50 transition-all">
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}