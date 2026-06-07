'use client';

import PAGES from '@repo/constants/pages';
import cn from '@repo/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthFormHeading = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={PAGES.home}
        className='text-heading text-[15px] font-medium'
      >
        Critiq<span className='text-brand'>AI</span>
      </Link>
      <div className='border-border-subtle mt-8 flex overflow-hidden rounded-md border'>
        <Link
          href={PAGES.auth.login}
          className={cn(
            'bg-surface text-muted-text flex-1 py-2.25 text-center text-[13px] transition-colors',
            pathname === PAGES.auth.login && 'bg-brand font-medium text-white',
          )}
        >
          Sign in
        </Link>
        <Link
          href={PAGES.auth.register}
          className={cn(
            'bg-surface text-muted-text flex-1 py-2.25 text-center text-[13px] transition-colors',
            pathname === PAGES.auth.register &&
              'bg-brand font-medium text-white',
          )}
        >
          Create account
        </Link>
      </div>
    </>
  );
};

export default AuthFormHeading;
