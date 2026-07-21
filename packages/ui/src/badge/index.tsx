import cn from '@repo/utils/cn';
import { ReactNode } from 'react';
import { severityStyles, type SeverityTone } from '../severity-styles';

type BadgeProps = {
  children: ReactNode;
  variant?: SeverityTone | 'primary';
  className?: string;
};

const Badge = ({ children, variant = 'primary', className }: BadgeProps) => {
  const tone = variant === 'primary' ? 'info' : variant;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.16em] uppercase',
        variant === 'primary'
          ? 'border-primary/20 bg-primary/10 text-primary'
          : severityStyles[tone as SeverityTone],
        className,
      )}
    >
      <span className='h-1.5 w-1.5 rounded-full bg-current' />
      {children}
    </span>
  );
};

export default Badge;
