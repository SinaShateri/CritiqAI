// ---------------------------------------------------------------------------
// Mock data — swap this for a fetched AnalysisData object from the API
// ---------------------------------------------------------------------------

import { AnalysisData } from './types';

export const mockAnalysis: AnalysisData = {
  url: 'https://stripe.com',
  siteTitle: 'stripe.com',
  siteTagline: 'Financial infrastructure for the internet',
  steps: [
    { key: 'scraping', label: 'Scraping', status: 'done' },
    { key: 'lighthouse', label: 'Lighthouse', status: 'done' },
    { key: 'ai', label: 'AI Analysis', status: 'done' },
    { key: 'seo', label: 'SEO', status: 'done' },
    { key: 'report', label: 'Report', status: 'active' },
  ],
  scores: [
    {
      key: 'performance',
      label: 'Performance',
      value: 94,
      detail: 'FCP 1.2s · LCP 2.1s',
    },
    { key: 'seo', label: 'SEO', value: 88, detail: '5 violations' },
    {
      key: 'accessibility',
      label: 'Accessibility',
      value: 71,
      detail: '7 violations',
    },
    { key: 'ux', label: 'UX Score', value: 79, detail: 'Heuristic eval' },
  ],
  issues: [
    {
      id: 'lcp',
      severity: 'critical',
      title: 'Largest Contentful Paint over 2.5s',
      description:
        'Hero image is 1.4MB unoptimized JPEG. Convert to WebP and serve responsive sizes.',
      tag: 'Perf',
    },
    {
      id: 'alt-text',
      severity: 'critical',
      title: 'Missing alt text on 8 images',
      description:
        'Screen readers skip these images entirely. Add descriptive alt attributes.',
      tag: 'A11y',
    },
    {
      id: 'https-redirect',
      severity: 'critical',
      title: 'No HTTPS redirect configured',
      description:
        "Plain http:// requests don't auto-upgrade. Set up 301 redirect at edge.",
      tag: 'SEO',
    },
    {
      id: 'render-blocking-css',
      severity: 'warning',
      title: 'Render-blocking stylesheet (124kb)',
      description:
        'Inline critical CSS and defer the rest to unblock first paint.',
      tag: 'Perf',
    },
    {
      id: 'cls',
      severity: 'warning',
      title: 'Cumulative layout shift 0.18',
      description:
        'Banner injection pushes hero down 80px after load. Reserve space.',
      tag: 'UX',
    },
    {
      id: 'cta-contrast',
      severity: 'warning',
      title: 'Low contrast on CTA button',
      description: '#7c6df0 on #f5f5f5 fails WCAG AA (3.8:1, needs 4.5:1).',
      tag: 'A11y',
    },
    {
      id: 'meta-description',
      severity: 'warning',
      title: 'Meta description exceeds 160 chars',
      description: 'Truncated in SERPs. Trim to 150 chars maximum.',
      tag: 'SEO',
    },
    {
      id: 'touch-targets',
      severity: 'warning',
      title: 'Touch targets smaller than 44px',
      description: 'Footer links are 28px tall. iOS HIG requires 44px minimum.',
      tag: 'Mobile',
    },
    {
      id: 'og-image',
      severity: 'warning',
      title: 'No Open Graph image set',
      description:
        'Shares to social show a blank preview. Add og:image at 1200x630.',
      tag: 'SEO',
    },
    {
      id: 'third-party-js',
      severity: 'warning',
      title: 'Third-party scripts blocking main thread',
      description:
        'Analytics + chat widget = 1.2s of JS execution. Lazy-load post-interaction.',
      tag: 'Perf',
    },
    {
      id: 'heading-hierarchy',
      severity: 'warning',
      title: 'Heading hierarchy skips levels',
      description:
        'Page jumps from H1 to H3 inside hero. Insert an H2 or restructure.',
      tag: 'A11y',
    },
    {
      id: 'form-labels',
      severity: 'warning',
      title: 'Form fields missing labels',
      description:
        'Newsletter input uses placeholder as label. Add visible <label>.',
      tag: 'A11y',
    },
    {
      id: 'cache-policy',
      severity: 'warning',
      title: 'Inefficient cache policy on static assets',
      description:
        'Logo SVG has Cache-Control: no-cache. Set immutable max-age=31536000.',
      tag: 'Perf',
    },
    {
      id: 'mixed-content',
      severity: 'warning',
      title: 'Mixed content warnings in console',
      description: 'Two images loaded over http on an https page.',
      tag: 'Security',
    },
    {
      id: 'sitemap',
      severity: 'info',
      title: 'Sitemap.xml not linked in robots.txt',
      description: 'Crawlers find it slower. Add Sitemap: directive.',
      tag: 'SEO',
    },
    {
      id: 'favicon',
      severity: 'info',
      title: 'Favicon missing for 32x32 size',
      description:
        'Browser falls back to scaled 16x16. Provide a sharper variant.',
      tag: 'UX',
    },
    {
      id: 'preconnect',
      severity: 'info',
      title: 'No preconnect to font CDN',
      description: "Saves ~120ms on font load. Add <link rel='preconnect'>.",
      tag: 'Perf',
    },
    {
      id: 'lang-attribute',
      severity: 'info',
      title: 'Language attribute missing on <html>',
      description: "Set lang='en' for assistive tech and translation.",
      tag: 'A11y',
    },
    {
      id: 'structured-data',
      severity: 'info',
      title: 'No structured data found',
      description:
        'Consider Organization or WebSite schema for richer SERP results.',
      tag: 'SEO',
    },
    {
      id: 'inline-handlers',
      severity: 'info',
      title: 'Inline event handlers detected',
      description: 'Move onclick attributes into JS for CSP compatibility.',
      tag: 'Security',
    },
    {
      id: 'console-errors',
      severity: 'info',
      title: 'Console errors on load',
      description:
        "1 uncaught TypeError from third-party widget. Doesn't break the page.",
      tag: 'Bug',
    },
    {
      id: 'image-dimensions',
      severity: 'info',
      title: 'Image dimensions not specified',
      description: "Browsers can't reserve space, contributing to CLS.",
      tag: 'UX',
    },
    {
      id: 'robots-txt',
      severity: 'info',
      title: 'robots.txt allows all crawlers',
      description: "Confirm staging environments aren't using the same file.",
      tag: 'SEO',
    },
  ],
  aiFeedback: [
    {
      id: 'ux-critique',
      title: 'UX critique',
      content:
        'The hero immediately tries to do three things — pitch the product, capture an email, and surface a demo video — and ends up doing none of them well. Eyes land on the headline but the gradient behind it fights the white text, dropping contrast. The CTA sits below the fold on mobile, which is the opposite of what your analytics say users want. Consider committing to one primary action and pushing secondary actions into the section below.',
    },
    {
      id: 'performance-bottlenecks',
      title: 'Performance bottlenecks',
      content:
        'Performance is bottlenecked almost entirely by render-blocking resources. The 124kb stylesheet and 1.4mb hero image account for ~83% of LCP time. Splitting the stylesheet into a critical inline chunk plus a deferred bundle, and serving the hero as a responsive WebP set, would move LCP from 4.2s into the green band under 2.5s on a Moto G4 / 4G profile.',
    },
    {
      id: 'redesign-suggestions',
      title: 'Redesign suggestions',
      content:
        'Tighten the visual hierarchy: cap the headline at two lines, increase weight contrast between H1 and subhead, and let the CTA breathe with at least 32px of surrounding space. The current 12-column grid is underused — collapsing the feature row from four columns to three would let each card carry an icon, a stronger header, and one supporting sentence without feeling cramped on tablet widths.',
    },
  ],
  quickWins: [
    {
      id: 'webp-hero',
      title: 'Convert hero JPEG to WebP',
      description: 'Cuts ~900kb, improves LCP by an estimated 1.1s.',
      impact: 'high',
    },
    {
      id: 'inline-css',
      title: 'Inline critical CSS',
      description: 'Removes 240ms of render-blocking on first paint.',
      impact: 'high',
    },
    {
      id: 'alt-text-fix',
      title: 'Add alt text to product images',
      description: 'Fixes 8 accessibility violations in one pass.',
      impact: 'medium',
    },
    {
      id: 'og-image-fix',
      title: 'Set og:image meta tag',
      description: 'Social shares will render a real preview card.',
      impact: 'medium',
    },
    {
      id: 'lazy-chat',
      title: 'Lazy-load chat widget',
      description: 'Defers 320kb of JS until user is idle.',
      impact: 'medium',
    },
  ],
  metrics: [
    { key: 'fcp', label: 'FCP', value: '1.2s', percent: 40, tone: 'good' },
    { key: 'lcp', label: 'LCP', value: '2.1s', percent: 52.5, tone: 'good' },
    { key: 'cls', label: 'CLS', value: '0.08', percent: 32, tone: 'good' },
    { key: 'tti', label: 'TTI', value: '3.4s', percent: 46.5753, tone: 'good' },
    { key: 'tbt', label: 'TBT', value: '240ms', percent: 40, tone: 'warn' },
  ],
};
