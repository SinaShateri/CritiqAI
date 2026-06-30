'use client';

import PAGES from '@repo/constants/pages';
import Button from '@repo/ui/button';
import Skeleton from '@repo/ui/skeleton';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const HeaderProfile = () => {
  const { status } = useSession();

  if (status === 'unauthenticated')
    return (
      <Button
        component={Link}
        variant='outlined-primary'
        href={PAGES.auth.register}
        className='text-brand border-brand hover:bg-brand/10 rounded-md border px-4 py-1.5 text-[13px] transition-colors'
      >
        Get started
      </Button>
    );

  if (status === 'authenticated')
    return (
      <Button
        variant='outlined-primary'
        onClick={() => signOut()}
        className='text-brand border-brand hover:bg-brand/10 rounded-md border px-4 py-1.5 text-[13px] transition-colors'
      >
        Sign out
      </Button>
    );

  return (
    <Skeleton
      width={84}
      height={34}
    />
  );
};

export default HeaderProfile;
