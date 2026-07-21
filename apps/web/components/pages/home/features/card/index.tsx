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
      className='animate-fade-up rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-strong'
      style={{ animationDelay: delay }}
    >
      <Icon className='mb-3 text-brand' />

      <h3 className='text-sm font-medium text-foreground'>{title}</h3>

      <p className='mt-1 text-sm leading-[1.6] text-foreground-muted'>
        {description}
      </p>
    </div>
  );
};

export default HomeFeatureCard;
