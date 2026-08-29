# Pre-Launch Checklist

Plain Talk Developers. Run this before pointing a client's domain at a new build,
and again after the first production deploy.

Written 2026-08-23 from a real audit of plaintalk.dev. Most items here exist because
something actually broke, not because they sound sensible. Those are marked **(bit us)**.

---

## 1. Routing and build config

The single most expensive class of bug: a page that exists in the repo, is linked from
the nav, and is completely absent from production.

- [ ] **Every page has a build input entry.** In Vite MPA projects, `vite.config.js` →
      `build.rollupOptions.input` must list every HTML page. Pages not listed are never
      emitted to `dist/`, no matter what the rewrites say. **(bit us)**
- [ ] **Every rewrite target actually exists in the build output.** Cross-check
      `vercel.json` rewrites against `ls dist/`. A rewrite pointing at a file that was
      never built produces a silent 404.
- [ ] **Curl every route after deploy**, not just the homepage:
      ```bash
      for u in / /about/ /contact/ /thank-you/ /book/ /intake/; do
        printf "%-24s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' https://DOMAIN$u)"
      done
      ```
- [ ] Trailing-slash and non-slash variants both resolve.
- [ ] 404 page renders and is not a blank white screen.

> **What happened:** plaintalk.dev's `/thank-you/` had a `vercel.json` rewrite but was
> missing from the Vite inputs. It 404'd in production for an unknown length of time.
> Nobody noticed because nobody visits it directly. See section 2 for why that was costly.

## 2. Conversion tracking (do this before spending a cent on ads)

- [ ] **Submit the real form on production** and follow where it lands. Do not assume.
- [ ] The thank-you / confirmation page **returns 200**, not 404. **(bit us)**
- [ ] Google Ads conversion tag fires on that page. Confirm the ID matches the account.
- [ ] Meta Lead event fires if a pixel is installed.
- [ ] GA4 property exists and is receiving the pageview. An Ads tag alone is not analytics.
- [ ] Conversion is visible in the Google Ads UI within 24-48h of the test submission.
- [ ] Lead lands in the client's inbox **and** their CRM, if one is wired.

> **What happened:** every form lead on plaintalk.dev redirected to a 404, so the Ads
> conversion never fired. Ad spend was being optimised against conversion data that was
> never collected. Treat historic conversion counts as unreliable after fixing this.

## 3. Images

Images are almost always the largest Lighthouse deduction on a content site.

- [ ] **Measure the rendered width before exporting.** Open the page, read the real
      rendered box, and size to that. Do not guess.
      ```js
      document.querySelector('.your-image-container').getBoundingClientRect().width
      ```
- [ ] Export **WebP**, not JPEG. Typical saving is 60-70% at quality 80. **(bit us)**
- [ ] Provide `srcset` with a small and a 2x variant, and cap `sizes` so a DPR-1 browser
      picks the small file:
      ```html
      sizes="(max-width: 900px) 100vw, min(52vw, 700px)"
      ```
      An overstated `sizes` makes every browser download the 2x file. **(bit us)**
- [ ] `width` and `height` on every `<img>` so layout does not shift.
- [ ] `loading="lazy"` and `decoding="async"` on anything below the fold.
- [ ] Hero / LCP image is **not** lazy-loaded.
- [ ] Video posters are WebP too. They are easy to miss.

> **What happened:** three carousel photos exported at 2000px for a container that renders
> at 699px. 883KB of JPEG became 277KB of correctly-sized WebP, and Performance went
> 86 → 97.

## 4. Lighthouse

- [ ] Run against a **production build**, not the dev server. Dev is unminified and
      uncompressed, so the numbers are meaningless.
      ```bash
      npm run build && npx serve -s dist -l 4399
      npx lighthouse@12 http://localhost:4399/ --preset=desktop --output=json --output-path=./lh.json \
        --chrome-flags="--headless --disable-gpu --no-sandbox"
      ```
