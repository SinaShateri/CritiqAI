'use client';

import { useMemo, useState } from 'react';
import { AnalysisData, Severity } from '../types';
import IssueRow from './row';

type FilterKey = 'all' | Severity;

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

export const severityStyles: Record<
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

const DashboardAnalysesIDIssues = ({
  issues,
}: {
  issues: AnalysisData['issues'];
}) => {
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = useMemo(() => {
    return issues.reduce(
      (acc, issue) => {
        acc.all += 1;
        acc[issue.severity] += 1;
        return acc;
      },
      { all: 0, critical: 0, warning: 0, info: 0 } as Record<FilterKey, number>,
    );
  }, [issues]);

  const filteredIssues = useMemo(
    () =>
      filter === 'all'
        ? issues
        : issues.filter((issue) => issue.severity === filter),
    [issues, filter],
  );

  return (
    <section className='p-5'>
      <div className='mb-3 text-[10px] font-medium tracking-[1.5px] text-[#4a4f62]'>
        ISSUES
      </div>
      <div className='mb-3 flex flex-wrap gap-1.5'>
        {filterTabs.map((tab) => {
          const active = filter === tab.key;
          const style =
            tab.key === 'all' ? null : severityStyles[tab.key as Severity];

          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className='rounded-xl border px-2.5 py-0.75 text-[11px] transition-colors'
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
      <div className='max-h-70 overflow-y-auto pr-1'>
        {filteredIssues.map((issue) => (
          <IssueRow
            key={issue.id}
            issue={issue}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardAnalysesIDIssues;
