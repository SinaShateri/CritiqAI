import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '@repo/db';
import type { AnalysisJobData } from '@repo/queue';

import OpenAI from 'openai';

export type AISuggestions = {
  uxFeedback: string;
  performanceBottlenecks: string[];
  redesignSuggestions: string;
  quickWins: string[];
};

export default async function runAIAnalyzer(data: AnalysisJobData) {
  const { analysisId } = data;
  if (!analysisId) throw new Error('analysisId required');

  const analysis = await prisma.analysis.findUnique({
    where: { id: analysisId },
  });
  if (!analysis) throw new Error('analysis not found');

  const promptParts: string[] = [];
  if (
    analysis.lighthouseReport &&
    (analysis.lighthouseReport as any).scrapedHtml
  ) {
    promptParts.push(
      'HTML:\n' +
        ((analysis.lighthouseReport as any).scrapedHtml as string).slice(
          0,
          2000,
        ),
    );
  }
  if (analysis.screenshotUrl)
    promptParts.push('Screenshot path: ' + analysis.screenshotUrl);
  if (analysis.lighthouseReport)
    promptParts.push(
      'Lighthouse summary: ' +
        JSON.stringify((analysis.lighthouseReport as any).categories || {}),
    );

  const systemPrompt = `You are an expert UX and performance auditor. Provide UX feedback, prioritized quick wins, performance bottlenecks, and redesign suggestions.`;
  const userPrompt = promptParts.join('\n\n');

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: 800,
  });

  const text =
    (completion.choices &&
      completion.choices[0] &&
      (completion.choices[0] as any).message?.content) ||
    (completion.choices &&
      completion.choices[0] &&
      (completion.choices[0] as any).text) ||
    '';

  const suggestions: AISuggestions = {
    uxFeedback: text,
    performanceBottlenecks: [],
    redesignSuggestions: text,
    quickWins: [],
  };

  await prisma.analysis.update({
    where: { id: analysisId },
    data: { aiSuggestions: suggestions },
  });

  return { suggestions };
}
