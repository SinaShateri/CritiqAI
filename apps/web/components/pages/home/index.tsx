import HomeAnalytics from './analytics';
import HomeCTA from './cta';
import HomeFeatures from './features';
import HomeHero from './hero';
import HomeLivepreview from './live-preview';

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeAnalytics />
      <HomeFeatures />
      <HomeLivepreview />
      <HomeCTA />
    </main>
  );
}
