import Navbar from '@/components/Navbar';
import ItineraryHero from '@/components/ItineraryHero';
import StickyNavigation from '@/components/StickyNavigation';
import OverviewSection from '@/components/OverviewSection';
import TripDetailsSection from '@/components/TripDetailsSection';
import PricingSection from '@/components/PricingSection';
import BookNowSection from '@/components/BookNowSection';
import ItinerarySection from '@/components/ItinerarySection';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';

export default function ItineraryPage() {
  return (
    <>
      <Navbar />
      <ItineraryHero />
      <StickyNavigation />
      <OverviewSection />
      <TripDetailsSection />
      <PricingSection />
      <BookNowSection />
      <ItinerarySection />
      <FaqSection />
      <Footer />
    </>
  );
}
