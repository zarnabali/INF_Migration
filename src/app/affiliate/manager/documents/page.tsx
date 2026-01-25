'use client';

import {
    IconFileText,
    IconDownload,
    IconSearch,
    IconFolder,
    IconCalendar,
    IconUser
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const mockDocuments = [
    {
        id: 1,
        title: 'Policy Wording - Annual Multi-Trip',
        category: 'System',
        type: 'PDF',
        size: '1.2 MB',
        updatedAt: '2023-11-15'
    },
    {
        id: 2,
        title: 'Claim Form Template',
        category: 'System',
        type: 'DOCX',
        size: '450 KB',
        updatedAt: '2023-10-01'
    },
    {
        id: 3,
        title: 'Affiliate Agreement 2024',
        category: 'Organization',
        type: 'PDF',
        size: '2.5 MB',
        updatedAt: '2024-01-05'
    },
    {
        id: 4,
        title: 'Marketing Assets Bundle',
        category: 'Organization',
        type: 'ZIP',
        size: '15.4 MB',
        updatedAt: '2024-01-10'
    }
];

export default function ManagerDocumentsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocs = mockDocuments.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pb-8">
            {/* Breadcrumbs */}
            <div className="flex items-center text-lg text-gray-500 ">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Document Center</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <Link href="/manager/dashboard" className="hover:text-blue-600 transition-colors">Affiliate Manager</Link>
                <span className="mx-2 text-gray-400">›</span>
                <span className="text-gray-400 pointer-events-none">Documents</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#005047]">Document Center</h1>
                <p className="text-gray-500 mt-1">Access shared documents and insurance plan materials for your organization</p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:flex-1">
                    <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#005047] text-gray-700 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-80 relative">
                    <span className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-400">Filter by access</span>
                    <div className="relative">
                        <IconFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select className="w-full pl-11 pr-8 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#005047] text-gray-700 bg-white appearance-none cursor-pointer">
                            <option>All Documents</option>
                            <option>System Documents</option>
                            <option>Plan Documents</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* System Documents Section */}
                <DocumentSection
                    title="System Documents"
                    count={1}
                    subtitle="System-wide documents available to all users"
                >
                    <DocumentItem
                        title="Vacation 365 Plans Overview"
                        size="256.02 KB"
                        date="17/10/2025"
                        author="Admin"
                        tag="System Wide"
                        type="PDF"
                    />
                </DocumentSection>

                {/* Plan Documents Section */}
                <DocumentSection
                    title="Plan Documents"
                    count={9}
                    subtitle="Sample documents for available insurance plans"
                >
                    <DocumentItem title="MULTI-TRIP Basics" tag="MTB" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="MULTI-TRIP Choice" tag="MTC" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="MULTI-TRIP Essentials" tag="MTE" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="Travel Protector Basics" tag="TPB" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="Travel Protector Choice" tag="TPC" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="Travel Protector Essentials" tag="TPE" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="Vacation Basics 365" tag="TPAB" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="Vacation Choice 365" tag="TPAC" subtitle="Travel Insurance" type="PDF" />
                    <DocumentItem title="Vacation Essentials 365" tag="TPAE" subtitle="Travel Insurance" type="PDF" />
                </DocumentSection>
            </div>
        </div>
    );
}

function DocumentSection({ title, count, subtitle, children }: { title: string, count: number, subtitle: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <IconFolder size={22} className="text-gray-600" /> {/* Changed to Globe for System if needed, plain folder generic for now, user screenshot has Globe for System */}
                    <h3 className="text-lg font-medium text-gray-700">{title} ({count})</h3>
                </div>
                <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
            </button>
            {isOpen && (
                <div className="border-t border-gray-100">
                    <div className="px-6 py-4 text-xs text-gray-500 bg-gray-50/50">
                        {subtitle}
                    </div>
                    <div className="divide-y divide-gray-100">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

function DocumentItem({ title, size, date, author, tag, subtitle, type }: any) {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-blue-50/30 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center text-red-500 font-bold text-[10px] shrink-0">
                    PDF
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-800">{title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                        {tag && subtitle ? ( // Plan Document style
                            <>
                                <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{tag}</span>
                                <span className="text-xs text-gray-500">{subtitle}</span>
                            </>
                        ) : ( // System Document style
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                {size && <span className="flex items-center gap-1"><IconFileText size={14} /> {size}</span>}
                                {date && <span className="flex items-center gap-1"><IconCalendar size={14} /> {date}</span>}
                                {author && <span className="flex items-center gap-1"><IconUser size={14} /> {author}</span>}
                                {tag && <span className="bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full text-[10px] font-medium">{tag}</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-blue-50 rounded-full">
                <IconDownload size={20} />
            </button>
        </div>
    );
}
