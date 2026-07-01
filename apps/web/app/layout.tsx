import './globals.css';

import type { Metadata } from 'next';
import { Suspense } from 'react';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import ClientProvider from '../components/providers/client';
import { inter } from './fonts';

export const metadata: Metadata = {
  title: 'CritiqAI',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} font-sans`}>
        <ClientProvider>
          <Suspense>
            <Header />
          </Suspense>
          {children}
          <Suspense>
            <Footer />
          </Suspense>
        </ClientProvider>
      </body>
    </html>
  );
}
