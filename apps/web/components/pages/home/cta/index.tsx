import Button from '@repo/ui/Button';

const HomeCTA = () => {
  return (
    <section className='px-6 py-18 text-center'>
      <h2 className='text-foreground text-[32px] font-medium'>
        Ready to fix your website?
      </h2>
      <p className='text-foreground-muted mt-2 text-[15px]'>
        Start with a free analysis. No credit card needed.
      </p>
      <div className='mt-7 flex flex-wrap items-center justify-center gap-3'>
        <Button>Get started free</Button>
        <Button variant='outlined-primary'>View sample report</Button>
      </div>
    </section>
  );
};

export default HomeCTA;
