"use client";

import React, { useState } from 'react';
import { Teko } from 'next/font/google';

const teko = Teko({ subsets: ['latin'], weight: ['400', '600', '700'] });

const TermsConditionsSection = () => {
  const [activeSection, setActiveSection] = useState('terms');

  const sections = [
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'cancellation', label: 'Cancellation Policy' },
    { id: 'liability', label: 'Liability & Safety' },
  ];

  const content = {
    terms: {
      title: 'Terms & Conditions for Fitcation',
      items: [
        {
          subtitle: 'Itinerary Changes',
          text: 'The itinerary is subject to change without prior notice. While we make every effort to adhere to the planned schedule, unforeseen circumstances or events beyond our control may necessitate modifications to the itinerary. Any changes to the itinerary will be communicated to participants as soon as possible.'
        },
        {
          subtitle: 'Representation Disclaimer',
          text: 'Some pictures used in promotional materials, including flyers, brochures, and websites, are for representation purposes only. Actual accommodations, activities, or destinations may vary. We strive to provide accurate representations of the fitcation experience but cannot guarantee identical experiences due to factors such as weather conditions, availability, or operational changes.'
        },
        {
          subtitle: 'Terms Subject to Change',
          text: 'The terms and conditions of the fitcation are subject to change without prior notice. Participants are advised to review the most up-to-date terms and conditions before booking or participating in the fitcation. By participating in the fitcation, participants agree to abide by the latest terms and conditions as outlined by the organizers.'
        },
        {
          subtitle: 'Legal Jurisdiction',
          text: 'Any disputes arising from the fitcation or related activities shall be governed by the laws of the jurisdiction where the fitcation takes place.'
        }
      ]
    },
    cancellation: {
      title: 'Cancellation Policy',
      items: [
        {
          subtitle: 'Policy Overview',
          text: 'Cancellation policies may vary depending on the specific fitcation package and booking terms. Participants are advised to review the cancellation policy provided at the time of booking.'
        },
        {
          subtitle: 'Refund Process',
          text: 'Refunds will be processed according to the terms specified at the time of booking. Please refer to your booking confirmation for specific cancellation terms and refund eligibility.'
        },
        {
          subtitle: 'Force Majeure',
          text: 'In case of circumstances beyond our control such as natural disasters, political unrest, or pandemic restrictions, special cancellation terms may apply. We will work with participants to reschedule or provide appropriate alternatives.'
        }
      ]
    },
    liability: {
      title: 'Liability & Safety Information',
      items: [
        {
          subtitle: 'Liability Waiver',
          text: 'Participants are required to sign a liability waiver before participating in any fitness activities or excursions during the fitcation. By signing the waiver, participants acknowledge and accept any inherent risks associated with the activities and agree to release the organizers from any liability.'
        },
        {
          subtitle: 'Participant Responsibilities',
          text: 'Participants are responsible for ensuring their fitness level is suitable for the activities included in the fitcation itinerary. Participants are responsible for their personal belongings and valuables throughout the fitcation. Participants are expected to conduct themselves in a respectful and cooperative manner towards fellow participants, staff, and local communities.'
        },
        {
          subtitle: 'Health and Safety',
          text: 'Participants are responsible for their own health and safety during the fitcation. It is recommended to consult with a healthcare professional before undertaking any strenuous physical activities. Participants are required to adhere to any safety guidelines or instructions provided by the organizers or activity guides.'
        },
        {
          subtitle: 'Medical Requirements',
          text: 'Participants must disclose any medical conditions, injuries, or physical limitations that may affect their participation in fitness activities. It is strongly recommended to have appropriate travel and health insurance coverage.'
        }
      ]
    }
  };

  return (
    <section className="relative py-12 sm:py-14 md:py-16 lg:py-20 bg-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef4a25] text-white text-xs tracking-wider uppercase hover:bg-black hover:text-white transition-colors duration-200">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            LEGAL INFORMATION
          </span>
          <h2 className={`mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[48px] font-extrabold tracking-tight text-white leading-[0.9] ${teko.className}`}>
            Terms & Conditions
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto mt-4">
            Please read these terms and conditions carefully before booking or participating in the fitcation.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-wrap gap-2 bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 border border-gray-800">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 border-0 outline-none focus:outline-none transform hover:scale-105 ${
                  activeSection === section.id
                    ? 'bg-[#ef4a25] text-white shadow-lg shadow-[#ef4a25]/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/70'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-800/50">
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 ${teko.className}`}>
              {content[activeSection as keyof typeof content].title}
            </h3>

            <div className="space-y-6 sm:space-y-8">
              {content[activeSection as keyof typeof content].items.map((item, index) => (
                <div key={index} className="border-l-4 border-[#ef4a25] pl-6 sm:pl-8">
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    {item.subtitle}
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm sm:text-base text-center">
                If you have any questions or concerns about these terms and conditions, please contact us for clarification before booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionsSection;
