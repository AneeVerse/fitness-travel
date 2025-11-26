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
  'kombucha-1': {
    slug: 'kombucha-1',
    title: 'KOMBUCHA EVENT',
    description: 'Join us for an amazing Kombucha event experience. Discover the art of fermentation and wellness in a unique setting.',
    dates: 'Coming Soon',
    location: 'TBA',
    heroVideo: '/video/Phuket_20250910_133428_0001.mp4',
    highlights: [
      'Kombucha brewing workshop',
      'Wellness and fermentation education',
      'Tasting sessions',
      'Expert guidance',
      'Community experience'
    ],
    periods: [
      {
        id: 'MORNING',
        period: 'Morning',
        title: 'Kombucha Introduction & Brewing Basics',
        description: 'Welcome session and introduction to Kombucha\nLearn the fundamentals of fermentation\nBasic brewing techniques and equipment overview',
        time: '9:00 AM - 12:00 PM',
        image: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
        videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
      },
      {
        id: 'AFTERNOON',
        period: 'Afternoon',
        title: 'Hands-On Brewing & Tasting',
        description: 'Practical brewing session\nTaste different Kombucha varieties\nQ&A with experts',
        time: '1:00 PM - 4:00 PM',
        image: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
        videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
      },
      {
        id: 'EVENING',
        period: 'Evening',
        title: 'Wellness & Community Gathering',
        description: 'Wellness benefits discussion\nCommunity sharing and networking\nClosing ceremony and take-home kit',
        time: '5:00 PM - 8:00 PM',
        image: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
        videoSrc: '/video/Phuket_20250910_133428_0001.mp4',
      }
    ],
    overview: {
      mainTitle: 'DISCOVER THE ART OF KOMBUCHA',
      subtitle: 'What to Expect?',
      description: [
        'Join us for an immersive Kombucha experience where you\'ll learn the ancient art of fermentation. Our event combines hands-on learning with wellness education, giving you the skills to brew your own Kombucha at home.',
        'Whether you\'re a complete beginner or looking to refine your brewing techniques, this event offers something for everyone. Connect with like-minded wellness enthusiasts and discover the health benefits of fermented beverages.'
      ],
      images: [
        '/images/srilanka day images/Untitled (1920 x 1080 px).zip - 1.png',
        '/images/srilanka day images/Untitled design.zip - 1.png',
        '/images/srilanka day images/Untitled design.zip - 2.png'
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

