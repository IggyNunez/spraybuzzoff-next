/**
 * Weekly site health check.
 *
 * Three things, in order of cost-to-fix:
 *   1. Crawl every URL in the sitemap; flag 4xx/5xx.
 *   2. Fire a synthetic contact form submission; verify 200 response.
 *      This runs as a DRY RUN: the request carries the x-health-check
 *      secret, so /api/lead validates the payload and confirms the
 *      GorillaDesk API key still works, then returns 200 without
 *      creating a customer. Without that header the submission would
 *      land in the client's CRM as a real lead every week — this site
 *      has no spam filter to catch it.
 *   3. Fetch key pages and look for common regression signatures
 *      ("Application error", "500", etc. rendered in the body).
 *
 * Silent on success — only emails you when something's broken.
 * This keeps your inbox quiet and makes the occasional alert
 * actually attention-grabbing.
 *
 * Required env:
 *   RESEND_API_KEY
 *   HEALTH_CHECK_SECRET (must match the value set on the Vercel deployment)
 *   SITE_URL (defaults to SITE.url in seo-stack.config.mjs)
 */

import { SITE, EMAIL } from "../../../seo-stack.config.mjs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = EMAIL.from;
const TO = EMAIL.to;
const PROJECT_NAME = SITE.projectName;
const SITE_URL = (process.env.SITE_URL || SITE.url).replace(/\/$/, "");
const TIMEOUT_MS = 15000;

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...opts, signal: controller.signal, redirect: "follow" });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve the site's CANONICAL origin (e.g. apex → www).
 *
 * Vercel redirects the apex (spraybuzzoff.com) to www with a 301. A GET can
 * follow that transparently, but a POST cannot: per the HTTP spec a client
 * downgrades a 301'd POST to a GET and drops the body, so the follow-up lands
 * on /api/lead as a GET → 405 Method Not Allowed. That's exactly the false
 * "CONTACT FORM BROKEN" alert this check was firing.
 *
 * We do one cheap GET to the homepage, let it follow redirects, and read the
 * final origin. The contact-form POST then targets that canonical origin
 * directly, so it's never subjected to the method-flipping redirect.
 * Cached after the first call.
 */
let _canonicalOrigin = null;
async function getCanonicalOrigin() {
  if (_canonicalOrigin) return _canonicalOrigin;
  try {
    const res = await fetchWithTimeout(`${SITE_URL}/`, { method: "GET" });
    _canonicalOrigin = new URL(res.url).origin;
  } catch {
    // Fall back to the configured origin if the probe fails; worst case we're
    // back to the original behavior for this one run.
    _canonicalOrigin = new URL(SITE_URL).origin;
  }
  return _canonicalOrigin;
}

async function getSitemap() {
  const res = await fetchWithTimeout(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  // Simple regex: <loc>URL</loc> — sitemaps are a small enough spec
  // that a real XML parser is overkill.
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(locs)];
}

async function crawlUrls(urls) {
  const results = [];
  // Conservative parallelism: 5 at a time so we don't look like a DOS.
  const CONCURRENCY = 5;
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const chunk = urls.slice(i, i + CONCURRENCY);
    const outcomes = await Promise.all(
      chunk.map(async (url) => {
        try {
          const res = await fetchWithTimeout(url, { method: "HEAD" });
          return { url, status: res.status, ok: res.ok };
        } catch (err) {
          return { url, status: 0, ok: false, error: err.message };
        }
      }),
    );
    results.push(...outcomes);
  }
  return results;
}

