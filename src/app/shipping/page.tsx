"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Truck, Clock, MapPin, Shield, Phone, Mail, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link href="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Shipping & Delivery</h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Fast, reliable shipping across India. Read about our delivery windows, costs, and tracking options.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid gap-8">

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border flex flex-col">
                <div className="flex items-center mb-4">
                  <Truck className="w-6 h-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-heading font-semibold">Shipping Methods</h3>
                </div>
                <p className="text-secondary font-paragraph text-sm">
                  We offer standard and express shipping. Standard delivery typically takes 3–7 business days within metro areas. Express delivery options are available at checkout for faster delivery.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border flex flex-col">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-heading font-semibold">Delivery Timeframes</h3>
                </div>
                <p className="text-secondary font-paragraph text-sm">
                  Delivery estimates depend on your location and product availability. Orders placed before 2 PM on business days are processed same day when items are in stock.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border flex flex-col">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-heading font-semibold">Tracking & Notifications</h3>
                </div>
                <p className="text-secondary font-paragraph text-sm">
                  After dispatch, you will receive tracking details by email/SMS. Use the tracking link to view live status and estimated delivery time.
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-2xl font-heading font-semibold mb-4">Shipping Costs</h3>
              <p className="text-secondary font-paragraph mb-4">
                Shipping fees are calculated at checkout based on product weight, dimensions, and destination. We offer free shipping for orders above ₹10,000 to most metro locations.
              </p>
              <ul className="list-disc list-inside text-secondary font-paragraph text-sm space-y-2">
                <li>Standard Shipping: Calculated at checkout</li>
                <li>Express Shipping: Additional charges apply</li>
                <li>Free Shipping: Available for eligible orders (see product page for eligibility)</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h4 className="text-xl font-heading font-semibold mb-3">International Shipping</h4>
                <p className="text-secondary font-paragraph text-sm">Currently, we primarily ship within India. For international orders, please contact our sales team for a custom quote and lead times.</p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h4 className="text-xl font-heading font-semibold mb-3">Damages & Missing Items</h4>
                <p className="text-secondary font-paragraph text-sm mb-2">If your order arrives damaged or items are missing, please notify us within 48 hours of delivery.</p>
                <p className="text-secondary font-paragraph text-sm">Include photos of the packaging and damaged items. We'll initiate a replacement or refund after validation.</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-2xl font-heading font-semibold mb-4">Contact & Support</h3>
              <p className="text-secondary font-paragraph text-sm mb-4">For shipping inquiries, reach out to our support team:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-sm text-secondary">+91 12345 67890</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-secondary">support@locotraq.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border text-center">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h4 className="text-lg font-heading font-semibold mb-2">Important</h4>
              <p className="text-secondary font-paragraph text-sm">Delivery times may be impacted by factors outside our control including weather, carrier delays, and customs processes for international shipments.</p>
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
