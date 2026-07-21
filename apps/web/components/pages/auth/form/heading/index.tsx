'use client';

import PAGES from '@repo/constants/pages';
import cn from '@repo/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthFormHeading = () => {
  const pathname = usePathname();
  const linkClasses = (active: boolean) =>
    cn(
      'flex-1 bg-surface py-2.25 text-center text-sm text-foreground-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      active && 'bg-primary font-medium text-primary-foreground',
    );

  return (
    <>
      <Link
        href={PAGES.home}
        className='text-foreground focus-visible:ring-ring text-[15px] font-medium focus-visible:ring-2 focus-visible:outline-none'
      >
        Critiq<span className='text-primary'>AI</span>
      </Link>
      <div className='border-border mt-8 flex overflow-hidden rounded-md border'>
        <Link
          href={PAGES.auth.login}
          className={linkClasses(pathname === PAGES.auth.login)}
        >
          Sign in
        </Link>
        <Link
          href={PAGES.auth.register}
          className={linkClasses(pathname === PAGES.auth.register)}
        >
          Create account
        </Link>
      </div>
    </>
  );
};

export default AuthFormHeading;
