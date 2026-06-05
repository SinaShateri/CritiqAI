import {
  IconBrandSpeedtest,
  IconDisabled2,
  IconSearch,
  IconWand,
  type Icon,
} from '@tabler/icons-react';

export type FeatureItem = {
  title: string;
  description: string;
  icon: Icon;
  delay: string;
};

export const homeFeatures: FeatureItem[] = [
  {
    title: 'Lighthouse audit',
    description:
      'Full performance breakdown — FCP, LCP, CLS, TTI with scoring.',
    icon: IconBrandSpeedtest,
    delay: '0s',
  },
  {
    title: 'SEO analysis',
    description: 'Meta tags, Open Graph, schema markup, heading hierarchy.',
    icon: IconSearch,
    delay: '0.1s',
  },
  {
    title: 'Accessibility (WCAG)',
    description:
      'axe-core powered — contrast ratios, ARIA, keyboard navigation.',
    icon: IconDisabled2,
    delay: '0.2s',
  },
  {
    title: 'AI redesign suggestions',
    description:
      'GPT-4o Vision analyzes your screenshot and suggests UX improvements.',
    icon: IconWand,
    delay: '0.3s',
  },
];
