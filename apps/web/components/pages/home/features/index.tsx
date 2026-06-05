import HomeFeatureCard from './card';
import { homeFeatures } from './utils';

const HomeFeatures = () => {
  return (
    <section
      id='features'
      className='px-6 py-14'
    >
      <div className='mx-auto max-w-225'>
        <div className='mb-2 text-[11px] tracking-[1.5px] text-brand'>
          FEATURES
        </div>

        <h2 className='text-[26px] font-medium text-heading-soft'>
          Everything your site needs to be critiqued
        </h2>

        <div className='mt-7 grid grid-cols-1 gap-3 md:grid-cols-2'>
          {homeFeatures.map((feature) => (
            <HomeFeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
