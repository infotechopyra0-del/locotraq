"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Phone, Mail, MapPin, Clock, FileText, HelpCircle, Bug, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SupportPage() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      availability: "Mon-Fri 9 AM - 6 PM IST",
      color: "bg-blue-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      action: "+91 6390 057 777",
      availability: "Mon-Fri 9 AM - 6 PM IST",
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "support@locotraq.com",
      availability: "24/7 - Response within 24 hours",
      color: "bg-purple-500"
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
              Support Center
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              We're here to help! Get assistance with your GPS tracking devices and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-2xl mx-auto">
              Choose the best way to reach our support team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                      {option.title}
                    </h3>
                    <p className="font-paragraph text-secondary mb-4">
                      {option.description}
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full">
                        {option.action}
                      </Button>
                      <div className="flex items-center justify-center text-sm text-secondary font-paragraph">
                        <Clock className="h-4 w-4 mr-2" />
                        {option.availability}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card p-8 rounded-lg border text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-heading font-semibold text-foreground">Our Office</h3>
            </div>
            <p className="font-paragraph text-secondary mb-2">
              AIC BUILDING BHU VARANASI
            </p>
            <p className="font-paragraph text-secondary">
              221005 UP INDIA
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-card">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-2xl mx-auto">
              Choose your support category for faster assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 rounded-lg border hover:border-primary transition-colors cursor-pointer"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="font-paragraph text-secondary text-sm mb-4">
                    {category.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-paragraph text-secondary font-medium mb-2">Common topics:</p>
                  {category.examples.map((example, i) => (
                    <div key={i} className="text-xs font-paragraph text-secondary bg-background/50 px-2 py-1 rounded">
                      • {example}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-2xl mx-auto">
              Quick answers to common questions about our GPS tracking services
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg border"
              >
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  {item.question}
                </h3>
                <p className="font-paragraph text-secondary">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="font-paragraph text-secondary mb-4">
              Can't find what you're looking for?
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Our Support Team
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-card">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">
              Additional Resources
            </h2>
            <p className="text-lg font-paragraph text-secondary">
              Explore more ways to get help and stay informed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  User Manual
                </h3>
                <p className="font-paragraph text-secondary mb-4 text-sm">
                  Comprehensive guides for all our GPS tracking devices
                </p>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  Community Forum
                </h3>
                <p className="font-paragraph text-secondary mb-4 text-sm">
                  Connect with other users and share experiences
                </p>
                <Button variant="outline" size="sm">
                  Join Forum
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  Video Tutorials
                </h3>
                <p className="font-paragraph text-secondary mb-4 text-sm">
                  Step-by-step video guides for setup and troubleshooting
                </p>
                <Button variant="outline" size="sm">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}