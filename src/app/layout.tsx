import type { Metadata } from "next";
import { Inter, Unbounded, Teko } from "next/font/google";
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
      { url: "/images/website-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/images/website-logo.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/images/website-logo.png",
    apple: "/images/website-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${unbounded.variable} ${teko.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
