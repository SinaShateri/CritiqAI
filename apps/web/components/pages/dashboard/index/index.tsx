import Button from '@repo/ui/button';
import { IconChevronRight, IconPlus, IconWorld } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import ScoreBadge from '../../../shared/score-badge';

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

function StatCard({
  value,
  title,
  change,
  color,
  delay,
}: (typeof stats)[number]) {
  return (
    <div
      className={`animate-fade-up border-border-subtle bg-surface rounded-lg border px-4 py-3.5 ${delay}`}
    >
      <div className='text-heading text-[22px] leading-none font-medium'>
        {value}
      </div>

      <div className='text-faint mt-1 text-[11px]'>{title}</div>

      <div className={`mt-1.25 text-[11px] ${color}`}>{change}</div>
    </div>
  );
}

function AnalysisCard({
  id,
  url,
  favicon,
  time,
  delay,
  scores,
  analyzing,
}: (typeof analyses)[number]) {
  return (
    <Link
      href={`/analysis/${id}`}
      className={`animate-fade-up border-border-subtle bg-surface mb-2 flex items-center gap-3 rounded-lg border px-3.5 py-3 transition-colors hover:border-[#2e3148] ${
        analyzing ? 'opacity-65' : ''
      } ${delay}`}
    >
      <div className='border-border-subtle bg-bg flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border'>
        <Image
          src={`https://www.google.com/s2/favicons?domain=${favicon}&sz=32`}
          alt=''
          width={32}
          height={32}
          className='h-3.5 w-3.5'
        />
      </div>

      <div className='min-w-0 flex-1'>
        <div className='text-heading-soft truncate text-[12px] font-medium'>
          {url}
        </div>

        <div className='text-faint mt-0.5 text-[11px]'>{time}</div>
      </div>

      {analyzing ? (
        <div className='flex items-center gap-2'>
          <span className='animate-pulse-dot bg-brand h-1.5 w-1.5 rounded-full' />
          <span className='text-brand text-[11px]'>Analyzing…</span>
        </div>
      ) : (
        <div className='hidden gap-1.5 sm:flex'>
          {scores?.map((score) => (
            <ScoreBadge
              key={score.label}
              {...score}
            />
          ))}
        </div>
      )}

      <IconChevronRight size={16} />
    </Link>
  );
}

const DashboardIndex = () => {
  return (
    <div className='flex min-w-0 flex-1 flex-col pb-16 md:pb-0'>
      <header className='border-border-subtle flex h-12 items-center justify-between border-b px-6'>
        <h1 className='text-heading text-sm font-medium'>Dashboard</h1>

        <Button
          startIcon={<IconPlus size={16} />}
          className='sm:text-xs'
        >
          New analysis
        </Button>
      </header>

      <div className='flex-1 overflow-y-auto p-5'>
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
      </div>
    </div>
  )
}

export default DashboardIndex