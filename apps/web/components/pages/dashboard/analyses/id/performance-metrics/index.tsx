import { AnalysisData } from '../types';
import DashboardAnalysesIDPerformanceMetricsBar from './bar';

const DashboardAnalysesIDPerformanceMetrics = ({
  metrics,
}: {
  metrics: AnalysisData['metrics'];
}) => {
  return (
    <section className='p-5'>
      <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
        PERFORMANCE METRICS
      </div>
      {metrics.map((metric) => (
        <DashboardAnalysesIDPerformanceMetricsBar
          key={metric.key}
          metric={metric}
        />
      ))}
    </section>
  );
};

export default DashboardAnalysesIDPerformanceMetrics;
