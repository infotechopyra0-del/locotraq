"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Package, Shield, TrendingUp, Search, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function AssetTrackingPage() {
  const blogPost = {
    title: "Asset Tracking 101: Protecting Your Valuable Equipment and Inventory",
    excerpt: "Discover the fundamentals of asset tracking and how it protects valuable equipment and inventory from loss and theft with Locotraq's solutions.",
    author: {
      name: "Maria Rodriguez",
      email: "maria.rodriguez@locotraq.com",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&q=80"
    },
    publishedAt: new Date("2024-01-20"),
    category: "Business Solutions",
    tags: ["Asset Tracking", "Inventory Management", "Security", "Business", "Equipment"],
    featuredImageUrl: "/images/AssetTracking101.png",
    readTime: "11 min read"
  };

  const benefits = [
    {
      icon: Shield,
      title: "Theft Prevention",
      description: "Real-time alerts and location tracking deter theft and enable quick recovery."
    },
    {
      icon: Search,
      title: "Inventory Visibility",
      description: "Know exactly where every asset is located at any given time."
    },
    {
      icon: TrendingUp,
      title: "Cost Reduction",
      description: "Reduce losses, optimize utilization, and eliminate unnecessary purchases."
    },
    {
      icon: Package,
      title: "Compliance",
      description: "Maintain accurate records for audits and regulatory compliance."
    }
  ];

  const assetTypes = [
    "Construction equipment and machinery",
    "Medical devices and equipment",
    "IT hardware and computers",
    "Manufacturing tools and equipment",
    "Rental equipment and vehicles",
    "Shipping containers and cargo",
    "High-value inventory items",
    "Laboratory equipment and instruments"
  ];

  const trackingFeatures = [
    "Real-time GPS location tracking",
    "Geofencing and boundary alerts",
    "Movement and tamper detection",
    "Battery level monitoring",
    "Historical location reporting",
    "Maintenance scheduling integration",
    "Barcode and QR code scanning",
    "Mobile app for field teams"
  ];

  const industries = [
    {
      name: "Construction",
      description: "Track expensive machinery, tools, and equipment across multiple job sites."
    },
    {
      name: "Healthcare",
      description: "Monitor medical equipment, devices, and supplies throughout facilities."
    },
    {
      name: "Manufacturing",
      description: "Manage production equipment, tools, and raw materials efficiently."
    },
    {
      name: "Logistics",
      description: "Track containers, pallets, and high-value shipments in transit."
    },
    {
      name: "Education",
      description: "Monitor laptops, tablets, and equipment across campus locations."
    },
    {
      name: "Government",
      description: "Track assets across departments and ensure accountability."
    }
  ];

  const relatedPosts = [
    {
      title: "The Future of Fleet Management: How GPS Tracking is Revolutionizing Logistics",
      slug: "future-of-fleet-management-gps-tracking",
      category: "Fleet Management",
      excerpt: "Explore how GPS tracking is revolutionizing fleet management and logistics.",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=300&h=200&fit=crop&q=80"
    },
    {
      title: "Personal Safety On-the-Go: Why You Need a Personal GPS Tracker",
      slug: "personal-safety-gps-tracker-guide",
      category: "Personal Safety",
      excerpt: "Learn about the essential role of personal GPS trackers in ensuring safety.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=200&fit=crop&q=80"
    }
  ];

  const shareUrl = "https://locotraq.com/blog/asset-tracking-101-equipment-inventory";
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
                <h2>What is Asset Tracking?</h2>
                <p>
                  Asset tracking is the method of monitoring physical assets throughout their lifecycle, 
                  from acquisition to disposal. Using various technologies including GPS, RFID, and 
                  barcode systems, businesses can maintain real-time visibility of their valuable 
                  equipment, inventory, and resources.
                </p>

                <p>
                  Modern asset tracking goes beyond simple location monitoring. It encompasses comprehensive 
                  asset management including utilization tracking, maintenance scheduling, compliance 
                  monitoring, and security protection. This holistic approach helps organizations optimize 
                  their asset investments while minimizing losses and operational inefficiencies.
                </p>

                <h2>Why Asset Tracking Matters</h2>
                <p>
                  In today's business environment, organizations face increasing pressure to optimize 
                  operations while controlling costs. Asset tracking addresses several critical business 
                  challenges that can significantly impact profitability and operational efficiency.
                </p>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="p-6">
                      <CardContent className="p-0">
                        <div className="flex items-start space-x-4">
                          <div className="shrink-0">
                            <benefit.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2>Common Asset Tracking Challenges</h2>
                <p>
                  Without proper asset tracking systems, organizations frequently encounter costly problems:
                </p>

                <ul>
                  <li><strong>Asset Loss:</strong> Equipment goes missing or is stolen without detection</li>
                  <li><strong>Inefficient Utilization:</strong> Assets sit idle while others are overused</li>
                  <li><strong>Maintenance Issues:</strong> Equipment breaks down due to missed maintenance</li>
                  <li><strong>Compliance Failures:</strong> Inability to provide audit trails for regulated assets</li>
                  <li><strong>Inventory Inaccuracy:</strong> Discrepancies between records and actual assets</li>
                  <li><strong>Time Waste:</strong> Employees spend excessive time searching for equipment</li>
                </ul>

                <h2>Types of Assets to Track</h2>
                <p>
                  Asset tracking is valuable across diverse industries and asset types. The key is 
                  identifying which assets provide the greatest value when tracked:
                </p>

                <div className="not-prose my-8">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Common Tracked Assets</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assetTypes.map((asset, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{asset}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2>Asset Tracking Technologies</h2>
                <p>
                  Modern asset tracking employs various technologies, each with specific advantages 
                  depending on the tracking requirements:
                </p>

                <h3>GPS Tracking</h3>
                <p>
                  Global Positioning System (GPS) tracking provides real-time location data for assets, 
                  making it ideal for mobile equipment, vehicles, and assets that move between locations. 
                  GPS trackers can operate independently and provide location updates via cellular networks.
                </p>

                <h3>RFID Technology</h3>
                <p>
                  Radio Frequency Identification (RFID) uses electromagnetic fields to identify and 
                  track tags attached to assets. RFID is excellent for inventory management and 
                  tracking assets within defined areas like warehouses or facilities.
                </p>

                <h3>Barcode and QR Codes</h3>
                <p>
                  Barcode and QR code systems provide cost-effective asset identification and tracking. 
                  While requiring manual scanning, these systems integrate well with existing inventory 
                  management processes and mobile applications.
                </p>

                <h3>Bluetooth and Wi-Fi</h3>
                <p>
                  Bluetooth Low Energy (BLE) and Wi-Fi tracking are ideal for indoor asset tracking 
                  and proximity detection. These technologies work well in controlled environments 
                  and can provide location accuracy within buildings.
                </p>

                <h2>Key Features of Asset Tracking Systems</h2>

                <div className="not-prose my-8">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Essential Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {trackingFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2>Industry Applications</h2>
                <p>
                  Asset tracking solutions are tailored to meet the specific needs of different industries:
                </p>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                  {industries.map((industry, index) => (
                    <Card key={index} className="p-4">
                      <CardContent className="p-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{industry.name}</h3>
                        <p className="text-sm text-muted-foreground">{industry.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2>Implementation Best Practices</h2>
                <p>
                  Successful asset tracking implementation requires careful planning and execution:
                </p>

                <h3>1. Asset Assessment and Prioritization</h3>
                <p>
                  Begin by conducting a comprehensive audit of your assets. Identify high-value, 
                  frequently moved, or critical assets that would benefit most from tracking. 
                  Prioritize implementation based on potential ROI and risk reduction.
                </p>

                <h3>2. Technology Selection</h3>
                <p>
                  Choose tracking technologies that align with your specific requirements. Consider 
                  factors such as indoor vs. outdoor tracking needs, required accuracy, battery life, 
                  and integration with existing systems.
                </p>

                <h3>3. System Integration</h3>
                <p>
                  Ensure your asset tracking system integrates seamlessly with existing business 
                  systems such as ERP, inventory management, and maintenance scheduling software. 
                  Integration eliminates data silos and improves operational efficiency.
                </p>

                <h3>4. Staff Training and Adoption</h3>
                <p>
                  Provide comprehensive training to ensure staff understand how to use the system 
                  effectively. Focus on demonstrating the benefits and value the system brings 
                  to their daily work routines.
                </p>

                <h2>Measuring ROI and Success</h2>
                <p>
                  Asset tracking systems typically deliver measurable returns on investment through:
                </p>

                <ul>
                  <li><strong>Reduced Asset Loss:</strong> 60-80% reduction in theft and misplacement</li>
                  <li><strong>Improved Utilization:</strong> 15-25% increase in asset utilization rates</li>
                  <li><strong>Maintenance Savings:</strong> 20-30% reduction in maintenance costs</li>
                  <li><strong>Labor Efficiency:</strong> 40-50% reduction in time spent searching for assets</li>
                  <li><strong>Compliance Benefits:</strong> Elimination of audit findings and penalties</li>
                </ul>

                <h2>Future Trends in Asset Tracking</h2>
                <p>
                  Asset tracking technology continues to evolve with emerging trends including:
                </p>

                <ul>
                  <li><strong>AI and Machine Learning:</strong> Predictive analytics for maintenance and utilization optimization</li>
                  <li><strong>IoT Integration:</strong> Enhanced sensor capabilities for condition monitoring</li>
                  <li><strong>Blockchain:</strong> Immutable asset history and ownership records</li>
                  <li><strong>5G Connectivity:</strong> Enhanced real-time tracking capabilities</li>
                  <li><strong>Edge Computing:</strong> Faster local data processing and decision making</li>
                </ul>

                <h2>Security and Privacy Considerations</h2>
                <p>
                  Asset tracking systems must incorporate robust security measures to protect 
                  sensitive business data. Key considerations include data encryption, secure 
                  communication protocols, access controls, and compliance with privacy regulations.
                </p>

                <p>
                  Regular security audits and updates ensure the system remains protected against 
                  evolving cyber threats while maintaining the confidentiality of asset location 
                  and operational data.
                </p>

                <h2>Getting Started with Asset Tracking</h2>
                <p>
                  When beginning your asset tracking journey, start with a pilot program focusing 
                  on your most critical or high-value assets. This approach allows you to 
                  demonstrate value quickly while learning best practices for broader implementation.
                </p>

                <p>
                  Locotraq offers comprehensive asset tracking solutions designed to meet the 
                  diverse needs of modern businesses. Our systems combine advanced GPS technology 
                  with user-friendly interfaces and robust reporting capabilities to deliver 
                  maximum value from day one.
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
                          <p className="text-sm text-muted-foreground">Asset Management Specialist</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Maria has over 8 years of experience in asset management and has helped 
                        numerous organizations implement successful tracking solutions.
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
            <h2 className="text-3xl font-bold mb-4">Protect Your Valuable Assets</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover how Locotraq's asset tracking solutions can help you monitor, 
              protect, and optimize your valuable equipment and inventory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/products">View Asset Trackers</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-[#333333] text-white hover:bg-white hover:text-[#333333]">
                <Link href="/contact">Get Asset Assessment</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}