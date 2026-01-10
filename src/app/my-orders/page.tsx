"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Package, Clock, Truck, CheckCircle, X, Calendar, 
  MapPin, CreditCard, Download, Share2, ArrowLeft,
  Filter, Search, Eye, RefreshCw
} from 'lucide-react';
import Image from 'next/image';

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  paidAt?: string;
  trackingNumber?: string;
}

function MyOrdersContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    fetchOrders();
  }, [session, status, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders/my-orders');
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (error: any) {
      setError('Failed to fetch orders');
      console.error('Orders fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'processing':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'shipped':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'delivered':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'pending':
      default:
        return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'failed':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'pending':
      default:
        return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter;
    const matchesSearch = searchQuery === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center text-gray-400 hover:text-orange-500 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Profile
            </button>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Package className="w-8 h-8 text-orange-500 mr-3" />
              My Orders
            </h1>
          </div>
          
          <button
            onClick={fetchOrders}
            className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders by number or product name..."
                  className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                />
              </div>
            </div>
            
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 flex items-center">
            <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-gray-800/50 rounded-2xl p-12 border border-gray-700/50 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {orders.length === 0 ? 'No orders yet' : 'No orders found'}
            </h3>
            <p className="text-gray-400 mb-6">
              {orders.length === 0 
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : "No orders match your current search or filter criteria."
              }
            </p>
            {orders.length === 0 && (
              <button
                onClick={() => router.push('/products')}
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-colors"
              >
                <Package className="w-5 h-5 mr-2" />
                Start Shopping
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Order #{order.orderNumber}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="text-2xl font-bold text-orange-500">
                      ₹{order.total.toLocaleString()}
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                      {order.trackingNumber && (
                        <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm">
                          <Truck className="w-4 h-4 mr-2" />
                          Track Order
                        </button>
                      )}
                      
                      <button
                        onClick={() => router.push(`/orders/${order._id}`)}
                        className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.productImage || '/images/default-product.jpg'}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{item.productName}</h4>
                          <p className="text-gray-400 text-sm">
                            Qty: {item.quantity} × ₹{item.price.toLocaleString()} = ₹{item.subtotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mt-6 p-4 bg-gray-900/50 rounded-xl">
                    <h5 className="font-semibold text-white mb-2 flex items-center">
                      <MapPin className="w-4 h-4 text-orange-500 mr-2" />
                      Shipping Address
                    </h5>
                    <p className="text-gray-400 text-sm">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                      Phone: {order.shippingAddress.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyOrdersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <MyOrdersContent />
    </Suspense>
  );
}