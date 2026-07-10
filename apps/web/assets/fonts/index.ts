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
