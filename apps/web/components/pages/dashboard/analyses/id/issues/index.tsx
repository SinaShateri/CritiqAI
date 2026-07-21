'use client';

import { Tab, Tabs } from '@repo/ui/tabs';
import { useMemo, useState } from 'react';
import { AnalysisData, Severity } from '../types';
import IssueRow from './row';

type FilterKey = 'all' | Severity;
const filterTabs: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: 'Critical' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
];

const DashboardAnalysesIDIssues = ({
  issues,
}: {
  issues: AnalysisData['issues'];
}) => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const counts = useMemo(
    () =>
      issues.reduce(
        (acc, issue) => ({
          ...acc,
          all: acc.all + 1,
          [issue.severity]: acc[issue.severity] + 1,
        }),
        { all: 0, critical: 0, warning: 0, info: 0 } as Record<
          FilterKey,
          number
        >,
      ),
    [issues],
  );
  const filteredIssues = useMemo(
    () =>
      filter === 'all'
        ? issues
        : issues.filter((issue) => issue.severity === filter),
    [issues, filter],
  );
  return (
    <section className='p-5'>
      <h2 className='text-foreground-subtle mb-3 text-xs font-semibold tracking-[1.5px]'>
        ISSUES
      </h2>
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as FilterKey)}
        label='Issue severity filters'
        panelId='issue-results'
        className='mb-3'
      >
        {filterTabs.map((tab) => (
          <Tab
            key={tab.key}
            value={tab.key}
          >
            {tab.label} ({counts[tab.key]})
          </Tab>
        ))}
      </Tabs>
      <div
        id='issue-results'
        role='tabpanel'
        aria-label='Filtered issues'
        className='max-h-70 overflow-y-auto pr-1'
      >
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
