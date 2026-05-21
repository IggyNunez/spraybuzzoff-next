# GSC Audit Report — spraybuzzoff.com
**Date:** 2026-05-21  
**Auditor:** Claude Code (automated)

---

## 1. Canonical Tag Audit (per-page, source code)

### Root layout — the potential bug site

`src/app/layout.tsx:86` sets a site-wide canonical:

```ts
alternates: {
  canonical: SITE_URL, // "https://spraybuzzoff.com"
}
```

In Next.js App Router, child-segment metadata **replaces** the parent's matching key. Since every route in this repo exports its own `alternates.canonical`, the root-layout value is overridden at every URL. This is structurally the same root cause as standoutexterior.com, but **the fix is already in place** — all pages already self-canonicalize.

### Per-page results

| Route | File | Canonical set | Value | Status |
|---|---|---|---|---|
| `/` | `src/app/page.tsx:23` | Yes | `https://spraybuzzoff.com` | ✅ PASS |
| `/about-us` | `src/app/about-us/layout.tsx:7` | Yes | `https://spraybuzzoff.com/about-us` | ✅ PASS |
| `/contact` | `src/app/contact/layout.tsx:7` | Yes | `https://spraybuzzoff.com/contact` | ✅ PASS |
| `/services` | `src/app/services/layout.tsx:7` | Yes | `https://spraybuzzoff.com/services` | ✅ PASS |
| `/reviews` | `src/app/reviews/layout.tsx:7` | Yes | `https://spraybuzzoff.com/reviews` | ✅ PASS |
| `/privacy` | `src/app/privacy/layout.tsx:7` | Yes | `https://spraybuzzoff.com/privacy` | ✅ PASS |
| `/terms` | `src/app/terms/layout.tsx:7` | Yes | `https://spraybuzzoff.com/terms` | ✅ PASS |
| `/pest-control` | `src/app/pest-control/page.tsx:14` | Yes | `https://spraybuzzoff.com/pest-control` | ✅ PASS |
| `/pest-control/[city]` | `src/app/pest-control/[city]/page.tsx:33` | Yes | `https://spraybuzzoff.com/pest-control/{slug}` | ✅ PASS |

**All 9 routes (static + dynamic) pass. The standoutexterior bug does not exist here.**

### Live HTML verification

**Status: BLOCKED.** Both `spraybuzzoff.com` and the Vercel preview deployment URLs return either `403 host_not_allowed` (custom domain) or `401 SSO authentication required` (preview URLs) from this cloud execution environment. Live canonical HTML could not be confirmed via curl.

The code-based audit is authoritative for the current `master` branch (latest production deployment `dpl_263tLkSk7ow6FBbfJpfJm9BX3oWF`, committed 2026-05-13).

---

## 2. Deployment Architecture

Two Vercel projects build from the **same** `IggyNunez/spraybuzzoff-next` GitHub repo:

| Vercel project | Custom domain | Role |
|---|---|---|
| `spraybuzzoff` (`prj_5Dvbsd94m9a0VxEcuJnekLdyQrO4`) | `spraybuzzoff.com`, `www.spraybuzzoff.com` | **Production (live site)** |
| `spraybuzzoff-next` (`prj_ptvomfG3YeQ3F1TCMmaTik8mJJaK`) | None (Vercel subdomains only) | Preview / staging |

Every push to `master` deploys both simultaneously. The `spraybuzzoff` project serves all production traffic.

---

## 3. SC Properties & Redirect Behavior

**Status: PARTIALLY BLOCKED.**

Both `spraybuzzoff.com` (apex) and `www.spraybuzzoff.com` are registered as Vercel domains on the production project. Vercel designates one as primary and 301-redirects the other.

**Cannot confirm redirect direction from this environment** (both return `403 host_not_allowed`).

### Why this matters for the "Page with redirect" GSC alerts

The sitemap (`src/app/sitemap.ts:4`) uses `https://spraybuzzoff.com` (apex, no-www) as its base. If Vercel's primary domain is `www.spraybuzzoff.com` and it 301-redirects apex to www, every sitemap entry is a redirect URL from Google's perspective — exactly matching the "Page with redirect" GSC error pattern reported 2026-03-22 and 2026-04-30.

