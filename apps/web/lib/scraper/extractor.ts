export function extractMeta(html: string) {
  // Lightweight HTML extraction using regex to avoid jsdom dependency in web lib
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const metaMatch =
    html.match(
      /<meta[^>]+name=['"]description['"][^>]*content=['"]([^'"]*)['"][^>]*>/i,
    ) ||
    html.match(
      /<meta[^>]+content=['"]([^'"]*)['"][^>]*name=['"]description['"][^>]*>/i,
    );
  const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
  const title = titleMatch?.[1]?.trim() ?? '';
  const metaDesc = metaMatch?.[1]?.trim() ?? '';
  const h1 = h1Match?.[1]?.trim() ?? '';
  return { title, metaDesc, h1 };
}
