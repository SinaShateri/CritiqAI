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
};

export default AnalysisCard;
