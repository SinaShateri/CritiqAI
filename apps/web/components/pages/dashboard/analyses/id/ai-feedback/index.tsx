import { IconSparkles } from '@tabler/icons-react';
import { AnalysisData } from '../types';
import DashboardAnalysesIDAIFeedbackBlock from './block';

const DashboardAnalysesIDAIFeedback = ({
  aiFeedback,
}: {
  aiFeedback: AnalysisData['aiFeedback'];
}) => {
  return (
    <section className='border-border-subtle border-b p-5'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='bg-surface-raised flex items-center gap-1.5 rounded-xl px-2.5 py-1'>
          <IconSparkles
            className='text-brand'
            size={18}
          />
          <span className='text-brand text-[11px]'>AI feedback</span>
        </div>
        <span className='text-foreground-subtle text-xs'>GPT-4o Vision</span>
      </div>
      <div className='border-border-subtle bg-surface space-y-3.5 rounded-lg border p-3.5'>
        {aiFeedback.map((section, index) => (
          <DashboardAnalysesIDAIFeedbackBlock
            key={section.id}
            section={section}
            isFirst={index === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardAnalysesIDAIFeedback;
