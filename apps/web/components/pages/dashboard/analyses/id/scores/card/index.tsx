import Badge from '@repo/ui/badge';
import { AnalysisData } from '../../types';

const scoreTone = (score: number) =>
  score >= 90
    ? ('success' as const)
    : score >= 50
      ? ('warn' as const)
      : ('error' as const);
const DashboardAnalysesIDScoresCard = ({
  score,
}: {
  score: AnalysisData['scores'][number];
}) => {
  const tone = scoreTone(score.value);
  return (
    <div className='border-border bg-surface flex items-center gap-3 rounded-lg border px-3.5 py-3'>
      <Badge
        variant={tone}
        className='font-mono text-sm'
      >
        {score.value}
      </Badge>
      <div className='min-w-0'>
        <div className='text-foreground truncate text-sm font-medium'>
          {score.label}
        </div>
        <div className='text-foreground-subtle truncate text-xs'>
          {score.detail}
        </div>
      </div>
    </div>
  );
};
export default DashboardAnalysesIDScoresCard;
