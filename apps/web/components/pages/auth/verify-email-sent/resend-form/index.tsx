'use client';

import { resendVerificationEmailAction } from '@/lib/actions/auth.actions';
import Button from '@repo/ui/button';
import { cookiesClient } from '@repo/utils/cookie-client';
import { useActionState } from 'react';

const AuthVerifyEmailSentResendForm = () => {
  const [state, action, isPending] = useActionState(
    resendVerificationEmailAction,
    null,
  );

  return (
    <div className='flex flex-col items-center gap-1.5'>
      {state?.success && (
        <div
          role='status'
          className='border-success/30 bg-success-surface text-success mb-4 rounded-md border px-4 py-3 text-sm'
        >
          {state.message}
        </div>
      )}
      {state && !state.success && (
        <div
          role='alert'
          className='border-error/30 bg-error-surface text-error mb-4 rounded-md border px-4 py-3 text-sm'
        >
          {state.error}
        </div>
      )}
      <div className='flex items-center gap-1.5'>
        <span className='text-foreground-muted text-sm'>
          Didn&apos;t receive it?
        </span>

        <form action={action}>
          <input
            type='hidden'
            name='email'
            value={cookiesClient.get('registerEmail') || ''}
          />
          <Button
            variant='text'
            className='text-sm'
            loading={isPending}
            disabled={isPending}
          >
            Resend email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthVerifyEmailSentResendForm;
