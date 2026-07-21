import { AnalysisData } from '../types';
import DashboardAnalysesIDScoresCard from './card';

const DashboardAnalysesIDScores = ({
  scores,
}: {
  scores: AnalysisData['scores'];
}) => {
  return (
    <section className='border-border-subtle border-b p-5'>
      <h2 className='text-foreground-subtle mb-3 text-xs font-semibold tracking-[1.5px]'>
        SCORES
      </h2>
      <div className='grid grid-cols-2 gap-2.5'>
        {scores.map((score) => (
          <DashboardAnalysesIDScoresCard
            key={score.key}
            score={score}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardAnalysesIDScores;
