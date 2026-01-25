'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

// Data matching Vue.js CallToActionData from HomeData.ts
const callToActionData = {
  title: 'Premium Protection for Every Journey',
  subtitle: 'Discover Your Perfect Coverage Plan in Just a Few Clicks',
  buttontext: 'Get Covered',
  buttonlink: '/pricing',
};

export function CallToAction() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-hidden py-8 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-0">
        <div className="relative w-full rounded-3xl bg-[#005047] p-6 sm:p-10 md:p-20 text-white text-center ">
          <div
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h2 className="py-3 text-[32px] font-normal leading-[1.2] sm:text-[42px] md:text-[56px] text-white text-center">
              {callToActionData.title}
            </h2>

            <div className="mx-auto max-w-[600px]">
              <p className="text-[18px] text-center text-white">
                {callToActionData.subtitle}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href={callToActionData.buttonlink}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-white px-10 py-3 text-base font-semibold tracking-wide text-[#005047] shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-white hover:shadow-xl rounded-3xl"
              >
                {callToActionData.buttontext}
                <IconArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
