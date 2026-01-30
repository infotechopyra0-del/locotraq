"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Gift, FileText, AlertTriangle, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
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

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Return & Refund Policy</h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              We want you to be fully satisfied — here’s how returns and refunds work at Locotraq.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid gap-8">

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-heading font-semibold mb-4">Overview</h2>
              <p className="text-secondary font-paragraph text-sm">If a product is defective, damaged in transit, or not as described, you may be eligible for a return or exchange within the specified return window. Please read the details below to confirm eligibility.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-heading font-semibold mb-3">Return Eligibility</h3>
                <ul className="list-disc list-inside text-secondary font-paragraph text-sm space-y-2">
                  <li>Items must be returned within 7 days of delivery unless otherwise stated on the product page.</li>
                  <li>Products must be unused, in original condition, and include all accessories and packaging.</li>
                  <li>Proof of purchase (order number) is required.</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-heading font-semibold mb-3">Non-Returnable Items</h3>
                <p className="text-secondary font-paragraph text-sm">For safety and hygiene reasons, certain items may not be eligible for return. Check the product page for any special return restrictions.</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-2xl font-heading font-semibold mb-4">How to Start a Return</h3>
              <ol className="list-decimal list-inside text-secondary font-paragraph text-sm space-y-2">
                <li>Contact support within the return window via email or phone with your order number and issue details.</li>
                <li>Ship the item back in its original packaging using the carrier instructions we provide.</li>
                <li>Once we receive and verify the item, we will process a refund or exchange.</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h4 className="text-xl font-heading font-semibold mb-3">Refund Timeline</h4>
                <p className="text-secondary font-paragraph text-sm">Refunds are processed within 5–10 business days after we receive the returned item. Timing may vary depending on your bank or payment provider.</p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h4 className="text-xl font-heading font-semibold mb-3">Exchanges</h4>
                <p className="text-secondary font-paragraph text-sm">If you request an exchange, we will guide you through returning the original item and shipping the replacement. Availability may affect timelines.</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-2xl font-heading font-semibold mb-4">Damaged or Missing Items</h3>
              <p className="text-secondary font-paragraph text-sm mb-2">If your order arrives damaged or items are missing, contact us within 48 hours of delivery with photos of the package and items.</p>
              <p className="text-secondary font-paragraph text-sm">We will investigate and offer a replacement or refund once validated.</p>
            </div>

            <div className="bg-card p-6 rounded-lg border text-center">
              <RefreshCw className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h4 className="text-lg font-heading font-semibold mb-2">Return Shipping Costs</h4>
              <p className="text-secondary font-paragraph text-sm">Return shipping costs may apply unless the return is due to a fault on our part (e.g., damaged or incorrect item).</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-2xl font-heading font-semibold mb-4">Contact & Support</h3>
              <p className="text-secondary font-paragraph text-sm mb-4">For returns and refunds, please contact our support team:</p>
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
              <h4 className="text-lg font-heading font-semibold mb-2">Important Notes</h4>
              <p className="text-secondary font-paragraph text-sm">We reserve the right to refuse returns that do not meet our policy requirements. Please retain original packaging until the return is complete.</p>
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
