'use client';

import { useState, useEffect } from 'react';

// Custom Check Icon to match user request (Blue circle outline with check)
const CustomCheckIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#0078FC" strokeWidth="1.5" />
    <path d="M8 12L11 15L16 9" stroke="#0078FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Data matching Vue.js WhatsCovered from HomeData.ts
const whatsCoveredData = [
  {
    title: 'Comprehensive Trip Protection',
    items: [
      'Get reimbursed up to <strong>150%</strong> of your trip cost for covered cancellations.',
      'Stay protected against <strong>weather delays</strong> and <strong>supplier issues</strong>.',
      'Cancel for <strong>covered reasons</strong> and reclaim your <strong>prepaid expenses</strong>.',
    ],
  },
  {
    title: 'Medical Coverage',
    items: [
      'Access <strong>worldwide medical care</strong> with generous coverage limits.',
      'Get <strong>emergency dental coverage</strong> up to <strong>$500</strong> while traveling.',
      'Includes <strong>medical evacuation coverage</strong> up to <strong>$500,000</strong>.',
    ],
  },
  {
    title: 'Baggage and Travel Delay',
    items: [
      'Recover up to <strong>$2,000</strong> for <strong>lost or damaged baggage</strong>.',
      'Receive <strong>$250 daily</strong> for delayed baggage essentials.',
      'Get up to <strong>$200 daily</strong> for covered travel delays.',
    ],
  },
];

export function WhatsCovered() {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Delay card animation slightly after component mounts
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-hidden py-8 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-0">
        <div className="relative w-full rounded-3xl bg-[#abfde6] p-6 sm:p-10 md:p-16">

          {/* Header Section */}
          <div className="pb-12 text-center">
            <h2 className="mb-4 text-[32px] font-normal leading-[1.2] sm:text-[42px] md:text-[56px]">
              We Got You Covered
            </h2>
            <p className="pt-2 text-[17px] leading-8 text-gray-900">
              Your Journey, Our Promise - World-Class Protection for Every Adventure
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {whatsCoveredData.map((feature, index) => (
              <div
                key={feature.title}
                className={`transition-all duration-600 ease-out ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="group h-full rounded-xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:border-[#abfde6]/80">
                  <h4 className="py-5 text-center text-[22px] font-normal">
                    {feature.title}
                  </h4>
                  <hr className="mb-4 mt-1 border-gray-100" />

                  <div className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start py-1 text-[15px]">
                        <div className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center">
                          <CustomCheckIcon />
                        </div>
                        <span
                          className="text-[15px] leading-relaxed [&>strong]:font-semibold"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

