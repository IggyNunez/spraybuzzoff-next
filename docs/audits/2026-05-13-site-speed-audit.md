![Buzz Off](../../public/assets/spraybuzzoffLogo.png)

# Buzz Off — Site Speed Audit

*Pest Control for the Non-Toxic Era.*

**Date:** 2026-05-13
**Stack:** Next.js 16.1.6 (App Router) + React 19 + Tailwind v4 + framer-motion, hosted on Vercel
**Environment audited:** Production (https://spraybuzzoff.com → www.spraybuzzoff.com), warm edge cache
**Pages audited:** 5 (homepage, services, city landing page, reviews, contact)
**Devices audited:** Desktop + Mobile (Slow 4G, 4x CPU)
**Tooling:** Chrome DevTools MCP — Lighthouse + Performance Tracer

---

## Executive Summary

The site is fast. Every page hits LCP under 600ms on desktop with a perfect 0.00 CLS, and the Vercel edge cache is doing real work — the 3.8MB hero video downloads in 114ms, and every hero image is served as a WebP through `_next/image` with a fresh `age` header. SEO scores a clean **100 across all 5 pages** on both desktop and mobile, which means the recent city-landing-page push is landing well.

The headline finding: **/reviews is the outlier**. Its LCP of 462ms is roughly 2x the rest of the site (Services 238ms, Rancho Cucamonga 222ms, Contact 307ms), and a 163ms layout pass on 959 nodes is the cause — render delay alone eats 219ms (47% of LCP). The fix is structural, not network. Three quieter site-wide patterns are also worth fixing: the LCP hero image is missing `fetchpriority="high"` on every page that uses it (`/services`, city pages, `/reviews`), Meta Pixel's deprecated Attribution Reporting API drags Best Practices from a possible 100 down to 77, and a missing-label `<select>` (or `<label>`) plus a missing `llms.txt` keep Agentic Browsing at 33 on the homepage and `/contact`.

None of this is broken. All of it is recoverable in a single afternoon.

---

## Scorecard

### Desktop

| Page | LCP | CLS | DOM | A11y | BP | SEO | Agentic |
|---|---|---|---|---|---|---|---|
| `/` | 🟢 546ms | 🟢 0.00 | 🟢 1,186 | 🟡 90 | 🟠 77 | 🟢 100 | 🔴 33 |
| `/services` | 🟢 238ms | 🟢 0.00 | 🟢 539 | 🟡 90 | 🟠 77 | 🟢 100 | 🟡 67 |
| `/pest-control/rancho-cucamonga` | 🟢 222ms | 🟢 0.00 | 🟢 369 | 🟢 94 | 🟢 96 | 🟢 100 | 🟡 67 |
| `/reviews` | 🟡 462ms | 🟢 0.00 | 🟢 741 | 🟡 90 | 🟠 77 | 🟢 100 | 🟡 67 |
| `/contact` | 🟢 307ms | 🟢 0.00 | 🟢 327 | 🟡 88 | 🟢 96 | 🟢 100 | 🔴 33 |

### Mobile (Lighthouse — Slow 4G, 4x CPU, iPhone viewport)

| Page | A11y | BP | SEO | Agentic |
|---|---|---|---|---|
| `/` | 🟡 86 | 🟠 81 | 🟢 100 | 🔴 33 |
| `/services` | 🟢 94 | 🟠 81 | 🟢 100 | 🟡 67 |
| `/pest-control/rancho-cucamonga` | 🟢 98 | 🟢 100 | 🟢 100 | 🟡 67 |
| `/reviews` | 🟢 94 | 🟠 81 | 🟢 100 | 🟡 67 |
| `/contact` | 🟢 95 | 🟠 81 | 🟢 100 | 🔴 33 |

> Lighthouse mobile excludes Performance — Core Web Vitals on mobile are extrapolated from the desktop trace (typically 2–3x slower on Slow 4G; everything still likely sits in Google's "Good" thresholds with margin).

---

## Core Web Vitals — Desktop Trace Details

### Homepage (`/`)
- **LCP element:** `<video>` (hero video, `/assets/hero-video.mp4`, 3.94MB) — Priority **Low**, range request `bytes 0-3938947/3938948`, served from Vercel edge cache.
- **Phase breakdown:** TTFB 152ms / Load delay 47ms / Load duration 174ms / Render delay 173ms.
- **Worst phase:** Render delay tied with Load duration (32% each). The video's `bytes=0-` initial range only needs to fetch what's playable for first frame; the full 3.8MB doesn't gate paint.

### Services (`/services`)
- **LCP element:** `<img>` `/_next/image?url=/assets/services-hero.jpg&w=1920&q=75` (WebP, edge-cached, ~1ms download).
- **Phase breakdown:** TTFB 56ms / Load delay 24ms / Load duration 80ms / Render delay 78ms.
- **Worst phase:** Load duration (34%). The image arrives in well under a frame; LCP is gated by render readiness.
- **LCPDiscovery check:** `fetchpriority="high"` **FAILED**. Initial priority Low, promoted to High after preload-scanner promotion — late.

### City page — Rancho Cucamonga (`/pest-control/rancho-cucamonga`)
- **LCP element:** `<img>` — same `/assets/services-hero.jpg` reused as the city-page hero.
- **Phase breakdown:** TTFB 57ms / Load delay 22ms / Load duration 89ms / Render delay 54ms.
- **Worst phase:** Load duration (40%). Image arrives in 1ms — page is paint-ready almost immediately.
- **LCPDiscovery check:** `fetchpriority="high"` **FAILED**.

### Reviews (`/reviews`) — the outlier
- **LCP element:** `<img>` — same `services-hero.jpg` reused again.
- **Phase breakdown:** TTFB 51ms / Load delay 121ms / Load duration 71ms / **Render delay 219ms (47% of LCP)**.
- **Worst phase:** Render delay. Layout pass is 163ms on 959 nodes (vs 58–64ms on Services/City). DOM total is 741 elements with depth 11.
- **LCPDiscovery check:** `fetchpriority="high"` **FAILED**, and notably the priority was **never promoted from Low** (unlike Services/City where it eventually went High).

### Contact (`/contact`)
- **LCP element:** `<img>` (hero contact image, nodeId 40).
- **Phase breakdown:** TTFB 55ms / Load delay 22ms / Load duration 64ms / **Render delay 166ms (54%)**.
- **Worst phase:** Render delay. Layout pass is 135ms on 422 nodes — disproportionate to a 327-element DOM, suggesting form CSS doing extra work.

---

## Recurring Issues (Site-Wide)

**1. LCP hero image missing `fetchpriority="high"`** — affects `/services`, all 8 city pages, `/reviews`
- The image is `services-hero.jpg` rendered through Next.js `<Image>` ([src/components/sections/PageHero.tsx](../../src/components/sections/PageHero.tsx) or wherever the shared page hero lives) without the `priority` prop. Initial priority lands at Low and the browser promotes it later via the preload scanner.
- **Measured cost:** Render delay 54–219ms across these pages. The page is paint-ready instantly because the WebP arrives in ~1ms from edge — `priority` would eliminate the late promotion and trim ~20–50ms.
- **Fix shape:** Add `priority` to the `<Image>` component used by the shared page hero. One-line change per template, or one line if it's a single shared component.

**2. Meta Pixel deprecated Attribution Reporting API** — affects `/`, `/services`, `/reviews`
- `connect.facebook.net/en_US/fbevents.js:279` calls `Attribution Reporting`, which Chrome lists as deprecated. The Lighthouse `deprecations` audit scores 0, which drops Best Practices from 96-100 down to **77** on every page where the pixel has time to fire its full lifecycle. City page and `/contact` score 96/100 BP because the audit window happens to not catch it.
- **Measured cost:** Best Practices score drop of 19–23 points. No runtime cost yet (the API still works) — this is a future-proofing flag, not an active perf issue.
- **Fix shape:** Vendor issue. Track Meta's pixel release notes; no action on your side until they ship the migration. Pixel itself is loaded correctly with `next/script` `afterInteractive` ([src/components/tracking/MetaPixel.tsx:28-45](../../src/components/tracking/MetaPixel.tsx)).

**3. Booking drawer `<select>` missing accessible name** — affects `/` and `/contact`
- Lighthouse `select-name` and `agent-accessibility-tree` both fail because at least one `<select>` element has no associated `<label>` or `aria-label`. Likely the booking-drawer state/city select.
- **Measured cost:** Agentic Browsing score **33** (vs 67 elsewhere). LLMs and screen-reader users can't reliably identify the field.
- **Fix shape:** Add `<label>` (or `aria-label`) to every `<select>` in the booking drawer. Likely [src/components/ui/BookingDrawer.tsx](../../src/components/ui/BookingDrawer.tsx) — one accessibility prop per select.

**4. Missing `llms.txt`** — affects every page (4 of 5 desktop, all 5 mobile)
- Lighthouse expects an `llms.txt` at the site root (Markdown describing how LLMs should treat the site). Not present.
- **Measured cost:** Each page loses a few Agentic Browsing points.
- **Fix shape:** Add `public/llms.txt` with a 10-line summary (business name, services, cities served, link to sitemap). Cheap.

**5. `image-aspect-ratio` failure** — affects all 5 desktop pages
- One or more `<Image>` components render at a size whose width/height ratio doesn't match the source's natural aspect, causing visible stretch/squish.
- **Measured cost:** Visual quality, not perf. Doesn't move CLS because the dimensions are locked.
- **Fix shape:** Audit `<Image>` `width`/`height` props against source file dimensions for the components that fail. Likely 1–3 components.

**6. `target-size`** — affects all 5 desktop pages
- Two or more clickable elements are under the 44x44px target-size threshold.
- **Measured cost:** Accessibility score sits at 88–90 instead of 95+. Mobile users have to aim.
- **Fix shape:** Identify the failing touch targets (nav icons or footer links are the usual culprits) and bump them.

**7. `heading-order`** — affects `/`, `/services`, `/reviews`
- Headings skip levels somewhere (e.g., `<h1>` → `<h3>` without `<h2>`).
- **Measured cost:** A11y score drop and screen-reader nav cost.
- **Fix shape:** Audit heading levels in each affected page's section components.

---

## What's Already Working

Specific things this audit confirms are not problems:

- **CLS is 0.00 on every page, desktop and mobile.** Image dimensions are locked, fonts don't reflow. This is a benchmark result.
- **SEO is 100 across all 10 audits (5 pages × 2 devices).** Recent city-landing-page work and JSON-LD additions are paying off.
- **Vercel edge cache is doing its job.** Every LCP resource shows a non-zero `age` header (45–46K seconds for hero images, ~1.5M for the hero video). Download durations are 1–114ms even for large assets.
- **Image format and pipeline.** Every hero serves as WebP through `_next/image` with q=75 — no manual config drift.
- **`next/font` self-hosted.** Bebas Neue, DM Sans, and Playfair Display all serve from `_next/static/media`, not Google Fonts CDN. No 3rd-party font hit.
- **Third-party weight is bounded.** Facebook 564.6KB / 34–67ms main-thread is the only meaningful 3rd-party; GorillaDesk is 309 bytes. Compared to typical Shopify or marketing-site weight (multi-MB), this is light.
- **DOM sizes are all under 1,200 elements** — well under Google's 1,500 budget.
- **No render-blocking third-party scripts in `<head>`.** Meta Pixel uses `next/script` `afterInteractive` correctly.
- **City page is the cleanest page in the audit:** BP 96 desktop / 100 mobile, A11y 94 desktop / 98 mobile. The newest template is also the strongest.

---

## Recommendations (ROI-ordered)

### P0 — Fix `/reviews` render delay (462ms LCP, 163ms layout pass)
- **What:** Audit the `/reviews` page composition for whatever's adding 100+ms of layout vs other pages. With 741 DOM elements and depth 11 producing a 163ms layout pass (vs Services' 64ms on 539 elements), the cost per node is roughly 2x. Likely culprits: deeply-nested testimonial cards, an SVG-heavy decoration, or framer-motion measuring elements on mount.
- **Files:** [src/app/reviews/page.tsx](../../src/app/reviews/page.tsx), plus any testimonial card component it imports.
- **Estimated impact:** 100–150ms LCP reduction → matches the rest of the site.
- **Effort:** 30–60 min investigation, smaller for the fix.

### P1 — Add `priority` to the shared page hero `<Image>`
- **What:** Add `priority` prop to the `<Image>` component used as LCP on `/services`, all 8 city pages, and `/reviews`.
- **Files:** Wherever the shared page hero lives (search for `services-hero.jpg` in [src/components](../../src/components)).
- **Estimated impact:** 20–50ms LCP reduction across 10 pages.
- **Effort:** 1 line of code, one file.

### P2 — Fix the `<select>` label in the booking drawer
- **What:** Add `<label htmlFor="...">` or `aria-label` to every `<select>` in [src/components/ui/BookingDrawer.tsx](../../src/components/ui/BookingDrawer.tsx).
- **Files:** [src/components/ui/BookingDrawer.tsx](../../src/components/ui/BookingDrawer.tsx).
- **Estimated impact:** Agentic Browsing 33 → 67+ on homepage and `/contact`. Accessibility score nudge.
- **Effort:** 5 minutes.

### P3 — Add `public/llms.txt`
- **What:** Create a Markdown file at site root describing the business for LLMs (services, cities, contact, sitemap link).
- **Files:** New file: `public/llms.txt`.
- **Estimated impact:** Agentic Browsing score nudge on every page.
- **Effort:** 10 minutes.

### P4 — Fix `target-size` failures
- **What:** Identify the 2+ touch targets under 44x44px and increase their hit area (likely via padding).
- **Files:** TBD — Lighthouse JSON identifies the elements. Probable suspects: nav icons, footer social links.
- **Estimated impact:** Accessibility score 88–90 → 95+.
- **Effort:** 15–30 min.

### P5 — Fix `heading-order` on `/`, `/services`, `/reviews`
- **What:** Walk the affected pages and renumber headings so levels don't skip.
- **Files:** Section components imported by [src/app/page.tsx](../../src/app/page.tsx), [src/app/services/page.tsx](../../src/app/services/page.tsx), [src/app/reviews/page.tsx](../../src/app/reviews/page.tsx).
- **Estimated impact:** A11y 90 → 95.
- **Effort:** 15–30 min.

### P6 — Fix `image-aspect-ratio` failures
- **What:** Audit `<Image>` `width`/`height` props for the 1–3 components failing the ratio check.
- **Files:** TBD from Lighthouse JSON.
- **Estimated impact:** Visual quality + small BP nudge.
- **Effort:** 15 min.

### Deferred — Meta Pixel `Attribution Reporting` deprecation
- Vendor issue. Best Practices on `/`, `/services`, `/reviews` stays at 77 until Meta ships the migration. No action.

### Not recommended — Hero video changes
- The 3.8MB `hero-video.mp4` on the homepage is doing fine: range request, edge-cached, downloads in 114ms, LCP 546ms with CLS 0.00. The autoplay + `playsInline` setup is correct. Don't touch.

---

## Methodology Notes

- **Desktop traces:** No CPU or network throttling — measures the experience a user on a fast connection actually gets. Vercel edge cache was warm (every LCP request shows a non-zero `age` response header).
- **Mobile:** Lighthouse Slow 4G + 4x CPU + iPhone viewport. Note: Chrome DevTools MCP's `performance_start_trace` does not apply mobile emulation, so mobile Performance/CWV are extrapolated from desktop trace numbers, not measured directly. Lighthouse Accessibility/BP/SEO/Agentic on mobile are measured at the mobile profile correctly.
- **Real-user (CrUX) data:** Not available — site doesn't have enough traffic in the Chrome User Experience Report dataset yet. Lab numbers only.
- **Environment:** Production (`spraybuzzoff.com`, which 301s to `www.spraybuzzoff.com`). Not a preview deployment.
- **Best Practices score volatility:** The `deprecations` audit (Meta Pixel's Attribution Reporting) fires only when the pixel finishes its full lifecycle inside Lighthouse's audit window. On `/pest-control/rancho-cucamonga` and `/contact` it didn't, which is why those pages score BP 96 instead of 77. This is timing-dependent, not a page-specific fix.

---

## Audit Provenance

Raw Lighthouse JSON + HTML reports saved by Chrome DevTools MCP (paths are session-local, will rotate):

| Page | Desktop JSON | Mobile JSON |
|---|---|---|
| `/` | `chrome-devtools-mcp-QkAtlB/report.json` | `chrome-devtools-mcp-DCR7Mb/report.json` |
| `/services` | `chrome-devtools-mcp-VC43aH/report.json` | `chrome-devtools-mcp-Dy1i81/report.json` |
| `/pest-control/rancho-cucamonga` | `chrome-devtools-mcp-UTrpEG/report.json` | `chrome-devtools-mcp-fpGkBc/report.json` |
| `/reviews` | `chrome-devtools-mcp-uIN44s/report.json` | `chrome-devtools-mcp-ecnfK6/report.json` |
| `/contact` | `chrome-devtools-mcp-7RcTF6/report.json` | `chrome-devtools-mcp-a79HrC/report.json` |

Base path on this machine: `C:\Users\iggyn\AppData\Local\Temp\<folder>\`.

**To re-run:** Invoke the `site-speed-audit` skill against `spraybuzzoff.com` (or run the trace/Lighthouse sequence described in [.claude/skills/site-speed-audit/SKILL.md](../../../.claude/skills/site-speed-audit/SKILL.md) if it's installed there).

**Next time, compare against:** the LCP and DOM numbers in the per-page sections above. If `/reviews` LCP drops below 300ms, the P0 fix worked. If site-wide LCP image priority is fixed, every `LCPDiscovery` insight in the next audit should show `fetchpriority=high: PASSED`.
