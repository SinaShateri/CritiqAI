import dotenv from 'dotenv';
dotenv.config();

import { prisma } from '@repo/db';
import type { AnalysisJobData } from '@repo/queue';
import { chromium } from 'playwright';

export type AxeViolation = {
  id: string;
  impact: string | null;
  description: string | null;
  help: string | null;
  nodes: Array<{ html: string; target: string[] }>;
};

export default async function runAxeAudit(data: AnalysisJobData) {
  const { url, analysisId } = data;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  try {
    const timeout = parseInt(process.env.PLAYWRIGHT_TIMEOUT || '30000', 10);
    await page.goto(url, { waitUntil: 'networkidle', timeout });

    // inject axe-core from CDN (avoid local package resolution during type-check)
    await page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.6/axe.min.js',
    });

    const result = await page.evaluate(async () => {
      // @ts-ignore
      return await (window as any).axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'best-practice'],
        },
      });
    });

    const violations: AxeViolation[] = (result.violations || []).map(
      (v: any) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        nodes: v.nodes.map((n: any) => ({ html: n.html, target: n.target })),
      }),
    );

    if (analysisId) {
      await prisma.analysis.update({
        where: { id: analysisId },
        data: { accessibilityIssues: violations },
      });
    }

    await browser.close();

    return { violations };
  } catch (err) {
    try {
      if (analysisId)
        await prisma.analysis.update({
          where: { id: analysisId },
          data: { status: 'FAILED' },
        });
    } catch {}
    await browser.close();
    throw err;
  }
}
