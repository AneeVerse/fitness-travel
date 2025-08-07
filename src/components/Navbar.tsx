"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { name: 'Retreats', href: '/retreats', hasDropdown: true },
    { name: 'What to Expect', href: '/what-to-expect', hasDropdown: true },
    { name: 'Help', href: '/help', hasDropdown: true },
    { name: 'Team', href: '/team', hasDropdown: true },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="bg-white/90 backdrop-blur-md rounded-4xl shadow-lg px-8 py-3 max-w-[1335px] mx-auto">
                 <div className="flex items-center justify-between">
           {/* Logo */}
           <div className="flex-shrink-0">
             <Link href="/" className="flex items-center">
               <img src="images/website-log.png" alt="Salt Escapes" className="w-10 h-10 rounded-full" />
             </Link>
           </div>

           {/* Desktop Navigation */}
           <div className="hidden md:flex items-center space-x-10">
             {navItems.map((item) => (
               <Link
                 key={item.name}
                 href={item.href}
                 className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 text-base flex items-center font-unbounded"
               >
                 {item.name}
                 {item.hasDropdown && (
                   <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                 )}
               </Link>
             ))}

             {/* CTA Buttons */}
             <Link
               href="/pre-register"
               className="px-4 py-2 text-[#244447] border-2 border-[#244447] rounded-full font-semibold hover:bg-emerald-50 transition-all duration-200 text-sm font-unbounded"
             >
               Pre-Register
             </Link>
             <Link
               href="/book-now"
               className="px-4 py-2 bg-[#244447] text-white rounded-full font-semibold hover:bg-emerald-800 transition-all duration-200 text-sm font-unbounded py-3 px-4"
             >
               Book Now
             </Link>
             {/* Shopping Bag */}
             <div className="relative">
               <svg className="w-5 h-5 text-gray-700 hover:text-emerald-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
               <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center border border-gray-300">0</span>
             </div>
           </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              <Link
                href="/pre-register"
                className="block w-full px-4 py-2 text-center text-emerald-600 border-2 border-emerald-600 rounded-full font-semibold hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Pre-Register
              </Link>
              <Link
                href="/book-now"
                className="block w-full px-4 py-2 text-center bg-emerald-700 text-white rounded-full font-semibold hover:bg-emerald-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
