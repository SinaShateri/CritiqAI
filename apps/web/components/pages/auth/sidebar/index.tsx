const AuthSidebar = () => {
  return (
    <aside className='bg-surface border-border-subtle hidden w-70 border-l px-8 py-10 md:block'>
      <div className='text-muted-text mb-4 text-[10px] tracking-[1.5px]'>
        WHY CRITIQAI
      </div>
      <ul className='space-y-3.5'>
        <li className='flex gap-2.5'>
          <span className='bg-brand mt-1.25 h-1.25 w-1.25 shrink-0 rounded-full'></span>
          <span className='text-muted-text text-[12px] leading-[1.6]'>
            Full Lighthouse + SEO audit in under 30 seconds
          </span>
        </li>
        <li className='flex gap-2.5'>
          <span className='bg-brand mt-1.25 h-1.25 w-1.25 shrink-0 rounded-full'></span>
          <span className='text-muted-text text-[12px] leading-[1.6]'>
            AI redesign suggestions powered by GPT-4o Vision
          </span>
        </li>
        <li className='flex gap-2.5'>
          <span className='bg-brand mt-1.25 h-1.25 w-1.25 shrink-0 rounded-full'></span>
          <span className='text-muted-text text-[12px] leading-[1.6]'>
            WCAG accessibility deep scan with axe-core
          </span>
        </li>
        <li className='flex gap-2.5'>
          <span className='bg-brand mt-1.25 h-1.25 w-1.25 shrink-0 rounded-full'></span>
          <span className='text-muted-text text-[12px] leading-[1.6]'>
            Shareable public report links — no login required
          </span>
        </li>
      </ul>
      <div className='bg-bg border-border-subtle mt-8 rounded-lg border p-3.5'>
        <div className='flex items-center justify-between'>
          <span className='text-faint text-[11px]'>stripe.com</span>
          <span className='text-success text-[11px]'>✓ Complete</span>
        </div>
        <div className='mt-2.5 grid grid-cols-4 gap-1.5'>
          <div className='bg-surface rounded-[5px] px-1 py-2 text-center'>
            <div className='text-success text-[14px] font-medium'>94</div>
            <div className='text-faint mt-0.5 text-[10px]'>Perf</div>
          </div>
          <div className='bg-surface rounded-[5px] px-1 py-2 text-center'>
            <div className='text-success text-[14px] font-medium'>88</div>
            <div className='text-faint mt-0.5 text-[10px]'>SEO</div>
          </div>
          <div className='bg-surface rounded-[5px] px-1 py-2 text-center'>
            <div className='text-warn text-[14px] font-medium'>71</div>
            <div className='text-faint mt-0.5 text-[10px]'>A11y</div>
          </div>
          <div className='bg-surface rounded-[5px] px-1 py-2 text-center'>
            <div className='text-warn text-[14px] font-medium'>79</div>
            <div className='text-faint mt-0.5 text-[10px]'>UX</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AuthSidebar;
