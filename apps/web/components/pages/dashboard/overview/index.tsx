import { IconWorld } from '@tabler/icons-react';
import AnalysisCard from '../../../shared/analysis-card';
import StatCard from '../../../shared/stat-card';

const stats = [
  {
    title: 'Total analyses',
    value: 24,
    change: '↑ 4 this week',
    color: 'text-success',
    delay: 'delay-0',
  },
  {
    title: 'Avg. score',
    value: 78,
    change: '↓ 3 vs last week',
    color: 'text-warn',
    delay: 'delay-50',
  },
  {
    title: 'Issues found',
    value: 132,
    change: '8 critical',
    color: 'text-warn',
    delay: 'delay-100',
  },
] as const;

const analyses = [
  {
    id: 'a1',
    url: 'https://stripe.com',
    favicon: 'stripe.com',
    time: '2 hours ago',
    delay: 'delay-0',
    scores: [
      { label: 'Perf', value: 92, status: 'success' },
      { label: 'SEO', value: 88, status: 'warn' },
      { label: 'A11y', value: 81, status: 'warn' },
      { label: 'UX', value: 90, status: 'success' },
    ],
  },
  {
    id: 'a2',
    url: 'https://linear.app',
    favicon: 'linear.app',
    time: 'Yesterday',
    delay: 'delay-50',
    scores: [
      { label: 'Perf', value: 76, status: 'warn' },
      { label: 'SEO', value: 82, status: 'warn' },
      { label: 'A11y', value: 68, status: 'error' },
      { label: 'UX', value: 85, status: 'warn' },
    ],
  },
  {
    id: 'a3',
    url: 'https://vercel.com',
    favicon: 'vercel.com',
    time: '3 days ago',
    delay: 'delay-100',
    analyzing: true,
  },
] as {
  id: string;
  url: string;
  favicon: string;
  time: string;
  delay: string;
  scores: {
    label: string;
    value: number;
    status: 'success' | 'warn' | 'error';
  }[];
  analyzing?: boolean;
}[];

const DashboardOverview = () => {
  return (
    <>
      <section className='animate-fade-up border-border-subtle bg-surface mb-5 rounded-lg border p-4'>
        <div className='text-muted-text mb-2.5 text-[10px] tracking-[1.5px]'>
          ANALYZE A WEBSITE
        </div>

        <form className='border-border-strong bg-bg focus-within:border-brand flex overflow-hidden rounded-md border transition-colors'>
          <div className='border-border-subtle flex items-center border-r px-3.5'>
            <IconWorld
              size={16}
              className='text-faint'
            />
          </div>

          <input
            type='text'
            placeholder='https://yourwebsite.com'
            className='text-heading-soft placeholder:text-muted-text flex-1 bg-transparent px-3.5 py-2.5 text-[13px] outline-none'
          />

          <button
            type='submit'
            className='bg-brand hover:bg-brand-hover px-4.5 text-[13px] font-medium text-white transition-colors'
          >
            Analyze →
          </button>
        </form>
      </section>

      <section className='mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3'>
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </section>

      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-heading-soft text-[13px] font-medium'>
          Recent analyses
        </h2>

        <button className='text-brand text-xs hover:underline'>
          View all →
        </button>
      </div>

      <section>
        {analyses.map((analysis) => (
          <AnalysisCard
            key={analysis.id}
            {...analysis}
          />
        ))}
      </section>
    </>
  );
};

export default DashboardOverview;
