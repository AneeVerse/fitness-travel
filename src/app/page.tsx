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
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <UpcomingEvents />
      <EpicDestinationsSection />
      <SocialMosaic />
      <CoachesSection />
      <ReviewsSection />
      <FaqSection />
      {/* Additional sections can be added here */}
      <Footer />
    </>
  );
}
