"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useContext } from "react";
import { ClerkAvailableContext } from "./ClerkProviderWrapper";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
}

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
}: NavbarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const clerkAvailable = useContext(ClerkAvailableContext);
  const categories = [
  { name: "All Products", href: "/products" },
  { name: "Vehicle Trackers", href: "/products?category=vehicle" },
  { name: "Personal Trackers", href: "/products?category=personal" },
  { name: "Fleet Management", href: "/products?category=fleet" },
  { name: "Industrial Solutions", href: "/products?category=industrial" },
];


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔍 Search handler
  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) return;

    await fetch(`/api/search?q=${value}`);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* 🔶 TOP BAR */}
      <div className="bg-orange-600 text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between flex-wrap gap-2">
          <div className="flex gap-4">
            <a href="tel:+916390057777" className="flex items-center gap-1">
              <Phone size={14} /> +91 63900 57777
            </a>
            <a
              href="mailto:support@locotraq.com"
              className="hidden md:flex items-center gap-1"
            >
              <Mail size={14} /> support@locotraq.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={14} /> Free Shipping on Orders Above ₹10,000
          </div>
        </div>
      </div>

      {/* 🔷 MAIN NAVBAR */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          scrolled ? "shadow-lg" : "shadow"
        }`}
      >
        {/* 🔹 Categories Bar - Desktop */}
<div className="hidden lg:block bg-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between py-3">
      
      {/* Left Categories */}
      <div className="flex space-x-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Right Quick Links */}
      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <Link
          href="/track-order"
          className="flex items-center hover:text-orange-600 transition-colors"
        >
          <Package className="w-4 h-4 mr-1" />
          Track Order
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
                height={100}
                priority
              />
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden lg:flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-semibold text-gray-700 hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* SEARCH */}
            <div className="hidden lg:block flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search GPS trackers..."
                  className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-4">
              {clerkAvailable ? (
                // Render a child component that may call Clerk hooks safely.
                <AuthControls />
              ) : (
                <div className="hidden md:flex gap-2">
                  <a href="/sign-in" className="flex items-center gap-1">
                    <User size={18} /> Login
                  </a>
                  <a href="/sign-up" className="text-orange-600 font-semibold">
                    Sign Up
                  </a>
                </div>
              )}

              <Link href="/wishlist" className="relative">
                <Heart />
                {wishlistCount > 0 && (
                  <span className="badge">{wishlistCount}</span>
                )}
              </Link>

              <Link href="/cart" className="relative">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="badge">{cartCount}</span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden"
              >
                {mobileMenu ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div className="lg:hidden pb-3">
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="block py-2 font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

function AuthControls() {
  const { isSignedIn } = useUser();

  return (
    <>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <div className="hidden md:flex gap-2">
          <SignInButton mode="modal">
            <button className="flex items-center gap-1">
              <User size={18} /> Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-orange-600 font-semibold">Sign Up</button>
          </SignUpButton>
        </div>
      )}
    </>
  );
}
