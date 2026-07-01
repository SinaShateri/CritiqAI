import LayoutsDashboardSidebar from '../../components/layouts/dashboard/sidebar';

const Layout = ({ children }: LayoutProps<'/dashboard'>) => {
  return (
    <div className='bg-bg text-heading-soft flex h-screen w-full overflow-hidden'>
      <LayoutsDashboardSidebar />
      {children}

      {/* <nav className='border-border-subtle bg-bg fixed inset-x-0 bottom-0 z-10 flex h-14 items-center justify-around border-t md:hidden'>
        {dashboardNavItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            aria-label={label}
            className={cn('p-2', active ? 'text-brand' : 'text-muted-text')}
          >
            <Icon size={18} />
          </button>
        ))}
      </nav> */}
    </div>
  );
};

export default Layout;
