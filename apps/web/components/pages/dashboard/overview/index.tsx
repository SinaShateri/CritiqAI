import Button from '@repo/ui/button';
import Input from '@repo/ui/input';
import Label from '@repo/ui/label';
import SectionHeader from '@repo/ui/section-header';
import { IconArrowRight, IconWorld } from '@tabler/icons-react';
import AnalysisCard from '../../../shared/analysis-card';
import StatCard from '../../../shared/stat-card';

type Analyses = {
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

const analyses: Analyses = [
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
    scores: [],
    analyzing: true,
  },
];

const DashboardOverview = () => (
  <>
    <section className='animate-fade-up border-border bg-surface mb-5 rounded-lg border p-4'>
      <SectionHeader
        eyebrow='Analyze a website'
        title='Start a new audit'
        titleClassName='sr-only'
      />
      <form className='border-border-strong bg-background focus-within:border-primary mt-2.5 flex overflow-hidden rounded-md border'>
        <div className='border-border flex items-center border-r px-3.5'>
          <IconWorld
            aria-hidden='true'
            size={16}
            className='text-foreground-subtle'
          />
        </div>
        <Label
          htmlFor='dashboard-website-url'
          className='sr-only'
        >
          Website URL to analyze
        </Label>
        <Input
          id='dashboard-website-url'
          name='website-url'
          type='url'
          required
          placeholder='https://yourwebsite.com'
          className='h-auto flex-1 rounded-none border-0 bg-transparent px-3.5 py-2.5 text-sm shadow-none focus-visible:ring-0'
        />
        <Button
          type='submit'
          className='rounded-none px-4.5'
          endIcon={<IconArrowRight size={16} />}
        >
          Analyze
        </Button>
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
      <h2 className='text-foreground text-sm font-medium'>Recent analyses</h2>
      <button
        type='button'
        className='text-primary focus-visible:ring-ring text-xs hover:underline focus-visible:ring-2 focus-visible:outline-none'
      >
        View all
      </button>
    </div>
    <section aria-label='Recent analyses'>
      {analyses.map((analysis) => (
        <AnalysisCard
          key={analysis.id}
          {...analysis}
        />
      ))}
    </section>
  </>
);

export default DashboardOverview;
