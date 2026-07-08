import { AnalysisData, Impact } from "../../types";

const impactStyles: Record<
  Impact,
  { bg: string; text: string; label: string }
> = {
  high: { bg: '#0e2218', text: '#3ecf8e', label: 'High impact' },
  medium: { bg: '#221a0c', text: '#f4a823', label: 'Medium impact' },
};

const DashboardAnalysesIDQuickWinsRow = ({
  win,
  index,
}: {
  win: AnalysisData['quickWins'][number];
  index: number;
}) => {
  const impact = impactStyles[win.impact];

  return (
    <div className='animate-fade-up flex items-start gap-2.5 border-b border-[#141618] py-2.5 last:border-b-0'>
      <div className='text-brand flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-[#1a1c2e] text-[11px] font-medium'>
        {index + 1}
      </div>
      <div className='min-w-0 flex-1'>
        <div className='text-heading-soft text-[12px] font-medium'>
          {win.title}
        </div>
        <div className='text-faint mt-0.75 text-[11px] leading-normal'>
          {win.description}
        </div>
        <span
          className='mt-1.25 inline-block rounded-lg px-2 py-0.5 text-[10px]'
          style={{ background: impact.bg, color: impact.text }}
        >
          {impact.label}
        </span>
      </div>
    </div>
  );
};

export default DashboardAnalysesIDQuickWinsRow;
