'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  IconSearch,
  IconRefresh,
  IconEdit,
  IconPlus,
  IconBuilding,
  IconStar
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { LoadingSkeleton } from '@/components/shared';
import { format } from 'date-fns';

interface AffiliateOrganization {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  website: string | null;
  affiliate_code: string | null;
  is_default: boolean;
  created_at: string;
}

export default function AffiliatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: affiliates, isLoading, refetch } = useQuery({
    queryKey: ['affiliates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('affiliate_organizations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as AffiliateOrganization[];
    },
  });

  const filteredAffiliates = affiliates?.filter((affiliate) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      affiliate.name.toLowerCase().includes(search) ||
      affiliate.email.toLowerCase().includes(search) ||
      (affiliate.affiliate_code?.toLowerCase().includes(search) ?? false)
    );
  });

  return (
    <>
      <div className="max-w-[1600px] mx-auto">
        {/* Breadcrumbs */}
        <div className="text-lg text-gray-500 ">
          Affiliate Management
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/admin/dashboard" className="hover:text-blue-600 transition-colors">Admin</Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-400 pointer-events-none">Affiliates</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#005047] ">System Affiliate Management</h1>
          <p className="text-gray-500 mt-1">View and manage all affiliate organizations across the system</p>
        </div>

        {/* Controls & Search */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div className="w-full md:w-1/3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or affiliate code..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-[12px] bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Create System Org Button - Warning Color as per Vue */}
              <button
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-3xl transition-colors shadow-sm justify-center w-full sm:w-auto"
                onClick={() => console.log('Create System Org Mock')}
              >
                <IconStar size={20} />
                Create System Organization
              </button>

              <Link
                href="/admin/affiliates/manage"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-3xl shadow-sm hover:shadow-md transition-all justify-center w-full sm:w-auto"
              >
                <IconPlus size={20} />
                Add Affiliate
              </Link>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <LoadingSkeleton variant="table" />
            </div>
          ) : (
            <div className="w-full overflow-x-auto thin-scrollbar">
              <table className="min-w-[900px] w-full divide-y divide-gray-100">
                <thead className="bg-white border-b border-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Organization</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Affiliate code</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created at</th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-600 w-[100px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredAffiliates?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <IconBuilding size={48} className="text-gray-200 mb-2" stroke={1} />
                          <p>No affiliate organizations found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAffiliates?.map((affiliate) => (
                      <tr key={affiliate.id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg mr-3">
                              {affiliate.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {affiliate.name}
                                {affiliate.is_default && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                    Default
                                  </span>
                                )}
                              </div>
                              {affiliate.website && (
                                <a href={affiliate.website} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-blue-500 hover:underline">
                                  {affiliate.website.replace(/^https?:\/\//, '')}
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {affiliate.affiliate_code ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                              {affiliate.affiliate_code}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {affiliate.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {format(new Date(affiliate.created_at), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <Link
                            href={`/admin/affiliates/manage/${affiliate.id}`}
                            className="text-gray-400 hover:text-blue-600 inline-flex items-center justify-center p-2 rounded-full hover:bg-blue-50 transition-all"
                          >
                            <IconEdit size={18} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          <div className="bg-white border-t border-gray-100 p-4 flex flex-row items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
              <span>Showing <span className="font-medium">{(filteredAffiliates?.length ?? 0) > 0 ? 1 : 0}</span> to <span className="font-medium">{filteredAffiliates?.length ?? 0}</span> of <span className="font-medium">{filteredAffiliates?.length ?? 0}</span> affiliates</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-500">Rows:</span>
                <select className="border border-gray-300 rounded p-1 text-sm outline-none focus:ring-1 focus:ring-blue-500">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50" disabled>
                  ‹
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* 🔒 Prevent page-level horizontal scroll */
        html,
        body {
          overflow-x: hidden;
        }

        /* Thin Scrollbar */
        .thin-scrollbar::-webkit-scrollbar {
          height: 4px; /* Minimalistic height */
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
           background-color: #94a3b8;
        }
      `}</style>
    </>
  );
}


