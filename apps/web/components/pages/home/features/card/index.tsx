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
      className='animate-fade-up border-border bg-surface hover:border-border-strong rounded-lg border p-5 transition-colors'
      style={{ animationDelay: delay }}
    >
      <Icon className='text-brand mb-3' />

      <h3 className='text-foreground text-sm font-medium'>{title}</h3>

      <p className='text-foreground-muted mt-1 text-sm leading-[1.6]'>
        {description}
      </p>
    </div>
  );
};

export default HomeFeatureCard;
