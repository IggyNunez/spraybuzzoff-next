# Buzz Off — Local SEO Action Plan

Ranked by impact. Tier 1 is what actually moves rankings in local search. The on-site work done in this commit supports it, but without Tier 1 actions the city pages won't rank.

---

## ✅ Just shipped (on-site)

- **8 city landing pages** at `/pest-control/{city}` with unique content, neighborhoods, ZIPs, landmarks, local pest pressure, city-targeted FAQs, testimonials.
- **Service areas hub** at `/pest-control` linking to all 8 city pages.
- **JSON-LD upgrades**: site-wide `LocalBusiness` + `GeoCircle` service area; per-city `@graph` with `LocalBusiness` + `Service` + `OfferCatalog`; `BreadcrumbList` on city pages; `FAQPage` with 5 city-specific Q&As per page.
- **Sitemap** expanded to include all city pages + `/reviews` + `/pest-control` hub (Google auto-discovers via robots.ts).
- **Internal linking**: footer now lists all 8 cities with "Pest Control in {city}" anchor text; `AreasMarquee` marquee links to city pages.
- **Search Console**: already verified (confirmed in screenshot — 54 clicks / 486 impressions last 28d).

---

## 🔥 Tier 1 — Off-site (do this week — biggest rank gains)

### 1. Google Business Profile (single biggest local lever)
- [ ] **Claim or optimize** the Buzz Off GBP at business.google.com.
- [ ] Set **primary category**: `Pest Control Service`.
- [ ] Add **secondary categories**: `Mosquito Control Service`, `Environmental Consultant`.
- [ ] Service area: select all 12 cities in `SERVICE_AREAS` (Rancho Cucamonga, Upland, Ontario, Claremont, Glendora, San Dimas, Fontana, Pomona, La Verne, Arcadia, Monrovia, Azusa).
- [ ] Hours, phone, website URL (pointing to homepage).
- [ ] Upload **20+ photos**: logo, truck, team, before/after yard shots, treatment application, family-safe messaging graphics. **Geotag photos** to Rancho Cucamonga coordinates (34.1064, -117.5931) using a tool like GeoSetter.
- [ ] Add **all 6 services** as individual service entries with descriptions.
- [ ] Answer the seed **Q&A** yourself: "Is it safe for pets?" "Do you use chemicals?" "How much does it cost?" "Do you treat mosquitoes?" — write natural answers mentioning cities.
- [ ] Set up **weekly GBP Posts** (takes ~5 min/week):
  - Monday: a service highlight ("Mosquito season is here in Rancho Cucamonga...")
  - Thursday: a review quote or educational tip
- [ ] Enable **messaging** on GBP and respond within 24 hours.
- [ ] Use the GBP short name: `buzzoffpestprevention` if available.

### 2. Review velocity (the #2 local ranking factor)
- [ ] Reach 50 Google reviews by end of quarter — currently 26 on site.
- [ ] Set up a **review request automation** in GorillaDesk or via SMS after every completed service. Include a direct review link: `https://search.google.com/local/writereview?placeid={YOUR_PLACE_ID}`.
- [ ] **Ask customers to mention their city** in the review ("Moe sprayed our Upland home…"). City mentions in reviews are a direct ranking signal.
- [ ] Respond to every review within 48 hours — Google rewards engagement. Keep responses natural and mention the service + city.
- [ ] Also collect **Yelp, Facebook, Nextdoor** reviews — diversify the review profile.

### 3. NAP-consistent citations (30+)
Same Name, Address, Phone — **exact** — on all of these:
- [ ] **Bing Places for Business** — claim, mirrors GBP.
- [ ] **Apple Business Connect** — critical for iPhone Maps searches.
- [ ] Yelp
- [ ] Facebook Business
- [ ] Nextdoor Business
- [ ] BBB (Better Business Bureau) — paid but high authority.
- [ ] Angi
- [ ] Thumbtack
- [ ] HomeAdvisor
- [ ] Yellowpages.com
- [ ] Nicelocal
- [ ] Foursquare
- [ ] Brownbook
- [ ] Cylex
- [ ] ChamberOfCommerce.com
- [ ] Rancho Cucamonga Chamber of Commerce (paid membership — huge local authority signal).
- [ ] Upland / Ontario / Claremont Chambers if budget allows.
- [ ] Homeguide
- [ ] Porch
- [ ] Bark.com
- [ ] ExpertsOnPesticides or industry-specific directories.
- [ ] **Bulk tool**: Moz Local, Yext, or BrightLocal ($20–$50/month) will auto-submit to 40+ data aggregators (Neustar Localeze, Data Axle, Foursquare, Factual). Worth it.

