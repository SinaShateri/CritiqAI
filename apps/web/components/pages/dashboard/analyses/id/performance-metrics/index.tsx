import { AnalysisData } from '../types';
import DashboardAnalysesIDPerformanceMetricsBar from './bar';

const DashboardAnalysesIDPerformanceMetrics = ({
  metrics,
}: {
  metrics: AnalysisData['metrics'];
}) => {
  return (
    <section className='p-5'>
      <h2 className='text-foreground-subtle mb-3 text-xs font-semibold tracking-[1.5px]'>
        PERFORMANCE METRICS
      </h2>
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
