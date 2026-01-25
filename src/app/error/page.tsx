'use client';

import Link from 'next/link';
import { PublicLayout } from '@/components/layouts';
import Image from 'next/image';

export default function ErrorPage() {
  return (
    <PublicLayout>
      <div className="min-h-[70vh] flex items-center justify-center py-12">
        <div className="text-center">

          <div className="flex justify-center mb-6">
            <Image
              src="/images/backgrounds/errorimg.svg"
              alt="404"
              width={500}
              height={400}
              className="object-contain max-w-full"
            />
          </div>

          <h1 className="text-5xl font-bold mb-4 text-gray-900">Opps!!!</h1>
          <h4 className="text-2xl text-gray-600 mb-8 font-normal">This page you are looking for could not be found.</h4>

          <div className="flex justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Go Back to Home
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

