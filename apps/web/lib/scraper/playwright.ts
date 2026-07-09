export async function fetchHtml(url: string) {
  // use global fetch available in Node 18+
  // lightweight fetch for server-side summary (not a full Playwright run)
  const res = await globalThis.fetch(url, { redirect: 'follow' });
  const html = await res.text();
  return { html, status: res.status };
}
