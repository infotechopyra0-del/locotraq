'use client';

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Sending....");
    
    const form = e.target as HTMLFormElement;
    const formDataWeb3 = new FormData(form);
    formDataWeb3.append("access_key", "1c32a200-cb16-4db7-a524-a74052927e6a");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataWeb3
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
        form.reset();
      } else {
        setResult("Error submitting form. Please try again.");
      }
    } catch (error) {
      setResult("Error submitting form. Please try again.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 6390 057 777"],
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@locotraq.com"],
      description: "Send us an email anytime"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["AIC BUILDING BHU VARANASI", "221005 UP INDIA"],
      description: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
      description: "Pacific Standard Time"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Get in touch with our team for support, sales inquiries, or any questions about our GPS tracking solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden fields for Web3 Forms */}
                    <input type="hidden" name="subject" value="New Contact Form Submission from Locotraq Website" />
                    <input type="hidden" name="from_name" value="Locotraq Contact Form" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="font-paragraph text-foreground">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-paragraph text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="font-paragraph text-foreground">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 6390 057 777"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType" className="font-paragraph text-foreground">
                          Inquiry Type *
                        </Label>
                        <Select name="inquiry_type" value={formData.inquiryType} onValueChange={(value) => handleChange('inquiryType', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="general">General Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inquiry_subject" className="font-paragraph text-foreground">
                        Subject *
                      </Label>
                      <Input
                        id="inquiry_subject"
                        name="inquiry_subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="Brief description of your inquiry"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-paragraph text-foreground">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        required
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      size="lg"
                      disabled={result === "Sending...."}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {result === "Sending...." ? "Sending..." : "Send Message"}
                    </Button>

                    {/* Result Message */}
                    {result && (
                      <div className={`text-center p-4 rounded-lg ${
                        result.includes("Successfully") 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : result.includes("Error")
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        <p className="font-paragraph font-medium">{result}</p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Get in Touch
              </h2>

              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-soft-gold/20 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <info.icon className="h-6 w-6 text-soft-gold" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="font-paragraph text-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="font-paragraph text-secondary text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* WhatsApp Contact */}
              <Card className="border-0 shadow-lg bg-green-50 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                        WhatsApp Support
                      </h3>
                      <p className="font-paragraph text-foreground mb-2">
                        +91 6390 057 777
                      </p>
                      <p className="font-paragraph text-secondary text-sm mb-4">
                        Chat with us instantly for quick support
                      </p>
                      <Button 
                        asChild
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <a 
                          href="https://wa.me/916390057777" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Start WhatsApp Chat
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg font-paragraph text-secondary">
              Located in the heart of Varanasi's innovation district
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.164951404368!2d82.99632647551163!3d25.26772037766236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e319555555555%3A0xaaaaaaaaaaaaaaaa!2sAIC%20Building%2C%20BHU%2C%20Varanasi%2C%20Uttar%20Pradesh%20221005!5e0!3m2!1sen!2sin!4v1730022400000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locotraq Office Location"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Quick Answers
            </h2>
            <p className="text-lg font-paragraph text-secondary">
              Common questions about our services and support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What's your response time for support?",
                answer: "We typically respond to support inquiries within 2-4 hours during business hours, and within 24 hours on weekends."
              },
              {
                question: "Do you offer installation services?",
                answer: "Yes, we provide professional installation services in most major cities. Contact us to check availability in your area."
              },
              {
                question: "What warranty do you provide?",
                answer: "All our GPS tracking devices come with a 2-year manufacturer warranty covering defects and malfunctions."
              },
              {
                question: "Can I track multiple vehicles?",
                answer: "Absolutely! Our platform supports tracking unlimited vehicles with our fleet management plans."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="font-paragraph text-secondary">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
