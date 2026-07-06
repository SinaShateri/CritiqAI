import { IconCheck } from '@tabler/icons-react';

type StepStatus = 'done' | 'active' | 'pending';

export interface AnalysisStep {
  key: string;
  label: string;
  status: StepStatus;
}

const DashboardAnalysesIDStepsIndicator = ({
  step,
  index,
}: {
  step: AnalysisStep;
  index: number;
}) => (
  <div className='flex flex-1 items-center last:flex-none'>
    <div className='flex flex-col items-center gap-1'>
      {step.status === 'done' ? (
        <div className='bg-brand flex h-5 w-5 items-center justify-center rounded-full'>
          <IconCheck
            size={16}
            className='text-white'
          />
        </div>
      ) : step.status === 'active' ? (
        <div className='border-brand flex h-5 w-5 items-center justify-center rounded-full border-2'>
          <span className='text-brand text-[10px] font-medium'>
            {index + 1}
          </span>
        </div>
      ) : (
        <div className='border-border-subtle flex h-5 w-5 items-center justify-center rounded-full border-2'>
          <span className='text-[10px] font-medium text-[#4a4f62]'>
            {index + 1}
          </span>
        </div>
      )}
      <span
        className={
          step.status === 'active'
            ? 'text-brand text-[11px]'
            : 'text-muted-text text-[11px]'
        }
      >
        {step.label}
      </span>
    </div>
    {index < 0 ? null : <div className='bg-brand mx-2 h-px flex-1' />}
  </div>
);

export default DashboardAnalysesIDStepsIndicator;
