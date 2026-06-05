const HomeAnalytics = () => {
  return (
    <section className='border-b border-border-subtle py-6 px-6'>
      <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-4'>
        <div className='text-center'>
          <div className='text-[20px] font-medium text-heading'>12,400+</div>
          <div className='text-[12px] text-muted-text mt-0.5'>
            Sites analyzed
          </div>
        </div>
        <div className='text-center'>
          <div className='text-[20px] font-medium text-heading'>6 checks</div>
          <div className='text-[12px] text-muted-text mt-0.5'>Per report</div>
        </div>
        <div className='text-center'>
          <div className='text-[20px] font-medium text-heading'>~28s</div>
          <div className='text-[12px] text-muted-text mt-0.5'>
            Avg. analysis time
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAnalytics;
