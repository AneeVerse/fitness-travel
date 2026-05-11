import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: "Read the terms and conditions for participating in Tiger Terrain's fitness journeys and using our services.",
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
