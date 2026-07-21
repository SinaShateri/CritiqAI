import cn from '@repo/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  className?: string;
  invalid?: boolean;
};

const Input = ({ className, invalid = false, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-foreground-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60',
        invalid && 'border-error',
        className,
      )}
      {...props}
    />
  );
};

export default Input;
