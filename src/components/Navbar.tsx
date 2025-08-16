"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';

const tigerTerrainFont = localFont({
  src: '../../public/font/P22 Operina Romano Romano.ttf',
  display: 'swap',
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '/', hasDropdown: false },
    { name: 'UPCOMING EVENTS', href: '/programs', hasDropdown: false },
    { name: 'ABOUT', href: '/about-us', hasDropdown: false },
    { name: 'BLOGS', href: '/pages', hasDropdown: false },
    { name: 'CONTACT', href: '/coaches', hasDropdown: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 bg-transparent">
      <div className="bg-white/55 backdrop-blur-md rounded-[15px] shadow-md border border-[#244447] px-6 sm:px-8 py-3 max-w-[1325px] mx-auto">
                 <div className="grid grid-cols-[auto_1fr_auto] items-center">
           {/* Logo + Brand */}
           <div className="flex-shrink-0 ">
             <Link href="/" className="flex items-center gap-3 ">
               <Image src="/images/website-logo.png" alt="Tiger Terrain" width={40} height={40} className="h-10 w-10 object-contain" />
               <span className={`${tigerTerrainFont.className} text-[27px] leading-none text-[#0f1a17] mt-1`}>TIGER TERRAIN</span>
             </Link>
           </div>

           {/* Desktop Navigation (centered) */}
           <div className="hidden md:flex items-center justify-center gap-12 justify-self-center">
             {navItems.map((item) => (
               <Link
                 key={item.name}
                 href={item.href}
                 className="text-gray-800 hover:text-[#e77d25] transition-colors duration-200 text-[12px] tracking-[0.08em] flex items-center"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
               >
                 {item.name}
                 {item.hasDropdown && (
                   <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                 )}
               </Link>
             ))}
           </div>

            {/* Right-aligned CTA */}
           <div className="hidden md:block justify-self-end">
             <Link
               href="/book-now"
               className="px-6 py-4 rounded-full font-semibold text-[12px] text-white bg-[#e77d26] hover:bg-black hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'var(--font-unbounded)' }}
             >
               BOOK ADVENTURE
             </Link>
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
                  style={{ fontFamily: 'var(--font-unbounded)' }}
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
            <div className="mt-4">
              <Link
                href="/contact"
                className="block w-full px-4 py-2 text-center rounded-full font-semibold bg-[#e77d25] text-[#0f1a17] hover:bg-black hover:text-[#e77d25]"
                style={{ fontFamily: 'var(--font-unbounded)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
