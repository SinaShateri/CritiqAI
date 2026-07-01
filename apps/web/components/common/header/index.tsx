import LAYOUT from '@repo/constants/layout';
import PAGES from '@repo/constants/pages';
import { headers } from 'next/headers';
import Link from 'next/link';
import HeaderProfile from './profile';
import { navLinks } from './utils';

const Header = async () => {
  const pathname = (await headers()).get('x-pathname');

  if (pathname?.startsWith(PAGES.dashboard.index)) return null;

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

          <HeaderProfile />
        </div>
      </nav>
    </header>
  );
};

export default Header;
