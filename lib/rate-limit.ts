type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function isRateLimited(ip: string) {
  const now = Date.now();
  const current = store.get(ip);

  if (!current || current.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  store.set(ip, current);
  return false;
}
