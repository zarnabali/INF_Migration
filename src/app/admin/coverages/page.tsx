'use client';

import { useState, useEffect } from 'react';
import {
  IconFilter,
  IconFilterOff,
  IconSearch,
  IconEye,
  IconDownload,
  IconAdjustmentsHorizontal
} from '@tabler/icons-react';
import Link from 'next/link';

interface Coverage {
  id: string;
  certificateNumber: string;
  customer: {
    name: string;
    email: string;
  };
  affiliateName: string;
  paidAmount: number;
  status: 'active' | 'expired' | 'cancelled';
  createdAt: string;
}

export default function AdminCoveragesPage() {
  const [coverages, setCoverages] = useState<Coverage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [affiliateFilter, setAffiliateFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setCoverages([
        {
          id: '1',
          certificateNumber: 'MIG-12345678',
          customer: { name: 'John Doe', email: 'john@example.com' },
          affiliateName: 'Global Travel Partners',
          paidAmount: 185.50,
          status: 'active',
          createdAt: '2025-01-15'
        },
        {
          id: '2',
          certificateNumber: 'MIG-23456789',
          customer: { name: 'Jane Smith', email: 'jane@example.com' },
          affiliateName: 'Direct',
          paidAmount: 516.00,
          status: 'active',
          createdAt: '2025-01-01'
        },
        {
          id: '3',
          certificateNumber: 'MIG-34567890',
          customer: { name: 'Bob Wilson', email: 'bob@example.com' },
          affiliateName: 'Agency One',
          paidAmount: 245.00,
          status: 'expired',
          createdAt: '2024-12-01'
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      expired: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100'}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
      </span>
    );
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter([]);
    setAffiliateFilter('');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = search || statusFilter.length > 0 || affiliateFilter || dateFrom || dateTo;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg text-gray-500">
          Coverage Management
        </div>
        <div className="text-sm text-gray-500 mb-1">
          Admin <span className="mx-2">›</span> <span className="text-gray-400">Coverages</span>
        </div>
        <h1 className="text-3xl font-bold text-[#005047] mt-6">System Coverage Management</h1>
        <p className="text-gray-500 mt-1">View and manage all coverage policies across the system</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-[16px] shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-6">
          <div className="relative w-full md:max-w-xl">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search policies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-[12px] border border-gray-200 focus:ring-2 focus:ring-[#005047]/20 focus:border-[#005047] outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all ${showAdvancedFilters
              ? 'bg-[#005047]/5 border-[#005047] text-[#005047]'
              : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
          >
            <IconAdjustmentsHorizontal size={20} stroke={1.5} />
            <span className="font-medium">Advanced Filters</span>
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#005047] focus:ring-4 focus:ring-[#005047]/10 outline-none bg-white appearance-none cursor-pointer text-gray-600"
                  value={statusFilter[0] || ''}
                  onChange={(e) => setStatusFilter([e.target.value])}
                >
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#005047] focus:ring-4 focus:ring-[#005047]/10 outline-none bg-white appearance-none cursor-pointer text-gray-600"
                  value={affiliateFilter}
                  onChange={(e) => setAffiliateFilter(e.target.value)}
                >
                  <option value="">Affiliate</option>
                  <option value="Global Travel Partners">Global Travel Partners</option>
                  <option value="Direct">Direct</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <span className="absolute -top-2 left-3 px-1 bg-white text-xs font-medium text-gray-500">From</span>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#005047] focus:ring-4 focus:ring-[#005047]/10 outline-none bg-white text-gray-600"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <span className="absolute -top-2 left-3 px-1 bg-white text-xs font-medium text-gray-500">To</span>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#005047] focus:ring-4 focus:ring-[#005047]/10 outline-none bg-white text-gray-600"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Table - WITH HORIZONTAL SCROLL ONLY ON TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* TABLE SCROLL CONTAINER */}
        <div className="w-full overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[900px]">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Certificate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Affiliate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coverages.length > 0 ? (
                coverages.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {item.certificateNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{item.customer.name}</span>
                        <span className="text-xs text-gray-500">{item.customer.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatCurrency(item.paidAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.affiliateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/coverages/manage/${item.id}`}
                          className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <IconEye size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No policies found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-row items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
            <span>1-6 of 6</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-gray-500">Rows:</span>
              <select className="border border-gray-300 rounded p-1 text-sm outline-none focus:ring-1 focus:ring-blue-500">
                <option>25</option>
                <option>50</option>
                <option>100</option>
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
    </div>
  );
}