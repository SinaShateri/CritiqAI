export function normalizeScore(value: number | null | undefined) {
  if (value == null) return 0;
  // Lighthouse gives 0..1 sometimes, normalize to 0..100
  if (value <= 1) return Math.round(value * 100);
  return Math.round(value);
}

export function mergeScores(scores: {
  perf?: number;
  seo?: number;
  a11y?: number;
  ux?: number;
}) {
  return {
    perf: normalizeScore(scores.perf ?? 0),
    seo: normalizeScore(scores.seo ?? 0),
    a11y: normalizeScore(scores.a11y ?? 0),
    ux: normalizeScore(scores.ux ?? 0),
  };
}
