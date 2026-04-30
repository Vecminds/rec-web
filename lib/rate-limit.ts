export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

const store = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(ip: string, options: RateLimitOptions): boolean {
  const now = Date.now();
  const record = store.get(ip);

  // Clean up expired entries occasionally
  if (Math.random() < 0.01) {
    for (const [key, value] of store.entries()) {
      if (now > value.expiresAt) {
        store.delete(key);
      }
    }
  }

  if (record) {
    if (now > record.expiresAt) {
      // Window expired, reset
      store.set(ip, { count: 1, expiresAt: now + options.windowMs });
      return true; // allowed
    } else {
      // Within window
      if (record.count >= options.limit) {
        return false; // rate limited
      } else {
        record.count++;
        return true; // allowed
      }
    }
  } else {
    // New IP
    store.set(ip, { count: 1, expiresAt: now + options.windowMs });
    return true; // allowed
  }
}
