"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'trip-details', label: 'Trip Details', href: '#trip-details' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'book-now', label: 'Book Now', href: '#book-now' },
    { id: 'itinerary', label: 'Itinerary', href: '#itinerary' },
  ];

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.filter(item => !item.isExternal);
      let currentSection = '';

      // Check if we're in hero section (top of page)
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      for (const item of sections) {
        const element = document.querySelector(item.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is in view (top of section is above middle of screen)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = item.label;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: any) => {
    if (item.isExternal) {
      window.location.href = item.href;
      return;
    }

    setActiveSection(item.label);
    
    // Smooth scroll to section
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      id="sticky-navigation"
      className="fixed bottom-0 left-0 right-0 z-[9999]"
    >
      <div className="bg-white/55 backdrop-blur-md shadow-lg mx-auto mb-6 rounded-full max-w-[35%] lg:max-w-[35%]">
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeSection === item.label
                    ? 'bg-[#e77d26] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNavigation;
