import dotenv from 'dotenv';
dotenv.config();

import { createAnalysisWorker } from '@repo/queue';
import createPlayProcessor from './workers/playwright.worker.js';

async function main() {
  // wire Playwright scraper as the analysis worker
  createAnalysisWorker(createPlayProcessor as any);
  console.log('Playwright analysis worker started');
}

main().catch((err) => {
  console.error('Worker failed to start', err);
  process.exit(1);
});
