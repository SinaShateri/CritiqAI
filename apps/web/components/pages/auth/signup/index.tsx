'use client';

import { registerAction } from '@/lib/actions/auth.actions';
import PAGES from '@repo/constants/pages';
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

const AuthSignup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [state, action, isPending] = useActionState(registerAction, null);

  // بعد از ثبت‌نام موفق، redirect به صفحه تایید ایمیل
  useEffect(() => {
    if (state?.success) {
      router.push(PAGES.auth.verifyEmailSent);
    }
  }, [state, router]);

  return (
    <div
      id='auth-forms'
      className='mt-6 transition-opacity duration-200'
      style={{ animation: '0.2s ease-out 0s 1 normal both running fade-up' }}
    >
      {/* نمایش خطای کلی */}
      {state && !state.success && (
        <div className='mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-400'>
          {state.error}
        </div>
      )}

      <form
        className='flex flex-col gap-3.5'
        action={action}
      >
        {/* Full name */}
        <div>
          <label className='text-muted-text mb-1.25 block text-[11px]'>
            Full name
          </label>
          <div className='relative'>
            <span className='text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
              <IconUser size={18} />
            </span>
            <input
              name='name'
              placeholder='Jane Doe'
              disabled={isPending}
              className='border-border-subtle bg-surface text-heading-soft placeholder:text-faint focus:border-brand w-full rounded-sm border py-2.5 pr-9 pl-9 text-[13px] transition-colors focus:outline-none disabled:opacity-50'
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className='text-muted-text mb-1.25 block text-[11px]'>
            Email address
          </label>
          <div className='relative'>
            <span className='text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
              <IconMail size={18} />
            </span>
            <input
              name='email'
              type='email'
              placeholder='you@company.com'
              disabled={isPending}
              className='border-border-subtle bg-surface text-heading-soft placeholder:text-faint focus:border-brand w-full rounded-sm border py-2.5 pr-9 pl-9 text-[13px] transition-colors focus:outline-none disabled:opacity-50'
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className='text-muted-text mb-1.25 block text-[11px]'>
            Password
          </label>
          <div className='relative'>
            <span className='text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
              <IconLock size={18} />
            </span>
            <input
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='At least 8 characters'
              disabled={isPending}
              className='border-border-subtle bg-surface text-heading-soft placeholder:text-faint focus:border-brand w-full rounded-sm border py-2.5 pr-9 pl-9 text-[13px] transition-colors focus:outline-none disabled:opacity-50'
            />
            <button
              type='button'
              onClick={() => setShowPassword((p) => !p)}
              className='text-faint hover:text-body absolute top-1/2 right-2.5 -translate-y-1/2'
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label className='text-muted-text mb-1.25 block text-[11px]'>
            Confirm password
          </label>
          <div className='relative'>
            <span className='text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
              <IconLock size={18} />
            </span>
            <input
              name='confirm'
              type={showConfirm ? 'text' : 'password'}
              placeholder='Repeat password'
              disabled={isPending}
              className='border-border-subtle bg-surface text-heading-soft placeholder:text-faint focus:border-brand w-full rounded-sm border py-2.5 pr-9 pl-9 text-[13px] transition-colors focus:outline-none disabled:opacity-50'
            />
            <button
              type='button'
              onClick={() => setShowConfirm((p) => !p)}
              className='text-faint hover:text-body absolute top-1/2 right-2.5 -translate-y-1/2'
            >
              {showConfirm ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <label className='text-muted-text flex items-start gap-2 text-[12px]'>
          <input
            className='accent-brand mt-0.5'
            type='checkbox'
            name='terms'
          />
          <span>
            I agree to the <a className='text-brand'>Terms of Service</a> and{' '}
            <a className='text-brand'>Privacy Policy</a>
          </span>
        </label>

        {/* Submit */}
        <button
          type='submit'
          disabled={isPending}
          className='bg-brand hover:bg-brand-hover mt-2 w-full rounded-md py-3 text-[14px] font-medium text-white transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isPending ? 'Creating account...' : 'Create account →'}
        </button>
      </form>

      <p className='text-faint mt-4 text-center text-[12px]'>
        Already have an account?{' '}
        <Link
          href={PAGES.auth.login}
          className='text-brand'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default AuthSignup;