async function testContactForm() {
  // POST a well-formed but obviously-synthetic submission as a DRY RUN.
  // The x-health-check header makes /api/lead validate the payload and
  // verify its GorillaDesk credentials, then return 200 without creating
  // a customer. Success = 200. Failure = anything else (401 means the
  // secrets are out of sync; 502 means the GorillaDesk key is bad).
  const secret = process.env.HEALTH_CHECK_SECRET;
  if (!secret) {
    // Deliberately do NOT fall back to an unheadered POST — that would
    // create a real lead in the client's CRM. Report it as an issue instead.
    return {
      ok: false,
      status: 0,
      error:
        "HEALTH_CHECK_SECRET not set — form check skipped to avoid writing a real lead to GorillaDesk.",
    };
  }

  try {
    // POST to the canonical origin so the apex→www 301 never flips our POST
    // into a body-less GET (which would 405). See getCanonicalOrigin().
    const origin = await getCanonicalOrigin();
    const res = await fetchWithTimeout(`${origin}/api/lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-health-check": secret,
      },
      body: JSON.stringify({
        firstName: "Synthetic",
        lastName: "HealthCheck",
        email: "healthcheck@example.com",
        phone: "9095550100",
        service: "General Pest Control",
        referral: "Automated monitoring",
        message:
          "Automated health check from .github/scripts/phase2/health-check.mjs — dry run, no record created.",
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, error: err.message };
  }
}

async function checkForErrorText(url) {
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return { url, issue: `status ${res.status}` };
    const html = await res.text();
    const needles = [
      "Application error",
      "500 Internal Server Error",
      "This page could not be found",
      "Not Found — 404",
      "ReferenceError:",
      "TypeError:",
    ];
    for (const n of needles) {
      if (html.includes(n)) return { url, issue: `text found: "${n}"` };
    }
    return { url, issue: null };
  } catch (err) {
    return { url, issue: `fetch error: ${err.message}` };
  }
}

function buildAlertHtml({ badUrls, formResult, errorSignals }) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const parts = [];

  if (badUrls.length > 0) {
    parts.push(`
      <div style="margin-bottom:20px;">
        <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C2352C;font-weight:700;margin-bottom:10px;">Broken URLs (${badUrls.length})</div>
        ${badUrls
          .map(
            (u) =>
              `<div style="padding:10px 12px;background:#fef2f2;border-left:3px solid #C2352C;margin-bottom:6px;font-size:12px;">
            <strong style="color:#0A2E5C;">${escapeHtml(u.url)}</strong><br>
            <span style="color:#C2352C;">${u.status || "timeout"} ${u.error ? "· " + escapeHtml(u.error) : ""}</span>
          </div>`,
          )
          .join("")}
      </div>`);
  }

  if (!formResult.ok) {
    parts.push(`
      <div style="margin-bottom:20px;">
        <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C2352C;font-weight:700;margin-bottom:10px;">Contact form broken</div>
        <div style="padding:10px 12px;background:#fef2f2;border-left:3px solid #C2352C;font-size:12px;color:#0A2E5C;">
          POST /api/lead returned <strong>${formResult.status || "no response"}</strong>
          ${formResult.error ? `· ${escapeHtml(formResult.error)}` : ""}
          <br><br>
          <em>Leads may not be reaching your inbox. Check Resend dashboard + Vercel logs.</em>
        </div>
      </div>`);
  }

  if (errorSignals.length > 0) {
    parts.push(`
      <div style="margin-bottom:20px;">
        <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C2352C;font-weight:700;margin-bottom:10px;">Error text found on live pages (${errorSignals.length})</div>
        ${errorSignals
          .map(
            (e) =>
              `<div style="padding:10px 12px;background:#fef2f2;border-left:3px solid #C2352C;margin-bottom:6px;font-size:12px;">
            <strong style="color:#0A2E5C;">${escapeHtml(e.url)}</strong><br>
            <span style="color:#C2352C;">${escapeHtml(e.issue)}</span>
          </div>`,
          )
          .join("")}
      </div>`);
  }

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="640" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
        <tr><td style="background:linear-gradient(135deg,#C2352C 0%,#EF4444 100%);padding:24px 28px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;margin-bottom:4px;">Site Health Alert · ${PROJECT_NAME}</div>
          <div style="font-size:20px;font-weight:800;">Issues detected</div>
          <div style="font-size:12px;margin-top:6px;opacity:0.9;">${date}</div>
        </td></tr>

        <tr><td style="padding:22px 28px;">
          ${parts.join("")}
        </td></tr>

        <tr><td style="padding:14px 28px;border-top:1px solid #e5e7eb;background:#f8fafc;">
          <div style="font-size:11px;color:#94a3b8;">
            Automated by .github/workflows/health-check-weekly.yml · Next run: Monday 09:00 UTC
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  console.log("[health] fetching sitemap from", SITE_URL);
  const urls = await getSitemap();
  console.log(`[health] found ${urls.length} URLs in sitemap`);

  console.log("[health] crawling URLs (HEAD)…");
  const crawlResults = await crawlUrls(urls);
  const badUrls = crawlResults.filter((r) => !r.ok);
  console.log(`[health] ${badUrls.length} broken out of ${crawlResults.length}`);

  console.log("[health] testing contact form…");
  const formResult = await testContactForm();
  console.log(`[health] form returned ${formResult.status}`);

  console.log("[health] scanning key pages for error text…");
  const keyPages = [
    `${SITE_URL}/`,
    `${SITE_URL}/services`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/reviews`,
  ];
  const errorSignals = (await Promise.all(keyPages.map(checkForErrorText))).filter((r) => r.issue);
  console.log(`[health] ${errorSignals.length} pages have error-text signals`);

  const hasIssues = badUrls.length > 0 || !formResult.ok || errorSignals.length > 0;
  if (!hasIssues) {
    console.log("[health] all clean — no email sent");
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[health] RESEND_API_KEY not set; can't send alert");
    process.exit(1);
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `Site health alert · ${PROJECT_NAME} · ${badUrls.length + (formResult.ok ? 0 : 1) + errorSignals.length} issue${badUrls.length + (formResult.ok ? 0 : 1) + errorSignals.length === 1 ? "" : "s"}`,
      html: buildAlertHtml({ badUrls, formResult, errorSignals }),
    }),
  });

  if (!res.ok) {
    console.error("[health] resend failed:", res.status, await res.text());
    process.exit(1);
  }
  console.log("[health] alert email sent");
}

main().catch((err) => {
  console.error("[health] FATAL:", err);
  process.exit(1);
});
