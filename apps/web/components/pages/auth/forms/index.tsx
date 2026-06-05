import { IconEye, IconLock, IconMail } from '@tabler/icons-react';

const AuthForms = () => {
  return (
    <>
      <div className='mt-8 flex border border-border-subtle rounded-md overflow-hidden'>
        <button className='flex-1 text-center py-2.25 text-[13px] transition-colors bg-brand text-white font-medium'>
          Sign in
        </button>
        <button className='flex-1 text-center py-2.25 text-[13px] transition-colors bg-surface text-muted-text'>
          Create account
        </button>
      </div>
      <div
        className='mt-6 transition-opacity duration-200'
        style={{
          animation: '0.2s ease-out 0s 1 normal both running fade-up',
        }}
      >
        <form className='flex flex-col gap-3.5'>
          <div>
            <label className='block text-[11px] text-muted-text mb-1.25'>
              Email address
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none'>
                <IconMail size={18} />
              </span>
              <input
                placeholder='you@company.com'
                className='w-full bg-surface border border-border-subtle rounded-sm py-2.5 pl-9 pr-9 text-[13px] text-heading-soft placeholder:text-faint focus:border-brand focus:outline-none transition-colors'
                type='email'
                name='email'
              />
            </div>
          </div>
          <div>
            <div>
              <label className='block text-[11px] text-muted-text mb-1.25'>
                Password
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none'>
                  <IconLock size={18} />
                </span>
                <input
                  placeholder='••••••••'
                  className='w-full bg-surface border border-border-subtle rounded-sm py-2.5 pl-9 pr-9 text-[13px] text-heading-soft placeholder:text-faint focus:border-brand focus:outline-none transition-colors'
                  type='password'
                  name='password'
                />
                <span className='absolute right-2.5 top-1/2 -translate-y-1/2 text-faint'>
                  <button
                    type='button'
                    className='text-faint hover:text-body'
                  >
                    <IconEye size={18} />
                  </button>
                </span>
              </div>
            </div>
            <div className='text-right mt-1.5'>
              <a
                href='/forgot-password'
                className='text-[11px] text-brand no-underline'
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type='submit'
            className='w-full mt-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-[14px] font-medium py-3 rounded-md transition-colors'
          >
            Sign in →
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthForms;
