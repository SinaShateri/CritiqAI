import { IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    {
      path: './Inter/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Inter/Inter-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});
