'use client';

import { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Simulated user email - In real app, fetch from auth store
  const userEmail = "user@example.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout maxWidth="500px">
      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative text-center">
          Your password has been changed successfully! Redirecting to your dashboard...
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center text-center mb-6">
            <div className="relative w-full text-center border-t border-gray-200">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-3 text-[18px] text-[#3A4752] whitespace-nowrap">
                Change Your Password
              </span>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
            <p className="font-medium text-orange-700">Password Change Required</p>
            <p className="text-sm text-orange-700 mt-1">
              You are currently using a temporary password for {userEmail}. Please set a new secure password to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[16px] font-medium text-[#3A4752] mb-2">New Password</label>
              <div className="relative">
                <input
                  type={show1 ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#DFE5EF] rounded-[10px] text-[#3A4752] outline-none focus:ring-1 focus:ring-[#0078FC] focus:border-[#0078FC] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow1(!show1)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {show1 ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.056 10.056 0 01-1.791 3.475m-5.858.908c-.27.029-.53.044-.803.044a3 3 0 01-1.79-5.322" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[16px] font-medium text-[#3A4752] mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={show2 ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#DFE5EF] rounded-[10px] text-[#3A4752] outline-none focus:ring-1 focus:ring-[#0078FC] focus:border-[#0078FC] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow2(!show2)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {show2 ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.056 10.056 0 01-1.791 3.475m-5.858.908c-.27.029-.53.044-.803.044a3 3 0 01-1.79-5.322" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-6">
              <strong>Password Requirements:</strong>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one special character (@$!%*?&)</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0078FC] hover:bg-[#0060d4] text-white text-[16px] font-bold py-4 px-4 rounded-3xl transition-colors disabled:opacity-70 shadow-lg"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </>
      )}
    </AuthLayout>
  );
}
