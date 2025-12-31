'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { TrackingServices } from '@/entities';
import Link from 'next/link';

// Static services array
const staticServices: TrackingServices[] = [
  {
    id: 'fleet-management-solutions',
    _id: 'fleet-management-solutions',
    name: 'Fleet Management Solutions',
    serviceName: 'Fleet Management Solutions',
    description: 'Our comprehensive Fleet Management Solutions provide businesses with real-time tracking, route optimization, driver behavior monitoring, and detailed reporting to enhance efficiency, reduce costs, and improve safety across their entire fleet.',
    shortDescription: 'Optimize your operations, track every vehicle.',
    tagline: 'Optimize your operations, track every vehicle.',
    icon: '/images/fleet-management-solutions.png',
    serviceIcon: '/images/fleet-management-solutions.png',
    features: [
      'Real-time GPS tracking',
      'Geofencing',
      'Route planning & optimization',
      'Driver performance analytics',
      'Fuel consumption monitoring',
      'Maintenance scheduling',
      'Detailed reports'
    ],
    keyFeatures: 'Real-time GPS tracking, Geofencing, Route planning & optimization, Driver performance analytics, Fuel consumption monitoring, Maintenance scheduling, Detailed reports',
    targetAudience: 'Businesses of all sizes with vehicle fleets.',
    callToActionUrl: '/contact',
    isActive: true,
    category: 'fleet',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'personal-family-safety-tracking',
    _id: 'personal-family-safety-tracking',
    name: 'Personal & Family Safety Tracking',
    serviceName: 'Personal & Family Safety Tracking',
    description: 'Ensure the safety and peace of mind for your family members with our personal tracking solutions. Ideal for children, elderly relatives, or even pets, offering discreet and reliable location monitoring with emergency alerts.',
    shortDescription: 'Keep your loved ones safe, always connected.',
    tagline: 'Keep your loved ones safe, always connected.',
    icon: '/images/personal-family-safety-tracking.png',
    serviceIcon: '/images/personal-family-safety-tracking.png',
    features: [
      'Live location tracking',
      'SOS emergency button',
      'Safe zone alerts',
      'Location history',
      'Compact & discreet devices',
      'Mobile app access'
    ],
    keyFeatures: 'Live location tracking, SOS emergency button, Safe zone alerts, Location history, Compact & discreet devices, Mobile app access',
    targetAudience: 'Individuals and families concerned about personal safety.',
    callToActionUrl: '/contact',
    isActive: true,
    category: 'personal',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'asset-equipment-monitoring',
    _id: 'asset-equipment-monitoring',
    name: 'Asset & Equipment Monitoring',
    serviceName: 'Asset & Equipment Monitoring',
    description: 'Track and secure your high-value assets and equipment with Locotraq\'s robust monitoring services. Prevent theft, manage inventory, and optimize utilization for construction equipment, containers, tools, and more.',
    shortDescription: 'Protect your valuable assets, wherever they are.',
    tagline: 'Protect your valuable assets, wherever they are.',
    icon: '/images/asset-equipment-monitoring.png',
    serviceIcon: '/images/asset-equipment-monitoring.png',
    features: [
      'Rugged device options',
      'Long battery life',
      'Theft recovery assistance',
      'Usage monitoring',
      'Geofence alerts',
      'Customizable reporting',
      'Weatherproof'
    ],
    keyFeatures: 'Rugged device options, Long battery life, Theft recovery assistance, Usage monitoring, Geofence alerts, Customizable reporting, Weatherproof',
    targetAudience: 'Businesses with valuable mobile or stationary assets.',
    callToActionUrl: '/contact',
    isActive: true,
    category: 'asset',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'vehicle-recovery-anti-theft',
    _id: 'vehicle-recovery-anti-theft',
    name: 'Vehicle Recovery & Anti-Theft',
    serviceName: 'Vehicle Recovery & Anti-Theft',
    description: 'Our advanced vehicle recovery service provides an essential layer of security for your car, motorcycle, or commercial vehicle. In case of theft, our system helps locate and recover your vehicle quickly, minimizing loss and stress.',
    shortDescription: 'Your car\'s guardian, 24/7 protection.',
    tagline: 'Your car\'s guardian, 24/7 protection.',
    icon: '/images/vehicle-recovery-anti-theft.png',
    serviceIcon: '/images/vehicle-recovery-anti-theft.png',
    features: [
      'Ignition kill switch',
      'Towing alerts',
      'Tamper detection',
      '24/7 monitoring center',
      'GPS-assisted recovery',
      'Insurance premium reduction potential',
      'Remote immobilization'
    ],
    keyFeatures: 'Ignition kill switch, Towing alerts, Tamper detection, 24/7 monitoring center, GPS-assisted recovery, Insurance premium reduction potential, Remote immobilization',
    targetAudience: 'Vehicle owners (individuals and businesses) seeking theft protection.',
    callToActionUrl: '/contact',
    isActive: true,
    category: 'personal',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function ServicesPage() {
  const [services] = useState<TrackingServices[]>(staticServices);

  const parseKeyFeatures = (features: string | undefined): string[] => {
    if (!features) return [];
    return features.split(',').map(f => f.trim()).filter(Boolean);
  };

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
              GPS Tracking Services
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Comprehensive tracking solutions tailored to your specific needs and industry requirements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <Image
                          src={service.serviceIcon || 'https://static.wixstatic.com/media/d1fa15_89b3293dafe848b78a6485d61b2277ea~mv2.png?originWidth=384&originHeight=256'}
                          alt={service.serviceName || 'GPS Service'}
                          width={400}
                          className="w-full h-64 md:h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                      </div>

                      {/* Content Section */}
                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          <Badge className="mb-4 bg-soft-gold text-foreground">
                            {service.targetAudience}
                          </Badge>
                          
                          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                            {service.serviceName}
                          </h3>
                          
                          <p className="font-paragraph text-soft-gold text-sm mb-4 italic">
                            {service.tagline}
                          </p>
                          
                          <p className="font-paragraph text-secondary mb-6">
                            {service.description}
                          </p>

                          {/* Key Features */}
                          {service.keyFeatures && (
                            <div className="mb-6">
                              <h4 className="font-heading font-semibold text-foreground mb-3">
                                Key Features:
                              </h4>
                              <ul className="space-y-2">
                                {parseKeyFeatures(service.keyFeatures).map((feature, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Check className="h-4 w-4 text-soft-gold mt-1 mr-2 shrink-0" />
                                    <span className="font-paragraph text-secondary text-sm">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-3">
                          <Button 
                            asChild
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Link href="/contact">
                              Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          
                          {service.callToActionUrl && (
                            <Button 
                              asChild
                              variant="outline" 
                              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                              <a 
                                href={service.callToActionUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                Learn More <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-2xl mx-auto">
              Experience the difference with our professional GPS tracking services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Installation",
                description: "Professional installation by certified technicians",
                icon: "🔧"
              },
              {
                title: "24/7 Monitoring",
                description: "Round-the-clock monitoring and support services",
                icon: "👁️"
              },
              {
                title: "Custom Solutions",
                description: "Tailored solutions for your specific requirements",
                icon: "⚙️"
              },
              {
                title: "Ongoing Support",
                description: "Continuous support and maintenance services",
                icon: "🛠️"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="font-paragraph text-secondary">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-400 mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg font-paragraph mb-8 max-w-2xl mx-auto opacity-90">
              Contact our experts today to discuss your GPS tracking needs and find the perfect solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-[#333333] text-white hover:bg-white hover:text-[#333333]">
                <Link href="/products">
                  View Products
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
