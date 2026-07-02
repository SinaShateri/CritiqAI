'use client';

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
    <aside className='border-border-subtle hidden w-50 shrink-0 flex-col border-r md:flex'>
      <div className='border-border-subtle border-b px-4 py-4'>
        <span className='text-heading text-[14px] font-medium'>
          Critiq<span className='text-brand'>AI</span>
        </span>
      </div>

      <nav className='flex-1 px-2 py-2.5'>
        {dashboardNavItems.map(({ label, icon: Icon, href }) => {
          const active = pathname?.startsWith(href);

          return (
            <Button
              variant='default'
              component={Link}
              key={label}
              href={href}
              className={cn(
                'mb-0.5 flex w-full items-center gap-2 rounded-md px-2.5 py-1.75 text-[12px] transition-colors',
                active
                  ? 'text-brand bg-[#1a1c2e]'
                  : 'text-muted-text hover:bg-surface',
              )}
              startIcon={<Icon size={16} />}
            >
              {label}
            </Button>
          );
        })}
      </nav>

      <div className='border-border-subtle flex items-center gap-2 border-t p-2.5'>
        <div className='text-brand flex h-7 w-7 items-center justify-center rounded-full border border-[#2e3148] bg-[#1a1c2e] text-[11px]'>
          {data?.user?.name?.charAt(0) || 'A'}
          {data?.user?.name?.split(' ')[1]?.charAt(0) || 'A'}
        </div>

        <div className='min-w-0'>
          <div className='text-heading-soft truncate text-[12px] font-medium'>
            {data?.user?.name || 'Anonymous'}
          </div>
          <div className='text-faint text-[10px]'>Free plan</div>
        </div>
      </div>
    </aside>
  );
};

export default LayoutsDashboardSidebar;
