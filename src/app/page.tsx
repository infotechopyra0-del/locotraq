'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, User, Menu, X, Star, Truck, Shield, 
  Zap, MapPin, Clock, Phone, Mail, Facebook, Twitter, Instagram, 
  Linkedin, ChevronRight, Heart, ArrowRight, TrendingUp, ChevronLeft,
  Package, Headphones, FileText, ChevronDown,  Award, Users, Globe,
  BadgeCheck, Percent, Gift, Sparkles, ThumbsUp, MessageCircle, PlayCircle
} from 'lucide-react';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';

import Link from 'next/link';
import { Button } from "@/components/ui/button"
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  _id: string;
  name: string;
  productName: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  productImage: string;
  images: string[];
  imageUrl: string;
  imageAlt: string;
  specifications: { [key: string]: string };
  stockQuantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  features: string[];
  isFeatured: boolean;
  inStock: boolean;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  badge?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Smart GPS Tracking Solutions',
    subtitle: 'Real-Time Precision',
    description: 'Leading GPS tracking solutions for vehicles, assets, and fleet management. Trusted by 10,000+ customers worldwide.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-2196644631-68b876f1b7c39.jpg?crop=1xw:1xh;center,top',
    cta: 'Shop Now',
    ctaLink: '/products',
    badge: '🎉 New Year Sale - Up to 40% OFF'
  },
  {
    id: 2,
    title: 'Fleet Management System',
    subtitle: 'Optimize Your Operations',
    description: 'Complete fleet tracking solution with real-time monitoring, route optimization, and detailed analytics for your business.',
    image: 'https://stavecorp.com/wp-content/uploads/2025/05/FTSM-Post-Photo1.jpg',
    cta: 'Explore Fleet Solutions',
    ctaLink: '/products?category=fleet',
    badge: '⚡ Best Seller'
  },
  {
    id: 3,
    title: 'Personal Safety Trackers',
    subtitle: 'Protect Your Loved Ones',
    description: 'Keep your family safe with our advanced personal GPS trackers. Real-time location, geofencing, and emergency alerts.',
    image: 'https://media.wired.com/photos/593278065c4fbd732b552ed0/3:2/w_2560%2Cc_limit/GPS-Tracker-in-Hands_Jon-Snyder.jpg',
    cta: 'View Personal Trackers',
    ctaLink: '/products?category=personal',
    badge: '🔥 Trending Now'
  },
  {
    id: 4,
    title: 'Industrial Asset Monitoring',
    subtitle: 'Secure Your Assets',
    description: 'Track and protect valuable equipment and machinery with our industrial-grade GPS tracking devices and monitoring system.',
    image: 'https://tiindia.com/wp-content/uploads/2021/09/cg-power-bg.jpg',
    cta: 'Industrial Solutions',
    ctaLink: '/products?category=industrial',
    badge: '💎 Premium Quality'
  }
];

