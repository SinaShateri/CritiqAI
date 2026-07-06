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
    <header className='border-border-subtle flex h-12 items-center justify-between border-b px-6'>
      <h1 className='text-heading text-sm font-medium'>{pageTitle}</h1>
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
