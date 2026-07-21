import {
  IconBolt,
  IconCamera,
  IconDisabled2,
  IconFileCode,
  IconGauge,
  IconHistory,
  IconSearch,
  IconShare2,
  IconSparkles,
} from '@tabler/icons-react';
import { Feature } from './card';

export const FEATURES: Feature[] = [
  {
    id: 'lighthouse-audit',
    title: 'Lighthouse audit',
    description:
      'Full performance breakdown — FCP, LCP, CLS, TTI, TBT with scoring and benchmarks.',
    icon: <IconGauge />,
    category: 'performance',
    badgeLabel: 'Performance',
  },
  {
    id: 'seo-analysis',
    title: 'SEO analysis',
    description:
      'Meta tags, Open Graph, schema markup, heading hierarchy, canonical URLs, broken links.',
    icon: <IconSearch />,
    category: 'seo',
    badgeLabel: 'SEO',
  },
  {
    id: 'wcag-accessibility',
    title: 'WCAG accessibility',
    description:
      'axe-core powered — color contrast ratios, ARIA roles, keyboard navigation, focus order.',
    icon: <IconDisabled2 />,
    category: 'accessibility',
    badgeLabel: 'Accessibility',
  },
  {
    id: 'ai-redesign-suggestions',
    title: 'AI redesign suggestions',
    description:
      'GPT-4o Vision analyzes your screenshot and suggests concrete UX improvements.',
    icon: <IconSparkles />,
    category: 'ai',
    badgeLabel: 'AI Analysis',
  },
  {
    id: 'full-page-screenshot',
    title: 'Full-page screenshot',
    description:
      'Playwright captures your site at 1440px — exactly what real users see on desktop.',
    icon: <IconCamera />,
    category: 'performance',
    badgeLabel: 'Performance',
  },
  {
    id: 'shareable-reports',
    title: 'Shareable reports',
    description:
      'Public link for each report — share with clients or teammates, no login required.',
    icon: <IconShare2 />,
    category: 'all',
    badgeLabel: 'All',
  },
  {
    id: 'streaming-results',
    title: 'Streaming results',
    description:
      'Results stream in realtime as each check completes — no waiting for everything to finish.',
    icon: <IconBolt />,
    category: 'all',
    badgeLabel: 'All',
  },
  {
    id: 'json-export',
    title: 'JSON export',
    description:
      'Download the full analysis as JSON — integrate with your own tooling or CI/CD pipeline.',
    icon: <IconFileCode />,
    category: 'all',
    badgeLabel: 'All',
  },
  {
    id: 'analysis-history',
    title: 'Analysis history',
    description:
      'Every report is saved. Compare how your site improves over time.',
    icon: <IconHistory />,
    category: 'all',
    badgeLabel: 'All',
  },
];
