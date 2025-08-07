import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Fitness Travel - Adventure Fitness Retreats",
  description: "Join our week-long fitness retreats for like-minded travelers. Experience mouth-watering food, sun-soaked workouts, and epic adventures.",
  keywords: "fitness retreats, travel, adventure, wellness, vacation, fitness travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${unbounded.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
