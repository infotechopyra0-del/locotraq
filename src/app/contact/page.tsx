'use client';

import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Headphones, CheckCircle, Zap, Facebook, Twitter, 
  Instagram, Linkedin, ChevronRight, Award, Shield
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success toast
        toast.success('Message Sent Successfully! 🎉', {
          description: 'Thank you for contacting us. We will get back to you soon!',
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      } else {
        // Error toast
        toast.error('Failed to Send Message', {
          description: data.error || 'Something went wrong. Please try again.',
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error('Connection Error', {
        description: 'Unable to send message. Please check your internet connection.',
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 6390 057 777'],
      description: 'Mon-Sat, 9AM-6PM IST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@locotraq.com'],
      description: '24/7 Support Available'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['AIC BUILDING BHU VARANASI', '221005 UP INDIA'],
      description: 'Visit our office'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
      description: 'Emergency support 24/7'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other', label: 'Other' }
  ];

  const features = [
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    },
    {
      icon: Zap,
      title: 'Quick Response',
      description: 'Response within 2 hours'
    },
    {
      icon: Shield,
      title: 'Secure Communication',
      description: 'Your data is safe with us'
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: '10+ years of experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-orange-600 to-orange-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Have questions? We're here to help! Reach out to our team for any inquiries about GPS tracking solutions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-orange-600 transform hover:-translate-y-1"
              >
                <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-700 font-semibold text-sm">
                    {detail}
                  </p>
                ))}
                <p className="text-xs text-gray-500 mt-2">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                      placeholder="Enter Email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                      placeholder="Enter Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14427.84435326069!2d82.99019007770996!3d25.267138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ddd56!2sAIC%20BHU%2C%20Banaras%20Hindu%20University%2C%20Varanasi%2C%20Uttar%20Pradesh%20221005!5e0!3m2!1sen!2sin!4v1704655890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locotraq Office Location"
                />
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-black text-gray-900 mb-6">
                  Why Choose Us?
                </h3>
                <div className="space-y-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <feature.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, color: 'hover:bg-blue-600', href: '#' },
                    { icon: Twitter, color: 'hover:bg-sky-500', href: '#' },
                    { icon: Instagram, color: 'hover:bg-pink-600', href: '#' },
                    { icon: Linkedin, color: 'hover:bg-blue-700', href: '#' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-gray-100 p-3 rounded-lg ${social.color} hover:text-white transition-all transform hover:scale-110`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our GPS tracking solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                q: 'What is the response time for support?',
                a: 'We typically respond within 2 hours during business hours and provide 24/7 emergency support for critical issues.'
              },
              {
                q: 'Do you offer installation services?',
                a: 'Yes! We provide professional installation services across India with our certified technicians.'
              },
              {
                q: 'What warranty do you provide?',
                a: 'All our GPS devices come with a 2-year manufacturer warranty and lifetime technical support.'
              },
              {
                q: 'Can I track multiple vehicles?',
                a: 'Absolutely! Our fleet management solutions support unlimited vehicle tracking with advanced analytics.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-orange-600 transition-all"
              >
                <h4 className="font-bold text-gray-900 mb-2 flex items-start">
                  <MessageCircle className="w-5 h-5 text-orange-600 mr-2 shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-gray-600 text-sm ml-7">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700"
            >
              View All FAQs
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join 10,000+ satisfied customers and experience the power of advanced GPS tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-orange-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105"
            >
              Browse Products
            </Link>
            <a
              href="tel:+916390057777"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}