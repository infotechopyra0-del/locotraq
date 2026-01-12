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
  Car,
  Settings,
  Shield,
  Smartphone,
  CheckCircle,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VehicleTrackerGuidePage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(456);
  const [isLiked, setIsLiked] = useState(false);

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
    featuredImageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
    readTime: "13 min read",
    views: "22.7K"
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
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=200&fit=crop&q=80",
      readTime: "9 min"
    },
    {
      title: "The Technology Behind GPS: How Satellite Tracking Works",
      slug: "technology-behind-gps-satellite-tracking",
      category: "Technology",
      excerpt: "Uncover the fascinating technology behind GPS and satellite tracking.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop&q=80",
      readTime: "11 min"
    },
    {
      title: "Fleet Management Best Practices for 2024",
      slug: "fleet-management-best-practices",
      category: "Business Solutions",
      excerpt: "Optimize your fleet operations with proven strategies and tools.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop&q=80",
      readTime: "8 min"
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
                  <div className="text-sm text-gray-400">Automotive Security Expert</div>
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
                      67
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

                {/* Article Content */}
                <div className="prose prose-lg max-w-none space-y-6">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Why Every Car Owner Needs a Vehicle Tracker
                  </h2>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Vehicle theft remains a significant concern for car owners worldwide, with millions 
                    of vehicles stolen annually. Beyond theft protection, modern vehicle trackers offer 
                    comprehensive monitoring capabilities that enhance safety, provide peace of mind, 
                    and can even help reduce insurance premiums.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Whether you're protecting a daily commuter, a luxury vehicle, or managing a small 
                    fleet, choosing the right vehicle tracker is crucial for maximizing security and 
                    value. This comprehensive guide will help you navigate the options and make an 
                    informed decision that meets your specific needs.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Key Benefits of Vehicle Tracking
                  </h2>

                  {/* Key Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {keyFeatures.map((feature, index) => (
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
                    Types of Vehicle Trackers
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Understanding the different types of vehicle trackers is essential for making 
                    the right choice. Each type has distinct advantages and is suited for different 
                    use cases and security requirements.
                  </p>

                  {/* Tracker Types */}
                  <div className="space-y-6 my-8">
                    {trackerTypes.map((tracker, index) => (
                      <div key={index} className="bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-black text-gray-900 mb-4">{tracker.type}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-black text-green-600 mb-3 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Advantages
                            </h4>
                            <ul className="text-sm text-gray-700 space-y-2">
                              {tracker.pros.map((pro, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-600 mr-2">✓</span>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-black text-red-600 mb-3">Disadvantages</h4>
                            <ul className="text-sm text-gray-700 space-y-2">
                              {tracker.cons.map((con, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-red-600 mr-2">✗</span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-lg">
                          <p className="text-sm text-orange-900"><strong className="font-black">Best For:</strong> {tracker.bestFor}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Essential Features to Consider
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    When evaluating vehicle trackers, certain features are essential for effective 
                    monitoring and security. Prioritize these capabilities based on your specific 
                    needs and use case.
                  </p>

                  {/* Essential Features */}
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-green-900 mb-4">
                      ✓ Must-Have Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {essentialFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                          <span className="text-green-800 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Real-Time vs. Passive Tracking
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Understanding the difference between real-time and passive tracking is crucial 
                    for selecting the right system for your needs.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-black text-blue-900 mb-3">Real-Time Tracking</h3>
                      <p className="text-sm text-blue-800">
                        Real-time trackers provide live location updates, typically every 10-60 seconds. 
                        This immediate information is essential for theft recovery, emergency situations, 
                        and active monitoring. Real-time systems require cellular connectivity and 
                        ongoing service plans.
                      </p>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-black text-purple-900 mb-3">Passive Tracking</h3>
                      <p className="text-sm text-purple-800">
                        Passive trackers log location data for later retrieval. While less expensive 
                        to operate, they don't provide immediate alerts and are primarily useful for 
                        historical route analysis and post-incident investigation.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Installation Options
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Installation complexity varies significantly between tracker types. Consider 
                    your technical skills, security requirements, and long-term needs when 
                    choosing an installation method.
                  </p>

                  <div className="bg-linear-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-orange-900 mb-4">
                      🔧 Installation Methods
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-orange-900 mb-2">DIY Installation</h4>
                        <p className="text-sm text-orange-800">
                          OBD-II port trackers and magnetic units offer simple DIY installation. These 
                          options are cost-effective and allow for easy removal, but may be more visible 
                          and less secure than professional installations.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-900 mb-2">Professional Installation</h4>
                        <p className="text-sm text-orange-800">
                          Hardwired systems require professional installation but offer superior security 
                          and reliability. Professional installation ensures optimal placement, proper 
                          wiring, and often includes warranties on both equipment and installation work.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Key Considerations for Selection
                  </h2>

                  {/* Considerations Grid */}
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {considerations.map((consideration, index) => (
                      <div key={index} className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{consideration.title}</h3>
                        <p className="text-sm text-gray-700">{consideration.description}</p>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Understanding Costs
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Vehicle tracker costs include both upfront equipment expenses and ongoing 
                    service fees. Understanding the total cost of ownership helps make informed 
                    decisions about long-term value.
                  </p>

                  <div className="bg-linear-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-indigo-900 mb-4">💰 Cost Breakdown</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-indigo-900 mb-2">Initial Costs</h4>
                        <ul className="text-sm text-indigo-800 space-y-1 ml-4">
                          <li>• <strong>Device Cost:</strong> ₹2,000 - ₹15,000 depending on features and type</li>
                          <li>• <strong>Installation:</strong> ₹500 - ₹3,000 for professional installation</li>
                          <li>• <strong>Activation Fees:</strong> ₹200 - ₹1,000 one-time setup costs</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-indigo-900 mb-2">Ongoing Costs</h4>
                        <ul className="text-sm text-indigo-800 space-y-1 ml-4">
                          <li>• <strong>Monthly Service:</strong> ₹200 - ₹800 per month for cellular and platform access</li>
                          <li>• <strong>Data Plans:</strong> Included in service or separate cellular charges</li>
                          <li>• <strong>Premium Features:</strong> Additional costs for advanced analytics or extended history</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Battery Life and Power Management
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Power management is crucial for reliable operation. Vehicle-powered trackers 
                    offer continuous operation but may drain the vehicle battery if not properly 
                    installed. Battery-powered units provide flexibility but require regular charging.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Look for features like low-power modes, battery level monitoring, and backup 
                    power options to ensure consistent tracking capability regardless of power source.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Mobile App and User Interface
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    The quality of the mobile application significantly impacts user experience. 
                    Evaluate apps based on:
                  </p>

                  <ul className="text-gray-700 space-y-2 my-4 ml-6">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Intuitive interface design and ease of navigation
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Real-time map updates and location accuracy
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Alert customization and notification options
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Historical data access and reporting features
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Multi-user access and permission controls
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Offline functionality and data synchronization
                    </li>
                  </ul>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Insurance Benefits
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Many insurance companies offer discounts for vehicles equipped with approved 
                    tracking devices. These discounts can range from 5-15% of premium costs, 
                    potentially offsetting the tracker's ongoing expenses.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Contact your insurance provider to understand specific requirements and 
                    approved device lists before making a purchase decision.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Locotraq's Vehicle Tracking Solutions
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Locotraq offers comprehensive vehicle tracking solutions designed to meet 
                    diverse needs and budgets. Our systems combine advanced GPS technology 
                    with user-friendly interfaces, reliable cellular connectivity, and exceptional 
                    customer support.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    From basic OBD-II trackers for everyday protection to advanced hardwired 
                    systems for high-security applications, Locotraq provides the right solution 
                    for every vehicle and situation. Our experienced team helps you select, 
                    install, and maintain the perfect tracking system for your needs.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Conclusion
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Choosing the right vehicle tracker involves careful consideration of your specific 
                    needs, budget, and security requirements. By understanding the different types of 
                    trackers, essential features, and installation options, you can make an informed 
                    decision that provides the best protection for your vehicle.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Whether you're protecting a family car, a luxury vehicle, or managing a small fleet, 
                    the right vehicle tracker offers invaluable peace of mind and security that pays 
                    dividends in both safety and potential insurance savings.
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
                        Automotive security expert with over 12 years of experience helping 
                        car owners select perfect tracking solutions.
                      </p>
                      <button className="mt-3 text-orange-600 hover:text-orange-700 font-bold text-sm flex items-center">
                        Follow
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Selection Guide */}
                <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-200">
                  <h3 className="font-black text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Selection Guide
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="font-bold text-gray-900 mb-1">Budget Option:</p>
                      <p className="text-gray-700">OBD-II tracker for basic needs</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="font-bold text-gray-900 mb-1">High Security:</p>
                      <p className="text-gray-700">Hardwired professional installation</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="font-bold text-gray-900 mb-1">Flexibility:</p>
                      <p className="text-gray-700">Battery-powered portable unit</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="font-bold text-gray-900 mb-1">Fleet Use:</p>
                      <p className="text-gray-700">Magnetic trackers for easy deployment</p>
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
            🚗 SECURE YOUR VEHICLE TODAY
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Secure Your Vehicle?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explore Locotraq's comprehensive range of vehicle trackers and find the perfect 
            solution for your car's security and monitoring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Browse Vehicle Trackers
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-black hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105">
              Get Expert Advice
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}