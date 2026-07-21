import cn from '@repo/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

type LabelProps = ComponentPropsWithoutRef<'label'> & {
  htmlFor: string;
  required?: boolean;
};

const Label = ({ children, className, htmlFor, required = false, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-medium text-foreground-muted', className)}
      {...props}
    >
      {children}
      {required ? <span className='ml-1 text-error'>*</span> : null}
    </label>
  );
};

export default Label;
