import Badge from '@repo/ui/badge';
import {
  severityRailStyles,
  type SeverityTone,
} from '@repo/ui/severity-styles';
import { AnalysisData, Impact } from '../../types';

const impactTone: Record<Impact, SeverityTone> = {
  high: 'success',
  medium: 'warn',
};
const impactLabel: Record<Impact, string> = {
  high: 'High impact',
  medium: 'Medium impact',
};
const DashboardAnalysesIDQuickWinsRow = ({
  win,
  index,
}: {
  win: AnalysisData['quickWins'][number];
  index: number;
}) => {
  const tone = impactTone[win.impact];
  return (
    <article
      className={`animate-fade-up border-border flex items-start gap-2.5 border-b border-l-[3px] py-3 pl-2.5 last:border-b-0 ${severityRailStyles[tone]}`}
    >
      <div className='bg-surface-raised text-primary flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-xs font-medium'>
        {index + 1}
      </div>
      <div className='min-w-0 flex-1'>
        <h3 className='text-foreground text-sm font-medium'>{win.title}</h3>
        <p className='text-foreground-muted mt-1 text-xs leading-normal'>
          {win.description}
        </p>
        <div className='mt-2'>
          <Badge variant={tone}>{impactLabel[win.impact]}</Badge>
        </div>
      </div>
    </article>
  );
};
export default DashboardAnalysesIDQuickWinsRow;
