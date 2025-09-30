export interface DayItem {
  id: string;
  day: string;
  title: string;
  description: string;
  extraContent: string;
  time: string;
  image: string;
  videoSrc: string;
}

export interface TripData {
  slug: string;
  title: string;
  description: string;
  dates: string;
  stay: string;
  location: string;
  heroVideo: string;
  highlights: string[];
  days: DayItem[];
  pricing: {
    tourA?: {
      title: string;
      cost: string;
      duration: string;
      dates: string;
      includes: string[];
      excludes: string[];
    };
    tourB?: {
      title: string;
      cost: string;
      duration: string;
      dates: string;
      includes: string[];
      excludes: string[];
    };
  };
  overview: {
    mainTitle: string;
    subtitle: string;
    description: string[];
    images: string[];
  };
}

const tripDataMap: Record<string, TripData> = {
  phuket: {
    slug: 'phuket',
    title: 'PHUKET FITCATION',
    description: 'Get fit at Fitcation! Phuket stands out as a premier fitness and wellness destination, ideal for those seeking to achieve their fitness goals in a vibrant environment. Experience all-inclusive training, nutrition guidance, and unforgettable adventures in Thailand\'s most dynamic fitness culture.',
    dates: '17 Aug - 25 Aug 2024',
    stay: 'Marina House - Standard Room\nPool Access Room',
    location: 'Phuket, Thailand',
    heroVideo: '/video/BG2.mp4',
    highlights: [
      'Professional fitness training sessions',
      'Muay Thai and beach workouts',
      'Spa and recovery sessions',
      'Cultural exploration of Phuket Town',
      'Boat party and social activities'
    ],
    days: [
      {
        id: 'DAY1',
        day: 'Day 1',
        title: 'Arrive and Welcome to Phuket',
        description: 'Check In, Intros & Briefing on the week ahead',
        extraContent: 'Leave for Phuket Town for Tour',
        time: 'All Day',
        image: '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
        videoSrc: '/video/vids/vid (1).mp4',
      },
      {
        id: 'DAY2',
        day: 'Day 2',
        title: 'HIIT Workout & Hot Yoga',
        description: '9.30 - HIIT Workout',
        extraContent: '10.30 - Breakfast followed by free exploration, 4.30PM - Hot Yoga session',
        time: '9:30 AM - 6:00 PM',
        image: '/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg',
        videoSrc: '/video/vids/vid (2).mp4',
      },
      {
        id: 'DAY3',
        day: 'Day 3',
        title: 'BodyFit & Outdoor Training',
        description: '8.00 - BodyFit Workout',
        extraContent: '9.30 - Breakfast followed by free exploration, 4.30PM - Outdoor Session',
        time: '8:00 AM - 6:00 PM',
        image: '/images/itinerary/overview/67caa708e544afc27b621096_DJI_20240906165547_0062_D.jpg',
        videoSrc: '/video/vids/vid (3).mp4',
      },
      {
        id: 'DAY4',
        day: 'Day 4',
        title: 'Beach Training & Muay Thai',
        description: '7.15 - Beach Training',
        extraContent: '10.00 - Breakfast followed by free exploration, 5.00 PM - Muay Thai Session',
        time: '7:15 AM - 7:00 PM',
        image: '/images/itinerary/trip-detail/67caa2ebf51676caac79a4b1__IBZ2168.jpg',
        videoSrc: '/video/vids/vid (4).mp4',
      },
      {
        id: 'DAY5',
        day: 'Day 5',
        title: 'Big Buddha Run & Recovery',
        description: '7.15 - Big Buddha Run',
        extraContent: '10.00 - Breakfast followed by free exploration, 4.00 PM - Pool Recovery Session',
        time: '7:15 AM - 6:00 PM',
        image: '/images/itinerary/trip-detail/67caa2ec0caaf1415ff27c65__IBZ4671.jpg',
        videoSrc: '/video/vids/vid (5).mp4',
      },
      {
        id: 'DAY6',
        day: 'Day 6',
        title: 'Partner Chipper & Spa',
        description: '9.30 - Breakfast',
        extraContent: '11.00 - Partner Chipper, 4.00 PM - OnSen Spa',
        time: '9:30 AM - 7:00 PM',
        image: '/images/itinerary/trip-detail/67caa4ac34cc07b6457e13c1_saguaita_06.jpg',
        videoSrc: '/video/vids/vid (6).mp4',
      },
      {
        id: 'DAY7',
        day: 'Day 7',
        title: 'Free Day & Boat Party',
        description: '10.00 - Breakfast followed by free exploration',
        extraContent: '11.00 - 7PM - Boat Party (optional)',
        time: '10:00 AM - 11:00 PM',
        image: '/images/itinerary/trip-detail/67caa4b2e6dc3ee2fb637f43_1salt escapes-ibz--2 2.jpg',
        videoSrc: '/video/vids/vid (7).mp4',
      },
      {
        id: 'DAY8',
        day: 'Day 8',
        title: 'Departure',
        description: '8.00 AM Transfer back to Airport',
        extraContent: 'Check out and farewell to your new fitness family',
        time: '8:00 AM - 12:00 PM',
        image: '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
        videoSrc: '/video/vids/vid (8).mp4',
      }
    ],
    pricing: {},
    overview: {
      mainTitle: 'FIND OUT WHAT YOU ARE MADE UP OF',
      subtitle: 'Who is it for?',
      description: [
        'The journey with Tiger Terrain is not about taking a holiday or chasing a fleeting transformation, but regaining your sense of direction and embracing a sustainable lifestyle change by breaking bad habits and adopting new ones. You do this by improving your fitness and mental well-being, meeting like minded people and by immersing with local culture. Overall helping you meet a stronger, more authentic version of yourself.',
        'Tiger Terrain isn\'t reserved only for elite athletes, nor is it exclusive to any gender. It\'s designed for anyone and everyone eager to embark on a journey of self-discovery.'
      ],
      images: [
        '/images/itinerary/overview/67caa35702778b22b065cb12_SALT ESCAPES-IBZ-5096.jpg',
        '/images/itinerary/overview/67caa4b283d56183dd43328a_2SALT ESCAPES-IBZ-4551.jpg',
        '/images/itinerary/overview/67caa708e544afc27b621096_DJI_20240906165547_0062_D.jpg'
      ]
    }
  },
  
  // COMMENTED OUT: Bali trip data
  /*
  bali: {
    slug: 'bali',
    title: 'BALI FITCATION',
    description: 'Join our Bali Fitcation for an unforgettable 11-day adventure, packed with unlimited fun and training. Highlights include invigorating workouts at Wanderlust Gym, thrilling surfing sessions, a sunrise trek to Mount Batur, a refreshing visit to Tukad Waterfall, cultural exploration in Ubud, high-energy trampoline workouts at Bounce Fit, ultimate relaxation at AMO Spa\'s ice bath and recovery massage, and guided nutrition to fuel your journey.',
    dates: '15 Feb 2024 To 25 Feb 2024',
    stay: 'The Sanskara Suites and Villas\nCanggu & Ubud Stay',
    location: 'Bali, Indonesia',
    heroVideo: '/video/hero-bg.mp4',
    highlights: [
      'Workouts at Wanderlust Gym',
      'Surfing Adventures at Canggu',
      'Mount Batur Sunrise Trek',
      'Tukad Waterfall Exploration',
      'Ubud Cultural Experience',
      'Bounce Fit Trampoline Workouts',
      'AMO Spa Ice Bath & Recovery Massage',
      'Guided Nutrition'
    ],
    days: [
      {
        id: 'DAY1',
        day: 'Day 1',
        title: 'Arrival in Bali',
        description: 'Arrive at the airport and head to the hotel',
        extraContent: 'Rest and Shower',
        time: 'All Day',
        image: '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
        videoSrc: '/video/vids/vid (1).mp4',
      },
      {
        id: 'DAY2',
        day: 'Day 2',
        title: 'Waterfall & Temple Visit',
        description: 'Discover the breathtaking Tukad Waterfall',
        extraContent: 'Afternoon: Immerse yourself in Balinese culture with a temple visit. Evening: Experience Ubud\'s vibrant cafe scene and cultural charm.',
        time: 'All Day',
        image: '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
        videoSrc: '/video/vids/vid (2).mp4',
      },
      {
        id: 'DAY3',
        day: 'Day 3',
        title: 'Mount Batur Sunrise Trek',
        description: 'Early Morning: Embark on an unforgettable journey to Mount Batur',
        extraContent: 'Hike to the summit and witness the sunrise over Bali\'s stunning landscapes. Explore the enchanting town of ubud.',
        time: 'Early Morning - Evening',
        image: '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
        videoSrc: '/video/vids/vid (3).mp4',
      },
      {
        id: 'DAY4',
        day: 'Day 4',
        title: 'Rice Terrace & Move to Canggu',
        description: 'Morning: Venture to the iconic Tegalalang Rice Terrace',
        extraContent: 'Explore the lush green fields and capture the breathtaking scenery. Evening: Head to Canggu. Let the adventure begin!',
        time: 'Morning - Evening',
        image: '/images/destination/67ca88549e7c183c26d66919_salt escapes-zth-5523.avif',
        videoSrc: '/video/vids/vid (4).mp4',
      },
      {
        id: 'DAY5',
        day: 'Day 5',
        title: 'Wanderlust Gym Double Session',
        description: '7am: Breakfast. Morning: Energize with invigorating workout at Wanderlust Gym',
        extraContent: 'Lunch: Refuel with healthy lunch. Afternoon: Relax by the pool. Evening: Return to Wanderlust Gym for another empowering fitness session.',
        time: '7:00 AM - 8:00 PM',
        image: '/images/destination/67d16364be156e695fec148f__PAS5177.jpg',
        videoSrc: '/video/vids/vid (5).mp4',
      },
      {
        id: 'DAY6',
        day: 'Day 6',
        title: 'Surfing & CrossFit',
        description: 'Morning: Catch some waves with a morning surfing lesson',
        extraContent: 'Evening: Head back to Wanderlust Gym for an evening CrossFit session. Beach Yoga session included.',
        time: 'Morning - Evening',
        image: '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
        videoSrc: '/video/vids/vid (6).mp4',
      },
      {
        id: 'DAY7',
        day: 'Day 7',
        title: 'Beach Yoga & Gymnastics',
        description: 'Morning: Begin your day with tranquility during a beachfront yoga session',
        extraContent: 'Evening: Enhance your strength and agility with a Nirvana Strength gymnastics workout at the gym.',
        time: 'Morning - Evening',
        image: '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
        videoSrc: '/video/vids/vid (7).mp4',
      },
      {
        id: 'DAY8',
        day: 'Day 8',
        title: 'Beach Training & Bounce Bali',
        description: 'Morning: Kickstart your day with an invigorating beach training session',
        extraContent: 'Evening: Get ready for a unique workout experience with a session at Bounce Bali. Jump into trampoline workouts.',
        time: 'Morning - Evening',
        image: '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg',
        videoSrc: '/video/vids/vid (8).mp4',
      },
      {
        id: 'DAY9',
        day: 'Day 9',
        title: 'Wanderlust & Nightlife',
        description: 'Morning: Start your day with another empowering session at Wanderlust Gym',
        extraContent: 'Evening: Embrace the lively nightlife and dining scene in Canggu and Seminyak.',
        time: 'Morning - Night',
        image: '/images/destination/67ca88549e7c183c26d66919_salt escapes-zth-5523.avif',
        videoSrc: '/video/vids/vid (9).mp4',
      },
      {
        id: 'DAY10',
        day: 'Day 10',
        title: 'AMO Spa & Beach Club',
        description: 'Morning: Indulge in a revitalizing recovery session at AMO Spa Bali',
        extraContent: 'Recharging your body and senses after intense training. Evening: Head to a beach club for a memorable party.',
        time: 'Morning - Night',
        image: '/images/destination/67d16364be156e695fec148f__PAS5177.jpg',
        videoSrc: '/video/vids/vid (10).mp4',
      },
      {
        id: 'DAY11',
        day: 'Day 11',
        title: 'Farewell Bali',
        description: 'Take a moment to reflect on the wonderful memories created',
        extraContent: 'Bid farewell to this enchanting island, cherishing the experiences that will stay with you forever.',
        time: 'All Day',
        image: '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
        videoSrc: '/video/vids/vid (11).mp4',
      }
    ],
    pricing: {
      tourA: {
        title: 'Tour A (10 Days) Canggu and Ubud',
        cost: '99500/-',
        duration: '10 Days',
        dates: '15 Feb 2024-25 feb 2024',
        includes: [
          'Accommodation (may vary depending on availability and group size)',
          'Meals: At Canggu: Breakfast and dinner. At Ubud: Daily Breakfast only',
          'All ground transportation including airport transfers',
          'Admission to Wanderlust',
          'Surfing lesson',
          'Access to Nirvana Strength',
          'Admission to Bounce trampoline park',
          'Beach yoga sessions',
          'A relaxing spa recovery session',
          'Guided trip to Mount Batur (subject to weather conditions)',
          'Visit to Tukad Waterfall',
          'Exploring Ubud Market',
          'Visit to the picturesque rice terraces'
        ],
        excludes: [
          'Airfare to and from Bali',
          'Lunch (travelers are free to explore local dining options)',
          'Dinner in Ubud',
          'Visa',
          'Insurance',
          'Personal expenses and optional activities'
        ]
      },
      tourB: {
        title: 'Tour B (7 Days) Canggu',
        cost: '77500/-',
        duration: '7 Days',
        dates: '18 Feb 2024-25 feb 2024',
        includes: [
          'Accommodation (may vary depending on availability and group size)',
          'Daily breakfast and dinner',
          'All ground transportation including airport transfers',
          'Admission to Wanderlust',
          'A surf lesson',
          'Access to Nirvana Strength',
          'Admission to Bounce trampoline park',
          'Beach yoga sessions',
          'A relaxing spa recovery session'
        ],
        excludes: [
          'Airfare to and from Bali',
          'Lunch (travelers are free to explore local dining options)',
          'Visa',
          'Insurance',
          'Personal expenses and optional activities'
        ]
      }
    },
    overview: {
      mainTitle: 'TRANSFORM YOUR BODY AND MIND IN PARADISE',
      subtitle: 'Why Choose Bali?',
      description: [
        'Bali offers the perfect blend of fitness challenges and tropical serenity. Our retreat combines high-intensity training with the healing power of Balinese culture. Experience world-class gyms like Wanderlust, ride the waves of Canggu, find your zen in Ubud\'s spiritual atmosphere, do sunrise treks up to Mount Batur and relax with recovery sessions at luxury spas. All in all, every moment is designed to push your limits while nourishing your soul.',
        'Whether you\'re a fitness enthusiast or a beginner looking to start your wellness journey, our Bali Fitcation welcomes everyone ready to transform their life in paradise.'
      ],
      images: [
        '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
        '/images/destination/67c950df732207c200bc9b76__MEN2735.jpg',
        '/images/destination/67ca863918ea71bda2c8c734__zth9587-2.jpg'
      ]
    }
  },
  */

  goa: {
    slug: 'goa',
    title: 'GOA FITCATION',
    description: 'Unleash your inner wellness with our Goa Fitcation! Experience the perfect blend of beach training, yoga, pool recovery, and team building activities. Enjoy retreat vibes at a selected luxury hotel while connecting with like-minded fitness enthusiasts in India\'s most vibrant coastal destination.',
    dates: 'Feb 3 – 6, 2022',
    stay: 'White Woods Resort & Spa\nTwin Sharing Basis',
    location: 'Goa, India',
    heroVideo: '/video/BG2.mp4',
    highlights: [
      'Beach Training Sessions',
      'Sunrise Yoga on the Beach',
      'Pool Recovery Sessions',
      'Team Building & Fun Activities',
      'Beach, Beer & Workout',
      'Community Dinner Experience'
    ],
    days: [
      {
        id: 'DAY1',
        day: 'Day 1',
        title: 'Arrival & Welcome',
        description: 'Check-in: 1 PM. 4:30 PM: Briefing & High Tea',
        extraContent: 'Evening: Dinner with Teammates',
        time: '1:00 PM - 10:00 PM',
        image: '/images/destination/67c5575c5c0e63ac45056a4b_salt-escapes-IMG_2185.avif',
        videoSrc: '/video/vids/vid (1).mp4',
      },
      {
        id: 'DAY2',
        day: 'Day 2',
        title: 'Sunrise Yoga & Beach Training',
        description: '6:00 AM: Sunrise Yoga. 7:30 – 8:30 AM: Beach Training (Surprise 😊)',
        extraContent: '9:00 AM: Breakfast. 1:00 PM: Lunch. 4:30 PM: Gather at Pool. 5:00 – 6:00 PM: Pool Recovery. Free time to explore',
        time: '6:00 AM - Evening',
        image: '/images/contact/How-to-Choose-The-Right-Running-Group.jpg',
        videoSrc: '/video/vids/vid (2).mp4',
      },
      {
        id: 'DAY3',
        day: 'Day 3',
        title: 'Beach Training & Community Dinner',
        description: '7:30 – 8:30 AM: Beach Training (Water Activity, Core Mash in Sea 😊)',
        extraContent: '9:00 AM: Breakfast. 1:00 PM: Lunch. 4:30 PM: Gather at Beach. 5:00 – 6:00 PM: Surprise Element. 6:15 – 7:15 PM: Beach, Beer & Workout. 9:00 PM: Community Dinner',
        time: '7:30 AM - 10:00 PM',
        image: '/images/events/amateur-runners-on-the-move-2024-12-05-09-59-03-7QT36BK.jpg',
        videoSrc: '/video/vids/vid (3).mp4',
      },
      {
        id: 'DAY4',
        day: 'Day 4',
        title: 'Farewell & Departure',
        description: '8:00 AM: Breakfast. 10:00 AM: High-Five to teammates & Goodbye',
        extraContent: 'Checkout and take memories that will last a lifetime',
        time: '8:00 AM - 12:00 PM',
        image: '/images/events/keep-going-even-when-its-hard-2025-04-05-23-40-04-4AY2ELM.jpg',
        videoSrc: '/video/vids/vid (4).mp4',
      }
    ],
    pricing: {
      tourA: {
        title: 'Goa Fitcation Bootcamp',
        cost: 'INR 10.5K',
        duration: '4 Days / 3 Nights',
        dates: 'Feb 3 – 6, 2022',
        includes: [
          'Accommodation at White Woods Resort, Twin Sharing Basis (3 Nights / 4 Days)',
          'Breakfast',
          'Beach Yoga',
          'Beach Training',
          'Pool Recovery',
          'Team Building & Fun Activities'
        ],
        excludes: [
          'Travelling',
          'Food (Lunch & Dinner)',
          'Transit to Hotel and Workout Sites',
          'Anything not mentioned in inclusion'
        ]
      }
    },
    overview: {
      mainTitle: 'DISCOVER YOUR FITNESS POTENTIAL IN GOA',
      subtitle: 'Why Goa Fitcation?',
      description: [
        'Goa provides the perfect backdrop for a transformative fitness experience. Tiger Terrain combines the energy of beach workouts with the relaxation of coastal vibes, where you\'ll experience unique training sessions right on the beach with the sound of waves as your soundtrack and the sand beneath your feet adding extra challenge to every movement. Connect with fellow fitness enthusiasts in a supportive community environment where new friendships are forged through shared challenges and triumphs. From waking up to sunrise yoga sessions to enjoying evening beach parties, every moment is designed to energize your body, refresh your mind, and etch memories that last a lifetime.',
        'Whether you\'re a fitness enthusiast or a beginner looking to start your wellness journey, our Goa Fitcation welcomes everyone ready to transform their life in paradise.'
      ],
      images: [
        '/images/contact/How-to-Choose-The-Right-Running-Group.jpg',
        '/images/events/amateur-runners-on-the-move-2024-12-05-09-59-03-7QT36BK.jpg',
        '/images/events/keep-going-even-when-its-hard-2025-04-05-23-40-04-4AY2ELM.jpg'
      ]
    }
  }
};

export function getTripData(slug: string): TripData | null {
  return tripDataMap[slug] || null;
}

export function getAllTripData(): TripData[] {
  return Object.values(tripDataMap);
}
