# Ziva Lagos home page — UI audit

**Purpose.** zivalagos.com is the structural and stylistic reference for the Onéra home page (decision D07 in [BETA-0.0.1 decisions and inputs](../dev/BETA-0.0.1/decisions-and-inputs.md)). This document records what the site actually does, measured in the browser, so the clone guide can translate it into Onéra's dark-mode system without guesswork. Per D07, nothing here is copied into Onéra: no text, images, branding or offers.

**Scope.** Home page only (`https://www.zivalagos.com/`), desktop at 1392 px viewport and mobile at 375 px viewport. Audited 8 November 2026.

**Companion documents.** [02. Home page clone guide](02-homepage-clone-guide.md) · [03. Token mapping](03-token-mapping.md) · Reference captures in [`artifacts/reference/zivalagos/`](../../artifacts/reference/zivalagos/README.md) (reference only, not for redistribution).

**Full-page captures.** Native-resolution images of the entire home page are in [`artifacts/reference/zivalagos/full-page/`](../../artifacts/reference/zivalagos/full-page/): `home-desktop-1440-native.png` (1440 × 8500) and `home-mobile-390-native@2x.png` (780 × 16868, divide by 2 for CSS px). Measure against these; the stitched browser-pane versions beside them are for walkthroughs only.

---

## 1. Platform summary

| Item | Finding |
| --- | --- |
| Platform | Shopify theme (Tailwind-utility based, web components: `sticky-header`, `slideshow-element`, `lqip-element`, `shoppable-image-controller`) |
| Stylesheet | Single `main.css` (~213 KB) plus inline theme-settings variables |
| Fonts | Buenard 400/700 (body), EB Garamond 400 (headings, navigation), served from Shopify's font CDN as woff2 with `font-display: swap` |
| Third-party overlays | Shopify Inbox chat bubble (bottom right), discount pop-up "10% off" (bottom left), Judge.me reviews, "Follow on shop" button |
| Document height | 8,345 px desktop, 8,434 px mobile |
| Scroll behaviour | Sticky header in **scroll-up** mode: hides on scroll down, returns on scroll up; scroll-reveal animations enabled; image hover zoom enabled |

### Page outline (top to bottom)

| # | Section | Desktop height | Notes |
| --- | --- | --- | --- |
| 0 | Announcement bar | 41 px | Single uppercase sentence |
| 0 | Header | 133 px | Logo left, two-row centred navigation, utilities right |
| 1 | Video hero with text overlay | 805 px | Autoplay muted loop, centred heading and sub-copy, no CTA |
| 2 | Featured collection "Shop New In" | 1,541 px | 8 product cards in two rows of 4, "VIEW ALL" link |
| 3 | Slideshow | 700 px | Single slide image, left-aligned h0 heading, two pill CTAs, arrows |
| 4 | Featured collection (dresses) | 1,401 px | 8 product cards, **no section heading** |
| 5 | Collection list "Shop Our Collections" | 786 px | 3 portrait tiles with overlay labels |
| 6 | Shop the look | 1,240 px | Hotspot image left, product card right |
| 7 | FAQ | 551 px | Grey block, centred heading, 3 visible accordions |
| 8 | Newsletter | 390 px | Grey block, icon, centred heading, pill input and button |
| 9 | Footer | 677 px | 3 content blocks plus bottom utility row |

---

## 2. Design tokens (as implemented)

All values are read from the theme's `:root` custom properties and computed styles.

### 2.1 Colour

| Role | Value | Where used |
| --- | --- | --- |
| Base background | `#ffffff` (255 255 255) | Page, header, footer, product cards, modals |
| Base foreground / headings / accent | `#342563` (52 37 99) | All text, icons, primary buttons, links, free-shipping bar, review stars |
| Foreground at 6 % | `rgba(52,37,99,.06)` | Default border colour on every element, input backgrounds |
| Foreground at 20 % | `rgba(52,37,99,.2)` | Size-chip borders |
| Foreground at 5 % | `rgba(52,37,99,.05)` | Sticky header bottom border (1.25 px) |
| Block background | `#f9f9f9` (gray-50) | FAQ and newsletter blocks |
| Border grey | `#d4d4d4` (gray-300) | Generic `--color-border` |
| Separator | `#e5e7eb` | `--color-separator` |
| Button primary | bg `#342563`, hover `#402d79`, active `#281d4d`, text `#ffffff` | Pills, quick-add circle, subscribe |
| Button secondary | bg `#ffffff`, hover `#f2f2f2`, active `#e6e6e6`, text `#342563` | Slideshow CTA |
| Sale badge / sale price | `#d12b23` on `#ffffff` | Not seen on home page but defined |
| Sold-out badge | `#000000` bg, `#ffffff` text | Product card badge |
| Custom badge | `#0a0b0c` bg, `#ffffff` text | Slideshow button text colour reuses this |
| Success / in-stock | `#16a34a` | Stock text |
| Warning / rating star | `#ffc60d` | Rating stars |
| Danger / low stock | `#dc2626` | Stock text |
| Slideshow placeholder bg | `#2d2d2d` (45 45 45) | Behind slide image while loading |
| Overlay | `rgb(0 0 0 / 43%)` | Modals and drawers |

