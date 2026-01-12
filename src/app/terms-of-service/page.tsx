"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, Shield, AlertTriangle, Users, Gavel } from 'lucide-react';
import Navbar from '@/components/Header';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />
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
              Terms of Service
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our GPS tracking services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Last Updated */}
            <div className="bg-card p-6 rounded-lg border mb-8">
              <p className="text-sm text-secondary font-paragraph mb-0">
                <strong>Last Updated:</strong> October 24, 2025
              </p>
            </div>

            {/* Agreement */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center">
                <FileText className="h-6 w-6 text-primary mr-3" />
                Agreement to Terms
              </h2>
              <p className="text-secondary font-paragraph text-base leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of Locotraq's website and GPS tracking services ("Services") operated by Locotraq ("we," "us," or "our").
              </p>
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <p className="text-red-800 font-paragraph text-sm mb-0">
                  <strong>Important:</strong> By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Services.
                </p>
              </div>
            </div>

            {/* Services Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Our Services</h2>
              <p className="text-secondary font-paragraph mb-6">
                Locotraq provides GPS tracking solutions including but not limited to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Hardware Products</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>GPS tracking devices for vehicles</li>
                    <li>Asset tracking solutions</li>
                    <li>Personal GPS trackers</li>
                    <li>Fleet management hardware</li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Software Services</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>Real-time tracking platforms</li>
                    <li>Mobile applications</li>
                    <li>Data analytics and reporting</li>
                    <li>Customer support services</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Accounts */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center">
                <Users className="h-6 w-6 text-primary mr-3" />
                User Accounts and Responsibilities
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-heading font-medium text-foreground mb-3">Account Creation</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph">
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for safeguarding your account credentials</li>
                    <li>You must notify us immediately of any unauthorized access</li>
                    <li>One person or legal entity may maintain only one account</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-heading font-medium text-foreground mb-3">Acceptable Use</h3>
                  <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                    <p className="text-yellow-800 font-paragraph text-sm mb-3">
                      <strong>You agree NOT to use our Services for:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-yellow-800 font-paragraph text-sm">
                      <li>Any unlawful purpose or to solicit unlawful activity</li>
                      <li>Tracking individuals without their knowledge or consent</li>
                      <li>Violating any international, federal, provincial, or state regulations or laws</li>
                      <li>Harassment, abuse, or harm of another person</li>
                      <li>Transmitting viruses or malicious code</li>
                      <li>Collecting or tracking personal information of others</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy and Data */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center">
                <Shield className="h-6 w-6 text-primary mr-3" />
                Privacy and Data Protection
              </h2>
              
              <div className="space-y-4">
                <p className="text-secondary font-paragraph">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <h4 className="font-heading font-medium text-blue-900 mb-3">Data Ownership and Usage</h4>
                  <ul className="list-disc list-inside space-y-2 text-blue-800 font-paragraph text-sm">
                    <li>You retain ownership of data generated by your devices</li>
                    <li>We may use aggregated, anonymized data for service improvement</li>
                    <li>Location data is stored securely and accessed only as necessary</li>
                    <li>You can request data deletion subject to legal requirements</li>
                  </ul>
                </div>
                
                <p className="text-secondary font-paragraph">
                  <Link href="/privacy-policy" className="text-primary hover:underline">
                    View our complete Privacy Policy →
                  </Link>
                </p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Payment and Billing</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Pricing and Fees</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>All prices are listed in Indian Rupees (INR)</li>
                    <li>Subscription fees are billed in advance</li>
                    <li>Hardware purchases are one-time charges</li>
                    <li>Additional services may incur extra charges</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Payment Processing</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>Payments are processed securely through third parties</li>
                    <li>Failed payments may result in service suspension</li>
                    <li>Refunds are subject to our refund policy</li>
                    <li>You authorize automatic recurring billing for subscriptions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service Availability */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Service Availability</h2>
              
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mb-6">
                <h4 className="font-heading font-medium text-orange-900 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Service Limitations
                </h4>
                <p className="text-orange-800 font-paragraph text-sm">
                  While we strive for 100% uptime, GPS tracking services may be affected by factors beyond our control including but not limited to cellular network coverage, satellite availability, weather conditions, and device battery life.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-2">Service Level Expectations</h4>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>We aim for 99.5% platform availability during business hours</li>
                    <li>Planned maintenance will be announced in advance</li>
                    <li>Emergency maintenance may occur without notice</li>
                    <li>Service credits may be provided for extended outages</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center">
                <Gavel className="h-6 w-6 text-primary mr-3" />
                Limitation of Liability
              </h2>
              
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
                <p className="text-red-800 font-paragraph text-sm mb-0">
                  <strong>IMPORTANT DISCLAIMER:</strong> IN NO EVENT SHALL LOCOTRAQ BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-secondary font-paragraph text-sm">
                  Our total liability to you for any claim arising out of or relating to these Terms or our Services shall not exceed the amount you paid us for the Services in the twelve (12) months preceding the claim.
                </p>
                
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-2">Indemnification</h4>
                  <p className="text-secondary font-paragraph text-sm">
                    You agree to indemnify and hold harmless Locotraq from any claims, damages, or expenses arising from your use of our Services or violation of these Terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Termination</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">By You</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>Cancel your account at any time through your dashboard</li>
                    <li>Data will be retained for 30 days after cancellation</li>
                    <li>No refunds for partial subscription periods</li>
                    <li>Hardware purchases are non-refundable after 30 days</li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">By Us</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>We may suspend or terminate accounts for Terms violations</li>
                    <li>Non-payment may result in service suspension</li>
                    <li>We will provide reasonable notice when possible</li>
                    <li>Immediate termination for illegal activities</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Governing Law</h2>
              <p className="text-secondary font-paragraph mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              <p className="text-secondary font-paragraph">
                Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Varanasi, Uttar Pradesh, India.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Contact Information</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-secondary font-paragraph mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-secondary font-paragraph">
                  <p><strong>Email:</strong> support@locotraq.com</p>
                  <p><strong>Phone:</strong> +91 6390 057 777</p>
                  <p><strong>Address:</strong> AIC BUILDING BHU VARANASI, 221005 UP INDIA</p>
                </div>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-heading font-medium text-blue-900 mb-3">Changes to These Terms</h3>
              <p className="text-blue-800 font-paragraph text-sm mb-0">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}