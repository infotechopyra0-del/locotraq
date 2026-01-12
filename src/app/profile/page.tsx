'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, 
  Camera, CreditCard, Bell, ChevronLeft, Loader2
} from 'lucide-react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    },
    company: '',
    gstin: '',
    profileImage: '',
    cloudinaryPublicId: '',
    preferences: {
      newsletter: true,
      smsNotifications: true,
      orderUpdates: true
    }
  });
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/profile');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      fetchUserProfile()
    }
  }, [status, session]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      
      if (data.success) {
        setFormData(data.user);
        setProfileImage(data.user.profileImage || '/images/UserDefaultImage.jpg');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      if (data.success) {
        setCartCount(data.cart?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
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
      console.error('Error fetching wishlist count:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);

      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('oldPublicId', formData.cloudinaryPublicId || '');

      const response = await fetch('/api/upload/profile-image', {
        method: 'POST',
        body: uploadFormData
      });

      const data = await response.json();

      if (data.success) {
        setProfileImage(data.imageUrl);
        
        setFormData(prev => ({
          ...prev,
          profileImage: data.imageUrl,
          cloudinaryPublicId: data.publicId
        }));

        await updateProfileImage(data.imageUrl, data.publicId);
        
        // Refresh navbar profile image
        if (typeof window !== 'undefined' && (window as any).refreshNavbarAuth) {
          (window as any).refreshNavbarAuth();
        }
        
        // Dispatch custom event for profile update
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { imageUrl: data.imageUrl } }));
        
        toast.success('Profile picture updated successfully!');
      } else {
        toast.error(data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const updateProfileImage = async (imageUrl: string, publicId: string) => {
    try {
      const response = await fetch('/api/user/update-profile-image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profileImage: imageUrl,
          cloudinaryPublicId: publicId
        })
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error updating profile image:', error);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((prev as any)[parent] || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        
        // Refresh navbar profile data
        if (typeof window !== 'undefined' && (window as any).refreshNavbarAuth) {
          (window as any).refreshNavbarAuth();
        }
        
        // Dispatch custom event for profile update
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { profile: formData } }));
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-orange-500 shadow-xl overflow-hidden bg-gray-200">
                <Image
                  src={profileImage || '/images/UserDefaultImage.jpg'}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/UserDefaultImage.jpg';
                  }}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              
              <label className="absolute bottom-2 right-2 bg-orange-600 rounded-full p-3 shadow-lg cursor-pointer hover:bg-orange-700 transition-colors">
                {uploading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Camera className="w-5 h-5 text-white" />
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-4">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-600 mt-1">{formData.email}</p>
            <p className="text-sm text-gray-500 mt-4 text-center max-w-md">
              Click the camera icon to change your profile picture. Images will be automatically saved to cloud storage.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-linear-to-r from-orange-600 to-orange-500 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                    className="flex items-center bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-600" />
                Personal Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="pt-6 border-t border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                Address Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="pt-6 border-t border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-orange-600" />
                Business Information (Optional)
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="e.g., 09AAAAA0000A1Z5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="pt-6 border-t border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Communication Preferences
              </h3>
              <div className="space-y-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.newsletter}
                    onChange={(e) => handleCheckboxChange('newsletter', e.target.checked)}
                    disabled={!isEditing}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 mt-0.5 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="ml-3">
                    <span className="block font-semibold text-gray-900">Newsletter Subscription</span>
                    <span className="text-sm text-gray-600">Receive our latest updates, offers, and news</span>
                  </span>
                </label>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.smsNotifications}
                    onChange={(e) => handleCheckboxChange('smsNotifications', e.target.checked)}
                    disabled={!isEditing}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 mt-0.5 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="ml-3">
                    <span className="block font-semibold text-gray-900">SMS Notifications</span>
                    <span className="text-sm text-gray-600">Get important alerts via text message</span>
                  </span>
                </label>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.orderUpdates}
                    onChange={(e) => handleCheckboxChange('orderUpdates', e.target.checked)}
                    disabled={!isEditing}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 mt-0.5 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="ml-3">
                    <span className="block font-semibold text-gray-900">Order Updates</span>
                    <span className="text-sm text-gray-600">Receive notifications about your order status</span>
                  </span>
                </label>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
          },
        }}
      />
    </div>
  );
}