The palette is effectively **two colours**: one deep purple used for everything, and white. Greys are reserved for block backgrounds and borders. Contrast of body text on white is approximately 12:1.

### 2.2 Typography

Font families: body `Buenard, serif`; headings and navigation `"EB Garamond", serif`. Heading weight 400. Body weight 400, bold 700. Body scale 1.0, heading scale 1.0.

Responsive heading sizes use `min(cap, base + vw)`:

| Style | Formula | Desktop result (1392 px) | Mobile result (375 px) | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| h0 | `min(4rem, 1.75rem + 3vw)` | 64 px | 39 px | 1.125 | −0.025 em |
| h1 | `min(3rem, 1.5rem + 2vw)` | 48 px | 31.5 px | 56/48 | −0.025 em |
| h2 | `min(2.25rem, 1.3125rem + 1.25vw)` | 36 px | 25.7 px | 44/36 | −0.025 em |
| h3 | `min(1.875rem, 1.21875rem + .875vw)` | 30 px | 22.8 px | 1.2 | −0.025 em |
| h4 | `min(1.5rem, 1.125rem + .5vw)` | 24 px | 19.9 px | 32/24 | −0.025 em |
| h5 | `min(1.25rem, 1.0625rem + .25vw)` | 20 px | 18 px | 28/20 | −0.025 em |
| h6 | `min(1.125rem, 1.03125rem + .125vw)` | 18 px | 16 px | 24/18 | −0.025 em |
| Body | 1 rem | 16 px | 16 px | 24 px (prose 28 px) | 0 |
| Small | .875 rem | 14 px | 14 px | — | — |
| Extra small | .75 rem | 12 px | 12 px | — | — |
| 2x small | .625 rem | 10 px | 10 px | — | — |

Where each style appears:

| Element | Style | Case / tracking |
| --- | --- | --- |
| Announcement text | 14 px body | Uppercase as typed, +0.1 em (1.4 px) |
| Navigation items | 16 px EB Garamond, line-height 16 px | Uppercase |
| Hero heading | h1 48/56 white | Sentence case |
| Hero sub-copy | 16/28 body white | Sentence case |
| Slideshow heading | h0 64/72 white, split into lines | Sentence case |
| Section heading, left-aligned ("Shop New In") | h4 24/32 | Sentence case |
| Section heading, left-aligned ("Shop Our Collections", "Shop the look") | h2 36/44 | Sentence case |
| Section heading, centred (FAQ, newsletter) | h2 36/44, margin-bottom 16 px | Sentence case |
| Collection tile label | h4 24/32 white | Sentence case |
| "VIEW ALL" link | 14 px body 700 | Uppercase, +0.025 em |
| Product title | 16/24 body 700 | Sentence case |
| "Regular price" label and price | 16 px body 400 | Sentence case |
| Size chips | 12 px body 400 | — |
| Sold-out badge | 12 px body 700 | Uppercase |
| Buttons | 16 px body 700 (14 px in slideshow and footer) | Uppercase, +0.05 em |
| FAQ question | 18 px body 700 | Sentence case |
| Footer column heading | 16 px body 700, margin-bottom 16 px | As typed |
| Footer links | 16/24 body 400 | Sentence case |
| Footer body copy | 16/28 body 400 | — |
| Copyright | 16 px body | — |

### 2.3 Spacing and layout

| Token | Value |
| --- | --- |
| Container max inner width | 1600 px |
| Container padding | 64 px ≥1200 px; 32 px 768–1199 px; 20 px <768 px |
| Container at 1392 px viewport | 1264 px inner |
| Section vertical spacing (normal) | `clamp(3rem, 1.9231rem + 4.1026vw, 5rem)` → 80 px desktop, 48 px mobile |
| Block spacing (small, site setting) | 12 px — used as grid gap everywhere |
| Section header margin-bottom | 40 px (left-aligned), 48 px (centred) |
| Header min-height | 96 px ≥992 px; 80 px 768–991 px; 64 px <768 px |
| Header vertical padding | 20 px |
| Header grid gap | 24 px |
| Footer blocks gap | 80 px; margin-bottom `min(5rem, 2rem + 4vw)` → 80 px |
| Footer bottom row padding | 32 px 0 |
| Grey block (`section--block`) | margin 0 64 px 80 px; padding 64 px |

