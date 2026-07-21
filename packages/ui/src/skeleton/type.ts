export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

export type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean;
  animate?: 'shimmer' | 'pulse' | 'none';
};