**Action needed:** In the Vercel dashboard → `spraybuzzoff` project → Domains, confirm which domain is marked as primary. It should be `spraybuzzoff.com` (matching the sitemap and all canonical tags). If `www.spraybuzzoff.com` is primary, either:
1. Swap the primary to apex (`spraybuzzoff.com`), or
2. Update all canonicals and sitemap to use `https://www.spraybuzzoff.com`

---

## 4. GSC Email Triage

**Status: UNAVAILABLE.** The Gmail MCP server returned a token-expired error. Email triage could not be completed. The following analysis is based solely on the GSC alert timeline provided in the task brief.

### Alert timeline interpretation

| Date | Alert | Interpretation |
|---|---|---|
| 2026-03-22 | "Page with redirect" | Sitemap URLs redirecting (www/apex mismatch or old-site redirect chains) |
| 2026-03-26 | "Alternate page with proper canonical tag" | Pages Google demoted because their canonical pointed to the homepage rather than themselves. Consistent with an earlier state of this codebase before per-page canonicals were added. |
| 2026-03-27 | Review snippets — issue + fix submission | JSON-LD type was `PestControlService` which GSC doesn't support for review rich results. Fix submitted. |
| 2026-03-28 | Review snippets — **validated successfully** | Fix confirmed working. Rich results active. |
| 2026-04-17 | Page indexing fix — **validation in progress** | A canonical fix was submitted to GSC. 28-day revalidation window still open as of that date. |
| 2026-04-30 | "Page with redirect" (new) | Same redirect-class issue. Still unresolved, likely the www/apex mismatch. |

### Open issues as of 2026-04-30

1. **"Page with redirect"** — www/apex redirect mismatch (see §3 above). Not a code bug; requires Vercel domain configuration.
2. **Page indexing validation in progress** (started 2026-04-17) — no newer alert, so still within GSC's revalidation window. Expected to resolve if per-page canonicals are confirmed correct in live HTML.

### Resolved issues

- Review snippets structured data — **validated 2026-03-28** ✅

---

## 5. Does the standoutexterior fix apply here?

**No.** The standoutexterior.com bug was: every page inherited the root layout's `canonical: SITE_URL`, causing Google to see all pages as duplicates of the homepage.

Spraybuzzoff.com **already has per-page canonicals** on every route. The codebase applied the fix before or concurrently with the standoutexterior fix. The "Alternate page with proper canonical tag" GSC alert from 2026-03-26 suggests this was an issue in an earlier deployment (possibly before the SEO overhaul commit `4cd876e` on 2026-03-24 which added "per-page metadata via layout.tsx for all routes"), and the April validation in progress is GSC reprocessing those pages.

---

## 6. Action Taken

**No code changes made. No PR opened.**

The canonical bug from standoutexterior does not exist in this codebase. All routes already self-canonicalize correctly.

### Recommended next steps (manual, outside code)

| Priority | Action | Owner |
|---|---|---|
| HIGH | Verify Vercel domain primary: confirm `spraybuzzoff.com` (apex) is primary, not `www`. This is the most likely cause of the persistent "Page with redirect" GSC alerts. | Vercel dashboard |
| MEDIUM | Confirm live canonical HTML once the site is accessible (disable Vercel SSO for preview, or check from a local browser). Specifically verify `/services`, `/reviews`, `/pest-control` and one city page. | Dev / browser |
| LOW | Re-authorize Gmail MCP and re-run GSC email triage to catch any alerts newer than 2026-04-30. | Gmail MCP |
| LOW | Once the "Page with redirect" is fixed (Vercel domain config), submit sitemap re-validation in GSC. | GSC console |

---

## Appendix: Files Audited

```
src/app/layout.tsx              — root layout, canonical set to SITE_URL (overridden by children)
src/app/page.tsx                — homepage canonical: https://spraybuzzoff.com
src/app/about-us/layout.tsx     — /about-us canonical: correct
src/app/contact/layout.tsx      — /contact canonical: correct
src/app/services/layout.tsx     — /services canonical: correct
src/app/reviews/layout.tsx      — /reviews canonical: correct
src/app/privacy/layout.tsx      — /privacy canonical: correct
src/app/terms/layout.tsx        — /terms canonical: correct
src/app/pest-control/page.tsx   — /pest-control canonical: correct
src/app/pest-control/[city]/page.tsx  — dynamic city canonical: correct per slug
src/app/sitemap.ts              — base URL: https://spraybuzzoff.com (apex, no-www)
src/app/robots.ts               — sitemap URL: https://spraybuzzoff.com/sitemap.xml
```
