import Badge from '@repo/ui/badge';
import Button from '@repo/ui/button';
import { IconFileDownload, IconShare2, IconWorld } from '@tabler/icons-react';

const DashboardAnalysesIDHeading = ({ url }: { url: string }) => {
  return (
    <div className='border-border bg-background sticky top-0 z-50 flex h-13 items-center justify-between border-b px-6'>
      <div className='border-border-subtle bg-surface hidden items-center gap-1.5 rounded-md border px-3 py-1.5 sm:flex'>
        <IconWorld
          size={16}
          className='text-foreground-subtle'
        />
        <span className='text-foreground-muted max-w-65 truncate font-mono text-sm'>
          {url}
        </span>
      </div>
      <div className='flex items-center gap-3'>
        <Badge variant='success'>Analysis complete</Badge>
        <Button
          variant='outlined-gray'
          padding='sm'
          className='hidden sm:inline-flex'
          startIcon={<IconShare2 size={16} />}
        >
          Share
        </Button>
        <Button
          variant='outlined-gray'
          padding='sm'
          className='hidden sm:inline-flex'
          startIcon={<IconFileDownload size={16} />}
        >
          Export PDF
        </Button>
      </div>
    </div>
  );
};

export default DashboardAnalysesIDHeading;
