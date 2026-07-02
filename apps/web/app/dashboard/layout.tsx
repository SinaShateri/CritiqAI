import LayoutsDashboardMobileNavbar from '../../components/layouts/dashboard/mobile-navbar';
import LayoutsDashboardSidebar from '../../components/layouts/dashboard/sidebar';

const Layout = ({ children }: LayoutProps<'/dashboard'>) => {
  return (
    <div className='bg-bg text-heading-soft flex h-screen w-full overflow-hidden'>
      <LayoutsDashboardSidebar />
      {children}
      <LayoutsDashboardMobileNavbar />
    </div>
  );
};

export default Layout;
