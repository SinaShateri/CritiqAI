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
        'border-border bg-surface text-foreground placeholder:text-foreground-subtle focus-visible:ring-ring focus-visible:ring-offset-background flex h-11 w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60',
        invalid && 'border-error',
        className,
      )}
      {...props}
    />
  );
};

export default Input;
