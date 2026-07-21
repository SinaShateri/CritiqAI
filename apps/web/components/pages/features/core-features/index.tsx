'use client';

import { useMemo, useState } from 'react';
import FeaturesCoreFeaturesCard from './card';
import FeaturesCoreFeaturesCategory from './category';
import { CategoryKey } from './category/tab';
import { FEATURES } from './utils';
import SectionHeader from '@repo/ui/section-header';

const FeaturesCoreFeatures = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const visibleFeatures = useMemo(
    () =>
      activeCategory === 'all'
        ? FEATURES
        : FEATURES.filter((f) => f.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <FeaturesCoreFeaturesCategory
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className='border-border-subtle border-b px-6 py-14'>
        <div className='mx-auto max-w-240'>
          <SectionHeader
            eyebrow='Core features'
            title='What CritiqAI checks'
            titleClassName='text-2xl font-medium'
          />
          <div
            id='feature-results'
            role='tabpanel'
            aria-label='Feature results'
            className='mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'
          >
            {visibleFeatures.map((feature) => (
              <FeaturesCoreFeaturesCard
                key={feature.id}
                feature={feature}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesCoreFeatures;
