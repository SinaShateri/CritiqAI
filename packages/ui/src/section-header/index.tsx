import cn from '@repo/utils/cn';
import { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
};

const SectionHeader = ({ eyebrow, title, description, className, titleClassName }: SectionHeaderProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {eyebrow ? (
        <p className='text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-foreground-subtle'>
          {eyebrow}
        </p>
      ) : null}
      <div className='space-y-1'>
        <h2 className={cn('text-lg font-semibold text-foreground', titleClassName)}>{title}</h2>
        {description ? <p className='text-sm text-foreground-muted'>{description}</p> : null}
      </div>
    </div>
  );
};

export default SectionHeader;
