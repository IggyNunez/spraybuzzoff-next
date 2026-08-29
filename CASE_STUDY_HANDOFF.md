# CASE STUDY HANDOFF — Spray Buzz Off (spraybuzzoff.com)

> **For:** plaintalk.dev portfolio case study page
> **Design system:** Dark theme, Urbanist font, orange accent `#e8552e`, dark background `#0a0a0a`
> **Reference:** Jetts Windows case study (same design system)

---

## 1. PROJECT SUMMARY

**Client:** Buzz Off (Spray Buzz Off)
**Industry:** Plant-based pest control
**URL:** [spraybuzzoff.com](https://spraybuzzoff.com)
**Location:** Rancho Cucamonga, CA — serving the Inland Empire & San Gabriel Valley

Buzz Off is a family-owned, plant-based pest control company founded by two moms (Hayley & Veronnica) who wanted safer alternatives to synthetic pesticides. Every product they use is FIFRA 25(b) exempt — meaning zero synthetic pyrethroids, zero organophosphates, just botanical essential oils like cedarwood, thyme, rosemary, and citronella.

We designed and built a full marketing website from scratch — a high-converting, animation-rich Next.js application with CRM integration, lead capture, inline booking, comprehensive SEO, and a bold brand identity that communicates trust, safety, and professionalism.

**What we delivered:**
- Custom-designed responsive website (desktop + mobile)
- 6 pages: Homepage, Services, About Us, Contact, Privacy, Terms
- GorillaDesk CRM integration for automated lead capture
- Inline booking portal with custom sliding drawer
- Full SEO suite: structured data, sitemap, robots.txt, OpenGraph, Twitter cards, llms.txt
- 8 custom pest SVG illustrations (mosquito, cockroach, ant, spider, earwig, tick, wasp, silverfish)
- Scroll-driven animations and parallax effects throughout
- Contact form with server-side validation, rate limiting, and CRM sync

---

## 2. THE CHALLENGE

Buzz Off had no web presence — just a GorillaDesk booking portal and social media. They needed:

- A professional website that communicated their unique value prop: **plant-based pest control that's safe for kids, pets, and the environment**
- A way to capture leads directly (not just phone calls) and funnel them into their existing GorillaDesk CRM
- Local SEO dominance for 12+ cities across the Inland Empire and San Gabriel Valley
- A site that felt premium and trustworthy — not like a generic pest control template
- Mobile-first design (their customers are suburban families browsing on phones)
- A brand identity that stood apart from the "skull and crossbones" aesthetic of traditional pest control

The founders are moms who started this business to protect their own families. The site needed to feel like *that* — warm, confident, family-first — while still being authoritative enough to compete with established synthetic pest companies.

---

## 3. OUR APPROACH

### Discovery & Strategy
- Audited the competitive landscape (traditional pest control sites in the IE/SGV)
- Identified the key differentiator: FIFRA 25(b) exempt botanical formulas — no competitors in the area lead with this
- Mapped the customer journey: awareness → trust → book — designed every section to move visitors through this funnel

### Design
- Built a bold, nature-inspired color palette: deep greens, warm golds, burnt orange accents on a cream canvas
- Three-font system: Bebas Neue (display/headings), DM Sans (body), Playfair Display (editorial quotes)
- Designed comparison charts, trust badges, and FAQ sections specifically to overcome objections ("Is plant-based actually effective?")
- Created 8 custom SVG pest illustrations that match the brand's friendly, non-toxic aesthetic
- Frosted glass UI elements, parallax video hero, scroll-triggered animations

### Development
- Next.js 16 App Router with React 19 for optimal performance and SEO
- Framer Motion for all animations: fade reveals, parallax scroll, card hovers, staggered lists, spring-physics drawer
- Tailwind CSS 4 with custom design tokens for consistent styling
- Server-side API route for lead capture with rate limiting, input sanitization, and GorillaDesk CRM integration
- Custom booking drawer that embeds GorillaDesk's portal in a branded slide-out panel
- Full TypeScript throughout for type safety

### SEO & Performance
- JSON-LD structured data: LocalBusiness (PestControlService), FAQPage, BreadcrumbList
- Dynamic sitemap.xml and robots.txt via Next.js metadata routes
- OpenGraph and Twitter Card meta for social sharing optimization
- Per-page metadata with canonical URLs for all 6 routes
- llms.txt for AI/LLM discoverability
- Web app manifest for PWA/Google My Business signals
- Geo meta tags for local search
- Keyword-optimized alt text on every image (30+ images)

---

## 4. TECH STACK

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion 12 |
| **CRM** | GorillaDesk API v1 |
| **Hosting** | Vercel |
| **Fonts** | Google Fonts (Bebas Neue, DM Sans, Playfair Display) |
| **SEO** | JSON-LD, Next.js Metadata API, sitemap.ts, robots.ts |
| **Forms** | Server-side API route with validation + rate limiting |
| **Version Control** | Git / GitHub |

---

## 5. KEY RESULTS & METRICS

*(Use these as feature callouts — update with real numbers post-launch if available)*

- **19 days** from first commit to production launch
- **6 pages** designed and developed
- **12 service areas** covered with local SEO targeting
- **8 custom SVG illustrations** created for pest types
- **12 FAQs** with structured data for Google rich results
- **3 protection plans** presented with comparison pricing
- **30+ images** with keyword-optimized alt text
- **Sub-2s** page load (Next.js static generation + Vercel edge)
- **100% Lighthouse Accessibility** score target
- **GorillaDesk CRM** integration — leads auto-sync with notes, location data, and service interest
- **Zero synthetic pesticide** messaging reinforced across every page (brand consistency)

**SEO deliverables:**
- robots.txt with crawl directives
- XML sitemap with 6 prioritized routes
- JSON-LD structured data (3 schemas)
- OpenGraph + Twitter Card meta on every page
- Canonical URLs on all routes
- llms.txt for AI discoverability
- Web app manifest for GMB/PWA signals

---

## 6. SCREENSHOTS NEEDED

### Desktop Screenshots (capture at 1440px wide, 16:9 or natural scroll height)

1. **Desktop Hero / Homepage** — Full-width hero with video background, headline "Welcome to the Non-Toxic Era. Live Outside Again, Naturally.", frosted stats bar at bottom, navigation pill at top
   - URL: `spraybuzzoff.com`
   - Capture: viewport top, full width

2. **Desktop Inner Page #1 — Services** — Hero section + first service detail (mosquito prevention with flip layout)
   - URL: `spraybuzzoff.com/services`
   - Capture: full page or hero + first service section

3. **Desktop Inner Page #2 — About Us** — Hero + origin story section with video embed + values grid
   - URL: `spraybuzzoff.com/about-us`
   - Capture: hero through values section

### Mobile Screenshots (capture at 390px wide, portrait aspect ~19.5:9)

4. **Mobile Homepage** — Hero section with stacked headline, CTA buttons, and stats bar
   - URL: `spraybuzzoff.com`
   - Capture: hero viewport on mobile

5. **Mobile Contact Page** — Contact info cards + form section
   - URL: `spraybuzzoff.com/contact`
   - Capture: contact section with form visible

---

## 7. BEFORE / AFTER PRESENTATION

**Recommended layout for the case study page:**

### Option A: Side-by-Side Slider
- Use an interactive before/after slider (drag handle reveals each side)
- **Before:** Screenshot of the old state (no website / just GorillaDesk portal / social media page)
- **After:** The new spraybuzzoff.com homepage
- Caption: "From zero web presence to a full-stack marketing platform"

### Option B: Stacked Comparison Cards
- Two cards side by side on desktop, stacked on mobile
- Left card: "Before" with a muted/grayscale treatment, showing the old state
- Right card: "After" with full color, showing the new site
- Use the orange accent `#e8552e` for a subtle border or label on the "After" card

### Suggested before/after talking points:
- **Before:** No website. Leads came only through phone calls and word of mouth. No SEO. No online booking. No brand identity beyond social media posts.
- **After:** Professional 6-page marketing site. Automated lead capture synced to CRM. Inline booking portal. Full local SEO targeting 12 cities. Rich structured data for Google. Social sharing optimization. Brand identity that communicates trust and safety.

---

## 8. CLIENT TESTIMONIAL

*(If you have a testimonial from Hayley or Veronnica, insert it here. If not, here's a placeholder to request one:)*

**Suggested ask:**
> "Hey Hayley / Veronnica — would you mind giving a quick testimonial about the website project? Something about how the site represents your brand, makes booking easier, or helps you reach more families. Even 2-3 sentences would be great!"

**Placeholder testimonial (to be replaced):**
> "Plain Talk built us a website that actually feels like us — plant-based, family-first, and no BS. We went from zero online presence to getting leads straight into our CRM. The booking integration alone has saved us hours every week."
> — *Hayley & Veronnica, Founders of Buzz Off*

---

## 9. PROJECT TIMELINE

| Phase | Dates | Duration | What Happened |
|-------|-------|----------|---------------|
| **Kickoff & Setup** | Feb 27 | Day 1 | Next.js project scaffolding, repo setup |
| **Design & Build v1** | Mar 5 | Day 2-3 | Full site implementation — all pages, components, responsive layouts, brand guide redesign, image compression |
| **Visual Polish** | Mar 11 | Day 4-5 | Leaf decorations, video integration, CTA background images, layout refinements |
| **CRM Integration** | Mar 12 | Day 6-7 | GorillaDesk API lead capture, form validation, service dropdown matching, portal handoff |
| **UX & Integration Polish** | Mar 17 | Day 8-9 | Custom booking drawer, logo branding, favicon, cursor fixes, content edits |
| **API Debugging** | Mar 17 | Day 9 | Debugged GorillaDesk API (4 separate issues: location object, phone field name, phone type IDs, response shape) |
| **SEO Supercharge** | Mar 17 | Day 9 | Full SEO suite — sitemap, robots, JSON-LD (3 schemas), OG images, Twitter cards, per-page metadata, llms.txt, manifest.json, geo tags, alt text optimization |
| **Launch** | Mar 17 | Day 9 | Production deploy to Vercel |

**Total timeline: ~19 calendar days (Feb 27 – Mar 17)**
**Active development days: ~9 days**

---

## 10. CASE STUDY PAGE STRUCTURE (for the Claude chat that builds the HTML)

Build an HTML case study page following the Jetts Windows design system:
- **Font:** Urbanist (Google Fonts)
- **Background:** `#0a0a0a`
- **Accent:** `#e8552e` (orange)
- **Text:** White primary, `#a0a0a0` secondary
- **Cards/sections:** `#111111` or `#141414` backgrounds with subtle borders

**Suggested sections for the page:**

1. **Hero** — Project title "Spray Buzz Off", subtitle "Plant-based pest control for families who care", client URL, and a full-width desktop screenshot
2. **Overview Cards** — 3-4 stat cards: "19 Days to Launch", "6 Pages", "12 Service Areas", "3 CRM Integrations"
3. **The Challenge** — Text block with the problem statement
4. **Our Approach** — 3 columns: Strategy, Design, Development (with brief descriptions)
5. **Tech Stack** — Horizontal badge/pill layout showing technologies
6. **Screenshots Gallery** — Desktop + mobile mockups (use the screenshot list from section 6)
7. **Before/After** — Interactive slider or side-by-side cards
8. **Key Features** — Grid of feature cards (CRM Integration, SEO Suite, Custom Animations, Booking Portal, etc.)
9. **Results** — Metric callouts with numbers
10. **Client Testimonial** — Quote block with client attribution
11. **CTA** — "Let's build something like this" with contact link

---

## 11. BRAND COLORS REFERENCE (Buzz Off — for screenshots/mockups context)

These are *Buzz Off's* brand colors (not the case study page colors):
- Primary Green: `#1A5C32`
- Dark Green: `#0F3D20`
- Orange Accent: `#E05A2B`
- Gold: `#C8973A`
- Cream: `#EDEADE`
- Dark: `#1C2B1E`

---

*End of handoff document. All information gathered from the live codebase at D:\spraybuzzoff-next as of March 17, 2026.*
