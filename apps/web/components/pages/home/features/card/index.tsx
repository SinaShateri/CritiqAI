import { FeatureItem } from '../utils';

type FeatureCardProps = FeatureItem;

const HomeFeatureCard = ({
  title,
  description,
  icon: Icon,
  delay,
}: FeatureCardProps) => {
  return (
    <div
      className='animate-fade-up rounded-lg border border-border-subtle bg-surface p-5 transition-colors hover:border-[#2e3148]'
      style={{ animationDelay: delay }}
    >
      <Icon className='mb-3 text-brand' />

      <h3 className='text-[14px] font-medium text-heading-soft'>{title}</h3>

      <p className='mt-1 leading-[1.6] text-[13px] text-muted-text'>
        {description}
      </p>
    </div>
  );
};

export default HomeFeatureCard;