### 4. Local backlinks
- [ ] Sponsor a **Rancho Cucamonga little league team** or school event → backlink from the organization's site.
- [ ] Get a feature in the **Daily Bulletin** (IE newspaper) — pitch a "family-owned plant-based pest control" angle.
- [ ] **Alignable.com** for local B2B networking + citation.
- [ ] Partner with a local **pet store, vet, or kids' toy store** for cross-promotion — earn a mention/link on their site.
- [ ] Submit to **"eco-friendly business" directories** in California (Green America, Sustainable Business Council).

---

## 📈 Tier 2 — Content & conversion (next 30 days)

### 5. Blog posts targeting local intent (each targets one city + one problem)
Write 1–2 per month. Each 800+ words, internally linked to the matching city page.
- [ ] "When does mosquito season start in Rancho Cucamonga?" (seasonal, evergreen)
- [ ] "The 5 most common pests in Upland, CA and how to stop them"
- [ ] "Why Ontario Ranch homeowners should skip synthetic pest control"
- [ ] "How to prep your Claremont Village home for spring pest season"
- [ ] "Mosquitoes near Puddingstone: a San Dimas homeowner's guide"
- [ ] "Argentine ants in Fontana: why they keep coming back"
- [ ] "Foothill spiders in Glendora: a plant-based approach"
- [ ] "Pomona homes and seasonal pest pressure: what to expect each quarter"

### 6. Service + city combo pages (after blog traction)
Once the 8 city pages start ranking, add longer-tail combos:
- `/mosquito-control/rancho-cucamonga`
- `/ant-control/upland`
- `/spider-control/claremont`
Reuse the city template, narrow the content to one pest. Only build these for pests/cities with confirmed search volume (check Search Console "queries" report after 60 days).

### 7. Google Business Profile content loop
- [ ] Upload **4 new photos per month** minimum (GBP rewards freshness).
- [ ] Add **"offer" posts** in March (mosquito season launch) and October (fall tune-up).
- [ ] Enable **booking button** on GBP pointing to GorillaDesk.

### 8. Conversion tweaks on city pages
- [ ] Add a **sticky "Call 909.898.8955" mobile button** on city pages.
- [ ] Add a **live service-area lookup ZIP check** on the hub page.
- [ ] Add **Google Maps embed** on `/contact` with a pin at your Rancho Cucamonga location (embed uses `hasMap` JSON-LD already added).

---

## 🛠 Tier 3 — Technical polish

- [ ] **Core Web Vitals audit**: run Lighthouse on city pages and fix any LCP > 2.5s. Next/Image is already in use — verify hero images aren't blocking render.
- [ ] **Image alt text on city pages**: currently reuses services-hero.jpg with a generic alt. Add a city-specific photo per city page (even if it's a stock backyard shot, label alt `Plant-based pest control backyard in Rancho Cucamonga, CA`).
- [ ] **hreflang**: not needed (English-only).
- [ ] **Schema validator**: paste each city page URL into validator.schema.org and search.google.com/test/rich-results after deploy. Fix any warnings.
- [ ] **Bing Webmaster Tools**: verify site, submit sitemap (5–10% of local search).

---

## 📊 How to measure progress (Search Console)

Track monthly in Search Console:
1. **Queries** containing a city name — target: 5 cities appearing by week 6.
2. **Pages** — city pages should start getting impressions within 2 weeks of indexing. Submit each city page URL via "URL Inspection → Request Indexing" after deploy to speed this up.
3. **CTR by page** — city pages should see 3–6% CTR. If lower, tighten the meta description.
4. **Clicks by query** — watch for non-branded queries ("pest control upland", "mosquito control rancho cucamonga") to overtake branded ones. Right now branded dominates.

**Request indexing immediately after deploy** for:
- `/pest-control`
- `/pest-control/rancho-cucamonga` through `/pomona`

Google will crawl the rest via the sitemap and internal links.

---

## ⚠️ Things NOT to do

- Don't buy backlinks from PBNs or fiverr link packs — pest control is a Google-scrutinized niche and penalties are common.
- Don't duplicate city page content. The current pages have unique neighborhoods, pests, landmarks, and FAQs — keep them unique as you add more cities.
- Don't stuff city names unnaturally. Current pages are balanced — keep that ratio.
- Don't rename/move city URLs once live. If you must, 301-redirect old → new.
- Don't chase "free directory listings" from spammy sites — stick to the list above.

---

## 🎯 Realistic timeline

- **Week 1–2**: GBP optimized, review automation live, top 10 citations submitted. City pages indexed.
- **Week 3–4**: First impressions on city pages. 10–15 new reviews.
- **Month 2**: First clicks on non-branded city queries. Map Pack appearances for primary city (Rancho Cucamonga).
- **Month 3**: Map Pack for 2–3 secondary cities. First blog post ranking.
- **Month 6**: 2–5x current click volume if Tier 1 is executed consistently.

The code is now in place. Tier 1 off-site work is 80% of what happens next.
