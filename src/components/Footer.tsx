"use client";

import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import { useState } from 'react';

const tigerTerrainFont = localFont({
  src: '../../public/font/P22 Operina Romano Romano.ttf',
  display: 'swap',
});

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v6h3v-6h2.1l.9-3H13v-1.5c0-.3.2-.5.5-.5z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5C7 2 2 7 2 12s5 10 10 10 10-5 10-10S17 2 12 2zm5 3a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.77 1.77 0 100 3.54A1.77 1.77 0 005.47 4zM20 20v-6.54c0-3.02-1.6-4.43-3.73-4.43-1.72 0-2.49.95-2.92 1.62v-1.4H10.5V20h2.94v-6.2c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.87 2.03 3.33V20H20z" />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

export default function Footer() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <footer className="mt-16 sm:mt-24 mobile-footer">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Mobile Navigation Sections */}
        <div className="px-6 py-8 space-y-0">
          {/* Navigation Section */}
          <div 
            className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => setIsNavigationOpen(!isNavigationOpen)}
          >
            <span className="text-gray-800 text-lg">Navigation</span>
            <svg 
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isNavigationOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {/* Navigation Dropdown Content */}
          {isNavigationOpen && (
            <div className="py-4 space-y-3 border-b border-gray-200">
              <Link href="/" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Home</Link>
              <Link href="/about-us" className="block text-gray-600 hover:text-[#e77d25] transition-colors">About</Link>
              <Link href="/programs" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Upcoming Events</Link>
              <Link href="/pages" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Blogs</Link>
              <Link href="/contact" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Contact</Link>
            </div>
          )}
          
          {/* Explore Section */}
          <div 
            className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => setIsServicesOpen(!isServicesOpen)}
          >
            <span className="text-gray-800 text-lg">Explore</span>
            <svg 
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {/* Explore Dropdown Content */}
          {isServicesOpen && (
            <div className="py-4 space-y-3 border-b border-gray-200">
              <Link href="#" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Past Events</Link>
              <Link href="#" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Gallery</Link>
              <Link href="#" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Feedback</Link>
              <Link href="#" className="block text-gray-600 hover:text-[#e77d25] transition-colors">Team</Link>
            </div>
          )}
        </div>

        {/* Mobile Brand Section */}
        <div className="px-6 py-8 text-center">
          <h2 className={`text-4xl tracking-wide font-bold text-[#e77d25] mb-4`}>
            <span className={tigerTerrainFont.className}>TIGER TERRAIN</span>
          </h2>
          <p className="text-gray-600 text-sm mb-6">© 2025 Tiger Terrain. All rights reserved.</p>
          
          {/* Mobile Contact Information */}
          <div className="space-y-2 mb-6">
            <a href="tel:+61401207856" className="block text-gray-600 text-sm hover:text-[#e77d25] transition-colors">
              +61 401 207 856
            </a>
            <a href="mailto:info@salt-escapes.com" className="block text-gray-600 text-sm hover:text-[#e77d25] transition-colors">
              info@salt-escapes.com
            </a>
          </div>
          
          {/* Mobile Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6">
            <Link href="#" className="hover:text-[#e77d25] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#e77d25] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#e77d25] transition-colors">Status page</Link>
            <Link href="#" className="hover:text-[#e77d25] transition-colors">DMCA</Link>
          </div>
          
          {/* Mobile Social Icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#e77d25] text-white flex items-center justify-center hover:bg-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[#e77d25] text-white flex items-center justify-center hover:bg-black transition-colors">
              <IconLinkedIn className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#e77d25] text-white flex items-center justify-center hover:bg-black transition-colors">
              <IconFacebook className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Mobile Aneeverse Credit */}
          <div className="pt-4 border-t border-gray-200">
            <Link href="https://www.aneeverse.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-[#e77d25] transition-colors">
              <span>Designed & Managed by Aneeverse</span>
              <Image src="/images/aneeverse-logo.svg" alt="Aneeverse" width={14} height={14} className="w-[14px] h-[14px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Top: columns */}
        <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 md:space-y-0 md:grid md:[grid-template-columns:300px_1fr_1fr] md:gap-12 md:gap-16 md:items-start text-[#244447]">
          {/* Left: logo + contact */}
          <div className="space-y-6 text-center md:text-left">
            <Image
              src="/images/website-logo.png"
              alt="Tiger Terrain"
              width={56}
              height={56}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto md:ml-11 md:mx-0"
            />
            <div className="text-sm leading-7 space-y-2">
              <a href="tel:+61401207856" className="block hover:text-[#e77d25] transition-colors md:ml-8">+61 401 207 856</a>
              <a href="mailto:info@salt-escapes.com" className="block hover:text-[#e77d25] transition-colors md:ml-3">info@salt-escapes.com</a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-[#244447] mobile-social">
              <Link href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconFacebook className="w-4 h-4" /></Link>
              <Link href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconInstagram className="w-4 h-4" /></Link>
              <Link href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconLinkedIn className="w-4 h-4" /></Link>
              <Link href="#" aria-label="Email" className="w-9 h-9 rounded-full bg-[#e77d25] text-white flex items-center justify-center ring-1 ring-[#244447]/20 hover:bg-[#e77d25] transition-colors"><IconMail className="w-4 h-4" /></Link>
            </div>
          </div>

          {/* Column 1 – Navigation */}
          <div className="space-y-4 text-lg leading-7 text-center md:text-left md:self-start md:ml-50">
              <Link href="/" className="block hover:text-[#e77d25] transition-colors">Home</Link>
              <Link href="/about-us" className="block hover:text-[#e77d25] transition-colors">About</Link>
              <Link href="/programs" className="block hover:text-[#e77d25] transition-colors">Upcoming Events</Link>
              <Link href="/pages" className="block hover:text-[#e77d25] transition-colors">Blogs</Link>
              <Link href="/contact" className="block hover:text-[#e77d25] transition-colors">Contact Us</Link>
            </div>

            {/* Column 2 – Explore */}
            <div className="space-y-4 text-lg leading-7 text-center md:text-left md:self-start md:justify-self-end md:mr-10">
              <Link href="#" className="block hover:text-[#e77d25] transition-colors">Past Events</Link>
              <Link href="#" className="block hover:text-[#e77d25] transition-colors">Gallery</Link>
              <Link href="#" className="block hover:text-[#e77d25] transition-colors">Feedback</Link>
              <Link href="#" className="block hover:text-[#e77d25] transition-colors">Team</Link>
            </div>
        </div>

        {/* Divider top of wordmark */}
        <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
          <div className="h-px w-full bg-[#244447]/30" />
        </div>

        {/* Brand wordmark */}
        <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-6 sm:py-8 text-center">
          <h2 className={`text-3xl sm:text-5xl md:text-7xl lg:text-9xl tracking-[0.20em] font-semibold text-[#e77d25] whitespace-nowrap`}>
            <span className={tigerTerrainFont.className}>TIGER TERRAIN</span>
          </h2>
        </div>

        {/* Divider under wordmark */}
        <div className="max-w-[1325px] mx-auto px-4 sm:px-8">
          <div className="h-px w-full bg-[#244447]/30" />
        </div>

        {/* Bottom row */}
        <div className="max-w-[1325px] mx-auto px-4 sm:px-8 py-6 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:items-center md:gap-4 text-xs text-[#244447]">
          {/* Left: Copyright */}
          <p className="text-center md:text-left md:justify-self-start">© 2025 Tiger Terrain. All rights reserved.</p>

          {/* Middle: Policies */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8">
            <Link href="#" className="hover:opacity-70">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-70">Terms &amp; Conditions</Link>
          </div>

          {/* Right: Credit */}
          <div className="text-center md:text-right md:justify-self-end">
            <Link href="https://www.aneeverse.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-end gap-2 hover:opacity-80">
              <span className="whitespace-nowrap">Designed &amp; Managed by Aneeverse</span>
              <Image src="/images/aneeverse-logo.svg" alt="Aneeverse" width={18} height={18} className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


