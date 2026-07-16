'use client';

import { useMemo, useState } from 'react';
import FeaturesCoreFeaturesCard from './card';
import FeaturesCoreFeaturesCategory from './category';
import { CategoryKey } from './category/tab';
import { FEATURES } from './utils';

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
          <div className='mb-2 text-[11px] tracking-[1.5px] text-[#4a4f62]'>
            CORE FEATURES
          </div>
          <h2 className='text-heading-soft mb-7 text-[26px] font-medium'>
            What CritiqAI checks
          </h2>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
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
