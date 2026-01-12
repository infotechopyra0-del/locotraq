"use client"
import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Gift, CreditCard, Mail, User, MessageSquare, 
  Check, Star, ShoppingBag, Heart, Calendar, Loader2,
  Download, Share2, Sparkles, Package, Clock
} from 'lucide-react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(0);

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000];

  const cardDesigns = [
    {
      id: 0,
      name: "Classic Orange",
      gradient: "from-orange-500 to-red-500",
      icon: Gift
    },
    {
      id: 1,
      name: "Blue Ocean",
      gradient: "from-blue-500 to-cyan-500",
      icon: Star
    },
    {
      id: 2,
      name: "Purple Dream",
      gradient: "from-purple-500 to-pink-500",
      icon: Heart
    },
    {
      id: 3,
      name: "Green Nature",
      gradient: "from-green-500 to-emerald-500",
      icon: ShoppingBag
    }
  ];

  const features = [
    {
      icon: Gift,
      title: "Perfect Gift",
      description: "Let them choose their favorite GPS tracker"
    },
    {
      icon: Calendar,
      title: "Schedule Delivery",
      description: "Send now or schedule for a special date"
    },
    {
      icon: Mail,
      title: "Digital Delivery",
      description: "Instant email delivery within minutes"
    },
    {
      icon: Clock,
      title: "No Expiry",
      description: "Valid for lifetime, no time limit"
    }
  ];

  const benefits = [
    "Instant digital delivery via email",
    "Redeemable on entire product range",
    "No expiration date or hidden fees",
    "Perfect for any occasion",
    "Secure & encrypted transactions",
    "Easy to use checkout process"
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 500) {
      setCustomAmount(value);
      setSelectedAmount(numValue);
    } else if (value === '') {
      setCustomAmount('');
      setSelectedAmount(null);
    }
  };

  const handlePurchase = async () => {
    if (!selectedAmount || !recipientEmail || !recipientName || !senderName) {
      toast.error('Please fill all required fields');
      return;
    }

    if (selectedAmount < 500) {
      toast.error('Minimum gift card amount is ₹500');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Gift card purchased successfully! Check your email for details.');
    }, 2000);
  };

  const getTotalAmount = () => {
    return selectedAmount || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
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
              <Gift className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-black">
                Gift Cards
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Give the perfect gift! Let them choose their favorite GPS tracking device.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all border-2 border-gray-100 hover:border-orange-500"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Gift Card Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Amount Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 text-orange-600 mr-3" />
                Select Amount
              </h2>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 rounded-xl font-bold text-lg transition-all ${
                      selectedAmount === amount
                        ? 'bg-orange-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Or Enter Custom Amount (Min ₹500)
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="500"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-semibold"
                />
              </div>
            </div>

            {/* Design Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-orange-600 mr-3" />
                Choose Design
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cardDesigns.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design.id)}
                    className={`relative p-6 rounded-xl transition-all ${
                      selectedDesign === design.id
                        ? 'ring-4 ring-orange-500 scale-105'
                        : 'ring-2 ring-gray-200 hover:ring-gray-300'
                    }`}
                  >
                    <div className={`bg-linear-to-br ${design.gradient} rounded-lg p-6 mb-3`}>
                      <design.icon className="h-8 w-8 text-white mx-auto" />
                    </div>
                    <p className="text-sm font-bold text-gray-700 text-center">
                      {design.name}
                    </p>
                    {selectedDesign === design.id && (
                      <div className="absolute -top-2 -right-2 bg-orange-600 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 text-orange-600 mr-3" />
                Recipient Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter recipient's name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Delivery Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for immediate delivery
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a personal message..."
                    rows={4}
                    maxLength={200}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {message.length}/200 characters
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Preview & Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Gift Card Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Preview
              </h3>
              
              <div className={`bg-linear-to-br ${cardDesigns[selectedDesign].gradient} rounded-xl p-6 mb-6 text-white shadow-xl`}>
                <div className="flex items-center justify-between mb-8">
                  <Gift className="h-10 w-10" />
                  <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                    LOCOTRAQ
                  </span>
                </div>
                
                <div className="mb-8">
                  <p className="text-sm opacity-80 mb-1">Gift Card Value</p>
                  <p className="text-4xl font-black">
                    ₹{selectedAmount || '0'}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="opacity-80">To: {recipientName || 'Recipient Name'}</p>
                  <p className="opacity-80">From: {senderName || 'Your Name'}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t-2 border-gray-200 pt-6">
                <h4 className="text-lg font-black text-gray-900 mb-4">Order Summary</h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Gift Card Value</span>
                    <span className="font-bold">₹{getTotalAmount()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Processing Fee</span>
                    <span className="font-bold">₹0</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-xl font-black text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-600">₹{getTotalAmount()}</span>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={loading || !selectedAmount || !recipientEmail || !recipientName || !senderName}
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Package className="h-5 w-5 mr-2" />
                      Purchase Gift Card
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By purchasing, you agree to our terms and conditions
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-black text-gray-900 mb-4">Why Gift Cards?</h4>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">How do I redeem a gift card?</h3>
                <p className="text-gray-600 text-sm">
                  Simply enter the gift card code at checkout. The amount will be automatically applied to your order.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Do gift cards expire?</h3>
                <p className="text-gray-600 text-sm">
                  No! Our gift cards never expire. Use them whenever you're ready.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Can I use multiple gift cards?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can combine multiple gift cards on a single purchase.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">What if I don't use the full amount?</h3>
                <p className="text-gray-600 text-sm">
                  Any unused balance remains on the gift card for future purchases.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}