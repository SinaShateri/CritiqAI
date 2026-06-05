import PAGES from '@repo/constants/pages';
import Link from 'next/link';
import AuthForms from './forms';
import AuthSidebar from './sidebar';
import AuthSocials from './socials';

const Auth = () => {
  return (
    <main
      className='min-h-screen w-full flex items-center justify-center bg-bg text-body px-4 py-10'
      style={{
        backgroundImage:
          'radial-gradient(ellipse 600px 400px at 30% 50%, rgba(124,109,240,0.04) 0%, transparent 70%)',
      }}
    >
      <div
        className='w-full max-w-225 flex bg-bg border border-border-subtle rounded-xl overflow-hidden animate-fade-up'
        style={{ animationDuration: '0.35s' }}
      >
        <div className='flex-1 px-6 py-10 md:px-12 md:py-14'>
          <Link
            href={PAGES.home}
            className='text-[15px] font-medium text-heading'
          >
            Critiq<span className='text-brand'>AI</span>
          </Link>
          <AuthForms />
          <AuthSocials />
        </div>
        <AuthSidebar />
      </div>
    </main>
  );
};

export default Auth;
