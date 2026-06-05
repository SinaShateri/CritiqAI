const HomeCTA = () => {
  return (
    <section className='py-18 px-6 text-center'>
      <h2 className='text-[32px] font-medium text-heading'>
        Ready to fix your website?
      </h2>
      <p className='mt-2 text-[15px] text-muted-text'>
        Start with a free analysis. No credit card needed.
      </p>
      <div className='mt-7 flex items-center justify-center gap-3 flex-wrap'>
        <button className='bg-brand hover:bg-brand-hover transition-colors text-white text-[14px] font-medium px-7 py-2.5 rounded-md'>
          Get started free
        </button>
        <button className='bg-transparent border border-brand text-brand hover:bg-brand/10 transition-colors text-[14px] font-medium px-7 py-2.5 rounded-md'>
          View sample report
        </button>
      </div>
    </section>
  );
};

export default HomeCTA;
