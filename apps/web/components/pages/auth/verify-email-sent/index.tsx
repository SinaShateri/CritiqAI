import PAGES from '@repo/constants/pages';
import { IconArrowLeft, IconCheck, IconMail } from '@tabler/icons-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthVerifyEmailSentResendForm from './resend-form';

const VerifyEmailSent = async () => {
  const registeredEmail = (await cookies()).get('registerEmail')?.value;

  if (!registeredEmail) {
    redirect(PAGES.auth.login, 'replace');
  }

  return (
    <div className='bg-bg flex min-h-screen w-full flex-col items-center justify-center px-6 py-10'>
      <div className='flex w-full max-w-95 flex-col items-center'>
        {/* ICON */}
        <div
          className='relative'
          style={{ animation: 'verify-pop 0.4s ease-out both' }}
        >
          <div className='flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-[#2e3148] bg-[#1a1c2e]'>
            <IconMail
              size={32}
              className='text-brand'
            />
          </div>

          <div className='border-bg bg-success absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2'>
            <IconCheck
              size={24}
              className='text-white'
            />
          </div>
        </div>

        {/* TITLE */}
        <div
          className='mt-6 flex flex-col items-center gap-2 text-center'
          style={{ animation: 'fade-up 0.4s ease-out 0.1s both' }}
        >
          <h1 className='text-heading text-[22px] leading-tight font-medium'>
            Check your inbox
          </h1>

          <p className='text-body text-[14px] leading-[1.7]'>
            We sent a verification link to
          </p>

          <div className='border-border-subtle bg-surface mt-1 inline-flex items-center gap-1.5 rounded-md border px-3.5 py-1.5'>
            <IconMail
              size={16}
              className='text-brand'
            />
            <span className='text-heading-soft text-[13px] font-medium'>
              {registeredEmail}
            </span>
          </div>
        </div>

        {/* STEPS */}
        <div
          className='border-border-subtle bg-surface mt-7 w-full rounded-lg border px-5 py-4.5'
          style={{ animation: 'fade-up 0.4s ease-out 0.2s both' }}
        >
          <div className='text-muted-text mb-3.5 text-[10px] tracking-[1.5px]'>
            NEXT STEPS
          </div>

          {[
            'Open your email inbox',
            'Click the "Verify email" button in the message',
            "You'll be redirected to sign in automatically",
          ].map((text, i) => (
            <div
              key={i}
              className='mb-3 flex items-center gap-3 last:mb-0'
            >
              <div className='text-brand flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border border-[#2e3148] bg-[#1a1c2e] text-[11px]'>
                {i + 1}
              </div>
              <span className='text-body text-[13px]'>{text}</span>
            </div>
          ))}
        </div>

        <div className='bg-border-subtle my-6 h-px w-full' />

        {/* ACTIONS */}
        <div className='flex flex-col items-center gap-2'>
          <AuthVerifyEmailSentResendForm />
          <Link
            href={PAGES.auth.login}
            className='text-faint hover:text-body flex items-center gap-1.5 text-[12px] transition-colors'
          >
            <IconArrowLeft size={13} />
            Back to sign in
          </Link>
        </div>

        <p className='mt-4 text-center text-[11px] text-[#2e3148]'>
          Can&apos;t find it? Check your spam or junk folder.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailSent;
