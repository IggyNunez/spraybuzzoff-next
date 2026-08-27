/**
 * Pull every review off the Google Business Profile and write them to
 * data/google-reviews.json, which the /reviews page renders.
 *
 * Google has no "read my reviews" API on the newer Business Profile
 * endpoints — reviews still live on the legacy My Business v4 API, which
 * the `business.manage` scope we already request covers. So this reuses
 * the same OAuth credentials as the weekly SEO digest.
 *
 * Required env:
 *   GOOGLE_OAUTH_CLIENT_ID
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   GOOGLE_OAUTH_REFRESH_TOKEN
 *   GBP_ACCOUNT_ID     the numeric account id (accounts/<id>)
 *   GBP_LOCATION_ID    the numeric location id (locations/<id>)
 *
 * Usage:
 *   node .github/scripts/phase2/fetch-gbp-reviews.mjs
 *   node .github/scripts/phase2/fetch-gbp-reviews.mjs --dry-run
 *
 * Reviews with no written comment still count toward the profile total
 * (a bare 5-star rating), so `totalReviewCount` is taken from the API's
 * own count rather than from the length of the list we render.
 */
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { getAccessToken, googleFetch } from "./google-auth.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = resolve(HERE, "../../../data/google-reviews.json");
const DRY_RUN = process.argv.includes("--dry-run");

const ACCOUNT = process.env.GBP_ACCOUNT_ID;
const LOCATION = process.env.GBP_LOCATION_ID;

if (!ACCOUNT || !LOCATION) {
  console.error(
    "Missing GBP_ACCOUNT_ID / GBP_LOCATION_ID.\n\n" +
      "Find them at https://business.google.com — the URL of the location\n" +
      "dashboard contains both ids. Then:\n" +
      '  $env:GBP_ACCOUNT_ID = "123456789"\n' +
      '  $env:GBP_LOCATION_ID = "987654321"\n',
  );
  process.exit(1);
}

// The v4 API returns star ratings as words, not numbers.
const STAR_VALUES = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-03-15T18:02:11.123Z" → "March 2026", matching the format the page renders. */
function formatDate(iso) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

async function fetchAllReviews(accessToken) {
  const base =
    `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT}` +
    `/locations/${LOCATION}/reviews?pageSize=50`;

  const reviews = [];
  let totalReviewCount = 0;
  let averageRating = null;
  let pageToken = null;

  do {
    const url = pageToken ? `${base}&pageToken=${encodeURIComponent(pageToken)}` : base;
    const page = await googleFetch(url, { accessToken });
    reviews.push(...(page?.reviews || []));
    // These two come back on every page; the last one wins, they don't change.
    totalReviewCount = page?.totalReviewCount ?? totalReviewCount;
    averageRating = page?.averageRating ?? averageRating;
    pageToken = page?.nextPageToken || null;
  } while (pageToken);

  return { reviews, totalReviewCount, averageRating };
}

function toPageShape(raw) {
  return raw
    .filter((r) => r.comment && r.comment.trim())
    .map((r) => ({
      name: r.reviewer?.displayName?.trim() || "Google Customer",
      rating: STAR_VALUES[r.starRating] ?? 5,
      date: formatDate(r.createTime),
      // Google appends machine translations as "(Original) ...". Keep the
      // reviewer's own words, drop the translation block.
      text: r.comment.split("\n\n(Original)")[0].replace(/^\(Translated by Google\)\s*/, "").trim(),
    }));
}

async function main() {
  const accessToken = await getAccessToken();
  const { reviews, totalReviewCount, averageRating } = await fetchAllReviews(accessToken);

  const mapped = toPageShape(reviews);
  console.log(
    `[gbp] ${totalReviewCount} reviews on the profile, ` +
      `${mapped.length} with written text, average ${averageRating ?? "n/a"}`,
  );

  const existing = JSON.parse(readFileSync(OUT_FILE, "utf-8"));
  const payload = {
    _comment: existing._comment,
    fetchedAt: new Date().toISOString().slice(0, 10),
    totalReviewCount: totalReviewCount || mapped.length,
    averageRating: averageRating ?? existing.averageRating,
    reviews: mapped,
  };

  if (DRY_RUN) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + "\n", "utf-8");
  console.log(`[gbp] wrote ${OUT_FILE}`);
  console.log(
    "[gbp] remember to bump reviewCount in src/components/seo/JsonLd.tsx " +
      "if the total moved.",
  );
}

main().catch((err) => {
  console.error("[gbp] failed:", err.message);
  process.exit(1);
});
