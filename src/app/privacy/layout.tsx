import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: "Read Tiger Terrain's privacy policy to understand how we collect, use, and protect your personal information.",
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
