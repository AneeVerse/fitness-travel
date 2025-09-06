import Navbar from '@/components/Navbar';
import ItineraryHero from '@/components/ItineraryHero';

import OverviewSection from '@/components/OverviewSection';
import ItineraryDays from '@/components/ItineraryDays';
import TripDetailsSection from '@/components/TripDetailsSection';
import ItineraryFormSection from '@/components/ItineraryFormSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import PricingSection from '@/components/PricingSection';
import BookNowSection from '@/components/BookNowSection';

import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import CTASection from '@/components/CTASection';

export default function ItineraryPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      <ItineraryHero />
     <OverviewSection />
      <ItineraryDays />
      <TripDetailsSection />
      <ItineraryFormSection />
      <UpcomingEvents title="EXPLORE MORE JOURNEYS" />
  
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}
