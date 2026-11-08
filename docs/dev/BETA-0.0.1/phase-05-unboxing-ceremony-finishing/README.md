# Phase 05: Packaging, Care & Release Verification

[← Stage BETA-0.0.1](../stage-BETA-0.0.1.md) · [Decisions & inputs](../decisions-and-inputs.md) · [Content & assets](../content-and-assets.md) · [Verification](../verification.md)

**Status:** Planned — implementation not started.  
**Goal:** Add packaging and care content only when supported, then verify the complete Next.js experience across routes and interaction modes.

## 1. Scope and entry gates

Phase 05 follows [Phase 00 application baseline](../phase-00-consolidation.md) and Phases 01–04. The user confirmed Next.js as the sole application. Verify the website built in that application, with no required preview migration or second implementation.

| Dependency | Required input |
| --- | --- |
| D01 — website foundation | Next.js is the sole application, confirmed by the user |
| D02 — unconfirmed content | Omit until the real details are supplied |
| D03 — form workflow | Verify “Demo complete. Nothing was sent.” with no sending or persistence |
| D04 / D05 | Alabaster palette and full atmospheric motion, including accessible fallbacks |
| D06 — delivery | Choose a compatible runtime for the application's needs; no required static export or second app |
| Phases 01–03 | Agreed tokens, garment layout, image behavior, motion and reduced-motion rules |
| Phase 04 | Shared demo inquiry states and any in-scope selection / checkout presentation |
| Content & asset register | Confirmation status of packaging artwork and garment-specific care information |

Do not resolve a missing input by inventing a product specification, service benefit or asset. Omit unavailable sections from the rendered website and track their missing inputs in the register.

## 2. Existing and proposed file map

The active implementation root is `C:\Users\chris\Onéra`. Read its `AGENTS.md` and current framework guidance before implementation. These paths are relative to that checkout.

| Existing Next.js source | Responsibility |
| --- | --- |
| `src/app/garments/[slug]/page.tsx` | Per-garment packaging placement and care rendering |
| `src/app/philosophy/page.tsx` | Optional brand-level packaging story once factual content exists |
| `src/lib/types.ts`, `src/lib/content.ts` and `src/lib/demo.ts` | Inspect the current content contract, mapping and fallback data before extending it |
| `src/components/motion-provider.tsx` | Global motion and overlay coordination to recheck |
| `src/components/cart-drawer.tsx`, `product-purchase.tsx` | Existing optional commerce presentation to verify if changed |
| `package.json` and `tests/` | Current build, type, unit and browser checks |

Proposed components, if supported content becomes available: `src/components/packaging-story.tsx` and `src/components/garment-care.tsx`. Proposed artwork location: `public/images/packaging-ceremony.webp`. These names do not mean that files or approved artwork already exist. Confirm the repository's current image and content conventions before creating them.

Historical preview artifacts are optional design evidence only. The Next.js application and its current rendered routes own the implementation and verification record.

## 3. Work package 5.1 — Packaging facts and asset readiness

The current brand checklist leaves packaging artwork and supplier specifications open. Until actual packaging information is supplied, the website must omit this module rather than show a fictional unboxing story.

Record these inputs in [Content & assets](../content-and-assets.md):

1. What packaging is available or approved, and whether it differs by garment or destination.
2. Which material, inclusion or provenance descriptions have a reliable source.
3. Which image or artwork can be used, who owns its rights, and whether it depicts the approved packaging.
4. Whether any related policy or service statement has approved wording and an existing destination.
5. Whether the content applies to both garment pages, one garment, the philosophy route or another defined placement.

Apply D02 consistently:

- Missing facts: omit the whole unsupported section from the rendered website.
- Facts supplied but no usable image: use a text-only treatment only if the confirmed copy is meaningful by itself; otherwise omit the module until the asset arrives.
- Image supplied but facts unconfirmed: retain the asset in the register without publishing an unsupported story.
- Facts and image approved: implement the module using only the confirmed content and relevant garment scope.

Do not render “coming soon” service claims, concept packaging or placeholder benefits as a substitute for the missing details. An intentional omission is an acceptable phase outcome when it follows D02 and is recorded.

Deliverable: packaging content status, fact sources, asset source, placement and implementation / omission decision.

## 4. Work package 5.2 — Conditional packaging module

Implement only when Work package 5.1 has approved content.

