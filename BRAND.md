# Buzz Off Pest Prevention — Brand Guide

## Identity

**Brand name:** Buzz Off Pest Prevention
**Tagline:** Non-Toxic Pest Prevention. Finally.
**Tone:** Confident, clean, family-focused. Not salesy. Not clinical.

---

## Colors

All tokens are defined in `src/app/globals.css` under `@theme {}`.

### Primary Palette

| Token | Hex | Usage |
|---|---|---|
| `gold-500` | `#F5CC05` | **Primary surface** — nav pill bg, highlight backgrounds |
| `gold-400` | `#FADB5F` | Hover/lighter gold |
| `gold-600` | `#D4A017` | Deeper gold for gradients |
| `green-900` | `#016d30` | **Primary green** — nav links, borders, text on light surfaces |
| `green-700` | `#068249` | Body text links, icon accents, mid green |
| `red-500` | `#F12E04` | **CTA buttons**, badges, warnings |
| `red-600` | `#D42803` | CTA hover state |

### Secondary Palette

| Token | Hex | Usage |
|---|---|---|
| `canvas` | `#FAFAF5` | Page/section background |
| `canvas-warm` | `#F5F0E8` | Slightly warmer alternate section bg |
| `gray-700` | `#404040` | Primary body text |
| `gray-500` | `#737373` | Secondary / caption text |
| `white` | `#FFFFFF` | Card surfaces, light text on dark |

---

## Typography

Defined via `--font-display` (Lora, serif) and `--font-body` (Nunito, sans-serif).

### Display / Headings — `font-display`
- **H1 hero:** `clamp(2.8rem,7vw,5rem)` — `font-bold uppercase`
- **H2 section:** `clamp(2rem,5vw,3.2rem)` — `font-bold uppercase`
- **H3 card title:** `1.1rem` — `font-bold uppercase tracking-wide`
- **Eyebrow:** `0.7rem` — `font-bold tracking-[0.2em] uppercase`

### Body — `font-body`
- **Body large:** `1rem` — `font-light`
- **Body default:** `0.88rem` — `leading-[1.75]`
- **Body small / meta:** `0.82rem`
- **Label / nav:** `0.7rem` — `font-bold tracking-[0.06em] uppercase`
- **CTA button:** `0.68–0.7rem` — `font-extrabold tracking-[0.08em] uppercase`

---

## Component Tokens

### Nav Pill
The floating nav pill should always reflect the logo colors directly:

| Element | Style |
|---|---|
| Pill background | `#FFFFFF` (white) |
| Pill border | `3px solid #016d30` (matches drawer border weight) |
| Nav links | `text-green-900` bold, `hover:text-green-700` |
| Social icons | `text-green-900/50` → `text-green-900` on hover |
| Hamburger bars (mobile) | `bg-green-900` |
| CTA "Book Now" | `bg-red-500 text-white border-2 border-green-900` |
| CTA hover | `bg-red-600` |

### Buttons

| Variant | Classes |
|---|---|
| **Primary CTA** | `bg-red-500 text-white border-2 border-green-900 rounded-full font-extrabold uppercase` |
| **Primary hover** | `bg-red-600` |
| **Secondary** | `bg-gold-500 text-green-900 border-2 border-green-900/20 rounded-full font-extrabold uppercase` |
| **Ghost** | `border-2 border-green-900 text-green-900 bg-transparent rounded-full font-bold uppercase` |

### Cards

| Element | Style |
|---|---|
| Background | `rgba(255,255,255,0.82)` frosted glass |
| Backdrop blur | `blur(24px)` |
| Border | `1px solid rgba(4,66,45,0.10)` |
| Border radius | `rounded-2xl` |
| Top accent strip | `3px solid [card accent color]` |
| Title | `text-green-900 font-bold uppercase tracking-wide 1.1rem` |
| Body text | `text-gray-700 text-[0.88rem] leading-[1.75]` |
| Watermark number | Card accent color at `opacity: 0.07` |
| Min height | `280px` |
| Hover | `y: -7, scale: 1.02` + stronger shadow |

### Drawer (Mobile)

| Element | Style |
|---|---|
| Background | `rgba(255,255,255,0.97)` |
| Border | `3px solid #016d30` |
| Nav links | `text-green-900/75 hover:text-green-900` |
| CTA | Same as Primary CTA above |
| Social icons | `border-2 border-green-900/25 text-green-900/60` |

---

## Section Patterns

| Section | Background | Notes |
|---|---|---|
| Hero | Dark image overlay + gradient | Full height |
| Intro | `bg-canvas` + animated backyard SVG | Frosted cards |
| Services | White / canvas | Featured + small cards |
| Process | `canvas-warm` | Step numbers |
| Plans | `bg-canvas` | 3-column pricing |
| FAQ | White | Accordion |
| CTA / Footer | `green-900` | Dark section |

---

## Spacing & Shape

- **Border radius — pill:** `rounded-full` (nav, buttons, tags)
- **Border radius — card:** `rounded-2xl` (16px)
- **Border radius — icon badge:** `rounded-2xl` (16px)
- **Section padding:** `py-20 md:py-28`
- **Content max-width:** `max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]`

---

## Brand Rules

1. **Gold is structure** — use it for pill backgrounds and highlights, not text
2. **Green-900 is authority** — the primary text/border color on all light surfaces
3. **Red is action** — reserve for CTA buttons and critical accent only
4. **Never use red for body text** — only icons/badges/CTAs
5. **Cards always frosted** — glass effect with subtle green border, never flat white
6. **Typography never grey-on-grey** — body text must be `gray-700` or darker
