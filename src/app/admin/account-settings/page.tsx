'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layouts';
import {
  IconUserCircle,
  IconEye,
  IconEyeOff,
  IconDeviceFloppy,
  IconX
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Account');

  // Profile State
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@infplans.com',
    phone: '+1 (555) 000-0000',
    avatar: '/images/profile/user-1.jpg'
  });

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password updated successfully');
      setPasswordForm({ current: '', new: '', confirm: '' });
    }, 1000);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-8">
        {/* Breadcrumbs */}
        <div className="text-lg text-gray-500 ">
          Account Setting
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/admin/dashboard" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-400 pointer-events-none">Account Setting</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[005047]">Account Settings</h1>
          <p className="text-gray-500 mt-1">View and manage your account settings</p>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('Account')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors
                        ${activeTab === 'Account' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              style={{ color: activeTab === 'Account' ? '#0078FC' : undefined, borderColor: activeTab === 'Account' ? '#0078FC' : undefined }}
            >
              <IconUserCircle size={20} />
              Account
            </button>
          </div>

          <div className="p-6 bg-gray-50/10 min-h-[400px]">
            {activeTab === 'Account' && (
              <div className="space-y-6">
                {/* Top Row: Password & Profile Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Change Password Card */}
                  <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Change Password</h3>
                    <p className="text-gray-500 text-sm mb-6">To change your password please confirm here</p>

                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showCurrent ? "text" : "password"}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                            placeholder="Enter current password"
                            value={passwordForm.current}
                            onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                          />
                          <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showCurrent ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                          <input
                            type={showNew ? "text" : "password"}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                            placeholder="Enter new password"
                            value={passwordForm.new}
                            onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                          />
                          <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showNew ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                          </button>
                        </div>
                        {/* Password Strength Indicator (Simplified) */}
                        {passwordForm.new && (
                          <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-3/4"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                          <input
                            type={showConfirm ? "text" : "password"}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                            placeholder="Confirm new password"
                            value={passwordForm.confirm}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                          />
                          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showConfirm ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setPasswordForm({ current: '', new: '', confirm: '' })}
                          className="px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all w-full sm:w-auto"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 w-full sm:w-auto"
                          disabled={loading}
                        >
                          {loading ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Profile Image Card */}
                  <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Profile Image</h3>
                    <p className="text-gray-500 text-sm mb-6">Change your profile picture</p>

                    <div className="relative group cursor-pointer mb-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs">
                        Change
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Allowed *.jpeg, *.jpg, *.png, *.gif <br /> max size of 3.1 MB
                    </div>
                  </div>
                </div>

                {/* Personal Details Card */}
                <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Personal Details</h3>
                  <p className="text-gray-500 text-sm mb-6">To change your personal details, edit and save from here</p>

                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                          value={profile.email}
                          readOnly
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed here</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-100 pt-6">
                      <button
                        type="button"
                        className="px-8 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-all border border-transparent w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 w-full sm:w-auto"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
