"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  MapPin, User, Phone, Mail, CreditCard, Shield, 
  Truck, Package, AlertCircle, CheckCircle, Loader2, 
  ArrowLeft, Lock, Tag, Calculator
} from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

interface OrderSummary {
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function CheckoutForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  });

  const [product, setProduct] = useState<Product | null>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    tax: 0,
    shippingCost: 0,
    discount: 0,
    total: 0
  });

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch user data and product details
  useEffect(() => {
    if (session?.user?.email) {
      fetchUserData();
      fetchProductData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      
      if (data.success) {
        setUserData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          address: {
            street: data.user.address?.street || '',
            city: data.user.address?.city || '',
            state: data.user.address?.state || '',
            pincode: data.user.address?.pincode || '',
            country: data.user.address?.country || 'India'
          }
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchProductData = () => {
    // Get product info from URL params or localStorage
    const productId = searchParams.get('productId');
    const productName = searchParams.get('name');
    const productPrice = parseFloat(searchParams.get('price') || '0');
    const productImage = searchParams.get('image') || '/images/default-product.jpg';
    const quantity = parseInt(searchParams.get('quantity') || '1');

    if (productId && productName && productPrice) {
      const productData = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity
      };

      setProduct(productData);

      // Calculate order summary
      const subtotal = productPrice * quantity;
      const tax = subtotal * 0.18; // 18% GST
      const shippingCost = subtotal > 1000 ? 0 : 50; // Free shipping above ₹1000
      const discount = 0; // Apply discount logic here
      const total = subtotal + tax + shippingCost - discount;

      setOrderSummary({
        subtotal,
        tax,
        shippingCost,
        discount,
        total
      });

      setLoading(false);
    } else {
      router.push('/products');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'address.street', 'address.city', 'address.state', 'address.pincode'
    ];

    for (const field of requiredFields) {
      const value = field.includes('.') 
        ? (userData as any)[field.split('.')[0]][field.split('.')[1]]
        : (userData as any)[field];
      
      if (!value || value.trim() === '') {
        setError(`Please fill in ${field.replace('address.', '').replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate phone number
    if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(userData.address.pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return false;
    }

    setError('');
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm() || !product || !razorpayLoaded) return;

    setProcessing(true);

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          shippingAddress: userData,
          orderSummary
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'LocoTraq',
        description: product.name,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: orderData.dbOrder
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              router.push(`/payment-success?orderId=${verifyData.order._id}`);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            router.push('/payment-failed');
          }
        },
        prefill: {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          contact: userData.phone
        },
        notes: {
          address: `${userData.address.street}, ${userData.address.city}, ${userData.address.state} - ${userData.address.pincode}`
        },
        theme: {
          color: '#f97316'
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      setError(error.message || 'Payment initialization failed');
      setProcessing(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-orange-500 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Secure Checkout</h1>
          <Shield className="w-6 h-6 text-green-500 ml-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <User className="w-5 h-5 text-orange-500 mr-2" />
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    placeholder="Enter first name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    placeholder="Enter last name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                    value={userData.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    rows={3}
                    className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white resize-none"
                    placeholder="Enter full address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={userData.address.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={userData.address.state}
                    onChange={(e) => handleInputChange('address.state', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    placeholder="State"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={userData.address.pincode}
                    onChange={(e) => handleInputChange('address.pincode', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    placeholder="123456"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Product Details */}
            {product && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Package className="w-5 h-5 text-orange-500 mr-2" />
                  Order Summary
                </h3>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{product.name}</h4>
                    <p className="text-gray-400">Qty: {product.quantity}</p>
                    <p className="text-orange-500 font-bold">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (18% GST)</span>
                    <span>₹{orderSummary.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>{orderSummary.shippingCost === 0 ? 'FREE' : `₹${orderSummary.shippingCost}`}</span>
                  </div>
                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-₹{orderSummary.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-2">
                    <div className="flex justify-between text-white text-lg font-bold">
                      <span>Total</span>
                      <span>₹{orderSummary.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Button */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={processing || !razorpayLoaded}
                className="w-full bg-linear-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-orange-500 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-lg shadow-orange-500/30"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Pay ₹{orderSummary.total.toLocaleString()} Securely
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
                <Shield className="w-4 h-4 mr-1" />
                Secured by Razorpay • SSL Encrypted
              </div>
            </div>

            {/* Free Shipping Info */}
            {orderSummary.subtotal < 1000 && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-orange-500 mr-2" />
                  <p className="text-orange-400 text-sm">
                    Add ₹{(1000 - orderSummary.subtotal).toLocaleString()} more for FREE shipping!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutForm />
    </Suspense>
  );
}