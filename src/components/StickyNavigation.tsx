"use client";

import React, { useState, useEffect, useRef } from 'react';

const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [clickedSection, setClickedSection] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      // If we recently clicked a section, don't override it yet
      if (clickedSection && timeoutRef.current) {
        return;
      }

      let currentSection = '';

      // Check if we're in hero section (top of page)
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      for (const item of navItems) {
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
  }, [navItems, clickedSection]);

  const handleNavClick = (item: { id: string; label: string; href: string }) => {
    setActiveSection(item.label);
    setClickedSection(item.label);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a timeout to re-enable scroll spy after scrolling completes
    timeoutRef.current = setTimeout(() => {
      setClickedSection('');
      timeoutRef.current = null;
    }, 1000); // 1 second delay
    
    // Smooth scroll to section
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        #sticky-navigation button:focus {
          outline: none !important;
          outline-offset: 0 !important;
          box-shadow: none !important;
        }
        #sticky-navigation button:focus-visible {
          outline: none !important;
          outline-offset: 0 !important;
          box-shadow: none !important;
        }
      `}</style>
      <div 
        id="sticky-navigation"
        className="fixed bottom-0 left-0 right-0 z-[9999] px-4 sm:px-6 md:px-8"
      >
      <div className="bg-white/55 backdrop-blur-md shadow-lg mx-auto mb-4 sm:mb-6 rounded-full max-w-[95%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[40%] border border-white/20">
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex-shrink-0 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105 focus:outline-none border-0 ring-0 [&:focus]:outline-none [&:focus]:ring-0 [&:focus]:border-0 [&:focus]:outline-offset-0 ${
                  activeSection === item.label
                    ? 'bg-[#e77d26] text-white'
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
    </>
  );
};

export default StickyNavigation;
