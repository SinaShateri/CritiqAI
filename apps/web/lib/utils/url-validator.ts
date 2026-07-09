export function isValidUrl(input: string) {
  try {
    const u = new URL(input);
    return (u.protocol === 'https:' || u.protocol === 'http:') && !!u.hostname;
  } catch {
    return false;
  }
}
