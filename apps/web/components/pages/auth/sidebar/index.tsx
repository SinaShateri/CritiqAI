const AuthSidebar = () => {
  return (
    <aside className='hidden md:block w-70 bg-surface border-l border-border-subtle px-8 py-10'>
      <div className='text-[10px] tracking-[1.5px] text-muted-text mb-4'>
        WHY CRITIQAI
      </div>
      <ul className='space-y-3.5'>
        <li className='flex gap-2.5'>
          <span className='mt-1.25 w-1.25 h-1.25 rounded-full bg-brand shrink-0'></span>
          <span className='text-[12px] text-muted-text leading-[1.6]'>
            Full Lighthouse + SEO audit in under 30 seconds
          </span>
        </li>
        <li className='flex gap-2.5'>
          <span className='mt-1.25 w-1.25 h-1.25 rounded-full bg-brand shrink-0'></span>
          <span className='text-[12px] text-muted-text leading-[1.6]'>
            AI redesign suggestions powered by GPT-4o Vision
          </span>
        </li>
        <li className='flex gap-2.5'>
          <span className='mt-1.25 w-1.25 h-1.25 rounded-full bg-brand shrink-0'></span>
          <span className='text-[12px] text-muted-text leading-[1.6]'>
            WCAG accessibility deep scan with axe-core
          </span>
        </li>
        <li className='flex gap-2.5'>
          <span className='mt-1.25 w-1.25 h-1.25 rounded-full bg-brand shrink-0'></span>
          <span className='text-[12px] text-muted-text leading-[1.6]'>
            Shareable public report links — no login required
          </span>
        </li>
      </ul>
      <div className='mt-8 bg-bg border border-border-subtle rounded-lg p-3.5'>
        <div className='flex items-center justify-between'>
          <span className='text-[11px] text-faint'>stripe.com</span>
          <span className='text-[11px] text-success'>✓ Complete</span>
        </div>
        <div className='grid grid-cols-4 gap-1.5 mt-2.5'>
          <div className='bg-surface rounded-[5px] py-2 px-1 text-center'>
            <div
              className='text-[14px] font-medium'
              style={{ color: '#3ecf8e' }}
            >
              94
            </div>
            <div className='text-[10px] text-faint mt-0.5'>Perf</div>
          </div>
          <div className='bg-surface rounded-[5px] py-2 px-1 text-center'>
            <div
              className='text-[14px] font-medium'
              style={{ color: '#3ecf8e' }}
            >
              88
            </div>
            <div className='text-[10px] text-faint mt-0.5'>SEO</div>
          </div>
          <div className='bg-surface rounded-[5px] py-2 px-1 text-center'>
            <div
              className='text-[14px] font-medium'
              style={{ color: '#f4a823' }}
            >
              71
            </div>
            <div className='text-[10px] text-faint mt-0.5'>A11y</div>
          </div>
          <div className='bg-surface rounded-[5px] py-2 px-1 text-center'>
            <div
              className='text-[14px] font-medium'
              style={{ color: '#f4a823' }}
            >
              79
            </div>
            <div className='text-[10px] text-faint mt-0.5'>UX</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AuthSidebar;
