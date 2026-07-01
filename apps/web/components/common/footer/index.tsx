import PAGES from '@repo/constants/pages';
import { headers } from 'next/headers';
import Link from 'next/link';
import { FooterLink, footerLinks } from './utils';

const Footer = async () => {
  const pathname = (await headers()).get('x-pathname');

  if (pathname?.startsWith(PAGES.dashboard.index)) return null;

  return (
    <footer className='border-border-subtle border-t px-6 py-6'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3'>
        <span className='text-faint text-[12px]'>CritiqAI © 2026</span>

        <nav className='flex items-center gap-5'>
          {footerLinks.map((link) => (
            <FooterNavLink
              key={link.label}
              {...link}
            />
          ))}
        </nav>
      </div>
    </footer>
  );
};

const FooterNavLink = ({ label, href }: FooterLink) => {
  return (
    <Link
      href={href}
      className='text-faint hover:text-body text-[12px] transition-colors'
    >
      {label}
    </Link>
  );
};

export default Footer;
