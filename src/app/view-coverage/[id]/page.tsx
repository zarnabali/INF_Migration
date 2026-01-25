'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/layouts';
import { LoadingSkeleton } from '@/components/shared';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api.service';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function ViewCoveragePage() {
  const params = useParams();
  const id = params.id as string;
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  // Use getPolicyDetails to get full data including address, phone, cert number, doc link
  const { data: coverage, isLoading, refetch } = useQuery({
    queryKey: ['policy-details', id],
    queryFn: async () => {
      const data = await apiService.getPolicyDetails(id);
      return data;
    },
  });

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleCancelCoverage = async () => {
    if (!cancelReason) return;

    if (!coverage?.id) return;

    setIsCancelling(true);
    try {
      // Legacy used supabase function 'cancel-coverage' which is wrapped in apiService.cancelCoverage
      // But apiService.cancelCoverage expects id and reason.
      await apiService.cancelCoverage(coverage.id, cancelReason);
      await refetch();
      setShowCancelDialog(false);
      toast.success('Coverage cancelled successfully');
    } catch (error) {
      console.error('Error cancelling coverage:', error);
      toast.error('Failed to cancel coverage');
    } finally {
      setIsCancelling(false);
    }
  };

  const coverageStatus = (status: string, startDate?: string, endDate?: string) => {
    // Logic ported from CoverageTab.vue
    const today = new Date();
    const effectiveDate = startDate ? new Date(startDate) : null;
    const terminationDate = endDate ? new Date(endDate) : null;

    if (status === 'cancelled') {
      return { text: 'Cancelled', color: 'bg-red-100 text-red-800' };
    }
    if (effectiveDate && today < effectiveDate) {
      return { text: 'Soon', color: 'bg-yellow-100 text-yellow-800' };
    }
    if (terminationDate && today > terminationDate) {
      return { text: 'Passed', color: 'bg-gray-100 text-gray-800' };
    }
    if (status === 'active' || status === 'payment_completed') { // Handle both active statuses
      return { text: 'Active', color: 'bg-green-100 text-green-800' };
    }
    return { text: status || 'Unknown', color: 'bg-gray-100 text-gray-800' };
  };

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="max-w-[1218px] mx-auto px-4 py-12">
          <LoadingSkeleton variant="card" />
        </div>
      </PublicLayout>
    );
  }

  if (!coverage) {
    return (
      <PublicLayout>
        <div className="max-w-[1218px] mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <h2 className="font-semibold mb-2">Coverage Not Found</h2>
            <p>The coverage you are looking for does not exist or has been removed.</p>
            <Link href="/locate-coverage" className="text-red-800 underline mt-2 inline-block">
              Search for coverage
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const statusInfo = coverageStatus(coverage.status, coverage.travel.departureDate, coverage.travel.returnDate);
  const canCancel = (coverage.status === 'active' || coverage.status === 'payment_completed') &&
    coverage.travel.departureDate &&
    new Date(coverage.travel.departureDate) > new Date(); // Simple check: can cancel before start date? 
  // Legacy check: CancelByDate > today. We don't have CancelByDate in type yet, assume standard logic.

  return (
    <PublicLayout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="max-w-[1218px] mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Coverage Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold text-gray-800">Coverage</h5>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <hr className="border-gray-100 my-4" />
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-gray-700">Certificate Number: </span>
                    <span className="text-gray-600">{coverage.externalCertificate || 'Pending'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Product: </span>
                    <span className="text-gray-600">{coverage.quote?.program?.product_name || coverage.travel.productCode}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Coverage Amount: </span>
                    <span className="text-gray-600">{formatCurrency(parseFloat(coverage.travel.tripAmount))}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Start Date: </span>
                    <span className="text-gray-600">
                      {coverage.travel.departureDate ? format(new Date(coverage.travel.departureDate), 'MM/dd/yyyy') : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">End Date: </span>
                    <span className="text-gray-600">
                      {coverage.travel.returnDate ? format(new Date(coverage.travel.returnDate), 'MM/dd/yyyy') : 'N/A'}
                    </span>
                  </div>
                </div>
                <hr className="border-gray-100 my-4" />
                <div className="flex flex-wrap gap-3">
                  {canCancel && (
                    <button
                      onClick={() => setShowCancelDialog(true)}
                      className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Cancel
                    </button>
                  )}
                  {coverage.document_link && (
                    <a
                      href={coverage.document_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download Policy
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Primary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h5 className="text-xl font-bold text-gray-800 mb-4">Primary</h5>
                <hr className="border-gray-100 my-4" />
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-gray-700">Name: </span>
                    <span className="text-gray-600">{coverage.contact.firstName} {coverage.contact.lastName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Email: </span>
                    <span className="text-gray-600">{coverage.contact.email}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Phone: </span>
                    <span className="text-gray-600">{coverage.contact.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Address: </span>
                    <span className="text-gray-600">
                      {coverage.contact.address} {coverage.contact.city}, {coverage.contact.state} {coverage.contact.postal} {coverage.contact.country}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Amount Paid: </span>
                    <span className="text-gray-600">{formatCurrency(coverage.amount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h5 className="text-xl font-bold text-gray-800 mb-4">Trip Details</h5>
                <hr className="border-gray-100 my-4" />
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-gray-700">Trip Amount: </span>
                    <span className="text-gray-600">{formatCurrency(parseFloat(coverage.travel.tripAmount))}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Booking Date: </span>
                    <span className="text-gray-600">
                      {coverage.createdAt ? format(new Date(coverage.createdAt), 'MM/dd/yyyy') : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Start Date: </span>
                    <span className="text-gray-600">
                      {coverage.travel.departureDate ? format(new Date(coverage.travel.departureDate), 'MM/dd/yyyy') : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">End Date: </span>
                    <span className="text-gray-600">
                      {coverage.travel.returnDate ? format(new Date(coverage.travel.returnDate), 'MM/dd/yyyy') : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Location: </span>
                    <span className="text-gray-600">
                      {coverage.travel.destinationCity}, {coverage.travel.destinationState}, {coverage.travel.destinationCountry}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Claim Card place holder if needed later */}

          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Need Help?</h3>
            <p className="text-blue-700 mb-4">
              For questions about your coverage or to file a claim, contact our support team.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:support@inftravel.com" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                support@inftravel.com
              </a>
              <span className="text-blue-300">|</span>
              <a href="tel:+18001234567" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                1-800-123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Cancel Coverage</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this coverage? This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for cancellation
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                rows={3}
                placeholder="Please provide a reason..."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Keep Coverage
              </button>
              <button
                onClick={handleCancelCoverage}
                disabled={!cancelReason || isCancelling}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Coverage'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
