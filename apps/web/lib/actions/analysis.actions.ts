import { enqueueAnalysis } from '@repo/queue';
import { createAnalysis } from '../db/analysis';

export async function startAnalysis({
  url,
  userId,
}: {
  url: string;
  userId: string;
}) {
  const record = await createAnalysis({ userId, url });

  // enqueue background job (worker will pick this up)
  await enqueueAnalysis({ url, userId, analysisId: record.id });

  return {
    analysisId: record.id,
    streamUrl: `/api/stream/${record.id}`,
  };
}
