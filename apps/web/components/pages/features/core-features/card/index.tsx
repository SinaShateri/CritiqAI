import Badge from '@repo/ui/badge';
import { CategoryKey } from '../category/tab';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  /** Filter bucket this card belongs to. 'all' cards only show under the "All" tab. */
  category: CategoryKey;
  /** Label shown on the badge — kept separate from `category` since a few cards are
   *  cross-cutting and are labelled "All" even though the grid itself supports filtering. */
  badgeLabel: string;
}

const FeaturesCoreFeaturesCard = ({ feature }: { feature: Feature }) => {
  return (
    <div className='border-border bg-surface hover:border-border-strong rounded-lg border p-5 transition-colors'>
      <div className='bg-surface-raised mb-3 flex h-8 w-8 items-center justify-center rounded-lg'>
        {feature.icon}
      </div>
      <h3 className='text-foreground text-sm font-medium'>{feature.title}</h3>
      <p className='text-foreground-muted mt-1.25 text-sm leading-[1.65]'>
        {feature.description}
      </p>
      <div className='mt-2.5'>
        <Badge variant='primary'>{feature.badgeLabel}</Badge>
      </div>
    </div>
  );
};

export default FeaturesCoreFeaturesCard;
