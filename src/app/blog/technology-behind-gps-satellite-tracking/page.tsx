"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function TechnologyBehindGPSPage() {
  const blogPost = {
    title: "The Technology Behind GPS: How Satellite Tracking Works",
    excerpt: "Uncover the fascinating technology behind GPS and satellite tracking, explaining how it works to provide accurate location data for Locotraq devices.",
    author: {
      name: "Alex Johnson",
      email: "alex.johnson@locotraq.com",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&q=80"
    },
    publishedAt: new Date("2023-10-25"),
    category: "Technology",
    tags: ["GPS", "Technology", "Satellite", "Tracking", "Science"],
    featuredImageUrl: "/images/TheTechnologyBehindGPS.png",
    readTime: "8 min read"
  };

  const relatedPosts = [
    {
      title: "The Future of Fleet Management: How GPS Tracking is Revolutionizing Logistics",
      slug: "future-fleet-management-gps-tracking",
      category: "Fleet Management",
      excerpt: "Explore how GPS tracking is revolutionizing fleet management and logistics.",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=300&h=200&fit=crop&q=80"
    },
    {
      title: "Choosing the Right Vehicle Tracker: A Comprehensive Guide",
      slug: "choosing-right-vehicle-tracker-guide",
      category: "Product Guides",
      excerpt: "A comprehensive guide for car owners on choosing the right vehicle tracker.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="mb-6">
              <Badge className="mb-4">{blogPost.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                {blogPost.title}
              </h1>
              <p className="text-lg font-paragraph text-secondary max-w-3xl">
                {blogPost.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-secondary">
              <div className="flex items-center">
                <Image
                  src={blogPost.author.avatarUrl}
                  alt={blogPost.author.name}
                  width={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-medium">{blogPost.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {blogPost.publishedAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {blogPost.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={blogPost.featuredImageUrl}
              alt={blogPost.title}
              width={800}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-8 prose prose-lg max-w-none"
            >
              <div className="font-paragraph text-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  In today's interconnected world, GPS (Global Positioning System) technology has become an integral part of our daily lives. From navigation apps on our smartphones to sophisticated fleet management systems like those offered by Locotraq, GPS technology enables precise location tracking across the globe. But have you ever wondered how this remarkable technology actually works?
                </p>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  What is GPS?
                </h2>
                
                <p className="leading-relaxed">
                  GPS is a satellite-based navigation system that provides location and time information anywhere on Earth where there is an unobstructed line of sight to four or more GPS satellites. Originally developed by the U.S. Department of Defense for military applications, GPS was made available for civilian use in the 1980s and has since revolutionized navigation, tracking, and timing applications worldwide.
                </p>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  The GPS Constellation
                </h2>
                
                <p className="leading-relaxed">
                  The GPS system consists of a constellation of at least 24 operational satellites orbiting Earth at an altitude of approximately 20,200 kilometers (12,550 miles). These satellites are arranged in six orbital planes, with four satellites in each plane, ensuring that at least four satellites are visible from any point on Earth at any given time.
                </p>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg my-8">
                  <h3 className="text-lg font-heading font-medium text-blue-900 mb-3">Key GPS Facts</h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-800 text-sm">
                    <li>Each satellite orbits Earth twice a day</li>
                    <li>Satellites transmit signals at the speed of light</li>
                    <li>The system provides accuracy within 3-5 meters for civilian users</li>
                    <li>Over 31 GPS satellites are currently operational (including spares)</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  How GPS Positioning Works
                </h2>
                
                <p className="leading-relaxed">
                  GPS positioning is based on a mathematical principle called trilateration. Here's how it works:
                </p>

                <h3 className="text-xl font-heading font-medium text-foreground mt-6 mb-3">
                  1. Signal Transmission
                </h3>
                <p className="leading-relaxed">
                  Each GPS satellite continuously broadcasts signals that include the satellite's location and the precise time the signal was transmitted. These signals travel at the speed of light (approximately 300,000 kilometers per second).
                </p>

                <h3 className="text-xl font-heading font-medium text-foreground mt-6 mb-3">
                  2. Time Measurement
                </h3>
                <p className="leading-relaxed">
                  A GPS receiver (like those in Locotraq devices) calculates the time it took for each satellite signal to reach it. By multiplying this travel time by the speed of light, the receiver determines its distance from each satellite.
                </p>

                <h3 className="text-xl font-heading font-medium text-foreground mt-6 mb-3">
                  3. Trilateration Calculation
                </h3>
                <p className="leading-relaxed">
                  With distance measurements from at least four satellites, the GPS receiver can calculate its precise three-dimensional position (latitude, longitude, and altitude) using trilateration. The fourth satellite is needed to account for clock synchronization errors.
                </p>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  GPS Signal Structure
                </h2>
                
                <p className="leading-relaxed">
                  GPS satellites transmit signals on multiple frequencies, with the primary civilian signal being the L1 frequency at 1575.42 MHz. Each signal contains three key components:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Coarse/Acquisition (C/A) Code:</strong> A unique identifier for each satellite</li>
                  <li><strong>Navigation Message:</strong> Contains satellite orbital information and system time</li>
                  <li><strong>Carrier Wave:</strong> The base frequency that carries the other components</li>
                </ul>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  Factors Affecting GPS Accuracy
                </h2>
                
                <p className="leading-relaxed">
                  While GPS technology is remarkably accurate, several factors can affect its precision:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-heading font-medium text-foreground mb-3">Environmental Factors</h4>
                      <ul className="text-sm text-secondary space-y-1">
                        <li>• Atmospheric interference</li>
                        <li>• Weather conditions</li>
                        <li>• Physical obstructions (buildings, mountains)</li>
                        <li>• Multipath errors (signal reflections)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-heading font-medium text-foreground mb-3">Technical Factors</h4>
                      <ul className="text-sm text-secondary space-y-1">
                        <li>• Satellite geometry</li>
                        <li>• Clock synchronization errors</li>
                        <li>• Receiver quality</li>
                        <li>• Signal processing capabilities</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  Modern GPS Enhancements
                </h2>
                
                <p className="leading-relaxed">
                  Today's GPS systems, including those used in Locotraq devices, incorporate several enhancements to improve accuracy and reliability:
                </p>

                <h3 className="text-xl font-heading font-medium text-foreground mt-6 mb-3">
                  Assisted GPS (A-GPS)
                </h3>
                <p className="leading-relaxed">
                  A-GPS uses cellular networks to provide satellite almanac data and reduce the time to first fix (TTFF), enabling faster location acquisition especially in urban environments.
                </p>

                <h3 className="text-xl font-heading font-medium text-foreground mt-6 mb-3">
                  Multi-GNSS Support
                </h3>
                <p className="leading-relaxed">
                  Modern GPS receivers can utilize signals from multiple Global Navigation Satellite Systems (GNSS), including GPS (USA), GLONASS (Russia), Galileo (Europe), and BeiDou (China), for improved accuracy and reliability.
                </p>

                <h3 className="text-xl font-heading font-medium text-foreground mt-6 mb-3">
                  Real-Time Kinematic (RTK)
                </h3>
                <p className="leading-relaxed">
                  RTK GPS can achieve centimeter-level accuracy by using correction data from nearby reference stations, making it ideal for precision applications.
                </p>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  GPS in Locotraq Devices
                </h2>
                
                <p className="leading-relaxed">
                  Locotraq's GPS tracking devices leverage advanced GPS technology combined with cellular communication to provide real-time location updates. Our devices incorporate:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                  <li>High-sensitivity GPS receivers for improved signal acquisition</li>
                  <li>Multi-GNSS support for enhanced positioning accuracy</li>
                  <li>Intelligent power management for extended battery life</li>
                  <li>Advanced algorithms for filtering and processing location data</li>
                  <li>Seamless integration with cellular networks for data transmission</li>
                </ul>

                <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
                  <h3 className="text-lg font-heading font-medium text-green-900 mb-3">The Future of GPS Technology</h3>
                  <p className="text-green-800 text-sm">
                    As technology continues to evolve, we can expect even more accurate and efficient GPS systems. Next-generation satellites, improved signal processing, and integration with other positioning technologies will further enhance the capabilities of GPS tracking devices.
                  </p>
                </div>

                <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                  Conclusion
                </h2>
                
                <p className="leading-relaxed">
                  Understanding the technology behind GPS helps us appreciate the remarkable engineering feat that enables precise location tracking anywhere on Earth. From the constellation of satellites orbiting high above us to the sophisticated receivers in our tracking devices, GPS technology continues to evolve and improve, making applications like Locotraq's tracking solutions more accurate and reliable than ever before.
                </p>

                <p className="leading-relaxed">
                  Whether you're managing a fleet of vehicles, tracking valuable assets, or ensuring the safety of loved ones, GPS technology provides the foundation for reliable, real-time location information that you can trust.
                </p>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-8 space-y-8"
              >
                {/* Share */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share Article
                    </h3>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Author */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-4">About the Author</h3>
                    <div className="flex items-start space-x-4">
                      <Image
                        src={blogPost.author.avatarUrl}
                        alt={blogPost.author.name}
                        width={60}
                        className="w-15 h-15 rounded-full"
                      />
                      <div>
                        <h4 className="font-heading font-medium text-foreground">{blogPost.author.name}</h4>
                        <p className="text-sm text-secondary mt-2">
                          Technology expert and GPS systems specialist with over 10 years of experience in satellite navigation and tracking technologies.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((post, index) => (
                        <Link key={index} href={`/blog/${post.slug}`} className="block group">
                          <div className="flex space-x-3">
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={80}
                              className="w-20 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                            />
                            <div className="flex-1">
                              <Badge variant="outline" className="text-xs mb-1">
                                {post.category}
                              </Badge>
                              <h4 className="font-heading font-medium text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Experience GPS Tracking?
            </h2>
            <p className="text-lg font-paragraph mb-8 max-w-2xl mx-auto opacity-90">
              Discover how Locotraq's advanced GPS tracking solutions can benefit your business or personal needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/products">
                  View Our Products
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-[#333333] text-white hover:bg-white hover:text-[#333333]">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}