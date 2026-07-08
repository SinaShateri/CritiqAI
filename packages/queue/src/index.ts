import { prisma } from '@repo/db';
import {
  createQueue,
  createQueueScheduler,
  createWorker,
  getConnection,
} from './bullmq.js';
import type { AnalysisJobData } from './jobs.js';
import { JOB_NAMES } from './jobs.js';

export const analysisQueue = createQueue(JOB_NAMES.ANALYSIS);
export const analysisQueueScheduler = createQueueScheduler(JOB_NAMES.ANALYSIS);

export function enqueueAnalysis(
  job: AnalysisJobData,
  opts?: { attempts?: number },
) {
  return analysisQueue.add(JOB_NAMES.ANALYSIS, job, {
    attempts: opts?.attempts ?? 3,
  });
}

export function createAnalysisWorker(
  processor: (data: AnalysisJobData) => Promise<void>,
) {
  return createWorker(JOB_NAMES.ANALYSIS, async (job: any) => {
    // update DB status to SCRAPING when job starts
    if ((job.data as any).analysisId) {
      try {
        await prisma.analysis.update({
          where: { id: (job.data as any).analysisId },
          data: { status: 'SCRAPING' },
        });
      } catch (e) {}
    }
    await processor(job.data as AnalysisJobData);
    if ((job.data as any).analysisId) {
      try {
        await prisma.analysis.update({
          where: { id: (job.data as any).analysisId },
          data: { status: 'ANALYZING' },
        });
      } catch (e) {}
    }
  });
}

export type { AnalysisJobData } from './jobs.js';
export { getConnection };

