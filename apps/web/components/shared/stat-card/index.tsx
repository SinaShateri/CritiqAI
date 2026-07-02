type StatCardProps = {
  title: string;
  value: number;
  change: string;
  color: string;
  delay: string;
};

const StatCard = ({ value, title, change, color, delay }: StatCardProps) => {
  return (
    <div
      className={`animate-fade-up border-border-subtle bg-surface rounded-lg border px-4 py-3.5 ${delay}`}
    >
      <div className='text-heading text-[22px] leading-none font-medium'>
        {value}
      </div>

      <div className='text-faint mt-1 text-[11px]'>{title}</div>

      <div className={`mt-1.25 text-[11px] ${color}`}>{change}</div>
    </div>
  );
};

export default StatCard;
