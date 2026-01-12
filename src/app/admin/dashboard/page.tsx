"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  Sparkles,
  Zap,
  Users,
  Package,
  ShoppingCart,
  FileText,
  MessageCircle,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalQuotes: number;
  totalContacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalQuotes: 0,
    totalContacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const loadToastShownRef = useRef(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async (opts: { forceToast?: boolean } = {}) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/dashboard/stats", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch dashboard stats");
      }

      const data: DashboardStats = await response.json();
      setStats(data);

      if (!loadToastShownRef.current || opts.forceToast) {
        toast.success("Dashboard stats loaded! 📊");
        loadToastShownRef.current = true;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Please check your connection.";
      toast.error("Failed to load dashboard stats", { description: message });
    } finally {
      setLoading(false);
    }
  };

  const statsConfig = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-700",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "from-green-500 to-green-700",
      bgColor: "from-green-50 to-green-100",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-700",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      label: "Total Quotes",
      value: stats.totalQuotes,
      icon: FileText,
      color: "from-orange-500 to-orange-700",
      bgColor: "from-orange-50 to-orange-100",
    },
    {
      label: "Total Contacts",
      value: stats.totalContacts,
      icon: MessageCircle,
      color: "from-teal-500 to-teal-700",
      bgColor: "from-teal-50 to-teal-100",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-800 flex items-center">
                Dashboard
                <Sparkles className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">
                Welcome back, Admin! 👋
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="pt-28 p-4 sm:p-6 lg:p-8 relative z-10 overflow-y-auto scrollbar-hide max-h-screen">
        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-amber-200 relative overflow-hidden group sm:mt-28">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-orange-900 flex items-center">
                <BarChart3 className="mr-2 text-orange-600" size={24} />
                Dashboard Statistics
                <Sparkles className="ml-2 text-amber-500" size={20} />
              </h2>

              <button
                onClick={() => fetchDashboardStats({ forceToast: true })}
                disabled={loading}
                className="w-full sm:w-auto bg-linear-to-r from-orange-600 to-orange-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={16} className={`sm:w-4.5 sm:h-4.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold text-sm sm:text-base">
                  Loading dashboard stats...
                </p>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {statsConfig.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-linear-to-br ${stat.bgColor} rounded-xl border-2 border-amber-200 overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group/card`}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-14 h-14 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform duration-300`}
                          >
                            <Icon size={28} className="text-white" />
                          </div>
                          <TrendingUp size={20} className="text-green-600" />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">
                          {stat.value}
                        </h3>
                        <p className="text-sm font-bold text-gray-600">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-amber-200 hover:border-orange-600 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <Zap size={120} className="text-orange-600" />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-black text-orange-900 mb-6 flex items-center">
              <Zap className="mr-2 text-orange-600" size={24} />
              Quick Actions
              <Sparkles className="ml-2 text-amber-500" size={18} />
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {[
                {
                  label: "Users",
                  icon: Users,
                  color: "from-blue-500 to-blue-700",
                  href: "/admin/dashboard/users",
                },
                {
                  label: "Products",
                  icon: Package,
                  color: "from-green-500 to-green-700",
                  href: "/admin/dashboard/products",
                },
                {
                  label: "Orders",
                  icon: ShoppingCart,
                  color: "from-purple-500 to-purple-700",
                  href: "/admin/dashboard/orders",
                },
                {
                  label: "Quotes",
                  icon: FileText,
                  color: "from-orange-500 to-orange-700",
                  href: "/admin/dashboard/quotes",
                },
                {
                  label: "Contacts",
                  icon: MessageCircle,
                  color: "from-teal-500 to-teal-700",
                  href: "/admin/dashboard/contacts",
                },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="group/btn relative bg-linear-to-br from-amber-50 to-orange-50 hover:from-orange-100 hover:to-amber-100 rounded-xl p-4 sm:p-6 border-2 border-amber-200 hover:border-orange-600 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg mx-auto mb-2 sm:mb-3 group-hover/btn:rotate-12 transition-transform duration-300`}
                    >
                      <Icon size={20} className="sm:w-6 sm:h-6 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm font-black text-gray-900 text-center">
                      {action.label}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}