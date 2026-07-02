import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type ButtonVariant =
  | 'default'
  | 'filled'
  | 'outlined-primary'
  | 'outlined-gray'
  | 'text'
  | 'elevated'
  | 'tonal';

type BaseProps = {
  variant?: ButtonVariant;
  component?: ElementType;
  tonalTheme?: 'primary' | 'secondary';
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  classNames?: {
    children?: string;
    icon?: string;
  };
};

export type ButtonProps<T extends ElementType = 'button'> = BaseProps & {
  component?: T;
} & ComponentPropsWithoutRef<T>;
