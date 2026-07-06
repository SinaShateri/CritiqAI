import { AnalysisData } from '../../../../../../../app/dashboard/analyses/[id]/page';

const scoreRingStyle = (score: number) => {
  if (score >= 90) {
    return {
      border: '2px solid rgb(62, 207, 142)',
      background: 'rgb(14, 34, 24)',
      color: 'rgb(62, 207, 142)',
    };
  }
  if (score >= 50) {
    return {
      border: '2px solid rgb(244, 168, 35)',
      background: 'rgb(34, 26, 12)',
      color: 'rgb(244, 168, 35)',
    };
  }
  return {
    border: '2px solid rgb(226, 87, 87)',
    background: 'rgb(42, 14, 14)',
    color: 'rgb(226, 87, 87)',
  };
};

const DashboardAnalysesIDScoresCard = ({
  score,
}: {
  score: AnalysisData['scores'][0];
}) => (
  <div className='border-border-subtle bg-surface flex items-center gap-3 rounded-lg border px-3.5 py-3'>
    <div
      className='animate-fade-up flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium'
      style={scoreRingStyle(score.value)}
    >
      {score.value}
    </div>
    <div className='min-w-0'>
      <div className='text-heading-soft truncate text-[12px] font-medium'>
        {score.label}
      </div>
      <div className='text-faint truncate text-[11px]'>{score.detail}</div>
    </div>
  </div>
);

export default DashboardAnalysesIDScoresCard;
