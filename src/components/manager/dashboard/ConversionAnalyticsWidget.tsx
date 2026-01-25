'use client';

import { IconTrendingUp, IconChartPie } from '@tabler/icons-react';

export default function ConversionAnalyticsWidget() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <IconTrendingUp size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[#005047]">Conversion Analytics</h3>
                        <p className="text-sm text-gray-500">Quote to Policy conversion rates</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <IconTrendingUp size={20} className="rotate-90" /> {/* Using IconTrendingUp rotated as a refresh icon placeholder if needed, or better use IconRefresh */}
                </button>
            </div>

            {/* Time Period Selector */}
            <div className="mb-8">
                <label className="text-xs text-gray-400 block mb-1 ml-1">Time Period</label>
                <select className="w-full text-sm border-gray-200 rounded-lg px-3 py-2.5 bg-white border text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#005047]">
                    <option>30 Days</option>
                    <option>7 Days</option>
                    <option>1 Day</option>
                </select>
            </div>

            {/* Chart Area (Empty State) */}
            <div className="flex justify-center items-center h-48 mb-6">
                <div className="text-gray-300 font-semibold text-xl">0.0%</div>
            </div>

            {/* Footer Stats */}
            <div className="flex justify-between items-center text-center px-2">
                <div>
                    <div className="text-lg font-bold text-emerald-500">0</div>
                    <div className="text-xs text-gray-500">Policies</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-amber-500">0</div>
                    <div className="text-xs text-gray-500">Quotes</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-blue-500">0.0%</div>
                    <div className="text-xs text-gray-500">Conversion</div>
                </div>
            </div>
        </div>
    );
}
