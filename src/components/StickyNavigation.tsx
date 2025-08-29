"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState('Overview');

  const navItems = [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'trip-details', label: 'Trip Details', href: '#trip-details' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'book-now', label: 'Book Now', href: '/book-now', isExternal: true },
    { id: 'itinerary', label: 'Itinerary', href: '#itinerary' },
  ];

  // No useEffect needed - component starts visible

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
      <div className="bg-white/55 backdrop-blur-md shadow-lg mx-auto mb-6 rounded-full  max-w-[35%]">
        <div className="px-3 py-2">
          <div className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
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
