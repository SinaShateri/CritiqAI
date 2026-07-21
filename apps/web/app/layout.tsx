import './globals.css';

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ibmPlexMono, inter, plusJakartaSans } from '../assets/fonts';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import ClientProvider from '../components/providers/client';

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
    <html
      lang='en'
      className={`${inter.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className='bg-background text-foreground min-h-screen'>
        <ClientProvider>
          <Suspense>
            <Header />
          </Suspense>
          <main
            id='main'
            className='min-h-screen'
          >
            {children}
          </main>
          <Suspense>
            <Footer />
          </Suspense>
        </ClientProvider>
      </body>
    </html>
  );
}
