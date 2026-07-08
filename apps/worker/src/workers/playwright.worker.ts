import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '@repo/db';
import type { AnalysisJobData } from '@repo/queue';
import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

export default async function playProcessor(data: AnalysisJobData) {
  const { url, analysisId } = data;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  try {
    const timeout = parseInt(process.env.PLAYWRIGHT_TIMEOUT || '30000', 10);
    await page.goto(url, { waitUntil: 'networkidle', timeout });
    // small wait to let JS settle
    await page.waitForTimeout(500);

    const html = await page.content();

    const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    await fs.mkdir(screenshotsDir, { recursive: true });
    const filename = `${analysisId || Date.now()}.png`;
    const filePath = path.join(screenshotsDir, filename);
    await fs.writeFile(filePath, screenshot);

    // basic performance entries (navigation + paint)
    const perf = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation' as any);
      const paint = performance.getEntriesByType('paint' as any);
      return { navigation, paint };
    });

    // save scraped result to DB
    if (analysisId) {
      await prisma.analysis.update({
        where: { id: analysisId },
        data: {
          screenshotUrl: filePath,
          lighthouseReport: { scrapedHtml: html },
          accessibilityIssues: null,
          seoIssues: null,
          aiSuggestions: null,
          // optionally store perf timings
          // store under a11y or lighthouseReport as supplemental
          // here we append perf under lighthouseReport
          // (Prisma Json column accepts arbitrary objects)
          // mark status to ANALYZING (next workers will pick it up)
          status: 'ANALYZING',
          // store navigation/paint in a JSON field
          // we'll merge into lighthouseReport
        },
      });

      // append perf data in a second update to avoid strict typing issues
      await prisma.analysis.update({
        where: { id: analysisId },
        data: { lighthouseReport: { scrapedHtml: html, perf } },
      });
    }

    await browser.close();
  } catch (err) {
    try {
      if (analysisId) {
        await prisma.analysis.update({
          where: { id: analysisId },
          data: { status: 'FAILED' },
        });
      }
    } catch (e) {
      // ignore DB error
    }
    await browser.close();
    throw err;
  }
}
