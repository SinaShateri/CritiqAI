'use client';

import PAGES from '@repo/constants/pages';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

const AuthSocials = () => {
  return (
    <div className='flex flex-col gap-3.5'>
      <div className='my-5 flex items-center gap-3'>
        <div className='bg-border-subtle h-px flex-1'></div>
        <span className='text-foreground-subtle text-xs'>or continue with</span>
        <div className='bg-border-subtle h-px flex-1'></div>
      </div>
      <div className='flex gap-2.5'>
        <button
          type='button'
          onClick={() => {
            signIn('google', { callbackUrl: PAGES.dashboard.overview });
          }}
          className='border-border bg-surface text-foreground-muted hover:border-border-strong hover:text-foreground focus-visible:ring-ring flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none'
        >
          <IconBrandGoogle size={18} />
          Google
        </button>
        <button
          type='button'
          onClick={() => {
            signIn('github', { callbackUrl: PAGES.dashboard.overview });
          }}
          className='border-border bg-surface text-foreground-muted hover:border-border-strong hover:text-foreground focus-visible:ring-ring flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none'
        >
          <IconBrandGithub size={18} />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default AuthSocials;
