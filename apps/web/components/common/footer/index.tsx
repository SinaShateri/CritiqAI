import PAGES from '@repo/constants/pages';
import { headers } from 'next/headers';
import Link from 'next/link';
import { FooterLink, footerLinks } from './utils';

const Footer = async () => {
  const pathname = (await headers()).get('x-pathname');

  if (pathname?.startsWith(PAGES.dashboard.root)) return null;

  return (
    <footer className='border-border border-t px-6 py-6'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3'>
        <span className='text-foreground-subtle text-[12px]'>
          CritiqAI © 2026
        </span>

        <nav
          aria-label='Footer'
          className='flex items-center gap-5'
        >
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
      className='text-foreground-subtle hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background text-[12px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
    >
      {label}
    </Link>
  );
};

export default Footer;
