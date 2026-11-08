# Phase 02: Haute PDP & Fabric Haptics

[← Stage BETA-0.0.1](../stage-BETA-0.0.1.md) | [DevPlan Master](../../README.md)

**Status:** Planned — implementation not started.  
**Goal:** Make garment pages easier to inspect and understand through clear material, construction, fit, and photography information supported by real inputs.

The rebuilt Next.js application is in `website/`. Build the garment experience there using the [recorded decisions](../decisions-and-inputs.md).

## 1. Prerequisites and selected direction

Read [Phase 00: source baseline](../phase-00-consolidation.md), [Phase 01](../phase-01-sensory-canvas-typography/README.md), [content and assets](../content-and-assets.md), and [verification](../verification.md).

| Input or dependency | Planning state | Consequence |
| --- | --- | --- |
| Primary application | Next.js confirmed by user | Implement directly in the sole application. |
| Phase 00 source baseline | In progress | The replacement app currently has no garment pages, content layer, or commerce implementation. |
| Phase 01 foundations | In progress | Use the approved dark-theme/type tokens and coordinate shared styles. |
| Unconfirmed factual claims | User selected omission until real details arrive | Do not display invented specifications, placeholder facts, or unsupported sizing advice. |
| Material and fit facts | Per-garment inputs pending | Optional information sections may remain absent while the interaction work progresses. |
| Macro/interior photography | Approved files pending | Keep honest original/crop labels; no simulated photographic claims. |
| Hospitality flow | User selected a complete demo with nothing sent | Keep that demo boundary distinct from product facts; unsupported color/size choices stay in isolated development fixtures. |

This phase can deliver the approved interaction scope with sparse factual content. It cannot claim a real macro/inside-out showcase is complete without appropriate approved assets.

## 2. Replacement-app baseline

The previous app source and its imagery were lost. The replacement currently has only the home, collections, and philosophy routes; it has no garment data/content layer, gallery, or commerce implementation. The names Nyx Overcoat and Hypnos Dress appear in planning documents only and do not establish current availability or product facts. No garment photographs are in the new app. Reconfirm both garments and acquire approved content/assets before rendering product cards or detail pages.

## 3. Target files and ownership

Application paths below are relative to `website/`.

| File | State at review | Planned responsibility |
| --- | --- | --- |
| `src/app/garments/[slug]/page.tsx` | Planned | Render per-garment verified information and the gallery after content inputs exist. |
| `src/lib/types.ts` | Planned | Optional structured editorial facts and image-view metadata. |
| `src/lib/content.ts` | Planned | Content projection, types, normalization, and safe defaults if a CMS/source is selected. |
| `src/lib/demo.ts` | Not implemented | Avoid adding mock product facts to public content; fixtures, if needed, stay isolated in tests. |
| `sanity/schemaTypes/garment.ts` | Not implemented | Consider authoring fields only after source/CMS requirements are confirmed. |
| `src/components/editorial-image.tsx` | Planned | Optimized, accessible image loading and aspect reservation when approved imagery is supplied. |
| `src/components/product-purchase.tsx` | Not implemented | Do not activate commerce or variant behavior without a separate approved scope. |
| `src/components/garment-gallery.tsx` | Proposed new component | Accessible React gallery/viewer; reuse suitable existing application primitives. |
| `src/components/garment-size-guide.tsx` | Proposed new component, conditional on confirmed size information | Accessible guide with isolated development fixtures while facts are unavailable. |
| `src/components/garment-specifications.tsx` | Proposed new component | Server-rendered optional confirmed facts, if a separate component improves reuse. |
| `public/images/garments/<slug>/` | Proposed new asset directory | Approved macro/interior images only when supplied and recorded. |
| Relevant content and browser checks under `tests/` | Not configured | Add focused checks with the first gallery/data implementation. |
| `artifacts/beta-0.0.1/phase-02/` in the documentation workspace | Proposed evidence directory | Content audit, media manifest, screenshots, and results. |

Keep interaction state and lifecycle in React components; preserve server-rendered information and image-loading behavior.

## 4. Work packages

| Package | Status | Required output |
| --- | --- | --- |
| 2.1 Information contract and content audit | Planned; factual inputs pending | Per-garment source/state inventory and omission behavior. |
| 2.2 Material and construction panels | Planned | Semantic optional sections using confirmed content. |
| 2.3 Gallery and truthful zoom | Planned; replacement media pending | Accurate captions and robust inspection controls. |
| 2.4 Fit and selection guidance | Planned; measurement inputs pending | Fit information without invented dimensions or advice. |
| 2.5 Swatches and integration QA | Planned | Accessible confirmed choices, with unsupported options exercised only in development fixtures. |

