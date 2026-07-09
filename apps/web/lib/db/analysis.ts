import { prisma } from '@repo/db';

// Local minimal Analysis type to avoid bringing @prisma/client into the web package
export type Analysis = { id: string; [key: string]: unknown };
export type AnalysisRecord = Promise<Analysis>;

export async function createAnalysis(params: {
  userId: string;
  url: string;
}): Promise<Analysis> {
  const { userId, url } = params;
  return prisma.analysis.create({
    data: { userId, url },
  }) as unknown as Analysis;
}

export async function getAnalysisById(id: string): Promise<Analysis | null> {
  return prisma.analysis.findUnique({
    where: { id },
  }) as unknown as Analysis | null;
}

export async function updateAnalysis(
  id: string,
  data: Record<string, unknown>,
): Promise<Analysis> {
  return prisma.analysis.update({ where: { id }, data }) as unknown as Analysis;
}

export type AnalysisStatus =
  | 'PENDING'
  | 'SCRAPING'
  | 'ANALYZING'
  | 'AI_PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export async function setAnalysisStatus(
  id: string,
  status: AnalysisStatus,
): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return prisma.analysis.update({ where: { id }, data: { status } as any });
}
