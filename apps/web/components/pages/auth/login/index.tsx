'use client';

import PAGES from '@repo/constants/pages';
import Button from '@repo/ui/button';
import Input from '@repo/ui/input';
import Label from '@repo/ui/label';
import {
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
} from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AuthLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });

    setLoading(false);
    if (!result?.ok) {
      setError('Email or password is incorrect.');
      return;
    }

    router.push(PAGES.dashboard.overview);
  };

  return (
    <div
      id='auth-forms'
      className='animate-fade-up mt-6'
    >
      {error ? (
        <div
          role='alert'
          className='border-error/30 bg-error-surface text-error mb-4 rounded-md border px-4 py-3 text-sm'
        >
          {error}
        </div>
      ) : null}

      <form
        className='flex flex-col gap-4'
        onSubmit={onSubmit}
      >
        <div>
          <Label
            htmlFor='login-email'
            className='mb-1.5 block'
          >
            Email address
          </Label>
          <div className='relative'>
            <IconMail
              aria-hidden='true'
              size={18}
              className='text-foreground-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'
            />
            <Input
              id='login-email'
              name='email'
              type='email'
              autoComplete='email'
              required
              placeholder='you@company.com'
              className='rounded-md py-2.5 pr-9 pl-9 text-sm'
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor='login-password'
            className='mb-1.5 block'
          >
            Password
          </Label>
          <div className='relative'>
            <IconLock
              aria-hidden='true'
              size={18}
              className='text-foreground-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'
            />
            <Input
              id='login-password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              required
              placeholder='Enter your password'
              className='rounded-md py-2.5 pr-10 pl-9 text-sm'
            />
            <button
              type='button'
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className='text-foreground-subtle hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 focus-visible:ring-2 focus-visible:outline-none'
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
          <div className='mt-1.5 text-right'>
            <Link
              href={PAGES.auth.forgotPassword}
              className='text-primary text-xs no-underline'
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type='submit'
          endIcon={<IconArrowRight size={18} />}
          loading={loading}
        >
          Sign in
        </Button>
      </form>

      <p className='text-foreground-subtle mt-4 text-center text-xs'>
        Don&apos;t have an account?{' '}
        <Link
          href={PAGES.auth.register}
          className='text-primary'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default AuthLogin;
