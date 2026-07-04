import LayoutsDashboardHeader from '../../components/layouts/dashboard/header';
import LayoutsDashboardMobileNavbar from '../../components/layouts/dashboard/mobile-navbar';
import LayoutsDashboardSidebar from '../../components/layouts/dashboard/sidebar';

const Layout = ({ children }: LayoutProps<'/dashboard'>) => {
  return (
    <div className='bg-bg text-heading-soft flex h-screen w-full overflow-hidden'>
      <LayoutsDashboardSidebar />
      <main className='flex min-w-0 flex-1 flex-col pb-16 md:pb-0'>
        <div className='flex-1 overflow-y-auto'>
          <LayoutsDashboardHeader />
          {children}
        </div>
      </main>
      <LayoutsDashboardMobileNavbar />
    </div>
  );
};

export default Layout;
