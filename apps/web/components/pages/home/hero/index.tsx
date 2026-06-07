import { IconWorld } from '@tabler/icons-react';

const HomeHero = () => {
  return (
    <section className='border-border-subtle border-b px-6 pt-20 pb-16 text-center'>
      <div className='mx-auto max-w-3xl'>
        <div className='animate-fade-up inline-flex items-center gap-2 rounded-[20px] border border-[#2a2d38] bg-[#1a1c24] px-3.5 py-1'>
          <span className='bg-brand h-1.5 w-1.5 rounded-full'></span>
          <span className='text-brand text-[12px]'>
            AI-Powered Website Analysis
          </span>
        </div>
        <h1
          className='text-heading animate-fade-up mt-6 text-[48px] leading-tight font-medium'
          style={{ animationDelay: '0.1s' }}
        >
          Your website has
          <br />
          <span className='text-brand'>hidden problems</span>.
          <br />
          We find them in seconds.
        </h1>
        <p
          className='text-body animate-fade-up mt-4 text-[16px]'
          style={{ animationDelay: '0.15s' }}
        >
          Paste any URL. Get a full live report on performance, SEO,
          accessibility &amp; AI redesign suggestions.
        </p>
        <form
          className='bg-surface border-border-strong animate-fade-up mx-auto mt-8 flex max-w-130 rounded-lg border'
          style={{ animationDelay: '0.2s' }}
        >
          <div className='border-border-subtle flex items-center border-r px-3.5'>
            <IconWorld className='lucide lucide-globe text-faint' />
          </div>
          <input
            type='url'
            placeholder='https://yourwebsite.com'
            className='placeholder:text-muted-text flex-1 border-none bg-transparent px-3.5 py-3 text-[14px] text-[#8c8fa0] outline-none'
          />
          <button
            type='submit'
            className='bg-brand hover:bg-brand-hover rounded-r-md px-5 text-[13px] font-medium text-white transition-colors'
          >
            Analyze →
          </button>
        </form>
        <p className='text-faint mt-4 text-[12px]'>
          No signup required · Results in ~30 seconds
        </p>
      </div>
    </section>
  );
};

export default HomeHero;
