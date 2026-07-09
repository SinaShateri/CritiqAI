export async function runAxeLight(html: string) {
  // lightweight accessibility scan placeholder
  // include a trivial metric derived from html length to avoid unused param
  const len = html ? html.length : 0;
  return { violations: [], passes: [], length: len };
}
