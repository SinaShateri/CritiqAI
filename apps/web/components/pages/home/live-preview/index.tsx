import Badge from '@repo/ui/badge';
import SectionHeader from '@repo/ui/section-header';

const HomeLivepreview = () => {
  return (
    <section className='border-border-subtle border-b px-6 py-14'>
      <div className='mx-auto max-w-175'>
        <SectionHeader
          eyebrow='Live preview'
          title='See what a real report looks like'
          titleClassName='text-2xl font-medium'
        />
        <div className='border-border bg-surface mt-7 overflow-hidden rounded-xl border'>
          <div className='border-border-subtle flex items-center justify-between border-b px-4 py-2.5'>
            <span className='text-foreground-muted font-mono text-xs'>
              stripe.com
            </span>
            <Badge variant='primary'>Analysis complete</Badge>
          </div>
          <div className='grid grid-cols-4 gap-2 p-3.5'>
            <div className='bg-bg border-border-subtle rounded-md border p-2.5 text-center'>
              <div className='text-success font-mono text-lg font-medium'>
                94
              </div>
              <div className='text-foreground-subtle text-xs'>Perf</div>
            </div>
            <div className='bg-bg border-border-subtle rounded-md border p-2.5 text-center'>
              <div className='text-success font-mono text-lg font-medium'>
                88
              </div>
              <div className='text-foreground-subtle text-xs'>SEO</div>
            </div>
            <div className='bg-bg border-border-subtle rounded-md border p-2.5 text-center'>
              <div className='text-warn font-mono text-lg font-medium'>71</div>
              <div className='text-foreground-subtle text-xs'>A11y</div>
            </div>
            <div className='bg-bg border-border-subtle rounded-md border p-2.5 text-center'>
              <div className='text-warn font-mono text-lg font-medium'>79</div>
              <div className='text-foreground-subtle text-xs'>UX</div>
            </div>
          </div>
          <div className='px-3.5 pb-3.5'>
            <div className='border-border flex items-center gap-2.5 border-b py-2 last:border-b-0'>
              <span className='bg-error h-1.5 w-1.5 shrink-0 rounded-full'></span>
              <span className='text-foreground-muted flex-1 text-xs'>
                3 images missing alt text
              </span>
              <Badge variant='error'>Critical</Badge>
            </div>
            <div className='border-border flex items-center gap-2.5 border-b py-2 last:border-b-0'>
              <span className='bg-warn h-1.5 w-1.5 shrink-0 rounded-full'></span>
              <span className='text-foreground-muted flex-1 text-xs'>
                LCP is 2.8s — target: under 2.5s
              </span>
              <Badge variant='warn'>Warning</Badge>
            </div>
            <div className='border-border flex items-center gap-2.5 border-b py-2 last:border-b-0'>
              <span className='bg-info h-1.5 w-1.5 shrink-0 rounded-full'></span>
              <span className='text-foreground-muted flex-1 text-xs'>
                No meta description on /pricing
              </span>
              <Badge variant='info'>Info</Badge>
            </div>
          </div>
          <div className='border-border bg-background mx-3.5 mb-3.5 rounded-md border p-3.5'>
            <div className='text-primary mb-2 text-xs'>AI UX feedback</div>
            <p className='text-foreground-muted text-xs leading-[1.7]'>
              The hero section has strong visual hierarchy but the primary CTA
              competes with the secondary action. Consider increasing contrast
              on the main button. Navigation is clean however pricing link is
              underemphasized
              <span className='bg-brand animate-blink ml-1 inline-block h-3 w-0.5 align-middle'></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLivepreview;
