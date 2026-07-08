import { AnalysisStep } from "./steps/indicator";

export type Severity = 'critical' | 'warning' | 'info';
export type Impact = 'high' | 'medium';

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
