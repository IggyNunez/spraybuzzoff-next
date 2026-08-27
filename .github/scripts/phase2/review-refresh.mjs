/**
 * review-refresh.mjs
 * ──────────────────
 * Runs after scripts/fetch-reviews.mjs in the monthly workflow. Compares the
 * freshly fetched corpus against the version committed at HEAD and emails a
 * summary when anything actually changed.
 *
 * The review corpus is a snapshot: without this the site's star rating and
 * review count freeze at whatever they were on the day of the last fetch,
 * while the real Google listing keeps moving. This is the thing that keeps
 * them honest.
 *
 * Writes `changed=true|false` to GITHUB_OUTPUT so the workflow only commits
 * when there is something to commit.
 *
 * Required env:
 *   RESEND_API_KEY  (optional; skips the email when absent)
 */

import { readFileSync, appendFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { SITE, EMAIL } from "../../../seo-stack.config.mjs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = EMAIL.from;
const TO = EMAIL.to;
const CC = EMAIL.cc;
const SITE_URL = SITE.url.replace(/\/$/, "");
const CORPUS = "src/data/google-reviews.json";

function readCurrent() {
  if (!existsSync(CORPUS)) return { total: 0, reviews: [] };
  return JSON.parse(readFileSync(CORPUS, "utf-8"));
}

/** The corpus as it was before this run. Missing on the very first run. */
function readPrevious() {
  try {
    return JSON.parse(
      execSync(`git show HEAD:${CORPUS}`, { encoding: "utf-8", stdio: ["pipe", "pipe", "ignore"] }),
    );
  } catch {
    return null;
  }
}

const avg = (reviews) =>
  reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

const key = (r) => `${r.name}|${(r.text || "").slice(0, 60)}`;

function setOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
  }
  console.log(`[reviews] ${name}=${value}`);
}

async function sendEmail(subject, html) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[reviews] RESEND_API_KEY not set; skipping the summary email");
    return;
  }
  const body = { from: FROM, to: [TO], subject, html };
  if (CC) body.cc = [CC];

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`[reviews] Resend failed: ${res.status} ${await res.text()}`);
    return;
  }
  console.log("[reviews] summary email sent");
}

const current = readCurrent();
const previous = readPrevious();

const currReviews = current.reviews || [];
const prevReviews = previous?.reviews || [];
const prevKeys = new Set(prevReviews.map(key));
const added = currReviews.filter((r) => !prevKeys.has(key(r)));

const currAvg = avg(currReviews);
const prevAvg = avg(prevReviews);
const photoCount = currReviews.reduce((s, r) => s + r.photos.length, 0);

const changed = added.length > 0 || currReviews.length !== prevReviews.length || currAvg !== prevAvg;
setOutput("changed", changed ? "true" : "false");
setOutput("total", String(currReviews.length));
setOutput("added", String(added.length));

if (!changed) {
  console.log("[reviews] no change since last run; nothing to commit");
  process.exit(0);
}

const first = previous === null;
const subject = first
  ? `Buzz Off: review corpus created (${currReviews.length} Google reviews)`
  : `Buzz Off: ${added.length} new Google review${added.length === 1 ? "" : "s"} (${currReviews.length} total)`;

const rows = added
  .slice(0, 10)
  .map(
    (r) => `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;"><strong>${r.name}</strong></td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${r.rating} stars</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${(r.text || "").slice(0, 160)}${(r.text || "").length > 160 ? "..." : ""}</td>
    </tr>`,
  )
  .join("");

const html = `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;color:#1C2B1E;">
    <h2 style="color:#1A5C32;margin-bottom:4px;">Monthly review refresh</h2>
    <p style="color:#666;margin-top:0;">The site now shows what the Google listing actually says.</p>
    <p>
      <strong>${currReviews.length}</strong> Google reviews ·
      <strong>${currAvg.toFixed(1)}</strong> average${prevReviews.length ? ` (was ${prevAvg.toFixed(1)} across ${prevReviews.length})` : ""} ·
      <strong>${photoCount}</strong> customer photos
    </p>
    ${added.length ? `<h3 style="color:#1A5C32;">New this month</h3><table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>` : "<p>Rating or count moved, but no new review text.</p>"}
    ${added.length > 10 ? `<p style="color:#666;">...and ${added.length - 10} more.</p>` : ""}
    <p style="margin-top:24px;">
      <a href="${SITE_URL}/reviews" style="color:#E05A2B;">View the reviews page</a>
    </p>
    <p style="color:#999;font-size:12px;margin-top:24px;">
      Automated by review-refresh-monthly.yml. Photos and avatars are downloaded
      into the repo, so they never expire the way Google's own image URLs do.
    </p>
  </div>`;

await sendEmail(subject, html);
