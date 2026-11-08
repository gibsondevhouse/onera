# Phase 01: Sensory Canvas & Typographic Architecture

[← Stage BETA-0.0.1](../stage-BETA-0.0.1.md) | [DevPlan Master](../../README.md)

**Status:** In progress — initial dark shell implemented; palette contrast and full-route coverage remain to be verified.

**Goal:** Establish Onéra's dark-only visual direction and a readable editorial hierarchy in the application that will become the real website.

The rebuilt Next.js app is at `website/` in this repository. Implement the confirmed dark-only direction there, using the [recorded decisions](../decisions-and-inputs.md).

## 1. Prerequisites and selected direction

Read [Phase 00: source baseline](../phase-00-consolidation.md), [decisions and inputs](../decisions-and-inputs.md), [content and assets](../content-and-assets.md), and [verification](../verification.md).

| Input or dependency | Planning state | Consequence |
| --- | --- | --- |
| Primary application | Next.js confirmed by user | Implement directly in the sole application. |
| Source baseline | Phase 00 in progress | The app has been scaffolded; finish the full content/route inventory and record its baseline before expanding shared surfaces. |
| Theme | User confirmed dark-only on November 8, 2026 | Build one dark visual system; do not add a theme toggle or system-preference switching. |
| Surface palette | Initial colors implemented; contrast review pending | Validate semantic background, text, elevated, muted, line, accent, and focus tokens before accepting them across routes. |
| Brand accent | Olive `#413E07` and existing wordmark remain confirmed | Retain olive where contrast and visual hierarchy support it; protect wordmark geometry and verify its treatment on the selected dark surface. |
| Wordmark | Existing geometry is the baseline | Preserve glyphs, accent, tracking, and proportions; a redesign requires a separate recorded decision. |
| Atmospheric motion | User selected the full treatment | Coordinate typography and surface changes with Phase 03; keep content readable during and without animation. |
| Storefront reference | Client selected Ziva Lagos as a layout reference | Use its announcement/masthead/editorial merchandising rhythm as structural inspiration only; do not copy its branding, assets, claims, or promotional content. Onéra's dark-only palette remains controlling. |
| Unverified facts | User selected omission | Typography must not introduce or promote unsupported garment or production claims. |
| True italic and numeric features | Exact font support needs inspection | Load the intended style and enable only supported features. |

Phase 01 supplies foundations for Phase 02 and Phase 03. Shared CSS changes need an agreed owner when those phases proceed in parallel.

## 2. Verified source baseline

The initial replacement-app review on November 8, 2026 found:

- `website/src/app/layout.tsx` provides metadata, a skip link, the shared header/footer, and Cormorant Garamond and Manrope through `next/font/google`.
- `website/src/app/globals.css` defines the dark-only palette and responsive shared surfaces. It does not contain a light-theme or `prefers-color-scheme` palette switch.
- The palette currently uses background `#14140F`, raised surfaces `#1D1C15` / `#252319`, text `#F7F6F2`, muted text `#C3C0B4`, line `#454336`, focus `#F1E9D9`, and olive `#413E07` for the primary action.
- The replacement uses Tailwind CSS 4's CSS-first setup; there is no `tailwind.config.ts`.
- The new app uses the supplied white vector wordmark. No original font files or garment photography survived in the repository.

Recheck the application source after Phase 00. Earlier screenshots and QA records describe an earlier revision and do not prove that new work has passed.

## 3. Target files and ownership

Paths in this table are relative to the application root, `website/`.

| File | State at review | Planned responsibility |
| --- | --- | --- |
| `website/src/app/globals.css` | Implemented; review pending | Semantic dark-theme tokens, editorial utilities, and shared surface rules. |
| `website/src/app/layout.tsx` | Implemented | Dark page background, fonts, skip link, shared shell, and metadata. |
| `website/src/components/site-header.tsx`, `site-footer.tsx` | Implemented | Shared shell navigation and footer. |
| `website/src/components/` | Existing wordmark asset only | Preserve the supplied vector mark in `website/public/brand/`; it replaces the unavailable source component. |
| `website/src/app/page.tsx` | Initial implementation | Editorial hero and house introduction; refine after viewport review. |
| `website/src/app/collections/`, `website/src/app/philosophy/` | Initial routes | Shared dark system; garment/detail route coverage remains open. |
| `website/src/app/fonts.ts` | Not created | Font configuration currently lives in `layout.tsx`; extract only if it improves the established structure. |
| `website/src/app/fonts/` | Proposed only if local font loading is selected | Licensed local font files and their provenance. |
| `artifacts/beta-0.0.1/phase-01/` in the documentation workspace | Proposed evidence directory | Token map, font inspection, screenshots, and check results. |

Use the [wordmark specification](../../../../artifacts/wordmark/wordmark-spec.json) to protect the existing mark's geometry.

Planned route coverage for the rebuilt application:

| URL | Current implementation |
| --- | --- |
| `/` | `src/app/page.tsx` — implemented |
| `/collections/` | `src/app/collections/page.tsx` — implemented; no collection/product records yet |
| `/collections/the-gate-of-horn/` | Not implemented; build only after the collection record and approved media are confirmed |
| Both `/garments/<slug>/` pages | Not implemented; build only after garment facts and approved imagery are available |
| `/philosophy/` | `src/app/philosophy/page.tsx` — initial route |

## 4. Work packages

| Package | Status | Required output |
| --- | --- | --- |
| 1.1 Surface inventory and tokens | In progress | Initial dark token map and shared shell; contrast results and remaining surfaces pending. |
| 1.2 Font styles and supported features | In progress | Cormorant Garamond / Manrope loaded; italic face and feature behavior need verification. |
| 1.3 Editorial hierarchy | In progress | Initial homepage and section hierarchy implemented. |
| 1.4 Route integration and handoff | Pending | Apply and verify across the completed application route set. |

### 1.1 Dark surface inventory and tokens

1. Capture existing home, collection, garment, and philosophy surfaces before editing.
2. Inventory the body, sticky header, skip link, carousel metadata, gallery backdrops, dialogs, borders, and footer. Include hover, focus, selected, loading, and error states.
3. Define semantic page-background, text, elevated-surface, muted-surface, line, accent, and focus tokens in authored application CSS. Initial values are listed above; validate their contrast before treating the palette as accepted.
4. Ensure elevated and muted surfaces remain distinguishable without creating a light-theme surface. Record all values and contrast evidence; retain white only where needed for text, controls, or the wordmark.
5. Replace conflicting `bg-white` and light-paper classes on visitor-facing interface surfaces. Preserve intentional photography colors and confirmed swatch colors.
6. Apply tokens consistently to the shared shell and interactive components. Do not implement a theme toggle or `prefers-color-scheme` palette switch.
7. Inspect the skip link against the header and main content. Keyboard focus must stay visible, and anchor targets must clear the sticky header.
8. Review text, icon, control, border, and focus contrast on every dark surface, including hover, focus, selected, disabled, loading, and error states. Review forced-color/high-contrast behavior where supported.

**Fallback:** If an elevated surface fails contrast or separation, use the page background with a visible border and focus treatment. Do not hold the base palette hostage to optional decorative texture.

### 1.2 Font loading and supported OpenType features

1. Inspect actual resolved font families, styles, weights, variables, and loading order after Phase 00. Record a representative heading and utility label.
2. Preserve wordmark glyphs, accent, spacing, and proportions from its existing component/specification. Do not apply discretionary ligatures or swashes to the wordmark automatically.
3. Configure the display loader to include the selected normal and true italic styles with the weights actually used. If local files are preferred, record their source/license and use an appropriate `next/font/local` configuration.
4. Verify build-time font acquisition and runtime local serving. If external build access is unreliable, record a licensed local-file dependency rather than quietly accepting a different font.
5. Confirm italic text resolves to the intended italic face rather than synthetic slant. Inspect accented characters and punctuation as well as an English specimen.
6. Keep `--font-ui` as the intentional utility-font source and verify that shared utilities resolve to it consistently.
7. Inspect feature support in the exact selected files before enabling `liga`, `dlig`, `onum`, or `pnum`. A CSS declaration alone does not prove a glyph substitution occurred.
8. Scope optional features to selected editorial text. Keep quantities, sizes, units, dates, and navigation unambiguous rather than styling every number decoratively.
9. Where oldstyle figures are used, check carousel card numbers, active counters, and garment photo counters. Choose a supporting font deliberately instead of assuming Manrope provides the feature.
10. Check `Onéra`, `01 / 03`, long collection names, and punctuation after fonts load and with a font request blocked. Reserve enough space to avoid clipping or disruptive movement.

