'use client';

import Link from 'next/link';
import { PricingPackage, TitleSubtitle } from '@/data/pricingData';
import { IconCircleX } from '@tabler/icons-react';

interface PricingPanelsProps {
    packages: PricingPackage[];
    titleSubtitle: TitleSubtitle;
}

export const PricingPanels = ({ packages, titleSubtitle }: PricingPanelsProps) => {
    return (
        <div className="max-w-[1218px] mx-auto px-4 md:px-6 py-0" id="pricing">
            <div className="pb-12 text-center">
                <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#3A4752] leading-tight">
                    {titleSubtitle.title}
                </h2>
                <p className="text-[#3A4752] pt-4 text-[18px] leading-[32px]">
                    {titleSubtitle.subtitle}
                </p>
            </div>

            <div className="flex flex-wrap justify-center -mx-4">
                {packages.map((card) => (
                    <div key={card.caption} className="w-full lg:w-1/3 sm:w-1/2 px-4 mb-8">
                        <div className="rounded-2xl p-8 flex flex-col h-full card-bg">
                            <div className="pb-4">
                                <div className="flex gap-2 items-center">
                                    <h4 className="text-[20px] font-semibold text-[#3A4752] mb-2">
                                        {card.caption}
                                    </h4>
                                    {card.tagtext && (
                                        <span className="px-3 py-1 text-xs font-bold rounded bg-primary text-white">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <p className="text-[16px] text-[#3A4752]">{card.subtext}</p>
                            </div>

                            <div className="flex items-center mt-3">
                                <h2 className="text-[40px] md:text-[48px] text-primary font-semibold">
                                    {card.price}
                                </h2>
                                <span className="text-[#3A4752] mt-4 ml-2 text-[16px]">
                                    /{card.period}
                                </span>
                            </div>

                            <ul className="mb-0 pl-0 pt-5 space-y-3">
                                {card.list.map((desc, idx) => (
                                    <li
                                        key={idx}
                                        className={`text-[16px] flex items-center font-medium ${desc.disable ? 'opacity-50' : ''
                                            }`}
                                    >
                                        {desc.status && desc.icon && (
                                            <IconCircleX
                                                size={20}
                                                className="mr-2 text-error flex-shrink-0"
                                                stroke={1.5}
                                            />
                                        )}
                                        <span
                                            dangerouslySetInnerHTML={{ __html: desc.listtitle }}
                                            className="text-[16px]"
                                        />
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-center pt-4 mt-auto">
                                <Link
                                    href={card.url}
                                    className="mt-4 px-8 py-3 bg-primary text-white rounded font-medium text-[16px] hover:bg-primary-dark transition-colors inline-block"
                                >
                                    {card.buttontext}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .card-bg {
                    background-color: #cce8fa;
                }
            `}</style>
        </div>
    );
};
