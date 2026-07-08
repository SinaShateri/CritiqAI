import { AnalysisData } from '../types';
import DashboardAnalysesIDStepsIndicator from './indicator';

const DashboardAnalysesIDSteps = ({
  steps,
}: {
  steps: AnalysisData['steps'];
}) => {
  return (
    <div className='border-border-subtle flex h-14 flex-col justify-center border-b bg-[#0a0c10] px-6'>
      <div className='flex items-center'>
        {steps.map((step, index) => (
          <DashboardAnalysesIDStepsIndicator
            key={step.key}
            step={step}
            index={index}
          />
        ))}
      </div>
      <div className='bg-border-subtle mt-1.5 h-0.75 overflow-hidden rounded-sm'>
        <div
          className='bg-brand h-full rounded-sm transition-[width] duration-400 ease-out'
          style={{
            width: `${(steps.filter((s) => s.status === 'done').length / steps.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardAnalysesIDSteps;
