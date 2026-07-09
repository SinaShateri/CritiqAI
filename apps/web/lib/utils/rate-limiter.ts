const buckets = new Map<string, { ts: number[] }>();

export function allowAction(key: string, limit = 5, perSeconds = 60 * 60) {
  const now = Date.now();
  const windowStart = now - perSeconds * 1000;
  const entry = buckets.get(key) || { ts: [] };
  entry.ts = entry.ts.filter((t) => t > windowStart);
  if (entry.ts.length >= limit) {
    buckets.set(key, entry);
    return false;
  }
  entry.ts.push(now);
  buckets.set(key, entry);
  return true;
}
