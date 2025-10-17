'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import EpicDestinationsSection from '@/components/EpicDestinationsSection';
import SocialMosaic from '@/components/SocialMosaic';
import USPSection from '@/components/USPSection';
import ReviewsSection from '@/components/ReviewsSection';
import CoachesSection from '@/components/CoachesSection';
import FaqSection from '@/components/FaqSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import VideoSlider from '@/components/VideoSlider';
import { handleScrollAfterNavigation } from '@/utils/navigation';

export default function Home() {
  useEffect(() => {
    // Handle scrolling after navigation from other pages
    handleScrollAfterNavigation();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <UpcomingEvents />
      <EpicDestinationsSection />
      <ReviewsSection />
      <SocialMosaic />
      <VideoSlider />
  
      <USPSection />
      <CoachesSection />
    
      <FaqSection />
      <CTASection />
      {/* Additional sections can be added here */}
      <Footer />
    </div>
  );
}
