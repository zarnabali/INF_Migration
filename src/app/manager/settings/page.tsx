'use client';

import { IconUserCircle, IconLock, IconEyeOff, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ManagerSettingsPage() {
    return (
        <div className="pb-8">
            {/* Breadcrumbs */}
            <div className="flex items-center text-lg text-gray-500 ">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Account Settings</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <Link href="/manager/dashboard" className="hover:text-blue-600 transition-colors">Affiliate Manager</Link>
                <span className="mx-2 text-gray-400">›</span>
                <span className="text-gray-400 pointer-events-none">Account Settings</span>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#005047]">Account Settings</h1>
                <p className="text-gray-500 mt-1">View and manage your account settings</p>
            </div>

            <div className="space-y-6">
                {/* Top Row: Password & Profile Pic */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Change Password */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-medium text-[#005047] mb-6">Change Password</h3>
                        <p className="text-sm text-gray-500 mb-6">To change your password please confirm here</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Current Password</label>
                                <div className="relative">
                                    <input type="password" placeholder="Enter your current password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
                                    <IconEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">New Password</label>
                                <div className="relative">
                                    <input type="password" placeholder="Enter your new password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
                                    <IconEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input type="password" placeholder="Confirm your new password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
                                    <IconEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8 justify-end">
                            <button className="px-6 py-2.5 bg-[#64B5F6] hover:bg-blue-400 text-white font-medium rounded-full transition-colors text-sm">Update Password</button>
                            <button className="px-6 py-2.5 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-full transition-colors text-sm">Reset</button>
                        </div>
                    </div>

                    {/* Change Profile Picture */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-medium text-[#005047] mb-2 self-start w-full">Change Profile Picture</h3>
                        <p className="text-sm text-gray-500 mb-8 self-start w-full">Upload a new profile picture</p>

                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-100 flex items-center justify-center">
                            {/* Placeholder Avatar similar to screenshot */}
                            <div className="w-full h-full bg-[#E3F2FD] flex items-center justify-center">
                                <IconUserCircle size={80} className="text-blue-300" />
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0078FC] hover:bg-blue-600 text-white font-medium rounded-full shadow-sm transition-all text-sm mb-4">
                            <IconUpload size={18} />
                            Upload
                        </button>

                        <p className="text-xs text-gray-400">Allowed JPG, PNG or WebP. Max size of 5MB</p>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-lg font-medium text-[#005047] mb-6">Personal Details</h3>
                    <p className="text-sm text-gray-500 mb-6 -mt-4">To change your personal detail , edit and save from here</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm text-gray-500 mb-2">First Name</label>
                            <input type="text" defaultValue="Waqas" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-2">Last Name</label>
                            <input type="text" defaultValue="Khan" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-2">Email</label>
                            <input type="email" defaultValue="waqaskhanm@gmail.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700" />
                            <p className="text-xs text-gray-400 mt-2">Email cannot be changed here</p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-2">Phone</label>
                            <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700" />
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end border-t border-gray-100 pt-6">
                        <button className="px-8 py-2.5 bg-[#0078FC] hover:bg-blue-600 text-white font-medium rounded-full shadow-sm transition-all text-sm">Save</button>
                        <button className="px-8 py-2.5 bg-red-50 text-red-500 hover:bg-red-100 font-medium rounded-full transition-all text-sm">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
