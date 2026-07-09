import { severityStyles } from '..';
import { AnalysisData, Severity } from '../../types';

const IssueRow = ({ issue }: { issue: AnalysisData['issues'][number] }) => {
  const style = severityStyles[issue.severity as Severity];

  return (
    <div className='hover:bg-surface -mx-1 flex items-start gap-2.5 border-b border-[#141618] px-1 py-2.5 transition-colors'>
      <span
        className='mt-1.25 h-1.25 w-1.25 shrink-0 rounded-full'
        style={{ background: style.dot }}
      />
      <div className='min-w-0 flex-1'>
        <div className='text-heading-soft text-[12px] font-medium'>
          {issue.title}
        </div>
        <div className='text-faint mt-0.75 text-[11px] leading-normal'>
          {issue.description}
        </div>
      </div>
      <span
        className='shrink-0 rounded-lg px-2 py-0.5 text-[10px]'
        style={{ background: style.badgeBg, color: style.badgeText }}
      >
        {issue.tag}
      </span>
    </div>
  );
};

export default IssueRow;