- Use a meaningful section heading and an editorial image / copy layout that stacks on narrow screens. Follow Phase 01's Alabaster and Olive tokens.
- Reserve image space using the actual dimensions or an appropriate aspect ratio. Prevent avoidable movement as media loads.
- Use responsive image sizing and the application's established image pipeline. Lazy-load below-the-fold artwork while keeping the primary garment image appropriately prioritized.
- Write alt text for the asset actually supplied. Do not infer material, certifications or inclusions from the visual appearance alone.
- If the image fails to load, preserve approved text and a coherent layout, or omit the media frame. Avoid a broken image icon or a large empty block.
- Link only to policy pages that actually exist. Do not add destinations or benefits merely to fill the layout.
- Render one shared component with explicit content props when the module appears on multiple routes. Keep garment-specific differences in data.
- Do not render an empty heading, broken source path or placeholder image when content is absent.

Deliverable: a verified module when content exists, or no public-facing module when it does not. Both outcomes must be documented so later work does not accidentally reintroduce unsupported placeholders.

## 5. Work package 5.3 — Garment-specific care content

Existing development content identifies Nyx as double-faced wool with silk lining and Hypnos as ivory silk. These descriptions do not establish complete composition, finishes or cleaning instructions.

| Garment | Current development description | Needed before publishing care instructions |
| --- | --- | --- |
| Nyx Overcoat | Double faced wool · silk lining | Confirmed composition, construction limits, care label and approved storage guidance |
| Hypnos Dress | Ivory silk | Confirmed composition / finish, care label and approved storage guidance |

1. Obtain the actual garment care label or approved technical guidance for each piece. Record its source and confirmation status.
2. Store care content per garment. Inspect current types, content mapping and CMS schema before adding fields.
3. Define missing-content behavior: absent or unapproved care data renders no care disclosure. It must not fall back to another garment's instructions.
4. Do not infer a cleaning method from a fiber name. A wool example cannot be reused for the silk dress.
5. Include only approved aftercare policies; omit unsupported claims about provided accessories or services.
6. Add meaningful validation for any new care-data shape and its empty state. Do not create a CMS publishing dependency if the current phase can safely omit absent content.

Deliverable: each garment has its own supported instructions or an intentional omission. A shared component renders that data without erasing garment-specific differences.

## 6. Work package 5.4 — Care disclosure interaction

When care content is available, use a native `<details>` / `<summary>` disclosure for short supporting information unless a full drawer is selected for a specific reason.

Acceptance behavior:

- The summary has an understandable name such as “Care information” and visible keyboard focus.
- Enter / Space and pointer activation toggle it. The expansion indicator matches the open state and is decorative to assistive technology.
- Expanded content follows the summary in a logical reading order. Text remains selectable and readable.
- Opening the disclosure causes expected document reflow. Do not demand zero movement while revealing text; prevent avoidable image and font loading shifts separately.
- A transition respects reduced motion and never clips text at enlarged font sizes or with variable content lengths.
- Opening or closing care information preserves garment selection and does not interfere with the viewer or demo inquiry.
- When care data is absent, render neither an empty summary nor an inoperative button.

If a drawer is selected, include Phase 04's full dialog focus, Escape, close, scroll and restoration behavior. Record why a modal is warranted and include it in overlay regression checks.

Deliverable: keyboard and touch-friendly access to available care information, with no clipped or unsupported content.

## 7. Work package 5.5 — Responsive and interaction verification

Use the complete [verification plan](../verification.md). Capture a baseline before Phase 05 changes so earlier regressions can be distinguished from new packaging or care defects.

Inspect `320px`, `375px`, `767px`, `768px`, `1024px` and `1440px` widths. The adjacent 767 / 768 checks cover the inherited breakpoint. Include both garment pages and every shared navigation / footer route.

| Area | Required checks |
| --- | --- |
| Layout | No unintended horizontal overflow; readable text, image proportions and usable controls |
| Viewport height | Long dialog content and close / submit controls reachable on short screens and with a software keyboard |
| Safe areas | Insets on affected fixed or edge-attached UI; verify top / bottom content rather than padding every element |
| Zoom and text | Reflow, focus visibility and no clipped labels at enlarged text and browser zoom |
| Colors | Actual text, links, focus and controls against their rendered surfaces, including opacity and states |
| Motion | Full atmospheric behavior plus reduced motion, native fallback, visible content and usable keyboard navigation |
| Media | Slow load, missing-media fallback, reserved space, correct image / garment mapping |
| Overlays | Viewer, size guide, demo inquiry and any in-scope cart: open, dismiss, scroll, return focus and repeat use |
| Demo forms | Invalid input, preview result, edit-again, no transmission and clear-on-close behavior |
| Missing content | Packaging and care remain omitted when unsupported; no broken assets or empty disclosures |

