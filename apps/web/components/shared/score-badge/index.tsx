import cn from '@repo/utils/cn';

type ScoreBadgeProps = {
  label: string;
  value: number;
  status: 'success' | 'warn' | 'error';
};

const colorMap = {
  success: 'text-success bg-[#0e2218]',
  warn: 'text-warn bg-[#221a0c]',
  error: 'text-error bg-[#2e0c0c]',
};

const ScoreBadge = ({ label, value, status }: ScoreBadgeProps) => {
  return (
    <span
      className={cn(
        'rounded-xl px-2 py-0.5 text-[11px] font-medium',
        colorMap[status],
      )}
    >
      {label} {value}
    </span>
  );
};

export default ScoreBadge;
