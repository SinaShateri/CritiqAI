import PAGES from '@repo/constants/pages';
import Button from '@repo/ui/button';
import { IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

const FeaturesHero = () => {
  return (
    <section className='border-border-subtle border-b px-6 pt-18 pb-14 text-center'>
      <div className='mx-auto max-w-3xl'>
        <div className='inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3.5 py-1'>
          <span className='bg-brand h-1.5 w-1.5 rounded-full'></span>
          <span className='text-xs text-primary'>Everything you need</span>
        </div>
        <h1 className='mt-6 text-[40px] leading-tight font-medium text-foreground'>
          One tool. <span className='text-brand'>Six deep checks.</span> Zero
          guesswork.
        </h1>
        <p className='mx-auto mt-3.5 max-w-130 text-base leading-[1.7] text-foreground-muted'>
          CritiqAI runs a full website audit in under 30 seconds — performance,
          SEO, accessibility, UX, and AI redesign suggestions, all in one
          report.
        </p>
        <Button
          component={Link}
          href={PAGES.home}
          className='inline-flex mt-6'
          padding='lg'
          startIcon={<IconSparkles size={16} />}
        >
          Try it free — no signup needed
        </Button>
      </div>
    </section>
  );
};

export default FeaturesHero;
