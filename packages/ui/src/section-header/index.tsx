import cn from '@repo/utils/cn';
import { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
};

const SectionHeader = ({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {eyebrow ? (
        <p className='text-foreground-subtle text-[0.7rem] font-semibold tracking-[0.24em] uppercase'>
          {eyebrow}
        </p>
      ) : null}
      <div className='space-y-1'>
        <h2
          className={cn(
            'text-foreground text-lg font-semibold',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className='text-foreground-muted text-sm'>{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeader;
