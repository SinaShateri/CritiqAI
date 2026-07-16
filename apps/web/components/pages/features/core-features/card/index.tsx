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
    <div className='border-border-subtle bg-surface rounded-lg border p-5 transition-colors hover:border-[#2e3148]'>
      <div className='mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1c2e]'>
        {feature.icon}
      </div>
      <h3 className='text-heading-soft text-[14px] font-medium'>
        {feature.title}
      </h3>
      <p className='mt-1.25 text-[13px] leading-[1.65] text-[#4a4f62]'>
        {feature.description}
      </p>
      <span className='text-brand mt-2.5 inline-block rounded-lg bg-[#1a1c2e] px-2 py-0.5 text-[10px]'>
        {feature.badgeLabel}
      </span>
    </div>
  );
};

export default FeaturesCoreFeaturesCard;
