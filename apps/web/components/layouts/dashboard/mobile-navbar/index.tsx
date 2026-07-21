'use client';

import cn from '@repo/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavItems } from '../utils';

const LayoutsDashboardMobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav aria-label='Mobile dashboard' className='fixed inset-x-0 bottom-0 z-10 flex h-16 items-center justify-around border-t border-border bg-background/95 px-2 backdrop-blur md:hidden'>
      {dashboardNavItems.map(({ label, icon: Icon, href }) => {
        const active = pathname?.startsWith(href);

        return (
          <Link
            key={label}
            href={href}
            aria-current={active ? 'page' : undefined}
            aria-label={label}
            className={cn(
              'flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              active ? 'text-primary' : 'text-foreground-muted hover:text-foreground',
            )}
          >
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default LayoutsDashboardMobileNavbar;
