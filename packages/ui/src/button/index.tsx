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
  ...props
}: ButtonProps<T>) => {
  const Component = (component || 'button') as ElementType;

  const baseStyles =
    variant !== 'default'
      ? cn(
          'px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-center font-medium rounded-xl h-12 transition-all cursor-pointer disabled:cursor-not-allowed',
          (startIcon || endIcon) && 'flex items-center justify-center gap-1',
          fullWidth && 'w-full',
          (disabled || loading) && 'cursor-not-allowed!',
        )
      : '';

  const variantStyles = {
    default: '',
    filled:
      'bg-brand hover:bg-brand-hover rounded-md py-3 text-[14px] text-white transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
    'outlined-primary':
      'border border-brand text-brand hover:bg-brand/10 disabled:text-neutral-500 disabled:border-neutral-500 hover:bg-primary/10 data-[selected="true"]:text-primary data-[selected="true"]:bg-primary/10',
    'outlined-gray':
      'border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:text-neutral-500 disabled:border-neutral-500 hover:bg-gray-50 data-[selected="true"]:text-primary data-[selected="true"]:bg-primary/10',
    text: 'text-brand hover:bg-brand/10 disabled:text-neutral-500 disabled:border-neutral-500 hover:bg-primary/10',
    elevated:
      'bg-brand hover:bg-brand-hover rounded-md py-3 text-[14px] text-white transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
    tonal:
      tonalTheme === 'primary'
        ? 'bg-brand text-white hover:bg-brand-hover disabled:bg-neutral-700'
        : 'bg-white text-brand hover:bg-brand/10 disabled:text-neutral-500 disabled:border-neutral-500 hover:bg-primary/10',
  };

  const classes = cn(
    baseStyles,
    variantStyles[variant as ButtonVariant],
    className,
  );

  return (
    <Component
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      <span className={classNames?.icon}>{startIcon}</span>

      <span className={cn('flex items-center', classNames?.children)}>
        {loading ? (
          <IconLoader4
            size={24}
            className='animate-spin'
          />
        ) : (
          children
        )}
      </span>

      <span className={classNames?.icon}>{endIcon}</span>
    </Component>
  );

  // if (href) {
  //   return (
  //     <Link
  //       href={href}
  //       className={classes}
  //       onClick={onClick}
  //       {...props}
  //     >
  //       {startIcon}
  //       {children}
  //       {endIcon}
  //     </Link>
  //   );
  // }

  // return (
  //   <button
  //     className={classes}
  //     onClick={onClick}
  //     disabled={disabled || loading}
  //     type={type}
  //     {...props}
  //   >
  //     <span className={classNames?.icon}>{startIcon}</span>
  //     <span className={cn('flex items-center', classNames?.children)}>
  //       {loading ? (
  //         <Loader
  //           color='var(--primary-color)'
  //           size='sm'
  //         />
  //       ) : (
  //         children
  //       )}
  //     </span>
  //     <span className={classNames?.icon}>{endIcon}</span>
  //   </button>
};

export default Button;
