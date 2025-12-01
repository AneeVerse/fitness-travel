export interface EventDayItem {
  id: string;
  period: string; // "Morning", "Afternoon", "Evening"
  title: string;
  description: string;
  time: string;
  image: string;
  videoSrc: string;
}

export interface EventData {
  slug: string;
  title: string;
  description: string;
  dates: string;
  location: string;
  heroVideo: string;
  highlights: string[];
  periods: EventDayItem[]; // Morning, Afternoon, Evening
  overview: {
    mainTitle: string;
    subtitle: string;
    description: string[];
    images: string[];
  };
}

const eventDataMap: Record<string, EventData> = {
  'kombucha-mornings': {
    slug: 'kombucha-mornings',
    title: 'KOMBUCHA MORNINGS',
    description: 'Kombucha Mornings is an exclusive, invite-only experience curated by Tiger Terrain, bringing together uber-cool fitness enthusiasts for a morning unlike any other. A fusion of high-performance workouts, functional nutrition, and community connection designed for those who live and breathe wellness.',
    dates: '13th Dec 2025 &amp; 10th Jan 2026',
    location: 'TBA',
    heroVideo: '/images/events/Videos for Kombucha Mornings2.mp4',
    highlights: [
      'Expert Coaches',
      'Equipment Provided',
      'Macro Balance',
      'Prepared by Nutrition Experts',
      'Community Connection'
    ],
    periods: [
      {
        id: 'MEET_THE_TIGERS',
        period: 'Meet the Tigers',
        title: 'Prepared for Performance',
        description: 'We meet our tribe at a sun-kissed venue, where everyone mingles around & get our vibe-check in place. This will be accompanied by preworkout elixirs and protein smoothies to prep us up for the drills ahead.\n\nDelivers Essential Ammo for the WOD Ahead',
        time: '7:00 AM - 7:30 AM',
        image: '/images/events/website images_/0001.png',
        videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
      },
      {
        id: 'GO_FOR_THE_KILL',
        period: 'Go for the Kill',
        title: 'HIIT Workout Session',
        description: 'We move to pairing up with partners for a YGIG style workout. You are briefed about the workout ahead which is followed by a quick warm up. And then you unleash your raw power as you dive into HIIT workouts that are synced with a playlist that radiates sunrise intensity.\n\nExpert Coaches\nEquipment Provided',
        time: '7:30 AM - 8:30 AM',
        image: '/images/events/website images_/0002.png',
        videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
      },
      {
        id: 'TIME_TO_ROAR',
        period: 'Time to Roar',
        title: 'Recovery & Connection',
        description: 'It\'s time to Cool down reward yourself. Fuel up with chef-designed macro-nutrient dense breakfast bowls accompanied with our signature kombucha drinks. Get together for picture perfect moments for the papps as we see wrap in style.\n\nMacro Balance\nPrepared by Nutrition Experts',
        time: '8:30 AM - 9:30 AM',
        image: '/images/events/website images_/0003.png',
        videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
      }
    ],
    overview: {
      mainTitle: 'KOMBUCHA MORNINGS - SUNRISE RITUAL THAT MATCHES YOUR VIBE',
      subtitle: 'Why should you come for Kombucha Mornings?',
      description: [
        'Kombucha Mornings by Tiger Terrain is an exclusive, invite-only experience curated for uber-cool fitness enthusiasts who love to start their day with purpose, energy, and community. The essence of Kombucha Mornings is to cultivate an elite community of fitness professionals and enthusiasts bonded by shared discipline, passion, and lifestyle.',
        'This is where lifestyle and fitness meets its community.',
        'This experiential micro-event will be hosted in a sun-kissed venue that exudes pure energies of fitness enthusiasts. The event begins with refreshing pre-workout drinks, setting the tone for a high-vibe morning. Participants then join a briefing that walks them through the celebrity-styled HIIT workout designed to challenge, engage, and push their limits through adrenaline-pumping movement. After the session, guests enjoy a nutritious, macro-balanced breakfast crafted for recovery and wellness, followed by time to connect, network, and strengthen the growing Tiger Terrain tribe.'
      ],
      images: [
        '/images/events/website images_/WhatsApp Image 2025-11-23 at 20.00.39.jpeg',
        '/images/events/website images_/3.png',
        '/images/events/website images_/4.png'
      ]
    }
  }
};

export function getEventData(slug: string): EventData | null {
  return eventDataMap[slug] || null;
}

export function getAllEventData(): EventData[] {
  return Object.values(eventDataMap);
}

