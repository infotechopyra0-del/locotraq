'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Home, Search, ArrowRight, MapPin, Phone, Mail, 
  Package, Headphones, FileText, ChevronRight,
  Truck, Shield, Clock, Award
} from 'lucide-react';

export default function NotFoundPage() {
  const quickLinks = [
    { 
      name: 'Home', 
      href: '/', 
      description: 'Return to our homepage',
      icon: Home,
      color: 'from-blue-50 to-blue-100'
    },
    { 
      name: 'Products', 
      href: '/products', 
      description: 'Browse GPS tracking devices',
      icon: Package,
      color: 'from-orange-50 to-orange-100'
    },
    { 
      name: 'Services', 
      href: '/services', 
      description: 'Explore tracking solutions',
      icon: Shield,
      color: 'from-green-50 to-green-100'
    },
    { 
      name: 'About Us', 
      href: '/about', 
      description: 'Learn more about Locotraq',
      icon: Award,
      color: 'from-purple-50 to-purple-100'
    },
    { 
      name: 'Contact', 
      href: '/contact', 
      description: 'Get in touch with us',
      icon: Mail,
      color: 'from-pink-50 to-pink-100'
    },
    { 
      name: 'Support', 
      href: '/support', 
      description: 'Get help and assistance',
      icon: Headphones,
      color: 'from-cyan-50 to-cyan-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* 404 Illustration */}
            <div className="relative mb-8">
              <div className="text-[150px] sm:text-[200px] md:text-[250px] font-black text-orange-100 select-none leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-32 h-32 md:w-40 md:h-40 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <MapPin className="h-16 w-16 md:h-20 md:w-20 text-white" />
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
                It looks like the page you're looking for has moved, been deleted, or doesn't exist. 
                Don't worry, we'll help you get back on track!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/">
                <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>Go Back Home</span>
                </button>
              </Link>
              
              <Link href="/products">
                <button className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Browse Products</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-linear-to-r from-orange-50 to-orange-100 rounded-2xl p-6 mb-12 border-2 border-orange-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Truck, text: 'Free Shipping', sub: 'Above ₹10,000' },
                { icon: Shield, text: 'Secure Payment', sub: '100% Protected' },
                { icon: Clock, text: '24/7 Support', sub: 'Always Available' },
                { icon: Award, text: 'Quality Products', sub: 'Certified' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <item.icon className="w-8 h-8 text-orange-600 mb-2" />
                  <div className="text-sm font-bold text-gray-900">{item.text}</div>
                  <div className="text-xs text-gray-600">{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
              Quick Navigation
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                >
                  <Link href={link.href}>
                    <div className={`bg-linear-to-br ${link.color} p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-600 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full`}>
                      <div className="flex items-start space-x-4">
                        <div className="bg-white p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                          <link.icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                            {link.name}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium mb-3">
                            {link.description}
                          </p>
                          <div className="text-orange-600 text-sm font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            Visit Page
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="bg-white p-8 md:p-12 rounded-2xl border-2 border-gray-200 shadow-lg"
          >
            <div className="text-center mb-8">
              <div className="inline-block bg-orange-100 p-4 rounded-full mb-4">
                <Headphones className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                Still Need Help?
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
                If you believe this is an error or need assistance finding what you're looking for, 
                our support team is here to help 24/7.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <a 
                href="tel:+916390057777"
                className="flex items-center justify-center space-x-3 bg-linear-to-r from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 hover:border-orange-600 transition-all group"
              >
                <div className="bg-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-600 font-semibold">Call Us</div>
                  <div className="text-lg font-black text-gray-900">+91 639 005 7777</div>
                </div>
              </a>
              <a 
                href="mailto:support@locotraq.com"
                className="flex items-center justify-center space-x-3 bg-linear-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 hover:border-blue-600 transition-all group"
              >
                <div className="bg-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-600 font-semibold">Email Us</div>
                  <div className="text-lg font-black text-gray-900">support@locotraq.com</div>
                </div>
              </a>
            </div>
            
            <div className="text-center">
              <Link href="/support">
                <button className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-2">
                  <Headphones className="w-5 h-5" />
                  <span>Visit Support Center</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-center py-8 mt-8"
          >
            <p className="text-gray-600 text-base font-medium">
              Thank you for choosing <span className="text-orange-600 font-black">Locotraq</span> for your GPS tracking needs.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We're committed to providing the best tracking solutions in India 🇮🇳
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}