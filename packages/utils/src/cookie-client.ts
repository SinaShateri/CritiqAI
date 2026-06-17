/**
 * CookieManager — manages cookies in the browser
 * Used only on the client side (document.cookie)
 *
 * @example
 * const cookies = new CookieManager();
 * cookies.set('theme', 'dark', { days: 30 });
 * cookies.get('theme'); // 'dark'
 * cookies.remove('theme');
 */

export interface CookieOptions {
  /** Number of days until expiration — default: session cookie */
  days?: number;
  /** Cookie path — default: '/' */
  path?: string;
  /** Cookie domain */
  domain?: string;
  /** Secure only (HTTPS) */
  secure?: boolean;
  /** CSRF protection */
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export class CookieManager {
  private readonly defaultOptions: Required<
    Omit<CookieOptions, 'days' | 'domain'>
  > = {
    path: '/',
    secure: false,
    sameSite: 'Lax',
  };

  // ─── Private helpers ──────────────────────────────────────────────────────

  /**
   * Checks whether the code is running in the browser
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  /**
   * Builds a cookie string
   */
  private serialize(
    name: string,
    value: string,
    options: CookieOptions = {},
  ): string {
    const opts = { ...this.defaultOptions, ...options };

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (opts.days !== undefined) {
      const expires = new Date();
      expires.setDate(expires.getDate() + opts.days);
      cookie += `; Expires=${expires.toUTCString()}`;
    }

    cookie += `; Path=${opts.path}`;

    if (opts.domain) {
      cookie += `; Domain=${opts.domain}`;
    }

    if (opts.secure) {
      cookie += '; Secure';
    }

    cookie += `; SameSite=${opts.sameSite}`;

    return cookie;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Set a cookie
   * @param name Cookie name
   * @param value Cookie value
   * @param options Additional settings
   *
   * @example
   * cookies.set('token', 'abc123', { days: 7, secure: true });
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    if (!this.isBrowser()) return;
    document.cookie = this.serialize(name, value, options);
  }

  /**
   * Read a cookie value
   * @returns The cookie value or null if not found
   *
   * @example
   * cookies.get('theme'); // 'dark' | null
   */
  get(name: string): string | null {
    if (!this.isBrowser()) return null;

    const key = `${encodeURIComponent(name)}=`;
    const parts = document.cookie.split('; ');

    for (const part of parts) {
      if (part.startsWith(key)) {
        return decodeURIComponent(part.slice(key.length));
      }
    }

    return null;
  }

  /**
   * Check whether a cookie exists
   *
   * @example
   * cookies.has('token'); // true | false
   */
  has(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Remove a cookie
   *
   * @example
   * cookies.remove('token');
   */
  remove(
    name: string,
    options: Pick<CookieOptions, 'path' | 'domain'> = {},
  ): void {
    if (!this.isBrowser()) return;

    // Remove the cookie by setting an expiration date in the past
    document.cookie = this.serialize(name, '', {
      ...options,
      days: -1,
    });
  }

  /**
   * Read all cookies as an object
   *
   * @example
   * cookies.getAll(); // { theme: 'dark', lang: 'fa' }
   */
  getAll(): Record<string, string> {
    if (!this.isBrowser()) return {};

    return document.cookie
      .split('; ')
      .filter(Boolean)
      .reduce<Record<string, string>>((acc, part) => {
        const [key, ...rest] = part.split('=');
        if (key) {
          acc[decodeURIComponent(key)] = decodeURIComponent(rest.join('='));
        }
        return acc;
      }, {});
  }

  /**
   * Remove all cookies
   *
   * @example
   * cookies.clear();
   */
  clear(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    if (!this.isBrowser()) return;

    const all = this.getAll();
    for (const name of Object.keys(all)) {
      this.remove(name, options);
    }
  }

  /**
   * Set a cookie with a JSON value
   *
   * @example
   * cookies.setJSON('user', { id: '1', name: 'Jane' }, { days: 7 });
   */
  setJSON<T>(name: string, value: T, options: CookieOptions = {}): void {
    this.set(name, JSON.stringify(value), options);
  }

  /**
   * Read a cookie and parse JSON
   * @returns Parsed value or null
   *
   * @example
   * cookies.getJSON<{ id: string }>('user'); // { id: '1', name: 'Jane' } | null
   */
  getJSON<T>(name: string): T | null {
    const value = this.get(name);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
}

// ─── Singleton export ─────────────────────────────────────────────────────

/**
 * Ready-to-use instance
 *
 * @example
 * import { cookies } from '@repo/utils/cookie';
 * cookies.set('theme', 'dark');
 */
export const cookiesClient = new CookieManager();