Stacking rule: consecutive full-width sections share one 80 px gap (the lower section drops its top padding when the previous section has the same background), so the rhythm reads as 80 px between every section.

### 2.4 Shape

| Token | Value |
| --- | --- |
| Block corner radius | 4 px (`rounded-block`) |
| Small / extra-small block radius | min(4 px, .5 rem) / min(4 px, .25 rem) → 4 px |
| Button radius | 64 px (pill) |
| Circle buttons (quick add, slideshow arrows) | 9999 px |
| Input radius | 4 px |
| Dropdown radius | 4 px |
| Colour swatch | 9999 px, 1:1 |
| Icon strokes | xs 1.5, sm 1.75, md 1.875 (default), lg 2, xl 2.5; square caps and joins |

### 2.5 Motion

| Behaviour | Implementation |
| --- | --- |
| Scroll reveal | `html.scroll-animations-enabled scroll-animate [data-animation] { opacity: 0 }`, then JS-driven reveal; the attribute is removed once revealed. Applied to headings (`data-animation="heading"`) and blocks (`data-animation="block"`). |
| Sticky header | `.section-site-header--hidden { transform: translateY(calc(-100% - 2px)) }` with `transition: transform .35s cubic-bezier(.165,.84,.44,1)`; mode `scroll-up` |
| Image hover zoom | scale 1.05 over 1 s, `cubic-bezier(.34,.01,.04,.98)`, on `.group:hover .image-hover-zoom` (collection tiles) |
| Product card hover | second product image swaps in (two `<img>` present per card) |
| Navigation hover | `opacity: .7` |
| Footer link hover | underline, offset .25 rem |
| Logo | opacity transition 333 ms (used for transparent-header variant, inactive here) |
| Slideshow | `background-animation="ZoomOut"`, `content-animation="ClipLineByLine"` (heading split into lines, revealed line by line), speed 6000 ms, autoplay **off** |
| Hotspot | halo pulses 2 s ease-in-out infinite (`hotspot-pulsate`); plus icon rotates 45° on active; sibling hotspots fade to 50 % |
| Details/accordion | chevron rotates 90° on open; `smooth-collapse` element animates height |
| Reduced motion | Not honoured anywhere observed |

---

## 3. Component inventory

### 3.1 Announcement bar
- Height 41 px desktop; 74 px on mobile because the sentence wraps to three lines.
- 14 px text, +0.1 em tracking, black (not the purple foreground), centred, white background, no bottom border.
- Copy: payment instruction (Flutterwave for Naira, card for international).

### 3.2 Header
- White background, `position: relative` in flow, becomes `position: sticky; top: 0; z-index: 1000` with a 1.25 px bottom border at foreground/5 % once stuck.
- Container grid: `124px | 1fr | auto` with 24 px gap, padding 0 64 px, max width 1728 px.
- Logo: raster PNG 124 × 93 px (desktop), 76 px wide (mobile), wrapped in an `<h1>` with visually hidden "Ziva Lagos" text.
- Navigation: 11 top-level items in EB Garamond 16 px uppercase, centred, `flex-wrap: nowrap` on the `<ul>` but the items still break onto **two rows** at 1392 px. Items with children (Collections, Dresses, Shop, FAQ & Policies) show a chevron and open a dropdown (`details`/`summary`, hover background foreground/2.5 %).
- Utilities right: localisation selector "United States (USD $)" with flag and chevron, 16 px; search, account and cart icons each in a 44 × 44 px hit area with a 28 px SVG at 2 px stroke.
- Mobile (375 px): height 81 px, grid `121.5px | 76px | 121.5px`, hamburger (20 px glyph, "Open menu") left, logo centre, search and cart right (account hidden).

### 3.3 Hero (video with text overlay)
- 805 px tall desktop, 476 px mobile; full-bleed, `object-fit: cover` video, autoplay, muted, loop, poster image supplied. Source is an HD 1080p mp4 at 7.2 Mbps.
- Content column max width 768 px, padding 80 px 0, centred text.
- Heading: `<p class="h1">` 48/56 white, margin-bottom 8 px. Sub-copy 16/28 white. **No overlay, gradient or text-shadow**, and no call to action.
- Header does **not** overlap the hero; the transparent-header styles exist in the theme but the hero section does not enable them.

