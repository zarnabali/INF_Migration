'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { PublicLayout } from '@/components/layouts';

function QuoteErrorContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('code') || 'unknown';
  const errorMessage = searchParams.get('message') || '';

  const errorMessages: Record<string, { title: string; description: string }> = {
    expired: {
      title: 'Quote Expired',
      description: 'This quote has expired. Please create a new quote to continue.',
    },
    invalid: {
      title: 'Invalid Quote',
      description: 'The quote you are trying to access is invalid or has been removed.',
    },
    used: {
      title: 'Quote Already Used',
      description: 'This quote has already been used to purchase coverage.',
    },
    not_found: {
      title: 'Quote Not Found',
      description: 'We could not find the quote you are looking for.',
    },
    unknown: {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred. Please try again.',
    },
  };

  const error = errorMessages[errorCode] || errorMessages.unknown;

  return (
    <PublicLayout>
      <div className="min-h-[70vh] flex items-center justify-center py-12">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold mb-4">{error.title}</h1>
            <p className="text-gray-600 mb-6">
              {errorMessage || error.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Go Home
              </Link>
              <Link
                href="/quote"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get New Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default function QuoteErrorPage() {
  return (
    <Suspense fallback={
      <PublicLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    }>
      <QuoteErrorContent />
    </Suspense>
  );
}
