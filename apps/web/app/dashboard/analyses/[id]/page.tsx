'use client';

import { useMemo, useState } from 'react';
import DashboardAnalysesIDHeading from '../../../../components/pages/dashboard/analyses/id/heading';
import DashboardAnalysesIDScores from '../../../../components/pages/dashboard/analyses/id/scores';
import DashboardAnalysesIDScreenshot from '../../../../components/pages/dashboard/analyses/id/screenshot';
import DashboardAnalysesIDSteps from '../../../../components/pages/dashboard/analyses/id/steps';
import { AnalysisStep } from '../../../../components/pages/dashboard/analyses/id/steps/indicator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Severity = 'critical' | 'warning' | 'info';
type Impact = 'high' | 'medium';

interface ScoreItem {
  key: string;
  label: string;
  value: number;
  detail: string;
}

interface IssueItem {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  tag: string;
}

interface AIFeedbackSection {
  id: string;
  title: string;
  content: string;
}

interface QuickWin {
  id: string;
  title: string;
  description: string;
  impact: Impact;
}

interface MetricItem {
  key: string;
  label: string;
  value: string;
  percent: number; // 0-100, position of the bar fill
  tone: 'good' | 'warn' | 'bad';
}

export interface AnalysisData {
  url: string;
  siteTitle: string;
  siteTagline: string;
  steps: AnalysisStep[];
  scores: ScoreItem[];
  issues: IssueItem[];
  aiFeedback: AIFeedbackSection[];
  quickWins: QuickWin[];
  metrics: MetricItem[];
}

// ---------------------------------------------------------------------------
// Mock data — swap this for a fetched AnalysisData object from the API
// ---------------------------------------------------------------------------

