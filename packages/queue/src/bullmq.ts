import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '@repo/db';
import type { QueueOptions, WorkerOptions } from 'bullmq';
import * as BullMQ from 'bullmq';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const connection = REDIS_URL;

export const getConnection = () => connection;

export function createQueue(name: string, opts?: Partial<QueueOptions>) {
  return new BullMQ.Queue(name, {
    ...(opts as QueueOptions),
    connection: connection as any,
  } as QueueOptions);
}

export function createQueueScheduler(name: string) {
  // QueueScheduler may not be a named export in some typings setups; access via namespace
  // QueueScheduler typing can be strict; cast connection to any for compatibility
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new BullMQ.QueueScheduler(name, { connection: connection as any });
}

export function createWorker<T = any>(
  name: string,
  processor: (job: { id: string; name: string; data: T }) => Promise<void>,
  opts?: Partial<WorkerOptions>,
) {
  const worker = new BullMQ.Worker(
    name,
    async (job) => {
      try {
        await processor({
          id: job.id,
          name: job.name,
          data: job.data as T,
        } as any);
      } catch (err) {
        // attach failure info to the Analysis record when possible
        if (job.data && (job.data as any).analysisId) {
          try {
            await prisma.analysis.update({
              where: { id: (job.data as any).analysisId },
              data: { status: 'FAILED' },
            });
          } catch (e) {
            // swallow DB errors here
          }
        }
        throw err;
      }
    },
    {
      ...(opts as WorkerOptions),
      connection: connection as any,
      concurrency: parseInt(process.env.WORKER_CONCURRENCY || '3', 10),
    },
  );

  return worker;
}
