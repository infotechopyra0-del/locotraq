'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Tag, Clock, TrendingUp, Filter, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
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

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.metaDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  };

  const truncateContent = (content: string | undefined, maxLength: number = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const popularTopics = [
    'Fleet Management',
    'Vehicle Security',
    'GPS Technology',
    'Asset Tracking',
    'Industry Insights',
    'Product Updates',
    'Best Practices',
    'Case Studies'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-orange-600 to-orange-500 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              📚 LOCOTRAQ BLOG
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              GPS Tracking Insights & News
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Stay updated with the latest insights, tips, and industry trends in GPS tracking technology
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-6 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-black text-orange-600">{filteredPosts.length}</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Articles</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-black text-orange-600">{categories.length}</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Categories</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-black text-orange-600">10K+</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Monthly Readers</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-black text-orange-600">Weekly</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-4 md:py-6 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2 flex-wrap flex-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  selectedCategory === 'all'
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Articles
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category || '')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold w-full justify-center"
            >
              <Filter className="w-4 h-4" />
              Filters {selectedCategory !== 'all' && '(1)'}
            </button>

            <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="hidden sm:inline">{filteredPosts.length} articles found</span>
              <span className="sm:hidden">{filteredPosts.length} results</span>
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {showMobileFilters && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-900">Filter by Category</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setShowMobileFilters(false);
                  }}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm ${
                    selectedCategory === 'all'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category || '');
                      setShowMobileFilters(false);
                    }}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">Featured Article</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={filteredPosts[0].featuredImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'}
                    alt={filteredPosts[0].title || 'Featured blog post'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-black shadow-lg">
                    ⭐ FEATURED
                  </div>
                </div>
                
                <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold mb-4 self-start">
                    {filteredPosts[0].category}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    {filteredPosts[0].title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 text-base md:text-lg">
                    {filteredPosts[0].metaDescription || truncateContent(filteredPosts[0].content)}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(filteredPosts[0].publicationDate)}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {filteredPosts[0].author?.name || 'Locotraq Team'}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      5 min read
                    </div>
                  </div>
                  
                  <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 flex items-center justify-center group shadow-lg">
                    Read Full Article
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Latest Articles</h2>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.featuredImage || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80'}
                      alt={post.title || 'Blog post'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {post.category && (
                      <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                        {post.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.publicationDate)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        5 min
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.metaDescription || truncateContent(post.content)}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-2" />
                        {post.author?.name || 'Locotraq'}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                      <button className="text-orange-600 font-bold text-sm flex items-center group-hover:text-orange-700">
                        Read
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-g-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              📧 STAY UPDATED
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-black-300 text-lg mb-8">
              Get the latest GPS tracking insights and industry news delivered to your inbox weekly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-black-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-300"
              />
              <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Popular Topics
            </h2>
            <p className="text-gray-600 text-lg">
              Explore articles by topic
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {popularTopics.map((topic, index) => (
              <button
                key={index}
                className="bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-bold transition-all transform hover:scale-105 flex items-center text-sm md:text-base shadow-sm hover:shadow-lg"
              >
                <Tag className="mr-2 w-4 h-4" />
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-linear-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Start Tracking?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Discover our range of GPS tracking solutions for vehicles, assets, and personal safety
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Shop Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}