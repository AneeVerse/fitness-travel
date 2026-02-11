import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/studio/',
                    '/cms/',
                    '/thank-you',
                    '/confirmation',
                    '/dashboard/',
                ],
            },
            {
                userAgent: [
                    'GPTBot',
                    'Google-Extended',
                    'Claude-Web',
                    'Bytespider',
                    'CCBot',
                    'PerplexityBot',
                    'Applebot-Extended',
                ],
                allow: '/',
            },
        ],
        sitemap: 'https://tigerterrain.in/sitemap.xml',
    };
}
