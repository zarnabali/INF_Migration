'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/layouts';
import { ProcessingOverlay, LoadingSkeleton } from '@/components/shared';
import { useQuery } from '@tanstack/react-query';
import { quoteService, apiService } from '@/services';
import { format } from 'date-fns';
import { useStripePayment } from '@/hooks/useStripePayment';
import toast from 'react-hot-toast';

const steps = ['Contact Information', 'Payment Method', 'Review & Pay'];

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params.quoteId as string;

  const [activeStep, setActiveStep] = useState(0);
  // Remove local isProcessing, use hook's processing state
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '';
  const {
    stripe,
    error: stripeError,
    processing,
    initializeStripe,
    processPayment,
    validateCard
  } = useStripePayment(stripeKey);

  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: 'USA',
    birthdate: '',
  });

  const { data: quote, isLoading: quoteLoading } = useQuery({
    queryKey: ['quote', quoteId],
    queryFn: async () => {
      const data = await quoteService.getQuoteById(quoteId);
      if (!data) throw new Error('Quote not found');
      return data;
    },
  });

  // Fetch Payment Intent
  useEffect(() => {
    const initPaymentIntent = async () => {
      if (quote?.premium && !clientSecret) {
        try {
          // Amount in cents
          const amountInCents = Math.round(quote.premium * 100);
          const { clientSecret: secret } = await apiService.createPaymentIntent(amountInCents);
          setClientSecret(secret);
        } catch (err) {
          console.error('Failed to create payment intent:', err);
          setError('Failed to initialize payment system. Please try refreshing.');
        }
      }
    };

    if (quote) {
      initPaymentIntent();
    }
  }, [quote, clientSecret]);

  useEffect(() => {
    if (quote) {
      quoteService.markQuoteAsViewed(quoteId);
      setContactInfo((prev) => ({
        ...prev,
        firstName: quote.first_name || '',
        lastName: quote.last_name || '',
        email: quote.email || '',
      }));
    }
  }, [quote, quoteId]);

  // Initialize Stripe when on Payment Step
  useEffect(() => {
    if (activeStep === 1 && paymentMethod === 'credit' && clientSecret) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeStripe();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeStep, paymentMethod, clientSecret, initializeStripe]);

  const handleNext = async () => {
    if (activeStep === 0) {
      // Basic validation
      if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email) {
        setError('Please fill in all required fields');
        return;
      }

      // Update contact info in database logic? 
      // Legacy checkout saved incomplete data or passed it along.
      // Current apiService.createPolicyRecord expects all this. 
      // We will effectively create policy at the end.
    }

    // If leaving payment step, we might want to validate card? 
    // Usually validation happens at the end or on blur.

    setError(null);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    if (!clientSecret) {
      setError('Payment session not initialized. Please refresh.');
      return;
    }

    if (!quote) return;

    setError(null);

    try {
      // 1. Create Policy Record first (Pending state)
      // This is crucial because payment completion needs a policy_id to update
      // But wait, createPolicyRecord returns a policy object.

      // Prepare data
      const policyData = {
        policy: {
          trip_amount: (quote.trip_cost ?? undefined) as number | undefined,
          status: 'pending' as const, // Type assertion for PolicyStatus
          payment_type: paymentMethod,
          quote_id: quoteId,
          // affiliate info if applicable
        },
        contact_info: contactInfo,
        travel_details: {
          departureDate: quote.departure_date || '',
          returnDate: quote.return_date || '',
          tripAmount: String(quote.trip_cost || 0),
          productCode: quote.product_code || '',
          premium: quote.premium || 0,
          // fill other required fields from quote
          destinationCity: quote.destination_city || '',
          destinationCountry: quote.destination_country || '',
          departureCity: quote.departure_city || '',
          departureState: quote.departure_state || '',
          departureCountry: quote.departure_country || '',
          destinationState: quote.destination_state || '',
        },
        additional_travelers: [], // Populate if we collected them
        request_metadata: {
          // any other metadata
        }
      };

      // Call API to create policy record
      // Note: We need a policy ID to pass to Stripe for webhook/metadata
      const policy = await apiService.createPolicyRecord(policyData);

      if (!policy || !policy.id) {
        throw new Error('Failed to create policy record');
      }

      // 2. Process Payment
      await processPayment(clientSecret, {
        name: `${contactInfo.firstName} ${contactInfo.lastName}`,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: {
          line1: contactInfo.address,
          city: contactInfo.city,
          state: contactInfo.state,
          postal_code: contactInfo.postal,
          country: 'US', // default or dynamic
        },
        policy_id: policy.id, // Important: pass policy_id for tracking
      }, paymentMethod);

      // 3. Success handled in processPayment return or here
      // The hook redirects or throws. 
      // Actually the hook returns result. We should handle success here if hook doesn't redirect.
      // But processPayment implementation in useStripePayment performs redirect for Affirm (return_url)
      // For Card, it confirms payment. We need to handle the next steps.

      // Wait, processPayment hook implementation:
      /* 
         if (paymentMethod === 'affirm') { ... stripeInstance.confirmAffirmPayment(..., { return_url: ... }) }
         else { ... stripeInstance.confirmCardPayment(...) }
         return result;
      */

      // If card payment succeeds, we manually redirect
      if (paymentMethod === 'credit') {
        router.push(`/payment-complete?policy_id=${policy.id}&payment_intent_client_secret=${clientSecret}`);
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    }
  };

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (quoteLoading) {
    return (
      <PublicLayout showFooter={false}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSkeleton variant="form" />
        </div>
      </PublicLayout>
    );
  }

  if (!quote) {
    return (
      <PublicLayout showFooter={false}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Quote not found or has expired.
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout showFooter={false}>
      <ProcessingOverlay open={processing} message="Processing your payment..." />

      <div className="min-h-[80vh] py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

          {/* Stepper */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${index <= activeStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 ${index <= activeStep ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${index < activeStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {(error || stripeError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error || stripeError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Step 1: Contact Information */}
                {activeStep === 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h2 className="text-xl font-semibold">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={contactInfo.address}
                          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          value={contactInfo.city}
                          onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input
                            type="text"
                            value={contactInfo.state}
                            onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                          <input
                            type="text"
                            value={contactInfo.postal}
                            onChange={(e) => setContactInfo({ ...contactInfo, postal: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={contactInfo.birthdate}
                          onChange={(e) => setContactInfo({ ...contactInfo, birthdate: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {activeStep === 1 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <h2 className="text-xl font-semibold">payment Method</h2>
                    </div>

                    <div className="space-y-4">
                      <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'credit' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <div className="w-full">
                            <p className="font-medium">Credit Card</p>
                            <p className="text-sm text-gray-500 mb-2">Pay with Visa, Mastercard, or American Express</p>

                            {paymentMethod === 'credit' && (
                              <div id="card-element" className="p-3 border border-gray-300 rounded mt-2">
                                {/* Stripe Element mounts here */}
                              </div>
                            )}
                          </div>
                        </div>
                      </label>

                      {/* Affirm Mock - Optional implementation */}
                      {/* <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'affirm' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="affirm"
                            checked={paymentMethod === 'affirm'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <div>
                            <p className="font-medium">Affirm - Pay Later</p>
                            <p className="text-sm text-gray-500">Split your payment into monthly installments</p>
                          </div>
                        </div>
                      </label> */}
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Pay */}
                {activeStep === 2 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h2 className="text-xl font-semibold">Review Your Order</h2>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">Contact Information</p>
                      <p className="font-medium">{contactInfo.firstName} {contactInfo.lastName}</p>
                      <p className="text-gray-600">{contactInfo.email}</p>
                      {contactInfo.phone && <p className="text-gray-600">{contactInfo.phone}</p>}
                    </div>

                    <hr className="my-4" />

                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                      <p className="font-medium">
                        {paymentMethod === 'credit' ? 'Credit Card' : 'Affirm - Pay Later'}
                      </p>
                    </div>

                    <hr className="my-4" />

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/legal/terms-of-use" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/legal/privacy-policy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    disabled={activeStep === 0 || processing}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!termsAccepted || processing}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {processing ? 'Processing...' : 'Complete Purchase'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Plan</p>
                    <p className="font-medium">{quote.product_code}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Trip Dates</p>
                    <p className="font-medium">
                      {quote.departure_date && quote.return_date
                        ? `${format(new Date(quote.departure_date), 'MMM d')} - ${format(new Date(quote.return_date), 'MMM d, yyyy')}`
                        : 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Travelers</p>
                    <p className="font-medium">{quote.travelers || 1}</p>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(quote.premium)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">{formatCurrency(quote.premium)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

