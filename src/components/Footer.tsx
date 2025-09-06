"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Content */}
        <div className="mb-12">
          
          {/* Two-column layout with left-right spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column - Main Text */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  Experience the thrill of fitness adventure travel with Tiger Terrain. Join our community of athletes exploring breathtaking destinations.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Discover your limits, push beyond them, and create unforgettable memories in stunning locations around the world.
                </p>
              </div>
            </div>
            
            {/* Right Column - Navigation Links */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Column 1 */}
                <div className="space-y-2">
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    Home
                  </Link>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    About
                  </Link>
                  <Link href="/itinerary" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    Events
                  </Link>
                </div>
                
                {/* Column 2 */}
                <div className="space-y-2">
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    Contact
                  </Link>
                  <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    FAQ
                  </Link>
                  <Link href="#upcoming-events" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    Past Events
                  </Link>
                </div>
                
                {/* Column 3 */}
                <div className="space-y-2">
                  <Link href="#social-mosaic" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    Gallery
                  </Link>
                  <Link href="#reviews-section" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    Feedback
                  </Link>
                  <Link href="#coaches-section" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-3 px-4 border-l-2 border-gray-700 hover:border-orange-500 pl-4 hover:pl-6 transition-all duration-200 block">
                    Team
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-6">
              {/* Instagram */}
              <a href="https://www.instagram.com/tigerterrain.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Email */}
              <a href="mailto:team.tigerterrain@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z" />
                </svg>
              </a>
              
              {/* Phone */}
              <a href="tel:+919820942632" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Left Side - Copyright */}
            <div className="text-center md:text-left">
              <span className="text-sm text-gray-400">© 2025 Tiger Terrain. All rights reserved.</span>
            </div>

            {/* Center - Privacy Policy and Terms of Service */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            </div>

            {/* Right Side - Aneeverse Credit */}
            <div className="text-center md:text-right">
              <a 
                href="https://www.aneeverse.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end space-x-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <span>Designed & Managed by Aneeverse</span>
                <Image
                  src="/images/aneeverse-logo.svg"
                  alt="Aneeverse"
                  width={16}
                  height={16}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}