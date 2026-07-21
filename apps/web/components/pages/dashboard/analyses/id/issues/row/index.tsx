import Badge from '@repo/ui/badge';
import {
  severityRailStyles,
  type SeverityTone,
} from '@repo/ui/severity-styles';
import { AnalysisData, Severity } from '../../types';

const severityTone: Record<Severity, SeverityTone> = {
  critical: 'critical',
  warning: 'warn',
  info: 'info',
};

const IssueRow = ({ issue }: { issue: AnalysisData['issues'][number] }) => {
  const tone = severityTone[issue.severity];
  return (
    <article
      className={`border-border hover:bg-surface -mx-1 flex items-start gap-2.5 border-b border-l-[3px] px-3 py-3 transition-colors ${severityRailStyles[tone]}`}
    >
      <div className='min-w-0 flex-1'>
        <h3 className='text-foreground text-sm font-medium'>{issue.title}</h3>
        <p className='text-foreground-muted mt-1 text-xs leading-normal'>
          {issue.description}
        </p>
      </div>
      <Badge variant={tone}>{issue.tag}</Badge>
    </article>
  );
};
export default IssueRow;
