import { prisma } from '@repo/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      const send = (event: string, data: unknown) => {
        const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(payload));
      };

      // fetch initial record
      let lastSnapshot: any = null;

      const poll = async () => {
        try {
          const a = await prisma.analysis.findUnique({ where: { id } });
          if (!a) return;

          const snapshot = {
            status: a.status,
            lighthouseReport: a.lighthouseReport ?? null,
            accessibilityIssues: a.accessibilityIssues ?? null,
            seoIssues: a.seoIssues ?? null,
            aiSuggestions: a.aiSuggestions ?? null,
            screenshotUrl: a.screenshotUrl ?? null,
            perfScore: a.perfScore ?? null,
            seoScore: a.seoScore ?? null,
            a11yScore: a.a11yScore ?? null,
            uxScore: a.uxScore ?? null,
          };

          // first time: send full initial state
          if (!lastSnapshot) {
            send('progress', { stage: snapshot.status });
            if (snapshot.screenshotUrl) send('screenshot', { url: snapshot.screenshotUrl });
            if (snapshot.lighthouseReport) send('lighthouse', { report: snapshot.lighthouseReport });
            if (snapshot.accessibilityIssues) send('accessibility', { issues: snapshot.accessibilityIssues });
            if (snapshot.seoIssues) send('seo', { issues: snapshot.seoIssues });
            if (snapshot.aiSuggestions) send('ai_feedback', { suggestions: snapshot.aiSuggestions });
            lastSnapshot = snapshot;
            return;
          }

          // compare and emit diffs
          if (snapshot.status !== lastSnapshot.status) {
            send('progress', { stage: snapshot.status });
          }

          if (JSON.stringify(snapshot.lighthouseReport) !== JSON.stringify(lastSnapshot.lighthouseReport)) {
            send('lighthouse', { report: snapshot.lighthouseReport });
          }

          if (JSON.stringify(snapshot.accessibilityIssues) !== JSON.stringify(lastSnapshot.accessibilityIssues)) {
            send('accessibility', { issues: snapshot.accessibilityIssues });
          }

          if (JSON.stringify(snapshot.seoIssues) !== JSON.stringify(lastSnapshot.seoIssues)) {
            send('seo', { issues: snapshot.seoIssues });
          }

          if (JSON.stringify(snapshot.aiSuggestions) !== JSON.stringify(lastSnapshot.aiSuggestions)) {
            send('ai_feedback', { suggestions: snapshot.aiSuggestions });
          }

          if (snapshot.screenshotUrl && snapshot.screenshotUrl !== lastSnapshot.screenshotUrl) {
            send('screenshot', { url: snapshot.screenshotUrl });
          }

          // complete
          if (snapshot.status === 'COMPLETED' && lastSnapshot.status !== 'COMPLETED') {
            send('complete', { id });
            // keep the connection open for a short time then close
            setTimeout(() => {
              if (!closed) {
                controller.close();
                closed = true;
              }
            }, 2000);
          }

          lastSnapshot = snapshot;
        } catch (err) {
          // send error event
          send('error', { message: String(err) });
        }
      };

      // start polling immediately
      await poll();

      const interval = setInterval(poll, 1500);

      // abort support
      const abortHandler = () => {
        clearInterval(interval);
        if (!closed) controller.close();
        closed = true;
      };

      // @ts-ignore - Request has signal in runtime
      req.signal?.addEventListener?.('abort', abortHandler);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

export const dynamic = 'force-dynamic';
