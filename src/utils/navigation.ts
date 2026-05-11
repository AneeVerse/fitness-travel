'use client';

import { useRouter } from 'next/navigation';

// Navigation utility for handling cross-page section navigation
export const navigateToSection = (sectionId: string) => {
  // Check if we're already on the home page
  if (window.location.pathname === '/') {
    // We're on home page, just scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // We're on a different page, navigate to home page with hash
    window.location.href = `/#${sectionId}`;
  }
};

// Hook-based navigation utility for React components
export const useNavigateToSection = () => {
  const router = useRouter();
  
  return (sectionId: string) => {
    // Check if we're already on the home page
    if (window.location.pathname === '/') {
      // We're on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Store the section ID in sessionStorage for after navigation
      sessionStorage.setItem('scrollToSection', sectionId);
      
      // Navigate to home page without hash first
      router.push('/');
    }
  };
};

// Function to handle scrolling after page load
export const handleScrollAfterNavigation = () => {
  const sectionId = sessionStorage.getItem('scrollToSection');
  if (sectionId) {
    // Clear the stored section ID
    sessionStorage.removeItem('scrollToSection');
    
    // Wait for page to fully load and then scroll
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Add a longer delay to ensure all content is loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 2500); // Increased delay to 2.5 seconds
      }
    };
    
    // Use multiple methods to ensure it works
    if (document.readyState === 'complete') {
      scrollToSection();
    } else {
      window.addEventListener('load', scrollToSection);
      // Fallback timeout
      setTimeout(scrollToSection, 2000);
    }
  }
};