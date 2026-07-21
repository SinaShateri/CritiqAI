import PAGES from '@repo/constants/pages';
import { headers } from 'next/headers';
import Link from 'next/link';
import { FooterLink, footerLinks } from './utils';

const Footer = async () => {
  const pathname = (await headers()).get('x-pathname');

  if (pathname?.startsWith(PAGES.dashboard.root)) return null;

  return (
    <footer className='border-t border-border px-6 py-6'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3'>
        <span className='text-[12px] text-foreground-subtle'>CritiqAI © 2026</span>

        <nav aria-label='Footer' className='flex items-center gap-5'>
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
      className='text-[12px] text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
    >
      {label}
    </Link>
  );
};

export default Footer;
