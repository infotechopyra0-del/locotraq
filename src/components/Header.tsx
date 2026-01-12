"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
  Truck,
  Package,
  Headphones,
  FileText,
  LogOut,
  Settings,
  MapPin,
  Receipt,
  ChevronDown,
  Gift,
  Star,
  TrendingUp,
  Tag,
  Store,
} from "lucide-react";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
}

interface UserData {
  name: string;
  email: string;
  image?: string;
  role?: string;
}

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
}: NavbarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: "All Products", href: "/products" },
    { name: "Vehicle Trackers", href: "/products?category=vehicle" },
    { name: "Personal Trackers", href: "/products?category=personal" },
    { name: "Fleet Management", href: "/products?category=fleet" },
    { name: "Industrial Solutions", href: "/products?category=industrial" },
  ];

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
    
    // Listen for profile updates
    const handleProfileUpdate = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  // Handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if user is authenticated
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/session');
      
      if (!response.ok) {
        console.error('Session fetch failed in Header:', response.statusText);
        setIsAuthenticated(false);
        return;
      }
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Header session API returned non-JSON response');
        setIsAuthenticated(false);
        return;
      }
      
      const data = await response.json();
      
      if (data && data.user) {
        setIsAuthenticated(true);
        setUserData({
          name: data.user.name || 'User',
          email: data.user.email || '',
          image: data.user.image || '/images/UserDefaultImage.jpg',
          role: data.user.role || 'user'
        });
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  // Expose refresh function globally
  useEffect(() => {
    (window as any).refreshNavbarAuth = checkAuthStatus;
    return () => {
      delete (window as any).refreshNavbarAuth;
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUserData(null);
      setProfileDropdown(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) return;
    await fetch(`/api/search?q=${value}`);
  };


  const profileMenuItems = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "My Orders", href: "/profile/my-orders", icon: Receipt },
    { name: "Wishlist", href: "/profile/wishlist", icon: Heart },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-orange-600 text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between flex-wrap gap-2">
          <div className="flex gap-4">
            <a href="tel:+916390057777" className="flex items-center gap-1 hover:underline">
              <Phone size={14} /> +91 63900 57777
            </a>
            <a
              href="mailto:support@locotraq.com"
              className="hidden md:flex items-center gap-1 hover:underline"
            >
              <Mail size={14} /> support@locotraq.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={14} /> Free Shipping on Orders Above ₹10,000
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          scrolled ? "shadow-lg" : "shadow"
        }`}
      >
        {/* Categories Bar - Desktop */}
        <div className="hidden lg:block bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              {/* Left Categories */}
              <div className="flex space-x-8">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="text-sm text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Right Quick Links */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <Link
                  href="/profile/track-order"
                  className="flex items-center hover:text-orange-600 transition-colors"
                >
                  <Package className="w-4 h-4 mr-1" />
                  Track Order
                </Link>
                <Link
                  href="/gift-cards"
                  className="flex items-center hover:text-orange-600 transition-colors"
                >
                  <Gift className="w-4 h-4 mr-1" />
                  Gift Cards
                </Link>

                <Link
                  href="/store-locator"
                  className="flex items-center hover:text-orange-600 transition-colors"
                >
                  <Store className="w-4 h-4 mr-1" />
                  Store Locator
                </Link>

                <Link
                  href="/support"
                  className="flex items-center hover:text-orange-600 transition-colors"
                >
                  <Headphones className="w-4 h-4 mr-1" />
                  Support
                </Link>

                <Link
                  href="/blog"
                  className="flex items-center hover:text-orange-600 transition-colors"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 lg:h-20 flex items-center justify-between gap-6">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/MainLogo.jpg"
                alt="Locotraq Logo"
                width={100}
                height={60}
                style={{ width: '100', height: '60' }}
                priority
                className="object-contain"
              />
            </Link>

            {/* DESKTOP SEARCH BAR */}
            <div className="hidden lg:block flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-4">
              {/* Login Button or Profile Dropdown */}
              {isAuthenticated && userData ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-600 shadow-md hover:shadow-lg transition-shadow">
                      <Image
                        src={userData.image || '/images/UserDefaultImage.jpg'}
                        alt={userData.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/UserDefaultImage.jpg';
                          checkAuthStatus();
                        }}
                      />
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`hidden md:block text-gray-600 transition-transform ${
                        profileDropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdown && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                            <Image
                              src={userData.image || '/images/UserDefaultImage.jpg'}
                              alt={userData.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 truncate">{userData.name}</p>
                            <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors"
                          >
                            <item.icon size={18} className="text-gray-600" />
                            <span className="font-medium text-gray-700">{item.name}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Admin Dashboard Link (if admin) */}
                      {userData.role === 'admin' && (
                        <div className="border-t border-gray-200 py-2">
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors"
                          >
                            <Settings size={18} className="text-orange-600" />
                            <span className="font-medium text-orange-600">Admin Dashboard</span>
                          </Link>
                        </div>
                      )}

                      {/* Logout */}
                      <div className="border-t border-gray-200 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut size={18} className="text-red-600" />
                          <span className="font-medium text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/auth/login" 
                  className="hidden md:flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}

              {/* Cart */}
              <Link href="/profile/cart" className="relative hover:text-orange-600 transition-colors">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link href="/profile/wishlist" className="relative hover:text-orange-600 transition-colors">
                <Heart />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden hover:text-orange-600 transition-colors"
              >
                {mobileMenu ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {/* User Profile Mobile */}
            {isAuthenticated && userData ? (
              <div className="pb-4 mb-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                    <Image
                      src={userData.image || '/images/UserDefaultImage.jpg'}
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{userData.name}</p>
                    <p className="text-xs text-gray-500">{userData.email}</p>
                  </div>
                </div>
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 py-2 font-medium text-gray-700"
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 py-2 font-semibold text-orange-600 border-b border-gray-200 pb-4 mb-4"
              >
                <User size={18} />
                Login / Register
              </Link>
            )}

            {/* Categories */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="font-bold text-gray-900 mb-2">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileMenu(false)}
                  className="block py-2 text-gray-700 hover:text-orange-600"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Quick Links */}
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <Link
                href="/track-order"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600"
              >
                <Package size={18} />
                Track Order
              </Link>
              <Link
                href="/gift-cards"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600"
              >
                <Gift size={18} />
                Gift Cards
              </Link>
              <Link
                href="/store-locator"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600"
              >
                <Store size={18} />
                Store Locator
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600"
              >
                <Headphones size={18} />
                Support
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600"
              >
                <FileText size={18} />
                Blog
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}