'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/layouts';
import { ProcessingOverlay } from '@/components/shared';
import { quoteService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { addDays, format } from 'date-fns';

const tripTypes = [
  { id: 'single', label: 'Single Trip', description: 'Coverage for one trip' },
  { id: 'annual', label: 'Annual Plan', description: 'Coverage for multiple trips' },
];

function QuoteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productCode = searchParams.get('product') || '';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tripType: 'single',
    departureDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    returnDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
    destination: '',
    travelers: 1,
    tripCost: 0,
    age: '',
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: quoteService.getInsuranceProducts,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'travelers' || name === 'tripCost' ? Number(value) : value,
    }));
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required fields');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.departureDate || !formData.returnDate) {
      setError('Please select travel dates');
      return false;
    }
    if (new Date(formData.departureDate) >= new Date(formData.returnDate)) {
      setError('Return date must be after departure date');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError(null);
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const quoteData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        product_code: productCode || 'SINGLE_TRIP',
        departure_date: formData.departureDate,
        return_date: formData.returnDate,
        destination: formData.destination || undefined,
        travelers: formData.travelers,
        trip_cost: formData.tripCost || undefined,
        primary_age: formData.age ? parseInt(formData.age) : undefined,
      };

      const quote = await quoteService.createQuote(quoteData);

      if (quote) {
        router.push(`/checkout/${quote.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create quote. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <PublicLayout>
      <ProcessingOverlay open={isSubmitting} message="Creating your quote..." />

      <div className="min-h-[80vh] py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Get Your Free Quote</h1>
            <p className="text-gray-600">
              Complete the form below to receive an instant quote for travel insurance.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-16 h-1 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      max="99"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Trip Details */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Trip Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trip Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tripTypes.map((type) => (
                        <label
                          key={type.id}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.tripType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="tripType"
                              value={type.id}
                              checked={formData.tripType === type.id}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600"
                            />
                            <div>
                              <p className="font-medium">{type.label}</p>
                              <p className="text-sm text-gray-500">{type.description}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Departure Date *
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Return Date *
                      </label>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g., Europe, Japan, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Travelers
                      </label>
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trip Cost (USD)
                      </label>
                      <input
                        type="number"
                        name="tripCost"
                        value={formData.tripCost || ''}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Quote</h2>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trip Type</span>
                    <span className="font-medium capitalize">{formData.tripType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dates</span>
                    <span className="font-medium">
                      {format(new Date(formData.departureDate), 'MMM d')} -{' '}
                      {format(new Date(formData.returnDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  {formData.destination && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Destination</span>
                      <span className="font-medium">{formData.destination}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travelers</span>
                    <span className="font-medium">{formData.travelers}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  By clicking &quot;Get Quote&quot;, you agree to our{' '}
                  <Link href="/legal/terms-of-use" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Get Quote
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <PublicLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    }>
      <QuoteContent />
    </Suspense>
  );
}
