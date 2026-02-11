import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fitness Events',
    description: "Join Tiger Terrain's upcoming fitness events, community runs, and challenges. Push your limits and grow with a supportive community.",
    alternates: {
        canonical: '/events',
    },
    openGraph: {
        title: 'Upcoming Fitness Events | Tiger Terrain',
        description: "Join Tiger Terrain's upcoming fitness events, community runs, and challenges.",
        url: 'https://tigerterrain.in/events',
        type: 'website',
    },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
