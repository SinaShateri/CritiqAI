'use client';

import { loginAction } from '@/lib/actions/auth.actions';
import PAGES from '@repo/constants/pages';
import { IconEye, IconEyeOff, IconLock, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';

const AuthSignin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, isPending] = useActionState(loginAction, null);

  console.log(state);

  return (
    <div
      id='auth-forms'
      className='mt-6 transition-opacity duration-200'
      style={{
        animation: '0.2s ease-out 0s 1 normal both running fade-up',
      }}
    >
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
            <a
              href='/forgot-password'
              className='text-brand text-[11px] no-underline'
            >
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type='submit'
          className='bg-brand hover:bg-brand-hover mt-2 w-full rounded-md py-3 text-[14px] font-medium text-white transition-colors active:scale-[0.98]'
        >
          Sign in →
        </button>
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

export default AuthSignin;
