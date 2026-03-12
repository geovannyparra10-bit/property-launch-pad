const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

export function rateLimit(identifier: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return true;
  }

  if (record.count >= config.limit) {
    return false;
  }

  record.count++;
  return true;
}

export function getRateLimitStatus(identifier: string): {
  remaining: number;
  reset: number;
} {
  const record = rateLimitMap.get(identifier);
  const now = Date.now();

  if (!record || now > record.resetTime) {
    return { remaining: 100, reset: now + 60000 };
  }

  return {
    remaining: Math.max(0, 100 - record.count),
    reset: record.resetTime,
  };
}

export function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

setInterval(cleanupRateLimits, 60000);