### 2.1 Information contract and content audit

Record proposed fields separately for each garment in [content and assets](../content-and-assets.md).

| Field group | Record | Visible UI rule |
| --- | --- | --- |
| Material | Composition, lining, textile weight and units | Show confirmed facts only; distinguish technical composition from editorial description. |
| Provenance | Mill/location and supporting source | Omit unknown origin; do not substitute a plausible luxury reference. |
| Construction | Seams, structure, fastening and hardware | Require garment-specific confirmation. |
| Fit | Silhouette/ease, measured size, model information and garment dimensions | Distinguish body measurements from finished-garment measurements. |
| Photography | Garment association, view kind, dimensions, crop status and usage rights | Captions and alt text describe the supplied image. |

1. Give each fact a state: `confirmed`, `unknown`, or `development-fixture`. Record its source separately: inherited demo, supplied specification, approved image record, or another named source.
2. Record who confirmed a fact and when. Inherited demo copy remains unconfirmed until a real source confirms it; an image cannot establish invisible fiber composition or textile weight.
3. Show only `confirmed` facts in product-information sections. Keep `unknown` records internal and `development-fixture` records isolated from visitor content; do not show placeholder numbers or visible pending-value panels.
4. Audit descriptions, material notes, image alt text, size-guide content, and captions for inherited factual claims. Remove or rewrite unconfirmed claims without replacing them with equally unsupported copy.
5. Resolve conflicting sources explicitly. Do not change Nyx's existing silk-lining claim to cupro or assert a GSM value, Italian mill, horn button, or hand-finished seam without confirmation.
6. Extend types, raw data, projections, and normalization together. New fields stay optional so older content remains usable; missing optional facts produce omitted UI, not a failed whole-page render.
7. Keep source/confirmation records internal where they are not customer-facing content. Pass only necessary image/interaction data to client components.
8. Add targeted checks for `confirmed`/`unknown`/`development-fixture` visibility and missing optional fields if new normalization logic is introduced.

**Fallback:** A page with no extra technical table is valid. Unconfirmed facts remain omitted until supplied; no fabricated example specifications are needed to exercise the layout.

### 2.2 Material and construction panels

1. Add an optional `Atelier notes` or equivalent section after the description when at least one confirmed fact exists.
2. Use a semantic `<dl>` for label/value pairs. Group terms with their descriptions and use a clear heading for each section.
3. Render each garment's own facts. Do not copy coat construction or fit guidance onto the dress.
4. On wide layouts, align values without forcing long provenance into a narrow column. At narrow widths, stack rows and allow natural wrapping.
5. Use Phase 01's dark-theme/type tokens. Preserve readable units and punctuation rather than presenting technical paragraphs in tiny uppercase text.
6. Add construction text and an associated image only when both support the same claim. A generic fabric study does not prove the garment's interior structure.
7. Suppress empty headings, separators, and drawers when all their content is omitted.
8. Leave purchase/archive eligibility controls intact. This package does not enable commerce or convert demo selectors into real product options.

**Fallback:** Present the garment name, approved editorial copy, and available imagery without a specifications panel. Sparse content is a supported state.

### 2.3 Gallery, detail views, and truthful zoom

1. Inventory the existing gallery images and planned captions, including any deliberate reuse of a source as a full view and a labeled crop.
2. Register new media before integration: garment slug, source file, dimensions, rights, view kind, alt text, and approved caption.
3. Add approved files through the application's image pipeline. Preserve intrinsic/aspect space, responsive `sizes`, lead-image priority, and lazy loading for later views.
4. Keep a readable server-rendered image sequence and first usable garment image. Optional media failure must not make the page unusable.
5. Keep crops labeled `Detail crop · Same original photograph` until a distinct approved image replaces them. Review thumbnail, main-view, and dialog metadata together.
6. Use exterior, fabric-study, interior, or label-view names only when they match the supplied image. Do not generate a supposed photographic proof of real craftsmanship.
7. Define zoom labels before coding. `Fit` means fit to the viewport; a percentage must state whether it is relative to fit or source pixels.
8. If source-pixel `100%` mode is offered, derive it from natural dimensions and document the display convention. Do not call digital enlargement `optical detail` or imply physical 1:1 fabric scale without calibration.
9. Retain explicit zoom and close buttons, accessible previous/next controls, Escape dismissal, and predictable focus restoration. Reset pan/zoom when changing images.
10. Ensure keyboard users can scroll a zoomed image. Test that touch panning does not accidentally switch photos, while an unzoomed gallery does not trap normal page scrolling.
11. Prefer ordinary labeled view buttons. If tabs are selected, implement their roles, selected state, keyboard behavior, and associated panels together.
12. Clean up event listeners, timers, scroll locks, and motion state on close/unmount. Check reopening and navigation away from an open viewer.

