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
      <h2 className='text-foreground-subtle mb-3 text-xs font-semibold tracking-[1.5px]'>
        SCREENSHOT
      </h2>
      <div className='border-border-subtle bg-surface overflow-hidden rounded-lg border'>
        <div className='border-border-subtle flex h-7 items-center gap-2 border-b px-3'>
          <span className='bg-error h-1.25 w-1.25 rounded-full' />
          <span className='bg-warn h-1.25 w-1.25 rounded-full' />
          <span className='bg-success h-1.25 w-1.25 rounded-full' />
          <span className='text-foreground-subtle ml-2 truncate font-mono text-xs'>
            {url}
          </span>
        </div>
        <div className='animate-fade-up from-surface-raised via-surface to-background flex h-55 items-center justify-center bg-linear-to-br'>
          <div className='px-6 text-center'>
            <div className='text-brand mb-2 text-2xl font-medium'>
              {siteTitle}
            </div>
            <div className='text-foreground-muted text-sm'>{siteTagline}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAnalysesIDScreenshot;
