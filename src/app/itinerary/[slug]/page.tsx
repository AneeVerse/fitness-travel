import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ItineraryHero from '@/components/ItineraryHero';
import OverviewSection from '@/components/OverviewSection';
import ItineraryDays from '@/components/ItineraryDays';
import TripDetailsSection from '@/components/TripDetailsSection';
import ItineraryFormSection from '@/components/ItineraryFormSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import CTASection from '@/components/CTASection';
import { getTripData } from '@/lib/tripData';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ItineraryPage({ params }: PageProps) {
  const { slug } = await params;
  const tripData = getTripData(slug);

  if (!tripData) {
    notFound();
  }

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      <ItineraryHero tripData={tripData} />
      <OverviewSection tripData={tripData} />
      <ItineraryDays tripData={tripData} />
      <TripDetailsSection tripData={tripData} />
      <ItineraryFormSection tripData={tripData} />
      <UpcomingEvents title="EXPLORE MORE JOURNEYS" currentSlug={slug} />
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'phuket' },
    { slug: 'bali' },
    { slug: 'goa' },
  ];
}
