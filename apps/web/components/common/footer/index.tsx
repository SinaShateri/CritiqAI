import Link from 'next/link';
import { FooterLink, footerLinks } from './utils';

const Footer = () => {
  return (
    <footer className='border-t border-border-subtle px-6 py-6'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3'>
        <span className='text-[12px] text-faint'>CritiqAI © 2026</span>

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
      className='text-[12px] text-faint transition-colors hover:text-body'
    >
      {label}
    </Link>
  );
};

export default Footer;
