const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 5 * 60_000) {
  const now = Date.now();
  const item = store.get(key);
  if (!item || item.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (item.count >= limit) return { ok: false, retryAfter: Math.ceil((item.resetAt - now) / 1000) };
  item.count += 1;
  return { ok: true };
}
