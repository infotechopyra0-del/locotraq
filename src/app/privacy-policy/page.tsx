"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, Bell } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center">
                <Shield className="h-6 w-6 text-primary mr-3" />
                Introduction
              </h2>
              <p className="text-secondary font-paragraph text-base leading-relaxed mb-4">
                Locotraq ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our GPS tracking services.
              </p>
              <p className="text-secondary font-paragraph text-base leading-relaxed">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center">
                <Database className="h-6 w-6 text-primary mr-3" />
                Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-heading font-medium text-foreground mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>Account credentials and preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-heading font-medium text-foreground mb-3">Device Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph">
                    <li>GPS location data from tracking devices</li>
                    <li>Device identifiers and technical specifications</li>
                    <li>Usage patterns and performance metrics</li>
                    <li>Battery status and connectivity information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-heading font-medium text-foreground mb-3">Website Usage Data</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph">
                    <li>IP address and browser information</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Referring websites and search terms</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center">
                <Eye className="h-6 w-6 text-primary mr-3" />
                How We Use Your Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Service Provision</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>Provide GPS tracking services</li>
                    <li>Process orders and payments</li>
                    <li>Customer support and communication</li>
                    <li>Account management and authentication</li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Service Improvement</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>Analyze usage patterns and trends</li>
                    <li>Develop new features and services</li>
                    <li>Improve system performance and reliability</li>
                    <li>Conduct research and analytics</li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Communication</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>Send service updates and notifications</li>
                    <li>Respond to inquiries and support requests</li>
                    <li>Marketing and promotional communications</li>
                    <li>Important security and policy updates</li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-3">Legal Compliance</h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm">
                    <li>Comply with applicable laws and regulations</li>
                    <li>Respond to legal requests and court orders</li>
                    <li>Protect our rights and property</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Information Sharing and Disclosure</h2>
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mb-6">
                <p className="text-orange-800 font-paragraph text-sm mb-0">
                  <strong>Important:</strong> We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                </p>
              </div>
              
              <p className="text-secondary font-paragraph mb-4">We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph">
                <li><strong>Service Providers:</strong> Third-party vendors who assist with payment processing, data hosting, and technical support</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government investigation</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Consent:</strong> When you have given explicit consent for specific sharing purposes</li>
                <li><strong>Emergency Situations:</strong> To protect the safety and rights of individuals or our company</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Data Security</h2>
              <p className="text-secondary font-paragraph mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-heading font-medium text-foreground mb-2">Encryption</h4>
                  <p className="text-secondary font-paragraph text-sm">SSL/TLS encryption for data transmission</p>
                </div>
                <div className="bg-card p-4 rounded-lg border text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-heading font-medium text-foreground mb-2">Secure Storage</h4>
                  <p className="text-secondary font-paragraph text-sm">Protected servers and access controls</p>
                </div>
                <div className="bg-card p-4 rounded-lg border text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-heading font-medium text-foreground mb-2">Monitoring</h4>
                  <p className="text-secondary font-paragraph text-sm">Continuous security monitoring and updates</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Your Rights and Choices</h2>
              <p className="text-secondary font-paragraph mb-4">You have the following rights regarding your personal information:</p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground mb-1">Access and Portability</h4>
                    <p className="text-secondary font-paragraph text-sm">Request a copy of your personal information and data portability</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground mb-1">Correction and Updates</h4>
                    <p className="text-secondary font-paragraph text-sm">Update or correct inaccurate personal information</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground mb-1">Deletion and Erasure</h4>
                    <p className="text-secondary font-paragraph text-sm">Request deletion of your personal information (subject to legal requirements)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground mb-1">Marketing Opt-out</h4>
                    <p className="text-secondary font-paragraph text-sm">Unsubscribe from marketing communications at any time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Contact Us</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-secondary font-paragraph mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-2 text-secondary font-paragraph">
                  <p><strong>Email:</strong> support@locotraq.com</p>
                  <p><strong>Phone:</strong> +91 6390 057 777</p>
                  <p><strong>Address:</strong> AIC BUILDING BHU VARANASI, 221005 UP INDIA</p>
                </div>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-heading font-medium text-blue-900 mb-3">Changes to This Privacy Policy</h3>
              <p className="text-blue-800 font-paragraph text-sm mb-0">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any modifications indicates your acceptance of the updated Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}