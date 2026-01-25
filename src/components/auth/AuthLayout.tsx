'use client';

import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
    maxWidth?: string;
}

export const AuthLayout = ({ children, maxWidth = '450px' }: AuthLayoutProps) => {
    return (
        <div className="auth-container">
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full" style={{ maxWidth }}>
                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)] p-6 sm:p-8">
                        {/* Logo */}
                        <div className="flex justify-center mb-16">
                            <Link href="/">
                                <img
                                    src="/images/logos/migration-blue.svg"
                                    alt="Migration Logo"
                                    className="h-[46px] w-auto responsive-logo"
                                />
                            </Link>
                        </div>
                        {children}
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .auth-container {
          background: linear-gradient(180deg, rgba(204, 232, 250, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
          min-height: 100vh;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .auth-container {
             /* Adjust if header overlaps */
          }
          .responsive-logo {
            max-height: 40px;
          }
        }
      `}</style>
        </div>
    );
};
