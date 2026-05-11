import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ',
    description: "Find answers to common questions about Tiger Terrain's fitness journeys, training, travel arrangements, and community events.",
    alternates: {
        canonical: '/faq',
    },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
