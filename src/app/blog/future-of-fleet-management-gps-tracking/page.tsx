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
  ChevronRight,
  Truck,
  Zap,
  BarChart3,
  Shield,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FutureFleetManagementPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(412);
  const [isLiked, setIsLiked] = useState(false);

  const blogPost = {
    title: "The Future of Fleet Management: How GPS Tracking is Revolutionizing Logistics",
    excerpt: "Explore how GPS tracking is revolutionizing fleet management, optimizing logistics, and boosting efficiency for businesses with Locotraq's solutions.",
    author: {
      name: "Sarah Chen",
      email: "sarah.chen@locotraq.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b9c29cb5?w=150&h=150&fit=crop&crop=face&q=80"
    },
    publishedAt: new Date("2024-03-15"),
    category: "Fleet Management",
    tags: ["Fleet Management", "GPS Tracking", "Logistics", "Technology", "Business Optimization"],
    featuredImageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80",
    readTime: "10 min read",
    views: "18.7K"
  };

  const futureFeatures = [
    {
      icon: Truck,
      title: "Autonomous Fleet Integration",
      description: "Seamless integration with self-driving vehicles and automated logistics systems."
    },
    {
      icon: Zap,
      title: "AI-Powered Optimization",
      description: "Machine learning algorithms that continuously optimize routes and operations."
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Advanced forecasting for maintenance, demand, and operational challenges."
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Biometric access controls and advanced theft prevention systems."
    }
  ];

  const currentBenefits = [
    "Reduce fuel costs by 15-25% through route optimization",
    "Improve driver safety and reduce accidents by 20-30%",
    "Increase vehicle utilization by 25-35%",
    "Enhance customer service with accurate delivery estimates",
    "Streamline maintenance schedules and reduce downtime"
  ];

  const futureExpectations = [
    "Fully integrated IoT ecosystems that monitor every aspect of fleet operations",
    "AI-powered systems that make autonomous decisions about routing and scheduling",
    "Seamless integration between human-driven and autonomous vehicles",
    "Real-time optimization that adapts to changing conditions instantly",
    "Predictive maintenance that eliminates unexpected breakdowns",
    "Enhanced safety systems that virtually eliminate accidents",
    "Sustainable operations that minimize environmental impact"
  ];

  const preparationChecklist = [
    "Open APIs for integration with emerging technologies",
    "Cloud-based architecture that can scale with your business",
    "Regular software updates and feature additions",
    "Strong cybersecurity and data protection measures",
    "Comprehensive support and training programs"
  ];

  const relatedPosts = [
    {
      title: "Advanced GPS Fleet Management Systems",
      slug: "advanced-gps-fleet-management-systems",
      category: "Fleet Management",
      excerpt: "Discover how advanced GPS fleet management systems are revolutionizing business operations.",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=300&h=200&fit=crop&q=80",
      readTime: "8 min"
    },
    {
      title: "The Technology Behind GPS: How Satellite Tracking Works",
      slug: "technology-behind-gps-satellite-tracking",
      category: "Technology",
      excerpt: "Uncover the fascinating technology behind GPS and satellite tracking.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop&q=80",
      readTime: "8 min"
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
            {/* Back Button */}
            <button className="flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </button>

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
                  <div className="text-sm text-gray-400">Logistics Technology Expert</div>
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
              src={blogPost.featuredImageUrl}
              alt={blogPost.title}
              className="w-full h-64 md:h-96 lg:h-125 object-cover"
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
                      56
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
                    The logistics and transportation industry is experiencing an unprecedented transformation. GPS tracking technology, once a luxury for large enterprises, has become an essential tool for businesses of all sizes. As we look toward the future, fleet management is evolving beyond simple vehicle tracking to become a comprehensive ecosystem of connected, intelligent solutions.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Modern fleet management systems are no longer just about knowing where your vehicles are. They're about optimizing every aspect of your operation, from fuel consumption and maintenance schedules to driver performance and customer satisfaction. This evolution is creating new opportunities for businesses to reduce costs, improve efficiency, and deliver superior service.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Current State of GPS Fleet Tracking
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Today's GPS fleet management systems provide real-time visibility into vehicle location, driver behavior, fuel consumption, and maintenance needs. These systems have already proven their value by helping businesses achieve significant improvements across multiple operational areas.
                  </p>

                  <div className="bg-linear-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-blue-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Current Benefits
                    </h3>
                    <div className="space-y-3">
                      {currentBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                          <span className="text-blue-800 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    However, we're only scratching the surface of what's possible. The future holds even more transformative technologies that will reshape how we think about fleet management and logistics.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Emerging Technologies Shaping the Future
                  </h2>

                  {/* Future Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {futureFeatures.map((feature, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className="shrink-0 bg-orange-100 p-3 rounded-lg">
                            <feature.icon className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h4>
                            <p className="text-sm text-gray-700">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Artificial Intelligence and Machine Learning
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    AI and machine learning are already beginning to transform fleet management. These technologies enable predictive analytics that can forecast maintenance needs, optimize routes in real-time, and identify patterns that human operators might miss.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Future AI systems will be able to automatically adjust routes based on traffic conditions, weather forecasts, and delivery priorities. They'll predict when vehicles need maintenance before problems occur, and they'll optimize driver schedules to maximize efficiency while ensuring compliance with regulations.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Internet of Things (IoT) Integration
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    The proliferation of IoT sensors is creating new opportunities for fleet management. Modern vehicles are becoming mobile data centers, equipped with sensors that monitor everything from engine performance and tire pressure to cargo temperature and humidity.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    This sensor data, combined with GPS tracking, creates a comprehensive picture of fleet operations. Fleet managers can monitor not just where their vehicles are, but how they're performing, what condition the cargo is in, and whether drivers are following safety protocols.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Autonomous and Semi-Autonomous Vehicles
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    While fully autonomous commercial vehicles are still years away from widespread adoption, semi-autonomous features are already being integrated into fleet vehicles. These include adaptive cruise control, automatic emergency braking, and lane departure warnings.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Future fleet management systems will need to seamlessly integrate human-driven and autonomous vehicles. This will require new approaches to routing, scheduling, and monitoring that can handle the unique characteristics of both vehicle types.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Enhanced Driver Safety and Training
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Future GPS tracking systems will incorporate advanced driver assistance systems (ADAS) and biometric monitoring to enhance safety. These systems will monitor driver fatigue, distraction, and stress levels, providing real-time alerts and interventions when necessary.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Virtual reality and augmented reality technologies will revolutionize driver training, allowing fleet operators to provide immersive, scenario-based training that prepares drivers for real-world challenges without the associated risks.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Environmental Sustainability
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    As businesses focus increasingly on sustainability, fleet management systems will play a crucial role in reducing environmental impact. Future systems will optimize routes not just for efficiency, but also for minimal emissions.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Electric vehicle integration will become standard, with fleet management systems monitoring battery levels, optimizing charging schedules, and ensuring vehicles have sufficient range for assigned routes. Carbon footprint tracking and reporting will become essential features.
                  </p>

                  <div className="bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-green-900 mb-3">
                      🌍 Sustainability Focus
                    </h3>
                    <p className="text-green-800">
                      Future fleet management will prioritize environmental sustainability, with features for carbon tracking, electric vehicle integration, and emission-optimized routing becoming standard across the industry.
                    </p>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Customer Experience Enhancement
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    The future of fleet management extends beyond internal operations to directly impact customer experience. Real-time tracking will enable customers to monitor their deliveries with unprecedented accuracy, receiving notifications about delays or changes in real-time.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Dynamic delivery windows, personalized delivery preferences, and automated communication systems will transform the customer experience, making logistics a competitive advantage rather than just a necessary business function.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Cybersecurity and Data Protection
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    As fleet management systems become more connected and sophisticated, cybersecurity becomes increasingly critical. Future systems will incorporate advanced encryption, multi-factor authentication, and blockchain technology to protect sensitive data and prevent unauthorized access.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Privacy protection will also become more important as systems collect more detailed data about drivers and operations. Compliance with evolving data protection regulations will be built into the core architecture of future fleet management systems.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    The Road Ahead: What to Expect
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    The next decade will bring remarkable changes to fleet management. These transformative technologies will create unprecedented opportunities for operational excellence and competitive advantage.
                  </p>

                  <div className="bg-linear-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-orange-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Future Expectations
                    </h3>
                    <div className="space-y-3">
                      {futureExpectations.map((expectation, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-orange-600 mr-3 shrink-0 mt-0.5" />
                          <span className="text-orange-800 text-sm">{expectation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Preparing for the Future
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    To prepare for these changes, fleet operators should focus on choosing scalable, future-ready GPS tracking solutions. The right system will grow with your business and adapt to emerging technologies.
                  </p>

                  <div className="bg-linear-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-purple-900 mb-4">
                      ✓ Essential Features to Look For
                    </h3>
                    <div className="space-y-3">
                      {preparationChecklist.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-purple-600 mr-3 shrink-0 mt-0.5" />
                          <span className="text-purple-800 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Conclusion
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    The future of fleet management is bright, with transformative technologies promising to revolutionize how businesses manage their vehicles and optimize logistics operations. From AI-powered route optimization to autonomous vehicle integration, the next decade will bring unprecedented capabilities to fleet management systems.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Locotraq's fleet management solutions are designed with the future in mind, offering the flexibility and scalability needed to adapt to emerging technologies while delivering immediate value with current capabilities. By investing in future-ready GPS tracking solutions today, businesses can position themselves to take full advantage of tomorrow's innovations.
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
                        Logistics technology expert with over 10 years of experience in fleet management innovation and digital transformation.
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
            🚀 READY TO FUTURE-PROOF YOUR FLEET?
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Transform Your Fleet Management Today
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how Locotraq's advanced GPS tracking solutions can prepare your fleet for the future while delivering immediate benefits today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Explore Our Solutions
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-black hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}