'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts';
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  BoltIcon,
  BuildingOfficeIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'; // Using Heroicons outline for similarity to MDI
import { TrendingUp } from 'lucide-react'; // Some icons might be better from lucide
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export default function MemberDashboard() {
  const { user, organizationContext } = useAuthStore();
  const router = useRouter();

  // Mock Data (to match the hardcoded values in Vue example or fetch real data)
  const salesThisMonth = 12;
  const commissionsEarned = 2450;
  const salesTarget = 20;
  const commissionGoal = 4000;
  const totalVisitors = 1245;
  const activeSessions = 87;

  // Computed values
  const userName = user?.user_metadata?.first_name || 'User';
  const organizationName = organizationContext?.organizationName || 'Your Organization';
  const welcomeMessage = `Welcome back, ${userName}!`;

  const salesProgress = (salesThisMonth / salesTarget) * 100;
  const commissionProgress = (commissionsEarned / commissionGoal) * 100;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb - Basic implementation if AdminLayout doesn't provide it */}
        <div className="flex items-center text-sm text-gray-500">
          <span className="hover:text-gray-700 cursor-pointer">Affiliate Member</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Dashboard</span>
        </div>

        {/* Welcome Section */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* Success Icon */}
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{welcomeMessage}</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Track your performance, view your commissions, and manage your profile.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Your Performance</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600">{salesThisMonth}</div>
                <div className="text-sm text-gray-500 mt-1">Sales This Month</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600">${commissionsEarned.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">Commissions Earned</div>
              </div>
            </div>
          </div>

          {/* Monthly Goals */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg mr-3">
                <TrophyIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Monthly Goals</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Sales Target</span>
                  <span className="text-sm text-gray-500">{salesThisMonth}/{salesTarget}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${salesProgress}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Commission Goal</span>
                  <span className="text-sm text-gray-500">${commissionsEarned.toLocaleString()}/${commissionGoal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${commissionProgress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Visitors */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-cyan-50 rounded-lg mr-3">
                <ChartBarIcon className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Total Visitors</h3>
            </div>
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-blue-600">{totalVisitors.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-2">Visitors this month</div>
            </div>
          </div>

          {/* Current Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-50 rounded-lg mr-3">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Current Activity</h3>
            </div>
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-green-600">{activeSessions}</div>
              <div className="text-sm text-gray-500 mt-2">Active sessions</div>
            </div>
          </div>

          {/* Member Profile */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gray-50 rounded-lg mr-3">
                <UserIcon className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Member Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{userName}</div>
                <div className="text-sm text-gray-500 mt-1">{organizationName}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">Active</div>
                <div className="text-sm text-gray-500 mt-1">Member Status</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">Member</div>
                <div className="text-sm text-gray-500 mt-1">Access Level</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gray-50 rounded-lg mr-3">
                <BoltIcon className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button disabled className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed">
                <CurrencyDollarIcon className="w-5 h-5" />
                <span>My Commissions (Coming Soon)</span>
              </button>
              <button disabled className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-600 text-white rounded-lg opacity-50 cursor-not-allowed">
                <UserIcon className="w-5 h-5" />
                <span>My Profile (Coming Soon)</span>
              </button>
              <button disabled className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 text-white rounded-lg opacity-50 cursor-not-allowed">
                <QuestionMarkCircleIcon className="w-5 h-5" />
                <span>Get Support (Coming Soon)</span>
              </button>
            </div>
          </div>

          {/* Organization Info */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Organization: {organizationName}</h3>
            </div>
            <div className="text-gray-600 text-sm">
              You are a member of {organizationName}. Contact your organization manager for any questions about policies, procedures, or additional resources.
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
