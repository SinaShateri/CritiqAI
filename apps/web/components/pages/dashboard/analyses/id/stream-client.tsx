"use client";

import { useEffect, useState } from 'react';
import DashboardAnalysesID from './index';
import { AnalysisData } from './types';

import { mockAnalysis } from './utils';

export default function StreamClient({ analysisId }: { analysisId: string }) {
  const [data, setData] = useState<AnalysisData>(mockAnalysis);

  useEffect(() => {
    if (!analysisId) return;

    const es = new EventSource(`/api/stream/${analysisId}`);

    es.addEventListener('progress', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data as string) as Record<string, unknown>;
        // optional: update step statuses if provided
        const stage = typeof payload?.stage === 'string' ? (payload.stage as string) : undefined;
        if (stage) {
          setData((d) => ({ ...d }));
        }
      } catch (err) {
        console.warn('Failed to parse progress event', err);
      }
    });

    es.addEventListener('screenshot', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data as string) as { url?: string };
        const url = payload?.url;
        if (url) setData((d) => ({ ...d, url }));
      } catch (err) {
        console.warn('Failed to parse screenshot event', err);
      }
    });

    es.addEventListener('lighthouse', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data as string) as unknown;
        type LHCategory = { score?: number };
        type LHReport = { categories?: { performance?: LHCategory; accessibility?: LHCategory; seo?: LHCategory } };

        const report =
          payload && typeof payload === 'object'
            ? ((payload as Record<string, unknown>)['report'] as LHReport | undefined)
            : undefined;

        const perf = report?.categories?.performance?.score ?? null;
        const a11y = report?.categories?.accessibility?.score ?? null;
        const seo = report?.categories?.seo?.score ?? null;

        setData((d) => ({
          ...d,
          scores: d.scores.map((s) => {
            if (s.key === 'performance') return { ...s, value: Math.round((perf ?? s.value) * 100) };
            if (s.key === 'accessibility') return { ...s, value: Math.round((a11y ?? s.value) * 100) };
            if (s.key === 'seo') return { ...s, value: Math.round((seo ?? s.value) * 100) };
            return s;
          }),
        }));
      } catch (err) {
        console.warn('Failed to parse lighthouse event', err);
      }
    });

    es.addEventListener('accessibility', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data as string) as { issues?: unknown };
        if (payload?.issues) setData((d) => ({ ...d, issues: payload.issues as unknown as AnalysisData['issues'] }));
      } catch (err) {
        console.warn('Failed to parse accessibility event', err);
      }
    });

    es.addEventListener('seo', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data as string) as { issues?: unknown };
        if (payload?.issues) setData((d) => ({ ...d, issues: payload.issues as unknown as AnalysisData['issues'] }));
      } catch (err) {
        console.warn('Failed to parse seo event', err);
      }
    });

    es.addEventListener('ai_feedback', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data as string) as { suggestions?: unknown };
        const suggestions = payload?.suggestions;
        const aiFeedback = Array.isArray(suggestions)
          ? suggestions.map((s: unknown, i: number) => {
              const so = s as Record<string, unknown>;
              const title = typeof so?.['title'] === 'string' ? (so['title'] as string) : 'Suggestion';
              const content = typeof so?.['content'] === 'string' ? (so['content'] as string) : JSON.stringify(so);
              return { id: String(i), title, content };
            })
          : [{ id: 'ai-1', title: 'AI Suggestions', content: JSON.stringify(suggestions) }];

        setData((d) => ({ ...d, aiFeedback }));
      } catch (err) {
        console.warn('Failed to parse ai_feedback event', err);
      }
    });

    es.addEventListener('complete', () => {
      // could fetch final full report here if endpoint exists
      es.close();
    });

    es.addEventListener('error', () => {
      // noop - EventSource will attempt reconnects
    });

    return () => {
      es.close();
    };
  }, [analysisId]);

  return <DashboardAnalysesID data={data} />;
}
