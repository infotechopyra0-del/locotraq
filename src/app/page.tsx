'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, User, Menu, X, Star, Truck, Shield, 
  Zap, MapPin, Clock, Phone, Mail, Facebook, Twitter, Instagram, 
  Linkedin, ChevronRight, Heart, ArrowRight, TrendingUp, ChevronLeft,
  Package, Headphones, FileText, ChevronDown,  Award, Users, Globe,
  BadgeCheck, Percent, Gift, Sparkles, ThumbsUp, MessageCircle, PlayCircle
} from 'lucide-react';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';

import Link from 'next/link';
import { Button } from "@/components/ui/button"
import Footer from '@/components/Footer';
import Navbar from '@/components/Header';

interface Product {
  id: string;
  _id: string;
  name: string;
  productName: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  productImage: string;
  images: string[];
  imageUrl: string;
  imageAlt: string;
  specifications: { [key: string]: string };
  stockQuantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  features: string[];
  isFeatured: boolean;
  inStock: boolean;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  badge?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Smart GPS Tracking Solutions',
    subtitle: 'Real-Time Precision',
    description: 'Leading GPS tracking solutions for vehicles, assets, and fleet management. Trusted by 10,000+ customers worldwide.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-2196644631-68b876f1b7c39.jpg?crop=1xw:1xh;center,top',
    cta: 'Shop Now',
    ctaLink: '/products',
    badge: '🎉 New Year Sale - Up to 40% OFF'
  },
  {
    id: 2,
    title: 'Fleet Management System',
    subtitle: 'Optimize Your Operations',
    description: 'Complete fleet tracking solution with real-time monitoring, route optimization, and detailed analytics for your business.',
    image: 'https://stavecorp.com/wp-content/uploads/2025/05/FTSM-Post-Photo1.jpg',
    cta: 'Explore Fleet Solutions',
    ctaLink: '/products?category=fleet',
    badge: '⚡ Best Seller'
  },
  {
    id: 3,
    title: 'Personal Safety Trackers',
    subtitle: 'Protect Your Loved Ones',
    description: 'Keep your family safe with our advanced personal GPS trackers. Real-time location, geofencing, and emergency alerts.',
    image: 'https://media.wired.com/photos/593278065c4fbd732b552ed0/3:2/w_2560%2Cc_limit/GPS-Tracker-in-Hands_Jon-Snyder.jpg',
    cta: 'View Personal Trackers',
    ctaLink: '/products?category=personal',
    badge: '🔥 Trending Now'
  },
  {
    id: 4,
    title: 'Industrial Asset Monitoring',
    subtitle: 'Secure Your Assets',
    description: 'Track and protect valuable equipment and machinery with our industrial-grade GPS tracking devices and monitoring system.',
    image: 'https://tiindia.com/wp-content/uploads/2021/09/cg-power-bg.jpg',
    cta: 'Industrial Solutions',
    ctaLink: '/products?category=industrial',
    badge: '💎 Premium Quality'
  }
];

const categoriess = [
    { name: 'All Products', href: '/products' },
    { name: 'Vehicle Trackers', href: '/products?category=vehicle' },
    { name: 'Personal Trackers', href: '/products?category=personal' },
    { name: 'Fleet Management', href: '/products?category=fleet' },
    { name: 'Industrial Solutions', href: '/products?category=industrial' },
  ];
  const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Fleet Manager',
    company: 'TransLogix Pvt Ltd',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment: 'Excellent GPS tracking solution! Has helped us reduce fuel costs by 25% and improve delivery times significantly.'
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    company: 'SafeTransport Services',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment: 'The real-time tracking and customer support are outstanding. Best investment for our logistics business!'
  },
  {
    name: 'Amit Patel',
    role: 'Operations Head',
    company: 'QuickDeliver Co.',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    comment: 'Highly reliable and accurate. The mobile app makes it so easy to monitor our entire fleet from anywhere.'
  }
];

