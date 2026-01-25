'use client';

import { useState } from 'react';
import RevenueWidget from '@/components/manager/dashboard/RevenueWidget';
import ConversionAnalyticsWidget from '@/components/manager/dashboard/ConversionAnalyticsWidget';
import Link from 'next/link';
import { IconRefresh, IconSettings, IconCheck } from '@tabler/icons-react';

export default function ManagerDashboard() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [widgetVisibility, setWidgetVisibility] = useState({
        revenue: true,
        conversion: true
    });

    const toggleWidget = (key: keyof typeof widgetVisibility) => {
        setWidgetVisibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="pb-8 relative">
            {/* Breadcrumbs */}
            <div className="flex items-center text-lg text-gray-500 ">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Manager Dashboard</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Affiliate Manager</span>
                <span className="mx-2 text-gray-400">›</span>
                <span className="text-gray-400 pointer-events-none">Dashboard</span>
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#005047]">Manager Dashboard</h1>
                    <p className="text-gray-500 mt-1">Organization overview and performance</p>
                </div>
                <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                        <IconRefresh size={20} />
                    </button>
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <IconSettings size={20} />
                    </button>
                </div>
            </div>

            {/* Widgets */}
            {widgetVisibility.revenue && <RevenueWidget />}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {widgetVisibility.conversion && <ConversionAnalyticsWidget />}
            </div>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                            <IconSettings size={20} className="text-gray-500" />
                            <h3 className="font-semibold text-gray-800">Dashboard Settings</h3>
                        </div>
                        <div className="p-6">
                            <h4 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Widget Visibility</h4>
                            <div className="space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${widgetVisibility.revenue ? 'bg-[#005047] border-[#005047]' : 'border-gray-300 bg-white'}`}>
                                        {widgetVisibility.revenue && <IconCheck size={14} className="text-white" stroke={3} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={widgetVisibility.revenue}
                                        onChange={() => toggleWidget('revenue')}
                                    />
                                    <div>
                                        <div className="font-medium text-gray-900 group-hover:text-[#005047] transition-colors">Organization Revenue</div>
                                        <div className="text-sm text-gray-500">Your organization performance</div>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${widgetVisibility.conversion ? 'bg-[#005047] border-[#005047]' : 'border-gray-300 bg-white'}`}>
                                        {widgetVisibility.conversion && <IconCheck size={14} className="text-white" stroke={3} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={widgetVisibility.conversion}
                                        onChange={() => toggleWidget('conversion')}
                                    />
                                    <div>
                                        <div className="font-medium text-gray-900 group-hover:text-[#005047] transition-colors">Organization Conversion</div>
                                        <div className="text-sm text-gray-500">Your organization conversion rates</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
