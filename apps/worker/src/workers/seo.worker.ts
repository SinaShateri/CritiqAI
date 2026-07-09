import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '@repo/db';
import type { AnalysisJobData } from '@repo/queue';
import * as cheerio from 'cheerio';

export type SeoIssue = {
  type: string;
  message: string;
  detail?: string | string[];
};

export default async function runSeoParser(data: AnalysisJobData) {
  const { analysisId } = data;

  // fetch HTML from DB (lighthouseReport.scrapedHtml) if available
  const analysis = await prisma.analysis.findUnique({
    where: { id: analysisId },
  });
  const html =
    analysis?.lighthouseReport && (analysis.lighthouseReport as any).scrapedHtml
      ? (analysis.lighthouseReport as any).scrapedHtml
      : '';

  const $ = cheerio.load(html || '');
  const issues: SeoIssue[] = [];

  const title = $('head > title').text().trim();
  if (!title) issues.push({ type: 'title', message: 'Missing title tag' });
  else if (title.length > 120)
    issues.push({
      type: 'title',
      message: 'Title is too long',
      detail: String(title.length),
    });

  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc)
    issues.push({ type: 'meta', message: 'Missing meta description' });
  else if ((metaDesc || '').length > 320)
    issues.push({
      type: 'meta',
      message: 'Meta description is too long',
      detail: String((metaDesc || '').length),
    });

  const h1 = $('h1').toArray();
  if (h1.length === 0) issues.push({ type: 'heading', message: 'Missing H1' });
  if (h1.length > 1)
    issues.push({ type: 'heading', message: 'Multiple H1 tags' });

  $('img').each((i: number, el: any) => {
    const alt = $(el).attr('alt');
    if (!alt)
      issues.push({
        type: 'image',
        message: 'Image missing alt attribute',
        detail: $(el).attr('src'),
      });
  });

  // Open Graph
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  if (!ogTitle || !ogDesc)
    issues.push({ type: 'open-graph', message: 'Missing Open Graph tags' });

  // Structured data (JSON-LD)
  const jsonLd = [] as any[];
  $('script[type="application/ld+json"]').each((i: number, el: any) => {
    const txt = $(el).html() || '';
    try {
      const parsed = JSON.parse(txt);
      jsonLd.push(parsed);
    } catch (e) {
      issues.push({ type: 'structured-data', message: 'Invalid JSON-LD' });
    }
  });
  if (jsonLd.length === 0)
    issues.push({
      type: 'structured-data',
      message: 'Missing JSON-LD structured data',
    });

  // Links
  const internalLinks: string[] = [];
  const externalLinks: string[] = [];
  $('a[href]').each((i: number, el: any) => {
    const href = $(el).attr('href') || '';
    if (href.startsWith('http')) externalLinks.push(href);
    else internalLinks.push(href);
  });
  if (internalLinks.length === 0)
    issues.push({ type: 'links', message: 'No internal links found' });

  if (analysisId) {
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { seoIssues: issues },
    });
  }

  return { issues };
}
