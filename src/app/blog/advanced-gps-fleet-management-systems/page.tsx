"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function AdvancedGPSFleetManagementPage() {
  const blogPost = {
    title: "Advanced GPS Fleet Management Systems: Transforming Modern Business Operations",
    excerpt: "Discover how advanced GPS fleet management systems are revolutionizing business operations, reducing costs, and improving efficiency across industries.",
    author: {
      name: "Michael Rodriguez",
      email: "michael.rodriguez@locotraq.com",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80"
    },
    publishedAt: new Date("2024-03-20"),
    category: "Fleet Management",
    tags: ["Fleet Management", "GPS", "Business", "Operations", "Technology", "ROI"],
    featuredImageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=400&fit=crop&q=80",
    readTime: "12 min read"
  };

  const relatedPosts = [
    {
      title: "The Technology Behind GPS: How Satellite Tracking Works",
      slug: "technology-behind-gps-satellite-tracking",
      category: "Technology",
      excerpt: "Uncover the fascinating technology behind GPS and satellite tracking.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop&q=80"
    },
    {
      title: "Choosing the Right Vehicle Tracker: A Comprehensive Guide",
      slug: "choosing-right-vehicle-tracker-guide",
      category: "Product Guides",
      excerpt: "A comprehensive guide for car owners on choosing the right vehicle tracker.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&q=80"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Cost Reduction",
      description: "Reduce fuel costs by up to 25% through optimized routing and reduced idle time."
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Real-time theft alerts and recovery capabilities protect valuable assets."
    },
    {
      icon: Zap,
      title: "Improved Efficiency",
      description: "Streamline operations with automated reporting and route optimization."
    },
    {
      icon: CheckCircle,
      title: "Compliance Management",
      description: "Maintain regulatory compliance with automated logging and reporting."
    }
  ];

  const features = [
    "Real-time GPS tracking with 10-second update intervals",
    "Advanced geofencing with custom zones and alerts",
    "Driver behavior monitoring and scoring",
    "Maintenance scheduling and alerts",
    "Fuel consumption tracking and optimization",
    "Route planning and optimization algorithms",
    "Comprehensive reporting and analytics dashboard",
    "Mobile app for drivers and managers",
    "Integration with existing business systems",
    "24/7 monitoring and support"
  ];

  const shareUrl = "https://locotraq.com/blog/advanced-gps-fleet-management-systems";
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
                <h2>The Evolution of Fleet Management</h2>
                <p>
                  In today's fast-paced business environment, efficient fleet management has become a critical competitive advantage. 
                  Advanced GPS fleet management systems have evolved far beyond simple vehicle tracking, offering comprehensive 
                  solutions that transform how businesses operate, optimize costs, and serve their customers.
                </p>

                <p>
                  Modern fleet management systems integrate cutting-edge GPS technology with sophisticated analytics, 
                  artificial intelligence, and real-time communication capabilities. These systems provide unprecedented 
                  visibility into fleet operations, enabling data-driven decisions that significantly impact the bottom line.
                </p>

                <h2>Key Benefits of Advanced GPS Fleet Management</h2>
                
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

                <h2>Core Features of Modern Fleet Management Systems</h2>
                <p>
                  Today's advanced GPS fleet management systems offer a comprehensive suite of features designed to 
                  address every aspect of fleet operations:
                </p>

                <div className="not-prose my-8">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Essential Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2>Real-Time Tracking and Monitoring</h2>
                <p>
                  The foundation of any advanced fleet management system is its real-time tracking capability. 
                  Modern GPS trackers provide location updates every 10 seconds, offering unprecedented visibility 
                  into vehicle movements, stops, and routes.
                </p>

                <p>
                  This real-time data enables fleet managers to make immediate decisions, respond to emergencies, 
                  optimize routes on the fly, and provide accurate customer updates. The system's ability to 
                  monitor vehicle status, including engine diagnostics, fuel levels, and driver behavior, 
                  creates a comprehensive operational picture.
                </p>

                <h2>Advanced Analytics and Reporting</h2>
                <p>
                  Modern fleet management systems excel in data collection and analysis. They generate comprehensive 
                  reports on fuel consumption, driver performance, vehicle utilization, maintenance schedules, 
                  and route efficiency. This data-driven approach enables businesses to identify trends, 
                  optimize operations, and make informed strategic decisions.
                </p>

                <p>
                  Advanced analytics can predict maintenance needs, identify inefficient routes, and highlight 
                  opportunities for cost savings. Machine learning algorithms continuously improve system 
                  performance by learning from historical data and operational patterns.
                </p>

                <h2>Driver Behavior Monitoring</h2>
                <p>
                  One of the most valuable features of advanced GPS fleet management systems is comprehensive 
                  driver behavior monitoring. These systems track acceleration patterns, braking habits, 
                  speed compliance, and idle time to generate driver scorecards.
                </p>

                <p>
                  This monitoring capability not only improves safety but also reduces fuel consumption, 
                  minimizes vehicle wear and tear, and can lower insurance premiums. Many businesses report 
                  significant improvements in driver behavior within weeks of implementation.
                </p>

                <h2>Geofencing and Automated Alerts</h2>
                <p>
                  Advanced geofencing capabilities allow fleet managers to create virtual boundaries around 
                  specific locations, routes, or regions. The system automatically generates alerts when 
                  vehicles enter or exit these zones, enabling proactive management and enhanced security.
                </p>

                <p>
                  Automated alerts extend beyond geofencing to include maintenance reminders, speed violations, 
                  unauthorized vehicle use, and emergency situations. This proactive approach helps prevent 
                  issues before they become costly problems.
                </p>

                <h2>ROI and Cost Savings</h2>
                <p>
                  Businesses implementing advanced GPS fleet management systems typically see significant 
                  return on investment within the first year. Common cost savings include:
                </p>

                <ul>
                  <li><strong>Fuel Savings:</strong> 15-25% reduction through route optimization and behavior monitoring</li>
                  <li><strong>Maintenance Costs:</strong> 20-30% reduction through predictive maintenance</li>
                  <li><strong>Insurance Premiums:</strong> 10-15% reduction due to improved safety records</li>
                  <li><strong>Administrative Costs:</strong> 40-50% reduction through automated reporting</li>
                  <li><strong>Overtime Costs:</strong> 15-20% reduction through improved efficiency</li>
                </ul>

                <h2>Integration and Scalability</h2>
                <p>
                  Modern fleet management systems are designed to integrate seamlessly with existing business 
                  systems including ERP, CRM, and accounting software. This integration eliminates data silos 
                  and creates a unified operational platform.
                </p>

                <p>
                  Cloud-based solutions offer unlimited scalability, allowing businesses to easily add vehicles, 
                  expand to new locations, or incorporate additional features as they grow. The system grows 
                  with the business, ensuring long-term value.
                </p>

                <h2>Future Trends in Fleet Management</h2>
                <p>
                  The future of fleet management is being shaped by emerging technologies including artificial 
                  intelligence, machine learning, IoT sensors, and autonomous vehicles. These technologies 
                  promise even greater efficiency, safety, and cost savings.
                </p>

                <p>
                  Electric vehicle integration, predictive analytics, and enhanced driver assistance systems 
                  will continue to evolve, making fleet management more sophisticated and valuable for businesses 
                  across all industries.
                </p>

                <h2>Choosing the Right Fleet Management Solution</h2>
                <p>
                  When selecting an advanced GPS fleet management system, consider factors such as scalability, 
                  integration capabilities, user interface design, customer support, and total cost of ownership. 
                  The best solution should align with your specific business needs and growth objectives.
                </p>

                <p>
                  Locotraq's advanced fleet management solutions combine cutting-edge GPS technology with 
                  comprehensive analytics, user-friendly interfaces, and exceptional customer support to 
                  deliver maximum value for businesses of all sizes.
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
                          <p className="text-sm text-muted-foreground">Fleet Management Expert</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Michael specializes in fleet optimization and has helped hundreds of businesses 
                        reduce costs and improve efficiency through advanced GPS tracking solutions.
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
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fleet Management?</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover how Locotraq's advanced GPS fleet management solutions can reduce costs, 
              improve efficiency, and enhance your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/products">Explore Our Solutions</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-[#333333] text-white hover:bg-white hover:text-[#333333]">
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}