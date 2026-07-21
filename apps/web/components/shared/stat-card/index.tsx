import SectionHeader from '@repo/ui/section-header';

type StatCardProps = {
  title: string;
  value: number;
  change: string;
  color: string;
  delay: string;
};

const StatCard = ({ value, title, change, color, delay }: StatCardProps) => {
  return (
    <div className={`animate-fade-up rounded-lg border border-border bg-surface px-4 py-3.5 ${delay}`}>
      <div className='text-[22px] font-medium leading-none text-foreground'>{value}</div>
      <div className='mt-1 text-[11px] text-foreground-subtle'>
        <SectionHeader title={title} titleClassName='text-[11px] font-medium uppercase tracking-[0.16em]' />
      </div>
      <div className={`mt-1.25 text-[11px] ${color}`}>{change}</div>
    </div>
  );
};

export default StatCard;
