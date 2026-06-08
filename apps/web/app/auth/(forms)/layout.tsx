import AuthFormHeading from '../../../components/pages/auth/form/heading';
import AuthSidebar from '../../../components/pages/auth/sidebar';
import AuthSocials from '../../../components/pages/auth/socials';

const Layout = async ({ children }: LayoutProps<'/auth'>) => {
  return (
    <main
      className='bg-bg text-body flex min-h-screen w-full items-center justify-center px-4 py-10'
      style={{
        backgroundImage:
          'radial-gradient(ellipse 600px 400px at 30% 50%, rgba(124,109,240,0.04) 0%, transparent 70%)',
      }}
    >
      <div
        className='bg-bg border-border-subtle animate-fade-up flex w-full max-w-225 overflow-hidden rounded-xl border'
        style={{ animationDuration: '0.35s' }}
      >
        <div className='flex-1 px-6 py-10 md:px-12 md:py-14'>
          <AuthFormHeading />
          {children}
          <AuthSocials />
        </div>
        <AuthSidebar />
      </div>
    </main>
  );
};

export default Layout;
