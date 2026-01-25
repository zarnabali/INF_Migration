'use client';

import { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';

export default function LocateCoveragePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'otp'>('form');

  // Form State
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationToken, setVerificationToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to request OTP
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep('otp');
      // In a real app, you would set the verification token here from the response
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate successful verification and redirect
      // In real app: locateCoverage.mutateAsync
      router.push('/coverage/MIG-12345678');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout maxWidth="450px">
      {currentStep === 'form' ? (
        <>
          <div className="d-flex align-center text-center mb-6">
            <div className="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
              <div className="relative w-full text-center border-t border-gray-200">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-3 text-[18px] text-[#3A4752] whitespace-nowrap">
                  Let's Locate Your Coverage
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-[16px] font-medium text-[#3A4752] mb-2">First Name *</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#DFE5EF] rounded-[10px] text-[#3A4752] focus:ring-1 focus:ring-[#0078FC] focus:border-[#0078FC] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[16px] font-medium text-[#3A4752] mb-2">Last Name *</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#DFE5EF] rounded-[10px] text-[#3A4752] focus:ring-1 focus:ring-[#0078FC] focus:border-[#0078FC] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[16px] font-medium text-[#3A4752] mb-2">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#DFE5EF] rounded-[10px] text-[#3A4752] focus:ring-1 focus:ring-[#0078FC] focus:border-[#0078FC] outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#0078FC] hover:bg-[#0060d4] text-white text-[16px] font-bold py-4 px-4 rounded-3xl transition-colors disabled:opacity-70 shadow-lg"
            >
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Check your email</h3>
          <p className="text-gray-600 mb-6">We've sent a verification code to {email}</p>

          {/* OTP Inputs Placeholder - implementing simple view for parity now */}
          <div className="my-6">
            <p>[OTP Input Component Would Go Here]</p>
          </div>

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-[#0078FC] hover:bg-[#0060d4] text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-70"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            onClick={() => setCurrentStep('form')}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Back to Form
          </button>
        </div>
      )
      }
    </AuthLayout >
  );
}
