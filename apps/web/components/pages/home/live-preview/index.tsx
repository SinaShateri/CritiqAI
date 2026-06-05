const HomeLivepreview = () => {
  return (
    <section className='border-b border-border-subtle py-14 px-6'>
      <div className='max-w-175 mx-auto'>
        <div className='text-[11px] tracking-[1.5px] text-brand mb-2'>
          LIVE PREVIEW
        </div>
        <h2 className='text-[26px] font-medium text-heading-soft'>
          See what a real report looks like
        </h2>
        <div className='mt-7 bg-surface border border-border-subtle rounded-xl overflow-hidden'>
          <div className='flex items-center justify-between px-4 py-2.5 border-b border-border-subtle'>
            <span className='text-[12px] text-muted-text'>stripe.com</span>
            <span className='text-[11px] text-brand bg-[#1a1c2e] rounded-xl px-2.5 py-0.5'>
              Analysis complete
            </span>
          </div>
          <div className='grid grid-cols-4 gap-2 p-3.5'>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='text-[18px] text-success font-medium'>94</div>
              <div className='text-[11px] text-muted-text'>Perf</div>
            </div>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='text-[18px] text-success font-medium'>88</div>
              <div className='text-[11px] text-muted-text'>SEO</div>
            </div>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='text-[18px] text-warn font-medium'>71</div>
              <div className='text-[11px] text-muted-text'>A11y</div>
            </div>
            <div className='bg-bg border border-border-subtle rounded-md p-2.5 text-center'>
              <div className='text-[18px] text-warn font-medium'>79</div>
              <div className='text-[11px] text-muted-text'>UX</div>
            </div>
          </div>
          <div className='px-3.5 pb-3.5'>
            <div className='flex items-center gap-2.5 py-2 border-b border-[#1a1c22] last:border-b-0'>
              <span className='w-1.5 bg-error h-1.5 rounded-full shrink-0'></span>
              <span className='flex-1 text-[12px] text-body'>
                3 images missing alt text
              </span>
              <span className='text-[11px] px-2 py-0.5 bg-[#2a1515] text-error rounded'>
                Critical
              </span>
            </div>
            <div className='flex items-center gap-2.5 py-2 border-b border-[#1a1c22] last:border-b-0'>
              <span className='w-1.5 h-1.5 rounded-full bg-warn shrink-0'></span>
              <span className='flex-1 text-[12px] text-body'>
                LCP is 2.8s — target: under 2.5s
              </span>
              <span className='text-[11px] px-2 py-0.5 bg-[#2a1e10] text-warn rounded'>
                Warning
              </span>
            </div>
            <div className='flex items-center gap-2.5 py-2 border-b border-[#1a1c22] last:border-b-0'>
              <span className='w-1.5 h-1.5 rounded-full bg-body shrink-0'></span>
              <span className='flex-1 text-[12px] text-body'>
                No meta description on /pricing
              </span>
              <span className='text-[11px] px-2 py-0.5 bg-[#1a1c28] text-body rounded'>
                Info
              </span>
            </div>
          </div>
          <div className='mx-3.5 mb-3.5 bg-bg border border-border-subtle rounded-md p-3.5'>
            <div className='text-[11px] text-brand mb-2'>AI UX feedback</div>
            <p className='text-[12px] text-body leading-[1.7]'>
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