**Fallback:** Use available full-view images and any accurately labeled crops with ordinary enlargement. Missing macro/interior photographs remain tracked inputs, not simulated completed features.

### 2.4 Fit, proportion, and size guidance

1. Place confirmed fit guidance near the selection area, using a clear heading and concise prose.
2. Store model height, displayed size, garment dimensions, and measurement method separately. Show units and the size to which each measurement applies.
3. Require confirmation before advising normal size, sizing up, or sizing down. A silhouette description alone does not determine fit.
4. Omit unknown model measurements and garment dimensions completely. Do not add invented values to demonstrate the panel.
5. Omit unsupported color/size choices from the visitor interface until actual options and any variant mapping are confirmed. Exercise selection behavior through isolated development fixtures rather than presenting fictional availability.
6. Audit the size guide alongside the page. Its title, table, and selected-size display must agree with confirmed content; an unsupported guide stays out of the visitor interface.
7. Development fixtures may carry a sample selection into a local test summary with an explicit nothing-sent notice. They must not initiate a real request, reserve stock, or call a purchase action.

**Fallback:** Omit unsupported fit information and product choices from the visitor interface. Retain isolated fixtures to verify the implemented controls until confirmed inputs arrive.

### 2.5 Swatches and integrated behavior

1. Preserve textual option names and selected-state semantics. A textured chip cannot be the only indication of a choice.
2. Treat decorative chip patterns as decoration, not a fabric sample or weave specification. Unknown options belong only in isolated development fixtures.
3. Use real swatch photography only after its garment/color association and usage are confirmed. Explain when choosing a sample color leaves the original garment photography unchanged.
4. Implement keyboard arrow, Home, and End behavior appropriate to the selection pattern, plus visible focus and accessible announcements.
5. Keep sample-selection state separate from real Shopify variant IDs and existing commerce state. Do not connect services as part of this beta interaction work.
6. Check target size, touch behavior, contrast, and focus at the shared viewport matrix. Coordinate smooth scrolling and cursor behavior with Phase 03.
7. Revisit both garments after each shared gallery change, including sparse-information and additional-approved-media states.

## 5. Acceptance and evidence

- [ ] The Next.js source baseline and gallery/component paths are recorded.
- [ ] Every displayed garment fact is `confirmed` and sourced; `unknown` and `development-fixture` facts are absent from visitor content.
- [ ] Inherited description, material, caption, alt-text, and size-guide claims have been audited.
- [ ] Nyx and Hypnos have independent content; no coat facts appear on the dress.
- [ ] Empty information sections disappear cleanly without blank labels or separators.
- [ ] Captions distinguish originals, crops, generic studies, and approved garment-specific detail images.
- [ ] Any macro/interior view is supported by its actual approved asset and usage record.
- [ ] Zoom labels match implemented calculations; keyboard and touch inspection remain usable.
- [ ] Dialog opening, Escape, close, focus restoration, image switching, zoom reset, and cleanup pass browser checks.
- [ ] Server-rendered information and useful imagery remain available without interaction JavaScript; optional-image failure is handled.
- [ ] Unsupported color/size choices remain in isolated development fixtures; confirmed visitor choices are accessible and accurately represented.
- [ ] Both garment pages pass shared responsive checks without overflow or clipped values.
- [ ] Application typecheck/build and relevant existing or targeted checks pass; browser evidence covers the changed revision.

Deliver the per-garment content-state inventory, approved-media manifest, changed-file list, screenshots of both pages/viewer states, applicable check output, and interaction results with untested touch behavior stated. Use [verification](../verification.md) for evidence format. Separate accepted sparse-content fallbacks from asset-dependent features still pending.

## 6. Application integration and runtime verification

Run `npm --prefix website run typecheck`, `npm --prefix website run lint`, and `npm --prefix website run build`. Add focused content/interaction checks with this work; no test suite was recovered. Check the built runtime on an available port, covering route rendering, image loading, navigation, and dialog cleanup.

If a CMS or optional fields are added, check schema/build behavior and records without those fields. This does not connect a CMS, publish content, enable Shopify, or authorize checkout; the replacement app has no commerce integration or inherited tests.

Delivery follows the application's needs under D06. Evaluate hosting and sharing compatibility during deployment planning; core garment-interface development does not depend on a static export or a second application.
