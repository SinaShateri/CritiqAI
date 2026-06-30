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
        <div className='mb-4 rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-[13px] text-green-400'>
          {state.message}
        </div>
      )}
      {state && !state.success && (
        <div className='mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-400'>
          {state.error}
        </div>
      )}
      <div className='flex items-center gap-1.5'>
        <span className='text-faint text-[13px]'>Didn&apos;t receive it?</span>

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
