"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Phone, Mail, MapPin, Clock, FileText, HelpCircle, Bug, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Header';

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      availability: "Mon-Fri 9 AM - 6 PM IST",
      color: "bg-blue-500",
      link: "#"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      action: "+91 6390 057 777",
      availability: "Mon-Fri 9 AM - 6 PM IST",
      color: "bg-green-500",
      link: "tel:+916390057777"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "support@locotraq.com",
      availability: "24/7 - Response within 24 hours",
      color: "bg-purple-500",
      link: "mailto:support@locotraq.com"
    }
  ];

  const supportCategories = [
    {
      icon: HelpCircle,
      title: "General Questions",
      description: "Product information, pricing, and general inquiries",
      examples: ["How does GPS tracking work?", "What's included in my plan?", "Device compatibility"]
    },
    {
      icon: Bug,
      title: "Technical Issues",
      description: "Device problems, app issues, and troubleshooting",
      examples: ["Device not connecting", "App crashes", "Location not updating"]
    },
    {
      icon: FileText,
      title: "Account & Billing",
      description: "Account management, billing questions, and subscriptions",
      examples: ["Password reset", "Invoice questions", "Plan changes"]
    },
    {
      icon: Lightbulb,
      title: "Feature Requests",
      description: "Suggest new features or improvements",
      examples: ["New tracking features", "Mobile app improvements", "Integration requests"]
    }
  ];

  const faqItems = [
    {
      question: "How accurate is the GPS tracking?",
      answer: "Our GPS trackers typically provide accuracy within 3-5 meters under normal conditions. Accuracy may vary based on satellite visibility, weather conditions, and urban environments."
    },
    {
      question: "How long does the battery last?",
      answer: "Battery life varies by device model and usage. Most devices last 5-15 days on a single charge with normal tracking intervals. Real-time tracking will consume more battery."
    },
    {
      question: "Can I track multiple vehicles with one account?",
      answer: "Yes! Our plans support multiple devices. You can manage and track all your vehicles, assets, or family members from a single dashboard."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we offer mobile apps for both iOS and Android devices. You can track your devices, receive alerts, and manage settings from anywhere."
    },
    {
      question: "What happens if my device stops working?",
      answer: "All our devices come with a 1-year warranty. If your device malfunctions within the warranty period, we'll repair or replace it free of charge."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time through your account dashboard. Your service will continue until the end of your current billing cycle."
    }
  ];

  const additionalResources = [
    {
      icon: FileText,
      title: "User Manual",
      description: "Comprehensive guides for all our GPS tracking devices",
      action: "Download PDF",
      color: "text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      action: "Join Forum",
      color: "text-green-600"
    },
    {
      icon: Lightbulb,
      title: "Video Tutorials",
      description: "Step-by-step video guides for setup and troubleshooting",
      action: "Watch Videos",
      color: "text-purple-600"
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
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
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Support Center
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              We're here to help! Get assistance with your GPS tracking devices and services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the best way to reach our support team
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 h-full">
                <div className="text-center">
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {option.description}
                  </p>
                  <a 
                    href={option.link}
                    className="block w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors mb-3"
                  >
                    {option.action}
                  </a>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {option.availability}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Office Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-orange-200"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
          <p className="text-gray-600 font-semibold mb-1">
            AIC BUILDING BHU VARANASI
          </p>
          <p className="text-gray-600">
            221005 UP INDIA
          </p>
        </motion.div>
      </div>

      {/* Support Categories */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your support category for faster assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 transition-all cursor-pointer"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <category.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-700 font-bold mb-2">Common topics:</p>
                  {category.examples.map((example, i) => (
                    <div key={i} className="text-xs text-gray-600 bg-white px-3 py-2 rounded-lg">
                      • {example}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our GPS tracking services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-orange-600 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4 font-semibold">
              Can't find what you're looking for?
            </p>
            <Link
              href="/contact"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105"
            >
              Contact Our Support Team
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-gray-600">
              Explore more ways to get help and stay informed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all border-2 border-gray-200 hover:border-orange-500"
              >
                <div className="bg-white p-4 rounded-full inline-block mb-4">
                  <resource.icon className={`h-12 w-12 ${resource.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {resource.description}
                </p>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors w-full">
                  {resource.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}