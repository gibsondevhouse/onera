# Onéra home page — clone guide

**Goal.** Rebuild the Onéra home page so that its structure, rhythm, components and motion match the Ziva Lagos home page, rendered entirely in Onéra's dark-mode system with Onéra's typography, wordmark and voice. Where the reference site has a defect recorded in the audit, the clone fixes it rather than copying it.

**Read first.** [01. UI audit](01-zivalagos-ui-audit.md) for what the reference does and why; [03. Token mapping](03-token-mapping.md) for every colour, type and spacing value used below. Screenshots live in [`artifacts/reference/zivalagos/`](../../artifacts/reference/zivalagos/).

**Target.** The Next.js app in `website/` (Next 16.4, React 19, Tailwind 4 in CSS-first mode; current styling is hand-written CSS in `src/app/globals.css`). Routes already present: `/`, `/collections`, `/philosophy`. Routes planned by the stage plan that the home page will link to once their records exist: `/collections/the-gate-of-horn`, `/garments/nyx-overcoat`, `/garments/hypnos-dress`.

**Governing decisions.** This guide implements, and must not contradict, the confirmed decisions in [BETA-0.0.1 decisions and inputs](../dev/BETA-0.0.1/decisions-and-inputs.md): D02 (omit unconfirmed facts), D03 (forms end with "Demo complete. Nothing was sent."), D04 (dark-only, keep olive and the wordmark), D05 (full atmospheric motion with reduced-motion support), D07 (Ziva Lagos as structural reference; no copied text, images or offers; no nonfunctional search or cart controls). It is the home-page companion to [Phase 01: Sensory Canvas & Typography](../dev/BETA-0.0.1/phase-01-sensory-canvas-typography/README.md) and hands motion detail to [Phase 03: Atmospheric Motion](../dev/BETA-0.0.1/phase-03-atmospheric-motion-pacing/README.md).

---

## 0. Implementation status (8 November 2026, second pass)

The home page in `website/` now mirrors the reference section for section, on placeholder media. The hero stays a **start card**: a full-bleed placeholder with the house statement centred over it, as the reference centres its title over video. Evidence: `artifacts/beta-0.0.1/homepage/`.

| Reference section | Onéra build |
| --- | --- |
| Announcement bar | Olive strip, 41 px, 14 px tracked uppercase |
| Header: logo left, menu centre, region + search/account/bag right | Built as such. Menu has seven items with three dropdowns (`details`-based, no JS). The utility buttons open a short notice ("opens with the first collection") instead of dead links. **This departs from the D07 note about nonfunctional controls and needs confirming or reverting.** |
| Video hero, centred title | Full-bleed placeholder card, centred h1 and sub-copy, 805 px / 476 px |
| "Shop New In" h4 + VIEW ALL, 8 cards | "New in" h4 + View all, 8 cards with 2:3 placeholder, bag quick-action, "Regular price — —", XS–XL chips with fixture availability, Sold out / Made to order badges |
| Slideshow, left h0, two pills, counter + arrows | Two slides, fade and slow zoom, counter and arrows bottom-right |
| Second 8-card grid, no heading | "The season's looks", 8 cards |
| "Shop Our Collections", 3 tiles | "Shop our collections": Dreams / Form / Feeling tiles |
| "Shop the look", image + card | Two equal columns, three hotspots, sticky card |
| FAQ block | "Frequently asked questions" with four questions; answers hold "The house will confirm this before launch." |
| Newsletter block | "Stay in touch" with the D03 demo form |
| Footer: logo + About us, INFO, Stay in touch + form; region row; copyright | Same three blocks (atelier lines marked to be confirmed), region row with an Instagram glyph, copyright row |

Placeholders by design (D02): look names, dash prices, size availability, tile labels, FAQ answers and footer address lines are fixtures, not claims. Not yet done: Phase 03 motion layer, real media and records, decision-log entries for §11 and for the header utilities.

## 1. What "clone" means here

