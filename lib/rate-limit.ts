import { NextRequest } from 'next/server';

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitStore>();

// 5 requests per minute
const LIMIT = 5;
const WINDOW_MS = 60 * 1000;

export function rateLimit(request: NextRequest): { success: boolean; limit: number; remaining: number; reset: number } {
  // Use x-forwarded-for for client IP since NextRequest.ip may be unreliable
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  const now = Date.now();
  let record = store.get(ip);

  if (!record || record.resetTime < now) {
    // New window
    record = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    store.set(ip, record);
    return {
      success: true,
      limit: LIMIT,
      remaining: LIMIT - 1,
      reset: record.resetTime,
    };
  }

  // Existing window
  record.count += 1;
  const remaining = Math.max(0, LIMIT - record.count);

  return {
    success: record.count <= LIMIT,
    limit: LIMIT,
    remaining,
    reset: record.resetTime,
  };
}
