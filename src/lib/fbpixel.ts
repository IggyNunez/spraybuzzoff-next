/* ─── Meta (Facebook) Pixel helpers ────────────────────────────────── */

export const FB_PIXEL_ID = "829657410183632";

/** Declare the global fbq function injected by the pixel script. */
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

// ─── Standard events ─────────────────────────────────────────────────
// Docs: https://developers.facebook.com/docs/meta-pixel/reference

/** Fires when someone opens the booking drawer (any "Book Now" CTA). */
export function trackSchedule() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Schedule");
  }
}

/** Fires when a lead form is submitted successfully. */
export function trackLead(data?: { content_name?: string }) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", data);
  }
}

/** Fires when someone clicks a phone number link. */
export function trackContact() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
}

/** Fires on key content views (services, plans, about, etc.). */
export function trackViewContent(data?: {
  content_name?: string;
  content_category?: string;
}) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", data);
  }
}

/** Generic custom event helper. */
export function trackCustom(eventName: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, data);
  }
}
