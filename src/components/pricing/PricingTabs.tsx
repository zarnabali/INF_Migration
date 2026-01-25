'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { PricingPanels } from './PricingPanels';
import {
    IndividualPricing,
    YearlyPricing,
    IndividualTitleSubtitle,
    AnnualTitleSubtitle,
} from '@/data/pricingData';

export const PricingTabs = () => {
    const [activeTab, setActiveTab] = useState<'1' | '2'>('1');

    return (
        <div className="py-8">
            <div className="max-w-[1218px] mx-auto px-4 md:px-6">
                <div className="flex justify-center pb-0">
                    <div className="flex gap-4 p-1">
                        <button
                            onClick={() => setActiveTab('1')}
                            className={`flex items-center gap-3 px-6 py-3 rounded-lg text-[16px] font-semibold transition-all duration-300 ${activeTab === '1'
                                ? 'bg-primary text-white shadow-md hover:-translate-x-1 hover:shadow-lg'
                                : 'bg-[#fae2d4] text-[#333] font-medium opacity-85 hover:bg-[#f5d4c0] hover:opacity-100 hover:-translate-x-1 hover:shadow-sm'
                                }`}
                        >
                            <Icon icon="material-symbols:person-outline-rounded" height="24" />
                            Individual
                        </button>
                        <button
                            onClick={() => setActiveTab('2')}
                            className={`flex items-center gap-3 px-6 py-3 rounded-lg text-[16px] font-semibold transition-all duration-300 ${activeTab === '2'
                                ? 'bg-primary text-white shadow-md hover:translate-x-1 hover:shadow-lg'
                                : 'bg-[#fae2d4] text-[#333] font-medium opacity-85 hover:bg-[#f5d4c0] hover:opacity-100 hover:translate-x-1 hover:shadow-sm'
                                }`}
                        >
                            <Icon icon="material-symbols:calendar-month-outline" height="24" />
                            Annual
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1218px] mx-auto px-4 md:px-6 mt-8">
                {activeTab === '1' && (
                    <PricingPanels
                        packages={IndividualPricing}
                        titleSubtitle={IndividualTitleSubtitle}
                    />
                )}
                {activeTab === '2' && (
                    <PricingPanels
                        packages={YearlyPricing}
                        titleSubtitle={AnnualTitleSubtitle}
                    />
                )}
            </div>
        </div>
    );
};
