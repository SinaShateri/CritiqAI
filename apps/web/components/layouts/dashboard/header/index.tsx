'use client';

import Button from '@repo/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { dashboardNavItems } from '../utils';

const LayoutsDashboardHeader = () => {
  const pathname = usePathname();

  const pageTitle = dashboardNavItems.find(({ href }) => {
    return pathname?.startsWith(href);
  })?.label;

  return (
    <header className='flex h-12 items-center justify-between border-b border-border px-6'>
      <h1 className='text-sm font-medium text-foreground'>{pageTitle}</h1>
      <Button
        startIcon={<IconPlus size={16} />}
        className='sm:text-xs'
      >
        New analysis
      </Button>
    </header>
  );
};

export default LayoutsDashboardHeader;