Use physical devices where available for touch, browser chrome, safe areas and software keyboard behavior. Label emulation as emulation; record physical-device checks as untested when not performed.

Deliverable: route / viewport / interaction results, evidence and limitations. A general “cross-device passed” statement does not replace this record.

## 8. Work package 5.6 — Discovered asset coverage and route parity

A saved file inventory alone cannot discover every new image, script or stylesheet reference, evaluate React behavior or prove responsive layout. Use current browser evidence from the Next.js application.

1. Discover same-origin references on rendered application routes: images and `srcset`, stylesheets, scripts, relevant CSS resources and runtime-inserted media.
2. Resolve references against their source and distinguish real resource URLs from fragments, `data:` URLs and external destinations.
3. Check response status, content type and nonempty content. Verify image decoding; an HTML fallback with status 200 is not a working image.
4. Capture browser console errors and failed requests. Include the referring route or stylesheet in each failure record.
5. Cover image-pipeline URLs as served by Next.js, rather than checking only the source files under `public/`.
6. Verify direct entry, refresh, client navigation, back / forward navigation and unknown-route behavior.
7. Compare all six application routes with the Phase 00 baseline. Shared header, footer, breadcrumbs and current navigation must be consistent while page content remains correct.
8. Exercise reveal and lazy media states by scrolling. A screenshot of the initial viewport alone cannot prove below-the-fold assets load.

If asset discovery needs a new test or utility, name it in the implementation record and add its exact invocation to [Verification](../verification.md). Record the resources discovered from the current application rather than relying on a historical export's inventory.

Deliverable: current route coverage, working discovered assets, clean applicable console / request checks and documented intentional omissions.

## 9. Work package 5.7 — Runtime and release handoff

Develop and verify the Next.js application first. Choose delivery according to the application's actual runtime needs and the user's eventual sharing / public-release requirements; do not constrain development to a static Site output or a second generated application.

1. Record the application's required server behavior, client JavaScript, image pipeline, content access and environment configuration without including secret values.
2. Prepare the production build and local runtime instructions. Record the source revision, framework version, commands and configuration assumptions.
3. When a host is selected, verify that the selected runtime supports the application and its direct routes, assets, client hydration and any genuinely in-scope server behavior.
4. Before a release, test full atmospheric motion, reduced-motion fallback, gallery, keyboard navigation and the demo form in that deployed runtime.
5. Confirm that the deployed form still displays “Demo complete. Nothing was sent.” and does not transmit or persist entered values.
6. Keep publication, domain and access changes separate from implementation and local verification. Record any unresolved delivery decisions as release work with clear status.

An unresolved host decision does not block website development or invalidate a verified local application build. Report implementation readiness and deployment readiness separately.

Deliverable: reproducible application build / runtime instructions and a concrete release handoff. Add deployed-runtime evidence when a host and release scope have actually been selected.

## 10. Work package 5.8 — Application checks and completion record

Read the current package scripts and test prerequisites in the Next.js checkout. Run applicable checks after implementation:

```powershell
npm run typecheck
npm test
npm run build
npm run test:browser
```

Record actual command results and any unmet environment requirement. Do not introduce credentials or claim live integrations merely to close a local check.

- Verify route-level content and production-build rendering, including populated and absent packaging / care data.
- If CMS fields changed, verify schema compatibility and missing / populated states. Record any migration or publication work separately.
- If commerce presentation changed, verify enabled / disabled states, product data, cart errors and checkout handoff with the existing test setup. Keep unperformed live commerce checks explicit.
- Verify the demo form does not transmit or persist user-entered values. Its completed preview must not be counted as a received inquiry.
- Recheck the full atmospheric motion path and reduced-motion path after consolidating global providers and dialogs.
- Record application runtime requirements and any remaining host / release decisions. Do not add a preview-app maintenance or static-export gate.

Phase 05 closes when the active Next.js implementation passes the shared gates, every preceding phase has a recorded outcome, and unavailable content remains omitted under D02. Record the implementation version, tested routes / devices, command results and remaining defects.

Local / test verification, deployment, live integration acceptance and physical service readiness are separate statuses. Documentation completion does not imply that any of those implementation outcomes has already occurred.
