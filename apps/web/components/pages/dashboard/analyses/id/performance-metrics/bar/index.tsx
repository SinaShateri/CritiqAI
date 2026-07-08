import { AnalysisData } from '../../types';

const metricToneColor: Record<AnalysisData['metrics'][number]['tone'], string> =
  {
    good: 'rgb(62, 207, 142)',
    warn: 'rgb(244, 168, 35)',
    bad: 'rgb(226, 87, 87)',
  };

const DashboardAnalysesIDPerformanceMetricsBar = ({
  metric,
}: {
  metric: AnalysisData['metrics'][number];
}) => (
  <div className='mb-2.5 flex items-center gap-2.5 last:mb-0'>
    <span className='text-body w-10 shrink-0 text-[12px]'>{metric.label}</span>
    <div className='bg-border-subtle h-1 flex-1 overflow-hidden rounded-sm'>
      <div
        className='h-full rounded-sm transition-[width] duration-600 ease-out'
        style={{
          width: `${metric.percent}%`,
          background: metricToneColor[metric.tone],
        }}
      />
    </div>
    <span
      className='w-9 shrink-0 text-right text-[11px]'
      style={{ color: metricToneColor[metric.tone] }}
    >
      {metric.value}
    </span>
  </div>
);

export default DashboardAnalysesIDPerformanceMetricsBar;
