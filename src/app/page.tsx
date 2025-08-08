import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import EpicDestinationsSection from '@/components/EpicDestinationsSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <UpcomingEvents />
      <EpicDestinationsSection />
      {/* Additional sections can be added here */}
    </>
  );
}
