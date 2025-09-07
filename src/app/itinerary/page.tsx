import Navbar from '@/components/Navbar';
import UpcomingEvents from '@/components/UpcomingEvents';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';

export default function ItineraryPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <UpcomingEvents title="CHOOSE YOUR ADVENTURE" />
      </div>
      <CTASection />
      <Footer />
    </div>  
  );
}
