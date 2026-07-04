import Button from '@repo/ui/button';
import { IconPlus } from '@tabler/icons-react';

const LayoutsDashboardHeader = () => {
  return (
    <header className='border-border-subtle flex h-12 items-center justify-between border-b px-6'>
      <h1 className='text-heading text-sm font-medium'>Dashboard</h1>
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
