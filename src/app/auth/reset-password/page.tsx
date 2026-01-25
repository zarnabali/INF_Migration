'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout maxWidth="450px">
      {/* Success Alert Banner for State 2 */}
      {isSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] z-50">
          <div className="bg-[#4CAF50] text-white px-6 py-4 rounded-md shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-1 mr-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-sm sm:text-base">
                If an account exists with this email, a password reset link has been sent.
              </span>
            </div>
            <button onClick={() => setIsSuccess(false)} className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {!isSuccess ? (
        <>
          <p className="text-center text-[#3A4752] mb-8 leading-relaxed">
            Please enter the email address associated with your account and We will email you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[16px] font-medium text-[#3A4752] mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border border-[#DFE5EF] rounded-[10px] text-[#3A4752] placeholder-gray-300 outline-none focus:ring-1 focus:ring-[#0078FC] focus:border-[#0078FC] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0078FC] hover:bg-[#0060d4] text-white text-[16px] font-bold py-4 px-4 rounded-3xl transition-colors disabled:opacity-70 mb-4 shadow-lg"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <Link
              href="/auth/login"
              className="block w-full text-center bg-[#F1F6FA] hover:bg-[#e6eff5] text-[#0078FC] text-[16px] font-bold py-4 px-4 rounded-3xl transition-colors"
            >
              Back To Login
            </Link>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-12 bg-[#2ECC71] rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                <svg className="w-5 h-5 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-medium text-[#005047] mb-2">Check Your Email</h3>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the instructions.
          </p>

          <p className="text-gray-500 text-xs mb-8">
            Didn't receive the email? Check your spam folder or <button className="text-[#0078FC] hover:underline" onClick={handleSubmit}>try again</button>.
          </p>

          <Link
            href="/auth/login"
            className="block w-full text-center bg-[#F1F6FA] hover:bg-[#e6eff5] text-[#0078FC] font-medium py-3 px-4 rounded-full transition-colors"
          >
            Back To Login
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
