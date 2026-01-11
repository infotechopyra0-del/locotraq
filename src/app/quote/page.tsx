'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle, Phone, Mail, MessageCircle, Send, Users, Shield, Clock, Award, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  trackingType: string;
  numberOfDevices: string;
  additionalServices: string[];
  budget: string;
  timeline: string;
  message: string;
}

export default function GetQuotePage() {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    trackingType: '',
    numberOfDevices: '',
    additionalServices: [],
    budget: '',
    timeline: '',
    message: ''
  });

  const [result, setResult] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Sending....");
    
    const form = e.target as HTMLFormElement;
    const formDataWeb3 = new FormData(form);
    formDataWeb3.append("access_key", "1c32a200-cb16-4db7-a524-a74052927e6a");
    formDataWeb3.append("subject", "New Quote Request from Locotraq Website");
    formDataWeb3.append("from_name", "Locotraq Quote Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataWeb3
      });

      const data = await response.json();
      if (data.success) {
        setResult("Quote Request Submitted Successfully! We'll send you a detailed quote within 24 hours.");
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          trackingType: '',
          numberOfDevices: '',
          additionalServices: [],
          budget: '',
          timeline: '',
          message: ''
        });
        form.reset();
      } else {
        setResult("Error submitting quote request. Please try again.");
      }
    } catch (error) {
      setResult("Error submitting quote request. Please try again.");
    }
  };

  const handleChange = (field: keyof QuoteFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    calculateEstimate({ ...formData, [field]: value });
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    const updatedServices = checked
      ? [...formData.additionalServices, service]
      : formData.additionalServices.filter(s => s !== service);
    
    setFormData(prev => ({ ...prev, additionalServices: updatedServices }));
    calculateEstimate({ ...formData, additionalServices: updatedServices });
  };

  const calculateEstimate = (data: QuoteFormData) => {
    let baseCost = 0;
    const deviceCount = parseInt(data.numberOfDevices) || 1;

    // Base cost calculation based on tracking type
    switch (data.trackingType) {
      case 'vehicle':
        baseCost = deviceCount * 3500;
        break;
      case 'personal':
        baseCost = deviceCount * 2500;
        break;
      case 'fleet':
        baseCost = deviceCount * 4500;
        break;
      case 'asset':
        baseCost = deviceCount * 5500;
        break;
      case 'pet':
        baseCost = deviceCount * 2000;
        break;
      default:
        baseCost = deviceCount * 3000;
    }

    // Add additional services cost
    let servicesCost = 0;
    data.additionalServices.forEach(service => {
      switch (service) {
        case 'installation':
          servicesCost += deviceCount * 500;
          break;
        case 'monitoring':
          servicesCost += deviceCount * 200;
          break;
        case 'maintenance':
          servicesCost += deviceCount * 300;
          break;
        case 'training':
          servicesCost += 2000;
          break;
        case 'support':
          servicesCost += 1500;
          break;
      }
    });

    // Volume discount
    let discount = 0;
    if (deviceCount >= 50) discount = 0.20;
    else if (deviceCount >= 20) discount = 0.15;
    else if (deviceCount >= 10) discount = 0.10;
    else if (deviceCount >= 5) discount = 0.05;

    const totalBeforeDiscount = baseCost + servicesCost;
    const discountAmount = totalBeforeDiscount * discount;
    const finalCost = totalBeforeDiscount - discountAmount;

    setEstimatedCost(Math.round(finalCost));
  };

  const trackingTypes = [
    { value: 'vehicle', label: 'Vehicle Tracking', description: 'Cars, bikes, trucks' },
    { value: 'fleet', label: 'Fleet Management', description: 'Commercial vehicles' },
    { value: 'personal', label: 'Personal Safety', description: 'Individual tracking' },
    { value: 'asset', label: 'Asset Tracking', description: 'Equipment, valuables' },
    { value: 'pet', label: 'Pet Tracking', description: 'Dogs, cats, animals' }
  ];

  const additionalServices = [
    { id: 'installation', label: 'Professional Installation', cost: '₹500/device' },
    { id: 'monitoring', label: '24/7 Monitoring Service', cost: '₹200/device/month' },
    { id: 'maintenance', label: 'Annual Maintenance', cost: '₹300/device/year' },
    { id: 'training', label: 'Staff Training', cost: '₹2,000' },
    { id: 'support', label: 'Premium Support', cost: '₹1,500/year' }
  ];

  const features = [
    { icon: CheckCircle, title: "Free Consultation", description: "Expert advice on best tracking solutions" },
    { icon: Shield, title: "2-Year Warranty", description: "Comprehensive warranty on all devices" },
    { icon: Clock, title: "24-Hour Response", description: "Quick quote turnaround time" },
    { icon: Award, title: "Certified Solutions", description: "Industry-standard GPS tracking" }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Navbar */}
      <Navbar />
      {/* Header */}
      <section className="bg-linear-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              Get A Custom Quote
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Tell us about your tracking needs and get a personalized quote with competitive pricing and expert recommendations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-400 mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-secondary text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading font-bold text-foreground">
                    Quote Request Form
                  </CardTitle>
                  <p className="font-paragraph text-secondary">
                    Fill out the details below to get your customized quote
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden fields for Web3 Forms */}
                    <input type="hidden" name="form_type" value="Quote Request" />
                    <input type="hidden" name="estimated_cost" value={`₹${estimatedCost.toLocaleString('en-IN')}`} />
                    
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
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
                          <Label htmlFor="email">Email Address *</Label>
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
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+91 6390 057 777"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            placeholder="Company name"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tracking Requirements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        Tracking Requirements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="industry">Industry</Label>
                          <Select name="industry" value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                              <SelectItem value="construction">Construction</SelectItem>
                              <SelectItem value="agriculture">Agriculture</SelectItem>
                              <SelectItem value="security">Security Services</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="trackingType">Tracking Type *</Label>
                          <Select name="tracking_type" value={formData.trackingType} onValueChange={(value) => handleChange('trackingType', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select tracking type" />
                            </SelectTrigger>
                            <SelectContent>
                              {trackingTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label} - {type.description}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="numberOfDevices">Number of Devices *</Label>
                          <Select name="number_of_devices" value={formData.numberOfDevices} onValueChange={(value) => handleChange('numberOfDevices', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 device</SelectItem>
                              <SelectItem value="2-4">2-4 devices</SelectItem>
                              <SelectItem value="5-9">5-9 devices</SelectItem>
                              <SelectItem value="10-19">10-19 devices</SelectItem>
                              <SelectItem value="20-49">20-49 devices</SelectItem>
                              <SelectItem value="50+">50+ devices</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="budget">Budget Range</Label>
                          <Select name="budget" value={formData.budget} onValueChange={(value) => handleChange('budget', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-10k">Under ₹10,000</SelectItem>
                              <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                              <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                              <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                              <SelectItem value="100k-250k">₹1,00,000 - ₹2,50,000</SelectItem>
                              <SelectItem value="250k+">₹2,50,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        Additional Services
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {additionalServices.map(service => (
                          <div key={service.id} className="flex items-start space-x-3">
                            <Checkbox
                              id={service.id}
                              checked={formData.additionalServices.includes(service.id)}
                              onCheckedChange={(checked) => handleServiceToggle(service.id, !!checked)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={service.id} className="text-sm font-medium cursor-pointer">
                                {service.label}
                              </Label>
                              <p className="text-xs text-secondary">{service.cost}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <input type="hidden" name="additional_services" value={formData.additionalServices.join(', ')} />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        Project Details
                      </h3>
                      <div>
                        <Label htmlFor="timeline">Implementation Timeline</Label>
                        <Select name="timeline" value={formData.timeline} onValueChange={(value) => handleChange('timeline', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (Within 1 week)</SelectItem>
                            <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                            <SelectItem value="1month">Within 1 month</SelectItem>
                            <SelectItem value="2-3months">2-3 months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message">Additional Requirements</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Please describe any specific requirements, integration needs, or questions you have..."
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-600 text-white hover:bg-orange-700 transition-all transform hover:scale-105"
                      size="lg"
                      disabled={result === "Sending...."}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {result === "Sending...." ? "Sending..." : "Get My Quote"}
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

            {/* Quote Summary & Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Estimated Cost */}
              <Card className="border-0 shadow-lg bg-linear-to-br from-orange-50 to-orange-100">
                <CardHeader>
                  <CardTitle className="text-xl font-heading font-bold text-foreground flex items-center">
                    <Calculator className="mr-2 h-5 w-5 text-orange-600" />
                    Estimated Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-orange-600 mb-2">
                      ₹{estimatedCost.toLocaleString('en-IN')}
                    </div>
                    <p className="font-paragraph text-secondary text-sm mb-4">
                      *Preliminary estimate based on your selections
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-sm text-secondary">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span>Final quote may vary based on requirements</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-heading font-bold text-foreground">
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-paragraph font-medium text-foreground">Call Us</p>
                      <p className="font-paragraph text-secondary text-sm">+91 6390 057 777</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-paragraph font-medium text-foreground">Email Us</p>
                      <p className="font-paragraph text-secondary text-sm">support@locotraq.com</p>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                  >
                    <a 
                      href="https://wa.me/916390057777?text=Hi!%20I'm%20interested%20in%20getting%20a%20quote%20for%20GPS%20tracking%20solutions." 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp Chat
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-heading font-bold text-foreground">
                    Why Choose Locotraq?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "10,000+ satisfied customers",
                    "2-year comprehensive warranty",
                    "24/7 technical support",
                    "Competitive pricing",
                    "Professional installation",
                    "Custom solutions available"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-paragraph text-secondary text-sm">{item}</span>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Learn More About Us
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-paragraph text-secondary">
              Common questions about our quoting process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How accurate is the estimated cost?",
                answer: "Our estimates are typically within 10-15% of the final quote. The final price may vary based on specific customization and installation requirements."
              },
              {
                question: "How long does it take to receive a detailed quote?",
                answer: "We provide detailed quotes within 24 hours of receiving your request. Complex projects may take up to 48 hours for a comprehensive proposal."
              },
              {
                question: "Do you offer volume discounts?",
                answer: "Yes! We offer attractive discounts for bulk orders: 5% for 5+ devices, 10% for 10+, 15% for 20+, and 20% for 50+ devices."
              },
              {
                question: "Can I modify my requirements after submitting?",
                answer: "Absolutely! Contact us anytime to modify your requirements. We'll update your quote accordingly and send you a revised proposal."
              },
              {
                question: "Do you provide financing options?",
                answer: "Yes, we offer flexible payment plans and financing options for orders above ₹50,000. Contact our sales team for more details."
              },
              {
                question: "Is there any obligation after getting a quote?",
                answer: "No obligation at all! Our quotes are completely free with no strings attached. Take your time to evaluate and decide what works best for you."
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

      {/* Footer */}
      <Footer />
    </div>
  );
}