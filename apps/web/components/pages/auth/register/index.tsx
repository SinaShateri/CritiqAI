'use client';

import { registerAction } from '@/lib/actions/auth.actions';
import PAGES from '@repo/constants/pages';
import Button from '@repo/ui/button';
import Input from '@repo/ui/input';
import Label from '@repo/ui/label';
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

const AuthRegister = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, action, isPending] = useActionState(registerAction, null);

  useEffect(() => {
    if (state?.success) router.push(PAGES.auth.verifyEmailSent);
  }, [state, router]);

  const hasError = Boolean(state && !state.success);
  return (
    <div
      id='auth-forms'
      className='animate-fade-up mt-6'
    >
      {state && !state.success ? (
        <div
          role='alert'
          className='border-error/30 bg-error-surface text-error mb-4 rounded-md border px-4 py-3 text-sm'
        >
          {state.error}
        </div>
      ) : null}
      <form
        className='flex flex-col gap-4'
        action={action}
      >
        <FormField
          id='register-name'
          label='Full name'
          name='name'
          placeholder='Jane Doe'
          icon={<IconUser size={18} />}
          autoComplete='name'
          disabled={isPending}
          invalid={hasError}
        />
        <FormField
          id='register-email'
          label='Email address'
          name='email'
          type='email'
          placeholder='you@company.com'
          icon={<IconMail size={18} />}
          autoComplete='email'
          disabled={isPending}
          invalid={hasError}
        />
        <PasswordField
          id='register-password'
          label='Password'
          name='password'
          placeholder='At least 8 characters'
          shown={showPassword}
          onToggle={() => setShowPassword((current) => !current)}
          disabled={isPending}
          invalid={hasError}
        />
        <PasswordField
          id='register-confirm'
          label='Confirm password'
          name='confirm'
          placeholder='Repeat password'
          shown={showConfirm}
          onToggle={() => setShowConfirm((current) => !current)}
          disabled={isPending}
          invalid={hasError}
        />

        <label className='text-foreground-muted flex items-start gap-2 text-xs'>
          <input
            className='accent-primary mt-0.5 h-4 w-4'
            type='checkbox'
            name='terms'
            required
          />
          <span>I agree to the Terms of Service and Privacy Policy.</span>
        </label>
        <Button
          type='submit'
          loading={isPending}
          disabled={isPending}
          className='mt-2'
        >
          Create account
        </Button>
      </form>
      <p className='text-foreground-subtle mt-4 text-center text-xs'>
        Already have an account?{' '}
        <Link
          href={PAGES.auth.login}
          className='text-primary'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  autoComplete: string;
  disabled: boolean;
  invalid: boolean;
};
const FormField = ({ id, label, icon, invalid, ...props }: FormFieldProps) => (
  <div>
    <Label
      htmlFor={id}
      className='mb-1.5 block'
    >
      {label}
    </Label>
    <div className='relative'>
      <span
        aria-hidden='true'
        className='text-foreground-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'
      >
        {icon}
      </span>
      <Input
        id={id}
        required
        aria-invalid={invalid}
        className='rounded-md py-2.5 pr-9 pl-9 text-sm'
        invalid={invalid}
        {...props}
      />
    </div>
  </div>
);

type PasswordFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  shown: boolean;
  onToggle: () => void;
  disabled: boolean;
  invalid: boolean;
};
const PasswordField = ({
  id,
  label,
  name,
  placeholder,
  shown,
  onToggle,
  disabled,
  invalid,
}: PasswordFieldProps) => (
  <div>
    <Label
      htmlFor={id}
      className='mb-1.5 block'
    >
      {label}
    </Label>
    <div className='relative'>
      <IconLock
        aria-hidden='true'
        size={18}
        className='text-foreground-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'
      />
      <Input
        id={id}
        name={name}
        type={shown ? 'text' : 'password'}
        autoComplete='new-password'
        required
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
        invalid={invalid}
        className='rounded-md py-2.5 pr-10 pl-9 text-sm'
      />
      <button
        type='button'
        onClick={onToggle}
        aria-label={
          shown ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`
        }
        aria-pressed={shown}
        className='text-foreground-subtle hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 focus-visible:ring-2 focus-visible:outline-none'
      >
        {shown ? <IconEyeOff size={18} /> : <IconEye size={18} />}
      </button>
    </div>
  </div>
);

export default AuthRegister;