- [ ] **Run it three times and take the median.** Third-party scripts swing Total Blocking
      Time enormously; we saw the same build score 97, 97, 97, then 90, purely on script
      timing. One run is not a measurement. **(bit us)**
- [ ] Test mobile as well as desktop. Mobile throttling is much harsher.
- [ ] Targets: Performance ≥ 90, Accessibility 100, Best Practices ≥ 90, SEO 100.
- [ ] Note the score in the project README with the date, so regressions are visible later.

## 5. Accessibility

- [ ] Colour contrast passes. Note that **`aria-hidden` does not exempt decorative text**
      from contrast checks: axe still flags it because sighted users can see it. Move
      decorative glyphs into CSS pseudo-content instead: **(bit us)**
      ```html
      <span data-g="{ }"></span>
      ```
      ```css
      .ghost span::before { content: attr(data-g); }
      ```
- [ ] Every image has an `alt`. Decorative images get `alt=""`.
- [ ] Form inputs have associated labels.
- [ ] Interactive elements are reachable and visible on keyboard focus.
- [ ] `prefers-reduced-motion` disables auto-advancing carousels, floats, and scans.

## 6. Third-party scripts

These dominate Best Practices and Total Blocking Time, and they are usually the only
thing standing between a good score and a great one.

- [ ] List every third-party script and ask whether it is actually being used.
- [ ] Count the cookies it sets. Microsoft Clarity alone accounted for **8 of 10**
      third-party cookies on plaintalk.dev (it syncs to Bing), which was nearly the
      entire Best Practices deduction.
- [ ] Check blocking time per vendor in the Lighthouse `third-party-summary` audit.
- [ ] Anything not actively read by a human should be removed, not deferred.

## 7. SEO and search continuity

Critical when replacing an existing site that already ranks.

- [ ] **Capture a baseline before development starts.** Search Console rankings, GA4
      traffic, indexed page count. It cannot be reconstructed afterwards.
- [ ] Preserve existing URL paths wherever possible. Do not invent new ones for pages
      that already rank.
- [ ] 301 map every old URL to its new equivalent.
- [ ] `sitemap.xml` generated and submitted to Search Console.
- [ ] `robots.txt` allows production. Check for template artifacts from the previous
      vendor: RadPad's said "Acme Weighted Plumbing LLC".
- [ ] Per-page unique `<title>` and meta description.
- [ ] JSON-LD validates in Google's Rich Results test.
- [ ] `llms.txt` present, and it does not advertise pages that do not exist.
- [ ] Staging or preview URLs send `X-Robots-Tag: noindex`.

## 8. Content truthfulness

- [ ] **Every operational claim traces to something the client actually said.** How quotes
      happen, turnaround times, guarantees, service areas. Aesthetic copy can be invented;
      operational copy cannot. **(bit us)**
- [ ] No placeholder phone numbers or emails anywhere. Grep for them.
- [ ] Service-area pages are genuinely distinct content, not one template with the city
      name swapped.
- [ ] Client has confirmed any licensing, insurance, "#1 rated", or review-count claims.
- [ ] Fonts are licensed for **web embedding**. A desktop licence usually is not enough.

## 9. Launch mechanics

- [ ] DNS TTL lowered ahead of cutover.
- [ ] HTTPS valid, `www` and apex both resolve to the same place.
- [ ] Do not touch existing MX or email TXT records when pointing DNS.
- [ ] Client owns the hosting account and the repository.
- [ ] Environment variables set in production, not just locally. Never pipe a value with
      a trailing newline; use `echo -n`.
- [ ] Form sends a real submission end to end, including the BCC to dev.
- [ ] Uptime monitor provisioned.

## 10. After launch

- [ ] Re-run the full route curl check against the live domain.
- [ ] Re-run Lighthouse against the live domain and record it.
- [ ] Confirm the first real conversion appears in Ads and in the CRM.
- [ ] Re-capture Search Console numbers at 30 and 90 days versus the baseline.
- [ ] Any "in production" or "coming soon" status shown publicly gets updated or removed.
