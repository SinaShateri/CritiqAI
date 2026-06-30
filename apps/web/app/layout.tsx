import './globals.css';

import type { Metadata } from 'next';
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
          <Header />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
