# Phase 01: Sensory Canvas & Typographic Architecture

[← Stage BETA-0.0.1](../stage-BETA-0.0.1.md) | [DevPlan Master](../../README.md)

**Status:** Planned — implementation not started.  
**Goal:** Establish Onéra's alabaster canvas and a readable editorial hierarchy in the application that will become the real website.

The confirmed application target is Next.js at `C:\Users\chris\Onéra`. Build the website it needs, using the [recorded decisions](../decisions-and-inputs.md). Implementation has not started.

## 1. Prerequisites and selected direction

Read [Phase 00: source baseline](../phase-00-consolidation.md), [decisions and inputs](../decisions-and-inputs.md), [content and assets](../content-and-assets.md), and [verification](../verification.md).

| Input or dependency | Planning state | Consequence |
| --- | --- | --- |
| Primary application | Next.js confirmed by user | Implement directly in the sole application. |
| Source baseline | Phase 00 planned | Inspect current components and record the starting revision before changing shared type and surfaces. |
| Canvas | User selected Alabaster `#F7F6F2` | Use it as the base paper token; review elevated and tinted surfaces against it. |
| Wordmark | Existing geometry is the baseline | Preserve glyphs, accent, tracking, and proportions; a redesign requires a separate recorded decision. |
| Atmospheric motion | User selected the full treatment | Coordinate typography and surface changes with Phase 03; keep content readable during and without animation. |
| Unverified facts | User selected omission | Typography must not introduce or promote unsupported garment or production claims. |
| True italic and numeric features | Exact font support needs inspection | Load the intended style and enable only supported features. |

Phase 01 supplies foundations for Phase 02 and Phase 03. Shared CSS changes need an agreed owner when those phases proceed in parallel.

## 2. Verified source baseline

The source review on October 24, 2026 found:

- `src/app/layout.tsx` applies `bg-white`, display and utility font variables, the skip link, header, footer, and application providers.
- `src/app/globals.css` contains the olive token and shared accessibility/reduced-motion styles; it does not currently define a paper color token.
- `src/app/fonts.ts` uses Cormorant Garamond and Manrope through `next/font/google`. The current Cormorant configuration does not explicitly request italic.
- `tailwind.config.ts` maps display type to `--font-display` and sans type to `--font-ui`.

Recheck the application source after Phase 00. Earlier screenshots and QA records describe an earlier revision and do not prove that new work has passed.

## 3. Target files and ownership

Paths in this table are relative to the application root, `C:\Users\chris\Onéra`.

| File | State at review | Planned responsibility |
| --- | --- | --- |
| `src/app/globals.css` | Existing | Semantic canvas tokens, editorial utilities, and shared surface rules. |
| `src/app/fonts.ts` | Existing | Correct normal/italic font loading and consistent variable names. |
| `src/app/layout.tsx` | Existing | Body canvas and font variables; preserve skip link and providers. |
| `tailwind.config.ts` | Existing | Token aliases only where needed; preserve the existing utility-font mapping. |
| `src/components/header.tsx`, `src/components/footer.tsx` | Existing; Phase 00 may revise | Shared shell styling and focus treatments. |
| `src/components/wordmark.tsx` | Existing | Inspection/protection of canonical mark; no automatic decorative changes. |
| `src/app/page.tsx` | Existing | Apply editorial hierarchy to the existing homepage content. |
| Collection and garment route components under `src/app/` | Existing | Apply matching hierarchy and canvas rules to dynamic pages. |
| `src/app/fonts/` | Proposed new directory, only if local loading is selected | Licensed local font files and their provenance. |
| `artifacts/beta-0.0.1/phase-01/` in the documentation workspace | Proposed evidence directory | Token map, font inspection, screenshots, and check results. |

Use the [wordmark specification](../../../../artifacts/wordmark/wordmark-spec.json) to protect the existing mark's geometry.

Use the application route components for the six existing URLs:

| URL | Existing application source |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/collections/` | `src/app/collections/page.tsx` |
| `/collections/the-gate-of-horn/` | `src/app/collections/[slug]/page.tsx` |
| Both `/garments/<slug>/` pages | `src/app/garments/[slug]/page.tsx` |
| `/philosophy/` | `src/app/philosophy/page.tsx` |

## 4. Work packages

| Package | Status | Required output |
| --- | --- | --- |
| 1.1 Canvas inventory and tokens | Planned | Alabaster token map and affected-surface inventory. |
| 1.2 Font styles and supported features | Planned; font inspection pending | Verified font loading and deliberate feature choices. |
| 1.3 Editorial hierarchy | Planned | Reusable styles applied to existing content. |
| 1.4 Route integration and handoff | Planned | Consistent application routes and evidence for later phases. |

### 1.1 Canvas inventory and tokens

1. Capture existing home, collection, garment, and philosophy surfaces before editing.
2. Inventory the body, sticky header, skip link, carousel metadata, gallery backdrops, dialogs, borders, and footer. Include hover, focus, selected, loading, and error states.
3. Define semantic ink, paper, elevated-paper, tinted-paper, and line tokens in authored application CSS. Set base paper to the selected `#F7F6F2`; preserve olive `#413E07` unless separately changed.
4. Select elevated and tinted values that remain distinguishable from paper. Record the actual values in the evidence rather than leaving contradictory white/alabaster rules.
5. Replace conflicting `bg-white` classes on intended paper surfaces. Keep reversed artwork and dark-surface text explicit; a search-and-replace of every white value would damage those treatments.
6. Apply tokens to the shared shell and interactive components. Preserve intentional photography colors and confirmed swatch colors.
7. Inspect the skip link against the header and main content. Keyboard focus must stay visible, and anchor targets must clear the sticky header.
8. Review forced-color/high-contrast behavior where supported, ensuring borders and controls do not depend on a subtle tint alone.

**Fallback:** If an elevated surface fails contrast or separation, use the base paper with a visible border and focus treatment. Do not hold the base canvas hostage to an optional decorative texture.

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
4. Confirm canvas continuity while scrolling and opening existing dialogs. Check focus rings on both paper and reversed surfaces.
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
