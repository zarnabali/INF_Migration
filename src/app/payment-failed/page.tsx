'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/layouts';
import Image from 'next/image';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const errorFromUrl = searchParams.get('error');
  const errorMessage = decodeURIComponent(errorFromUrl || 'An unexpected error occurred during payment processing');

  return (
    <div className="py-16 min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 max-w-[1218px]">
        <div className="max-w-[800px] mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">

          <h3 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h3>
          <p className="text-lg text-gray-600 mb-6">
            We encountered an issue while processing your payment.
          </p>

          <div className="flex justify-center my-8">
            <Image
              src="/images/big/img3.jpg"
              alt="Payment Failed"
              width={250}
              height={250}
              className="object-contain"
            />
          </div>

          <div className="bg-red-50 text-red-700 px-6 py-4 rounded-lg mb-8 max-w-[500px] mx-auto border border-red-100">
            {errorMessage}
          </div>

          <div className="flex justify-center gap-4 mt-5">
            <Link
              href="/"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Return Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
        <PaymentFailedContent />
      </Suspense>
    </PublicLayout>
  );
}

