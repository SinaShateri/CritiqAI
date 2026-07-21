export type AnalysisJobData = {
  url: string;
  userId?: string;
  analysisId?: string;
};

export const JOB_NAMES = {
  ANALYSIS: 'analysis',
} as const;

export type JobName = (typeof JOB_NAMES)[keyof typeof JOB_NAMES];
