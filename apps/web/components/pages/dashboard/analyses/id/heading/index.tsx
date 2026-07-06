import { IconFileDownload, IconShare2, IconWorld } from '@tabler/icons-react';

const DashboardAnalysesIDHeading = ({ url }: { url: string }) => {
  return (
    <div className='border-border-subtle bg-bg sticky top-0 z-50 flex h-13 items-center justify-between border-b px-6'>
      <div className='border-border-subtle bg-surface hidden items-center gap-1.5 rounded-md border px-3 py-1.5 sm:flex'>
        <IconWorld
          size={16}
          className='text-faint'
        />
        <span className='text-body max-w-65 truncate text-[13px]'>{url}</span>
      </div>
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-1.5 rounded-xl bg-[#1a1c2e] px-3 py-1'>
          <span className='bg-success h-1.5 w-1.5 rounded-full' />
          <span className='text-success text-[12px]'>Analysis complete</span>
        </div>
        <button className='border-border-subtle text-muted-text hover:border-border-strong hover:text-heading-soft hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] transition-colors sm:inline-flex'>
          <IconShare2 size={16} />
          Share
        </button>
        <button className='border-border-subtle text-muted-text hover:border-border-strong hover:text-heading-soft hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] transition-colors sm:inline-flex'>
          <IconFileDownload size={16} />
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default DashboardAnalysesIDHeading;
