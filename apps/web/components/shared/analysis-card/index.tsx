import PAGES from '@repo/constants/pages';
import { IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import ScoreBadge from '../score-badge';

type AnalysisCardProps = {
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
};

const AnalysisCard = ({
  id,
  url,
  favicon,
  time,
  delay,
  scores,
  analyzing,
}: AnalysisCardProps) => {
  return (
    <Link
      href={`${PAGES.dashboard.analyses}/${id}`}
      className={`animate-fade-up mb-2 flex items-center gap-3 rounded-lg border border-border bg-surface px-3.5 py-3 transition-colors hover:border-border-strong hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        analyzing ? 'opacity-65' : ''
      } ${delay}`}
    >
      <div className='flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-border bg-background'>
        <Image
          src={`https://www.google.com/s2/favicons?domain=${favicon}&sz=32`}
          alt=''
          width={32}
          height={32}
          className='h-3.5 w-3.5'
        />
      </div>

      <div className='min-w-0 flex-1'>
        <div className='truncate text-[12px] font-medium text-foreground'>{url}</div>
        <div className='mt-0.5 text-[11px] text-foreground-subtle'>{time}</div>
      </div>

      {analyzing ? (
        <div className='flex items-center gap-2'>
          <span className='h-1.5 w-1.5 rounded-full bg-primary' />
          <span className='text-[11px] text-primary'>Analyzing…</span>
        </div>
      ) : (
        <div className='hidden gap-1.5 sm:flex'>
          {scores?.map((score) => (
            <ScoreBadge key={score.label} {...score} />
          ))}
        </div>
      )}

      <IconChevronRight size={16} className='text-foreground-subtle' />
    </Link>
  );
};

export default AnalysisCard;