| Take from Ziva | Take from Onéra | Fix (do not copy) |
| --- | --- | --- |
| Page outline and section order | Colour system (dark canvas, alabaster ink, olive fill) | Two-row navigation |
| 1600 px container, 64/32/20 px padding | Cormorant Garamond + Manrope | Three-line announcement bar |
| 80 px section rhythm, 12 px grid gap | Wordmark SVG (`public/brand/onera-wordmark-white.svg`) | Hero text without scrim |
| 2:3 media, 4 px blocks, pill buttons, circle utilities | Voice: "Dreams given form", "A study in feeling", "An independent fashion house" | `<p>` headings and a hidden `<h1>` |
| Left-aligned commerce headers with "View all"; centred service headers in a block | Truthfulness rule: no invented garments, prices, policies or addresses | Empty alt text |
| Scroll-up sticky header | Local-only forms that end with "Demo complete. Nothing was sent." (D03) | Autoplay video without pause or reduced-motion handling |
| Quiet motion (1 s zoom, 350 ms header, line reveal) | Centred wordmark in the header (D07, and the current Onéra shell) | Duplicate newsletter, duplicate "shop new in" CTAs, placeholder "Shop the look" |
| | | Third-party chat and discount pop-ups |
| | | Search, account and cart icons that lead nowhere (D07) |

---

## 2. Pre-flight fixes in the current app

Do these before building any section.

1. **Font variable collision.** Remove `--font-display` and `--font-ui` from `:root` in `src/app/globals.css`. `next/font` already sets both on `<html>`; the `:root` copies can win the cascade and drop Cormorant/Manrope for Georgia/Arial. Full explanation in the token mapping §5.
2. **Replace the `:root` token block** with the ready-to-paste CSS in the token mapping §5.
3. **Base font size.** Change `body { font-size: 15px }` to `font-size: var(--size-body)` (16 px) with `line-height: 1.6`.
4. **Reduced motion.** Keep the existing `prefers-reduced-motion` block; the sections below add rules to it.
5. **Keep** `.skip-link`, `.site-frame`, focus-visible outline, and the wordmark asset. Everything else in `globals.css` is replaced section by section.

---

## 3. Page blueprint

Section order mirrors the reference. "Content" lists what each section needs; items marked **To define** are inputs the house must supply and must not be invented.

