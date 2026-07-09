import dotenv from 'dotenv';
dotenv.config();

import { prisma, Prisma } from '@repo/db';
import type { AnalysisJobData } from '@repo/queue';
import fs from 'fs/promises';
import path from 'path';
import { Browser, chromium, Page } from 'playwright';

export type PlaywrightScrapeResult = {
  screenshotUrl: string;
  html: string;
  stylesheets: string[];
  scripts: string[];
  perf: Record<string, unknown>;
};

export default async function runPlaywrightScrape(
  data: AnalysisJobData,
): Promise<PlaywrightScrapeResult> {
  const { url, analysisId } = data;
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page: Page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  await fs.mkdir(screenshotsDir, { recursive: true });
  const filename = `${analysisId || Date.now()}.png`;
  const screenshotPath = path.join(screenshotsDir, filename);

  try {
    const timeout = parseInt(process.env.PLAYWRIGHT_TIMEOUT || '30000', 10);
    await page.goto(url, { waitUntil: 'networkidle', timeout });
    await page.waitForTimeout(500);

    const html = await page.content();

    const { stylesheets, scripts } = await page.evaluate(() => {
      const doc = globalThis as any;
      const linkNodes = Array.from(
        doc.document.querySelectorAll('link[rel="stylesheet"]'),
      ) as any[];
      const links = linkNodes.map((link) => link.href).filter(Boolean);
      const inlineStyles = Array.from(
        doc.document.querySelectorAll('style') as any[],
      ).map((style) => style.textContent || '');
      const scriptEntries = Array.from(doc.document.scripts || ([] as any[]))
        .map((script: any) => ({
          src: script.src,
          content: script.textContent,
        }))
        .map((item) => item.src || item.content || '')
        .filter(Boolean);
      return {
        stylesheets: links.concat(inlineStyles),
        scripts: scriptEntries,
      };
    });

    const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
    await fs.writeFile(screenshotPath, screenshot);

    const perf = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation' as any);
      const paint = performance.getEntriesByType('paint' as any);
      return { navigation, paint };
    });

    const result: PlaywrightScrapeResult = {
      screenshotUrl: screenshotPath,
      html,
      stylesheets,
      scripts,
      perf,
    };

    if (analysisId) {
      await prisma.analysis.update({
        where: { id: analysisId },
        data: {
          screenshotUrl: screenshotPath,
          lighthouseReport: {
            scrapedHtml: html,
            assets: { stylesheets, scripts },
            perf: perf as Prisma.InputJsonValue,
          },
          accessibilityIssues: Prisma.DbNull,
          seoIssues: Prisma.DbNull,
          aiSuggestions: Prisma.DbNull,
          status: 'ANALYZING',
        },
      });
    }

    await browser.close();
    return result;
  } catch (err) {
    if (analysisId) {
      try {
        await prisma.analysis.update({
          where: { id: analysisId },
          data: { status: 'FAILED' },
        });
      } catch {
        // ignore DB error
      }
    }
    await browser.close();
    throw err;
  }
}
