'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PublicLayout } from '@/components/layouts';
import { useStripePayment } from '@/hooks/useStripePayment';
import { apiService } from '@/services/api.service';
import { referralService } from '@/services/referral.service';
import { quoteService } from '@/services/quote.service';
import { useAuthStore } from '@/stores/authStore';
import { useSessionStore } from '@/stores/sessionStore';
import { ProcessingOverlay } from '@/components/shared/ProcessingOverlay';
import toast from 'react-hot-toast';

function PaymentCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '';
  const { stripe, initializeStripe } = useStripePayment(stripeKey);
  const authStore = useAuthStore();
  const sessionStore = useSessionStore();

  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Processing your payment...');
  const processedRef = useRef(false);

  // Get URL params
  const policyId = searchParams.get('policy_id');
  const clientSecret = searchParams.get('payment_intent_client_secret');

  useEffect(() => {
    const processCompletion = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      console.log('Payment complete mounted');
      setLoadingMessage('Initializing payment system...');

      // Initialize Stripe first to get the instance
      await initializeStripe();

      console.log('Retrieved from URL:', { clientSecret, policyId });

      if (!clientSecret || !policyId) {
        console.error('Missing required data:', { clientSecret, policyId });
        toast.error('Invalid payment session - missing required data');
        router.push('/');
        return;
      }

      if (!stripe.current) {
        // Wait a bit or retry? initializeStripe is async, but stripe ref should be set
        // Actually initializeStripe sets the ref. 
        // If it failed, we might have an issue.
        // Wait for stripe logic if needed or assume it's set if await passed
      }

      // Checking stripe.current again just in case, though await initializeStripe should handle it
      if (!stripe.current) {
        // Should have thrown in initializeStripe or logged error
        toast.error('Payment system initialization failed');
        router.push('/');
        return;
      }

      let paymentIntentResult;

      try {
        setLoadingMessage('Retrieving payment details...');
        paymentIntentResult = await stripe.current.retrievePaymentIntent(clientSecret);
        console.log('Payment intent retrieved:', paymentIntentResult);

        if (!paymentIntentResult.paymentIntent) {
          throw new Error('Payment intent not found');
        }

        // If we don't have a policyId but have a successful payment (edge case logic from Vue)
        // But here we checked !policyId above, so this block is redundant unless logic changes
        if (!policyId && paymentIntentResult.paymentIntent.status === 'requires_capture') {
          toast.error('Session expired. Please try again.');
          router.push('/');
          return;
        }

        // Handle different payment intent statuses
        switch (paymentIntentResult.paymentIntent.status) {
          case 'requires_capture':
          case 'requires_confirmation':
          case 'processing':
            try {
              setLoadingMessage('Opening coverage...');

              // 1. Fetch policy details to get necessary info
              const policyDetails = await apiService.getPolicyDetails(policyId);
              if (!policyDetails) {
                throw new Error('Policy data not found');
              }

              // Validate referral code
              const sessionReferralCode = sessionStore.refCode;
              const referralResult = await referralService.validateReferralCode(sessionReferralCode);

              // Extract product code
              const productCode = policyDetails.quote?.product_code; // Access from quote relation
              // Alternatively from program data if available? 
              // The Vue code accessed policyDetails.value.quote?.product_code
              // apiService.getPolicyDetails returns quote object
              if (!productCode) {
                throw new Error('Product code not found in coverage details');
              }

              // Call external insurance API
              const externalPolicy = await apiService.openInsurancePolicy({
                contact: policyDetails.contact,
                travel: policyDetails.travel,
                amount: paymentIntentResult.paymentIntent.amount / 100,
                reservationNumber: policyId,
                paymentType: policyDetails.paymentType || 'affirm',
                paymentIntentId: paymentIntentResult.paymentIntent.id,
                productCode: productCode,
                additionalTravelers: policyDetails.additionalTravelers,
                referralCode: referralResult.code ?? undefined,
              });

              if (!externalPolicy || !externalPolicy.Id) {
                throw new Error('Failed to create external policy');
              }

              setLoadingMessage('Capturing payment...');
              await apiService.capturePayment(paymentIntentResult.paymentIntent.id);

              setLoadingMessage('Finalizing your policy...');
              await apiService.updatePolicyPayment(policyId, {
                payment_intent_id: paymentIntentResult.paymentIntent.id,
                status: 'active',
                payment_method_id: paymentIntentResult.paymentIntent.payment_method as string,
                paid_at: new Date().toISOString(),
                currency: 'usd',
                payment_status: 'completed',
                paid_amount: paymentIntentResult.paymentIntent.amount,
                external_policy_id: externalPolicy.Id,
                external_certificate: externalPolicy.CertificateNumber,
                document_link: externalPolicy.Program.DocLink,
                affiliate_id: referralResult.organization_id ?? undefined,
              });

              // Sanitize sensitive traveler data
              setLoadingMessage('Cleaning up sensitive data...');
              await apiService.sanitizePolicyTravelerData(policyId);

              // Mark quote as used
              if (policyDetails.quoteId) {
                try {
                  await quoteService.markQuoteAsUsed(policyDetails.quoteId);
                } catch (err) {
                  console.error('Failed to mark quote as used:', err);
                }
              }

              // Track purchase (Analytics placeholder)
              // analytics.trackPurchase(...) 

              setLoading(false);
              const token = authStore.authorizePolicy(policyId);
              router.push(`/thankyou/${token}`);

            } catch (error) {
              throw new Error(error instanceof Error ? error.message : 'Failed to process payment');
            }
            break;

          case 'succeeded':
            setLoading(false);
            const token = authStore.authorizePolicy(policyId);
            router.push(`/thankyou/${token}`);
            break;

          default:
            throw new Error(`Unexpected payment status: ${paymentIntentResult.paymentIntent.status}`);
        }
      } catch (error: any) {
        console.error('Payment processing error:', error);
        // Track error

        // Cancel payment if needed
        if (
          paymentIntentResult?.paymentIntent?.id &&
          !error.message?.includes('Payment capture failed')
        ) {
          try {
            setLoadingMessage('Cancelling transaction...');
            await apiService.cancelPayment(paymentIntentResult.paymentIntent.id);
          } catch (cancelError) {
            console.error('Failed to cancel payment:', cancelError);
          }
        }

        // Update policy status to failed
        try {
          setLoadingMessage('Updating status...');
          await apiService.updatePolicyPayment(policyId, {
            payment_intent_id: paymentIntentResult?.paymentIntent?.id || clientSecret,
            status: 'cancelled',
            payment_error: error.message || 'Payment failed',
            payment_status: 'failed',
          });
        } catch (updateError) {
          console.error('Failed to update policy status:', updateError);
        }

        setLoading(false);
        toast.error(error.message || 'Payment failed');
        router.push(`/payment-failed?error=${encodeURIComponent(error.message || 'Payment failed')}`);
      }
    };

    processCompletion();
  }, [clientSecret, policyId, router, initializeStripe, stripe, authStore, sessionStore, stripeKey]);

  return <ProcessingOverlay open={loading} message={loadingMessage} />;
}

export default function PaymentCompletePage() {
  return (
    <Suspense fallback={<ProcessingOverlay open={true} message="Loading..." />}>
      <PaymentCompleteContent />
    </Suspense>
  );
}
