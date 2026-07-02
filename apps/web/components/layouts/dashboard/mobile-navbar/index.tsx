'use client';

import Button from '@repo/ui/button';
import cn from '@repo/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavItems } from '../utils';

const LayoutsDashboardMobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className='border-border-subtle bg-bg fixed inset-x-0 bottom-0 z-10 flex h-14 items-center justify-around border-t md:hidden'>
      {dashboardNavItems.map(({ label, icon: Icon, href }) => {
        const active = pathname?.startsWith(href);

        return (
          <Button
            variant='default'
            component={Link}
            key={label}
            href={href}
            aria-label={label}
            className={cn('p-2', active ? 'text-brand' : 'text-muted-text')}
          >
            <Icon size={16} />
          </Button>
        );
      })}
    </nav>
  );
};

export default LayoutsDashboardMobileNavbar;
