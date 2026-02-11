import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ItineraryHero from '@/components/ItineraryHero';
import OverviewSection from '@/components/OverviewSection';
import ItineraryDays from '@/components/ItineraryDays';
import RoomPricingSection from '@/components/RoomPricingSection';
import TripDetailsSection from '@/components/TripDetailsSection';
import ItineraryFormWrapper from '@/components/ItineraryFormWrapper';
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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tripData = getTripData(slug);

  if (!tripData) return {};

  return {
    title: tripData.title,
    description: tripData.description,
    alternates: {
      canonical: `/itinerary/${slug}`,
    },
    openGraph: {
      title: `${tripData.title} | Tiger Terrain`,
      description: tripData.description,
      url: `https://tigerterrain.in/itinerary/${slug}`,
      type: 'website',
      images: [
        {
          url: tripData.overview.images[0] || '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
          width: 1200,
          height: 630,
          alt: tripData.title,
        },
      ],
    },
  };
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
      <RoomPricingSection tripData={tripData} />
      <TripDetailsSection tripData={tripData} />
      <ItineraryFormWrapper tripData={tripData} />
      <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
        <UpcomingEvents title="EXPLORE MORE JOURNEYS" currentSlug={slug} />
      </Suspense>
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'phuket' },
    // { slug: 'bali' }, // COMMENTED OUT: Bali page removed
    // { slug: 'goa' }, // COMMENTED OUT: Goa page removed
    { slug: 'sri-lanka' },
  ];
}
