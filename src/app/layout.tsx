import type { Metadata } from "next";
import { Inter, Unbounded, Teko } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
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
  title: "Fitness Travel - Adventure Fitness Retreats",
  description: "Join our week-long fitness retreats for like-minded travelers. Experience mouth-watering food, sun-soaked workouts, and epic adventures.",
  keywords: "fitness retreats, travel, adventure, wellness, vacation, fitness travel",
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
            style={{display:'none'}}
            src="https://www.facebook.com/tr?id=745384248302105&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.className} ${unbounded.variable} ${teko.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
