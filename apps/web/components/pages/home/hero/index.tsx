import { IconWorld } from '@tabler/icons-react';

const HomeHero = () => {
  return (
    <section className='border-b border-border-subtle px-6 pt-20 pb-16 text-center'>
      <div className='max-w-3xl mx-auto'>
        <div className='inline-flex items-center gap-2 bg-[#1a1c24] border border-[#2a2d38] rounded-[20px] px-3.5 py-1 animate-fade-up'>
          <span className='w-1.5 h-1.5 rounded-full bg-brand'></span>
          <span className='text-[12px] text-brand'>
            AI-Powered Website Analysis
          </span>
        </div>
        <h1
          className='mt-6 text-[48px] leading-tight font-medium text-heading animate-fade-up'
          style={{ animationDelay: '0.1s' }}
        >
          Your website has <span className='text-brand'>hidden problems</span>.
          <br />
          We find them in seconds.
        </h1>
        <p
          className='mt-4 text-[16px] text-body animate-fade-up'
          style={{ animationDelay: '0.15s' }}
        >
          Paste any URL. Get a full live report on performance, SEO,
          accessibility &amp; AI redesign suggestions.
        </p>
        <form
          className='mt-8 max-w-130 mx-auto flex bg-surface border border-border-strong rounded-lg animate-fade-up'
          style={{ animationDelay: '0.2s' }}
        >
          <div className='flex items-center px-3.5 border-r border-border-subtle'>
            <IconWorld className='lucide lucide-globe text-faint' />
          </div>
          <input
            type='url'
            placeholder='https://yourwebsite.com'
            className='flex-1 bg-transparent border-none outline-none text-[14px] text-[#8c8fa0] placeholder:text-muted-text px-3.5 py-3'
          />
          <button
            type='submit'
            className='bg-brand hover:bg-brand-hover transition-colors text-white text-[13px] font-medium px-5 rounded-r-md'
          >
            Analyze →
          </button>
        </form>
        <p className='mt-4 text-[12px] text-faint'>
          No signup required · Results in ~30 seconds
        </p>
      </div>
    </section>
  );
};

export default HomeHero;
