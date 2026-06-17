'use client';

import { loginAction } from '@/lib/actions/auth.actions';
import PAGES from '@repo/constants/pages';
import Button from '@repo/ui/button';
import {
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

const AuthLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push(PAGES.dashboard.index);
    }
  }, [state, router]);

  return (
    <div
      id='auth-forms'
      className='mt-6 transition-opacity duration-200'
      style={{
        animation: '0.2s ease-out 0s 1 normal both running fade-up',
      }}
    >
      {state && !state.success && (
        <div className='mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-400'>
          {state.error}
        </div>
      )}
      <form
        className='flex flex-col gap-3.5'
        action={action}
      >
        <div>
          <label className='text-muted-text mb-1.25 block text-[11px]'>
            Email address
          </label>
          <div className='relative'>
            <span className='text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
              <IconMail size={18} />
            </span>
            <input
              placeholder='you@company.com'
              className='bg-surface border-border-subtle text-heading-soft placeholder:text-faint focus:border-brand w-full rounded-sm border py-2.5 pr-9 pl-9 text-[13px] transition-colors focus:outline-none'
              type='email'
              name='email'
            />
          </div>
        </div>
        <div>
          <div>
            <label className='text-muted-text mb-1.25 block text-[11px]'>
              Password
            </label>
            <div className='relative'>
              <span className='text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
                <IconLock size={18} />
              </span>
              <input
                placeholder='••••••••'
                className='bg-surface border-border-subtle text-heading-soft placeholder:text-faint focus:border-brand w-full rounded-sm border py-2.5 pr-9 pl-9 text-[13px] transition-colors focus:outline-none'
                type={showPassword ? 'text' : 'password'}
                name='password'
              />
              <span className='text-faint absolute top-1/2 right-2.5 -translate-y-1/2'>
                <button
                  type='button'
                  onClick={() => setShowPassword((p) => !p)}
                  className='text-faint hover:text-body'
                >
                  {showPassword ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </button>
              </span>
            </div>
          </div>
          <div className='mt-1.5 text-right'>
            <Link
              href={PAGES.auth.forgotPassword}
              className='text-brand text-[11px] no-underline'
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <Button
          type='submit'
          endIcon={<IconArrowRight size={18} />}
          disabled={isPending}
        >
          Sign in
        </Button>
      </form>

      <p className='text-faint mt-4 text-center text-[12px]'>
        Don&apos;t have an account?{' '}
        <Link
          href={PAGES.auth.register}
          className='text-brand'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default AuthLogin;
