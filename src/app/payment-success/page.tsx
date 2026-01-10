"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle, Package, CreditCard, Truck, Calendar, 
  ArrowRight, Download, Share2, Home, Loader2
} from 'lucide-react';
import Image from 'next/image';

interface Order {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: Array<{
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
  }>;
}

function PaymentSuccessContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      router.push('/my-orders');
      return;
    }

    fetchOrderDetails();
  }, [orderId]);

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/my-orders');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="relative mx-auto mb-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Thank you for your purchase. Your order has been confirmed and will be processed soon.
        </p>

        {/* Order Details */}
        {order && (
          <div className="bg-gray-900/50 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Package className="w-5 h-5 text-orange-500 mr-2" />
                Order Details
              </h3>
              <span className="text-green-400 font-bold">
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Order Number:</span>
                <span className="font-bold text-white">{order.orderNumber}</span>
              </div>
              
              <div className="flex justify-between text-gray-300">
                <span>Total Amount:</span>
                <span className="font-bold text-orange-500">₹{order.total.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-gray-300">
                <span>Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
            
            {/* Product Items */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Items Ordered:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={item.productImage || '/images/default-product.jpg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.productName}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-3">
            <Truck className="w-5 h-5 text-blue-400 mr-2" />
            <h4 className="font-semibold text-blue-400">What's Next?</h4>
          </div>
          <p className="text-blue-300 text-sm text-left">
            • You'll receive an email confirmation shortly<br/>
            • Your order will be processed within 24 hours<br/>
            • You can track your order status in "My Orders"<br/>
            • Estimated delivery: 3-7 business days
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => router.push('/my-orders')}
            className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-3 px-6 rounded-xl font-bold transition-colors flex items-center justify-center"
          >
            <Package className="w-5 h-5 mr-2" />
            View My Orders
          </button>
          
          <button
            onClick={() => router.push('/products')}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-bold transition-colors flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <p className="text-gray-500 text-sm mt-6">
          Redirecting to orders page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}