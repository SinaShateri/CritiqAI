import Badge from '@repo/ui/badge';
import SectionHeader from '@repo/ui/section-header';

const HomeLivepreview = () => {
  return (
    <section className='border-b border-border-subtle py-14 px-6'>
      <div className='max-w-175 mx-auto'>
        <SectionHeader eyebrow='Live preview' title='See what a real report looks like' titleClassName='text-2xl font-medium' />
        <div className='mt-7 overflow-hidden rounded-xl border border-border bg-surface'>
          <div className='flex items-center justify-between px-4 py-2.5 border-b border-border-subtle'>
            <span className='font-mono text-xs text-foreground-muted'>stripe.com</span>
            <Badge variant='primary'>Analysis complete</Badge>
          </div>
          <div className='grid grid-cols-4 gap-2 p-3.5'>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='font-mono text-lg font-medium text-success'>94</div>
              <div className='text-xs text-foreground-subtle'>Perf</div>
            </div>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='font-mono text-lg font-medium text-success'>88</div>
              <div className='text-xs text-foreground-subtle'>SEO</div>
            </div>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='font-mono text-lg font-medium text-warn'>71</div>
              <div className='text-xs text-foreground-subtle'>A11y</div>
            </div>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='font-mono text-lg font-medium text-warn'>79</div>
              <div className='text-xs text-foreground-subtle'>UX</div>
            </div>
          </div>
          <div className='px-3.5 pb-3.5'>
            <div className='flex items-center gap-2.5 border-b border-border py-2 last:border-b-0'>
              <span className='w-1.5 bg-error h-1.5 rounded-full shrink-0'></span>
              <span className='flex-1 text-xs text-foreground-muted'>
                3 images missing alt text
              </span>
              <Badge variant='error'>Critical</Badge>
            </div>
            <div className='flex items-center gap-2.5 border-b border-border py-2 last:border-b-0'>
              <span className='w-1.5 h-1.5 rounded-full bg-warn shrink-0'></span>
              <span className='flex-1 text-xs text-foreground-muted'>
                LCP is 2.8s — target: under 2.5s
              </span>
              <Badge variant='warn'>Warning</Badge>
            </div>
            <div className='flex items-center gap-2.5 border-b border-border py-2 last:border-b-0'>
              <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-info'></span>
              <span className='flex-1 text-xs text-foreground-muted'>
                No meta description on /pricing
              </span>
              <Badge variant='info'>Info</Badge>
            </div>
          </div>
          <div className='mx-3.5 mb-3.5 rounded-md border border-border bg-background p-3.5'>
            <div className='mb-2 text-xs text-primary'>AI UX feedback</div>
            <p className='text-xs leading-[1.7] text-foreground-muted'>
              The hero section has strong visual hierarchy but the primary CTA
              competes with the secondary action. Consider increasing contrast
              on the main button. Navigation is clean however pricing link is
              underemphasized
              <span className='inline-block align-middle w-0.5 h-3 bg-brand ml-1 animate-blink'></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLivepreview;
