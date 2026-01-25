'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconUser, IconCalendar, IconPlus, IconMinus } from '@tabler/icons-react';

// Data matching Vue.js HomeData.ts
const IndividualFaqType = [
  {
    question: 'Comprehensive Trip Protection',
    answer:
      "Travel confidently knowing your journey is protected from start to finish. With up to <strong>$25,000</strong> for trip cancellation and up to <strong>150% coverage</strong> for trip interruption, you're safeguarded against covered events that impact your travel plans. Whether it's a flight delay, missed connection, or emergency that disrupts your itinerary, we ensure your travel investment remains secure.",
  },
  {
    question: 'Worldwide Medical & Evacuation Security',
    answer:
      "Your health and safety are paramount wherever adventure takes you. Our plans offer up to <strong>$250,000</strong> for emergency medical evacuation and up to <strong>$25,000</strong> for medical expenses, backed by <strong>24/7 emergency assistance</strong>. From remote destinations to major cities, you'll have access to quality medical care when you need it most.",
  },
  {
    question: 'Baggage & Personal Belongings Coverage',
    answer:
      'Your belongings deserve protection that travels as far as you do. Our plans safeguard your personal effects up to <strong>$1,500</strong> against loss, theft, or damage during your journey. When baggage delays threaten to disrupt your plans, we provide immediate coverage for essential purchases, plus protection for valuable electronics and crucial travel documents.',
  },
];

const AnnualFaqType = [
  {
    question: 'Travel Confidently Year-Round',
    answer:
      "Secure your entire year of adventures with one simple plan. Whether you're taking multiple trips or planning that special getaway, our annual protection plans cover all your journeys with <strong>emergency medical benefits up to $50,000</strong>, <strong>evacuation coverage of $500,000</strong>, and <strong>24/7 worldwide assistance</strong>. Enjoy peace of mind knowing you're protected no matter where your travels take you. <strong>Sign up today and travel worry-free!</strong>",
  },
  {
    question: 'Protect Every Journey',
    answer:
      "Whether it's a <strong>quick weekend getaway</strong> or an <strong>extended vacation</strong>, safeguard your trips with <strong>up to $3,000 in trip cancellation coverage</strong> and <strong>daily delay benefits of $200</strong>. One annual plan means <strong>continuous protection</strong> for every trip you take, without the hassle of purchasing separate coverage each time. <strong>Make your travel stress-free – enroll in our annual plan now!</strong>",
  },
  {
    question: 'Complete Travel Security',
    answer:
      "Rest easy knowing your belongings are protected with <strong>up to $2,000 in baggage coverage</strong>, while <strong>quick-response baggage delay benefits</strong> ensure you're never left without your essentials. With a single policy that covers <strong>all your trips throughout the year</strong>, you can focus on making memories instead of worrying about disruptions. <strong>Stay covered – get your annual travel protection today!</strong>",
  },
];

