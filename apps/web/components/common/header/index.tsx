'use client';

import LAYOUT from '@repo/constants/layout';
import PAGES from '@repo/constants/pages';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderProfile from './profile';
import { navLinks } from './utils';

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith(PAGES.dashboard.root)) return null;

  return (
    <header
      className='border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur'
      style={{
        height: LAYOUT.header.height,
      }}
    >
      <nav
        aria-label='Main'
        className='mx-auto flex h-full max-w-6xl items-center justify-between px-6'
      >
        <Link
          href={PAGES.home}
          className='text-foreground focus-visible:ring-ring focus-visible:ring-offset-background text-[15px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          CritiqAI
        </Link>
        <div className='flex items-center gap-7'>
          {navLinks.map(({ title, href }) => {
            const active = pathname === href;

            return (
              <Link
                key={title}
                href={href}
                aria-current={active ? 'page' : undefined}
                className='text-foreground-muted hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
              >
                {title}
              </Link>
            );
          })}

          <HeaderProfile />
        </div>
      </nav>
    </header>
  );
};

export default Header;
