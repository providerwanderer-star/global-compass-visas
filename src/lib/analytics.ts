/**
 * Lightweight wrapper around `gtag` so call sites stay tidy and
 * never crash when GA hasn't loaded (ad-blockers, dev, prerender).
 */
type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>
) => void;

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", eventName, params);
  } catch {
    // Swallow analytics errors — never break user flow.
  }
}