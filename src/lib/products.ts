export interface GPSProducts {
  id: string;
  _id?: string;
  productName: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  productImage: string;
  images: string[]; // Array of multiple images
  imageUrl?: string;
  imageAlt: string;
  features: string[];
  specifications: Record<string, string>;
  isActive: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Complete products database - in a real app, this would come from a database
export const products = (): GPSProducts[] => {
  return [
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
};

export const getProductById = (id: string): GPSProducts | null => {
  const productsList = products();
  return productsList.find(product => product.id === id) || null;
};