const HomeAnalytics = () => {
  return (
    <section className='border-border-subtle border-b px-6 py-6'>
      <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-4'>
        <div className='text-center'>
          <div className='text-foreground font-mono text-xl font-medium'>
            12,400+
          </div>
          <div className='text-foreground-subtle mt-0.5 text-xs'>
            Sites analyzed
          </div>
        </div>
        <div className='text-center'>
          <div className='text-foreground font-mono text-xl font-medium'>
            6 checks
          </div>
          <div className='text-foreground-subtle mt-0.5 text-xs'>
            Per report
          </div>
        </div>
        <div className='text-center'>
          <div className='text-foreground font-mono text-xl font-medium'>
            ~28s
          </div>
          <div className='text-foreground-subtle mt-0.5 text-xs'>
            Avg. analysis time
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAnalytics;
