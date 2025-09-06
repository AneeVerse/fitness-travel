import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import EpicDestinationsSection from '@/components/EpicDestinationsSection';
import SocialMosaic from '@/components/SocialMosaic';
import ReviewsSection from '@/components/ReviewsSection';
import CoachesSection from '@/components/CoachesSection';
import FaqSection from '@/components/FaqSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import VideoSection from '@/components/VideoSection';
import VideoSlider from '@/components/VideoSlider';

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <UpcomingEvents />
      <EpicDestinationsSection />
      <ReviewsSection />
      <VideoSlider />
      <SocialMosaic />
      <CoachesSection />
    
      <FaqSection />
      <CTASection />
      {/* Additional sections can be added here */}
      <Footer />
    </div>
  );
}
