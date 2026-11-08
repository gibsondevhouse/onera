# Token mapping — Ziva Lagos light theme → Onéra dark mode

**Purpose.** A one-to-one translation of every design token the reference site uses into Onéra's dark-mode system, with contrast checked against WCAG 2.1 AA. The clone guide references these names; the CSS at the end is ready to paste into `website/src/app/globals.css`.

**Sources.** Ziva values from [01. UI audit §2](01-zivalagos-ui-audit.md#2-design-tokens-as-implemented). Onéra values from the existing `website/src/app/globals.css`, the wordmark spec (`artifacts/wordmark/wordmark-spec.json`) and the logo display palette (`artifacts/logo-display/logo-display-spec.json`).

---

> **Revision, 8 November 2026.** On first viewing, the olive-black surfaces plus an olive glow read as "military". The base surfaces were moved to a warm neutral charcoal and the glows to parchment; olive is now confined to controls (buttons, quick-add circles). The values below and the CSS in §5 reflect the revision: background `#121211`, surface `#1a1918`, raised `#222120`, media `#171615`, line `#605c57`, muted text `#bfbbb4`. The announcement bar sits on the raised surface with muted text rather than an olive fill.

> **Second revision, same day.** Olive `#413e07` as a fill on charcoal (quick-add circles, Subscribe buttons) read as a muddy green. Primary controls are now **parchment on charcoal** (`--color-accent: #f1e9d9`, label `#121211`, hover `#fff5e7`, active `#e3dac7`), so the inverse and primary variants share one fill until a second accent is chosen. Olive stays a brand token with no fill use. The footer's About block introduces the brand's **forest green** `#294638` as a panel with parchment headings and sage `#bcc5b2` body text (8.6:1 and 5.8:1).

## 1. Principle

Ziva is a two-colour site: one deep purple for everything, white underneath. Onéra inverts the pair and keeps the discipline:

| Ziva role | Ziva | Onéra | Onéra value |
| --- | --- | --- | --- |
| The canvas | White | Near-black with a warm olive cast | `#14140f` |
| The ink (text, icons, buttons) | Purple `#342563` | Alabaster text, olive for fills | text `#f7f6f2`, fill `#413e07` |

Where Ziva uses its single purple both as **text** and as **button fill**, Onéra splits the job: alabaster carries text and icons, olive carries fills. This split is necessary because olive on near-black is only 1.7:1 and cannot carry text.

---

## 2. Colour

### 2.1 Surfaces and lines

| Ziva token | Ziva value | Onéra token | Onéra value | Notes |
| --- | --- | --- | --- | --- |
| `--color-base-background` | `#ffffff` | `--color-background` | `#121211` | Warm neutral charcoal (revised from `#14140f`) |
| gray-50 block background | `#f9f9f9` | `--color-surface` | `#1a1918` | Revised from `#1d1c15`. 1.1:1 against background, so blocks get a hairline border |
| Card / modal background | `#ffffff` | `--color-surface-raised` | `#222120` | Revised from `#252319`. Dropdowns, drawers, announcement bar, hover states |
| Slideshow placeholder | `#2d2d2d` | `--color-surface-media` | `#171615` | Behind images while loading (revised from `#191810`) |
| Border at fg/6 % | `rgba(52,37,99,.06)` | `--color-border-subtle` | `rgb(247 246 242 / 8%)` | New. Dividers, block outlines |
| Border at fg/20 % (chips) | `rgba(52,37,99,.2)` | `--color-line` | `#6b6755` | Existing in `globals.css`. 3.3:1 against background, passes the 3:1 non-text minimum; the 20 % alpha equivalent would be 1.7:1 and fail. Phase 01's write-up lists the line token as `#454336`, which is about 2:1 and would also fail; `#6b6755` is the value to keep |
| Sticky header border fg/5 % | `rgba(52,37,99,.05)` | `--color-border-subtle` | as above | |
| Input background fg/6 % | `rgba(52,37,99,.06)` | `--color-input-bg` | `rgb(247 246 242 / 6%)` | New |
| Overlay | `rgb(0 0 0 / 43%)` | `--color-overlay` | `rgb(20 20 15 / 72%)` | New. Darker because the page is already dark |
| Slide image scrim | black gradient at 15 % | `--color-scrim` | `rgb(20 20 15 / 55%)` | New. Stronger scrim fixes the hero contrast failure |

### 2.2 Text

| Ziva token | Ziva value | Onéra token | Onéra value | Contrast on `#14140f` |
| --- | --- | --- | --- | --- |
| `--color-base-foreground` | `#342563` | `--color-text` | `#f7f6f2` | 17:1 |
| `--color-base-headings` | `#342563` | `--color-text` | `#f7f6f2` | 17:1 |
| Secondary copy (prose, labels) | `#342563` | `--color-text-muted` | `#bfbbb4` | 9.9:1 |
| Text over imagery | `#ffffff` | `--color-text-on-media` | `#f7f6f2` | Needs scrim; see §2.1 |
| Announcement text | `#000000` | `--color-text-muted` on `--color-surface-raised` | `#bfbbb4` | Ziva's black is an inconsistency; do not copy |

### 2.3 Accent and buttons

| Ziva token | Ziva value | Onéra token | Onéra value | Contrast |
| --- | --- | --- | --- | --- |
| `--color-base-accent` | `#342563` | `--color-accent` | `#413e07` | Fill only |
| `--button-primary-background` | `#342563` | `--color-accent` | `#413e07` | Label `#f7f6f2` on fill: 10.1:1 |
| `--button-primary-background-hover` | `#402d79` | `--color-accent-hover` | `#57520a` | Label on fill: 7.4:1 (existing value) |
| `--button-primary-background-active` | `#281d4d` | `--color-accent-active` | `#2f2d05` | New |
| `--button-primary-foreground` | `#ffffff` | `--color-on-accent` | `#f7f6f2` | |
| `--button-secondary-background` (white pill on imagery) | `#ffffff` | `--color-inverse` | `#f1e9d9` | New. Parchment pill for use over photography |
| `--button-secondary-background-hover` | `#f2f2f2` | `--color-inverse-hover` | `#fff5e7` | New (brand cream) |
| `--button-secondary-foreground` | `#342563` | `--color-on-inverse` | `#14140f` | 15.5:1 |
| Transparent pill with white text | — | `--button-ghost` | border `--color-line`, text `--color-text` | |
| Focus ring | browser default | `--color-focus` | `#f1e9d9` | Existing |

### 2.4 Status and badges

| Ziva token | Ziva value | Onéra token | Onéra value | Contrast |
| --- | --- | --- | --- | --- |
| `--color-sold-out-badge` / text | `#000000` / `#ffffff` | `--badge-soldout-bg` / `--badge-soldout-text` | `#f1e9d9` / `#14140f` | 15.5:1 |
| `--color-sale-badge` / text | `#d12b23` / `#ffffff` | `--badge-sale-bg` / `--badge-sale-text` | `#b66d52` / `#14140f` | 4.7:1 (cream text would be 3.7:1 and fail at 12 px) |
| `--color-sale-price` | `#d12b23` | `--color-sale-price` | `#b66d52` | 4.7:1 on background |
| `--color-custom-badge` | `#0a0b0c` | `--badge-custom-bg` | `#663a45` plum, text `#f1e9d9` | Brand plum/parchment pair |
| `--color-success` / in-stock | `#16a34a` | `--color-success` | `#bcc5b2` sage | Muted on dark; text use only |
| `--color-warning` / stars | `#ffc60d` | `--color-warning` | `#f1e9d9` parchment | Stars read as parchment, not gold |
| `--color-danger` / low stock | `#dc2626` | `--color-danger` | `#b66d52` terracotta | Shares the sale hue by design |
| Hotspot halo | `rgb(255 255 255 / 25%)` | `--hotspot-halo` | `rgb(241 233 217 / 30%)` | |

Brand colours not used by any token above (lavender `#d8d0e6`, blush `#e8cfc7`, forest `#294638`, charcoal `#262521`) stay reserved for photography and collection art direction, not UI.

---

## 3. Typography

| Ziva | Onéra | Rationale |
| --- | --- | --- |
| Headings and navigation: EB Garamond 400 | Headings: **Cormorant Garamond** 300 for h0/h1, 400 for h2–h6 | Already loaded by `next/font`; 300 is the wordmark weight |
| Body: Buenard 400 / 700 | Body: **Manrope** 400 / 600 | Already loaded; a sans body keeps the dark page legible at 15–16 px |
| Navigation: 16 px uppercase, no tracking | Navigation and labels: Manrope 13 px uppercase, +0.12 em | Onéra's current 10.9 px nav is below the 12 px floor the audit sets; 13 px keeps the tracked-caps character |
| Buttons: 16 px bold uppercase +0.05 em | Buttons: Manrope 13 px 600 uppercase +0.1 em | |
| `--font-heading-scale: 1` | `--font-heading-scale: 1.1` | Cormorant's x-height is smaller than EB Garamond's; 1.1 restores equal visual size |
| Heading tracking −0.025 em | h0–h2 −0.02 em; h3–h6 0 | Cormorant at 300 weight closes up faster than EB Garamond |

### Type scale (Onéra values, after the 1.1 heading scale)

| Style | Formula | Desktop (1392 px) | Mobile (375 px) | Line height | Weight |
| --- | --- | --- | --- | --- | --- |
| h0 | `calc(min(4rem, 1.75rem + 3vw) * 1.1)` | 70 px | 43 px | 1.08 | 300 |
| h1 | `calc(min(3rem, 1.5rem + 2vw) * 1.1)` | 53 px | 35 px | 1.12 | 300 |
| h2 | `calc(min(2.25rem, 1.3125rem + 1.25vw) * 1.1)` | 40 px | 28 px | 1.18 | 400 |
| h3 | `calc(min(1.875rem, 1.21875rem + .875vw) * 1.1)` | 33 px | 25 px | 1.2 | 400 |
| h4 | `calc(min(1.5rem, 1.125rem + .5vw) * 1.1)` | 26 px | 22 px | 1.3 | 400 |
| h5 | `calc(min(1.25rem, 1.0625rem + .25vw) * 1.1)` | 22 px | 20 px | 1.35 | 400 |
| h6 | `calc(min(1.125rem, 1.03125rem + .125vw) * 1.1)` | 20 px | 18 px | 1.4 | 400 |
| Body | 1 rem | 16 px | 16 px | 1.6 (prose 1.75) | 400 |
| Body small | .875 rem | 14 px | 14 px | 1.5 | 400 |
| Label | .8125 rem | 13 px | 13 px | 1 | 400 / 600 |
| Caption | .75 rem | 12 px | 12 px | 1.4 | 400 |

Minimum rendered text size anywhere on the page: 12 px.

---

## 4. Spacing, shape, motion

These carry over unchanged from Ziva. They are what makes the layout read as the same design.

| Token | Value |
| --- | --- |
| `--container-max` | 1600 px |
| `--container-pad` | 64 px ≥1200; 32 px ≥768; 20 px below |
| `--space-section` | `clamp(3rem, 1.9231rem + 4.1026vw, 5rem)` (48 → 80 px) |
| `--space-block` | .75 rem (12 px grid gap) |
| `--space-section-header` | 2.5 rem (40 px); 3 rem (48 px) when centred |
| `--header-height` | 6 rem ≥992; 5 rem ≥768; 4 rem below |
| `--radius-block` | 4 px |
| `--radius-pill` | 64 px |
| `--radius-input` | 4 px |
| `--radius-circle` | 9999 px |
| `--icon-stroke` | 1.875 px default; 1.5 xs; 2 lg; square caps and joins |
| `--ease-out-expo` | `cubic-bezier(.165,.84,.44,1)` (header slide, 350 ms) |
| `--ease-zoom` | `cubic-bezier(.34,.01,.04,.98)` (image zoom, 1 s, scale 1.05) |
| `--duration-fast` | 180 ms (colour transitions, existing) |
| `--duration-reveal` | 600 ms (scroll reveal) |

Onéra's current square buttons and 1440/1200 px shells are replaced by the pill and the 1600 px container. Record this in the decision log.

---

## 5. Ready-to-paste CSS

Replace the existing `:root` block in `website/src/app/globals.css` with the following. Keep everything below `:root` until the clone guide's component phases rewrite it.

```css
:root {
  color-scheme: dark;

  /* Surfaces and lines */
  --color-background: #121211;
  --color-surface: #1a1918;
  --color-surface-raised: #222120;
  --color-surface-media: #171615;
  --color-border-subtle: rgb(247 246 242 / 8%);
  --color-line: #605c57;
  --color-input-bg: rgb(247 246 242 / 6%);
  --color-overlay: rgb(20 20 15 / 72%);
  --color-scrim: rgb(20 20 15 / 55%);

  /* Text */
  --color-text: #f7f6f2;
  --color-text-muted: #bfbbb4;
  --color-text-on-media: #f7f6f2;
  --color-focus: #f1e9d9;

  /* Accent and buttons */
  --color-olive: #413e07;
  --color-accent: var(--color-olive);
  --color-accent-hover: #57520a;
  --color-accent-active: #2f2d05;
  --color-on-accent: #f7f6f2;
  --color-inverse: #f1e9d9;
  --color-inverse-hover: #fff5e7;
  --color-on-inverse: #14140f;

  /* Status */
  --badge-soldout-bg: #f1e9d9;
  --badge-soldout-text: #14140f;
  --badge-sale-bg: #b66d52;
  --badge-sale-text: #14140f;
  --badge-custom-bg: #663a45;
  --badge-custom-text: #f1e9d9;
  --color-sale-price: #b66d52;
  --color-success: #bcc5b2;
  --color-warning: #f1e9d9;
  --color-danger: #b66d52;
  --hotspot-halo: rgb(241 233 217 / 30%);

  /* Type — families come from next/font variables set on <html>;
     do NOT redeclare --font-display / --font-ui here. */
  --font-heading-scale: 1.1;
  --size-h0: calc(min(4rem, 1.75rem + 3vw) * var(--font-heading-scale));
  --size-h1: calc(min(3rem, 1.5rem + 2vw) * var(--font-heading-scale));
  --size-h2: calc(min(2.25rem, 1.3125rem + 1.25vw) * var(--font-heading-scale));
  --size-h3: calc(min(1.875rem, 1.21875rem + .875vw) * var(--font-heading-scale));
  --size-h4: calc(min(1.5rem, 1.125rem + .5vw) * var(--font-heading-scale));
  --size-h5: calc(min(1.25rem, 1.0625rem + .25vw) * var(--font-heading-scale));
  --size-h6: calc(min(1.125rem, 1.03125rem + .125vw) * var(--font-heading-scale));
  --size-body: 1rem;
  --size-small: .875rem;
  --size-label: .8125rem;
  --size-caption: .75rem;
  --tracking-label: .12em;
  --tracking-button: .1em;
  --tracking-display: -.02em;

  /* Layout */
  --container-max: 1600px;
  --container-pad: 4rem;
  --space-section: clamp(3rem, 1.9231rem + 4.1026vw, 5rem);
  --space-block: .75rem;
  --space-section-header: 2.5rem;
  --header-height: 6rem;

  /* Shape */
  --radius-block: 4px;
  --radius-pill: 64px;
  --radius-input: 4px;
  --radius-circle: 9999px;
  --icon-stroke: 1.875px;

  /* Motion */
  --ease-out-expo: cubic-bezier(.165, .84, .44, 1);
  --ease-zoom: cubic-bezier(.34, .01, .04, .98);
  --duration-fast: 180ms;
  --duration-header: 350ms;
  --duration-zoom: 1000ms;
  --duration-reveal: 600ms;
}

@media (max-width: 1199px) {
  :root { --container-pad: 2rem; }
}

@media (max-width: 991px) {
  :root { --header-height: 5rem; }
}

@media (max-width: 767px) {
  :root { --container-pad: 1.25rem; --header-height: 4rem; }
}
```

**Why the font-family lines are removed.** The current `globals.css` declares `--font-display: Georgia, …` and `--font-ui: Arial, …` on `:root`. `next/font` sets the same two variables through a class on `<html>`. Both selectors have equal specificity, so whichever stylesheet loads last wins, and on the current build the Georgia/Arial fallbacks can override Cormorant and Manrope. Deleting the two lines from `:root` fixes it; the `font-family` declarations on `body` and `.hero-title` already fall back to Georgia and Arial after the variable.
