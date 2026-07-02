import {
  IconCheck,
  IconFileDownload,
  IconShare2,
  IconWorld,
} from '@tabler/icons-react';

const Page = () => {
  return (
    <div className='bg-bg flex min-h-screen w-full flex-col'>
      <header className='border-border-subtle bg-bg sticky top-0 z-50 flex h-13 items-center justify-between border-b px-6'>
        <div className='border-border-subtle bg-surface hidden items-center gap-1.5 rounded-md border px-3 py-1.5 sm:flex'>
          <IconWorld
            size={16}
            className='text-faint'
          />
          <span className='text-body max-w-65 truncate text-[13px]'>
            https://stripe.com
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1.5 rounded-xl bg-[#1a1c2e] px-3 py-1'>
            <span className='bg-success h-1.5 w-1.5 rounded-full'></span>
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
      </header>
      <div className='border-border-subtle flex h-14 flex-col justify-center border-b bg-[#0a0c10] px-6'>
        <div className='flex items-center'>
          <div className='flex flex-1 items-center last:flex-none'>
            <div className='flex flex-col items-center gap-1'>
              <div className='bg-brand flex h-5 w-5 items-center justify-center rounded-full'>
                <IconCheck
                  size={16}
                  className='text-white'
                />
              </div>
              <span className='text-muted-text text-[11px]'>Scraping</span>
            </div>
            <div className='bg-brand mx-2 h-px flex-1'></div>
          </div>
          <div className='flex flex-1 items-center last:flex-none'>
            <div className='flex flex-col items-center gap-1'>
              <div className='bg-brand flex h-5 w-5 items-center justify-center rounded-full'>
                <IconCheck
                  size={16}
                  className='text-white'
                />
              </div>
              <span className='text-muted-text text-[11px]'>Lighthouse</span>
            </div>
            <div className='bg-brand mx-2 h-px flex-1'></div>
          </div>
          <div className='flex flex-1 items-center last:flex-none'>
            <div className='flex flex-col items-center gap-1'>
              <div className='bg-brand flex h-5 w-5 items-center justify-center rounded-full'>
                <IconCheck
                  size={16}
                  className='text-white'
                />
              </div>
              <span className='text-muted-text text-[11px]'>AI Analysis</span>
            </div>
            <div className='bg-brand mx-2 h-px flex-1'></div>
          </div>
          <div className='flex flex-1 items-center last:flex-none'>
            <div className='flex flex-col items-center gap-1'>
              <div className='bg-brand flex h-5 w-5 items-center justify-center rounded-full'>
                <IconCheck
                  size={16}
                  className='text-white'
                />
              </div>
              <span className='text-muted-text text-[11px]'>SEO</span>
            </div>
            <div className='bg-brand mx-2 h-px flex-1'></div>
          </div>
          <div className='flex flex-1 items-center last:flex-none'>
            <div className='flex flex-col items-center gap-1'>
              <div className='border-brand flex h-5 w-5 items-center justify-center rounded-full border-2'>
                <span className='text-brand text-[10px] font-medium'>5</span>
              </div>
              <span className='text-brand text-[11px]'>Report</span>
            </div>
          </div>
        </div>
        <div className='bg-border-subtle mt-1.5 h-0.75 overflow-hidden rounded-sm'>
          <div
            className='bg-brand h-full rounded-sm transition-[width] duration-400 ease-out'
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
