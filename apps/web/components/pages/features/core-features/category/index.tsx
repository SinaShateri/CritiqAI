import { Dispatch, SetStateAction } from 'react';
import { Tab, Tabs } from '@repo/ui/tabs';
import { Category, CategoryKey } from './tab';

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
      <Tabs
        value={activeCategory}
        onValueChange={(value) => setActiveCategory(value as CategoryKey)}
        label='Feature categories'
        panelId='feature-results'
        className='justify-center'
      >
        {CATEGORIES.map((category) => (
          <Tab
            key={category.key}
            value={category.key}
          >
            {category.label}
          </Tab>
        ))}
      </Tabs>
    </section>
  );
};

export default FeaturesCoreFeaturesCategory;
