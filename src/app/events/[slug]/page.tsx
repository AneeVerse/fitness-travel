import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import EventHero from '@/components/EventHero';
import EventOverview from '@/components/EventOverview';
import EventDays from '@/components/EventDays';
import EventForm from '@/components/EventForm';
import UpcomingEvents from '@/components/UpcomingEvents';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import CTASection from '@/components/CTASection';
import { getEventData } from '@/lib/eventData';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const eventData = getEventData(slug);

  if (!eventData) {
    notFound();
  }

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      <EventHero eventData={eventData} />
      <EventOverview eventData={eventData} />
      <EventDays eventData={eventData} />
      <EventForm eventData={eventData} />
      <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
        <UpcomingEvents title="EXPLORE MORE EVENTS" />
      </Suspense>
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'kombucha-1' },
  ];
}

