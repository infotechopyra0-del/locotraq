"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Package, Calendar, Truck, MapPin, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        if (data.success) {
          setOrder(data.order);
        } else {
          setError(data.message || "Order not found");
        }
      } catch (err) {
        setError("Order not found");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-bold text-lg">{error || "Order not found"}</p>
          <button
            onClick={() => router.push("/profile/my-orders")}
            className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-linear-to-r from-orange-600 to-orange-500 text-white py-12 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.push("/profile/my-orders")}
              className="flex items-center text-white/80 hover:text-white transition-colors mr-4"
            >
              <Package className="w-5 h-5 mr-2" />
              Back to Orders
            </button>
            <h1 className="text-3xl md:text-4xl font-black flex items-center">
              Order #{order.orderNumber}
            </h1>
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h2>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-600 mt-4 md:mt-0">
                ₹{order.total.toLocaleString()}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-orange-300 text-orange-600 bg-orange-50">
                {order.status.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-green-300 text-green-600 bg-green-50">
                {order.paymentStatus.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-gray-300 text-gray-600 bg-gray-50">
                {order.paymentMethod}
              </span>
              {order.trackingNumber && (
                <span className="px-3 py-1 rounded-full text-xs font-bold border border-blue-300 text-blue-600 bg-blue-50">
                  <Truck className="w-4 h-4 inline mr-1" />
                  {order.trackingNumber}
                </span>
              )}
            </div>
            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Items</h3>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.productImage || "/images/default-product.jpg"}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString()} = ₹{item.subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Shipping Address */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                Shipping Address
              </h3>
              <p className="text-gray-600 text-sm">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>
            {/* Price Breakdown */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>₹{order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{order.shippingCost === 0 ? "FREE" : `₹${order.shippingCost}`}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-gray-900 text-lg font-bold">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
