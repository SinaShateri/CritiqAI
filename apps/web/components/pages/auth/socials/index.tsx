'use client';

import PAGES from '@repo/constants/pages';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

const AuthSocials = () => {
  return (
    <div className='flex flex-col gap-3.5'>
      <div className='my-5 flex items-center gap-3'>
        <div className='bg-border-subtle h-px flex-1'></div>
        <span className='text-faint text-[11px]'>or continue with</span>
        <div className='bg-border-subtle h-px flex-1'></div>
      </div>
      <div className='flex gap-2.5'>
        <button
          type='button'
          onClick={() => {
            signIn('google', { callbackUrl: PAGES.dashboard.index });
          }}
          className='bg-surface border-border-subtle text-body flex flex-1 items-center justify-center gap-2 rounded-sm border py-2.5 text-[12px] transition-colors hover:border-[#2e3148]'
        >
          <IconBrandGoogle size={18} />
          Google
        </button>
        <button
          type='button'
          onClick={() => {
            signIn('github', { callbackUrl: PAGES.dashboard.index });
          }}
          className='bg-surface border-border-subtle text-body flex flex-1 items-center justify-center gap-2 rounded-sm border py-2.5 text-[12px] transition-colors hover:border-[#2e3148]'
        >
          <IconBrandGithub size={18} />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default AuthSocials;