### 3.4 Featured collection ("Shop New In")
- Section header: flex row, h4 heading left, "VIEW ALL ›" link right (14 px bold uppercase, chevron icon), margin-bottom 40 px.
- Grid: 4 columns at 1392 px, 12 px gap, 2 rows (8 products). Mobile: 2 columns of 162 px cards, 12 px gap.
- Product card (307 × 619 px desktop):
  - Media: 2:3 aspect ratio (307 × 461), `object-fit: cover`, 4 px radius on the block, secondary image on hover.
  - Quick-add: 48 px circle (36 px mobile), primary purple, bag icon 24 px, positioned 16 px from bottom and right of the media (8 px mobile), always visible.
  - Badge: "SOLD OUT" top-right, black, white 12 px bold uppercase, padding 6 × 8 px, 4 px radius.
  - Info block: padding-top 24 px; title `<h2>` 16/24 bold; "Regular price" label 16 px; price 16 px; all left aligned.
  - Sizes: row of anchor chips, margin-top 16 px, gap 6 px; each chip 28 px tall, min-width 28 px, 1.25 px border at foreground/20 %, 4 px radius, 12 px text, padding 0 6 px. Unavailable sizes drop to 20 % opacity with a diagonal cross background image.
- Second featured collection (section 4) repeats the component with 8 more products and **no heading or link**, so the two grids read as one 16-product wall broken by the slideshow.

### 3.5 Slideshow
- Height `min(700px, 35.875rem + 16.40625vw)` → 700 px desktop. Single visible slide; arrows present, no dots, autoplay off.
- Background image `object-fit: cover`, placeholder `#2d2d2d`, overlay `linear-gradient(90deg, #000 0 %, #000, rgba(0,0,0,.75), rgba(0,0,0,.45), rgba(0,0,0,.2), transparent)` at 15 % opacity; mobile overlay solid black at 15 %.
- Content: left aligned, max width `min(95%, 620px)`, inside the 64 px container padding, vertically centred. Heading h0 64/72 white (split-lines element). Two CTAs: primary white pill (49 px tall, 14 px bold uppercase, padding 17.5 × 28 px, near-black text `#0a0b0c`) and a secondary transparent pill with white text.
- Arrows: two 48 px circles at the bottom right, white at 90 % opacity, purple chevron.

### 3.6 Collection list ("Shop Our Collections")
- Section header h2 left, margin-bottom 40 px. No link.
- Grid `scroll-area-x bleed`: 3 tiles × 413 × 620 px (2:3), 12 px gap; horizontally scrollable when it overflows.
- Tile: `collection-block--overlay`, 4 px radius, `image-hover-zoom` (1.05 over 1 s), label h4 24 px white at bottom-left with inner padding; a dark gradient overlay sits behind the label.

### 3.7 Shop the look
- Section header h2 left, margin-bottom 40 px.
- Body grid: 2 columns of 600 px, 64 px gap, `align-items: flex-start`.
- Left: image 600 × 1076 px with 4 px radius and 14 hotspot anchors (white dot, pulsing 25 % white halo, 10 px plus glyph).
- Right: a single product card for the active hotspot. On the live site the card shows the theme placeholder ("Product", "$50.00", line-art bag) — unconfigured content.

### 3.8 FAQ
- `section--block`: grey `#f9f9f9` block, 4 px radius, margin 0 64 px 80 px, padding 64 px.
- Heading h2 centred, margin-bottom 16 px; sub-copy 16 px centred, max width 569 px; header margin-bottom 48 px.
- List max width 768 px centred; 6 `details` items (3 shown in the text extract); `summary` is a flex row, space-between, 18 px bold, padding 16 px 0, chevron icon rotating 90° when open; hairline dividers at foreground/6 %.

### 3.9 Newsletter
- Same grey block treatment. Envelope icon 48 px, 2.5 px stroke, purple. Heading h2 centred, margin-bottom 16 px; sub-copy 16 px.
- Form: flex row, gap 12 px, width 576 px; input `.input` 56 px tall, background foreground/6 %, 4 px radius, padding 14 px, placeholder "E-mail", focus border = accent; button primary pill 56 px tall, 16 px bold uppercase +0.05 em, padding 20 × 32 px.

