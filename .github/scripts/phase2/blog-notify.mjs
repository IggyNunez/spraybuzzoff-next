/**
 * Blog-published notifier.
 *
 * Runs from the blog-published GitHub Action after a new post lands on
 * master. Emails the LIVE link of the just-published post via Resend.
 *
 * Robust by design: instead of executing the TypeScript blog index
 * (which needs a TS loader and may import other modules), it reads the
 * post slug + title directly from the post's own source file, passed in
 * via the POST_FILE env var (the Action computes which blog file changed
 * in the triggering commit). Falls back to scanning src/content/blog for
 * the newest file if POST_FILE is not provided.
 *
 * Site URL + email FROM/TO come from seo-stack.config.mjs.
 * Required env: RESEND_API_KEY. Optional: POST_FILE (path to the post .ts).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, EMAIL } from "../../../seo-stack.config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..", "..");
const BLOG_DIR = join(ROOT, "src", "content", "blog");
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SITE_URL = SITE.url.replace(/\/$/, "");
const PROJECT_NAME = SITE.projectName;

/** Pull a string field value out of a post source file via regex. */
function field(src, names) {
  for (const n of names) {
    const m = src.match(new RegExp(`${n}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`));
    if (m) return m[1];
  }
  return "";
}

function pickFile() {
  if (process.env.POST_FILE) {
    // Absolute (POSIX /… or Windows C:\…) → use as-is; else repo-relative.
    const pf = process.env.POST_FILE;
    const isAbs = pf.startsWith("/") || /^[A-Za-z]:[\\/]/.test(pf);
    return isAbs ? pf : join(ROOT, pf);
  }
  // Fallback: newest .ts in the blog dir that isn't the index.
  const files = readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => ({ f, t: statSync(join(BLOG_DIR, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  return files.length ? join(BLOG_DIR, files[0].f) : null;
}

function buildHtml({ title, desc, kw, url }) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;"><tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
      <tr><td style="background:linear-gradient(135deg,#0A2E5C 0%,#2B7DE9 100%);padding:24px 30px;color:#fff;">
        <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;">New blog published &middot; ${PROJECT_NAME}</div>
        <div style="font-size:19px;font-weight:800;margin-top:4px;">${escapeHtml(title)}</div>
      </td></tr>
      <tr><td style="padding:22px 30px;">
        ${kw ? `<p style="margin:0 0 8px;font-size:12px;color:#2B7DE9;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Target keyword: ${escapeHtml(kw)}</p>` : ""}
        ${desc ? `<p style="margin:0 0 18px;font-size:14px;color:#475569;line-height:1.5;">${escapeHtml(desc)}</p>` : ""}
        <a href="${url}" style="display:inline-block;background:#00A651;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:8px;">View live post &rarr;</a>
        <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">${url}</p>
      </td></tr>
      <tr><td style="padding:18px 30px;border-top:1px solid #e5e7eb;background:#f8fafc;">
        <div style="font-size:11px;color:#94a3b8;">Silent SEO blog &middot; indexed in the sitemap, not linked in nav. Automated by the weekly blog routine.</div>
      </td></tr>
    </table>
  </td></tr></table>
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const file = pickFile();
  if (!file) {
    console.log("[blog-notify] no post file found, nothing to send");
    return;
  }
  const src = readFileSync(file, "utf-8");
  const slug = field(src, ["slug"]) || file.split(/[\\/]/).pop().replace(/\.ts$/, "");
  const title = field(src, ["title", "h1"]) || slug;
  const desc = field(src, ["metaDescription", "description", "excerpt"]);
  const kw = field(src, ["targetKeyword", "keyword"]);
  const url = `${SITE_URL}/blog/${slug}`;

  console.log("[blog-notify] post:", slug, "->", url);

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: EMAIL.from,
      to: [EMAIL.to],
      cc: EMAIL.cc ? [EMAIL.cc] : undefined,
      subject: `New blog live: ${title} · ${PROJECT_NAME}`,
      html: buildHtml({ title, desc, kw, url }),
    }),
  });
  if (!res.ok) throw new Error(`resend failed: ${res.status}\n${await res.text()}`);
  console.log("[blog-notify] emailed", EMAIL.to);
}

main().catch((err) => {
  console.error("[blog-notify] FATAL:", err);
  process.exit(1);
});
