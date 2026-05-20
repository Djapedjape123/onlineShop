import React from 'react'
import { Link } from 'react-router-dom'
// icons
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function FooterComponent() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 pt-16 pb-8 border-t-[6px] border-mainBlue">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-gray-700 pb-12 mb-12 gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-extrabold text-white mb-2">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 text-sm">Get the latest updates on new products and upcoming sales</p>
          </div>
          <div className="flex w-full lg:w-auto max-w-md bg-gray-800 rounded-full overflow-hidden p-1 border border-gray-700 focus-within:border-mainYellow transition-colors">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-transparent px-4 py-2 text-sm text-white focus:outline-none placeholder:text-gray-500"
            />
            <button className="bg-mainYellow hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-full transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xl font-bold mb-2">WebShop</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              We offer the best products at the best prices. Premium quality and fast shipping worldwide.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+381612123525" className="flex items-center gap-3 hover:text-mainYellow transition-colors">
                <FaPhoneAlt className="text-mainYellow" />
                (+381) 612123525
              </a>
              <a  className="flex items-center gap-3 hover:text-mainYellow transition-colors">
                <FaEnvelope className="text-mainYellow" />
                info@webshop.com
              </a>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-mainYellow" />
                <span>Novi Sad, Serbia</span>
              </div>
            </div>
          </div>

          {/* Column 2: Customer Service */}
          

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-lg font-bold mb-3">Quick Links</h4>
            <Link to="/" className="text-sm hover:text-mainYellow transition-colors">All Products</Link>
            <Link to="/cart" className="text-sm hover:text-mainYellow transition-colors">My Cart</Link>
            <Link to="/favorite" className="text-sm hover:text-mainYellow transition-colors">My Favorites</Link>
            <Link to="#" className="text-sm hover:text-mainYellow transition-colors">Special Offers</Link>
            <Link to="#" className="text-sm hover:text-mainYellow transition-colors">Gift Cards</Link>
          </div>

          {/* Column 4: Social Media */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-lg font-bold mb-2">Follow Us</h4>
            <p className="text-sm text-gray-400 mb-2">
              Stay connected with us on social media for the latest deals and news.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-mainBlue transition-all duration-300 hover:-translate-y-1">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300 hover:-translate-y-1">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-400 transition-all duration-300 hover:-translate-y-1">
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} WebShop. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterComponent