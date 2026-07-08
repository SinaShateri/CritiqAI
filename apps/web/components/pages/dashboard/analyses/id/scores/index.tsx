import { AnalysisData } from '../types';
import DashboardAnalysesIDScoresCard from './card';

const DashboardAnalysesIDScores = ({
  scores,
}: {
  scores: AnalysisData['scores'];
}) => {
  return (
    <section className='border-border-subtle border-b p-5'>
      <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
        SCORES
      </div>
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
