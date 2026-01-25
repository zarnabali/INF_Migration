import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import localFont from 'next/font/local';
import { Providers } from '@/providers/Providers';
import './globals.css';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

const givonic = localFont({
  src: '../../public/fonts/Givonic_Variable.ttf',
  variable: '--font-givonic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'INF Travel Insurance',
  description: 'Comprehensive travel insurance coverage for your peace of mind',
  keywords: ['travel insurance', 'travel protection', 'trip insurance', 'travel coverage'],
  authors: [{ name: 'INF Travel' }],
  openGraph: {
    title: 'INF Travel Insurance',
    description: 'Comprehensive travel insurance coverage for your peace of mind',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable} ${givonic.variable}`}>
      <head>
        {/* Default favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
