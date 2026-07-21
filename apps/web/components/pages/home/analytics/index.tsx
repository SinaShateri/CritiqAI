const HomeAnalytics = () => {
  return (
    <section className='border-b border-border-subtle py-6 px-6'>
      <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-4'>
        <div className='text-center'>
          <div className='font-mono text-xl font-medium text-foreground'>12,400+</div>
          <div className='mt-0.5 text-xs text-foreground-subtle'>
            Sites analyzed
          </div>
        </div>
        <div className='text-center'>
          <div className='font-mono text-xl font-medium text-foreground'>6 checks</div>
          <div className='mt-0.5 text-xs text-foreground-subtle'>Per report</div>
        </div>
        <div className='text-center'>
          <div className='font-mono text-xl font-medium text-foreground'>~28s</div>
          <div className='mt-0.5 text-xs text-foreground-subtle'>
            Avg. analysis time
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAnalytics;
