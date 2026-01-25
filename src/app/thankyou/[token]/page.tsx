'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/layouts';
import { ProcessingOverlay } from '@/components/shared/ProcessingOverlay';
import { apiService, type PolicyDetails } from '@/services/api.service';
import { useAuthStore } from '@/stores/authStore';
import Image from 'next/image';

export default function ThankYouPage() {
  const params = useParams();
  const router = useRouter();
  const token = (Array.isArray(params.token) ? params.token[0] : params.token) as string;
  const authStore = useAuthStore();

  const [policy, setPolicy] = useState<PolicyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const policyId = authStore.getAuthorizedPolicyId(token);

        if (!policyId) {
          router.push('/');
          return; // Allow redirect to happen
        }

        const data = await apiService.getPolicyDetails(policyId);
        if (!data) {
          router.push('/');
          return;
        }
        setPolicy(data);
      } catch (err) {
        console.error('Error fetching policy:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();

    // Cleanup
    return () => {
      // authStore.clearAuthorization(token); // Optional: clear on unmount or let it expire
    };
  }, [token, router, authStore]);

  const handleViewCoverage = () => {
    if (policy) {
      // We might need to regenerate token or reuse?
      // The legacy reused the token or generated new? 
      // `viewCoverage(policy.id)` -> `authStore.authorizePolicy(policyId)` -> push `/coverage/${token}`.
      // Since we are already on a page with a token, we can just navigate if we want, or re-authorize.
      // To be safe and consistent with legacy:
      const newToken = authStore.authorizePolicy(policy.id);
      router.push(`/view-coverage/${newToken}`);
    }
  };

  if (loading || !policy) {
    return (
      <PublicLayout>
        <ProcessingOverlay open={true} message="Loading coverage details..." />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-3 pb-14 min-h-[70vh]">
        <div className="container mx-auto px-4 max-w-[1218px]">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">

            <div className="flex justify-center mb-6">
              <Image
                src="/images/payments/congrats.gif"
                alt="Success"
                width={320}
                height={240}
                className="object-contain"
                unoptimized // Gifs might need unoptimized in Next.js
              />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-gray-900">Thank you for your purchase!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your coverage has been successfully created and is now active.
            </p>

            <div className="my-6 border-t border-gray-200" />

            <div className="text-left max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Coverage Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Certificate ID:</strong> {policy.externalCertificate || 'N/A'}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Name:</strong> {policy.contact.firstName} {policy.contact.lastName}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Email:</strong> {policy.contact.email}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Travel Dates:</strong>{' '}
                    {policy.travel.departureDate ? new Date(policy.travel.departureDate).toLocaleDateString() : 'N/A'} -{' '}
                    {policy.travel.returnDate ? new Date(policy.travel.returnDate).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Amount Paid:</strong> ${policy.amount?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Return Home
              </Link>

              {policy.document_link && (
                <a
                  href={policy.document_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm"
                >
                  Download Document
                </a>
              )}

              <button
                onClick={handleViewCoverage}
                className="px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm"
              >
                View Coverage
              </button>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

