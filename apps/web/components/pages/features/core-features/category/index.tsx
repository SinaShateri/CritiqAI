import { Dispatch, SetStateAction } from 'react';
import FeaturesCoreFeaturesCategoryTab, { Category, CategoryKey } from './tab';

const CATEGORIES: Category[] = [
  { key: 'all', label: 'All' },
  { key: 'performance', label: 'Performance' },
  { key: 'seo', label: 'SEO' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'ai', label: 'AI Analysis' },
];

const FeaturesCoreFeaturesCategory = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: CategoryKey;
  setActiveCategory: Dispatch<SetStateAction<CategoryKey>>;
}) => {
  return (
    <section className='border-border-subtle border-b px-6 py-5'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {CATEGORIES.map((category) => (
          <FeaturesCoreFeaturesCategoryTab
            key={category.key}
            category={category}
            active={activeCategory === category.key}
            onSelect={setActiveCategory}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesCoreFeaturesCategory;
