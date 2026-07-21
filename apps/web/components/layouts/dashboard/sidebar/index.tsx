'use client';

import PAGES from '@repo/constants/pages';
import Button from '@repo/ui/button';
import cn from '@repo/utils/cn';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavItems } from '../utils';

const LayoutsDashboardSidebar = () => {
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <aside className='border-border bg-surface/70 hidden w-50 shrink-0 flex-col border-r md:flex'>
      <div className='border-border border-b px-4 py-4'>
        <Link
          href={PAGES.home}
          className='text-foreground focus-visible:ring-ring focus-visible:ring-offset-background text-[14px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          Critiq<span className='text-primary'>AI</span>
        </Link>
      </div>

      <nav
        aria-label='Dashboard'
        className='flex-1 px-2 py-2.5'
      >
        {dashboardNavItems.map(({ label, icon: Icon, href }) => {
          const active = pathname?.startsWith(href);

          return (
            <Button
              variant='default'
              component={Link}
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'focus-visible:ring-ring focus-visible:ring-offset-background mb-0.5 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[12px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground-muted hover:bg-surface hover:text-foreground',
              )}
              startIcon={<Icon size={16} />}
            >
              {label}
            </Button>
          );
        })}
      </nav>

      <div className='border-border flex items-center gap-2 border-t p-2.5'>
        <div className='border-border bg-surface-raised text-foreground flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-medium'>
          {data?.user?.name?.charAt(0) || 'A'}
          {data?.user?.name?.split(' ')[1]?.charAt(0) || 'A'}
        </div>

        <div className='min-w-0'>
          <div className='text-foreground truncate text-[12px] font-medium'>
            {data?.user?.name || 'Anonymous'}
          </div>
          <div className='text-foreground-subtle text-[10px]'>Free plan</div>
        </div>
      </div>
    </aside>
  );
};

export default LayoutsDashboardSidebar;
