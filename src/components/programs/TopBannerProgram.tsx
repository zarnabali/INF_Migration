'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TopBannerData {
  title: string;
  image: string;
}

interface TopBannerProgramProps {
  topBannerData: TopBannerData;
}

export const TopBannerProgram = ({ topBannerData }: TopBannerProgramProps) => {
  return (
    <div className="overflow-hidden pb-8 pt-0">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="relative bg-left-bottom bg-cover bg-no-repeat p-8 min-h-[550px] flex items-center rounded-lg">
          <div className="flex flex-wrap items-center w-full">
            {/* Text Column */}
            <div className="w-full lg:w-1/2 flex items-center justify-start mb-8 lg:mb-0">
              <div data-aos="fade-right" data-aos-duration="1000">
                <h1 className="text-[36px] md:text-[56px] leading-[1.2] font-medium banner-title">
                  <b className="font-normal">{topBannerData.title}</b>
                </h1>
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div
                className="image-container"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                <img
                  src={topBannerData.image}
                  alt="banner-right-image"
                  className="banner-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-title {
          background: linear-gradient(135deg, #0078fc, #00c9a5);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .banner-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          height: 4px;
          width: 80px;
          background: linear-gradient(135deg, #0078fc, #005047);
          border-radius: 2px;
          opacity: 0.8;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          min-height: 550px;
          max-width: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-container:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .banner-image {
          width: 100%;
          height: auto;
          min-height: 450px;
          max-height: 500px;
          object-fit: contain;
          transition: all 0.3s ease;
          animation: breathe 2.5s ease-in-out infinite;
        }

        .banner-image:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .banner-title::after {
            width: 60px;
          }

          .image-container {
            min-height: 300px;
            max-width: 400px;
            margin: 0 auto;
          }

          .banner-image {
            min-height: 250px;
            max-height: 300px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-image {
            animation: none;
          }
          
          .image-container:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};
