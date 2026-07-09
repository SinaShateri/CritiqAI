import { fetchHtml } from '../scraper/playwright';

export async function runLighthouseLight(url: string) {
  // lightweight lighthouse-like runner: fetch HTML and produce fake scores
  const { html } = await fetchHtml(url);
  const length = html?.length ?? 0;
  const perf = Math.max(
    20,
    Math.min(95, Math.round(100 - Math.log10(Math.max(1, length)) * 10)),
  );
  const a11y = 80;
  const seo = 75;

  const report = {
    categories: {
      performance: { score: perf / 100 },
      accessibility: { score: a11y / 100 },
      seo: { score: seo / 100 },
    },
    scrapedHtml: html,
  };

  return { report, scores: { perf, a11y, seo } };
}
