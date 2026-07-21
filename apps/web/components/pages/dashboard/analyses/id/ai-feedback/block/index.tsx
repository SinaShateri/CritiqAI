import { AnalysisData } from '../../types';

const DashboardAnalysesIDAIFeedbackBlock = ({
  section,
  isFirst,
}: {
  section: AnalysisData['aiFeedback'][number];
  isFirst: boolean;
}) => (
  <div className={isFirst ? '' : 'border-border-subtle border-t pt-3.5'}>
    <div className='text-brand mb-1.5 text-[11px] font-medium'>
      {section.title}
    </div>
    <div className='text-foreground-muted text-sm leading-[1.75]'>
      {section.content}
    </div>
  </div>
);

export default DashboardAnalysesIDAIFeedbackBlock;