const blogPosts = [
  {
    id: 1,
    title: '10 Benefits of GPS Fleet Tracking for Your Business',
    excerpt: 'Discover how GPS tracking can transform your fleet operations and boost profitability.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80',
    category: 'Business',
    date: 'Dec 15, 2024',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'How to Choose the Right GPS Tracker for Your Vehicle',
    excerpt: 'A comprehensive guide to selecting the perfect tracking device for your needs.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80',
    category: 'Guide',
    date: 'Dec 12, 2024',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Personal Safety: Why Every Family Needs GPS Tracking',
    excerpt: 'Learn how personal GPS trackers can keep your loved ones safe in emergencies.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&q=80',
    category: 'Safety',
    date: 'Dec 10, 2024',
    readTime: '4 min read'
  }
];
const categories = [
    { name: 'Vehicle Trackers', image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-2196644631-68b876f1b7c39.jpg?crop=1xw:1xh;center,top', link: '/products?category=vehicle' },
    { name: 'Personal Trackers', image: 'https://media.wired.com/photos/593278065c4fbd732b552ed0/3:2/w_2560%2Cc_limit/GPS-Tracker-in-Hands_Jon-Snyder.jpg', link: '/products?category=personal' },
    { name: 'Fleet Management', image: 'https://stavecorp.com/wp-content/uploads/2025/05/FTSM-Post-Photo1.jpg', link: '/products?category=fleet' },
    { name: 'Industrial Solutions', image: 'https://tiindia.com/wp-content/uploads/2021/09/cg-power-bg.jpg', link: '/products?category=industrial' }
  ];
export default function LocotraqHome() {
  return <LocotraqHomeCore />;
}

function LocotraqHomeCore() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 23,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.products || []);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);


  const handleAddToCart = async (product: Product) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id || product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Added to cart successfully!', {
          description: `${product.productName} has been added to your cart`,
          duration: 3000,
          action: {
            label: 'View Cart',
            onClick: () => window.location.href = '/profile/cart'
          }
        });
        setCartCount(data.cartCount || 0);
      } else {
        if (res.status === 401) {
          toast.error('Please login to add items to cart', {
            description: 'You need to be logged in to add products to your cart',
            duration: 3000,
            action: {
              label: 'Login',
              onClick: () => window.location.href = '/login'
            }
          });
        } else {
          toast.error('Failed to add to cart', {
            description: data.message || 'Something went wrong',
            duration: 3000
          });
        }
      }
    } catch (error) {
      toast.error('Failed to add to cart', {
        description: 'Please try again later',
        duration: 3000
      });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-125 sm:h-150 md:h-162.5 lg:h-175 overflow-hidden bg-linear-to-r from-orange-50 to-orange-100">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full py-8 sm:py-12">
                  <div className="space-y-4 sm:space-y-6 z-10">
                    {slide.badge && (
                      <div className="inline-block bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                        {slide.badge}
                      </div>
                    )}
                    <div className="space-y-1 sm:space-y-2">
                      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-orange-600 uppercase tracking-wide">
                        {slide.subtitle}
                      </h2>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
                        {slide.title}
                      </h1>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-xl">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                      <a
                        href={slide.ctaLink}
                        className="bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg text-sm sm:text-base"
                      >
                        {slide.cta}
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-8 pt-4 sm:pt-6">
                      <div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-orange-600">10k+</div>
                        <div className="text-xs sm:text-sm text-gray-600">Happy Customers</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-orange-600">99.9%</div>
                        <div className="text-xs sm:text-sm text-gray-600">Uptime</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-orange-600">4.8★</div>
                        <div className="text-xs sm:text-sm text-gray-600">Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-100 lg:h-125 object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-900" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-900" />
        </button>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-orange-600 w-8 sm:w-12 h-2 sm:h-3'
                  : 'bg-white/70 hover:bg-white w-2 sm:w-3 h-2 sm:h-3'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'Orders above ₹10,000' },
              { icon: Shield, title: 'Secure Payment', desc: '100% Protected' },
              { icon: Clock, title: '24/7 Support', desc: 'Always Available' },
              { icon: TrendingUp, title: 'Best Quality', desc: 'Premium Products' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{feature.title}</div>
                  <div className="text-xs text-gray-600">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    {/* Shop by Categories - NEW SECTION */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 sm:mb-4">
              Shop by Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Find the perfect tracking solution for your needs</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.link}
                className="group relative aspect-3/4 overflow-hidden rounded-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
                <div className="absolute bottom-3 sm:bottom-6 lg:bottom-8 left-0 right-0 text-center px-2">
                  <button className="bg-white text-black px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs lg:text-sm tracking-wider hover:bg-gray-100 transition-colors font-semibold rounded">
                    {category.name}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-12 bg-linear-to-r from-red-500 via-pink-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Zap className="text-yellow-500 mr-2 w-6 h-6" />
              <span className="font-bold text-gray-900 mr-4">Flash Sale Ends In:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg font-black text-xl">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-white font-black">:</span>
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg font-black text-xl">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-white font-black">:</span>
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg font-black text-xl">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 animate-pulse">
              Today's Hot Deals 🔥
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Limited time offers - Grab them before they're gone!
            </p>
            <Link 
              href="/products?sale=flash" 
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-lg font-black hover:bg-gray-100 transition-all transform hover:scale-105 text-lg shadow-xl"
            >
              Shop Flash Sale Now
            </Link>
          </div>
        </div>
      </section>  
    {/* Featured Products */}
    <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Header */}
    <div className="flex justify-between items-end mb-10">
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          Featured Products
        </h2>
        <p className="text-gray-600">
          Our most popular GPS tracking devices
        </p>
      </div>

      <Link
        href="/products"
        className="hidden md:flex items-center text-orange-600 font-bold hover:text-orange-700"
      >
        View All <ChevronRight className="w-5 h-5 ml-1" />
      </Link>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 6).map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
        >
          {/* Image */}
          <div className="relative aspect-4/3 overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </Link>

            {product.isFeatured && (
              <span className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
            )}

            {product.originalPrice > product.price && (
              <span className="absolute bottom-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <span className="text-sm text-orange-600 font-semibold mb-1">
              {product.category}
            </span>

            <Link href={`/products/${product.id}`}>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-orange-600">
                {product.productName}
              </h3>
            </Link>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {product.shortDescription}
            </p>
            {/* Price */}
            <div className="mb-5">
              <span className="text-2xl font-black text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Button - Always Bottom */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Mobile View All */}
    <div className="text-center mt-10 md:hidden">
      <Link
        href="/products"
        className="inline-block bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition"
      >
        View All Products
      </Link>
    </div>
  </div>
</section>

      {/* Trust Stats Banner - NEW SECTION */}
      <section className="py-12 bg-linear-to-r from-orange-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-110 transition-transform">
              <Users className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">10,000+</div>
              <div className="text-white/90 font-semibold">Happy Customers</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <Package className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">50,000+</div>
              <div className="text-white/90 font-semibold">Devices Sold</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <BadgeCheck className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">99.9%</div>
              <div className="text-white/90 font-semibold">Uptime</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <Headphones className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">24/7</div>
              <div className="text-white/90 font-semibold">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose Locotraq?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industry-leading GPS tracking solutions with unmatched reliability and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Military-Grade Security',
                desc: 'End-to-end encryption ensures your data is always protected'
              },
              {
                icon: Zap,
                title: 'Real-Time Tracking',
                desc: 'Get instant location updates with 99.9% uptime guarantee'
              },
              {
                icon: MapPin,
                title: 'Global Coverage',
                desc: 'Track your assets anywhere in the world with satellite network'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-linear-to-br from-orange-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Video Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                See Locotraq in Action
              </h2>
              <p className="text-gray-300 text-lg">
                Watch how our GPS tracking solutions are transforming businesses across India. 
                From fleet management to personal safety, discover the power of real-time tracking.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time location updates',
                  'Geofencing & alerts',
                  'Route optimization',
                  'Detailed analytics dashboard'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <BadgeCheck className="w-5 h-5 text-orange-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" 
                alt="Demo Video" 
                className="w-full h-100 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="bg-orange-600 w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials - NEW SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <ThumbsUp className="w-4 h-4 inline mr-2" />
              TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Over 10,000+ happy customers trust Locotraq for their tracking needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 border-4 border-orange-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-orange-600 font-semibold">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Verified Purchase
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Blog Section - NEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Latest from Blog
              </h2>
              <p className="text-gray-600">Stay updated with GPS tracking insights and tips</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-orange-600 font-bold hover:text-orange-700 group">
              View All Posts
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-orange-600 font-bold text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/blog" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">
              View All Blog Posts
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Banner */}
      <section className="bg-linear-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-bounce">
            🎁 LIMITED TIME OFFER
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Ready to Start Tracking?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join 10,000+ satisfied customers and experience the power of advanced GPS tracking technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-block bg-orange-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 text-lg shadow-xl"
            >
              Shop Now - Get 40% OFF
            </Link>
            <Link 
              href="/contact" 
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 text-lg"
            >
              Contact Sales
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-white">
            <div className="flex items-center">
              <BadgeCheck className="w-6 h-6 mr-2 text-green-400" />
              <span>Money Back Guarantee</span>
            </div>
            <div className="hidden md:flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-400" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}