import HomeFeatureCard from './card';
import { homeFeatures } from './utils';
import SectionHeader from '@repo/ui/section-header';

const HomeFeatures = () => {
  return (
    <section
      id='features'
      className='px-6 py-14'
    >
      <div className='mx-auto max-w-225'>
        <SectionHeader eyebrow='Features' title='Everything your site needs to be critiqued' titleClassName='text-2xl font-medium' />

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
