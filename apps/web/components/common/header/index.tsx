import LAYOUT from '@repo/constants/layout';
import PAGES from '@repo/constants/pages';
import Link from 'next/link';
import { navLinks } from './utils';

const Header = () => {
  return (
    <header
      className='bg-bg border-border-subtle sticky top-0 z-50 border-b'
      style={{
        height: LAYOUT.header.height,
      }}
    >
      <nav className='mx-auto flex h-full max-w-6xl items-center justify-between px-6'>
        <Link
          href='/'
          className='text-heading text-[15px] font-medium'
        >
          CritiqAI
        </Link>
        <div className='flex items-center gap-7'>
          {navLinks.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className='text-body hover:text-heading text-[13px] transition-colors'
            >
              {title}
            </Link>
          ))}

          <Link
            href={PAGES.auth.register}
            className='text-brand border-brand hover:bg-brand/10 rounded-md border px-4 py-1.5 text-[13px] transition-colors'
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
