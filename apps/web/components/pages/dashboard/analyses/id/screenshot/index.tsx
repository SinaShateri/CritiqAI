const DashboardAnalysesIDScreenshot = ({
  url,
  siteTitle,
  siteTagline,
}: {
  url: string;
  siteTitle: string;
  siteTagline: string;
}) => {
  return (
    <section className='border-border-subtle border-b p-5'>
      <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
        SCREENSHOT
      </div>
      <div className='border-border-subtle bg-surface overflow-hidden rounded-lg border'>
        <div className='border-border-subtle flex h-7 items-center gap-2 border-b px-3'>
          <span className='bg-error h-1.25 w-1.25 rounded-full' />
          <span className='bg-warn h-1.25 w-1.25 rounded-full' />
          <span className='bg-success h-1.25 w-1.25 rounded-full' />
          <span className='text-faint ml-2 truncate text-[11px]'>{url}</span>
        </div>
        <div className='animate-fade-up via-surface to-bg flex h-55 items-center justify-center bg-linear-to-br from-[#1a1c2e]'>
          <div className='px-6 text-center'>
            <div className='text-brand mb-2 text-2xl font-medium'>
              {siteTitle}
            </div>
            <div className='text-body text-sm'>{siteTagline}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAnalysesIDScreenshot;