const mockAnalysis: AnalysisData = {
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

// ---------------------------------------------------------------------------
// Style lookup helpers (single source of truth for the colour tokens)
// ---------------------------------------------------------------------------

const severityStyles: Record<
  Severity,
  { dot: string; badgeBg: string; badgeText: string; label: string }
> = {
  critical: {
    dot: 'rgb(226, 87, 87)',
    badgeBg: '#160d0d',
    badgeText: '#e25757',
    label: 'Critical',
  },
  warning: {
    dot: 'rgb(244, 168, 35)',
    badgeBg: '#160f08',
    badgeText: '#f4a823',
    label: 'Warning',
  },
  info: {
    dot: 'rgb(74, 79, 98)',
    badgeBg: '#111318',
    badgeText: '#4a4f62',
    label: 'Info',
  },
};

const impactStyles: Record<
  Impact,
  { bg: string; text: string; label: string }
> = {
  high: { bg: '#0e2218', text: '#3ecf8e', label: 'High impact' },
  medium: { bg: '#221a0c', text: '#f4a823', label: 'Medium impact' },
};

const metricToneColor: Record<MetricItem['tone'], string> = {
  good: 'rgb(62, 207, 142)',
  warn: 'rgb(244, 168, 35)',
  bad: 'rgb(226, 87, 87)',
};

// ---------------------------------------------------------------------------
// Small presentational subcomponents
// ---------------------------------------------------------------------------

const IssueRow = ({ issue }: { issue: IssueItem }) => {
  const style = severityStyles[issue.severity];
  return (
    <div className='-mx-1 flex items-start gap-2.5 border-b border-[#141618] px-1 py-2.5 transition-colors hover:bg-[#111318]'>
      <span
        className='mt-[5px] h-[5px] w-[5px] flex-shrink-0 rounded-full'
        style={{ background: style.dot }}
      />
      <div className='min-w-0 flex-1'>
        <div className='text-[12px] font-medium text-[#c8cad4]'>
          {issue.title}
        </div>
        <div className='mt-[3px] text-[11px] leading-[1.5] text-[#3f4254]'>
          {issue.description}
        </div>
      </div>
      <span
        className='flex-shrink-0 rounded-lg px-2 py-[2px] text-[10px]'
        style={{ background: style.badgeBg, color: style.badgeText }}
      >
        {issue.tag}
      </span>
    </div>
  );
};

const AIFeedbackBlock = ({
  section,
  isFirst,
}: {
  section: AIFeedbackSection;
  isFirst: boolean;
}) => (
  <div className={isFirst ? '' : 'border-t border-[#1e2028] pt-3.5'}>
    <div className='mb-1.5 text-[11px] font-medium text-[#7c6df0]'>
      {section.title}
    </div>
    <div className='text-[12px] leading-[1.75] text-[#6b7080]'>
      {section.content}
    </div>
  </div>
);

const QuickWinRow = ({ win, index }: { win: QuickWin; index: number }) => {
  const impact = impactStyles[win.impact];
  return (
    <div className='animate-fade-up flex items-start gap-2.5 border-b border-[#141618] py-2.5 last:border-b-0'>
      <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[5px] bg-[#1a1c2e] text-[11px] font-medium text-[#7c6df0]'>
        {index + 1}
      </div>
      <div className='min-w-0 flex-1'>
        <div className='text-[12px] font-medium text-[#c8cad4]'>
          {win.title}
        </div>
        <div className='mt-[3px] text-[11px] leading-[1.5] text-[#3f4254]'>
          {win.description}
        </div>
        <span
          className='mt-[5px] inline-block rounded-lg px-2 py-[2px] text-[10px]'
          style={{ background: impact.bg, color: impact.text }}
        >
          {impact.label}
        </span>
      </div>
    </div>
  );
};

const MetricBar = ({ metric }: { metric: MetricItem }) => (
  <div className='mb-2.5 flex items-center gap-2.5 last:mb-0'>
    <span className='w-10 flex-shrink-0 text-[12px] text-[#6b7080]'>
      {metric.label}
    </span>
    <div className='h-1 flex-1 overflow-hidden rounded-sm bg-[#1e2028]'>
      <div
        className='h-full rounded-sm transition-[width] duration-[600ms] ease-out'
        style={{
          width: `${metric.percent}%`,
          background: metricToneColor[metric.tone],
        }}
      />
    </div>
    <span
      className='w-9 flex-shrink-0 text-right text-[11px]'
      style={{ color: metricToneColor[metric.tone] }}
    >
      {metric.value}
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

type FilterKey = 'all' | Severity;

const Page = ({ data = mockAnalysis }: { data?: AnalysisData }) => {
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = useMemo(() => {
    return data.issues.reduce(
      (acc, issue) => {
        acc.all += 1;
        acc[issue.severity] += 1;
        return acc;
      },
      { all: 0, critical: 0, warning: 0, info: 0 } as Record<FilterKey, number>,
    );
  }, [data.issues]);

  const filteredIssues = useMemo(
    () =>
      filter === 'all'
        ? data.issues
        : data.issues.filter((issue) => issue.severity === filter),
    [data.issues, filter],
  );

  const filterTabs: {
    key: FilterKey;
    label: string;
    badgeBg?: string;
    badgeText?: string;
    border?: string;
  }[] = [
    { key: 'all', label: 'All' },
    { key: 'critical', label: 'Critical' },
    { key: 'warning', label: 'Warning' },
    { key: 'info', label: 'Info' },
  ];

  return (
    <div className='bg-bg flex min-h-screen w-full flex-col'>
      <DashboardAnalysesIDHeading url={data.url} />

      <DashboardAnalysesIDSteps steps={data.steps} />

      <div className='flex flex-1 flex-col md:h-[calc(100vh-108px)] md:flex-row'>
        <div className='md:border-border-subtle flex-1 md:overflow-y-auto md:border-r'>
          <DashboardAnalysesIDScores scores={data.scores} />

          <DashboardAnalysesIDScreenshot
            siteTagline={data.siteTagline}
            siteTitle={data.siteTitle}
            url={data.url}
          />

          <section className='p-5'>
            <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
              ISSUES
            </div>
            <div className='mb-3 flex flex-wrap gap-1.5'>
              {filterTabs.map((tab) => {
                const active = filter === tab.key;
                const style =
                  tab.key === 'all'
                    ? null
                    : severityStyles[tab.key as Severity];
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className='rounded-[10px] border px-2.5 py-[3px] text-[11px] transition-colors'
                    style={
                      active
                        ? tab.key === 'all'
                          ? {
                              borderColor: '#7c6df0',
                              background: '#7c6df0',
                              color: 'white',
                            }
                          : {
                              borderColor: style!.badgeText,
                              background: style!.badgeBg,
                              color: style!.badgeText,
                            }
                        : {
                            borderColor: '#1e2028',
                            background: '#111318',
                            color: '#4a4f62',
                          }
                    }
                  >
                    {tab.label} ({counts[tab.key]})
                  </button>
                );
              })}
            </div>
            <div className='max-h-[280px] overflow-y-auto pr-1'>
              {filteredIssues.map((issue) => (
                <IssueRow
                  key={issue.id}
                  issue={issue}
                />
              ))}
            </div>
          </section>
        </div>

        <div className='w-full md:w-[380px] md:overflow-y-auto'>
          <section className='border-b border-[#1e2028] p-5'>
            <div className='mb-3 flex items-center justify-between'>
              <div className='flex items-center gap-1.5 rounded-[10px] bg-[#1a1c2e] px-2.5 py-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='13'
                  height='13'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-sparkles text-[#7c6df0]'
                  aria-hidden='true'
                >
                  <path d='M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z' />
                  <path d='M20 2v4' />
                  <path d='M22 4h-4' />
                  <circle
                    cx='4'
                    cy='20'
                    r='2'
                  />
                </svg>
                <span className='text-[11px] text-[#7c6df0]'>AI feedback</span>
              </div>
              <span className='text-[11px] text-[#2e3148]'>GPT-4o Vision</span>
            </div>
            <div className='space-y-3.5 rounded-lg border border-[#1e2028] bg-[#111318] p-3.5'>
              {data.aiFeedback.map((section, index) => (
                <AIFeedbackBlock
                  key={section.id}
                  section={section}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </section>

          <section className='border-b border-[#1e2028] p-5'>
            <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
              QUICK WINS
            </div>
            <div>
              {data.quickWins.map((win, index) => (
                <QuickWinRow
                  key={win.id}
                  win={win}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section className='p-5'>
            <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
              PERFORMANCE METRICS
            </div>
            {data.metrics.map((metric) => (
              <MetricBar
                key={metric.key}
                metric={metric}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
