"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Heart, Shield, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function PersonalSafetyTrackerPage() {
  const blogPost = {
    title: "Personal Safety On-the-Go: Why You Need a Personal GPS Tracker",
    excerpt: "Learn about the essential role of personal GPS trackers in ensuring safety for individuals and families, featuring Locotraq's reliable devices.",
    author: {
      name: "David Lee",
      email: "david.lee@locotraq.com",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&q=80"
    },
    publishedAt: new Date("2024-02-28"),
    category: "Personal Safety",
    tags: ["Personal Safety", "GPS Tracker", "Family Safety", "Emergency", "Security"],
    featuredImageUrl: "/images/PersonalSafetyOn-the-Go.png",
    readTime: "9 min read"
  };

  const safetyFeatures = [
    {
      icon: Shield,
      title: "24/7 Protection",
      description: "Round-the-clock monitoring and emergency response capabilities."
    },
    {
      icon: MapPin,
      title: "Real-Time Location",
      description: "Instant location sharing with family members and emergency contacts."
    },
    {
      icon: Phone,
      title: "Emergency Alerts",
      description: "One-button SOS alerts that notify emergency services and contacts."
    },
    {
      icon: Heart,
      title: "Peace of Mind",
      description: "Confidence for both the wearer and their loved ones."
    }
  ];

  const useCases = [
    "Elderly family members living independently",
    "Children walking to school or playing outdoors",
    "Teenagers driving for the first time",
    "Solo travelers and hikers",
    "Healthcare workers on night shifts",
    "Runners and cyclists",
    "People with medical conditions",
    "Workers in remote locations"
  ];

  const features = [
    "GPS + GLONASS positioning for accuracy",
    "Two-way communication capabilities",
    "Geofencing with custom safe zones",
    "Fall detection and automatic alerts",
    "Water-resistant design",
    "Long battery life (up to 7 days)",
    "Mobile app for family monitoring",
    "Emergency contact management"
  ];

  const relatedPosts = [
    {
      title: "Choosing the Right Vehicle Tracker: A Comprehensive Guide for Car Owners",
      slug: "choosing-right-vehicle-tracker-guide",
      category: "Product Guides",
      excerpt: "A comprehensive guide for car owners on choosing the right vehicle tracker.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&q=80"
    },
    {
      title: "Asset Tracking 101: Protecting Your Valuable Equipment and Inventory",
      slug: "asset-tracking-101-equipment-inventory",
      category: "Business Solutions",
      excerpt: "Discover the fundamentals of asset tracking and how it protects valuable equipment.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&q=80"
    }
  ];

  const shareUrl = "https://locotraq.com/blog/personal-safety-gps-tracker-guide";
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
                <h2>The Growing Need for Personal Safety</h2>
                <p>
                  In today's fast-paced world, personal safety has become a paramount concern for individuals 
                  and families alike. Whether it's an elderly parent living independently, a teenager going 
                  to school, or someone who frequently travels alone, the ability to stay connected and 
                  summon help when needed has never been more important.
                </p>

                <p>
                  Personal GPS trackers have emerged as a powerful solution, offering peace of mind to both 
                  the wearer and their loved ones. These compact, user-friendly devices provide real-time 
                  location tracking, emergency communication, and automated safety features that can be 
                  life-saving in critical situations.
                </p>

                <h2>Key Benefits of Personal GPS Trackers</h2>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {safetyFeatures.map((feature, index) => (
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

                <h2>Who Benefits from Personal GPS Trackers?</h2>
                <p>
                  Personal GPS trackers are valuable for a wide range of individuals and situations. 
                  The versatility of these devices makes them suitable for various demographics and use cases:
                </p>

                <div className="not-prose my-8">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Common Use Cases</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {useCases.map((useCase, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2>Essential Features to Look For</h2>
                <p>
                  When choosing a personal GPS tracker, it's important to consider features that align 
                  with your specific safety needs. Modern personal GPS trackers offer a comprehensive 
                  suite of features designed to provide maximum protection and peace of mind.
                </p>

                <div className="not-prose my-8">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Core Features</h3>
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

                <h2>How Personal GPS Trackers Work</h2>
                <p>
                  Personal GPS trackers utilize Global Positioning System (GPS) satellites to determine 
                  precise location coordinates. These coordinates are then transmitted via cellular networks 
                  to monitoring applications or emergency services, depending on the device configuration.
                </p>

                <p>
                  Modern devices often combine GPS with other positioning technologies like GLONASS, 
                  Galileo, or Wi-Fi positioning to improve accuracy, especially in urban environments 
                  or indoor locations where GPS signals might be weak.
                </p>

                <h2>Emergency Response Capabilities</h2>
                <p>
                  One of the most critical features of personal GPS trackers is their emergency response 
                  capability. Most devices include a dedicated SOS button that, when pressed, immediately 
                  alerts emergency contacts and can contact emergency services directly.
                </p>

                <p>
                  Advanced models feature automatic fall detection, which uses accelerometers and 
                  gyroscopes to detect sudden impacts or falls. If a fall is detected and the user 
                  doesn't respond within a specified timeframe, the device automatically sends an 
                  emergency alert with the user's location.
                </p>

                <h2>Geofencing for Added Security</h2>
                <p>
                  Geofencing technology allows families to create virtual boundaries around specific 
                  locations such as home, school, or work. When the tracker enters or exits these 
                  predefined zones, automatic notifications are sent to designated contacts.
                </p>

                <p>
                  This feature is particularly valuable for monitoring elderly family members, ensuring 
                  children arrive safely at their destinations, or being alerted if someone leaves 
                  a safe area unexpectedly.
                </p>

                <h2>Two-Way Communication</h2>
                <p>
                  Many modern personal GPS trackers include two-way communication capabilities, allowing 
                  the wearer to speak directly with emergency contacts or monitoring services. This 
                  feature transforms the device from a simple tracker into a mobile communication tool.
                </p>

                <p>
                  Voice communication can be crucial in emergency situations, allowing the user to 
                  provide context about their situation and receive guidance or reassurance from 
                  family members or emergency responders.
                </p>

                <h2>Battery Life and Charging</h2>
                <p>
                  Battery life is a critical consideration for personal GPS trackers. The best devices 
                  offer several days of use on a single charge, with some models lasting up to a week 
                  with typical usage patterns.
                </p>

                <p>
                  Look for devices with low battery alerts that notify both the user and emergency 
                  contacts when charging is needed. Some trackers also offer power-saving modes that 
                  extend battery life by reducing update frequency when the device is stationary.
                </p>

                <h2>Privacy and Data Security</h2>
                <p>
                  Personal GPS trackers collect sensitive location data, making privacy and security 
                  paramount concerns. Choose devices from reputable manufacturers that implement 
                  strong encryption for data transmission and storage.
                </p>

                <p>
                  Ensure the device allows you to control who has access to location data and provides 
                  options to delete historical tracking information. The monitoring application should 
                  also include secure login features like two-factor authentication.
                </p>

                <h2>Choosing the Right Device</h2>
                <p>
                  When selecting a personal GPS tracker, consider the specific needs of the intended user. 
                  Factors to evaluate include:
                </p>

                <ul>
                  <li><strong>User Age and Mobility:</strong> Seniors may need larger buttons and simplified interfaces</li>
                  <li><strong>Activity Level:</strong> Active users need water-resistant, durable designs</li>
                  <li><strong>Technology Comfort:</strong> Consider how comfortable the user is with technology</li>
                  <li><strong>Coverage Area:</strong> Ensure the device works well in your geographic region</li>
                  <li><strong>Emergency Contacts:</strong> Number of contacts the device can notify</li>
                  <li><strong>Monitoring Preferences:</strong> Whether family monitoring or professional services are preferred</li>
                </ul>

                <h2>Installation and Setup</h2>
                <p>
                  Modern personal GPS trackers are designed for easy setup and use. Most devices require 
                  minimal technical knowledge and can be activated within minutes of unboxing. The setup 
                  process typically involves:
                </p>

                <ol>
                  <li>Installing the mobile application on smartphones</li>
                  <li>Creating user accounts and emergency contact lists</li>
                  <li>Pairing the device with the monitoring application</li>
                  <li>Setting up geofencing zones and alert preferences</li>
                  <li>Testing emergency features to ensure proper operation</li>
                </ol>

                <h2>Cost Considerations</h2>
                <p>
                  Personal GPS trackers typically involve both initial device costs and ongoing 
                  service fees. While the upfront investment may seem significant, the peace of 
                  mind and potential life-saving capabilities often justify the expense.
                </p>

                <p>
                  Consider the total cost of ownership, including monthly service fees, when 
                  comparing options. Some providers offer family plans or discounts for multiple 
                  devices, which can be cost-effective for families with multiple users.
                </p>

                <h2>The Locotraq Advantage</h2>
                <p>
                  Locotraq's personal GPS trackers combine advanced technology with user-friendly 
                  design to provide comprehensive safety solutions. Our devices offer reliable 
                  tracking, long battery life, and responsive customer support to ensure you and 
                  your loved ones stay safe and connected.
                </p>

                <p>
                  With features like automatic fall detection, two-way communication, and 24/7 
                  monitoring capabilities, Locotraq devices provide the peace of mind that comes 
                  from knowing help is always just a button press away.
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
                          <p className="text-sm text-muted-foreground">Personal Safety Expert</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        David specializes in personal safety technology and has helped countless 
                        families implement effective safety solutions for their loved ones.
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
            <h2 className="text-3xl font-bold mb-4">Protect What Matters Most</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover Locotraq's personal GPS trackers and give yourself and your loved ones 
              the gift of safety and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/products">View Personal Trackers</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-[#333333] text-white hover:bg-white hover:text-[#333333]">
                <Link href="/contact">Get Safety Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}