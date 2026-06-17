'use client';

import cn from '@repo/utils/cn';
import { SkeletonProps, SkeletonVariant } from './type';

const Skeleton = ({
  variant = 'rect',
  width,
  height,
  className,
  rounded = false,
  animate = 'pulse',
}: SkeletonProps) => {
  const baseStyle =
    'bg-neutral-100 dark:bg-neutral-600 relative overflow-hidden';

  const animation: Record<'shimmer' | 'pulse' | 'none', string> = {
    shimmer: 'animate-shimmer',
    pulse: 'animate-pulse',
    none: '',
  };

  const variants: Record<SkeletonVariant, string> = {
    text: 'h-4 w-full rounded-md',
    circle: 'rounded-full aspect-square',
    rect: 'rounded-md',
    card: 'rounded-xl w-full h-32',
  };

  return (
    <div
      className={cn(
        baseStyle,
        variants[variant],
        animation[animate],
        rounded && 'rounded-full',
        className,
      )}
      style={{
        width,
        height,
      }}
    />
  );
};

export default Skeleton;
