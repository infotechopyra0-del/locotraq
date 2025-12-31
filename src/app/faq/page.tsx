"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Search, ChevronDown, ChevronUp, MapPin, Battery, Smartphone, Shield, CreditCard, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: HelpCircle,
      title: "Getting Started",
      color: "bg-blue-500"
    },
    {
      icon: MapPin,
      title: "GPS Tracking",
      color: "bg-green-500"
    },
    {
      icon: Battery,
      title: "Device Support",
      color: "bg-orange-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      color: "bg-purple-500"
    },
    {
      icon: CreditCard,
      title: "Billing & Plans",
      color: "bg-red-500"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      color: "bg-gray-500"
    }
  ];

  const allFAQs = [
    {
      category: "Getting Started",
      question: "How do I get started with Locotraq GPS tracking?",
      answer: "Getting started is easy! First, choose the right GPS tracker for your needs from our products page. Once you receive your device, download our mobile app, create an account, and follow the setup wizard. The device comes with a quick start guide, and our support team is available to help you through the process."
    },
    {
      category: "Getting Started", 
      question: "Do I need any special technical knowledge to use Locotraq?",
      answer: "Not at all! Our GPS tracking system is designed to be user-friendly. The setup process is straightforward, and our mobile app has an intuitive interface. We also provide comprehensive tutorials and 24/7 customer support to help you get the most out of your tracking system."
    },
    {
      category: "Getting Started",
      question: "What's included in the package when I order a GPS tracker?",
      answer: "Each GPS tracker package includes the tracking device, charging cable, mounting accessories (varies by model), SIM card (where applicable), quick start guide, and access to our mobile app and web platform. Some packages may include additional accessories specific to the tracker model."
    },
    {
      category: "GPS Tracking",
      question: "How accurate is the GPS tracking?",
      answer: "Our GPS trackers typically provide accuracy within 3-5 meters under normal conditions with clear satellite visibility. Accuracy may vary based on factors like weather conditions, urban environments with tall buildings, tunnels, or underground areas. Indoor tracking may have reduced accuracy."
    },
    {
      category: "GPS Tracking",
      question: "How often does the device update location?",
      answer: "Location update frequency depends on your settings and plan. Most devices can update every 10 seconds to 30 minutes. Real-time tracking provides updates every 10-30 seconds, while standard tracking typically updates every 1-5 minutes. You can customize the update interval through the app based on your needs and battery life preferences."
    },
    {
      category: "GPS Tracking",
      question: "Can I track my device in real-time?",
      answer: "Yes! Our platform supports real-time tracking for all our GPS devices. You can see live location updates on your phone, tablet, or computer. Real-time tracking is perfect for fleet management, family safety, or monitoring valuable assets."
    },
    {
      category: "GPS Tracking",
      question: "Does GPS tracking work internationally?",
      answer: "Many of our GPS trackers work internationally, but coverage depends on the specific device and cellular network availability. Global trackers work in 100+ countries, while some models are designed for specific regions. Check the product specifications or contact our support team to confirm international coverage for your specific needs."
    },
    {
      category: "Device Support",
      question: "How long does the battery last?",
      answer: "Battery life varies by device model and usage patterns. Most devices last 5-15 days on a single charge with standard tracking intervals. Real-time tracking will consume more battery (1-3 days), while eco-mode can extend battery life to several weeks. Battery life also depends on network signal strength and GPS acquisition frequency."
    },
    {
      category: "Device Support",
      question: "How do I charge my GPS tracker?",
      answer: "Most GPS trackers come with a USB charging cable. Simply connect the device to the charging cable and plug it into any USB power source (computer, wall adapter, car charger). Charging typically takes 2-4 hours for a full charge. Some devices have indicator lights to show charging status."
    },
    {
      category: "Device Support",
      question: "What should I do if my device isn't working properly?",
      answer: "First, try these troubleshooting steps: 1) Ensure the device is charged, 2) Check if it's in an area with good cellular and GPS signal, 3) Restart the device, 4) Check your app settings. If the problem persists, contact our technical support team with your device model and description of the issue."
    },
    {
      category: "Device Support",
      question: "Is my GPS tracker waterproof?",
      answer: "Most of our GPS trackers have some level of water resistance, typically IP65 or IP67 rating, which protects against rain, splashes, and dust. However, they are not designed for complete submersion. Check your specific device specifications for exact water resistance ratings. For marine or underwater applications, we offer specialized waterproof models."
    },
    {
      category: "Mobile Apps",
      question: "Is there a mobile app available?",
      answer: "Yes! We offer mobile apps for both iOS and Android devices. The app allows you to track your devices, set up geofences, receive alerts, view location history, and manage your account settings. You can download the app from the App Store or Google Play Store by searching for 'Locotraq'."
    },
    {
      category: "Mobile Apps",
      question: "Can multiple people track the same device?",
      answer: "Yes, you can share access to a GPS tracker with family members or team members. The account owner can invite others via email and set permission levels (view-only, basic control, or full access). This is perfect for families sharing a car tracker or businesses managing fleet vehicles with multiple operators."
    },
    {
      category: "Mobile Apps",
      question: "Do I need internet connection to use the app?",
      answer: "Yes, you need an internet connection (WiFi or cellular data) to receive real-time updates and use most app features. However, the app can cache recent location data for viewing when offline. The GPS tracker itself uses cellular networks to transmit location data to our servers."
    },
    {
      category: "Mobile Apps",
      question: "Can I set up alerts and notifications?",
      answer: "Absolutely! Our app supports various types of alerts including: geofence alerts (when device enters/exits an area), speed alerts, low battery warnings, device offline notifications, and movement alerts. You can customize which alerts you receive and how you receive them (push notification, email, or SMS)."
    },
    {
      category: "Billing & Plans",
      question: "What are the monthly fees for GPS tracking service?",
      answer: "Our service plans start from ₹299/month for basic tracking. Pricing varies based on features, update frequency, data allowance, and number of devices. We offer plans for personal use, small businesses, and large fleets. Check our pricing page for current rates, or contact our sales team for custom enterprise pricing."
    },
    {
      category: "Billing & Plans",
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time through your account dashboard or by contacting customer support. There are no cancellation fees, and your service will continue until the end of your current billing cycle. You can also pause your service temporarily if needed."
    },
    {
      category: "Billing & Plans",
      question: "Do you offer family or multi-device discounts?",
      answer: "Yes! We offer discounts for multiple devices on the same account. Family plans start with 2+ devices, and business plans offer significant savings for 5+ devices. Contact our sales team for specific pricing on multi-device plans, or check our pricing page for current discount tiers."
    },
    {
      category: "Billing & Plans",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI payments, net banking, and digital wallets like Paytm and PhonePe. For business accounts, we also accept bank transfers and can set up monthly invoicing. All payments are processed securely through encrypted payment gateways."
    },
    {
      category: "Privacy & Security",
      question: "How secure is my location data?",
      answer: "We take data security very seriously. All location data is encrypted during transmission and storage. We use bank-grade SSL encryption, secure servers, and regular security audits. Your data is never sold to third parties, and you maintain full control over who can access your tracking information."
    },
    {
      category: "Privacy & Security",
      question: "Who can see my tracking data?",
      answer: "Only you and people you explicitly authorize can see your tracking data. As the account owner, you control all access permissions. We do not share your personal location data with anyone without your consent, except as required by law or to provide the service you've requested."
    },
    {
      category: "Privacy & Security",
      question: "How long do you keep my location history?",
      answer: "We store location history for 365 days by default, but you can request longer retention or early deletion. You can also export your data at any time. When you cancel your account, we will delete your personal data within 30 days, unless required to retain it for legal or safety reasons."
    },
    {
      category: "Privacy & Security",
      question: "Can I delete my tracking history?",
      answer: "Yes, you can delete your location history at any time through your account dashboard. You can delete specific date ranges, entire trips, or all historical data. Once deleted, this data cannot be recovered, so please make sure you want to permanently remove it before confirming deletion."
    }
  ];

  const filteredFAQs = allFAQs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Find answers to common questions about our GPS tracking devices and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary h-5 w-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
              />
            </div>
            {searchTerm && (
              <p className="mt-4 text-sm text-secondary font-paragraph">
                Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchTerm}"
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      {!searchTerm && (
        <section className="py-8 bg-card">
          <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                Browse by Category
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {faqCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer hover:scale-105 transition-transform`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-sm font-heading font-medium text-foreground">
                    {category.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 text-left hover:bg-card/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mr-3">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-heading font-semibold text-foreground pr-4">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="shrink-0">
                          {openItems.includes(index) ? (
                            <ChevronUp className="h-5 w-5 text-secondary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-secondary" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {openItems.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="border-t pt-4">
                          <p className="font-paragraph text-secondary leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="font-paragraph text-secondary mb-6">
                We couldn't find any FAQs matching your search. Try different keywords or browse our categories.
              </p>
              <Button onClick={() => setSearchTerm('')} variant="outline">
                Clear Search
              </Button>
            </motion.div>
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  Still have questions?
                </h3>
                <p className="font-paragraph text-secondary mb-6">
                  Can't find the answer you're looking for? Our support team is ready to help you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/support">
                      Contact Support
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}