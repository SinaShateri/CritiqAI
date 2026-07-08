import { AnalysisData } from '../types';
import DashboardAnalysesIDQuickWinsRow from './row';

const DashboardAnalysesIDQuickWins = ({
  quickWins,
}: {
  quickWins: AnalysisData['quickWins'];
}) => {
  return (
    <section className='border-border-subtle border-b p-5'>
      <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
        QUICK WINS
      </div>
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
