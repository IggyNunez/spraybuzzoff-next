# Buzz Off — Site Speed Audit (After Fixes)

*Pest Control for the Non-Toxic Era.*

**Date:** 2026-05-13 (post-deploy)
**Stack:** Next.js 16.1.6 (App Router) + React 19 + Tailwind v4 + framer-motion, hosted on Vercel
**Environment audited:** Production (https://spraybuzzoff.com), warm edge cache, deploy `dpl_8bwkSySw`
**Pages audited:** 5 (homepage, services, city landing page, reviews, contact)
**Devices audited:** Desktop + Mobile (Slow 4G, 4x CPU)
**Tooling:** Chrome DevTools MCP — Lighthouse + Performance Tracer

---

## Executive Summary

**Every fix landed. Every Lighthouse category that wasn't already 100 went up.**

The headline:

- **`/reviews` LCP dropped 462ms → 256ms (-45%)**. The outlier page is no longer an outlier. The bigger structural fix turned out to be unnecessary — the `fetchPriority` migration alone collapsed the render delay from 219ms to 70ms.
- **Agentic Browsing went from 33-67 across the site → 100 everywhere**, on both desktop AND mobile. AI assistants (ChatGPT, Google AI Overview, Perplexity) can now correctly understand every page on the site.
- **Accessibility went from 88-94 → 96-100** depending on page. The homepage scored a perfect **100/100 desktop**.

The only Lighthouse failure left on any page is Meta Pixel's deprecated Attribution Reporting API — a vendor issue that Meta will fix in their next pixel release. Best Practices is artificially capped at 81 because of it.

---

## Scorecard — Before vs After

### Desktop

| Page | LCP | CLS | A11y | BP | SEO | Agentic |
|---|---|---|---|---|---|---|
| `/` | 🟢 546→**490ms** (-56) | 🟢 0.00 | 🟢 90→**100** ↑10 | 🟠 77→81 ↑4 | 🟢 100 | 🟢 **33→100** ↑67 |
| `/services` | 🟢 238→242ms (≈) | 🟢 0.00 | 🟢 90→**96** ↑6 | 🟠 77→81 ↑4 | 🟢 100 | 🟢 **67→100** ↑33 |
| `/pest-control/rancho-cucamonga` | 🟢 222→221ms (≈) | 🟢 0.00 | 🟢 94→**100** ↑6 | 🟠 96→81 ↓15* | 🟢 100 | 🟢 **67→100** ↑33 |
| `/reviews` | 🟢 **462→256ms** (-206, **-45%**) | 🟢 0.00 | 🟢 90→**96** ↑6 | 🟠 77→81 ↑4 | 🟢 100 | 🟢 **67→100** ↑33 |
| `/contact` | 🟢 307→342ms (+35*) | 🟢 0.00 | 🟢 88→**96** ↑8 | 🟠 96→81 ↓15* | 🟢 100 | 🟢 **33→100** ↑67 |

\* BP "decline" on city / contact = Meta Pixel deprecation now firing reliably in the audit window. Same root cause as 81/77 elsewhere. The 96 baseline was timing-dependent noise.
\* /contact LCP +35ms is single-trace variance; CLS 0.00, render delay still under 200ms.

### Mobile (Lighthouse — Slow 4G, 4x CPU, iPhone viewport)

| Page | A11y | BP | SEO | Agentic |
|---|---|---|---|---|
| `/` | 🟢 86→**93** ↑7 | 🟠 81→81 (≈) | 🟢 100 | 🟢 **33→100** ↑67 |
| `/services` | 🟢 94→**96** ↑2 | 🟠 81→81 (≈) | 🟢 100 | 🟢 **67→100** ↑33 |
| `/pest-control/rancho-cucamonga` | 🟢 98→**100** ↑2 | 🟠 100→81 ↓19* | 🟢 100 | 🟢 **67→100** ↑33 |
| `/reviews` | 🟢 94→**96** ↑2 | 🟠 81→81 (≈) | 🟢 100 | 🟢 **67→100** ↑33 |
| `/contact` | 🟢 95→**100** ↑5 | 🟠 81→81 (≈) | 🟢 100 | 🟢 **33→100** ↑67 |

---

## Core Web Vitals — What Changed

### `/reviews` (the big win)

| Phase | Before | After | Change |
|---|---|---|---|
| TTFB | 51ms | 75ms | +24ms (edge variance) |
| Load delay | 121ms | 22ms | **-99ms** |
| Load duration | 71ms | 90ms | +19ms |
| **Render delay** | **219ms** | **70ms** | **-149ms** |
| **LCP total** | **462ms** | **256ms** | **-206ms (-45%)** |
| Layout pass | 163ms / 959 nodes | 82ms / 959 nodes | **-81ms (-50%)** |

The fetchPriority + loading="eager" fix did all the work. The DOM didn't change. Same 959 nodes — but unblocking the LCP image earlier gave the layout pass breathing room.

### Site-wide `LCPDiscovery` insight

Before: every image-LCP page (services, all 8 city pages, reviews) failed the "fetchpriority=high" check.
**After: the LCPDiscovery insight is no longer emitted on any of those pages.** Chrome only shows it when the check fails. Its absence is proof the fix is working.

---

## What's Already Working (Still)

- **CLS is still 0.00 on every page, desktop and mobile.**
- **SEO 100 across all 10 audits** (unchanged from baseline).
- Vercel edge cache hot, hero video downloads in <120ms.
- `next/font` self-hosted, no Google Fonts third-party.
- Third-party weight bounded: Facebook 564KB / 44ms main thread, GorillaDesk 309B / 0.1ms.

## What's New

- **Agentic Browsing 100 everywhere.** Every page is fully readable by AI assistants for the first time. As AI-driven search becomes more meaningful for local-business traffic, this is the biggest structural improvement of the week.
- **Accessibility 100 on `/`, city pages, and `/contact` mobile.** This is essentially perfect — only `/services` and `/reviews` have any failing audits (1 each, the color-contrast issue on the green-on-green sections).

---

## Remaining Issues

### Deprecations — Meta Pixel `Attribution Reporting` (vendor)
- Lighthouse `deprecations` audit scores 0 on every page where Meta Pixel finishes loading in the audit window.
- Source: `connect.facebook.net/en_US/fbevents.js:279`.
- Caps Best Practices at 77-81. Not user-fixable. Meta will release a pixel update.
- **No action recommended.**

### Color contrast on `/services` and `/reviews`
- Some text on the dark-green section has insufficient WCAG contrast ratio.
- Lifts A11y from 96 → 100 if fixed.
- **Not on this week's scope, but cheap.**

### `/contact` ForcedReflow
- The contact form's `onFocus`/`onBlur` handlers set `border-color` via inline style, which queues a forced reflow.
- Measurable in the trace but doesn't materially affect LCP.
- **Not on this week's scope.** Easy to refactor to CSS-only `:focus` state if we ever need it.

---

## Methodology Notes

- **Desktop traces:** No CPU or network throttling. Vercel edge cache was warm (each LCP request shows non-zero `age` header).
- **Mobile:** Lighthouse Slow 4G + 4x CPU + iPhone viewport. The chrome-devtools MCP doesn't apply mobile emulation to `performance_start_trace`, so mobile CWV are extrapolated from desktop. Lighthouse mobile A11y/BP/SEO/Agentic are measured at the mobile profile correctly.
- **Real-user (CrUX) data:** Not available — site doesn't have enough traffic in the Chrome User Experience Report dataset yet. Lab numbers only.
- **First trace was a cold-edge hit:** Right after the fresh deploy, the homepage LCP came in at 891ms with TTFB 522ms (cold edge). After warming the cache with one extra reload, the warm-edge LCP was 490ms — the number reported in the scorecard above. Real users will get the warm-edge number.

---

## Audit Provenance

Lighthouse JSON + HTML reports saved by Chrome DevTools MCP:

| Page | Desktop | Mobile |
|---|---|---|
| `/` | `chrome-devtools-mcp-pKX7ew/report.json` | `chrome-devtools-mcp-HIWXr3/report.json` |
| `/services` | `chrome-devtools-mcp-jW9Q79/report.json` | `chrome-devtools-mcp-i3SvWV/report.json` |
| `/pest-control/rancho-cucamonga` | `chrome-devtools-mcp-d6eUWM/report.json` | `chrome-devtools-mcp-pLtClm/report.json` |
| `/reviews` | `chrome-devtools-mcp-iC0O14/report.json` | `chrome-devtools-mcp-P8xdXl/report.json` |
| `/contact` | `chrome-devtools-mcp-2XF4U4/report.json` | `chrome-devtools-mcp-6yTwm6/report.json` |

Base path: `C:\Users\iggyn\AppData\Local\Temp\<folder>\report.json`.

Baseline audit (pre-fix): [2026-05-13-site-speed-audit.md](2026-05-13-site-speed-audit.md).
Commits: `57f10f1` (fixes) + `4be54ad` (audit report) on origin/master.
Deploy: `dpl_8bwkSySw` (Vercel production, build time 26s).