### 3.10 Footer
- White, `section--full-width`, 64 px side padding.
- `footer__blocks`: flex, gap 80 px, wrap, margin-bottom 80 px; three blocks at 442 / 221 / 442 px (text, links, newsletter). Mobile stacks each at full width (335 px).
- Block 1: logo PNG 130 px wide (margin-bottom 32 px), "About us" 16 px bold, prose with emoji bullets (address, phone, hours).
- Block 2: "INFO" heading, 5 links in a column with 12 px gap, 16/24, hover underline.
- Block 3: "Stay in touch" heading, copy, a second newsletter form (input + 49 px pill button at 14 px).
- `footer__bottom`: flex, wrap, padding 32 px 0; localisation selector left, Instagram icon (24 px) and "Follow on shop" pill right; then a row of payment icons (48 px wide each) and "© 2026 Ziva Lagos, Powered by Shopify".

### 3.11 Floating overlays (third party)
- Shopify Inbox chat pill, black, bottom right, label "Chat".
- Discount pop-up card "10 % off" with close button, white with shadow, bottom left.
- Both overlap product cards on mobile.

---

## 4. Responsive behaviour (375 px)

| Element | Mobile value |
| --- | --- |
| Announcement bar | 74 px (3 lines) |
| Header | 81 px; hamburger / 76 px logo / search + cart |
| Container padding | 20 px |
| Hero | 476 px tall; heading 31.5/36.75 px; sub-copy wraps to 2 lines |
| Section padding | 48 px 20 px |
| h2 | 25.7/31.4 px |
| Product grid | 2 columns, 162 px cards, 12 px gap; size chips wrap to a second row |
| Quick add | 36 px circle, 8 px inset |
| Footer blocks | stacked, full width |
| Document height | 8,434 px |

---

## 5. Audit findings

Issues observed on the reference site. These are things the Onéra clone should **not** reproduce.

### Structure and content
1. **Navigation overflows.** 11 top-level items wrap onto two rows at 1392 px; the header grows to 133 px. Cap top-level items at 5–6.
2. **Announcement copy too long.** 113 characters wrap to three lines on mobile (74 px). Keep under 60 characters or allow dismissal.
3. **Heading hierarchy is broken.** The page `<h1>` is the hidden logo text in the header; the hero title is a `<p class="h1">`; every section heading is a `<p class="heading">`; product titles are `<h2>`. Screen readers get 16 product `<h2>`s and no section landmarks.
4. **Duplicate content.** Two stacked featured collections (16 cards) with the second lacking a heading, plus two newsletter forms (section and footer), plus the slideshow CTA repeating "Shop New In".
5. **Unconfigured block live.** "Shop the look" renders the theme's placeholder product.
6. **Emoji in navigation and footer** labels (seasonal collection names, address bullets) render inconsistently across platforms.

### Accessibility
7. **Hero text contrast.** White 48 px heading and 16 px sub-copy sit directly on pale footage with no scrim, gradient or shadow; contrast falls below 3:1 over light frames.
8. **Empty alt text** on product, collection, hero poster and logo images.
9. **Size chips** are 12 px anchors; unavailable sizes at 20 % opacity are unreadable and still focusable links.
10. **Autoplaying video** without a pause control and without honouring `prefers-reduced-motion`; no reduced-motion handling for scroll reveals or hotspot pulsing.
11. Chevron-only disclosure buttons in the navigation have no accessible name beyond the link text.

### Performance
12. Hero video is a 7.2 Mbps 1080p mp4 loaded eagerly on every visit.
13. 16 product cards each load two images (hover swap) above the fold of their section.
14. Three third-party scripts (chat, discount pop-up, reviews) add floating UI that covers content on mobile.

### Visual consistency
15. Section headings alternate between h4 (24 px) and h2 (36 px) at the same hierarchy level ("Shop New In" vs "Shop Our Collections").
16. Button heights vary: 49 px (14 px text) in the slideshow and footer, 56 px (16 px text) in the newsletter block.
17. The announcement bar uses pure black text while everything else uses the purple foreground.

---

## 6. What to keep

The qualities worth carrying into Onéra, independent of colour:

- **One accent, one neutral.** The purple-on-white restraint is why the product photography reads loudly. Onéra inverts it: parchment-on-near-black with olive as the single accent.
- **Tight 12 px grid gap** with generous 80 px section rhythm makes dense product grids feel edited rather than crowded.
- **2:3 portrait media everywhere** (cards, tiles) gives the page one consistent silhouette.
- **Pill buttons, 4 px blocks, circle utilities** — a soft, consistent shape language.
- **Left-aligned editorial headers** with a right-aligned "View all" for shopping sections; **centred headers inside grey blocks** for service sections (FAQ, newsletter). This split tells the reader which sections are commerce and which are support.
- **Scroll-up sticky header** keeps navigation reachable without permanently costing 96 px.
- **Quiet motion**: 1 s hover zoom, 350 ms header slide, line-by-line heading reveal.
