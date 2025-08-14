import Image from 'next/image';
import { Teko } from 'next/font/google';

type Coach = {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  socials?: { label: string; href: string }[];
};

const coaches: Coach[] = [
  {
    id: 'luca-moretti',
    name: 'LUCA MORETTI',
    role: 'Trail Running Expert',
    imageSrc: '/images/coach/6790140149edfaf408fa8ef7_license img 9.avif',
  },
  {
    id: 'emily-carter',
    name: 'EMILY CARTER',
    role: "Women's Running Coach",
    imageSrc: '/images/coach/67901401c1810a8d2b8412a1_license img 11.avif',
  },
  {
    id: 'sophie-muller',
    name: 'SOPHIE MÜLLER',
    role: 'Recovery Prevention Coach',
    imageSrc: '/images/coach/67901401204b65f18364f44f_license img 12.avif',
  },
  {
    id: 'james-bennett',
    name: 'JAMES BENNETT',
    role: 'Marathon Strategy',
    imageSrc: '/images/coach/67901401f78a86377fc8764d_license img 19.avif',
  },
];

const iconClasses = 'w-4 h-4 fill-current';
const SocialIcon = ({ type }: { type: 'fb' | 'ig' | 'li' }) => {
  if (type === 'fb') {
    return (
      <svg viewBox="0 0 24 24" className={iconClasses}>
        <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15c-1.2 0-1.6.8-1.6 1.6V12H17l-.5 3h-2.1v7A10 10 0 0022 12z" />
      </svg>
    );
  }
  if (type === 'ig') {
    return (
      <svg viewBox="0 0 24 24" className={iconClasses}>
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.2a1 1 0 11-1-1 1 1 0 011 1z" />
      </svg>
    );
  }
  // LinkedIn (brand-style square with "in")
  return (
    <svg viewBox="0 0 24 24" className={iconClasses} aria-hidden="true">
      <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.543C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.06 20.452H3.56V9h3.5v11.452zM5.31 7.433a2.03 2.03 0 110-4.06 2.03 2.03 0 010 4.06zM20.452 20.452h-3.5v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.5V9h3.36v1.561h.047c.468-.9 1.62-1.852 3.332-1.852 3.589 0 4.249 2.371 4.249 5.455v6.288z" />
    </svg>
  );
};

const teko = Teko({ subsets: ['latin'], weight: ['400','600','700'] });

const CoachesSection: React.FC = () => {
  return (
    <section className="relative py-16 bg-gray-100">
      <div className="mx-8 sm:mx-12 lg:mx-16">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e77d25]" />
            Meet Your Tribe Leaders
            </span>
            <h2 className={`mt-3 text-4xl md:text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[0.95] ${teko.className}`}>
              Our Experienced Coaches
              <br className="hidden sm:block" />
              Are Here To Support
            </h2>
          </div>
          <div>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#e77d25] text-white font-semibold hover:bg-black hover:text-white"
            >
              See Full Coaching Team
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((c) => (
            <article
              key={c.id}
              className="rounded-3xl bg-gray-200/70 border border-gray-200 shadow-sm overflow-hidden flex flex-col p-3"
            >
              <div className="relative h-[420px] rounded-2xl overflow-hidden">
                <Image src={c.imageSrc} alt={c.name} fill className="object-cover" />

                {/* Socials column */}
                <div className="absolute left-3 top-3 flex flex-col gap-2">
                  {['fb', 'ig', 'li'].map((type) => (
                    <a
                      key={type}
                      href="#"
                      className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black"
                      aria-label={`Open ${type} profile`}
                    >
                      <SocialIcon type={type as 'fb' | 'ig' | 'li'} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="px-4 py-4">
                <h3 className={`text-xl font-extrabold tracking-tight text-gray-900 uppercase ${teko.className}`}>
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{c.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;


