'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Collapse } from '@mui/material';

interface AccordionItem {
    title: string;
    subtitle: string;
    text: string;
}

interface AccordionSectionData {
    title: string;
    image: string;
    icon: string;
    items: AccordionItem[];
}

interface AccordionSectionProps {
    section: AccordionSectionData;
    index: number;
}

export const AccordionSection = ({ section, index }: AccordionSectionProps) => {
    const isReversed = index % 2 !== 0;
    // Initialize with the first item open if desired, or all closed. Vue code didn't specify, likely all closed or handling v-model. 
    // Vue code used v-expansion-panels multiple, so independent control.
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (itemIndex: number) => {
        setOpenItems((prev) =>
            prev.includes(itemIndex)
                ? prev.filter((i) => i !== itemIndex)
                : [...prev, itemIndex]
        );
    };

    return (
        <div className="py-16 relative overflow-hidden">
            <div className="max-w-[1218px] mx-auto px-4">
                <div className={`flex flex-wrap items-center -mx-4 ${isReversed ? 'flex-row-reverse' : ''}`}>

                    {/* Image Column */}
                    <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0 hidden sm:block">
                        <div
                            className="relative overflow-hidden rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
                            data-aos={isReversed ? "fade-left" : "fade-right"}
                            data-aos-delay="200"
                        >
                            <Image
                                src={section.image}
                                alt="section-image"
                                width={500}
                                height={500}
                                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-7/12 px-4">
                        <div className={`${isReversed ? 'pr-0 lg:pr-10' : 'pl-0 lg:pl-10'}`}>
                            <h2
                                className="text-[2rem]  md:text-[3rem] mb-6 font-normal section-title flex items-center p-2"
                                data-aos={isReversed ? "fade-right" : "fade-left"}
                                data-aos-delay="400"
                            >
                                <Icon icon={section.icon} width="34" height="34" className="section-icon mr-2 text-[#0078fc]" />
                                {section.title}
                            </h2>

                            <div
                                className="features-container rounded-[16px] bg-white/80 backdrop-blur-[10px] border border-[#0078fc1a] shadow-[0_8px_25px_rgba(0,120,252,0.1)] overflow-hidden transition-all duration-150 hover:shadow-[0_12px_35px_rgba(0,120,252,0.15)] hover:border-[#0078fc4d]"
                                data-aos="slide-up"
                                data-aos-delay="600"
                            >
                                <div className="p-4 relative z-[2] min-h-[200px]">
                                    <div className="space-y-4">
                                        {section.items.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="rounded-[12px] bg-white/60 border border-[#0078fc14] transition-all duration-300 overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggleItem(itemIndex)}
                                                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <div>
                                                        <div className="text-[20px] font-semibold py-2 text-[#333]">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-[18px] font-normal text-[#0078fc]">
                                                            {item.subtitle}
                                                        </div>
                                                    </div>
                                                    <Icon
                                                        icon={openItems.includes(itemIndex) ? "mdi:minus" : "mdi:plus"}
                                                        width="24"
                                                        height="24"
                                                        className="text-gray-500 flex-shrink-0 ml-4 transition-transform duration-300"
                                                    />
                                                </button>

                                                <Collapse in={openItems.includes(itemIndex)}>
                                                    <div className="px-5 pb-4 text-[18px] leading-[1.8] text-[rgba(0,0,0,0.8)] border-t border-transparent">
                                                        <span dangerouslySetInnerHTML={{ __html: item.text }} />
                                                    </div>
                                                </Collapse>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .section-title {
          background: linear-gradient(135deg, #0078fc, #00c9a5);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          height: 4px;
          width: 60px;
          background: linear-gradient(135deg, #0078fc, #005047);
          border-radius: 2px;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .section-title::after {
            width: 40px;
          }
        }
      `}</style>
        </div>
    );
};
