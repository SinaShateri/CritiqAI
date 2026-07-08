import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '@repo/db';
import { AnalysisJobData, createAnalysisWorker } from '@repo/queue';
import runLighthouseAudit from './workers/lighthouse.worker.js';
import runPlaywrightScrape from './workers/playwright.worker.js';

async function processor(data: AnalysisJobData) {
  const { url, analysisId } = data;
  if (!analysisId) {
    throw new Error('analysisId is required');
  }

  const scrapeResult = await runPlaywrightScrape(data);

  // After scraping, run Lighthouse audit
  const audit = await runLighthouseAudit({ analysisId, url });

  const auditReport =
    typeof audit.lighthouseReport === 'object' && audit.lighthouseReport !== null
      ? audit.lighthouseReport
      : {};

  await prisma.analysis.update({
    where: { id: analysisId },
    data: {
      perfScore: audit.perfScore,
      seoScore: audit.seoScore,
      a11yScore: audit.a11yScore,
      uxScore: audit.uxScore,
      lighthouseReport: {
        ...(auditReport as Record<string, unknown>),
        scrapedHtml: scrapeResult.html,
        assets: { stylesheets: scrapeResult.stylesheets, scripts: scrapeResult.scripts },
        perf: scrapeResult.perf,
      },
      accessibilityIssues: audit.accessibilityIssues,
      seoIssues: audit.seoIssues,
      status: 'COMPLETED',
    },
  });
}

async function main() {
  createAnalysisWorker(processor);
  console.log('Playwright + Lighthouse analysis worker started');
}

main().catch((err) => {
  console.error('Worker failed to start', err);
  process.exit(1);
});
