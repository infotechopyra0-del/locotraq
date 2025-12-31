'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  metaDescription: string;
  category: string;
  publicationDate: string;
  author: {
    name: string;
  };
  featuredImage: string;
  slug: string;
  featured?: boolean;
}

const staticBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Fleet Management: How GPS Tracking is Revolutionizing Logistics",
    content: "Explore how GPS tracking is revolutionizing fleet management, optimizing logistics, and boosting efficiency for businesses with Locotraq's solutions.",
    metaDescription: "Explore how GPS tracking is revolutionizing fleet management, optimizing logistics, and boosting efficiency for businesses with Locotraq's solutions.",
    category: "Fleet Management",
    publicationDate: "2024-03-15",
    author: {
      name: "Sarah Chen"
    },
    featuredImage: "/images/TheFutureofFleetManagement.png",
    slug: "future-of-fleet-management-gps-tracking",
    featured: true
  },
  {
    id: "2",
    title: "Personal Safety On-the-Go: Why You Need a Personal GPS Tracker",
    content: "Learn about the essential role of personal GPS trackers in ensuring safety for individuals and families, featuring Locotraq's reliable devices.",
    metaDescription: "Learn about the essential role of personal GPS trackers in ensuring safety for individuals and families, featuring Locotraq's reliable devices.",
    category: "Personal Safety",
    publicationDate: "2024-02-28",
    author: {
      name: "David Lee"
    },
    featuredImage: "/images/PersonalSafetyOn-the-Go.png",
    slug: "personal-safety-gps-tracker-guide"
  },
  {
    id: "3",
    title: "Asset Tracking 101: Protecting Your Valuable Equipment and Inventory",
    content: "Discover the fundamentals of asset tracking and how it protects valuable equipment and inventory from loss and theft with Locotraq's solutions.",
    metaDescription: "Discover the fundamentals of asset tracking and how it protects valuable equipment and inventory from loss and theft with Locotraq's solutions.",
    category: "Business Solutions",
    publicationDate: "2024-01-20",
    author: {
      name: "Maria Rodriguez"
    },
    featuredImage: "/images/AssetTracking101.png",
    slug: "asset-tracking-101-equipment-inventory"
  },
  {
    id: "4",
    title: "Choosing the Right Vehicle Tracker: A Comprehensive Guide for Car Owners",
    content: "A comprehensive guide for car owners on choosing the right vehicle tracker, covering features, installation, and Locotraq's best options.",
    metaDescription: "A comprehensive guide for car owners on choosing the right vehicle tracker, covering features, installation, and Locotraq's best options.",
    category: "Product Guides",
    publicationDate: "2023-12-05",
    author: {
      name: "John Smith"
    },
    featuredImage: "/images/ChoosingtheRightVehicleTracker.png",
    slug: "choosing-right-vehicle-tracker-guide"
  },
  {
    id: "5",
    title: "Enhancing Business Operations with Advanced GPS Fleet Management Systems",
    content: "Discover how advanced GPS fleet management systems can significantly enhance business operations, efficiency, and profitability with Locotraq.",
    metaDescription: "Discover how advanced GPS fleet management systems can significantly enhance business operations, efficiency, and profitability with Locotraq.",
    category: "Business Solutions",
    publicationDate: "2023-11-10",
    author: {
      name: "Emily White"
    },
    featuredImage: "/images/EnhancingBusinessOperations.png",
    slug: "advanced-gps-fleet-management-systems"
  },
  {
    id: "6",
    title: "The Technology Behind GPS: How Satellite Tracking Works",
    content: "Uncover the fascinating technology behind GPS and satellite tracking, explaining how it works to provide accurate location data for Locotraq devices.",
    metaDescription: "Uncover the fascinating technology behind GPS and satellite tracking, explaining how it works to provide accurate location data for Locotraq devices.",
    category: "Technology",
    publicationDate: "2023-10-25",
    author: {
      name: "Alex Johnson"
    },
    featuredImage: "/images/TheTechnologyBehindGPS.png",
    slug: "technology-behind-gps-satellite-tracking"
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Initialize with static blog posts data
    const sortedPosts = staticBlogPosts.sort((a, b) => {
      const dateA = new Date(a.publicationDate);
      const dateB = new Date(b.publicationDate);
      return dateB.getTime() - dateA.getTime();
    });
    setPosts(sortedPosts);
    setFilteredPosts(sortedPosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.metaDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch {
      return '';
    }
  };

  const truncateContent = (content: string | undefined, maxLength: number = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
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
              Blog & Resources
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Stay updated with the latest insights, tips, and news about GPS tracking technology and industry trends
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-400 mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  size="sm"
                >
                  All
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category || '')}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <span className="font-paragraph text-secondary">
              {filteredPosts.length} articles found
            </span>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12">
          <div className="max-w-400 mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative">
                      <Image
                        src={filteredPosts[0].featuredImage || `https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=featured-blog-post`}
                        alt={filteredPosts[0].title || 'Featured blog post'}
                        width={600}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-soft-gold text-foreground">
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline" className="border-primary text-primary">
                          {filteredPosts[0].category}
                        </Badge>
                        <div className="flex items-center text-sm text-secondary">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(filteredPosts[0].publicationDate)}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                        {filteredPosts[0].title}
                      </h2>
                      
                      <p className="font-paragraph text-secondary mb-6">
                        {filteredPosts[0].metaDescription || truncateContent(filteredPosts[0].content)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-secondary mr-2" />
                          <span className="font-paragraph text-secondary text-sm">
                            {filteredPosts[0].author?.name || 'Locotraq Team'}
                          </span>
                        </div>
                        
                        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Link href={`/blog/${filteredPosts[0].slug || filteredPosts[0].id}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-400 mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.featuredImage || 'https://static.wixstatic.com/media/d1fa15_1ef83c962dbf4c359f228449d51c8e75~mv2.png?originWidth=384&originHeight=192'}
                        alt={post.title || 'Blog post'}
                        width={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.category && (
                        <Badge className="absolute top-3 left-3 bg-soft-gold text-foreground">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center text-sm text-secondary">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(post.publicationDate)}
                        </div>
                        <div className="flex items-center text-sm text-secondary">
                          <User className="h-4 w-4 mr-1" />
                          {post.author?.name || 'Locotraq Team'}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="font-paragraph text-secondary text-sm mb-4 line-clamp-3">
                        {post.metaDescription || truncateContent(post.content)}
                      </p>

                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Link href={`/blog/${post.slug || post.id}`}>
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                No articles found
              </h3>
              <p className="font-paragraph text-secondary">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="border-0 shadow-lg bg-primary text-primary-foreground max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-heading font-bold mb-4">
                  Stay Updated
                </h2>
                <p className="font-paragraph opacity-90 mb-6">
                  Subscribe to our newsletter for the latest GPS tracking insights and industry news
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Enter your email address"
                    className="flex-1 bg-white text-foreground"
                  />
                  <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Popular Topics
            </h2>
            <p className="text-lg font-paragraph text-secondary">
              Explore articles by topic
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Fleet Management',
              'Vehicle Security',
              'GPS Technology',
              'Asset Tracking',
              'Industry Insights',
              'Product Updates',
              'Best Practices',
              'Case Studies'
            ].map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Tag className="mr-2 h-4 w-4" />
                  {topic}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
