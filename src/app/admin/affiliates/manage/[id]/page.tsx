'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layouts';
import { useParams } from 'next/navigation';
import {
  IconChevronRight,
  IconUserCircle,
  IconUsers,
  IconArticle,
  IconFolder,
  IconShieldLock,
  IconReceipt2
} from '@tabler/icons-react';

export default function ManageAffiliatePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('Account');
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<any>(null);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setAffiliate({
        id: params.id,
        name: 'Global Travel Partners',
        email: 'contact@gtp.com',
        phone: '+1 (555) 987-6543',
        website: 'https://www.gtp.com',
        affiliate_code: 'GTP-001',
        is_default: false,
        created_at: '2024-12-10T10:00:00Z',
        address: {
          street1: '456 Partner Blvd',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90001',
          country: 'USA'
        }
      });
      setLoading(false);
    }, 600);
  }, [params.id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading affiliate data...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!affiliate) return <AdminLayout>Error loading affiliate</AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/admin/affiliates" className="hover:text-blue-600 transition-colors">Affiliates</Link>
          <IconChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-400 pointer-events-none">Manage</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Affiliate - {affiliate.name}</h1>
          <p className="text-gray-500 mt-1">View and manage affiliate organization details</p>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('Account')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap font-medium transition-colors
                        ${activeTab === 'Account' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              style={{ color: activeTab === 'Account' ? '#0078FC' : undefined, borderColor: activeTab === 'Account' ? '#0078FC' : undefined }}
            >
              <IconUserCircle size={20} />
              Account
            </button>
            <button
              onClick={() => setActiveTab('Users')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap font-medium transition-colors
                        ${activeTab === 'Users' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              style={{ color: activeTab === 'Users' ? '#0078FC' : undefined, borderColor: activeTab === 'Users' ? '#0078FC' : undefined }}
            >
              <IconUsers size={20} />
              Users
            </button>
            <button
              onClick={() => setActiveTab('Referral')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap font-medium transition-colors
                        ${activeTab === 'Referral' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              style={{ color: activeTab === 'Referral' ? '#0078FC' : undefined, borderColor: activeTab === 'Referral' ? '#0078FC' : undefined }}
            >
              <IconArticle size={20} />
              Referral
            </button>
            <button
              onClick={() => setActiveTab('Documents')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap font-medium transition-colors
                        ${activeTab === 'Documents' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              style={{ color: activeTab === 'Documents' ? '#0078FC' : undefined, borderColor: activeTab === 'Documents' ? '#0078FC' : undefined }}
            >
              <IconFolder size={20} />
              Documents
            </button>
            {/* 
                <button disabled className="flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap text-gray-300 cursor-not-allowed">
                     <IconReceipt2 size={20} /> Bills
                </button>
                <button disabled className="flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap text-gray-300 cursor-not-allowed">
                     <IconShieldLock size={20} /> Security
                </button> 
                */}
          </div>

          <div className="p-6 bg-gray-50/10 min-h-[400px]">
            {activeTab === 'Account' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 text-[17px] mb-4 flex items-center gap-2">
                    <IconUserCircle size={22} className="text-gray-600" />
                    Basic Information
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <strong className="block text-gray-700 mb-1">Organization Name</strong>
                      <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">{affiliate.name}</div>
                    </div>
                    <div>
                      <strong className="block text-gray-700 mb-1">Email</strong>
                      <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">{affiliate.email}</div>
                    </div>
                    <div>
                      <strong className="block text-gray-700 mb-1">Phone</strong>
                      <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">{affiliate.phone || '-'}</div>
                    </div>
                    <div>
                      <strong className="block text-gray-700 mb-1">Website</strong>
                      <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">{affiliate.website || '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 text-[17px] mb-4 flex items-center gap-2">
                    <IconArticle size={22} className="text-gray-600" />
                    Configuration
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <strong className="block text-gray-700 mb-1">Affiliate Code</strong>
                      <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-mono">{affiliate.affiliate_code || '-'}</div>
                    </div>
                    <div>
                      <strong className="block text-gray-700 mb-1">Address</strong>
                      <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                        {affiliate.address ? (
                          <>
                            {affiliate.address.street1}<br />
                            {affiliate.address.city}, {affiliate.address.state} {affiliate.address.zip}<br />
                            {affiliate.address.country}
                          </>
                        ) : '-'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Users' && (
              <div className="text-center py-12">
                <IconUsers size={48} className="text-gray-200 mx-auto mb-3" stroke={1} />
                <p className="text-gray-500">No users found for this organization.</p>
                <button className="mt-4 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition-colors">
                  Add User
                </button>
              </div>
            )}

            {activeTab === 'Referral' && (
              <div className="text-center py-12">
                <IconArticle size={48} className="text-gray-200 mx-auto mb-3" stroke={1} />
                <p className="text-gray-500">No referral data available.</p>
              </div>
            )}

            {activeTab === 'Documents' && (
              <div className="text-center py-12">
                <IconFolder size={48} className="text-gray-200 mx-auto mb-3" stroke={1} />
                <p className="text-gray-500">No documents uploaded.</p>
                <button className="mt-4 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition-colors">
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
