"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, Search, Phone, Mail, Clock, 
  Navigation, Star, Filter, Map, List, ExternalLink,
  Store, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
  rating: number;
  reviews: number;
  distance?: number;
  isOpen: boolean;
  services: string[];
}

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const [loading, setLoading] = useState(false);

  // Sample store data
  const stores: StoreLocation[] = [
    {
      id: 1,
      name: "Locotraq Varanasi - Head Office",
      address: "AIC Building, BHU Campus",
      city: "Varanasi",
      state: "Uttar Pradesh",
      pincode: "221005",
      phone: "+91 6390 057 777",
      email: "varanasi@locotraq.com",
      coordinates: { lat: 25.2677, lng: 82.9913 },
      hours: {
        weekday: "9:00 AM - 6:00 PM",
        weekend: "10:00 AM - 4:00 PM"
      },
      rating: 4.8,
      reviews: 156,
      distance: 0,
      isOpen: true,
      services: ["Sales", "Support", "Installation", "Repairs"]
    },
    {
      id: 2,
      name: "Locotraq Delhi Store",
      address: "Connaught Place, Central Delhi",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      phone: "+91 11 2345 6789",
      email: "delhi@locotraq.com",
      coordinates: { lat: 28.6315, lng: 77.2167 },
      hours: {
        weekday: "10:00 AM - 7:00 PM",
        weekend: "11:00 AM - 5:00 PM"
      },
      rating: 4.6,
      reviews: 203,
      distance: 670,
      isOpen: true,
      services: ["Sales", "Support", "Installation"]
    },
    {
      id: 3,
      name: "Locotraq Mumbai Showroom",
      address: "Andheri East, Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400069",
      phone: "+91 22 4567 8901",
      email: "mumbai@locotraq.com",
      coordinates: { lat: 19.1136, lng: 72.8697 },
      hours: {
        weekday: "9:30 AM - 7:30 PM",
        weekend: "10:00 AM - 6:00 PM"
      },
      rating: 4.7,
      reviews: 189,
      distance: 1340,
      isOpen: true,
      services: ["Sales", "Support", "Demo"]
    },
    {
      id: 4,
      name: "Locotraq Bangalore Center",
      address: "Koramangala, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034",
      phone: "+91 80 1234 5678",
      email: "bangalore@locotraq.com",
      coordinates: { lat: 12.9352, lng: 77.6245 },
      hours: {
        weekday: "9:00 AM - 7:00 PM",
        weekend: "10:00 AM - 5:00 PM"
      },
      rating: 4.9,
      reviews: 241,
      distance: 1580,
      isOpen: false,
      services: ["Sales", "Support", "Installation", "Training"]
    },
    {
      id: 5,
      name: "Locotraq Kolkata Office",
      address: "Salt Lake, Kolkata",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700091",
      phone: "+91 33 2345 6789",
      email: "kolkata@locotraq.com",
      coordinates: { lat: 22.5726, lng: 88.3639 },
      hours: {
        weekday: "9:30 AM - 6:30 PM",
        weekend: "Closed"
      },
      rating: 4.5,
      reviews: 128,
      distance: 680,
      isOpen: true,
      services: ["Sales", "Support"]
    },
    {
      id: 6,
      name: "Locotraq Hyderabad Hub",
      address: "Hitech City, Hyderabad",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
      phone: "+91 40 3456 7890",
      email: "hyderabad@locotraq.com",
      coordinates: { lat: 17.4485, lng: 78.3908 },
      hours: {
        weekday: "9:00 AM - 7:00 PM",
        weekend: "10:00 AM - 4:00 PM"
      },
      rating: 4.7,
      reviews: 175,
      distance: 1120,
      isOpen: true,
      services: ["Sales", "Support", "Installation", "Corporate"]
    }
  ];

  const cities = ['all', ...new Set(stores.map(store => store.city))];

  const filteredStores = stores.filter(store => {
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === 'all' || store.city === selectedCity;
    
    return matchesSearch && matchesCity;
  });

  const handleGetDirections = (store: StoreLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleCallStore = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmailStore = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Navbar*/}
        <Navbar />
      {/* Header Section */}
      <div className="bg-linear-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center mb-4">
              <Store className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-black">
                Store Locator
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Find the nearest Locotraq store for sales, support, and service
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by city, location or store name..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-semibold"
                />
              </div>
            </div>

            {/* City Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-semibold w-full md:w-48"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow text-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'map' 
                    ? 'bg-white shadow text-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Map className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600 font-semibold">
              Found {filteredStores.length} {filteredStores.length === 1 ? 'store' : 'stores'}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Store Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'list' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border-2 border-gray-100 hover:border-orange-500"
              >
                {/* Store Header */}
                <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <Store className="h-6 w-6 mr-2" />
                      <h3 className="text-lg font-black">{store.name}</h3>
                    </div>
                    {store.isOpen ? (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        OPEN
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        CLOSED
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(store.rating)
                              ? 'text-yellow-300 fill-yellow-300'
                              : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-bold">
                      {store.rating} ({store.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Store Details */}
                <div className="p-6 space-y-4">
                  {/* Address */}
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-orange-600 mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-semibold">{store.address}</p>
                      <p className="text-gray-600 text-sm">
                        {store.city}, {store.state} - {store.pincode}
                      </p>
                      {store.distance !== undefined && store.distance > 0 && (
                        <p className="text-orange-600 text-sm font-bold mt-1">
                          {store.distance} km away
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-orange-600 mr-3" />
                    <a
                      href={`tel:${store.phone}`}
                      className="text-gray-900 font-semibold hover:text-orange-600 transition-colors"
                    >
                      {store.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-orange-600 mr-3" />
                    <a
                      href={`mailto:${store.email}`}
                      className="text-gray-900 font-semibold hover:text-orange-600 transition-colors"
                    >
                      {store.email}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-orange-600 mr-3 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-gray-900 font-semibold">Weekdays: {store.hours.weekday}</p>
                      <p className="text-gray-600">Weekend: {store.hours.weekend}</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {store.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button
                      onClick={() => handleGetDirections(store)}
                      className="bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-all flex items-center justify-center"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </button>
                    <button
                      onClick={() => handleCallStore(store.phone)}
                      className="bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all flex items-center justify-center"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Map View */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Map className="h-24 w-24 text-orange-600 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-gray-900 mb-3">
              Interactive Map View
            </h3>
            <p className="text-gray-600 mb-6">
              Map integration coming soon. For now, please use the list view or get directions to individual stores.
            </p>
            <button
              onClick={() => setViewMode('list')}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-all"
            >
              Switch to List View
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredStores.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-gray-900 mb-3">
              No Stores Found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search filters or search terms
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('all');
              }}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-all"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="bg-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-linear-to-r from-orange-600 to-orange-500 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-black mb-4">
              Can't Find a Store Near You?
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              We're expanding! Contact us to learn about upcoming locations or for online support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all"
              >
                Contact Support
              </Link>
              <a
                href="tel:+916390057777"
                className="bg-orange-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-800 transition-all flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}