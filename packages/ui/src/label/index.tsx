import cn from '@repo/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

type LabelProps = ComponentPropsWithoutRef<'label'> & {
  htmlFor: string;
  required?: boolean;
};

const Label = ({
  children,
  className,
  htmlFor,
  required = false,
  ...props
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-foreground-muted text-sm font-medium', className)}
      {...props}
    >
      {children}
      {required ? <span className='text-error ml-1'>*</span> : null}
    </label>
  );
};

export default Label;
