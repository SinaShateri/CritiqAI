import cn from '@repo/utils/cn';
import { IconLoader4 } from '@tabler/icons-react';
import { ElementType } from 'react';
import { ButtonProps, ButtonVariant } from './types';

const Button = <T extends ElementType = 'button'>({
  component,
  variant = 'filled',
  tonalTheme = 'primary',
  className,
  classNames,
  loading = false,
  disabled = false,
  startIcon = null,
  endIcon = null,
  children,
  fullWidth = false,
  padding = 'md',
  type,
  ...props
}: ButtonProps<T>) => {
  const Component = (component || 'button') as ElementType;
  const isButtonElement = Component === 'button';
  const hasIconOnlyChild = !children && (startIcon || endIcon);

  if (
    process.env.NODE_ENV !== 'production' &&
    hasIconOnlyChild &&
    !props['aria-label'] &&
    !props['aria-labelledby']
  ) {
    console.warn('Button uses icon-only content without an accessible label.');
  }

  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60',
    fullWidth && 'w-full',
    (disabled || loading) && 'cursor-not-allowed',
  );

  const paddingStyles = {
    sm: 'px-2.5 py-1.5',
    md: 'px-3.5 py-2.5',
    lg: 'px-4.5 py-3.5',
  };

  const variantStyles = {
    default: 'border-transparent bg-transparent text-foreground',
    filled:
      'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
    'outlined-primary':
      'border-primary/40 bg-transparent text-primary hover:bg-primary/10',
    'outlined-gray':
      'border-border bg-transparent text-foreground-muted hover:bg-surface',
    text: 'border-transparent bg-transparent text-primary hover:bg-primary/10',
    elevated:
      'border-primary/20 bg-surface-raised text-foreground hover:bg-surface',
    tonal:
      tonalTheme === 'primary'
        ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90'
        : 'border-border bg-surface text-foreground hover:bg-surface-raised',
  };

  const classes = cn(
    baseStyles,
    variantStyles[variant as ButtonVariant],
    paddingStyles[padding],
    className,
  );

  return (
    <Component
      className={classes}
      aria-busy={loading || undefined}
      disabled={isButtonElement ? disabled || loading : undefined}
      type={isButtonElement ? (type ?? 'button') : undefined}
      {...props}
    >
      {startIcon ? (
        <span className={cn('shrink-0', classNames?.icon)}>{startIcon}</span>
      ) : null}
      <span className={cn('flex items-center', classNames?.children)}>
        {loading ? (
          <IconLoader4
            size={18}
            className='animate-spin'
          />
        ) : (
          children
        )}
      </span>
      {endIcon ? (
        <span className={cn('shrink-0', classNames?.icon)}>{endIcon}</span>
      ) : null}
    </Component>
  );
};

export default Button;
