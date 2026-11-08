# 10. Project Status

[← Design Assets](09-design-assets.md) | [Start Here](01-START-HERE.md)

---

**A living snapshot of where the brand identity and development projects are.**

This snapshot records what is locked into code and assets versus what remains open on the brand identity side.

---

## Development Status & Codebase Snapshot

### Rebuilt Website (`website/`)

The previous Next.js source was lost when the user's ChatGPT account was deactivated. The client chose to start again, and the replacement app is being developed in this repository's `website/` directory. The old static preview and its QA records are historical; they do not represent the rebuilt site.

* **Stack:** Next.js 16.4.5, React 19.3, TypeScript 5, and Tailwind CSS 4.
* **Current routes:** `/`, `/collections`, and `/philosophy`. Product and collection-detail pages are not yet implemented; no verified garment records or garment photography survived.
* **Visual direction:** Dark-only site, olive `#413E07`, and the supplied wordmark. The client selected Ziva Lagos as a high-level storefront-layout reference; its copy, photography, products, branding, and promotional offer are not reused.
* **Current checks:** Type-check, lint, production build, and HTTP smoke checks for the three routes passed on November 8, 2026. Responsive and interaction acceptance remains in progress.

---

## Phase 1: Explore & Articulate (Brand Identity)

### Part 1: Your Aesthetic
- [ ] Answered: Core feeling (3 words)
- [ ] Answered: Emotional feeling of wearing Onéra
- [ ] Answered: Your signature / what's instantly recognizable
- [ ] Answered: Essential materials/textures
- [ ] Answered: Simplicity vs. complexity approach
- [ ] Answered: Fabrics and fibers you use
- [ ] Answered: Signature construction/seaming techniques
- [ ] Answered: What you never want to do

**Status:** ☐ Not started | ☒ In progress | ☐ Complete

---

### Part 2: Your Customer
- [ ] Answered: Who she is (specific details)
- [ ] Answered: Picture her on a Tuesday
- [ ] Answered: What she values about how she dresses
- [ ] Answered: The problem Onéra solves for her

**Status:** ☐ Not started | ☒ In progress | ☐ Complete

---

### Part 3: Your Story
- [ ] Answered: Why Onéra exists (the belief)
- [ ] Answered: What inspired the name
- [ ] Answered: What makes Onéra different
- [ ] Answered: Your distinctive gift as a designer

**Status:** ☐ Not started | ☒ In progress | ☐ Complete

---

## Phase 2: Synthesize & Document

### Foundation Document
- [ ] Aesthetic vision documented (Awaiting final brand confirmation)
- [ ] Customer profile documented (Awaiting final brand confirmation)
- [ ] Origin story documented (Awaiting final brand confirmation)
- [ ] Brand promise articulated (Awaiting final brand confirmation)

**Status:** ☐ Not started | ☒ In progress | ☐ Complete

---

### Visual Identity (Development Observations)

#### Color
- [x] Core palette defined in code: Olive `#413E07` & White `#FFFFFF`
- [x] Secondary palette matrix tested across 9 color combinations ([logo-display-spec.json](../../artifacts/logo-display/logo-display-spec.json))
- [ ] How colors translate to physical fabrics decided by brand team
- [ ] Pantone matching swatches confirmed for print/dye

#### Typography
- [x] Display typeface active in code: **Cormorant Garamond** (Light, weight `300`, `letter-spacing: .12em`)
- [x] Utility/body typeface active in code: **Manrope** (weights `400` and `500`)
- [x] Local WOFF2 font files installed and optimized in `_next/static/media/`
- [ ] Commercial print licenses documented

#### Photography & Art Direction
- [x] Photography direction established in live preview (pale limestone courtyard, natural soft directional light, texture detail studies)
- [x] High-resolution WebP image variants generated (from 256px to 3840px widths)
- [ ] Formal photographer brief written for next collection

#### Layout & Applications
- [x] Asymmetric editorial grid and responsive spacing established in [dist/assets/site.css](../../web-app-onera/dist/assets/site.css)
- [x] Interactive components built (carousel, gallery zoom viewer, size dialog)
- [ ] Garment physical tag/label artwork created

