import { AnalysisData } from '../types';
import DashboardAnalysesIDQuickWinsRow from './row';

const DashboardAnalysesIDQuickWins = ({
  quickWins,
}: {
  quickWins: AnalysisData['quickWins'];
}) => {
  return (
    <section className='border-border-subtle border-b p-5'>
      <h2 className='text-foreground-subtle mb-3 text-xs font-semibold tracking-[1.5px]'>
        QUICK WINS
      </h2>
      <div>
        {quickWins.map((win, index) => (
          <DashboardAnalysesIDQuickWinsRow
            key={win.id}
            win={win}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardAnalysesIDQuickWins;
