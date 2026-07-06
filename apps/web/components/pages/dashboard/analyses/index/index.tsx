import Button from '@repo/ui/button';
import cn from '@repo/utils/cn';
import {
  IconArrowsSort,
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
  IconFilter,
  IconSearch,
  IconWorld
} from '@tabler/icons-react';

type Score = number | null;

type Analysis = {
  url: string;
  date: string;
  performance: Score;
  seo: Score;
  accessibility: Score;
  ux: Score;
  status?: 'analyzing' | 'failed';
};

const analyses: Analysis[] = [
  {
    url: 'stripe.com',
    date: '2h ago',
    performance: 94,
    seo: 88,
    accessibility: 71,
    ux: 79,
  },
  {
    url: 'github.com',
    date: 'Yesterday',
    performance: 91,
    seo: 95,
    accessibility: 90,
    ux: 88,
  },
  {
    url: 'vercel.com',
    date: 'Just now',
    performance: null,
    seo: null,
    accessibility: null,
    ux: null,
    status: 'analyzing',
  },
  {
    url: 'mystore.ir',
    date: '3 days ago',
    performance: 42,
    seo: 61,
    accessibility: 38,
    ux: 55,
  },
  {
    url: 'linear.app',
    date: '5 days ago',
    performance: 96,
    seo: 92,
    accessibility: 87,
    ux: 91,
  },
  {
    url: 'old-client-website.com',
    date: '1 week ago',
    performance: null,
    seo: null,
    accessibility: null,
    ux: null,
    status: 'failed',
  },
];

const scoreClass = (score: number) => {
  if (score >= 85) return 'bg-[#0e2218] text-success';

  if (score >= 60) return 'bg-[#221a0c] text-warn';

  return 'bg-[#2e0c0c] text-error';
};

export default function DashboardAnalyses() {
  return (
    <>
      {/* Toolbar */}
      <div className='border-border-subtle flex items-center gap-3 border-b px-5 py-3'>
        <div className='border-border-subtle bg-surface text-muted-text flex flex-1 items-center gap-2 rounded-md border px-3 py-2'>
          <IconSearch size={15} />
          <span className='text-xs'>Search by URL...</span>
        </div>

        <Button
          variant='outlined-primary'
          startIcon={<IconFilter size={14} />}
        >
          Filter
        </Button>

        <Button
          startIcon={<IconArrowsSort size={14} />}
          variant='outlined-gray'
        >
          Newest
        </Button>
      </div>

      {/* Tabs */}
      <div className='border-border-subtle flex gap-2 border-b px-5 py-3'>
        <Tab
          active
          label='All'
          count={12}
        />
        <Tab
          label='Completed'
          count={9}
        />
        <Tab
          label='In progress'
          count={1}
        />
        <Tab
          label='Failed'
          count={2}
        />
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto px-5 py-4'>
        <div className='border-border-subtle text-faint mb-2 grid grid-cols-[2fr_1fr_80px_80px_80px_80px_32px] gap-2 border-b px-3 pb-2 text-[10px] tracking-wider'>
          <span>URL</span>
          <span>DATE</span>
          <span>PERF</span>
          <span>SEO</span>
          <span>A11Y</span>
          <span>UX</span>
          <span />
        </div>

        {analyses.map((item) => (
          <div
            key={item.url}
            className={cn(
              `hover:border-border-subtle hover:bg-surface mb-1 grid cursor-pointer grid-cols-[2fr_1fr_80px_80px_80px_80px_32px] items-center gap-2 rounded-lg border border-transparent px-3 py-3`,
              item.status === 'analyzing' && 'opacity-60',
            )}
          >
            <div className='flex min-w-0 items-center gap-2'>
              <div className='border-border-subtle bg-surface flex h-5 w-5 items-center justify-center rounded border'>
                <IconWorld
                  size={12}
                  className='text-muted-text'
                />
              </div>

              <span className='text-heading-soft truncate text-xs'>
                {item.url}
              </span>
            </div>

            <span className='text-muted-text text-xs'>{item.date}</span>

            {item.status === 'analyzing' ? (
              <div className='text-brand col-span-4 flex items-center gap-2 text-xs'>
                <span className='bg-brand h-2 w-2 rounded-full' />
                Analyzing...
              </div>
            ) : item.status === 'failed' ? (
              <>
                <div className='text-error flex items-center gap-2 text-xs'>
                  <span className='bg-error h-2 w-2 rounded-full' />
                  Failed
                </div>

                <EmptyScore />
                <EmptyScore />
                <EmptyScore />
              </>
            ) : (
              <>
                <ScoreBadge score={item.performance!} />
                <ScoreBadge score={item.seo!} />
                <ScoreBadge score={item.accessibility!} />
                <ScoreBadge score={item.ux!} />
              </>
            )}

            <div className='flex justify-end'>
              <button className='text-muted-text hover:bg-surface rounded p-1'>
                <IconDotsVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <footer className='border-border-subtle flex items-center justify-between border-t px-5 py-3'>
        <span className='text-muted-text text-xs'>Showing 1–6 of 12</span>

        <div className='flex gap-1'>
          <PaginationButton>
            <IconChevronLeft size={14} />
          </PaginationButton>

          <PaginationButton active>1</PaginationButton>

          <PaginationButton>2</PaginationButton>

          <PaginationButton>
            <IconChevronRight size={14} />
          </PaginationButton>
        </div>
      </footer>
    </>
  );
}

function Tab({
  label,
  count,
  active,
}: {
  label: string;
  count: number;
  active?: boolean;
}) {
  return (
    <button
      className={`rounded-full border px-3 py-1 text-xs ${
        active
          ? 'border-brand bg-brand text-white'
          : 'border-border-subtle text-muted-text'
      }`}
    >
      {label}
      <span className='ml-1 opacity-70'>{count}</span>
    </button>
  );
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-center text-xs font-medium ${scoreClass(
        score,
      )}`}
    >
      {score}
    </span>
  );
}

function EmptyScore() {
  return <span className='text-faint text-center text-xs'>—</span>;
}

function PaginationButton({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`flex h-7 w-7 items-center justify-center rounded-md border text-xs ${
        active
          ? 'border-brand bg-brand text-white'
          : 'border-border-subtle bg-surface text-muted-text'
      }`}
    >
      {children}
    </button>
  );
}
