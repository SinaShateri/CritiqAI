import Badge from '@repo/ui/badge';

type ScoreBadgeProps = {
  label: string;
  value: number;
  status: 'success' | 'warn' | 'error';
};

const variantMap = {
  success: 'success' as const,
  warn: 'warn' as const,
  error: 'error' as const,
};

const ScoreBadge = ({ label, value, status }: ScoreBadgeProps) => {
  return <Badge variant={variantMap[status]}>{`${label} ${value}`}</Badge>;
};

export default ScoreBadge;
