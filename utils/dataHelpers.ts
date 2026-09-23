const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

/** Tosca: {RANDOMTEXT[n]} */
export function randomText(length: number): string {
  return Array.from({ length }, () => LETTERS[Math.floor(Math.random() * LETTERS.length)]).join('');
}

/** Tosca: {RND[n]} (n-digit number, no leading zero) */
export function randomDigits(length: number): string {
  const first = String(Math.floor(Math.random() * 9) + 1);
  const rest = Array.from({ length: length - 1 }, () => Math.floor(Math.random() * 10)).join('');
  return first + rest;
}

/** Tosca (GenY "To remove any buffers"): appends ?<random>=<random> so Akamai doesn't serve a cached page. */
export function withCacheBuster(url: string): string {
  if (!url) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${randomText(10)}=${randomText(10)}`;
}
