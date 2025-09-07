import Navbar from '@/components/Navbar';
import UpcomingEvents from '@/components/UpcomingEvents';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import Hero from '@/components/Hero';

export default function ItineraryPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      <div className="xl:-mb-54">
        <Hero />
      </div>
      
      <div className="pt-10">
        <UpcomingEvents title="CHOOSE YOUR ADVENTURE" />
      </div>
      <CTASection />
      <Footer />
    </div>  
  );
}
