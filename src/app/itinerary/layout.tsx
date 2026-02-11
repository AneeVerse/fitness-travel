import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fitness Retreats & Journeys',
    description: 'Choose your next adventure. Explore our curated fitness retreats in exotic destinations like Phuket and Sri Lanka.',
    alternates: {
        canonical: '/itinerary',
    },
    openGraph: {
        title: 'Fitness Retreats & Journeys | Tiger Terrain',
        description: 'Explore our curated fitness retreats in exotic destinations like Phuket and Sri Lanka.',
        url: 'https://tigerterrain.in/itinerary',
        type: 'website',
    },
};

export default function ItineraryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
