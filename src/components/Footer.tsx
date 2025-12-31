import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];
  return (
    <>
    <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
                <span className="ml-2 text-2xl font-black text-white">Locotraq</span>
              </div>
              <p className="text-sm mb-4">
                Leading GPS tracking solutions for vehicles, assets, and fleet management.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Vehicle Trackers</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Personal Trackers</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Fleet Management</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Industrial Solutions</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-orange-600" />
                  +91 1234567890
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-600" />
                  support@locotraq.com
                </li>
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-orange-600 mt-1" />
                  <span>123 Business Park, New Delhi, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm">
              © 2025 Locotraq. All rights reserved. | Privacy Policy | Terms & Conditions
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

{/* Contact Info */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-soft-gold mt-1 shrink-0" />
                  <div className="font-paragraph text-gray-300 text-sm">
                    <p>+91 6390 057 777</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-soft-gold mt-1 shrink-0" />
                  <div className="font-paragraph text-gray-300 text-sm">
                    <p>support@locotraq.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-soft-gold mt-1 shrink-0" />
                  <div className="font-paragraph text-gray-300 text-sm">
                    <p>AIC BUILDING BHU VARANASI 221005</p>
                    <p>UP INDIA</p>
                  </div>
                </div>
              </div>
            </div>