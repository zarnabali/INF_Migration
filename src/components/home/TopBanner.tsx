'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IconArrowRight } from '@tabler/icons-react';

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const navigateToQuote = () => {
    router.push('/pricing');
  };

  return (
    <div className="overflow-hidden py-8 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-0">
        <div
          className="relative flex min-h-[350px] sm:min-h-[450px] md:min-h-[550px] items-center rounded-3xl bg-cover bg-left-bottom bg-no-repeat p-6 text-white sm:p-10 md:p-16 will-change-transform"
          style={{ backgroundImage: 'url(/images/home/home-banner.svg)' }}
        >
          {/* Overlay if needed, keeping it minimal/transparent as per original */}
          <div className="absolute inset-0 z-10 rounded-xl bg-transparent" />

          <div className="relative z-20 w-full">
            <div className="w-full lg:w-2/3 text-start">
              <div
                className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                <h1 className="mb-6 mt-0 text-[32px] text-white font-medium leading-[1.2] sm:text-[42px] md:text-[56px]">
                  Travel with Confidence.
                  <br />
                  Protection for Life&apos;s Unexpected Journeys.
                </h1>

                <button
                  onClick={navigateToQuote}
                  className="group mt-4 flex w-full sm:w-auto items-center justify-center gap-2 bg-white px-6 py-3 text-lg font-semibold tracking-wide text-blue-600 shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-white hover:shadow-xl rounded-3xl"
                >
                  Get Covered
                  <IconArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

