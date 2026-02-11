import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Have a query or want to collaborate? Contact Tiger Terrain for experiential fitness journeys, community runs, and adventure travel.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact Us | Tiger Terrain',
        description: 'Have a query or want to collaborate? Contact Tiger Terrain for experiential fitness journeys.',
        url: 'https://tigerterrain.in/contact',
        type: 'website',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
