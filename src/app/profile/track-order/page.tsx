"use client";

import React, { useState } from 'react';
import { 
  Package, MapPin, Truck, CheckCircle, Clock, Search, 
  Calendar, Phone, Mail, User, Home, ChevronRight,
  AlertCircle, Navigation, Box, FileText, Download,
  Share2, Copy, ExternalLink, Shield, Star, MessageCircle,
  ArrowRight, PackageCheck, PackageX, TrendingUp, Info
} from 'lucide-react';

interface TrackingEvent {
  status: string;
  location: string;
  date: string;
  time: string;
  description: string;
  icon: any;
  isCompleted: boolean;
}

interface OrderDetails {
  orderNumber: string;
  trackingNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;
  };
  carrier: string;
  trackingUrl: string;
  events: TrackingEvent[];
}

const TrackOrderPage = () => {
  const [trackingInput, setTrackingInput] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Mock order data
  const mockOrder: OrderDetails = {
    orderNumber: 'LCT2026010812345',
    trackingNumber: 'LCTK1234567890',
    orderDate: '05 Jan 2026',
    estimatedDelivery: '10 Jan 2026',
    currentStatus: 'In Transit',
    productName: 'Loco Vehicle Tracking Device',
    productImage: '/images/Loco-Vehicle-Tracking-Device.jpg',
    quantity: 2,
    price: 11000,
    carrier: 'Delhivery Express',
    trackingUrl: 'https://delhivery.com/track',
    shippingAddress: {
      name: 'Rajesh Kumar',
      address: '123, MG Road, Sector 15',
      city: 'Bisauli',
      state: 'Uttar Pradesh',
      pincode: '202401',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@example.com'
    },
    events: [
      {
        status: 'Order Placed',
        location: 'Bisauli, UP',
        date: '05 Jan 2026',
        time: '10:30 AM',
        description: 'Your order has been placed successfully',
        icon: CheckCircle,
        isCompleted: true
      },
      {
        status: 'Order Confirmed',
        location: 'Delhi Warehouse',
        date: '05 Jan 2026',
        time: '02:15 PM',
        description: 'Order confirmed and being prepared for shipment',
        icon: PackageCheck,
        isCompleted: true
      },
      {
        status: 'Shipped',
        location: 'Delhi Hub',
        date: '06 Jan 2026',
        time: '09:00 AM',
        description: 'Package shipped from warehouse',
        icon: Box,
        isCompleted: true
      },
      {
        status: 'In Transit',
        location: 'Ghaziabad Hub',
        date: '08 Jan 2026',
        time: '03:45 PM',
        description: 'Package is on the way to your location',
        icon: Truck,
        isCompleted: true
      },
      {
        status: 'Out for Delivery',
        location: 'Bisauli Local Hub',
        date: '10 Jan 2026',
        time: 'Expected',
        description: 'Package will be delivered today',
        icon: Navigation,
        isCompleted: false
      },
      {
        status: 'Delivered',
        location: 'Your Address',
        date: '10 Jan 2026',
        time: 'Expected by 6 PM',
        description: 'Package will be delivered to your address',
        icon: CheckCircle,
        isCompleted: false
      }
    ]
  };

  const [orderData, setOrderData] = useState<OrderDetails | null>(null);

  const handleTrackOrder = () => {
    if (!trackingInput.trim()) return;

    setIsTracking(true);
    
    // Simulate API call
    setTimeout(() => {
      setOrderData(mockOrder);
      setOrderFound(true);
      setIsTracking(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrackOrder();
    }
  };

  const copyTrackingNumber = () => {
    if (orderData) {
      navigator.clipboard.writeText(orderData.trackingNumber);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const shareTracking = () => {
    if (orderData && navigator.share) {
      navigator.share({
        title: 'Track My Order',
        text: `Track order ${orderData.trackingNumber}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4">
              <Package className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Track Your Order
            </h1>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Enter your order number or tracking ID to get real-time updates on your delivery
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Order Number or Tracking ID"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-lg"
              />
            </div>
            <button
              onClick={handleTrackOrder}
              disabled={isTracking || !trackingInput.trim()}
              className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isTracking ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </div>

          {/* Quick Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Info className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Find Order Number</div>
                  <div className="text-gray-600">Check your email confirmation</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Real-Time Updates</div>
                  <div className="text-gray-600">Live tracking information</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Need Help?</div>
                  <div className="text-gray-600">Contact: 1800-123-4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      {orderFound && orderData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Status Banner */}
          <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <Truck className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-orange-100 text-sm mb-1">Current Status</div>
                  <div className="text-2xl md:text-3xl font-black">{orderData.currentStatus}</div>
                  <div className="text-orange-100 text-sm mt-1">
                    Expected delivery: <span className="font-bold">{orderData.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={copyTrackingNumber}
                  className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center"
                >
                  {showCopied ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy Tracking ID
                    </>
                  )}
                </button>
                <button
                  onClick={shareTracking}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tracking Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 mr-3" />
                  Tracking Timeline
                </h2>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  {/* Timeline Events */}
                  <div className="space-y-8">
                    {orderData.events.map((event, index) => {
                      const IconComponent = event.icon;
                      return (
                        <div key={index} className="relative flex items-start">
                          {/* Icon */}
                          <div className={`relative z-10 shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                            event.isCompleted 
                              ? 'bg-linear-to-br from-orange-500 to-orange-600 shadow-lg' 
                              : 'bg-gray-200'
                          }`}>
                            <IconComponent className={`w-4 h-4 md:w-6 md:h-6 ${
                              event.isCompleted ? 'text-white' : 'text-gray-400'
                            }`} />
                          </div>

                          {/* Content */}
                          <div className="ml-4 md:ml-6 flex-1 pb-8">
                            <div className={`rounded-xl p-4 md:p-6 transition-all ${
                              event.isCompleted 
                                ? 'bg-orange-50 border-2 border-orange-200' 
                                : 'bg-gray-50 border-2 border-gray-200'
                            }`}>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className={`font-bold text-lg ${
                                  event.isCompleted ? 'text-orange-600' : 'text-gray-500'
                                }`}>
                                  {event.status}
                                </h3>
                                <div className="flex items-center text-sm text-gray-600 mt-1 sm:mt-0">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {event.date} • {event.time}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">{event.description}</p>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Carrier Info */}
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">Shipping Carrier</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Truck className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{orderData.carrier}</div>
                      <div className="text-sm text-gray-600">Tracking ID: {orderData.trackingNumber}</div>
                    </div>
                  </div>
                  <a
                    href={orderData.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 font-bold text-sm hover:text-orange-700 flex items-center"
                  >
                    Track on Carrier Site
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 text-orange-600 mr-2" />
                  Order Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Order Number</div>
                    <div className="font-bold text-gray-900">{orderData.orderNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Order Date</div>
                    <div className="font-bold text-gray-900">{orderData.orderDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Expected Delivery</div>
                    <div className="font-bold text-orange-600">{orderData.estimatedDelivery}</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={`/order/${orderData.orderNumber}`}
                    className="text-orange-600 font-bold text-sm hover:text-orange-700 flex items-center"
                  >
                    View Full Order Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">Product Details</h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={orderData.productImage}
                    alt={orderData.productName}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {orderData.productName}
                    </h4>
                    <div className="text-sm text-gray-600 mb-2">
                      Quantity: {orderData.quantity}
                    </div>
                    <div className="text-xl font-black text-orange-600">
                      ₹{orderData.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                  <Home className="w-5 h-5 text-orange-600 mr-2" />
                  Delivery Address
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <div className="font-bold text-gray-900">{orderData.shippingAddress.name}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                    <div className="text-gray-700">
                      {orderData.shippingAddress.address}<br />
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.state}<br />
                      PIN: {orderData.shippingAddress.pincode}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                    <div className="text-gray-700">{orderData.shippingAddress.phone}</div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                    <div className="text-gray-700">{orderData.shippingAddress.email}</div>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
                <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 text-orange-600 mr-2" />
                  Need Help?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Our customer support team is here to assist you 24/7
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:18001234567"
                    className="flex items-center text-orange-600 font-bold text-sm hover:text-orange-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    1800-123-4567
                  </a>
                  <a
                    href="mailto:support@locotraq.com"
                    className="flex items-center text-orange-600 font-bold text-sm hover:text-orange-700"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    support@locotraq.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State Help Section */}
      {!orderFound && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-orange-100 p-4 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                How to Track Your Order
              </h2>
              <p className="text-gray-600">
                Follow these simple steps to track your Locotraq order
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg mb-4">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Find Your Order Number</h3>
                <p className="text-gray-700 text-sm">
                  Check your order confirmation email for your order number or tracking ID
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg mb-4">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Enter Tracking Details</h3>
                <p className="text-gray-700 text-sm">
                  Type your order number or tracking ID in the search box above
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg mb-4">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Get Real-Time Updates</h3>
                <p className="text-gray-700 text-sm">
                  View live tracking information and delivery status of your package
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg mb-4">
                  4
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Stay Informed</h3>
                <p className="text-gray-700 text-sm">
                  Receive notifications about your order status and estimated delivery
                </p>
              </div>
            </div>

            <div className="bg-linear-to-r from-orange-600 to-orange-500 rounded-xl p-6 text-white text-center">
              <Shield className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Secure Tracking</h3>
              <p className="text-orange-100 text-sm">
                Your order information is protected with industry-standard encryption
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-gray-900 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Need More Help?
          </h2>
          <p className="text-gray-300 mb-6">
            Contact our support team for assistance with your order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </a>
            <a
              href="/faq"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-gray-900 transition-all"
            >
              <Info className="w-5 h-5 mr-2" />
              Visit FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;