import React from 'react';
import Image from 'next/image';

type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  access: string;
  time: string;
  location: string;
  priceLabel: string;
  imageSrc: string;
};

const events: EventItem[] = [
  // {
  //   id: 'coastal-half-marathon',
  //   title: 'COASTAL HALF MARATHON',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
  //   date: 'September 20, 2025',
  //   access: 'General',
  //   time: 'Start 05:00 AM – Finish',
  //   location: 'South Jakarta',
  //   priceLabel: '$50',
  //   imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg1.png?updatedAt=1755518290200',
  // },
  {
    id: 'PHUKET',
    title: 'PHUKET',
    description:
      'Phuket stands out as a premier fitness and wellness destination, ideal for those seeking to achieve their fitness goals in a vibrant environment.',
    date: 'December 12, 2025',
    access: 'Member Only',
    time: 'Start 05:00 AM – Finish',
    location: 'Phuket',
    priceLabel: '$50',
    imageSrc: 'https://ik.imagekit.io/t8xk4h5as/reviews/Bg2.png?updatedAt=1755519446260',
  },
];

const UpcomingEvents = () => {
  return (
    <section className="relative py-20 bg-gray-100">
      <div className="max-w-[1425px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#e77d26] text-white text-xs tracking-wider uppercase mb-4 hover:bg-black hover:text-white transition-colors duration-200">
            - Upcoming Adventures -
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl md:text-5xl font-extrabold tracking-tight text-gray-900 uppercase" style={{ fontFamily: 'var(--font-teko)' }}>
            Upcoming Adventures
          </h2>
        </div>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-200"
            >
              {/* Left ticket column */}
              <div className="lg:col-span-3 bg-[#e77d26] text-white p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Morning Event */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                      </svg>
                    </div>
                    <div className="text-white text-sm font-medium">
                      Morning – Beach Bootcamp
                    </div>
                  </div>

                  {/* Afternoon Event */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/leaf.png"
                        alt="Leaf"
                        width={24}
                        height={24}
                        className="h-6 w-6 brightness-0 invert"
                      />
                    </div>
                    <div className="text-white text-sm font-medium">
                      Afternoon – Nutrition Workshop
                    </div>
                  </div>

                  {/* Evening Event */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/networking.png"
                        alt="Networking"
                        width={24}
                        height={24}
                        className="h-6 w-6 brightness-0 invert"
                      />
                    </div>
                    <div className="text-white text-sm font-medium">
                      Evening – Networking Party
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-8">
                  <button
                    className="w-full bg-white text-black px-4 py-3 rounded-full font-semibold text-base uppercase tracking-wide hover:bg-gray-100 transition-colors"
                    style={{ fontFamily: 'var(--font-teko)' }}
                  >
                    VIEW FULL ITINERARY
                  </button>
                </div>
              </div>

              {/* Middle content */}
              <div className="lg:col-span-5 p-8 lg:border-r lg:border-gray-200">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'var(--font-teko)' }}>
                  {event.title}
                </h3>
                <p className="mt-3 text-base text-gray-700 max-w-2xl">{event.description}</p>

                <div className="mt-5 space-y-3 text-sm text-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center text-[#e77d25]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v3H3V6a2 2 0 012-2h1V3a1 1 0 112 0v1z" /><path d="M3 10h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" /></svg>
                    </span>
                    <span>{event.date}</span>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center text-[#e77d25]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10a5 5 0 1110 0 5 5 0 01-10 0zm-4 9a7 7 0 0114 0v1H3v-1z" /></svg>
                    </span>
                    <span>{event.access}</span>
                  </div> */}
                  {/* <div className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center text-[#e77d25]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a1 1 0 011 1v3.382l2.447 1.224a1 1 0 11-.894 1.788l-3.106-1.555A1 1 0 0111 14V9a1 1 0 011-1z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                    </span>
                    <span>{event.time}</span>
                  </div> */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center text-[#e77d25]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" /></svg>
                    </span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Right image */}
              <div className="lg:col-span-4 relative h-64 sm:h-72 lg:h-auto">
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 40vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="px-6 py-3 rounded-full text-white bg-[#e77d25] font-semibold hover:bg-gray-900 uppercase">
            View More Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;


