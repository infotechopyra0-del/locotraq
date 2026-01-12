"use client";

import { useState, useEffect, useRef } from "react";
import {
  Package,
  Sparkles,
  Star,
  Zap,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  CreditCard,
  IndianRupee,
  User,
  ShoppingBag,
  XCircle,
  RefreshCw,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IOrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
  slug?: string;
}

interface IShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface IOrder {
  _id?: string;
  id?: string;
  userId: string;
  orderNumber: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  billingAddress?: IShippingAddress;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'cod' | 'online' | 'upi' | 'card';
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  paidAt?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  notes?: string;
  cancellationReason?: string;
  refundAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const loadToastShownRef = useRef(false);

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async (opts: { forceToast?: boolean } = {}) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/orders", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        throw new Error("Failed to fetch orders");
      }
      const response_data = await response.json();
      const orders_array = response_data.data || response_data;
      setOrders(orders_array);
      if (!loadToastShownRef.current || opts.forceToast) {
        loadToastShownRef.current = true;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order: IOrder) => {
    const q = (searchQuery || "").toString().toLowerCase().trim();
    const matchesOrderNumber = order.orderNumber?.toLowerCase()?.includes(q) ?? false;
    const matchesCustomer = (
      order.shippingAddress?.firstName?.toLowerCase()?.includes(q) ||
      order.shippingAddress?.lastName?.toLowerCase()?.includes(q) ||
      order.shippingAddress?.email?.toLowerCase()?.includes(q) ||
      order.shippingAddress?.phone?.includes(q)
    ) ?? false;
    const matchesSearch = matchesOrderNumber || matchesCustomer;

    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesPayment = filterPayment === "all" || order.paymentStatus === filterPayment;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleDeleteClick = (id: string) => {
    setOrderToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleViewClick = (order: IOrder) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!orderToDelete) return;

    try {
      const response = await fetch(`/api/admin/orders/${orderToDelete}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete");

      setOrders((prev) =>
        prev.filter((o) => (o.id ?? o._id) !== orderToDelete)
      );
    } catch (error) {
    } finally {
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };

  const updateOrderStatus = async (
    id: string,
    newStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  ) => {
    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!response.ok) throw new Error("Failed to update");
      const updatedOrder = await response.json();
      setOrders((prev) =>
        prev.map((o) => ((o.id ?? o._id) === id ? updatedOrder : o))
      );
    } catch (error) {
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-purple-100 text-purple-700";
      case "confirmed":
        return "bg-cyan-100 text-cyan-700";
      case "cancelled":
      case "refunded":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "failed":
      case "refunded":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "cod":
        return "💵";
      case "online":
        return "💳";
      case "upi":
        return "📱";
      case "card":
        return "💳";
      default:
        return "💰";
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-800 flex items-center">
                Orders Management
                <Package className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">
                Track and manage all customer orders 📦
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="mt-34 sm:mt-26 p-4 sm:p-6 lg:p-8 relative z-10 overflow-y-auto scrollbar-hide max-h-screen">

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-amber-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-orange-900 flex items-center">
                <ShoppingBag className="mr-2 text-orange-600" size={24} />
                All Orders
                <Sparkles className="ml-2 text-amber-500" size={20} />
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => fetchOrders({ forceToast: true })}
                  className="flex-1 sm:flex-none bg-linear-to-r from-orange-600 to-orange-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <RefreshCw size={16} className="sm:w-4.5 sm:h-4.5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Search Orders
                </label>
                <input
                  type="text"
                  placeholder="Order #, Customer name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Order Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-semibold"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-semibold"
                >
                  <option value="all">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold text-sm sm:text-base">
                  Loading orders...
                </p>
              </div>
            )}

            {!loading && filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4">
                  📦
                </div>
                <p className="text-lg sm:text-xl font-black text-gray-900 mb-2">
                  No Orders Found
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-semibold px-4">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "No orders in the database yet"}
                </p>
              </div>
            )}

            {/* RESPONSIVE ORDER VIEWS */}
            {!loading && filteredOrders.length > 0 && (
              <>
                {/* MOBILE VIEW (Cards) */}
                <div className="block md:hidden space-y-4">
                  {filteredOrders.map((order: IOrder, index: number) => {
                    const oid = order.id ?? order._id ?? `order-${index}`;
                    return (
                      <div
                        key={oid}
                        className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        {/* Mobile Card Header */}
                        <div className="bg-linear-to-r from-orange-600 to-orange-700 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-black text-base text-white">
                                {order.orderNumber}
                              </h3>
                              {order.createdAt && (
                                <p className="text-xs text-orange-100 flex items-center mt-1">
                                  <Calendar size={10} className="mr-1" />
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-black text-white flex items-center justify-end">
                                <IndianRupee size={18} />
                                {order.total.toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Card Content */}
                        <div className="p-4 space-y-3">
                          {/* Customer Details */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <User size={14} className="text-orange-600 shrink-0" />
                              <span className="font-semibold text-gray-700">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail size={14} className="text-orange-600 shrink-0" />
                              <span className="font-semibold text-gray-700 break-all">
                                {order.shippingAddress.email}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone size={14} className="text-orange-600 shrink-0" />
                              <span className="font-semibold text-gray-700">
                                {order.shippingAddress.phone}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <ShoppingBag size={14} className="text-orange-600 shrink-0" />
                              <span className="font-semibold text-gray-700">
                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>

                          {/* Status Badges */}
                          <div className="flex gap-2 flex-wrap">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.toUpperCase()}
                            </span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus.toUpperCase()}
                            </span>
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                              {getPaymentMethodIcon(order.paymentMethod)} {order.paymentMethod.toUpperCase()}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2 border-t border-amber-200">
                            <button
                              onClick={() => handleViewClick(order)}
                              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                            >
                              <Eye size={14} />
                              <span className="text-xs">View</span>
                            </button>
                            <button
                              onClick={() => {
                                const nextStatus = 
                                  order.status === "pending" ? "confirmed" :
                                  order.status === "confirmed" ? "processing" :
                                  order.status === "processing" ? "shipped" :
                                  order.status === "shipped" ? "delivered" : "pending";
                                updateOrderStatus(oid, nextStatus);
                              }}
                              className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                            >
                              <Truck size={14} />
                              <span className="text-xs">Update</span>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(oid)}
                              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* TABLET VIEW */}
                <div className="hidden md:block lg:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredOrders.map((order: IOrder, index: number) => {
                      const oid = order.id ?? order._id ?? `order-${index}`;
                      return (
                        <div
                          key={oid}
                          className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-4 hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex gap-4">
                            {/* Order Icon */}
                            <div className="shrink-0">
                              <div className="w-16 h-16 bg-linear-to-br from-orange-600 to-orange-800 text-white rounded-xl flex items-center justify-center font-black shadow-lg text-xl">
                                <Package size={28} />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-black text-lg text-gray-900">
                                    {order.orderNumber}
                                  </h3>
                                  <p className="text-sm text-gray-600 font-semibold">
                                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-black text-orange-600 flex items-center">
                                    <IndianRupee size={16} />
                                    {order.total.toLocaleString('en-IN')}
                                  </p>
                                  {order.createdAt && (
                                    <span className="text-xs text-gray-500 flex items-center justify-end mt-1">
                                      <Calendar size={12} className="mr-1" />
                                      {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2 flex-wrap">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                  {order.status.toUpperCase()}
                                </span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                                  {order.paymentStatus.toUpperCase()}
                                </span>
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  {getPaymentMethodIcon(order.paymentMethod)} {order.paymentMethod.toUpperCase()}
                                </span>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <button
                                  onClick={() => handleViewClick(order)}
                                  className="flex-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold"
                                >
                                  <Eye size={16} />
                                  <span>View Details</span>
                                </button>
                                <button
                                  onClick={() => {
                                    const nextStatus = 
                                      order.status === "pending" ? "confirmed" :
                                      order.status === "confirmed" ? "processing" :
                                      order.status === "processing" ? "shipped" :
                                      order.status === "shipped" ? "delivered" : "pending";
                                    updateOrderStatus(oid, nextStatus);
                                  }}
                                  className="flex-1 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold"
                                >
                                  <Truck size={16} />
                                  <span>Update Status</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(oid)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all duration-300"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DESKTOP TABLE VIEW */}
                <div className="hidden lg:block overflow-x-auto scrollbar-hide">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-linear-to-r from-orange-100 to-amber-100 border-b-4 border-orange-600">
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Order #
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Items
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Total
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Payment
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Method
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Date
                        </th>
                        <th className="px-4 py-3 text-center font-black text-gray-900 text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order: IOrder, index: number) => {
                        const oid = order.id ?? order._id ?? `order-${index}`;
                        return (
                          <tr
                            key={oid}
                            className="border-b border-amber-200 hover:bg-linear-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group/row"
                          >
                            <td className="px-4 py-3">
                              <span className="font-black text-sm text-gray-900">
                                {order.orderNumber}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <div>
                                <p className="font-bold text-sm text-gray-900">
                                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                </p>
                                <p className="text-xs text-gray-600">{order.shippingAddress.email}</p>
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              <span className="text-sm font-semibold text-gray-700">
                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span className="text-lg font-black text-orange-600 flex items-center">
                                <IndianRupee size={14} />
                                {order.total.toLocaleString('en-IN')}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusColor(order.status)}`}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  order.status === "delivered" ? "bg-green-500" :
                                  order.status === "shipped" ? "bg-blue-500" :
                                  order.status === "processing" ? "bg-purple-500" :
                                  order.status === "confirmed" ? "bg-cyan-500" :
                                  order.status === "cancelled" || order.status === "refunded" ? "bg-red-500" :
                                  "bg-yellow-500"
                                }`}></div>
                                {order.status.toUpperCase().replace("-", " ")}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getPaymentStatusColor(order.paymentStatus)}`}>
                                {order.paymentStatus.toUpperCase()}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span className="text-sm font-semibold text-gray-700">
                                {getPaymentMethodIcon(order.paymentMethod)} {order.paymentMethod.toUpperCase()}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              {order.createdAt && (
                                <span className="text-xs text-gray-600 flex items-center whitespace-nowrap">
                                  <Calendar size={12} className="mr-1 text-orange-600" />
                                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleViewClick(order)}
                                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300"
                                  title="View Details"
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    const nextStatus = 
                                      order.status === "pending" ? "confirmed" :
                                      order.status === "confirmed" ? "processing" :
                                      order.status === "processing" ? "shipped" :
                                      order.status === "shipped" ? "delivered" : "pending";
                                    updateOrderStatus(oid, nextStatus);
                                  }}
                                  className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300"
                                  title="Update Status"
                                >
                                  <Truck size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(oid)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300"
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* View Order Details Dialog */}
      <AlertDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200 max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-2xl font-black text-gray-900">
              <Package className="mr-2 text-orange-600" size={24} />
              Order Details - {selectedOrder?.orderNumber}
            </AlertDialogTitle>
          </AlertDialogHeader>

          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                  <h3 className="font-black text-gray-900 mb-3 flex items-center">
                    <User size={18} className="mr-2 text-orange-600" />
                    Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-bold">Name:</span> {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</p>
                    <p><span className="font-bold">Email:</span> {selectedOrder.shippingAddress.email}</p>
                    <p><span className="font-bold">Phone:</span> {selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>

                <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                  <h3 className="font-black text-gray-900 mb-3 flex items-center">
                    <MapPin size={18} className="mr-2 text-orange-600" />
                    Shipping Address
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                    <p>{selectedOrder.shippingAddress.pincode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                <h3 className="font-black text-gray-900 mb-3 flex items-center">
                  <ShoppingBag size={18} className="mr-2 text-orange-600" />
                  Order Items ({selectedOrder.items.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 bg-white p-3 rounded-lg">
                      <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-orange-600 flex items-center">
                          <IndianRupee size={14} />
                          {item.subtotal.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                <h3 className="font-black text-gray-900 mb-3 flex items-center">
                  <CreditCard size={18} className="mr-2 text-orange-600" />
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span className="font-bold">₹{selectedOrder.tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-bold">₹{selectedOrder.shippingCost.toLocaleString('en-IN')}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span className="font-bold">-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t-2 border-amber-300 text-lg">
                    <span className="font-black">Total:</span>
                    <span className="font-black text-orange-600 flex items-center">
                      <IndianRupee size={16} />
                      {selectedOrder.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-xl font-black text-gray-900">
              <AlertTriangle className="mr-2 text-red-600" size={24} />
              Delete Order?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base">
              Are you sure you want to delete this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}