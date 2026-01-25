'use client';

import {
    IconCurrencyDollar,
    IconShieldCheck,
    IconTrendingUp,
    IconCalendar,
} from '@tabler/icons-react';

const mockData = [
    {
        title: 'Total Revenue',
        number: '$0',
        icon: IconCurrencyDollar,
        color: 'bg-[#1E88E5]', // Blue
        iconBg: 'bg-white/20',
    },
    {
        title: 'Total Coverages',
        number: '0',
        icon: IconShieldCheck,
        color: 'bg-[#9C27B0]', // Purple
        iconBg: 'bg-white/20',
    },
    {
        title: 'Revenue 30 Days',
        number: '$0',
        icon: IconTrendingUp,
        color: 'bg-[#43A047]', // Green
        iconBg: 'bg-white/20',
    },
    {
        title: 'Coverages 30 Days',
        number: '0',
        icon: IconCalendar,
        color: 'bg-[#039BE5]', // Light Blue
        iconBg: 'bg-white/20',
    },
];

export default function RevenueWidget() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockData.map((card, index) => (
                <div
                    key={index}
                    className={`relative overflow-hidden rounded-2xl p-6 shadow-md transition-transform hover:-translate-y-1 ${card.color}`}
                >
                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`p-3 rounded-lg ${card.iconBg}`}>
                            <card.icon className="text-white" size={26} stroke={1.5} />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-white leading-tight">{card.number}</h3>
                            <p className="text-white/90 text-sm font-medium">{card.title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
