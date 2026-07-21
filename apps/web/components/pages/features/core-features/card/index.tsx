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
    <div className='rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-strong'>
      <div className='mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised'>
        {feature.icon}
      </div>
      <h3 className='text-sm font-medium text-foreground'>
        {feature.title}
      </h3>
      <p className='mt-1.25 text-sm leading-[1.65] text-foreground-muted'>
        {feature.description}
      </p>
      <div className='mt-2.5'><Badge variant='primary'>{feature.badgeLabel}</Badge></div>
    </div>
  );
};

export default FeaturesCoreFeaturesCard;