**Status:** ☐ Not started | ☒ In progress | ☐ Complete

---

### Brand Voice & Messaging
- [ ] Voice adjectives finalized by brand team
- [ ] Final brand narrative approved
- [x] Development copy currently live in preview:
  - Header: *"An independent fashion house"*
  - Vision: *"Dreams given form. A study in feeling."*
  - Closing: *"The imagined. Made tangible."*
  - Philosophy: *"A dream requires imagination. A garment requires precision."*
  - Collection: *"The Gate of Horn"* (Autumn / Winter 26)
  - Garments: *Nyx Overcoat* and *Hypnos Dress*

**Status:** ☐ Not started | ☒ In progress | ☐ Complete

---

## Phase 3: Build & Implement

### Design Assets (Observed Artifacts)

- [x] Wordmark files organized: [onera-wordmark.svg](../artifacts/wordmark/onera-wordmark.svg), [onera-wordmark-white.svg](../artifacts/wordmark/onera-wordmark-white.svg), PNG variants
- [x] Wordmark vector specification recorded: [wordmark-spec.json](../../artifacts/wordmark/wordmark-spec.json)
- [x] 9-panel color proof generated: [onera-logo-display-3x3.png](../artifacts/logo-display/onera-logo-display-3x3.png)
- [x] Color specification recorded: [logo-display-spec.json](../../artifacts/logo-display/logo-display-spec.json)
- [x] Wordmark render & export scripts active: [export-wordmark.py](../../artifacts/wordmark/export-wordmark.py), [render-wordmark.mjs](../../artifacts/wordmark/render-wordmark.mjs)

**Deliverables in progress / planned:**
- [ ] Physical garment label print-ready artwork (CMYK / vector)
- [ ] Packaging templates (boxes, tissue paper, shipping stationery)
- [ ] Social media visual templates (Instagram feed & story assets)
- [ ] Commercial lookbook layout

**Status:** ☐ Not started | ☒ In progress | ☐ Complete

---

### Design Decisions Logged

1. **B-001 (2026-10-24):** Centralized brand documentation inside `docs/brand-identity/`.
2. **DEV-001 (2026-10-12):** Standalone interactive design preview running locally on port 3002 without external dependencies.
3. **DEV-002 (2026-10-18):** Micro-templating system for shared header and footer using Node synchronization.
4. **DEV-003 (2026-10-18):** Vector SVG wordmark specified with exact glyph advances to prevent layout shifting.
5. **DEV-004 (2026-10-18):** WAI-ARIA accessible gallery, swatch keyboard navigation, and modal focus restoration.

---

## Quick Reference: What's Locked In?

| Topic | Development / Codebase Reality | Status |
| --- | --- | --- |
| **Wordmark** | Cormorant Garamond Light, 0.12em tracking, vector SVG bounds `[0, 0, 3006.57, 871.0]` | ☑ Locked in code |
| **Core Color** | Olive `#413E07` & White `#FFFFFF` applied across preview stylesheets | ☑ Locked in code |
| **Typography** | Cormorant Garamond (display) + Manrope (utility/body) | ☑ Locked in code |
| **Preview Site** | 6 routes live on port 3002, responsive down to 320px | ☑ Functional |
| **Initial Looks** | Nyx Overcoat (Look 01) & Hypnos Dress (Look 02) | ☑ Implemented |
| **Brand Aesthetic Details** | Tactile feeling, seaming signature, fabric selections | ☐ Open for brand team |
| **Customer Persona** | Lived details, lifestyle values, problems solved | ☐ Open for brand team |
| **Brand Story & Origin** | Final corporate narrative and voice guide | ☐ Open for brand team |
| **Physical Production** | Garment labels, hang tags, packaging specs | ☐ Pending supplier |
| **Commerce & CMS** | Sanity CMS and Shopify checkout integration | ☐ Not connected in preview |

---

[← Design Assets](09-design-assets.md) | [Start Here](01-START-HERE.md)