| # | Section | Component | Onéra content |
| --- | --- | --- | --- |
| 0a | Announcement bar | `AnnouncementBar` | One line, ≤60 characters: "Dreams given form · A study in feeling" (existing copy) |
| 0b | Header | `SiteHeader` | Wordmark centred (D07 keeps the centred mark; Ziva's desktop variant is logo-left); primary nav left: Collections, Garments; house nav right: The house. Maximum 5 items in total. **No search, account or bag controls and no localisation selector** until each is functional (D07) |
| 1 | Hero | `HeroMedia` | Full-bleed still image or looped video with poster. Eyebrow "An independent fashion house"; h1 "Dreams given form."; sub-copy "A study in feeling."; one CTA "Explore collections" (ghost pill) **Media: To define** |
| 2 | New arrivals | `SectionHeader` + `ProductGrid` of `ProductCard` | Heading "New in" (h2); link "View all →" to `/collections`; 4 or 8 garments from the records in `/garments/*`. **Garment records, prices, sizes, photography: To define**; until supplied, render the grid from a typed data file with explicit placeholders and no prices |
| 3 | Editorial banner | `Slideshow` (single slide) | Collection banner for The Gate of Horn: h0 "The Gate of Horn"; primary inverse pill "View the collection" → `/collections/the-gate-of-horn`; ghost pill "The house" → `/philosophy`. **Image: To define** |
| 4 | Collections | `SectionHeader` + `CollectionTiles` | Heading "Collections" (h2); 3 portrait tiles. Only The Gate of Horn is known; the other two are **To define** and the component must render 1–3 tiles without breaking |
| 5 | The look | `ShopTheLook` | One editorial image with 2–4 hotspots, each opening a `ProductCard` for a garment in the image. **Image and garment links: To define**. Ship hidden until content exists; never ship placeholders |
| 6 | Questions | `ServiceBlock` + `Accordion` | Heading "Questions" (h2 centred); 4–6 items on fit, care, delivery, returns. **Copy: To define**; render only confirmed answers |
| 7 | Stay close | `ServiceBlock` + `NewsletterForm` | Heading "Stay close"; copy "Occasional letters from the house."; e-mail input and "Subscribe" pill. Local-only demo: on submit, replace the form with the exact D03 outcome "Demo complete. Nothing was sent." |
| 8 | Footer | `SiteFooter` | Block 1: wordmark (93 px), "An independent fashion house", atelier address and hours **To define**. Block 2: "Info" links — Contact, The house, Care, Delivery, Returns (only link to pages that exist). Block 3: repeat of `NewsletterForm` is **omitted** (audit finding 4); use the space for "Follow" with social links **To define**. Bottom row: copyright "© 2026 Onéra" left; no payment icons, no "Powered by" |

Drop from the reference entirely: the second featured collection (section 4 on Ziva), the chat bubble, the discount pop-up, the "Follow on shop" button, the payment icon row.

---

## 4. Component specifications

All measurements are desktop at ≥1200 px unless a mobile value is given. Tokens are from the token mapping.

### 4.1 Layout primitives

**Container.** `width: min(100% - 2 * var(--container-pad), var(--container-max)); margin-inline: auto;`

**Section.** `padding-block: var(--space-section)`. Consecutive sections on the same background share one gap: give sections `padding-top: 0` when they follow another section (use `section + section { padding-top: 0 }` on `main`).

**Section header, commerce variant.** Flex row, `align-items: baseline`, `justify-content: space-between`, `margin-bottom: var(--space-section-header)`. Left: h2 (Cormorant 400, `--size-h2`, tracking `--tracking-display`). Right: text link Manrope `--size-label` 600 uppercase `--tracking-label`, colour `--color-text`, with a 16 px chevron; hover underline, offset 4 px.

**Section header, service variant.** Centred; optional 48 px icon (1.875 px stroke, `--color-text`) above; h2; sub-copy `--color-text-muted` max-width 36rem; `margin-bottom: 3rem`.

**Service block.** Background `--color-surface`, `border: 1px solid var(--color-border-subtle)`, `border-radius: var(--radius-block)`, `padding: clamp(2.5rem, 4vw, 4rem)`, `margin-inline: var(--container-pad)`, `margin-bottom: var(--space-section)`.

### 4.2 Announcement bar
- Height 40 px; background `--color-accent`; text `--color-on-accent`, Manrope `--size-caption` uppercase `--tracking-label`; centred; single line, `text-overflow: ellipsis` as the safety net.
- Mobile: 36 px, `--size-caption` stays 12 px, tracking drops to .08 em.

### 4.3 Header
- Wrapper `position: sticky; top: 0; z-index: 1000`, background `--color-background`, `border-bottom: 1px solid var(--color-border-subtle)` only once the page has scrolled past the hero (`data-stuck="true"`).
- Scroll-up mode: on scroll down past 120 px add `data-hidden="true"` → `transform: translateY(calc(-100% - 2px))`; on scroll up remove it. `transition: transform var(--duration-header) var(--ease-out-expo)`. Implemented in a small client component with a `requestAnimationFrame`-throttled scroll listener; cleaned up on unmount. If Phase 03 introduces smooth scrolling, the listener reads the smoothed scroll position from that system rather than `window.scrollY`.
- Container grid `1fr auto 1fr`, gap 24 px, `min-height: var(--header-height)`, `padding-block: 20px`. This keeps the centred wordmark required by D07 and already present in the current shell; Ziva's own desktop header is logo-left, nav-centre, which is **not** adopted.
- Wordmark: SVG, 124 px wide (102 px at <768, 88 px at <380), `priority` image, link labelled "Onéra home". The `<h1>` belongs to the hero, not the header.
- Left `<nav aria-label="Collections navigation">` and right `<nav aria-label="House navigation">` (the current component's labels): `<ul>` flex, gap `clamp(1.5rem, 3vw, 3rem)`, `flex-wrap: nowrap`, left list `justify-self: start`, right list `justify-self: end`. Items Manrope `--size-label` uppercase `--tracking-label`, colour `--color-text-muted`, hover `--color-text`, `transition: color var(--duration-fast)`. Items with children use `<button aria-expanded>` and a 16 px chevron; dropdown panel background `--color-surface-raised`, border `--color-border-subtle`, radius `--radius-block`, item hover `rgb(247 246 242 / 4%)`.
- No utility icons. Search, account, bag and currency controls are omitted until each is functional (D07). The `Icon` component still ships `search` and `bag` glyphs so they can be added later without a redesign; the right nav slot is where they will sit.
- Mobile (<768): grid `1fr auto 1fr`; left: menu button (44 × 44, 20 px glyph, `aria-label="Open menu"`, `aria-expanded`); centre: wordmark; right: empty (reserved). Menu opens a full-height drawer from the left on `--color-surface-raised` with the overlay `--color-overlay`, listing both navs; focus trapped; closes on Escape.

### 4.4 Hero
- Full-bleed, `min-height: min(805px, calc(100svh - var(--header-height) - 40px))`; mobile `min-height: 476px`.
- Media: `<Image>` with `object-fit: cover` and `object-position` from content; if video is approved later, `<video autoplay muted loop playsinline poster>` with a visible pause button (44 × 44, bottom right) and `prefers-reduced-motion: reduce` → show poster only.
- Scrim: `::after` with `background: linear-gradient(180deg, rgb(20 20 15 / 20%), var(--color-scrim) 60%, rgb(20 20 15 / 75%))`. Text must reach 4.5:1 over the darkest reasonable frame; verify with the poster.
- Content: centred column max-width 768 px, `padding-block: 80px`. Eyebrow Manrope `--size-label` uppercase `--tracking-label` `--color-text-muted`; `<h1>` Cormorant 300 `--size-h1` `--color-text-on-media` `margin-bottom: 8px`; sub-copy Cormorant 300 italic `--size-h5` `--color-text-muted`; CTA ghost pill (see 4.10) `margin-top: 2rem`.
- Index marker (Onéra signature kept from the current hero): "01 — THE HOUSE" in `--size-caption` tracked, bottom-left inside the container.

### 4.5 Product card
- Column flex; `border-radius: var(--radius-block)`; background none (the card sits on the page).
- Media wrapper: `aspect-ratio: 2 / 3`, `overflow: hidden`, `border-radius: var(--radius-block)`, background `--color-surface-media`. Primary `<Image>` `object-fit: cover` with descriptive `alt` ("Nyx Overcoat, front, charcoal wool"). Optional secondary image: `position: absolute; inset: 0; opacity: 0`, `transition: opacity 400ms`; `.card:hover` / `:focus-within` → `opacity: 1`. Reduced motion: no swap.
- Badge: top-right 12 px inset; Manrope `--size-caption` 600 uppercase; padding 6 × 8 px; radius `--radius-block`; variants `soldout` (parchment/near-black), `sale` (terracotta/near-black), `custom` (plum/parchment).
- Quick action: 48 px circle (36 px mobile), 16 px inset (8 px mobile), background `--color-accent`, icon 24 px `--color-on-accent`, hover `--color-accent-hover`. In this beta it is an `<a>` to the garment page with an arrow glyph and `aria-label="View {garment}"`; a bag icon and "Add to bag" behaviour are a later commerce release (D07). Render it only when the garment route exists.
- Info: `padding-top: 24px`. Title `<h3>` Manrope 600 `--size-body` `--color-text` (Cormorant is reserved for section and page headings). Price row Manrope 400 `--size-body` `--color-text-muted`; sale price `--color-sale-price` with compare-at struck through. Omit the "Regular price" label (noise).
- Sizes: `margin-top: 16px`, flex wrap, gap 6 px; chips `<a>` 28 × ≥28 px, `border: 1px solid var(--color-line)`, radius `--radius-block`, Manrope `--size-caption` `--color-text`, padding 0 6 px, `aria-label="Size 8"`. Unavailable: `color: var(--color-text-muted); opacity: .5; text-decoration: line-through; aria-disabled="true"`, no diagonal cross image. Render chips only when size data is confirmed.
- Whole card is a `<li>`; the title link covers the media via a pseudo-element so one tab stop reaches the garment and a second reaches the quick action.

### 4.6 Product grid
- `<ul>` CSS grid, `gap: var(--space-block)`, `grid-template-columns: repeat(4, minmax(0, 1fr))`; ≥1600 px keep 4; <1200 px 3; <768 px 2. Row gap `min(3rem, 1.5rem + 2vw)` when two rows.
- At <768 the reference scrolls horizontally in some sections; Onéra uses the 2-column stacked grid only (no horizontal scroll) for predictability.

### 4.7 Editorial banner (slideshow, single slide)
- `height: min(700px, 35.875rem + 16.40625vw)`; mobile `min-height: 560px`.
- Image `object-fit: cover`, background `--color-surface-media` while loading. Scrim `linear-gradient(90deg, var(--color-scrim), rgb(20 20 15 / 35%) 55%, transparent)`; mobile solid `rgb(20 20 15 / 45%)`.
- Content inside the container, left aligned, max-width `min(95%, 620px)`, vertically centred. Eyebrow label; h2 styled as h0 (Cormorant 300 `--size-h0`, `--color-text-on-media`); actions row gap 12 px: inverse pill + ghost pill.
- Heading reveal: split lines with `overflow: hidden` wrappers and `translateY(100%) → 0`, 600 ms, 80 ms stagger, once in view. Reduced motion: none.
- No arrows or dots while there is one slide; the component accepts an array so a second slide can be added later, at which point arrows (48 px circles, `--color-inverse` at 90 %, icon `--color-on-inverse`) appear bottom-right.

### 4.8 Collection tiles
- `<ul>` grid, `gap: var(--space-block)`, `grid-template-columns: repeat(3, minmax(0, 1fr))`; 1–2 tiles centre within the same track widths (do not stretch); <768 px becomes a horizontal scroll-snap row of 78 vw tiles (this is the one place horizontal scroll is kept, matching the reference's `scroll-area-x`).
- Tile `<a>`: `aspect-ratio: 2 / 3`, `border-radius: var(--radius-block)`, `overflow: hidden`, `position: relative`. Image `object-fit: cover` with `transition: transform var(--duration-zoom) var(--ease-zoom)`; `:hover`, `:focus-visible` → `scale(1.05)`. Gradient `linear-gradient(180deg, transparent 45%, rgb(20 20 15 / 70%))`. Label Cormorant 400 `--size-h4` `--color-text-on-media`, bottom-left, padding 24 px.

### 4.9 The look (hotspots)
- Grid `md:grid-cols-2`, gap `clamp(2rem, 4vw, 4rem)`, `align-items: start`.
- Image block radius `--radius-block`. Hotspots are `<button>`s absolutely positioned by percentage: 28 px circle, background `--color-inverse`, icon 10 px plus in `--color-on-inverse`; `::before` halo `--hotspot-halo` pulsing `scale(1 → 1.6)` 2 s ease-in-out infinite (none under reduced motion); active → icon rotates 45°, sibling hotspots `opacity: .5`; `aria-pressed`, `aria-label="Show {garment}"`.
- Right column renders the `ProductCard` for the active hotspot; the first hotspot is active by default so the column is never empty.

### 4.10 Buttons

| Variant | Fill | Text | Border | Hover |
| --- | --- | --- | --- | --- |
| Primary | `--color-accent` | `--color-on-accent` | none | `--color-accent-hover`; active `--color-accent-active` |
| Inverse (over imagery) | `--color-inverse` | `--color-on-inverse` | none | `--color-inverse-hover` |
| Ghost | transparent | `--color-text` | 1px `--color-line` | border `--color-text-muted`, background `rgb(247 246 242 / 4%)` |
| Text link | none | `--color-text` | bottom 1px `--color-line` | border `--color-text-muted` |

Shared: `display: inline-flex; align-items: center; justify-content: center; gap: .75rem; min-height: 56px; padding: 0 32px; border-radius: var(--radius-pill); font: 600 var(--size-label)/1 var(--font-ui); text-transform: uppercase; letter-spacing: var(--tracking-button); transition: background-color var(--duration-fast), border-color var(--duration-fast)`. Compact size: `min-height: 48px; padding: 0 28px`. Circle size: 48 × 48, `padding: 0`, icon 24 px. Focus: `outline: 2px solid var(--color-focus); outline-offset: 3px`.

### 4.11 Inputs
- `min-height: 56px; padding: 14px 16px; background: var(--color-input-bg); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-input); color: var(--color-text); font: 400 var(--size-body) var(--font-ui)`. Placeholder `--color-text-muted`. Hover border `--color-line`. Focus border `--color-inverse`, no outline. Error border `--color-danger` with a 14 px message below in `--color-danger`.
- Every input has a visible or visually-hidden `<label>`.

### 4.12 Accordion
- `<details>`/`<summary>` list, max-width 768 px centred; items separated by `border-top: 1px solid var(--color-border-subtle)` (first item none).
- Summary: flex, `justify-content: space-between`, `padding: 16px 0`, Manrope 600 `--size-h6` `--color-text`; chevron 20 px `--color-text-muted`, `transition: transform 200ms`, `[open]` → `rotate(90deg)`. Content Manrope `--size-body` line-height 1.75 `--color-text-muted`, `padding-bottom: 20px`. Height animates with a 250 ms grid-rows transition; none under reduced motion.

### 4.13 Footer
- `border-top: 1px solid var(--color-border-subtle)`; container padding; blocks row `margin-top: var(--space-section)`.
- Blocks: grid `2fr 1fr 2fr`, gap 80 px (40 px <1200; single column <768), `margin-bottom: min(5rem, 2rem + 4vw)`. Block headings Manrope 600 `--size-body` `--color-text` `margin-bottom: 16px`; body `--color-text-muted` line-height 1.75; link lists column gap 12 px, links `--color-text-muted`, hover `--color-text` + underline offset 4 px.
- Bottom row: `border-top: 1px solid var(--color-border-subtle)`, `padding-block: 32px`, flex, space-between, wrap; left "© 2026 Onéra" Manrope `--size-small` `--color-text-muted`; right text links "Privacy", "Terms" (only if pages exist).

---

## 5. Responsive rules

| Breakpoint | Container pad | Header | Product grid | Collection tiles | Footer blocks | Type |
| --- | --- | --- | --- | --- | --- | --- |
| ≥1200 | 64 px | 96 px, full nav | 4 columns | 3 in grid | 3 columns | Full scale |
| 768–1199 | 32 px | 80 px, full nav (≤5 items fit at 13 px) | 3 columns | 3 in grid | 3 columns, 40 px gap | Scale formulas shrink |
| <768 | 20 px | 64 px, drawer menu | 2 columns | scroll-snap row, 78 vw | stacked | Scale formulas at minimum |
| <380 | 16 px | 64 px, 88 px wordmark | 2 columns | scroll-snap row | stacked | Hero actions stack |

No horizontal page overflow at 320, 375, 767, 1024, 1440 or 1920 px. Tap targets ≥44 × 44 px on every interactive element at <768 px.

---

## 6. Motion rules

| Element | Motion | Reduced motion |
| --- | --- | --- |
| Header | 350 ms slide on scroll direction change | Header stays visible (no hide) |
| Scroll reveal (section headers, cards, tiles) | `opacity 0 → 1`, `translateY(16px → 0)`, 600 ms ease-out, 60 ms stagger within a group, once | Elements render visible; no transition |
| Banner heading | Line-by-line rise, 600 ms, 80 ms stagger | None |
| Collection tile / banner image | `scale(1.05)` over 1 s on hover | No scale |
| Product card | Secondary image crossfade 400 ms | No swap |
| Hotspot halo | 2 s pulse | Static halo |
| Accordion | 250 ms height | Instant |
| Colour and border transitions | 180 ms | Allowed (≤200 ms is permitted under the existing reduced-motion rule, but the current global rule forces 0.01 ms; keep that behaviour) |

Implementation: one `useInView`-style hook with `IntersectionObserver` (`rootMargin: "0px 0px -10% 0px"`, `threshold: .15`), adding `data-inview` to the observed element; CSS owns the animation. All observers disconnect on unmount. No animation library for these rules.

D05 commits the site to full atmospheric motion, including smooth scrolling and a custom cursor, which [Phase 03](../dev/BETA-0.0.1/phase-03-atmospheric-motion-pacing/README.md) owns. The rules above are the home page's baseline and stay valid underneath that layer: Phase 03 may add a dependency for smooth scrolling if it records the decision, must keep every reduced-motion fallback in this table, and must keep native touch scrolling.

---

## 7. Accessibility requirements

These resolve audit findings 3, 7–11.

1. Exactly one `<h1>` (hero). Section titles are `<h2>`; product titles `<h3>`. Each section is a `<section aria-labelledby>`; header and footer are landmarks; `<nav aria-label>` on each nav.
2. Every image has meaningful `alt`; decorative pattern images use `alt=""` and `aria-hidden`.
3. Text over imagery meets 4.5:1 measured against the poster or the lightest frame; the scrim exists for this reason.
4. Icon-only controls have `aria-label`; disclosure buttons have `aria-expanded`; hotspots have `aria-pressed`.
5. Keyboard: visible focus everywhere (`--color-focus` 2 px, offset 3 px); drawer traps focus and returns it on close; accordion and hotspots are native buttons.
6. Motion honours `prefers-reduced-motion`; any video has a pause control.
7. Minimum text size 12 px; minimum interactive size 44 px on touch.
8. Form: visible label or `aria-label`, error text linked with `aria-describedby`, and the D03 outcome "Demo complete. Nothing was sent." announced in an `aria-live="polite"` region.

---

## 8. File plan

```
website/src/
  app/
    globals.css                  tokens (from 03) + base + utilities
    layout.tsx                   fonts, skip link, header, footer
    page.tsx                     composes the home sections in order
  components/
    layout/
      announcement-bar.tsx
      site-header.tsx            server shell
      site-header-behavior.tsx   "use client": sticky + scroll-up + drawer
      site-footer.tsx
      container.tsx
    home/
      hero-media.tsx
      section-header.tsx         variant: "commerce" | "service"
      product-grid.tsx
      product-card.tsx
      editorial-banner.tsx
      collection-tiles.tsx
      shop-the-look.tsx          "use client": hotspot state
      service-block.tsx
      accordion.tsx              <details>-based, "use client" only for height animation
      newsletter-form.tsx        "use client": local-only submit
    ui/
      button.tsx                 variants: primary | inverse | ghost | link; sizes: default | compact | circle
      badge.tsx
      size-chips.tsx
      icon.tsx                   stroke-based icons: search, account, bag, chevron, plus, menu, close, mail
    motion/
      reveal.tsx                 "use client": IntersectionObserver → data-inview
  data/
    garments.ts                  typed records; empty fields render nothing
    collections.ts
    faq.ts
    site.ts                      nav, footer links, announcement copy
  styles/
    home.css                     section and component CSS, imported by globals.css
```

Rules: server components by default; `"use client"` only where listed. No new runtime dependencies in this guide's scope (Phase 03 records its own). `next/image` for all raster media with explicit `sizes`. Data files are the single source of truth for copy and links, so unconfirmed content is an empty array, not a placeholder string. Expose the tokens to Tailwind 4 through an `@theme` block in `globals.css` (for example `--color-background` → `bg-background`) so utilities and hand-written CSS share one source; do not add a `tailwind.config.ts`. Save screenshots and check results under `artifacts/beta-0.0.1/homepage/`, matching the evidence convention in Phase 01.

---

## 9. Build order and acceptance

Each phase ends with `npm run lint`, `npm run typecheck`, `npm run build` passing and the checks listed.

| Phase | Build | Done when |
| --- | --- | --- |
| A. Foundation | Pre-flight fixes (§2); tokens; `Container`, `Button`, `Icon`, `Badge`; base typography classes | Fonts render as Cormorant and Manrope (inspect computed `font-family`); a token page or Storybook-free demo route shows all button variants with the contrast figures from the token mapping |
| B. Chrome | `AnnouncementBar`, `SiteHeader` with sticky scroll-up and mobile drawer, `SiteFooter` | Header hides on scroll down and returns on scroll up at 1440 and 375; drawer traps focus; no horizontal overflow at 320–1920; nav fits on one row at 768+ |
| C. Hero and banner | `HeroMedia`, `EditorialBanner`, `Reveal` | Hero text ≥4.5:1 over poster; one `<h1>`; reduced-motion disables reveals and pauses any video |
| D. Commerce grid | `ProductCard`, `SizeChips`, `ProductGrid`, `SectionHeader` commerce variant, `CollectionTiles` | 4/3/2 columns at 1440/1024/375; 12 px gaps; cards keep 2:3; hover zoom 1.05 over 1 s; every image has alt; empty garment fields render nothing |
| E. Service blocks | `ServiceBlock`, `Accordion`, `NewsletterForm`, `ShopTheLook` (hidden until content) | Accordion is keyboard operable; form shows the nothing-sent outcome in a live region; blocks sit 64 px inset with hairline borders |
| F. Composition and QA | `page.tsx` in blueprint order; the QA checklist below; record decisions (§11) | All checklist items pass; screenshots at 375, 768, 1440 saved to `artifacts/beta-0.0.1/homepage/`; Phase 01 acceptance items that this work satisfies are ticked there |

---

## 10. QA checklist

- [ ] Fonts: computed `font-family` on `h1` starts with Cormorant Garamond; on `body` with Manrope.
- [ ] Contrast: text `#f7f6f2` and `#c3c0b4` on `#14140f`, `#1d1c15`, `#252319`; button labels on `#413e07` and `#57520a`; badge pairs; hero text over poster. All ≥4.5:1 (≥3:1 for borders and icons).
- [ ] Headings: one `h1`, section `h2`s, card `h3`s; no `<p>` styled as a heading.
- [ ] Landmarks: `header`, `nav` × 2 (primary, footer), `main`, `footer`; every section labelled.
- [ ] Images: no empty `alt` on content images; `sizes` set on every `next/image`.
- [ ] Keyboard: tab order follows the visual order; focus visible; drawer and accordion operable; Escape closes the drawer.
- [ ] Motion: `prefers-reduced-motion: reduce` removes reveals, zooms, pulses and header hiding.
- [ ] Layout: no horizontal scroll at 320, 375, 767, 1024, 1440, 1920; 80 px section rhythm; 12 px grid gaps; 2:3 media.
- [ ] Header: scroll-up behaviour; wordmark sizes 124/102/88; nav on one row ≥768.
- [ ] Content: nothing invented; every "To define" renders nothing or a labelled empty state; the newsletter form ends with "Demo complete. Nothing was sent."; no search, account, bag or currency control is rendered.
- [ ] Build: `npm run lint`, `npm run typecheck`, `npm run build` clean; no new dependencies.

---

## 11. Decisions to log and inputs required

Record brand-facing choices as B-entries in [the decision log](../brand-identity/decisions.md) and implementation choices in [decisions and inputs](../dev/BETA-0.0.1/decisions-and-inputs.md), dated, in the same format each file already uses:

1. Button shape changes from square to 64 px pill; block radius 4 px; circle utilities. Rationale: Ziva's shape language is adopted as a system.
2. Container widens from 1200/1440 px to 1600 px with 64/32/20 px padding.
3. Navigation and label type rises from 10.9 px to 13 px uppercase tracked; body from 15 px to 16 px.
4. Heading scale 1.1 for Cormorant Garamond; 300 weight for h0/h1 only.
5. Product card titles use Manrope, not Cormorant.
6. Olive is fill-only; alabaster is text-only. Parchment is the inverse fill over imagery.
7. Terracotta replaces red for sale and danger; sage for success; parchment for warning and stars.
8. Footer newsletter form removed; one form per page.
9. Header keeps the centred wordmark with split navigation (D07) rather than Ziva's logo-left desktop layout.
10. No utility icons in the header until search, account or bag are functional (D07).

Inputs the house must supply before the matching section can show real content:

| Input | Needed by |
| --- | --- |
| Hero still or video with poster, and its alt text | §3 row 1 |
| Garment records: name, collection, price or "price on request", sizes with availability, two photographs each with alt text | §3 rows 2 and 5 |
| Collection banner image for The Gate of Horn | §3 row 3 |
| Names and cover images for up to two more collections | §3 row 4 |
| Editorial look image with garment positions | §3 row 5 |
| Confirmed answers on fit, care, delivery, returns | §3 row 6 |
| Atelier address, hours, contact route, social handles | §3 row 8 |
| Nav labels beyond Collections / Garments / The house | §4.3 |
