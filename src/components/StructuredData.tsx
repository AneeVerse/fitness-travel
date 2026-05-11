import React from 'react';

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Tiger Terrain",
        "description": "Tiger Terrain provides experiential fitness journeys that blend sun-soaked workouts, curated nutrition plans, recovery sessions, and epic adventures.",
        "url": "https://tigerterrain.in",
        "logo": "https://tigerterrain.in/images/website-logo1.png",
        "image": "https://tigerterrain.in/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg",
        "telephone": "+91-XXXXXXXXXX", // Replace with real phone if found
        "email": "info@tigerterrain.in",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Habaraduwa",
            "addressLocality": "Galle",
            "addressRegion": "Southern Province",
            "postalCode": "XXXXXX",
            "addressCountry": "LK"
        },
        "sameAs": [
            "https://www.instagram.com/tigerterrain/",
            "https://www.facebook.com/tigerterrain"
        ],
        "openingHours": "Mo-Su 09:00-18:00"
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Tiger Terrain",
        "url": "https://tigerterrain.in",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://tigerterrain.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
