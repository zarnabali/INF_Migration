'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layouts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { format } from 'date-fns';

export default function AffiliateMemberQuotesPage() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: quotes, isLoading } = useQuery({
    queryKey: ['member-quotes', user?.id],
    queryFn: async () => {
      const userId = user?.id;
      if (!userId) throw new Error('No user context');
      
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Helper to derive status from quote fields
  const getQuoteStatus = (quote: { used: boolean; viewed_at: string | null; expires_at: string | null }) => {
    if (quote.used) return 'converted';
    if (quote.expires_at && new Date(quote.expires_at) < new Date()) return 'expired';
    if (quote.viewed_at) return 'viewed';
    return 'pending';
  };

  const filteredQuotes = quotes?.filter((quote) => {
    const matchesSearch = 
      quote.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const quoteStatus = getQuoteStatus(quote);
    const matchesStatus = statusFilter === 'all' || quoteStatus === statusFilter;

    return matchesSearch && matchesStatus;
  }) || [];

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    viewed: 'bg-blue-100 text-blue-800',
    converted: 'bg-green-100 text-green-800',
    expired: 'bg-gray-100 text-gray-800',
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/affiliate/member/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <span className="mx-2">/</span>
          <span>My Quotes</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Quotes</h1>
            <p className="text-gray-600 mt-1">View quotes you&apos;ve created</p>
          </div>
          <Link
            href="/quote"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Create Quote
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="viewed">Viewed</option>
              <option value="converted">Converted</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>No quotes found</p>
            <Link href="/quote" className="text-blue-600 hover:underline mt-2 inline-block">
              Create your first quote
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Premium
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium">{quote.first_name} {quote.last_name}</p>
                        <p className="text-sm text-gray-500">{quote.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quote.product_code || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {quote.departure_date && quote.return_date ? (
                        <>
                          {format(new Date(quote.departure_date), 'MMM d')} -{' '}
                          {format(new Date(quote.return_date), 'MMM d, yyyy')}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatCurrency(quote.premium)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(() => {
                        const status = getQuoteStatus(quote);
                        return (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors[status] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.created_at ? format(new Date(quote.created_at), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:underline text-sm">
                          Resend
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/checkout/${quote.id}`);
                          }}
                          className="text-gray-600 hover:underline text-sm"
                        >
                          Copy Link
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

