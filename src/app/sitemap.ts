import { MetadataRoute } from 'next';
import { getAllTripData } from '@/lib/tripData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tigerterrain.in';

    // Base pages
    const pages = [
        '',
        '/about',
        '/contact',
        '/events',
        '/faq',
        '/privacy',
        '/terms',
        '/itinerary',
    ];

    const routes = pages.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: page === '' ? 1 : 0.8,
    }));

    // Dynamic trip pages
    const trips = getAllTripData();
    const tripRoutes = trips.map((trip) => ({
        url: `${baseUrl}/itinerary/${trip.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...tripRoutes];
}
