import type { Metadata } from "next";
import { Inter, Unbounded, Teko } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import FloatingActionButton from "@/components/FloatingActionButton";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unbounded",
});

const teko = Teko({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-teko",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tigerterrain.in'),
  title: {
    default: "Tiger Terrain - Experiential Fitness Journeys",
    template: "%s | Tiger Terrain"
  },
  description: "Tiger Terrain provides experiential fitness journeys that blend sun-soaked workouts, curated nutrition plans, recovery sessions, and epic adventures.",
  keywords: "fitness retreats, travel, adventure, wellness, vacation, fitness travel, Tiger Terrain",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tiger Terrain - Experiential Fitness Journeys",
    description: "This is where fitness meets travel. Experience week-long fitness journeys that blend sun-soaked workouts, curated nutrition plans, recovery sessions, and epic adventures.",
    url: 'https://tigerterrain.in',
    siteName: 'Tiger Terrain',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Tiger Terrain Fitness Journey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tiger Terrain - Experiential Fitness Journeys",
    description: "This is where fitness meets travel. Experience week-long fitness journeys that blend sun-soaked workouts, curated nutrition plans, recovery sessions, and epic adventures.",
    images: ['/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg'],
  },
  icons: {
    icon: [
      { url: "/images/website-logo1.png", type: "image/png", sizes: "32x32" },
      { url: "/images/website-logo1.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/images/website-logo1.png",
    apple: "/images/website-logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to image domains */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />

        {/* Add resource hints for critical resources */}
        <link rel="preload" href="/video/BG2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/images/left-logo.svg" as="image" type="image/svg+xml" />

        <StructuredData />

        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R0MRY5BL62"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R0MRY5BL62');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '745384248302105');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=745384248302105&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.className} ${unbounded.variable} ${teko.variable} antialiased`}>
        {children}
        <FloatingActionButton />
      </body>
    </html>
  );
}
