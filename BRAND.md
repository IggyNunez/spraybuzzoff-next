# Buzz Off Pest Prevention · Brand Guide

Source: **Buzz Off / Visual Identity Direction** (October 2026), supplied by the client.
Positioning words from that sheet: **Bright · Human · Premium**.

**Brand name:** Buzz Off Pest Prevention
**Tagline:** Pest Control for the Non-Toxic Era.
**Tone:** Confident, clean, family-focused. Not salesy. Not clinical.

The logo is supplied art. Use it unaltered.

---

## Colors

All tokens live in `src/app/globals.css` under `@theme {}`. Use the token classes
(`bg-brand-green`, `text-brand-deep`, ...) or `var(--color-brand-*)`. Do not invent hex values.

> Bright green leads. Yellow and orange add energy. Deep green gives definition.

| Token | Hex | Pantone | Role |
|---|---|---|---|
| `brand-green` | `#00B140` | 354 C* | **Lead brand field.** Hero, city marquee, dividers, accents |
| `brand-deep` | `#154734` | 3435 C | **Contrast.** Headings, text and borders on light, content-heavy dark sections, footer |
| `brand-yellow` | `#EFDF00` | 3965 C | **Energy.** Primary CTA pills, highlight text on green, ticker strip |
| `brand-orange` | `#FA4616` | 172 C | **Punch.** Badges ("Most popular"), stars, thin accent bars |
| `brand-cream` | `#EDEADE` | n/a | **Warm neutral.** Page and section background, use over pure white |
| `brand-dark` | `#1C2B1E` | n/a | Body text |

\* 354 C is a proposed match. Confirm against a physical swatch.

Derived shades (hover and tints only): `brand-green-dark` `#009A38`, `brand-deeper` `#0F3224`,
`brand-orange-dark` `#DA3D13`, `brand-light-green` `#E0F6E8`. The `green-*`, `gold-*` (yellow)
and `red-*` (orange) scales map onto the same palette for older components.

### Contrast rules (WCAG)

Bright green is light. White on `brand-green` is only **2.85:1**, so:

1. **Bright green holds big type only.** Headlines, display-size marquee words. No paragraph
   text on solid bright green. Content sections with paragraphs use `brand-deep`.
2. **Text on bright green** is white (display sizes) or `brand-deep` (3.7:1, large text only).
3. **Yellow carries deep green text** (7.7:1). Never white on yellow.
4. **Highlights on deep green are yellow** (7.7:1), not orange (3.0:1).
5. **Orange is not body text.** Badges, stars, bars, short uppercase labels.

| Pair | Ratio |
|---|---|
| White on deep green | 10.6:1 |
| Deep green on yellow | 7.7:1 |
| Deep green on cream | 8.8:1 |
| White on orange | 3.5:1 |
| White on bright green | 2.85:1 |

---

## Typography

| Role | Face | Token | Notes |
|---|---|---|---|
| Display | **Donut Shop Regular** (Prologue Studio) | `font-display` | Hero headlines, section titles, badges, big brand moments |
| Body / UI | DM Sans | `font-body` | Body copy, service details, navigation, buttons |
| Quotes | Playfair Display Italic | `font-quote` | Testimonials and the hero tagline only |

Donut Shop is self-hosted from `src/app/fonts/DonutShop-Regular.woff2` via `next/font/local`.

**Rules from the identity sheet:**

- **Sentence or title case for longer lines.** Section titles are mixed case.
- **All caps for short emphasis only.** The home hero headline is the main example.
- **Never stretch or fake-bold the type.** Donut Shop has one weight. Do not put `font-bold`,
  `font-[900]` or `tracking-*` on `font-display` elements. `globals.css` sets
  `font-synthesis: none` on display text so the browser cannot fake it.
- Center stacked lines and balance widths by eye.
- The support sans is still "to be selected" on the sheet. DM Sans stays until the client picks one.

---

## Components

### Buttons

| Variant | Classes |
|---|---|
| **Primary CTA** (`ButtonGold`, nav "Book Now") | `bg-brand-yellow text-brand-deep border-2 border-brand-deep rounded-full font-bold uppercase`, hover `bg-gold-400` |
| **Outline** (`ButtonOutline`) | `border-2 border-brand-deep text-brand-deep`, hover `bg-brand-deep text-white` |
| **Ghost on dark** | `border border-white/20 bg-white/[0.08] text-white` |

### Section patterns

| Section | Background |
|---|---|
| Home hero | Video with a `brand-green` multiply wash, deepened on the text side |
| Interior page heroes | Photo with a deep to bright green diagonal overlay |
| Ticker strip | `brand-yellow`, deep green text, orange dots |
| City marquee | `brand-green`, deep green display type |
| Content sections | `brand-cream` / white |
| Featured plan, CTA band, city heroes, footer | `brand-deep` |

---

## Spacing & Shape

- **Border radius, pill:** `rounded-full` (nav, buttons, tags)
- **Border radius, card:** `rounded-2xl` (16px)
- **Section cards:** `.section-card` insets sections as rounded cards on the cream body
- **Content max-width:** `max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]`