const products: Product[] = [
    {
      id: 'loco-vehicle-tracking-device',
      _id: 'loco-vehicle-tracking-device',
      productName: 'Loco Vehicle Tracking Device',
      name: 'Loco Vehicle Tracking Device',
      description: 'Professional handheld GPS tracker with high accuracy positioning and digital display for vehicle tracking and monitoring.',
      shortDescription: 'Handheld GPS tracker with 3-15m accuracy and digital display.',
      price: 5500,
      originalPrice: 6500,
      category: 'Vehicle',
      subcategory: 'Handheld',
      rating: 4.7,
      reviewCount: 156,
      productImage: '/images/Loco-Vehicle-Tracking-Device.jpg',
      images: [
        '/images/Loco-Vehicle-Tracking-Device.jpg',
        '/images/Loco-Vehicle-Tracking-Device2.jpg'
      ],
      imageUrl: '/images/Loco-Vehicle-Tracking-Device.jpg',
      imageAlt: 'Loco Vehicle Tracking Device GPS Tracker',
      features: [
        'Handheld GPS tracker',
        'Digital display',
        'High accuracy positioning',
        'Vehicle tracking capability',
        'Professional grade device',
        'Easy to use interface'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Network': 'GPS',
        'GPS Accuracy': '3 to 15 meters',
        'Display': 'Digital',
        'Battery Life': 'Up to 12 hours',
        'Connectivity': 'GPS + GSM'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'gps-vehicle-tracking-device',
      _id: 'gps-vehicle-tracking-device',
      productName: 'GPS Vehicle Tracking Device',
      name: 'GPS Vehicle Tracking Device',
      description: 'Professional handheld GPS tracker with high accuracy positioning and digital display for comprehensive vehicle tracking and monitoring solutions.',
      shortDescription: 'Lightweight handheld GPS tracker with 3-15m accuracy and digital display.',
      price: 1500,
      originalPrice: 2000,
      category: 'Vehicle',
      subcategory: 'Handheld',
      rating: 4.8,
      reviewCount: 189,
      productImage: '/images/GPS-Vehicle-Tracking-Device.jpg',
      images: [
        '/images/GPS-Vehicle-Tracking-Device.jpg'
      ],
      imageUrl: '/images/GPS-Vehicle-Tracking-Device.jpg',
      imageAlt: 'GPS Vehicle Tracking Device Handheld Tracker',
      features: [
        'Lightweight handheld design',
        'Digital display interface',
        'High accuracy GPS positioning',
        'Vehicle tracking capability',
        'Portable and compact',
        'Professional grade reliability'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Display': 'Digital',
        'GPS Accuracy': '3 to 15 meters',
        'Weight': '96 Grams (g)',
        'Supply Ability': '100 Per Month',
        'Network': 'GPS',
        'Connectivity': 'GPS + GSM'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'e-lock-gps-vehicle-tracking-device',
      _id: 'e-lock-gps-vehicle-tracking-device',
      productName: 'E Lock GPS Vehicle Tracking Device',
      name: 'E Lock GPS Vehicle Tracking Device',
      description: 'Advanced E Lock GPS vehicle tracking device with wireless network connectivity and automotive usage for comprehensive vehicle security and monitoring.',
      shortDescription: 'Wireless E Lock GPS tracker for automotive use with digital display.',
      price: 12500,
      originalPrice: 15000,
      category: 'Vehicle',
      subcategory: 'Automotive',
      rating: 4.6,
      reviewCount: 98,
      productImage: '/images/E-Lock-GPS-Vehicle-Tracking-Device.jpg',
      images: [
        '/images/E-Lock-GPS-Vehicle-Tracking-Device.jpg',
        '/images/E-Lock-GPS-Vehicle-Tracking-Device2.jpg'
      ],
      imageUrl: '/images/E-Lock-GPS-Vehicle-Tracking-Device.jpg',
      imageAlt: 'E Lock GPS Vehicle Tracking Device Automotive Tracker',
      features: [
        'Electronic lock integration',
        'Wireless network connectivity',
        'Automotive grade reliability',
        'Digital display interface',
        'Heavy-duty construction',
        'Advanced security features'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Automotive',
        'Network': 'Wireless',
        'Display': 'Digital',
        'Weight': '270 Kilograms (kg)',
        'Dimensions': '10 x 6.7 x 5 cm Centimeter (cm)',
        'Supply Ability': '100 Per Month',
        'Connectivity': 'Wireless GPS'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'live-tracking-device',
      _id: 'live-tracking-device',
      productName: 'Live Tracking Device',
      name: 'Live Tracking Device',
      description: 'Ultra-lightweight live tracking device with real-time GPS monitoring and handheld portability for instant location tracking.',
      shortDescription: 'Ultra-light live GPS tracker with 3-15m accuracy and real-time monitoring.',
      price: 5500,
      originalPrice: 6500,
      category: 'Personal',
      subcategory: 'Live Tracking',
      rating: 4.9,
      reviewCount: 234,
      productImage: '/images/Live-Tracking-Device.jpg',
      images: [
        '/images/Live-Tracking-Device.jpg',
        '/images/Live-Tracking-Device2.jpg'
      ],
      imageUrl: '/images/Live-Tracking-Device.jpg',
      imageAlt: 'Live Tracking Device GPS Real-time Tracker',
      features: [
        'Real-time live tracking',
        'Ultra-lightweight design',
        'Handheld portability',
        'High accuracy GPS',
        'Digital display',
        'Instant location updates'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Network': 'GPS',
        'Display': 'Digital',
        'Weight': '26.6 Grams (g)',
        'GPS Accuracy': '3 to 15 meters',
        'Supply Ability': '100 Per Month',
        'Connectivity': 'GPS Network'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'real-time-tracking-device',
      _id: 'real-time-tracking-device',
      productName: 'Real Time Tracking Device',
      name: 'Real Time Tracking Device',
      description: 'Industrial grade real-time GPS tracking device with superior quality and handheld design for professional applications and monitoring.',
      shortDescription: 'Industrial grade real-time GPS tracker with superior quality for professional use.',
      price: 5500,
      originalPrice: 6800,
      category: 'Industrial',
      subcategory: 'Real Time',
      rating: 4.8,
      reviewCount: 167,
      productImage: '/images/Real-Time-Tracking-Device.jpg',
      images: [
        '/images/Real-Time-Tracking-Device.jpg',
      ],
      imageUrl: '/images/Real-Time-Tracking-Device.jpg',
      imageAlt: 'Real Time Tracking Device Industrial GPS Tracker',
      features: [
        'Real-time GPS tracking',
        'Good quality construction',
        'Industrial grade reliability',
        'Handheld design',
        'Digital display interface',
        'Professional applications'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Network': 'GPS',
        'Features': 'Good Quality',
        'Display': 'Digital',
        'Usage & Applications': 'Industrial',
        'GPS Accuracy': '3 to 15 meters',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'bell-shaped-pet-tracking-device',
      _id: 'bell-shaped-pet-tracking-device',
      productName: 'Bell Shaped Pet Tracking Device',
      name: 'Bell Shaped Pet Tracking Device',
      description: 'Innovative bell-shaped GPS tracking device designed for pets with industrial-grade quality and handheld operation for comprehensive pet monitoring.',
      shortDescription: 'Bell-shaped GPS tracker for pets with industrial quality and digital display.',
      price: 6500,
      originalPrice: 7800,
      category: 'Pet',
      subcategory: 'Bell Shaped',
      rating: 4.7,
      reviewCount: 143,
      productImage: '/images/Bell-Shaped-Pet-Tracking-Device.jpg',
      images: [
        '/images/Bell-Shaped-Pet-Tracking-Device.jpg',
      ],
      imageUrl: '/images/Bell-Shaped-Pet-Tracking-Device.jpg',
      imageAlt: 'Bell Shaped Pet Tracking Device GPS Tracker',
      features: [
        'Unique bell-shaped design',
        'Pet-friendly tracking',
        'Good quality construction',
        'Industrial grade reliability',
        'Digital display',
        'Handheld operation'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Network': 'GPS',
        'Features': 'Good Quality',
        'Display': 'Digital',
        'Usage & Applications': 'Industrial',
        'GPS Accuracy': '10 Meter',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'loco-gps-tracking-device',
      _id: 'loco-gps-tracking-device',
      productName: 'Loco GPS Tracking Device',
      name: 'Loco GPS Tracking Device',
      description: 'Lightweight automotive GPS tracking device with digital display and precise GPS network connectivity for vehicle monitoring and fleet management.',
      shortDescription: 'Lightweight automotive GPS tracker with digital display and GPS network.',
      price: 5500,
      originalPrice: 6800,
      category: 'Vehicle',
      subcategory: 'Automotive',
      rating: 4.6,
      reviewCount: 201,
      productImage: '/images/Loco-GPS-Tracking-Device.jpg',
      images: [
        '/images/Loco-GPS-Tracking-Device.jpg',
      ],
      imageUrl: '/images/Loco-GPS-Tracking-Device.jpg',
      imageAlt: 'Loco GPS Tracking Device Automotive Tracker',
      features: [
        'Lightweight automotive design',
        'GPS network connectivity',
        'Digital display interface',
        'Vehicle monitoring',
        'Fleet management ready',
        'Compact 96g weight'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Automotive',
        'Network': 'GPS',
        'Weight': '96 Grams (g)',
        'Display': 'Digital',
        'Supply Ability': '100 Per Month',
        'Connectivity': 'GPS Network'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'loco-tracking-device',
      _id: 'loco-tracking-device',
      productName: 'Loco Tracking Device',
      name: 'Loco Tracking Device',
      description: 'High-quality handheld GPS tracking device with precise 10-meter accuracy for industrial applications and professional monitoring needs.',
      shortDescription: 'High-quality handheld GPS tracker with 10m accuracy for industrial use.',
      price: 5500,
      originalPrice: 6700,
      category: 'Industrial',
      subcategory: 'Professional',
      rating: 4.8,
      reviewCount: 178,
      productImage: '/images/Loco-Tracking-Device.jpg',
      images: [
        '/images/Loco-Tracking-Device.jpg',
      ],
      imageUrl: '/images/Loco-Tracking-Device.jpg',
      imageAlt: 'Loco Tracking Device Industrial GPS Tracker',
      features: [
        'Good quality construction',
        'Handheld portability',
        'High precision tracking',
        'Industrial applications',
        'Digital display',
        '10-meter accuracy'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Network': 'GPS',
        'Display': 'Digital',
        'Features': 'Good Quality',
        'Usage & Applications': 'Industrial',
        'GPS Accuracy': '10 Meter',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'id-card-gps-tracker',
      _id: 'id-card-gps-tracker',
      productName: 'Id Card Gps Tracker',
      name: 'Id Card Gps Tracker',
      description: 'Compact ID card-sized GPS tracker with Bluetooth connectivity and analog display, designed for discreet tracking and industrial applications.',
      shortDescription: 'Compact ID card GPS tracker with Bluetooth and analog display.',
      price: 6500,
      originalPrice: 8000,
      category: 'Personal',
      subcategory: 'ID Card',
      rating: 4.5,
      reviewCount: 124,
      productImage: '/images/Id-Card-Gps-Tracker.jpeg',
      images: [
        '/images/Id-Card-Gps-Tracker.jpeg',
        '/images/Id-Card-Gps-Tracker2.jpeg'
      ],
      imageUrl: '/images/Id-Card-Gps-Tracker.jpeg',
      imageAlt: 'Id Card GPS Tracker Compact Bluetooth Tracker',
      features: [
        'ID card compact design',
        'Bluetooth-enabled connectivity',
        'Good quality construction',
        'Discreet tracking',
        'Industrial applications',
        'Handheld operation'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Features': 'Good Quality',
        'Display': 'Analog',
        'Function': 'Bluetooth-Enabled DVD/VCD',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'magnetic-gps-tracking-device-5000mah',
      _id: 'magnetic-gps-tracking-device-5000mah',
      productName: 'Magnetic Gps Tracking Device(5000MAH)',
      name: 'Magnetic Gps Tracking Device(5000MAH)',
      description: 'High-capacity 5000mAh magnetic GPS tracking device with analog display and superior quality for extended tracking and industrial applications.',
      shortDescription: 'High-capacity 5000mAh magnetic GPS tracker with analog display.',
      price: 6500,
      originalPrice: 8200,
      category: 'Industrial',
      subcategory: 'Magnetic',
      rating: 4.7,
      reviewCount: 156,
      productImage: '/images/Magnetic-Gps-Tracking-Device-5000MAH.jpg',
      images: [
        '/images/Magnetic-Gps-Tracking-Device-5000MAH.jpg',
        '/images/Magnetic-Gps-Tracking-Device-5000MAH2.jpeg'
      ],
      imageUrl: '/images/Magnetic-Gps-Tracking-Device-5000MAH.jpg',
      imageAlt: 'Magnetic GPS Tracking Device 5000mAh High Capacity Tracker',
      features: [
        'Powerful 5000mAh battery',
        'Magnetic mounting system',
        'Good quality construction',
        'Extended battery life',
        'Industrial grade reliability',
        'Analog display interface'
      ],
      specifications: {
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Features': 'Good Quality',
        'Display': 'Analog',
        'Battery': '5000mAh High Capacity',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month',
        'Mounting': 'Magnetic'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 's11-mini-gps-tracker-audio-recording',
      _id: 's11-mini-gps-tracker-audio-recording',
      productName: 'S11 Mini GPS Tracker With Audio Recording - Best 2G Hidden Magnetic GPS Tracking',
      name: 'S11 Mini GPS Tracker With Audio Recording - Best 2G Hidden Magnetic GPS Tracking',
      description: 'Advanced S11 Mini GPS tracker with audio recording capability, 2G connectivity, and magnetic mounting for hidden automotive tracking and industrial applications.',
      shortDescription: 'Mini GPS tracker with audio recording, 2G connectivity, and magnetic mounting.',
      price: 8999,
      originalPrice: 11000,
      category: 'Vehicle',
      subcategory: 'Mini Hidden',
      rating: 4.8,
      reviewCount: 89,
      productImage: '/images/S11-Mini-GPS-Tracker-With-Audio-Recording-Best-2G-Hidden-Magnetic-GPS-Tracking.jpg',
      images: [
        '/images/S11-Mini-GPS-Tracker-With-Audio-Recording-Best-2G-Hidden-Magnetic-GPS-Tracking.jpg',
        '/images/S11-Mini-GPS-Tracker-With-Audio-Recording-Best-2G-Hidden-Magnetic-GPS-Tracking2.jpeg',
        '/images/S11-Mini-GPS-Tracker-With-Audio-Recording-Best-2G-Hidden-Magnetic-GPS-Tracking3.jpeg'
      ],
      imageUrl: '/images/S11-Mini-GPS-Tracker-With-Audio-Recording-Best-2G-Hidden-Magnetic-GPS-Tracking.jpg',
      imageAlt: 'S11 Mini GPS Tracker Audio Recording Magnetic Hidden Tracker',
      features: [
        'Audio recording capability',
        'Mini hidden design',
        '2G network connectivity',
        'Magnetic mounting',
        'Bluetooth-enabled features',
        'Automotive grade quality'
      ],
      specifications: {
        'Model': 'S11 Mini GPS Tracker',
        'Usage': 'Automotive',
        'Network': '2G Hidden Magnetic',
        'Display': 'Analog',
        'Function': 'Bluetooth-Enabled DVD/VCD',
        'Features': 'Good Quality',
        'Audio': 'Recording Capability',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'et15-long-standby-wireless-magnetic-car-asset-tracker',
      _id: 'et15-long-standby-wireless-magnetic-car-asset-tracker',
      productName: 'ET15 long Standby time wireless magnetic car asset tracker gps tracking device',
      name: 'ET15 long Standby time wireless magnetic car asset tracker gps tracking device',
      description: 'ET15 advanced GPS tracking device with extended standby time, wireless connectivity, and magnetic mounting for comprehensive car and asset tracking solutions.',
      shortDescription: 'ET15 GPS tracker with long standby, wireless connectivity, and magnetic mounting.',
      price: 12000,
      originalPrice: 14500,
      category: 'Asset',
      subcategory: 'Car Asset',
      rating: 4.6,
      reviewCount: 73,
      productImage: '/images/ET15-Long-Standby-Wireless-Magnetic-Car-Asset-Tracker.jpg',
      images: [
        '/images/ET15-Long-Standby-Wireless-Magnetic-Car-Asset-Tracker.jpg',
      ],
      imageUrl: '/images/ET15-Long-Standby-Wireless-Magnetic-Car-Asset-Tracker.jpg',
      imageAlt: 'ET15 Long Standby Wireless Magnetic Car Asset GPS Tracker',
      features: [
        'Extended standby time',
        'Wireless connectivity',
        'Magnetic car mounting',
        'Asset tracking capability',
        'Bluetooth-enabled features',
        'Industrial grade quality'
      ],
      specifications: {
        'Model': 'ET15 GPS Tracker',
        'Type': 'GPS Tracker',
        'Display': 'Analog',
        'Function': 'Bluetooth-Enabled DVD/VCD',
        'Features': 'Good Quality',
        'Standby': 'Long Standby Time',
        'Connectivity': 'Wireless Magnetic',
        'Application': 'Car Asset Tracking',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'vt03d-gps-portable-tracker-large-battery',
      _id: 'vt03d-gps-portable-tracker-large-battery',
      productName: 'VT03D GPS PORTABLE TRACKER Large battery GPS vehicle/asset tracker with strong',
      name: 'VT03D GPS PORTABLE TRACKER Large battery GPS vehicle/asset tracker with strong',
      description: 'VT03D portable GPS tracker with large battery capacity and strong construction for reliable vehicle and asset tracking in industrial applications.',
      shortDescription: 'VT03D portable GPS tracker with large battery and strong construction.',
      price: 10000,
      originalPrice: 12500,
      category: 'Asset',
      subcategory: 'Portable',
      rating: 4.7,
      reviewCount: 92,
      productImage: '/images/VT03D-GPS-PORTABLE-TRACKER.jpg',
      images: [
        '/images/VT03D-GPS-PORTABLE-TRACKER.jpg',
        '/images/VT03D-GPS-PORTABLE-TRACKER2.jpeg'
      ],
      imageUrl: '/images/vt03d-gps-portable-tracker.jpg',
      imageAlt: 'VT03D GPS Portable Tracker Large Battery Vehicle Asset Tracker',
      features: [
        'Large battery capacity',
        'Portable design',
        'Strong construction',
        'Vehicle tracking',
        'Asset monitoring',
        'Industrial grade reliability'
      ],
      specifications: {
        'Model': 'VT03D GPS Tracker',
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Features': 'Good Quality',
        'Display': 'Analog',
        'Battery': 'Large Battery Capacity',
        'Construction': 'Strong Build',
        'Application': 'Vehicle/Asset Tracker',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'obd-gps-tracker-2g-vehicle-plug-play-fleet',
      _id: 'obd-gps-tracker-2g-vehicle-plug-play-fleet',
      productName: 'OBD GPS Tracker 2G OBD 2 Vehicle GPS Tracker, Plug & Play GPS Tracker For Fleet',
      name: 'OBD GPS Tracker 2G OBD 2 Vehicle GPS Tracker, Plug & Play GPS Tracker For Fleet',
      description: 'Advanced OBD GPS tracker with 2G connectivity and plug & play installation for easy fleet management and vehicle monitoring with Bluetooth features.',
      shortDescription: 'OBD GPS tracker with 2G connectivity and plug & play fleet management.',
      price: 5999,
      originalPrice: 7500,
      category: 'Fleet',
      subcategory: 'OBD',
      rating: 4.8,
      reviewCount: 134,
      productImage: '/images/OBD-GPS-Tracker-2G-OBD-2-Vehicle-GPS-Tracker.jpg',
      images: [
        '/images/OBD-GPS-Tracker-2G-OBD-2-Vehicle-GPS-Tracker.jpg',
        '/images/OBD-GPS-Tracker-2G-OBD-2-Vehicle-GPS-Tracker2.jpeg',
        '/images/OBD-GPS-Tracker-2G-OBD-2-Vehicle-GPS-Tracker3.jpeg',
        '/images/OBD-GPS-Tracker-2G-OBD-2-Vehicle-GPS-Tracker4.jpeg'
      ],
      imageUrl: '/images/OBD-GPS-Tracker-2G-OBD-2-Vehicle-GPS-Tracker.jpg',
      imageAlt: 'OBD GPS Tracker 2G Vehicle Plug Play Fleet Management',
      features: [
        'OBD port connection',
        'Plug & play installation',
        '2G network connectivity',
        'Fleet management ready',
        'Bluetooth-enabled features',
        'Vehicle diagnostic data'
      ],
      specifications: {
        'Model': 'OBD GPS Tracker',
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Network': '2G OBD Connection',
        'Installation': 'Plug & Play',
        'Display': 'Analog',
        'Function': 'Bluetooth-Enabled DVD/VCD',
        'Features': 'Good Quality',
        'Application': 'Fleet Management',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'w15-affordable-2g-black-wireless-magnetic-gps-tracker',
      _id: 'w15-affordable-2g-black-wireless-magnetic-gps-tracker',
      productName: 'W15 - Affordable 2G Black Wireless Magnetic GPS Tracker For Assets Monitoring',
      name: 'W15 - Affordable 2G Black Wireless Magnetic GPS Tracker For Assets Monitoring',
      description: 'W15 affordable black wireless magnetic GPS tracker with 2G connectivity and GPS antenna for comprehensive assets monitoring and automotive applications.',
      shortDescription: 'W15 affordable 2G black wireless magnetic GPS tracker for asset monitoring.',
      price: 12999,
      originalPrice: 15500,
      category: 'Asset',
      subcategory: 'Wireless Magnetic',
      rating: 4.6,
      reviewCount: 87,
      productImage: '/images/W15-Affordable-2G-Black-Wireless-Magnetic-GPS-Tracker.jpg',
      images: [
        '/images/W15-Affordable-2G-Black-Wireless-Magnetic-GPS-Tracker.jpg',
        '/images/Wireless-Gps-Tracking-System.jpg'
      ],
      imageUrl: '/images/W15-Affordable-2G-Black-Wireless-Magnetic-GPS-Tracker.jpg',
      imageAlt: 'W15 Affordable 2G Black Wireless Magnetic GPS Tracker Assets',
      features: [
        'Affordable 2G connectivity',
        'Black wireless design',
        'Magnetic mounting system',
        'Asset monitoring capability',
        'Bluetooth-enabled features',
        'GPS antenna technology'
      ],
      specifications: {
        'Model': 'W15 GPS Tracker',
        'Type': 'GPS Antenna',
        'Usage': 'Automotive',
        'Features': 'Good Quality',
        'Function': 'Bluetooth-Enabled DVD/VCD',
        'Display': 'Analog',
        'Network': '2G Black Wireless',
        'Mounting': 'Magnetic',
        'Application': 'Assets Monitoring',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'magnetic-gps-tracker-8000mah',
      _id: 'magnetic-gps-tracker-8000mah',
      productName: 'Magnetic GPS Tracking Device (8000MAH) - Industrial Grade Automotive Tracker',
      name: 'Magnetic GPS Tracking Device (8000MAH) - Industrial Grade Automotive Tracker',
      description: 'High-capacity 8000MAH magnetic GPS tracking device designed for industrial applications with automotive usage capabilities, featuring good quality construction and bluetooth-enabled DVD/VCD functionality.',
      shortDescription: 'Industrial grade 8000MAH magnetic GPS tracker for automotive applications.',
      price: 15000,
      originalPrice: 18000,
      category: 'Industrial',
      subcategory: 'Magnetic Tracker',
      rating: 4.7,
      reviewCount: 92,
      productImage: '/images/Magnetic-GPS-Tracking-Device-8000MAH.jpg',
      images: [
        '/images/Magnetic-GPS-Tracking-Device-8000MAH.jpg',
        '/images/Magnetic-GPS-Tracking-Device-2500MAH.jpg'
      ],
      imageUrl: '/images/Magnetic-GPS-Tracking-Device-8000MAH.jpg',
      imageAlt: 'Magnetic GPS Tracking Device 8000MAH Industrial Automotive',
      features: [
        '8000MAH high-capacity battery',
        'Industrial grade construction',
        'Magnetic mounting system',
        'Automotive usage certified',
        'Bluetooth-enabled functionality',
        'DVD/VCD compatibility',
        'Good quality materials',
        'Analog display system'
      ],
      specifications: {
        'Model': 'Magnetic GPS Tracker 8000MAH',
        'Type': 'GPS Tracker',
        'Usage': 'Automotive',
        'Features': 'Good Quality',
        'Display': 'Analog',
        'Function': 'Bluetooth-Enabled DVD/VCD',
        'Battery Capacity': '8000MAH',
        'Mounting': 'Magnetic',
        'Application': 'Industrial',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month',
        'Construction': 'Heavy-duty industrial grade'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'wireless-gps-tracking-system-handheld',
      _id: 'wireless-gps-tracking-system-handheld',
      productName: 'Wireless GPS Tracking System - Handheld Industrial Bluetooth Device',
      name: 'Wireless GPS Tracking System - Handheld Industrial Bluetooth Device',
      description: 'Professional wireless GPS tracking system designed for handheld use in industrial applications, featuring bluetooth-enabled DVD/VCD functionality with analog display and good quality construction.',
      shortDescription: 'Handheld wireless GPS tracking system for industrial applications.',
      price: 5500,
      originalPrice: 6500,
      category: 'Industrial',
      subcategory: 'Handheld Tracker',
      rating: 4.5,
      reviewCount: 78,
      productImage: '/images/Wireless-Gps-Tracking-System.jpg',
      images: [
        '/images/Wireless-Gps-Tracking-System.jpg',
        '/images/Loco-Vehicle-Tracking-Device.jpg'
      ],
      imageUrl: '/images/Wireless-Gps-Tracking-System.jpg',
      imageAlt: 'Wireless GPS Tracking System Handheld Industrial Bluetooth',
      features: [
        'Wireless GPS tracking technology',
        'Handheld portable design',
        'Industrial grade construction',
        'Bluetooth-enabled connectivity',
        'DVD/VCD functionality',
        'Analog display system',
        'Good quality materials',
        'Professional grade accuracy'
      ],
      specifications: {
        'Model': 'Wireless GPS Tracking System',
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Features': 'Good Quality',
        'Display': 'Analog',
        'Function': 'Bluetooth-Enabled DVD/VCD',
        'Connectivity': 'Wireless',
        'Application': 'Industrial',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month',
        'Form Factor': 'Portable handheld device'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'magnetic-gps-tracker-2500mah-handheld',
      _id: 'magnetic-gps-tracker-2500mah-handheld',
      productName: 'Magnetic GPS Tracking Device (2500MAH) - Handheld Digital Industrial Tracker',
      name: 'Magnetic GPS Tracking Device (2500MAH) - Handheld Digital Industrial Tracker',
      description: 'Professional magnetic GPS tracking device with 2500MAH battery capacity, designed for handheld industrial use with high-precision GPS accuracy of 3-15 meters and digital display system.',
      shortDescription: 'Handheld magnetic GPS tracker with 2500MAH battery and 3-15m accuracy.',
      price: 4500,
      originalPrice: 5500,
      category: 'Industrial',
      subcategory: 'Magnetic Handheld',
      rating: 4.6,
      reviewCount: 85,
      productImage: '/images/Magnetic-GPS-Tracking-Device-2500MAH.jpg',
      images: [
        '/images/Magnetic-GPS-Tracking-Device-2500MAH.jpg',
        '/images/E-Lock-GPS-Vehicle-Tracking-Device.jpg'
      ],
      imageUrl: '/images/Magnetic-GPS-Tracking-Device-2500MAH.jpg',
      imageAlt: 'Magnetic GPS Tracking Device 2500MAH Handheld Digital Industrial',
      features: [
        '2500MAH battery capacity',
        'Magnetic mounting system',
        'Handheld portable design',
        'High GPS accuracy (3-15 meters)',
        'Digital display system',
        'Industrial grade construction',
        'Good quality materials',
        'GPS network connectivity'
      ],
      specifications: {
        'Model': 'Magnetic GPS Tracker 2500MAH',
        'Type': 'GPS Tracker',
        'Usage': 'Hand Held',
        'Features': 'Good Quality',
        'Display': 'Digital',
        'Network': 'GPS',
        'GPS Accuracy': '3 to 15 meters',
        'Battery Capacity': '2500MAH',
        'Mounting': 'Magnetic',
        'Application': 'Industrial',
        'Usage & Applications': 'Industrial',
        'Supply Ability': '100 Per Month',
        'Form Factor': 'Handheld with magnetic mount'
      },
      isActive: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

const categoriess = [
    { name: 'All Products', href: '/products' },
    { name: 'Vehicle Trackers', href: '/products?category=vehicle' },
    { name: 'Personal Trackers', href: '/products?category=personal' },
    { name: 'Fleet Management', href: '/products?category=fleet' },
    { name: 'Industrial Solutions', href: '/products?category=industrial' },
  ];
  const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Fleet Manager',
    company: 'TransLogix Pvt Ltd',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment: 'Excellent GPS tracking solution! Has helped us reduce fuel costs by 25% and improve delivery times significantly.'
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    company: 'SafeTransport Services',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment: 'The real-time tracking and customer support are outstanding. Best investment for our logistics business!'
  },
  {
    name: 'Amit Patel',
    role: 'Operations Head',
    company: 'QuickDeliver Co.',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    comment: 'Highly reliable and accurate. The mobile app makes it so easy to monitor our entire fleet from anywhere.'
  }
];

const blogPosts = [
  {
    id: 1,
    title: '10 Benefits of GPS Fleet Tracking for Your Business',
    excerpt: 'Discover how GPS tracking can transform your fleet operations and boost profitability.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80',
    category: 'Business',
    date: 'Dec 15, 2024',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'How to Choose the Right GPS Tracker for Your Vehicle',
    excerpt: 'A comprehensive guide to selecting the perfect tracking device for your needs.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80',
    category: 'Guide',
    date: 'Dec 12, 2024',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Personal Safety: Why Every Family Needs GPS Tracking',
    excerpt: 'Learn how personal GPS trackers can keep your loved ones safe in emergencies.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&q=80',
    category: 'Safety',
    date: 'Dec 10, 2024',
    readTime: '4 min read'
  }
];
const categories = [
    { name: 'VEHICAL TRACKERS', image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-2196644631-68b876f1b7c39.jpg?crop=1xw:1xh;center,top', link: '/shop?category=tops' },
    { name: 'PERSONAL TRACKERS', image: 'https://media.wired.com/photos/593278065c4fbd732b552ed0/3:2/w_2560%2Cc_limit/GPS-Tracker-in-Hands_Jon-Snyder.jpg', link: '/shop?category=abayas' },
    { name: 'FLEET MANAGEMENT', image: 'https://stavecorp.com/wp-content/uploads/2025/05/FTSM-Post-Photo1.jpg', link: '/shop?category=co-ords' },
    { name: 'INDUSTRIAL SOLUTIONS', image: 'https://tiindia.com/wp-content/uploads/2021/09/cg-power-bg.jpg', link: '/shop?category=dresses' }
  ];
export default function LocotraqHome() {
  return <LocotraqHomeCore isSignedIn={false} user={null} />;
}

function LocotraqHomeCore({ isSignedIn, user }: { isSignedIn: boolean; user: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [email, setEmail] = useState('');

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 23,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero slider auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Fetch cart and wishlist counts
  useEffect(() => {
    if (isSignedIn) {
      fetchCartCount();
      fetchWishlistCount();
    }
  }, [isSignedIn]);

  const fetchCartCount = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      if (data.success) {
        setCartCount(data.cart?.length || 0);
      }
    } catch (error) {
      // Handle error silently
    }
  };

  const fetchWishlistCount = async () => {
    try {
      const res = await fetch('/api/wishlist');
      const data = await res.json();
      if (data.success) {
        setWishlistCount(data.count || 0);
      }
    } catch (error) {
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (!isSignedIn) {
      toast.error('Please login to add items to cart', {
        description: 'You need to be logged in to add products to your cart',
        action: {
          label: 'Login',
          onClick: () => window.location.href = '/auth/login'
        }
      });
      return;
    }

    try {
      toast.loading('Adding to cart...', { id: 'add-to-cart' });

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          product: {
            productName: product.productName,
            price: product.price,
            productImage: product.productImage,
          },
          quantity: 1
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setCartCount(data.cartCount);
        toast.success('Product added to cart!', {
          id: 'add-to-cart',
          description: `${product.productName} has been added to your cart`,
          action: {
            label: 'View Cart',
            onClick: () => window.location.href = '/cart'
          }
        });
      } else {
        toast.error('Failed to add to cart', {
          id: 'add-to-cart',
          description: data.message || 'Something went wrong while adding to cart'
        });
      }
    } catch (error) {
      toast.error('Failed to add to cart', {
        id: 'add-to-cart',
        description: 'Network error occurred. Please try again.'
      });
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    if (!isSignedIn) {
      toast.error('Please login to add items to wishlist', {
        description: 'You need to be logged in to add products to your wishlist',
        action: {
          label: 'Login',
          onClick: () => window.location.href = '/auth/login'
        }
      });
      return;
    }

    try {
      toast.loading('Adding to wishlist...', { id: 'add-to-wishlist' });

      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          product: {
            productName: product.productName,
            price: product.price,
            productImage: product.productImage,
          }
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setWishlistCount(data.count);
        toast.success('Added to wishlist!', {
          id: 'add-to-wishlist',
          description: `${product.productName} has been added to your wishlist`,
          action: {
            label: 'View Wishlist',
            onClick: () => window.location.href = '/wishlist'
          }
        });
      } else {
        toast.error(data.message || 'Already in wishlist', {
          id: 'add-to-wishlist',
          description: 'This item might already be in your wishlist'
        });
      }
    } catch (error) {
      toast.error('Failed to add to wishlist', {
        id: 'add-to-wishlist',
        description: 'Network error occurred. Please try again.'
      });
    }
  };
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!', {
        description: 'You will receive updates about our latest products and offers',
        duration: 3000
      });
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Slider */}
      <section className="relative h-125 md:h-175 lg:h-175 overflow-hidden bg-linear-to-r from-orange-50 to-orange-100">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full py-12">
                  <div className="space-y-6 z-10">
                    {slide.badge && (
                      <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                        {slide.badge}
                      </div>
                    )}
                    <div className="space-y-2">
                      <h2 className="text-lg md:text-xl font-bold text-orange-600 uppercase tracking-wide">
                        {slide.subtitle}
                      </h2>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                        {slide.title}
                      </h1>
                    </div>
                    <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link
                        href={slide.ctaLink}
                        className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
                      >
                        {slide.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                    <div className="flex items-center space-x-8 pt-6">
                      <div>
                        <div className="text-3xl font-black text-orange-600">10k+</div>
                        <div className="text-sm text-gray-600">Happy Customers</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black text-orange-600">99.9%</div>
                        <div className="text-sm text-gray-600">Uptime</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black text-orange-600">4.8★</div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-125 object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-orange-600 w-12 h-3'
                  : 'bg-white/70 hover:bg-white w-3 h-3'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'Orders above ₹10,000' },
              { icon: Shield, title: 'Secure Payment', desc: '100% Protected' },
              { icon: Clock, title: '24/7 Support', desc: 'Always Available' },
              { icon: TrendingUp, title: 'Best Quality', desc: 'Premium Products' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{feature.title}</div>
                  <div className="text-xs text-gray-600">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    {/* Shop by Categories - NEW SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Shop by Categories
            </h2>
            <p className="text-gray-600">Find the perfect tracking solution for your needs</p>
          </div>
          {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative aspect-3/4 overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <Button className="bg-white text-black px-6 py-2 text-sm tracking-wider hover:bg-gray-100 transition-colors">
                  {category.name}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-12 bg-linear-to-r from-red-500 via-pink-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Zap className="text-yellow-500 mr-2 w-6 h-6" />
              <span className="font-bold text-gray-900 mr-4">Flash Sale Ends In:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg font-black text-xl">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-white font-black">:</span>
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg font-black text-xl">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-white font-black">:</span>
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg font-black text-xl">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 animate-pulse">
              Today's Hot Deals 🔥
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Limited time offers - Grab them before they're gone!
            </p>
            <Link 
              href="/products?sale=flash" 
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-lg font-black hover:bg-gray-100 transition-all transform hover:scale-105 text-lg shadow-xl"
            >
              Shop Flash Sale Now
            </Link>
          </div>
        </div>
      </section>  
    {/* Featured Products */}
    <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Header */}
    <div className="flex justify-between items-end mb-10">
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          Featured Products
        </h2>
        <p className="text-gray-600">
          Our most popular GPS tracking devices
        </p>
      </div>

      <Link
        href="/products"
        className="hidden md:flex items-center text-orange-600 font-bold hover:text-orange-700"
      >
        View All <ChevronRight className="w-5 h-5 ml-1" />
      </Link>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 6).map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
        >
          {/* Image */}
          <div className="relative aspect-4/3 overflow-hidden">
            <Link href={`/product/${product.id}`}>
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </Link>

            {product.isFeatured && (
              <span className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
            )}

            <button
              onClick={() => handleAddToWishlist(product)}
              className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-orange-600 hover:text-white transition"
            >
              <Heart className="w-5 h-5" />
            </button>

            {product.originalPrice > product.price && (
              <span className="absolute bottom-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <span className="text-sm text-orange-600 font-semibold mb-1">
              {product.category}
            </span>

            <Link href={`/product/${product.id}`}>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-orange-600">
                {product.productName}
              </h3>
            </Link>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="mb-5">
              <span className="text-2xl font-black text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Button - Always Bottom */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Mobile View All */}
    <div className="text-center mt-10 md:hidden">
      <Link
        href="/products"
        className="inline-block bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition"
      >
        View All Products
      </Link>
    </div>
  </div>
</section>

      {/* Trust Stats Banner - NEW SECTION */}
      <section className="py-12 bg-linear-to-r from-orange-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-110 transition-transform">
              <Users className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">10,000+</div>
              <div className="text-white/90 font-semibold">Happy Customers</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <Package className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">50,000+</div>
              <div className="text-white/90 font-semibold">Devices Sold</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <BadgeCheck className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">99.9%</div>
              <div className="text-white/90 font-semibold">Uptime</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <Headphones className="w-12 h-12 mx-auto mb-3" />
              <div className="text-4xl font-black mb-2">24/7</div>
              <div className="text-white/90 font-semibold">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose Locotraq?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industry-leading GPS tracking solutions with unmatched reliability and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Military-Grade Security',
                desc: 'End-to-end encryption ensures your data is always protected'
              },
              {
                icon: Zap,
                title: 'Real-Time Tracking',
                desc: 'Get instant location updates with 99.9% uptime guarantee'
              },
              {
                icon: MapPin,
                title: 'Global Coverage',
                desc: 'Track your assets anywhere in the world with satellite network'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-linear-to-br from-orange-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Video Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                See Locotraq in Action
              </h2>
              <p className="text-gray-300 text-lg">
                Watch how our GPS tracking solutions are transforming businesses across India. 
                From fleet management to personal safety, discover the power of real-time tracking.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time location updates',
                  'Geofencing & alerts',
                  'Route optimization',
                  'Detailed analytics dashboard'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <BadgeCheck className="w-5 h-5 text-orange-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" 
                alt="Demo Video" 
                className="w-full h-100 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="bg-orange-600 w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials - NEW SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <ThumbsUp className="w-4 h-4 inline mr-2" />
              TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Over 10,000+ happy customers trust Locotraq for their tracking needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 border-4 border-orange-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-orange-600 font-semibold">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Verified Purchase
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Blog Section - NEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Latest from Blog
              </h2>
              <p className="text-gray-600">Stay updated with GPS tracking insights and tips</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-orange-600 font-bold hover:text-orange-700 group">
              View All Posts
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-orange-600 font-bold text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/blog" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">
              View All Blog Posts
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Banner */}
      <section className="bg-linear-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-bounce">
            🎁 LIMITED TIME OFFER
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Ready to Start Tracking?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join 10,000+ satisfied customers and experience the power of advanced GPS tracking technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-block bg-orange-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 text-lg shadow-xl"
            >
              Shop Now - Get 40% OFF
            </Link>
            <Link 
              href="/contact" 
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 text-lg"
            >
              Contact Sales
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-white">
            <div className="flex items-center">
              <BadgeCheck className="w-6 h-6 mr-2 text-green-400" />
              <span>Money Back Guarantee</span>
            </div>
            <div className="hidden md:flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-400" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}