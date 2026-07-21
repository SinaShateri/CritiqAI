const scores = [
  { label: 'Perf', score: '94', tone: 'text-success' },
  { label: 'SEO', score: '88', tone: 'text-success' },
  { label: 'A11y', score: '71', tone: 'text-warn' },
  { label: 'UX', score: '79', tone: 'text-warn' },
];

const benefits = [
  'Full Lighthouse + SEO audit in under 30 seconds',
  'AI redesign suggestions powered by GPT-4o Vision',
  'WCAG accessibility deep scan with axe-core',
  'Shareable public report links — no login required',
];

const AuthSidebar = () => (
  <aside className='border-border bg-surface hidden w-70 border-l px-8 py-10 md:block'>
    <div className='text-foreground-subtle mb-4 text-xs font-semibold tracking-[1.5px]'>
      WHY CRITIQAI
    </div>
    <ul className='space-y-3.5'>
      {benefits.map((benefit) => (
        <li
          key={benefit}
          className='flex gap-2.5'
        >
          <span className='bg-primary mt-1.25 h-1.25 w-1.25 shrink-0 rounded-full' />
          <span className='text-foreground-muted text-sm leading-[1.6]'>
            {benefit}
          </span>
        </li>
      ))}
    </ul>
    <div className='border-border bg-background mt-8 rounded-lg border p-3.5'>
      <div className='flex items-center justify-between'>
        <span className='text-foreground-subtle font-mono text-xs'>
          stripe.com
        </span>
        <span className='text-success text-xs'>Complete</span>
      </div>
      <div className='mt-2.5 grid grid-cols-4 gap-1.5'>
        {scores.map(({ label, score, tone }) => (
          <div
            key={label}
            className='bg-surface rounded-[5px] px-1 py-2 text-center'
          >
            <div className={`font-mono text-sm font-medium ${tone}`}>
              {score}
            </div>
            <div className='text-foreground-subtle mt-0.5 text-xs'>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

export default AuthSidebar;
