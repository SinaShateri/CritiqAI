import dotenv from 'dotenv';
dotenv.config();

import { prisma, Prisma } from '@repo/db';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

type LighthouseAuditInput = {
  analysisId: string;
  url: string;
};

export type LighthouseAuditResult = {
  perfScore: number;
  seoScore: number;
  a11yScore: number;
  uxScore: number;
  lighthouseReport: unknown;
  accessibilityIssues: Array<{
    id: string;
    title: string;
    description: string;
    score: number | null;
  }>;
  seoIssues: Array<{
    id: string;
    title: string;
    description: string;
    score: number | null;
  }>;
};

function extractIssues(category: any, auditIds: string[]) {
  return auditIds
    .map((id) => category.audits[id])
    .filter(Boolean)
    .map((audit: any) => ({
      id: audit.id,
      title: audit.title,
      description: audit.description,
      score: audit.score,
    }));
}

export default async function runLighthouseAudit({
  analysisId,
  url,
}: LighthouseAuditInput): Promise<LighthouseAuditResult> {
  const chrome = await launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      logLevel: 'info',
    });

    if (!result) {
      throw new Error('Lighthouse audit failed');
    }

    const report = result.lhr;

    const performanceScore = Math.round(
      (report.categories.performance?.score ?? 0) * 100,
    );
    const accessibilityScore = Math.round(
      (report.categories.accessibility?.score ?? 0) * 100,
    );
    const seoScore = Math.round((report.categories.seo?.score ?? 0) * 100);
    const uxScore = Math.round(
      (report.categories['best-practices']?.score ?? 0) * 100,
    );

    const accessibilityIssues = extractIssues(report.categories.accessibility, [
      'uses-rel-preconnect',
      'aria-allowed-attr',
      'aria-required-attr',
      'image-alt',
      'label',
      'color-contrast',
    ]);

    const seoIssues = extractIssues(report.categories.seo, [
      'document-title',
      'meta-description',
      'http-status-code',
      'robots-txt',
      'canonical',
      'image-alt',
    ]);

    const reportJson = result.lhr;

    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        perfScore: performanceScore,
        seoScore: seoScore,
        a11yScore: accessibilityScore,
        uxScore: uxScore,
        lighthouseReport: reportJson as unknown as Prisma.InputJsonValue,
        accessibilityIssues,
        seoIssues,
      },
    });

    return {
      perfScore: performanceScore,
      seoScore,
      a11yScore: accessibilityScore,
      uxScore,
      lighthouseReport: reportJson,
      accessibilityIssues,
      seoIssues,
    };
  } catch (e) {
    // attach failure info to the Analysis record when possible
    if (analysisId) {
      try {
        await prisma.analysis.update({
          where: { id: analysisId },
          data: { status: 'FAILED' },
        });
      } catch (e) {
        // swallow DB errors here
      }
    }
    throw e;
  } finally {
    chrome.kill();
  }
}
