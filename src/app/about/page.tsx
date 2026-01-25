'use client';

import { useEffect } from 'react';
import { PublicLayout } from '@/components/layouts';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 50,
    });
  }, []);

  return (
    <PublicLayout>
      <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-[rgba(204,232,250,0.3)] to-[rgba(255,255,255,0)]">
        <div className="max-w-[1218px] mx-auto px-4 py-8 relative">
          {/* Section 1: Your Journey, Our Promise */}
          <div className="flex flex-col lg:flex-row items-start py-12 gap-8 lg:gap-0">
            <div className="w-full lg:w-7/12">
              <div className="lg:pr-10" data-aos="fade-right" data-aos-duration="1000">
                <h2
                  className="text-[48px] sm:text-[40px] leading-[1.2] mb-6 font-normal relative bg-gradient-to-br from-[#0078fc] to-[#00c9a5] bg-clip-text text-transparent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-[60px] after:bg-gradient-to-br after:from-[#0078fc] after:to-[#005047] after:rounded-sm after:opacity-80 font-givonic"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  style={{ fontFamily: 'var(--font-givonic)' }}
                >
                  Your Journey,
                  <br />
                  Our Promise
                </h2>
                <div
                  className="text-[18px] font-normal py-2 leading-[1.8] text-[rgba(0,0,0,0.8)] relative"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  At Migration, we know that travel isn&apos;t just about reaching a
                  destination—it&apos;s about the experiences, adventures, and memories along the
                  way. That&apos;s why our travel protection plans provide comprehensive coverage,
                  ensuring every journey is worry-free from start to finish.
                </div>
              </div>
            </div>
            <div className="w-full lg:w-5/12">
              <div
                className="relative overflow-hidden rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] group"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                <Image
                  src="/images/about/jungle.svg"
                  alt="Travel adventure in jungle"
                  width={600}
                  height={500}
                  className="w-full h-auto transition-all duration-400 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Why Choose Migration */}
          <div className="flex flex-col lg:flex-row items-center py-8 gap-8 lg:gap-0">
            <div className="w-full lg:w-5/12 order-2 lg:order-1">
              <div
                className="relative overflow-hidden rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] group w-[90%]"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <Image
                  src="/images/about/logo-mark.svg"
                  alt="Migration logo"
                  width={500}
                  height={500}
                  className="w-full h-auto transition-all duration-400 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full lg:w-7/12 order-1 lg:order-2">
              <div className="lg:pl-10">
                <h2
                  className="text-[48px] sm:text-[40px] leading-[1.2] mb-6 font-normal relative bg-gradient-to-br from-[#0078fc] to-[#00c9a5] bg-clip-text text-transparent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-[60px] after:bg-gradient-to-br after:from-[#0078fc] after:to-[#005047] after:rounded-sm after:opacity-80 font-givonic"
                  data-aos="fade-left"
                  data-aos-delay="400"
                  style={{ fontFamily: 'var(--font-givonic)' }}
                >
                  Why Choose Migration?
                </h2>

                <div
                  className="rounded-[16px] bg-white/80 backdrop-blur-[10px] border border-[rgba(0,120,252,0.1)] transition-all duration-300 relative overflow-hidden shadow-[0_8px_25px_rgba(0,120,252,0.1)] hover:shadow-[0_12px_35px_rgba(0,120,252,0.15)] hover:border-[rgba(0,120,252,0.3)] p-4"
                  data-aos="slide-up"
                  data-aos-delay="600"
                >
                  <div className="flex flex-col gap-6">
                    {[
                      {
                        title: 'Trip Protection:',
                        text: 'Get up to 150% reimbursement for covered cancellations, delays, or travel disruptions.',
                      },
                      {
                        title: 'Year-Round Freedom:',
                        text: 'Annual plans ensure every journey is covered—without extra costs.',
                      },
                      {
                        title: 'Global Health Protection:',
                        text: 'Emergency medical coverage & evacuations provide security wherever you go.',
                      },
                      {
                        title: 'Secure Your Belongings:',
                        text: 'Coverage for lost luggage, theft, and unexpected accidents.',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-[16px] bg-white/80 backdrop-blur-[10px] border border-[rgba(0,120,252,0.1)] transition-all duration-300 relative overflow-hidden hover:shadow-[0_8px_25px_rgba(0,120,252,0.15)] hover:border-[rgba(0,120,252,0.3)]"
                      >
                        <div className="text-[20px] font-semibold py-2 text-[#333]">
                          {item.title}
                        </div>
                        <div className="text-[18px] font-normal py-2 leading-[1.8]">
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Affordable & Simple */}
          <div className="flex flex-col lg:flex-row items-center py-8 gap-8 lg:gap-0">
            <div className="w-full lg:w-7/12">
              <div className="lg:pr-10">
                <h2
                  className="text-[48px] sm:text-[40px] leading-[1.2] mb-6 font-normal relative bg-gradient-to-br from-[#0078fc] to-[#00c9a5] bg-clip-text text-transparent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-[60px] after:bg-gradient-to-br after:from-[#0078fc] after:to-[#005047] after:rounded-sm after:opacity-80 font-givonic"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  style={{ fontFamily: 'var(--font-givonic)' }}
                >
                  Affordable & Simple
                </h2>
                <div
                  className="text-[18px] font-normal py-2 leading-[1.8] text-[rgba(0,0,0,0.8)] relative"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Travel should be about adventure and discovery – not unexpected setbacks. That&apos;s
                  why we offer comprehensive travel protection starting at just $80, giving you the
                  confidence to explore freely.
                </div>

                <div
                  className="rounded-[16px] bg-white/80 backdrop-blur-[10px] border border-[rgba(0,120,252,0.1)] transition-all duration-300 relative overflow-hidden shadow-[0_8px_25px_rgba(0,120,252,0.1)] hover:shadow-[0_12px_35px_rgba(0,120,252,0.15)] hover:border-[rgba(0,120,252,0.3)] p-4 mt-6"
                  data-aos="slide-up"
                  data-aos-delay="600"
                >
                  <div className="flex flex-col gap-6">
                    {[
                      {
                        title: 'Trip Protection:',
                        text: 'Get reimbursed for cancellations, delays, and interruptions.',
                      },
                      {
                        title: 'Medical Coverage:',
                        text: 'Emergency assistance when you need it most.',
                      },
                      {
                        title: 'Luggage Security:',
                        text: 'Compensation for lost, stolen, or damaged baggage.',
                      },
                      {
                        title: 'Peace of Mind:',
                        text: 'Focus on your journey while we handle the risks.',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-[16px] bg-white/80 backdrop-blur-[10px] border border-[rgba(0,120,252,0.1)] transition-all duration-300 relative overflow-hidden hover:shadow-[0_8px_25px_rgba(0,120,252,0.15)] hover:border-[rgba(0,120,252,0.3)]"
                      >
                        <div className="text-[20px] font-semibold py-2 text-[#333]">
                          {item.title}
                        </div>
                        <div className="text-[18px] font-normal py-2 leading-[1.8]">
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 inline-block" data-aos="zoom-in" data-aos-delay="1400">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0078fc] to-[#00c9a5] text-white rounded-[30px] transition-all duration-400 shadow-[0_8px_25px_rgba(0,120,252,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,120,252,0.4)] px-8 py-4 text-[16px] font-medium group"
                  >
                    <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-600 group-hover:left-full"></span>
                    Get Covered
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div
                className="relative overflow-hidden rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] group"
                data-aos="zoom-in-left"
                data-aos-delay="600"
              >
                <Image
                  src="/images/about/hiker.svg"
                  alt="Happy traveler hiking"
                  width={600}
                  height={500}
                  className="w-full h-auto transition-all duration-400 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

