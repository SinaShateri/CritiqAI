import Button from '@repo/ui/button';
import Input from '@repo/ui/input';
import Label from '@repo/ui/label';
import { IconArrowRight, IconWorld } from '@tabler/icons-react';

const HomeHero = () => {
  return (
    <section className='border-border-subtle border-b px-6 pt-20 pb-16 text-center'>
      <div className='mx-auto max-w-3xl'>
        <div className='animate-fade-up border-border bg-surface-raised inline-flex items-center gap-2 rounded-full border px-3.5 py-1'>
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
          className='animate-fade-up text-foreground-muted mt-4 text-base'
          style={{ animationDelay: '0.15s' }}
        >
          Paste any URL. Get a full live report on performance, SEO,
          accessibility &amp; AI redesign suggestions.
        </p>
        <form
          className='animate-fade-up border-border-strong bg-surface mx-auto mt-8 flex max-w-130 rounded-lg border'
          style={{ animationDelay: '0.2s' }}
        >
          <div className='border-border-subtle flex items-center border-r px-3.5'>
            <IconWorld
              aria-hidden='true'
              className='text-foreground-subtle'
            />
          </div>
          <Label
            htmlFor='website-url'
            className='sr-only'
          >
            Website URL to analyze
          </Label>
          <Input
            id='website-url'
            name='website-url'
            type='url'
            placeholder='https://yourwebsite.com'
            className='h-auto flex-1 rounded-none border-0 bg-transparent px-3.5 py-3 text-base shadow-none focus-visible:ring-0'
          />
          <Button
            type='submit'
            className='rounded-s-none px-5 transition-colors'
            endIcon={<IconArrowRight size={18} />}
          >
            Analyze
          </Button>
        </form>
        <p className='text-foreground-subtle mt-4 text-xs'>
          No signup required · Results in ~30 seconds
        </p>
      </div>
    </section>
  );
};

export default HomeHero;
