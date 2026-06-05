import type { Route } from 'next';

export type FooterLink = {
  label: string;
  href: Route;
};

export const footerLinks: FooterLink[] = [
  {
    label: 'Privacy',
    href: '#',
  },
  {
    label: 'Terms',
    href: '#',
  },
  {
    label: 'GitHub',
    href: '#',
  },
];
