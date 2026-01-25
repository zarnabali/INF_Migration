'use client';

import { IconDeviceFloppy, IconInfoCircle } from '@tabler/icons-react';

export default function ReferralTab() {
    return (
        <div className="space-y-6">
            {/* External Referral System Card */}
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                <h5 className="text-lg font-medium text-[#005047] mb-2">External Referral System</h5>
                <p className="text-sm text-gray-500 mb-6">External system registration status for affiliate code functionality</p>

                <div className="max-w-lg">
                    <label className="block text-sm text-gray-500 mb-2">External Referral ID</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-400 focus:outline-none"
                        placeholder="Not registered yet"
                        disabled
                    />
                </div>
            </div>

            {/* Affiliate Code Management Card */}
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                <h5 className="text-lg font-medium text-[#005047] mb-2">Affiliate Code</h5>
                <p className="text-sm text-gray-500 mb-6">Set or update the affiliate code for this organization</p>

                <div className="flex flex-col md:flex-row gap-4 items-end max-w-2xl">
                    <div className="flex-1 w-full">
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                            placeholder="ENTER AFFILIATE CODE"
                        />
                        <p className="text-xs text-gray-400 mt-2">External system registration required first to enable affiliate code</p>
                    </div>
                    <div>
                        <button className="px-6 py-3 bg-[#64B5F6] hover:bg-[#42A5F5] text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 min-w-[120px]">
                            <IconDeviceFloppy size={20} />
                            Set Code
                        </button>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-sky-50 rounded-lg flex items-start gap-3">
                    <IconInfoCircle className="text-sky-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-sky-700">Please contact your system administrator to register this organization with the external referral system first to enable affiliate code functionality.</p>
                </div>
            </div>
        </div>
    );
}
