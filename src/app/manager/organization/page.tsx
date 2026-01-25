'use client';

import { useState } from 'react';
import { IconUserCircle, IconUsersGroup, IconArticle } from '@tabler/icons-react';
import ProfileTab from '@/components/manager/organization/ProfileTab';
import MembersTab from '@/components/manager/organization/MembersTab';
import ReferralTab from '@/components/manager/organization/ReferralTab';

export default function OrganizationPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="pb-8">
            {/* Breadcrumbs */}
            <div className="flex items-center text-lg text-gray-500 ">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Ricky's Org Settings</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Affiliate Manager</span>
                <span className="mx-2 text-gray-400">›</span>
                <span className="text-gray-400 pointer-events-none">Organization Settings</span>
            </div>

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#005047]">Organization Settings</h1>
                <p className="text-gray-500 mt-1">View and manage your organization settings</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
                {/* Tabs Header */}
                <div className="border-b border-gray-200">
                    <div className="flex items-center px-4 overflow-x-auto whitespace-nowrap thin-scrollbar">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors shrink-0 ${activeTab === 'profile' ? 'border-[#0078FC] text-[#0078FC]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            <IconUserCircle size={20} />
                            Organization Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors shrink-0 ${activeTab === 'members' ? 'border-[#0078FC] text-[#0078FC]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            <IconUsersGroup size={20} />
                            Members
                        </button>
                        <button
                            onClick={() => setActiveTab('referral')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors shrink-0 ${activeTab === 'referral' ? 'border-[#0078FC] text-[#0078FC]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            <IconArticle size={20} />
                            Referral
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8">
                    {activeTab === 'profile' && <ProfileTab />}
                    {activeTab === 'members' && <MembersTab />}
                    {activeTab === 'referral' && <ReferralTab />}
                </div>
            </div>

            <style jsx global>{`
                .thin-scrollbar::-webkit-scrollbar {
                    height: 3px;
                }
                .thin-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .thin-scrollbar::-webkit-scrollbar-thumb {
                    background-color: transparent;
                    border-radius: 20px;
                    transition: background-color 0.3s;
                }
                .thin-scrollbar:hover::-webkit-scrollbar-thumb,
                .thin-scrollbar:active::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                }
                .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #94a3b8;
                }
            `}</style>
        </div>
    );
}
