# @repo/queue

BullMQ queue utilities used by `apps/web` and `apps/worker`.

Usage:

1. Configure `REDIS_URL` in the environment (see project root `.env`).
2. From a worker process import `createAnalysisWorker` and provide a processor function.
3. From server code import `enqueueAnalysis` to add jobs.

Example (enqueue):

```ts
import { enqueueAnalysis } from '@repo/queue';

await enqueueAnalysis({
  url: 'https://example.com',
  userId: '...',
  analysisId: '...',
});
```

Example (worker):

```ts
import { createAnalysisWorker } from '@repo/queue';

createAnalysisWorker(async (data) => {
  // perform scraping, lighthouse, etc.
});
```
