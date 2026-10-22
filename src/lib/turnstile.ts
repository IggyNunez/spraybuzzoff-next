const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Cloudflare Turnstile server check for /api/lead. Returns true when the lead
 * may proceed. Enforced only when both keys are set, so the form behaves as
 * before until they are. Fails open if Cloudflare cannot be reached: a lost
 * lead costs more than one spam message.
 */
export async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return true;
  // Cloudflare caps tokens at 2048 characters.
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`siteverify HTTP ${res.status}`);
    const out = (await res.json()) as { success?: boolean };
    return out.success === true;
  } catch (err) {
    console.error("[turnstile] siteverify unreachable, letting the lead through:", err);
    return true;
  }
}
