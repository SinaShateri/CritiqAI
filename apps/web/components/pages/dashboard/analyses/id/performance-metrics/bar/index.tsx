import { AnalysisData } from '../../types';

const toneClass: Record<AnalysisData['metrics'][number]['tone'], string> = {
  good: 'bg-success text-success',
  warn: 'bg-warn text-warn',
  bad: 'bg-error text-error',
};
const DashboardAnalysesIDPerformanceMetricsBar = ({
  metric,
}: {
  metric: AnalysisData['metrics'][number];
}) => (
  <div className='mb-2.5 flex items-center gap-2.5 last:mb-0'>
    <span className='text-foreground-muted w-10 shrink-0 text-xs'>
      {metric.label}
    </span>
    <div className='bg-border h-1 flex-1 overflow-hidden rounded-sm'>
      <div
        className={`h-full rounded-sm transition-[width] duration-600 ease-out ${toneClass[metric.tone].split(' ')[0]}`}
        style={{ width: `${metric.percent}%` }}
      />
    </div>
    <span
      className={`w-9 shrink-0 text-right font-mono text-xs ${toneClass[metric.tone].split(' ')[1]}`}
    >
      {metric.value}
    </span>
  </div>
);
export default DashboardAnalysesIDPerformanceMetricsBar;
