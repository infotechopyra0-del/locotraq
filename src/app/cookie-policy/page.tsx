"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Cookie, Shield, Settings, Eye, Database, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description: "Required for basic website functionality",
      purpose: "Authentication, security, and core features",
      retention: "Session or until you log out",
      canDisable: false
    },
    {
      icon: Eye,
      title: "Analytics Cookies",
      description: "Help us understand how visitors use our website",
      purpose: "Website performance analysis and improvement",
      retention: "Up to 2 years",
      canDisable: true
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "Remember your preferences and settings",
      purpose: "Language preferences, theme settings, user preferences",
      retention: "Up to 1 year",
      canDisable: true
    },
    {
      icon: Bell,
      title: "Marketing Cookies",
      description: "Used to deliver relevant advertisements",
      purpose: "Personalized marketing and ad targeting",
      retention: "Up to 1 year",
      canDisable: true
    }
  ];

  const specificCookies = [
    {
      name: "locotraq_session",
      purpose: "Maintains your login session",
      type: "Essential",
      duration: "Session",
      domain: "locotraq.com"
    },
    {
      name: "_ga",
      purpose: "Google Analytics - distinguishes users",
      type: "Analytics", 
      duration: "2 years",
      domain: ".locotraq.com"
    },
    {
      name: "_gid",
      purpose: "Google Analytics - distinguishes users",
      type: "Analytics",
      duration: "24 hours", 
      domain: ".locotraq.com"
    },
    {
      name: "locotraq_preferences",
      purpose: "Stores your site preferences",
      type: "Functional",
      duration: "1 year",
      domain: "locotraq.com"
    },
    {
      name: "_fbp",
      purpose: "Facebook tracking pixel",
      type: "Marketing",
      duration: "90 days",
      domain: ".locotraq.com"
    }
  ];

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
              Cookie Policy
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Learn how we use cookies and similar technologies to improve your experience on our website.
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
                <Cookie className="h-6 w-6 text-primary mr-3" />
                What Are Cookies?
              </h2>
              <p className="text-secondary font-paragraph text-base leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
              <p className="text-secondary font-paragraph text-base leading-relaxed mb-4">
                This Cookie Policy explains what cookies are, how we use them on the Locotraq website, what types of cookies we use, and how you can manage your cookie preferences.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <p className="text-blue-800 font-paragraph text-sm mb-0">
                  <strong>Note:</strong> By continuing to use our website, you consent to our use of cookies as described in this policy.
                </p>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-8">
                Types of Cookies We Use
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {cookieTypes.map((cookie, index) => (
                  <motion.div
                    key={cookie.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                            <cookie.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                              {cookie.title}
                            </h3>
                            <p className="font-paragraph text-secondary text-sm mb-3">
                              {cookie.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-foreground">Purpose:</span>
                            <span className="text-secondary font-paragraph ml-2">{cookie.purpose}</span>
                          </div>
                          <div>
                            <span className="font-medium text-foreground">Retention:</span>
                            <span className="text-secondary font-paragraph ml-2">{cookie.retention}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium text-foreground">Can be disabled:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                              cookie.canDisable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {cookie.canDisable ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Specific Cookies Table */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                Specific Cookies We Use
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-card">
                      <th className="border border-gray-200 p-4 text-left font-heading font-semibold text-foreground">Cookie Name</th>
                      <th className="border border-gray-200 p-4 text-left font-heading font-semibold text-foreground">Purpose</th>
                      <th className="border border-gray-200 p-4 text-left font-heading font-semibold text-foreground">Type</th>
                      <th className="border border-gray-200 p-4 text-left font-heading font-semibold text-foreground">Duration</th>
                      <th className="border border-gray-200 p-4 text-left font-heading font-semibold text-foreground">Domain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specificCookies.map((cookie, index) => (
                      <tr key={cookie.name} className={index % 2 === 0 ? 'bg-background' : 'bg-card'}>
                        <td className="border border-gray-200 p-4 font-mono text-sm text-foreground">{cookie.name}</td>
                        <td className="border border-gray-200 p-4 font-paragraph text-sm text-secondary">{cookie.purpose}</td>
                        <td className="border border-gray-200 p-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cookie.type === 'Essential' ? 'bg-red-100 text-red-800' :
                            cookie.type === 'Analytics' ? 'bg-blue-100 text-blue-800' :
                            cookie.type === 'Functional' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {cookie.type}
                          </span>
                        </td>
                        <td className="border border-gray-200 p-4 font-paragraph text-sm text-secondary">{cookie.duration}</td>
                        <td className="border border-gray-200 p-4 font-mono text-sm text-secondary">{cookie.domain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                Third-Party Services
              </h2>
              
              <p className="text-secondary font-paragraph mb-6">
                We use several third-party services that may set their own cookies:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Google Analytics</h3>
                    <p className="font-paragraph text-secondary text-sm mb-3">
                      Helps us understand website usage and improve user experience.
                    </p>
                    <Link 
                      href="https://policies.google.com/privacy" 
                      target="_blank"
                      className="text-primary hover:underline text-sm"
                    >
                      Google Privacy Policy →
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Facebook Pixel</h3>
                    <p className="font-paragraph text-secondary text-sm mb-3">
                      Tracks conversions and helps us deliver relevant advertisements.
                    </p>
                    <Link 
                      href="https://www.facebook.com/privacy/explanation" 
                      target="_blank"
                      className="text-primary hover:underline text-sm"
                    >
                      Facebook Privacy Policy →
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Payment Processors</h3>
                    <p className="font-paragraph text-secondary text-sm mb-3">
                      Secure payment processing may set cookies for fraud prevention.
                    </p>
                    <p className="text-sm text-secondary">
                      Varies by payment method
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                Managing Your Cookie Preferences
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-heading font-medium text-foreground mb-3">Browser Settings</h3>
                  <p className="text-secondary font-paragraph mb-4">
                    You can control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-secondary font-paragraph text-sm ml-4">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete cookies individually or all at once</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block third-party cookies</li>
                    <li>Set cookies to be deleted when you close your browser</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h4 className="font-heading font-medium text-yellow-900 mb-3">⚠️ Important Note</h4>
                  <p className="text-yellow-800 font-paragraph text-sm">
                    Disabling certain cookies may affect the functionality of our website. Essential cookies are required for core features like user authentication and security.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-heading font-medium text-foreground mb-3">Cookie Consent Manager</h3>
                  <p className="text-secondary font-paragraph mb-4">
                    You can also manage your cookie preferences using our cookie consent tool.
                  </p>
                  <Button variant="outline">
                    Manage Cookie Preferences
                  </Button>
                </div>
              </div>
            </div>

            {/* Browser-Specific Instructions */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                Browser-Specific Instructions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Chrome</h3>
                    <ol className="list-decimal list-inside space-y-1 text-secondary font-paragraph text-sm">
                      <li>Click the three-dot menu</li>
                      <li>Go to Settings → Privacy and security</li>
                      <li>Click "Cookies and other site data"</li>
                      <li>Choose your preferred settings</li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Firefox</h3>
                    <ol className="list-decimal list-inside space-y-1 text-secondary font-paragraph text-sm">
                      <li>Click the menu button</li>
                      <li>Go to Settings → Privacy & Security</li>
                      <li>Find "Cookies and Site Data"</li>
                      <li>Adjust your preferences</li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Safari</h3>
                    <ol className="list-decimal list-inside space-y-1 text-secondary font-paragraph text-sm">
                      <li>Go to Safari → Preferences</li>
                      <li>Click the Privacy tab</li>
                      <li>Choose "Block all cookies" or customize</li>
                      <li>Close preferences to save</li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Edge</h3>
                    <ol className="list-decimal list-inside space-y-1 text-secondary font-paragraph text-sm">
                      <li>Click the three-dot menu</li>
                      <li>Go to Settings → Cookies and site permissions</li>
                      <li>Click "Cookies and site data"</li>
                      <li>Configure your settings</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Contact Us</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-secondary font-paragraph mb-4">
                  If you have questions about this Cookie Policy or our use of cookies, please contact us:
                </p>
                <div className="space-y-2 text-secondary font-paragraph">
                  <p><strong>Email:</strong> support@locotraq.com</p>
                  <p><strong>Phone:</strong> +91 6390 057 777</p>
                  <p><strong>Address:</strong> AIC BUILDING BHU VARANASI, 221005 UP INDIA</p>
                </div>
              </div>
            </div>

            {/* Updates Notice */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-heading font-medium text-blue-900 mb-3">Updates to This Policy</h3>
              <p className="text-blue-800 font-paragraph text-sm mb-0">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}