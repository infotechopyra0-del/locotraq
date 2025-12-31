"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Car, Settings, Shield, Smartphone, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function VehicleTrackerGuidePage() {
  const blogPost = {
    title: "Choosing the Right Vehicle Tracker: A Comprehensive Guide for Car Owners",
    excerpt: "A comprehensive guide for car owners on choosing the right vehicle tracker, covering features, installation, and Locotraq's best options.",
    author: {
      name: "John Smith",
      email: "john.smith@locotraq.com",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&q=80"
    },
    publishedAt: new Date("2023-12-05"),
    category: "Product Guides",
    tags: ["Vehicle Tracker", "Car Security", "GPS", "Automotive", "Product Guide"],
    featuredImageUrl: "/images/ChoosingtheRightVehicleTracker.png",
    readTime: "13 min read"
  };

  const keyFeatures = [
    {
      icon: Car,
      title: "Real-Time Tracking",
      description: "Live location updates with precise GPS coordinates and route history."
    },
    {
      icon: Shield,
      title: "Theft Protection",
      description: "Instant alerts for unauthorized movement and remote immobilization."
    },
    {
      icon: Smartphone,
      title: "Mobile App Control",
      description: "Full control and monitoring through intuitive smartphone applications."
    },
    {
      icon: Settings,
      title: "Custom Alerts",
      description: "Personalized notifications for speeding, geofencing, and maintenance."
    }
  ];

  const trackerTypes = [
    {
      type: "OBD-II Port Trackers",
      pros: ["Easy plug-and-play installation", "No wiring required", "Access to vehicle diagnostics", "Quick removal if needed"],
      cons: ["Visible and easily removed", "Limited to vehicles with OBD-II ports", "May interfere with diagnostics"],
      bestFor: "Casual users wanting easy installation and basic tracking"
    },
    {
      type: "Hardwired Trackers",
      pros: ["Hidden installation", "Difficult to detect or remove", "Reliable power source", "Professional appearance"],
      cons: ["Requires professional installation", "More expensive installation", "Permanent modification"],
      bestFor: "High-security applications and valuable vehicles"
    },
    {
      type: "Battery-Powered Trackers",
      pros: ["Completely portable", "No installation required", "Works in any vehicle", "Covert placement options"],
      cons: ["Limited battery life", "Requires regular charging", "Less reliable long-term"],
      bestFor: "Rental vehicles, temporary tracking, and covert applications"
    },
    {
      type: "Magnetic Trackers",
      pros: ["Easy attachment", "Weather resistant", "Quick deployment", "No tools required"],
      cons: ["External mounting only", "Visible if discovered", "May fall off on rough terrain"],
      bestFor: "Fleet vehicles and temporary tracking needs"
    }
  ];

  const essentialFeatures = [
    "Real-time GPS location tracking",
    "Geofencing with custom boundaries",
    "Speed monitoring and alerts",
    "Historical route playback",
    "Theft and tamper alerts",
    "Mobile app compatibility",
    "Email and SMS notifications",
    "Vehicle diagnostics (OBD models)",
    "Emergency assistance features",
    "Long battery life or vehicle power",
    "Water and weather resistance",
    "24/7 customer support"
  ];

  const considerations = [
    {
      title: "Coverage Area",
      description: "Ensure the tracker works in all areas where you'll be driving, including rural locations."
    },
    {
      title: "Monthly Fees",
      description: "Consider ongoing costs for cellular service and platform access when calculating total cost."
    },
    {
      title: "Installation Complexity",
      description: "Choose installation type based on your technical skills and security requirements."
    },
    {
      title: "App Quality",
      description: "Test the mobile app interface and features before making a final decision."
    },
    {
      title: "Customer Support",
      description: "Verify availability of technical support and customer service when needed."
    },
    {
      title: "Data Security",
      description: "Ensure the provider uses encryption and has strong privacy policies."
    }
  ];

  const relatedPosts = [
    {
      title: "Personal Safety On-the-Go: Why You Need a Personal GPS Tracker",
      slug: "personal-safety-gps-tracker-guide",
      category: "Personal Safety",
      excerpt: "Learn about the essential role of personal GPS trackers in ensuring safety.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=200&fit=crop&q=80"
    },
    {
      title: "The Technology Behind GPS: How Satellite Tracking Works",
      slug: "technology-behind-gps-satellite-tracking",
      category: "Technology",
      excerpt: "Uncover the fascinating technology behind GPS and satellite tracking.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop&q=80"
    }
  ];

  const shareUrl = "https://locotraq.com/blog/choosing-right-vehicle-tracker-guide";
  const shareText = encodeURIComponent(blogPost.title);

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
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {blogPost.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {blogPost.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {blogPost.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blogPost.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{blogPost.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden"
          >
            <Image
              src={blogPost.featuredImageUrl}
              alt={blogPost.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground"
              >
                <h2>Why Every Car Owner Needs a Vehicle Tracker</h2>
                <p>
                  Vehicle theft remains a significant concern for car owners worldwide, with millions 
                  of vehicles stolen annually. Beyond theft protection, modern vehicle trackers offer 
                  comprehensive monitoring capabilities that enhance safety, provide peace of mind, 
                  and can even help reduce insurance premiums.
                </p>

                <p>
                  Whether you're protecting a daily commuter, a luxury vehicle, or managing a small 
                  fleet, choosing the right vehicle tracker is crucial for maximizing security and 
                  value. This comprehensive guide will help you navigate the options and make an 
                  informed decision that meets your specific needs.
                </p>

                <h2>Key Benefits of Vehicle Tracking</h2>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {keyFeatures.map((feature, index) => (
                    <Card key={index} className="p-6">
                      <CardContent className="p-0">
                        <div className="flex items-start space-x-4">
                          <div className="shrink-0">
                            <feature.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2>Types of Vehicle Trackers</h2>
                <p>
                  Understanding the different types of vehicle trackers is essential for making 
                  the right choice. Each type has distinct advantages and is suited for different 
                  use cases and security requirements.
                </p>

                <div className="not-prose space-y-6 my-8">
                  {trackerTypes.map((tracker, index) => (
                    <Card key={index} className="p-6">
                      <CardContent className="p-0">
                        <h3 className="text-xl font-semibold text-foreground mb-4">{tracker.type}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Advantages
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {tracker.pros.map((pro, i) => (
                                <li key={i}>• {pro}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold text-red-600 mb-2">Disadvantages</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {tracker.cons.map((con, i) => (
                                <li key={i}>• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm"><strong>Best For:</strong> {tracker.bestFor}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2>Essential Features to Consider</h2>
                <p>
                  When evaluating vehicle trackers, certain features are essential for effective 
                  monitoring and security. Prioritize these capabilities based on your specific 
                  needs and use case.
                </p>

                <div className="not-prose my-8">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Must-Have Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {essentialFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2>Real-Time vs. Passive Tracking</h2>
                <p>
                  Understanding the difference between real-time and passive tracking is crucial 
                  for selecting the right system for your needs.
                </p>

                <h3>Real-Time Tracking</h3>
                <p>
                  Real-time trackers provide live location updates, typically every 10-60 seconds. 
                  This immediate information is essential for theft recovery, emergency situations, 
                  and active monitoring. Real-time systems require cellular connectivity and 
                  ongoing service plans.
                </p>

                <h3>Passive Tracking</h3>
                <p>
                  Passive trackers log location data for later retrieval. While less expensive 
                  to operate, they don't provide immediate alerts and are primarily useful for 
                  historical route analysis and post-incident investigation.
                </p>

                <h2>Installation Options</h2>
                <p>
                  Installation complexity varies significantly between tracker types. Consider 
                  your technical skills, security requirements, and long-term needs when 
                  choosing an installation method.
                </p>

                <h3>DIY Installation</h3>
                <p>
                  OBD-II port trackers and magnetic units offer simple DIY installation. These 
                  options are cost-effective and allow for easy removal, but may be more visible 
                  and less secure than professional installations.
                </p>

                <h3>Professional Installation</h3>
                <p>
                  Hardwired systems require professional installation but offer superior security 
                  and reliability. Professional installation ensures optimal placement, proper 
                  wiring, and often includes warranties on both equipment and installation work.
                </p>

                <h2>Key Considerations for Selection</h2>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {considerations.map((consideration, index) => (
                    <Card key={index} className="p-4">
                      <CardContent className="p-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{consideration.title}</h3>
                        <p className="text-sm text-muted-foreground">{consideration.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2>Understanding Costs</h2>
                <p>
                  Vehicle tracker costs include both upfront equipment expenses and ongoing 
                  service fees. Understanding the total cost of ownership helps make informed 
                  decisions about long-term value.
                </p>

                <h3>Initial Costs</h3>
                <ul>
                  <li><strong>Device Cost:</strong> ₹2,000 - ₹15,000 depending on features and type</li>
                  <li><strong>Installation:</strong> ₹500 - ₹3,000 for professional installation</li>
                  <li><strong>Activation Fees:</strong> ₹200 - ₹1,000 one-time setup costs</li>
                </ul>

                <h3>Ongoing Costs</h3>
                <ul>
                  <li><strong>Monthly Service:</strong> ₹200 - ₹800 per month for cellular and platform access</li>
                  <li><strong>Data Plans:</strong> Included in service or separate cellular charges</li>
                  <li><strong>Premium Features:</strong> Additional costs for advanced analytics or extended history</li>
                </ul>

                <h2>Battery Life and Power Management</h2>
                <p>
                  Power management is crucial for reliable operation. Vehicle-powered trackers 
                  offer continuous operation but may drain the vehicle battery if not properly 
                  installed. Battery-powered units provide flexibility but require regular charging.
                </p>

                <p>
                  Look for features like low-power modes, battery level monitoring, and backup 
                  power options to ensure consistent tracking capability regardless of power source.
                </p>

                <h2>Mobile App and User Interface</h2>
                <p>
                  The quality of the mobile application significantly impacts user experience. 
                  Evaluate apps based on:
                </p>

                <ul>
                  <li>Intuitive interface design and ease of navigation</li>
                  <li>Real-time map updates and location accuracy</li>
                  <li>Alert customization and notification options</li>
                  <li>Historical data access and reporting features</li>
                  <li>Multi-user access and permission controls</li>
                  <li>Offline functionality and data synchronization</li>
                </ul>

                <h2>Legal and Privacy Considerations</h2>
                <p>
                  Vehicle tracking involves legal and privacy considerations that vary by location. 
                  Ensure you understand local laws regarding GPS tracking, especially for vehicles 
                  used by employees or family members.
                </p>

                <p>
                  Always inform drivers about tracking systems and obtain necessary consent. 
                  Review privacy policies to understand how location data is stored, used, 
                  and shared by the tracking service provider.
                </p>

                <h2>Insurance Benefits</h2>
                <p>
                  Many insurance companies offer discounts for vehicles equipped with approved 
                  tracking devices. These discounts can range from 5-15% of premium costs, 
                  potentially offsetting the tracker's ongoing expenses.
                </p>

                <p>
                  Contact your insurance provider to understand specific requirements and 
                  approved device lists before making a purchase decision.
                </p>

                <h2>Troubleshooting Common Issues</h2>
                <p>
                  Common vehicle tracker issues include GPS signal problems, cellular connectivity 
                  issues, and battery drain. Choose providers that offer comprehensive technical 
                  support and troubleshooting assistance.
                </p>

                <p>
                  Regular maintenance, including software updates and physical inspection, 
                  helps ensure optimal performance and longevity of your tracking system.
                </p>

                <h2>Future-Proofing Your Investment</h2>
                <p>
                  Technology evolves rapidly, so consider future compatibility when selecting 
                  a vehicle tracker. Look for systems that support over-the-air updates, 
                  have established upgrade paths, and come from reputable manufacturers 
                  with long-term support commitments.
                </p>

                <h2>Locotraq's Vehicle Tracking Solutions</h2>
                <p>
                  Locotraq offers comprehensive vehicle tracking solutions designed to meet 
                  diverse needs and budgets. Our systems combine advanced GPS technology 
                  with user-friendly interfaces, reliable cellular connectivity, and exceptional 
                  customer support.
                </p>

                <p>
                  From basic OBD-II trackers for everyday protection to advanced hardwired 
                  systems for high-security applications, Locotraq provides the right solution 
                  for every vehicle and situation. Our experienced team helps you select, 
                  install, and maintain the perfect tracking system for your needs.
                </p>
              </motion.article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Image
                          src={blogPost.author.avatarUrl}
                          alt={blogPost.author.name}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-foreground">{blogPost.author.name}</h4>
                          <p className="text-sm text-muted-foreground">Automotive Security Expert</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        John has over 12 years of experience in automotive security and has helped 
                        thousands of car owners select the perfect tracking solutions.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Share */}
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share this article
                      </h4>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Selection Guide */}
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Quick Selection Guide
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Budget Option:</p>
                          <p className="text-muted-foreground">OBD-II tracker for basic needs</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">High Security:</p>
                          <p className="text-muted-foreground">Hardwired professional installation</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Flexibility:</p>
                          <p className="text-muted-foreground">Battery-powered portable unit</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Fleet Use:</p>
                          <p className="text-muted-foreground">Magnetic trackers for easy deployment</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-4">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {blogPost.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-card border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium">
                        Read More →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Vehicle?</h2>
            <p className="text-xl mb-8 opacity-90">
              Explore Locotraq's comprehensive range of vehicle trackers and find the perfect 
              solution for your car's security and monitoring needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/products">Browse Vehicle Trackers</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-[#333333] text-white hover:bg-white hover:text-[#333333]">
                <Link href="/contact">Get Expert Advice</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}