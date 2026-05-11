import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Tiger Terrain (formerly known as Myden Fitcation) has been blending fitness and travel since 2016. Learn about our story, mission, and the community that grows with every stride.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About Us | Tiger Terrain',
        description: 'Learn about our story, mission, and the community that grows with every stride.',
        url: 'https://tigerterrain.in/about',
        type: 'website',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
