import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '@repo/db';
import { AnalysisJobData, createAnalysisWorker } from '@repo/queue';
import runAIAnalyzer from './workers/ai-analyzer.worker.js';
import runAxeAudit from './workers/axe.worker.js';
import runLighthouseAudit from './workers/lighthouse.worker.js';
import runPlaywrightScrape from './workers/playwright.worker.js';
import runSeoParser from './workers/seo.worker.js';

async function processor(data: AnalysisJobData) {
  const { url, analysisId } = data;
  if (!analysisId) {
    throw new Error('analysisId is required');
  }

  const scrapeResult = await runPlaywrightScrape(data);

  // After scraping, run Lighthouse audit
  const audit = await runLighthouseAudit({ analysisId, url });

  // run axe-core accessibility audit
  const axeRes = await runAxeAudit({ url, analysisId });

  // run SEO parser (uses scraped HTML stored in lighthouseReport)
  const seoRes = await runSeoParser({ analysisId, url });

  // run AI analyzer to generate suggestions
  const aiRes = await runAIAnalyzer({ analysisId, url });

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
      accessibilityIssues: axeRes.violations || audit.accessibilityIssues,
      seoIssues: seoRes.issues || audit.seoIssues,
      aiSuggestions: aiRes.suggestions || null,
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
