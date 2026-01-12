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
  Shield,
  MapPin,
  Phone,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function PersonalSafetyTrackerPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(328);
  const [isLiked, setIsLiked] = useState(false);

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
    featuredImageUrl: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=1200&q=80",
    readTime: "9 min read",
    views: "15.3K"
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
    },
    {
      title: "The Technology Behind GPS: How Satellite Tracking Works",
      slug: "technology-behind-gps",
      category: "Technology",
      excerpt: "Uncover the fascinating technology behind GPS and satellite tracking.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop&q=80",
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
                  <div className="text-sm text-gray-400">Personal Safety Expert</div>
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
                      42
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
                    In today's fast-paced world, personal safety has become a paramount concern for individuals and families alike. Whether it's an elderly parent living independently, a teenager going to school, or someone who frequently travels alone, the ability to stay connected and summon help when needed has never been more important.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Personal GPS trackers have emerged as a powerful solution, offering peace of mind to both the wearer and their loved ones. These compact, user-friendly devices provide real-time location tracking, emergency communication, and automated safety features that can be life-saving in critical situations.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Key Benefits of Personal GPS Trackers
                  </h2>

                  {/* Safety Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {safetyFeatures.map((feature, index) => (
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
                    Who Benefits from Personal GPS Trackers?
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Personal GPS trackers are valuable for a wide range of individuals and situations. The versatility of these devices makes them suitable for various demographics and use cases:
                  </p>

                  <div className="bg-linear-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-orange-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Common Use Cases
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {useCases.map((useCase, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-orange-600 mr-3 shrink-0 mt-0.5" />
                          <span className="text-orange-800 text-sm">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Essential Features to Look For
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    When choosing a personal GPS tracker, it's important to consider features that align with your specific safety needs. Modern personal GPS trackers offer a comprehensive suite of features designed to provide maximum protection and peace of mind.
                  </p>

                  <div className="bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-green-900 mb-4">
                      ✓ Core Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                          <span className="text-green-800 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    How Personal GPS Trackers Work
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Personal GPS trackers utilize Global Positioning System (GPS) satellites to determine precise location coordinates. These coordinates are then transmitted via cellular networks to monitoring applications or emergency services, depending on the device configuration.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Modern devices often combine GPS with other positioning technologies like GLONASS, Galileo, or Wi-Fi positioning to improve accuracy, especially in urban environments or indoor locations where GPS signals might be weak.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Emergency Response Capabilities
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    One of the most critical features of personal GPS trackers is their emergency response capability. Most devices include a dedicated SOS button that, when pressed, immediately alerts emergency contacts and can contact emergency services directly.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Advanced models feature automatic fall detection, which uses accelerometers and gyroscopes to detect sudden impacts or falls. If a fall is detected and the user doesn't respond within a specified timeframe, the device automatically sends an emergency alert with the user's location.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Geofencing for Added Security
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Geofencing technology allows families to create virtual boundaries around specific locations such as home, school, or work. When the tracker enters or exits these predefined zones, automatic notifications are sent to designated contacts.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    This feature is particularly valuable for monitoring elderly family members, ensuring children arrive safely at their destinations, or being alerted if someone leaves a safe area unexpectedly.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Two-Way Communication
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Many modern personal GPS trackers include two-way communication capabilities, allowing the wearer to speak directly with emergency contacts or monitoring services. This feature transforms the device from a simple tracker into a mobile communication tool.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Voice communication can be crucial in emergency situations, allowing the user to provide context about their situation and receive guidance or reassurance from family members or emergency responders.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Battery Life and Charging
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Battery life is a critical consideration for personal GPS trackers. The best devices offer several days of use on a single charge, with some models lasting up to a week with typical usage patterns.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Look for devices with low battery alerts that notify both the user and emergency contacts when charging is needed. Some trackers also offer power-saving modes that extend battery life by reducing update frequency when the device is stationary.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Privacy and Data Security
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Personal GPS trackers collect sensitive location data, making privacy and security paramount concerns. Choose devices from reputable manufacturers that implement strong encryption for data transmission and storage.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Ensure the device allows you to control who has access to location data and provides options to delete historical tracking information. The monitoring application should also include secure login features like two-factor authentication.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Choosing the Right Device
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    When selecting a personal GPS tracker, consider the specific needs of the intended user. Factors to evaluate include user age and mobility, activity level, technology comfort, coverage area, number of emergency contacts, and monitoring preferences.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg my-8 shadow-md">
                    <h3 className="text-lg font-black text-blue-900 mb-3">
                      💡 Pro Tips for Selection
                    </h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Seniors may need larger buttons and simplified interfaces
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Active users need water-resistant, durable designs
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Consider comfort level with technology
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Ensure device works well in your geographic region
                      </li>
                    </ul>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    The Locotraq Advantage
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Locotraq's personal GPS trackers combine advanced technology with user-friendly design to provide comprehensive safety solutions. Our devices offer reliable tracking, long battery life, and responsive customer support to ensure you and your loved ones stay safe and connected.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    With features like automatic fall detection, two-way communication, and 24/7 monitoring capabilities, Locotraq devices provide the peace of mind that comes from knowing help is always just a button press away.
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">
                    Conclusion
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    Personal GPS trackers represent a significant advancement in personal safety technology. By providing real-time location tracking, emergency communication, and automated safety features, these devices offer invaluable peace of mind for both users and their loved ones.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Whether you're looking to ensure the safety of an elderly parent, protect a child, or add an extra layer of security for yourself, personal GPS trackers provide reliable, life-saving technology that's always there when you need it most.
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
                        Personal safety expert specializing in GPS tracking technology and emergency response systems with over 12 years of experience.
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
            🛡️ PROTECT WHAT MATTERS MOST
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Experience Advanced Personal Safety
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how Locotraq's personal GPS trackers can give you and your loved ones the gift of safety and peace of mind with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              View Personal Trackers
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-black hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105">
              Get Safety Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}