import { Suspense } from 'react';
import LayoutsDashboardHeader from '../../components/layouts/dashboard/header';
import LayoutsDashboardMobileNavbar from '../../components/layouts/dashboard/mobile-navbar';
import LayoutsDashboardSidebar from '../../components/layouts/dashboard/sidebar';

const Layout = ({ children }: LayoutProps<'/dashboard'>) => {
  return (
    <div className='flex h-screen w-full overflow-hidden bg-background text-foreground-muted'>
      <Suspense fallback={null}>
        <LayoutsDashboardSidebar />
      </Suspense>
      <main id='main' className='flex min-w-0 flex-1 flex-col pb-16 md:pb-0'>
        <div className='flex-1 overflow-y-auto'>
          <Suspense fallback={null}>
            <LayoutsDashboardHeader />
          </Suspense>
          {children}
        </div>
      </main>
      <Suspense fallback={null}>
        <LayoutsDashboardMobileNavbar />
      </Suspense>
    </div>
  );
};

export default Layout;