export function ProductsTabs() {
  const [tabValue, setTabValue] = useState(0);
  const [expandedIndividual, setExpandedIndividual] = useState<string | false>(false);
  const [expandedAnnual, setExpandedAnnual] = useState<string | false>(false);

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const handleIndividualChange = (panel: string) => {
    setExpandedIndividual(expandedIndividual === panel ? false : panel);
  };

  const handleAnnualChange = (panel: string) => {
    setExpandedAnnual(expandedAnnual === panel ? false : panel);
  };

  return (
    <div className="py-8">
      {/* Tabs Container */}
      <div className="mx-auto max-w-[1218px] px-4 md:px-0">
        <div className="w-full pb-0">
          <div className="flex justify-center gap-2 pb-14">
            <button
              onClick={() => handleTabChange(0)}
              className={`flex min-h-auto items-center gap-2 rounded-xl border px-6 py-4 text-base font-semibold transition-all duration-300 ease-out focus:outline-none ${tabValue === 0
                ? 'border-transparent bg-[#0078FC] text-white shadow-[0px_24px_24px_-12px_rgba(99,91,255,0.15)]'
                : 'border-[rgba(0,120,252,0.15)] bg-white text-[#3a4752] shadow-[0px_24px_24px_-12px_rgba(0,0,0,0.05)] hover:bg-[#f5d4c0] hover:opacity-100 hover:shadow-sm'
                } ${tabValue === 0 ? '' : 'bg-[#fae2d4] opacity-85'}`}
            >
              <IconUser size={24} />
              Single Trip
            </button>
            <button
              onClick={() => handleTabChange(1)}
              className={`flex min-h-auto items-center gap-2 rounded-xl border px-6 py-4 text-base font-semibold transition-all duration-300 ease-out focus:outline-none ${tabValue === 1
                ? 'border-transparent bg-[#0078FC] text-white shadow-[0px_24px_24px_-12px_rgba(99,91,255,0.15)]'
                : 'border-[rgba(0,120,252,0.15)] bg-white text-[#3a4752] shadow-[0px_24px_24px_-12px_rgba(0,0,0,0.05)] hover:bg-[#f5d4c0] hover:opacity-100 hover:shadow-sm'
                } ${tabValue === 1 ? '' : 'bg-[#fae2d4] opacity-85'}`}
            >
              <IconCalendar size={24} />
              Annual
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="mx-auto max-w-[1218px] px-4 md:px-0">
        <div className="px-1.5 w-full">

          {/* Single Trip Tab */}
          <div className={`${tabValue === 0 ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8">
              <div className="flex h-full items-center justify-center">
                <img
                  src="/images/home/airplane.svg"
                  alt="Airplane illustration for single trip travel insurance"
                  className="w-full rounded-lg"
                  loading="lazy"
                  width="500"
                  height="400"
                />
              </div>
              <div className="pl-0 sm:pl-12">
                <h2 className="mb-6 text-[32px] font-normal leading-[1.2] sm:text-[40px] md:text-[48px]">
                  World-Class Travel Protection
                </h2>
                <div className="space-y-0">
                  {IndividualFaqType.map((item, index) => (
                    <div key={item.question} className="border-b border-gray-200">
                      <button
                        onClick={() => handleIndividualChange(`panel${index}`)}
                        className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
                      >
                        <span className="text-[17px] font-semibold text-[#3a4752]">
                          {item.question}
                        </span>
                        {expandedIndividual === `panel${index}` ? <IconMinus size={20} /> : <IconPlus size={20} />}
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${expandedIndividual === `panel${index}` ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-4 pt-0">
                            <div
                              className="text-base text-[#3a4752] opacity-80"
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center md:justify-start pb-2.5">
                  <Link
                    href="/programs/single-trip"
                    className="mt-6 rounded-3xl bg-[#0078FC] px-8 py-3 text-base font-medium text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-102 hover:bg-[#0056b3] hover:shadow-lg"
                  >
                    Explore Single Trip
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Tab */}
          <div className={`${tabValue === 1 ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8">
              <div className="flex h-full items-center justify-center">
                <img
                  src="/images/home/peopletravel.svg"
                  alt="People traveling illustration for annual travel insurance"
                  className="w-full rounded-lg"
                  loading="lazy"
                  width="500"
                  height="400"
                />
              </div>
              <div className="pl-0 sm:pl-12">
                <h2 className="mb-6 text-[32px] font-normal leading-[1.2] sm:text-[40px] md:text-[48px]">
                  Year-Round Freedom to Explore
                </h2>
                <div className="space-y-0">
                  {AnnualFaqType.map((item, index) => (
                    <div key={item.question} className="border-b border-gray-200">
                      <button
                        onClick={() => handleAnnualChange(`panel${index}`)}
                        className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
                      >
                        <span className="text-[17px] font-semibold text-[#3a4752]">
                          {item.question}
                        </span>
                        {expandedAnnual === `panel${index}` ? <IconMinus size={20} /> : <IconPlus size={20} />}
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${expandedAnnual === `panel${index}` ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-4 pt-0">
                            <div
                              className="text-base text-[#3a4752] opacity-80"
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center md:justify-start pb-2.5">
                  <Link
                    href="/programs/annual-individual"
                    className="mt-6 rounded-3xl bg-[#0078FC] px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-102 hover:bg-[#0056b3] hover:shadow-lg"
                  >
                    Explore Annual
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
