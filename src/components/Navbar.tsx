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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-8 py-2 sm:py-4 bg-transparent">
        <div className="bg-white/55 backdrop-blur-md rounded-[15px] shadow-md border border-black px-3 sm:px-6 md:px-8 py-2 sm:py-3 max-w-[1325px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <Image src="/images/website-logo.png" alt="Tiger Terrain" width={40} height={40} className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
                <span className={`${tigerTerrainFont.className} text-[20px] sm:text-[20px] md:text-xl lg:text-[27px] leading-none text-[#0f1a17] mt-1`}>TIGER TERRAIN</span>
              </Link>
            </div>

            {/* Desktop Navigation (centered) */}
            <div className="hidden md:flex items-center justify-center gap-12 absolute left-1/2 transform -translate-x-1/2">
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
            <div className="hidden md:block">
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#e77d25] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#e77d25] transition-colors duration-200 z-50"
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
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ minHeight: '100vh' }}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
              <Image src="/images/website-logo.png" alt="Tiger Terrain" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className={`${tigerTerrainFont.className} text-xl leading-none text-[#0f1a17]`}>TIGER TERRAIN</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:text-[#e77d25] hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col p-6 space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-semibold text-gray-800 hover:text-[#e77d25] transition-colors duration-300 flex items-center justify-between py-2 border-b border-gray-100"
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

          {/* CTA Button */}
          <div className="absolute bottom-12 left-6 right-6">
            <Link
              href="/book-now"
              className="block w-full px-8 py-3 text-center rounded-full font-semibold bg-[#e77d25] text-white hover:bg-black hover:text-[#e77d25] transition-colors duration-300 text-base"
              style={{ fontFamily: 'var(--font-unbounded)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              BOOK ADVENTURE
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
