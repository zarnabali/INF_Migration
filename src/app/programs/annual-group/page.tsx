'use client';

import { PublicLayout } from '@/components/layouts';
import {
  AnnualGroupProgramData,
  AnnualGroupTopBanner,
  AnnualGroupProducts,
  AnnualGroupBenefits,
  AnnualGroupFineprint
} from '@/data/programData';

import { TopBannerProgram } from '@/components/programs/TopBannerProgram';
import { AccordionSection } from '@/components/programs/AccordionSection';
import { BenefitsTable } from '@/components/programs/BenefitsTable';

export default function AnnualGroupPage() {
  return (
    <PublicLayout>
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(204,232,250,0.3)_0%,rgba(255,255,255,0)_100%)]">

        {/* Top Banner */}
        <TopBannerProgram topBannerData={AnnualGroupTopBanner} />

        {/* Accordion Sections */}
        {AnnualGroupProgramData.map((section, index) => (
          <AccordionSection key={section.title} section={section} index={index} />
        ))}

        {/* Benefits Table Title Section */}
        <div className="max-w-[1218px] mx-auto py-8">
          <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="benefits-title text-[2.5rem] font-bold mb-4 relative inline-block">
              Annual Group Plans
            </h2>
            <div className="text-xl md:text-[1.25rem] font-normal text-gray-500 mb-8 max-w-[600px] mx-auto leading-relaxed mt-4">
              Comprehensive yearly coverage for groups and organizations
            </div>
          </div>
        </div>

        {/* Benefits Table */}
        <BenefitsTable
          products={AnnualGroupProducts}
          benefits={AnnualGroupBenefits}
          fineprint={AnnualGroupFineprint}
        />

        <div className="pb-8"></div>
      </div>

      <style jsx>{`
        .benefits-title {
          background: linear-gradient(135deg, #0078fc, #00c9a5);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .benefits-title::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          height: 4px;
          width: 80px;
          background: linear-gradient(135deg, #0078fc, #005047);
          border-radius: 2px;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .benefits-title {
            font-size: 2.5rem !important;
          }

          .benefits-title::after {
            width: 60px;
            bottom: -8px;
          }
        }
      `}</style>
    </PublicLayout>
  );
}
