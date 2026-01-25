'use client';

import { useEffect, useState, Suspense } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Assuming this exists or will be replaced by mock

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate verification for visual check
    const verify = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      // setAuthenticated(true); // Toggle this to test success state
      setError('Invalid invitation link. Please request a new invitation.'); // Default to error for safety/demo
    };
    verify();
  }, []);

  return (
    <div className="text-center py-4">
      {loading ? (
        <>
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0078FC]"></div>
          </div>
          <p className="text-gray-600">Verifying your account...</p>
        </>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : authenticated ? (
        <>
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">Your account has been successfully verified. You can now use the application.</span>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-[#0078FC] hover:bg-[#0060d4] text-white text-[16px] font-bold py-3 px-8 rounded-3xl transition-colors shadow-lg"
          >
            Go to Dashboard
          </button>
        </>
      ) : null}
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <AuthLayout maxWidth="450px">
      <Suspense fallback={
        <div className="text-center py-4">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0078FC]"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      }>
        <ConfirmContent />
      </Suspense>
    </AuthLayout>
  );
}