**Fallback:** Without a verified italic file, retain upright display text. Without a supported numeric feature, retain default figures. Record accepted fallbacks separately from incomplete typography work.

### 1.3 Editorial hierarchy and application

Create three narrowly scoped, reusable treatments in authored application styles:

| Treatment | Intended use | Constraints |
| --- | --- | --- |
| Editorial deck | Existing collection subtitle and selected introductions | Readable line length; true italic only when available; no forced uppercase. |
| Eyebrow | Existing chapter, collection, and section labels | Utility type; sufficient contrast; readable at narrow widths and zoom. |
| Pullquote | Existing quotation or statement where a distinct tier helps | Preserve original words and attribution; natural wrapping without fixed height. |

1. Define each treatment's font family, weight, fluid size, line height, spacing, and tokenized color.
2. Begin with the homepage's existing collection subtitle, comparing it with the heading and surrounding copy at narrow and wide viewports.
3. Apply the hierarchy to collection and garment introductions only where the content has the same role. Do not add empty sections just to use a class.
4. Preserve semantic heading order. A visual eyebrow is not automatically a heading; a pullquote does not replace the page heading.
5. Keep material units, sizes, measurements, and controls in readable utility typography. Phase 02 supplies their factual content rules.
6. Test long names, browser zoom, text enlargement, and missing fonts. Adjust intrinsic layout rather than truncating content.
7. Check visible copy against the content register; omit unconfirmed factual claims rather than promoting inherited demo text as product truth.

**Fallback:** Where a new tier reduces readability or competes with the wordmark, retain the simpler treatment and document the exception.

### 1.4 Route integration and handoff

1. Apply shared changes through application components.
2. Verify the six existing routes and any additional changed routes against the application's actual route inventory.
3. Check active navigation, breadcrumbs, skip-link destination, and focus styling after header metrics or type sizes change.
4. Confirm dark-surface continuity while scrolling and opening existing dialogs. Check focus rings on every surface treatment.
5. Review the shared viewport matrix in [verification](../verification.md), including the `767px`/`768px` breakpoint boundary where relevant.
6. Save the selected token/font map and shared-file ownership notes for Phase 02 and Phase 03.
7. Inspect motion-disabled rendering even though full motion is selected: text and page structure must remain readable without reveals or custom cursor effects.

## 5. Acceptance and evidence

- [ ] The Next.js source revision and Phase 00 baseline are recorded.
- [ ] Intended paper surfaces use Alabaster `#F7F6F2`; elevated/tinted exceptions are documented.
- [ ] The wordmark's accent, spacing, and geometry are preserved.
- [ ] True italic is backed by the intended loaded face, or an accepted upright fallback is recorded.
- [ ] Enabled numeric/discretionary features are supported and visibly verified.
- [ ] Shared typography resolves to the intended display and utility font variables.
- [ ] Text stays legible with missing fonts, long content, browser zoom, and reduced motion.
- [ ] Routes retain correct navigation, breadcrumbs, skip links, and shared components.
- [ ] No changed route has horizontal overflow, clipped text, broken font URLs, or new console errors.
- [ ] `npm run typecheck` and `npm run build` pass from the application checkout.
- [ ] Browser checks cover the changed application's built runtime, including its actual font requests and responsive typography.

Deliver a changed-file list, selected token values, font source/license record, feature-support result, before/after screenshots, applicable check output, and accepted fallbacks or pending inputs. Use [verification](../verification.md) for evidence format and the completion gate.

## 6. Runtime and delivery handoff

Verify the built application through its runtime, including production-mode font loading, route navigation, and hydration. Save the revision and environment alongside browser evidence.

Delivery follows the application's needs under D06. Evaluate hosting and sharing compatibility when selecting the deployment route; that evaluation does not block core typography work or require another application.
