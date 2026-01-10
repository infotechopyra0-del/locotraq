'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Eye,
  Heart,
  MessageCircle,
  BookmarkPlus,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TechnologyBehindGPSPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(247);
  const [isLiked, setIsLiked] = useState(false);

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
    readTime: "8 min read",
    views: "12.5K"
  };

  const relatedPosts = [
    {
      title: "The Future of Fleet Management: How GPS Tracking is Revolutionizing Logistics",
      slug: "future-fleet-management-gps-tracking",
      category: "Fleet Management",
      excerpt: "Explore how GPS tracking is revolutionizing fleet management and logistics.",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=300&h=200&fit=crop&q=80",
      readTime: "6 min"
    },
    {
      title: "Choosing the Right Vehicle Tracker: A Comprehensive Guide",
      slug: "choosing-right-vehicle-tracker-guide",
      category: "Product Guides",
      excerpt: "A comprehensive guide for car owners on choosing the right vehicle tracker.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&q=80",
      readTime: "7 min"
    },
    {
      title: "Asset Tracking 101: Protecting Your Equipment",
      slug: "asset-tracking-101",
      category: "Business Solutions",
      excerpt: "Essential guide to protecting your valuable equipment and inventory.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop&q=80",
      readTime: "5 min"
    }
  ];

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Header */}
       <Header />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-gray-900 to-gray-800 text-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="inline-block bg-orange-600 px-4 py-2 rounded-full text-sm font-black shadow-lg">
              {blogPost.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              {blogPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
              {blogPost.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4">
              <div className="flex items-center">
                <img
                  src={blogPost.author.avatarUrl}
                  alt={blogPost.author.name}
                  className="w-12 h-12 rounded-full border-2 border-orange-500 mr-3"
                />
                <div>
                  <div className="font-bold">{blogPost.author.name}</div>
                  <div className="text-sm text-gray-400">Technology Expert</div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                {blogPost.publishedAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="w-4 h-4 mr-2" />
                {blogPost.readTime}
              </div>

              <div className="flex items-center text-sm text-gray-300">
                <Eye className="w-4 h-4 mr-2" />
                {blogPost.views} views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={blogPost.featuredImageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80'}
              alt={blogPost.title}
              className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Article Content */}
            <article className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-12">
                {/* Engagement Bar */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                        isLiked
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
                      {likes}
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold transition-all">
                      <MessageCircle className="w-5 h-5" />
                      34
                    </button>
                  </div>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-full transition-all ${
                      isBookmarked
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <BookmarkPlus className="w-5 h-5" />
                  </button>
                </div>

                {/* Article Text */}
                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    In today's interconnected world, GPS (Global Positioning System) technology has become an integral part of our daily lives. From navigation apps on our smartphones to sophisticated fleet management systems like those offered by Locotraq, GPS technology enables precise location tracking across the globe. But have you ever wondered how this remarkable technology actually works?
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    What is GPS?
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    GPS is a satellite-based navigation system that provides location and time information anywhere on Earth where there is an unobstructed line of sight to four or more GPS satellites. Originally developed by the U.S. Department of Defense for military applications, GPS was made available for civilian use in the 1980s and has since revolutionized navigation, tracking, and timing applications worldwide.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    The GPS Constellation
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    The GPS system consists of a constellation of at least 24 operational satellites orbiting Earth at an altitude of approximately 20,200 kilometers (12,550 miles). These satellites are arranged in six orbital planes, with four satellites in each plane, ensuring that at least four satellites are visible from any point on Earth at any given time.
                  </p>

                  <div className="bg-linear-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-orange-900 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Key GPS Facts
                    </h3>
                    <ul className="space-y-2 text-orange-800">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        Each satellite orbits Earth twice a day
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        Satellites transmit signals at the speed of light
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        The system provides accuracy within 3-5 meters for civilian users
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        Over 31 GPS satellites are currently operational (including spares)
                      </li>
                    </ul>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    How GPS Positioning Works
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    GPS positioning is based on a mathematical principle called trilateration. Here's how it works:
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    1. Signal Transmission
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Each GPS satellite continuously broadcasts signals that include the satellite's location and the precise time the signal was transmitted. These signals travel at the speed of light (approximately 300,000 kilometers per second).
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    2. Time Measurement
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A GPS receiver (like those in Locotraq devices) calculates the time it took for each satellite signal to reach it. By multiplying this travel time by the speed of light, the receiver determines its distance from each satellite.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    3. Trilateration Calculation
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    With distance measurements from at least four satellites, the GPS receiver can calculate its precise three-dimensional position (latitude, longitude, and altitude) using trilateration. The fourth satellite is needed to account for clock synchronization errors.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Factors Affecting GPS Accuracy
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Environmental Factors</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Atmospheric interference
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Weather conditions
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Physical obstructions (buildings, mountains)
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Multipath errors (signal reflections)
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Technical Factors</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Satellite geometry
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Clock synchronization errors
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Receiver quality
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          Signal processing capabilities
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    GPS in Locotraq Devices
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Locotraq's GPS tracking devices leverage advanced GPS technology combined with cellular communication to provide real-time location updates. Our devices incorporate:
                  </p>

                  <ul className="space-y-3 my-6">
                    {[
                      'High-sensitivity GPS receivers for improved signal acquisition',
                      'Multi-GNSS support for enhanced positioning accuracy',
                      'Intelligent power management for extended battery life',
                      'Advanced algorithms for filtering and processing location data',
                      'Seamless integration with cellular networks for data transmission'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-green-900 mb-3">
                      🚀 The Future of GPS Technology
                    </h3>
                    <p className="text-green-800">
                      As technology continues to evolve, we can expect even more accurate and efficient GPS systems. Next-generation satellites, improved signal processing, and integration with other positioning technologies will further enhance the capabilities of GPS tracking devices.
                    </p>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Conclusion
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Understanding the technology behind GPS helps us appreciate the remarkable engineering feat that enables precise location tracking anywhere on Earth. From the constellation of satellites orbiting high above us to the sophisticated receivers in our tracking devices, GPS technology continues to evolve and improve, making applications like Locotraq's tracking solutions more accurate and reliable than ever before.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Whether you're managing a fleet of vehicles, tracking valuable assets, or ensuring the safety of loved ones, GPS technology provides the foundation for reliable, real-time location information that you can trust.
                  </p>
                </div>

                {/* Tags Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 hover:bg-orange-600 hover:text-white text-gray-700 px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Share Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-black text-gray-900 mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2 text-orange-600" />
                    Share Article
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Author Card */}
                <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-6 border border-orange-200">
                  <h3 className="font-black text-gray-900 mb-4">About the Author</h3>
                  <div className="flex items-start space-x-4">
                    <img
                      src={blogPost.author.avatarUrl}
                      alt={blogPost.author.name}
                      className="w-16 h-16 rounded-full border-4 border-orange-500 shadow-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{blogPost.author.name}</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Technology expert and GPS systems specialist with over 10 years of experience in satellite navigation.
                      </p>
                      <button className="mt-3 text-orange-600 hover:text-orange-700 font-bold text-sm flex items-center">
                        Follow
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-black text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((post, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="flex gap-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-24 h-20 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                          />
                          <div className="flex-1">
                            <div className="text-xs font-bold text-orange-600 mb-1">
                              {post.category}
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-orange-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-bold inline-block mb-6">
            🎯 READY TO GET STARTED?
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Experience Advanced GPS Tracking
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how Locotraq's GPS tracking solutions can benefit your business or personal needs with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              View Our Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-black hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}