import PAGES from '@repo/constants/pages';
import Link from 'next/link';
import { navLinks } from './utils';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 h-13 bg-bg border-b border-border-subtle'>
      <nav className='h-full max-w-6xl mx-auto px-6 flex items-center justify-between'>
        <Link
          href='/'
          className='text-[15px] font-medium text-heading'
        >
          CritiqAI
        </Link>
        <div className='flex items-center gap-7'>
          {navLinks.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className='text-[13px] text-body hover:text-heading transition-colors'
            >
              {title}
            </Link>
          ))}

          <Link
            href={PAGES.signup}
            className='text-[13px] text-brand border border-brand rounded-md px-4 py-1.5 hover:bg-brand/10 transition-colors'
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
