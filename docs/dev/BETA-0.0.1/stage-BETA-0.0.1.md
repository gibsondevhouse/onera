# Stage BETA-0.0.1 — Luxury UI transformation

[DevPlan master](../README.md) | [Stage index](README.md) | [Documentation root](../../README.md)

**Status:** Expanded implementation plan — website work not started under this stage.  
**Updated:** October 24, 2026.  
**Application:** `C:\Users\chris\Onéra` — Next.js is the sole development target.

## 1. Intended outcome

Develop Onéra's website with a tactile editorial canvas, truthful garment information, rich accessible galleries, atmospheric motion, and complete demo hospitality flows. Build the application needed and select hosting that supports it.

The user has explicitly retired the separate preview app from development. The folder `Z:\onera\web-app-onera` remains historical material, not a second application to maintain or a dependency that must be migrated before work begins. There is no required static export or preview parity gate.

## 2. Confirmed direction

| Decision | Requirement |
| --- | --- |
| D01 — application | One Next.js application; no parallel preview development. |
| D02 — facts | Omit unconfirmed garment facts, locations, service promises, and production claims. |
| D03 — forms | Complete local demo interactions ending with “Demo complete. Nothing was sent.” |
| D04 — palette | Alabaster `#F7F6F2`, olive `#413E07`, existing wordmark. |
| D05 — motion | Full atmospheric treatment, including smooth scrolling and a custom cursor, with accessible fallbacks. |
| D06 — delivery | Runtime follows application requirements; evaluate compatible hosting/sharing for release. |

[Decisions and inputs](decisions-and-inputs.md) records the user's answers and feature-level missing information. No further architecture choice is needed to expand or begin these application work packages.

## 3. Scope

Included: application baseline, shared shell, typography/tokens, garment content contracts, gallery/viewer, responsive behavior, motion lifecycle, local demo forms, asset discovery, application checks, and release handoff.

Conditional on confirmed inputs: macro/interior imagery, material/fit measurements, garment-specific care, packaging presentation, and ambient video. Their absence removes only the dependent visitor module.

Separate release work: live appointments, email delivery, accounts, inventory commitments, payments, shipping/repair services, production CMS operations, domain launch, and external publication. Preserve existing disabled-commerce behavior and meaningful tests. Do not activate infrastructure merely because it exists in the original code.

## 4. Work packages and dependencies

| Package | Deliverable | Depends on | Current state |
| --- | --- | --- | --- |
| [00 — Application baseline](phase-00-consolidation.md) | Recoverable source state, runtime, route/data inventory, known failures, implementation map. | Access to existing application. | Planned. |
| [01 — Sensory canvas and typography](phase-01-sensory-canvas-typography/README.md) | Tokens, genuine font styles/features, editorial hierarchy, stable shared shell. | 00 source/runtime baseline. | Planned. |
| [02 — Garment detail and fabric inspection](phase-02-haute-pdp-fabric-haptics/README.md) | Content model, gallery/viewer, conditional confirmed specifications and fit. | 00 and 01; facts/assets where used. | Planned; individual content/media modules input-dependent. |
| [03 — Atmospheric motion](phase-03-atmospheric-motion-pacing/README.md) | Lenis/GSAP lifecycle, weighted cursor, route entry, optional video. | 00 and 01 stable layout. | Planned; video input-dependent. |
| [04 — Hospitality and selection](phase-04-hospitality-clienteling-archive/README.md) | Shared demo concierge, inquiry states, clear selection language. | 01 tokens, 02 garment context, 03 overlay coordination. | Planned. |
| [05 — Care, packaging and final verification](phase-05-unboxing-ceremony-finishing/README.md) | Conditional confirmed content, integrated QA, runtime verification, handoff. | Accepted core from 00–04; care/packaging inputs where used. | Planned. |

Execution order: 00 → 01 → (02 and 03) → 04 → 05. Phases 02 and 03 may overlap after agreeing ownership of shared markup, data, and motion hooks. Integrate shared-shell changes sequentially.

## 5. Shared engineering contracts

### Application source

- Author application behavior in React/TypeScript using existing server/content boundaries.
- Reuse existing route, content, motion, and commerce policies. Proposed filenames are checked against the actual checkout before creation.
- Do not execute legacy vanilla scripts against React-owned DOM or copy rendered snapshot HTML into source.
- Read the application's instructions and installed framework guides before version-sensitive work.
- A useful historical design or asset can be reused deliberately; the old preview is not an acceptance target.

### Visual foundation

- Define semantic tokens for paper, ink, line, elevated surface, muted surface, and focus. Apply them to body, shell, sections, dialogs, and controls.
- Preserve dark olive sections and readable reversed text; the paper decision does not require every surface to be identical.
- Keep the wordmark's glyphs, accent, weight, spacing, and proportions. Optional OpenType features apply only where supported and legible.
- Reserve media dimensions and keep controls/text usable at narrow widths and increased text sizes.

### Content

- Follow [the content contract](content-and-assets.md): per-field sources/status, independent garment records, unknowns omitted, fixtures isolated.
- Source code is evidence of current display, not proof of real product specifications.
- Do not invent photography, fit advice, materials, salon locations, shipping benefits, or repair promises.
- Missing content removes its module without broken frames, dead controls, or misleading measurements.

### Interaction and motion

- Keep normal link/history behavior, keyboard paths, visible focus, modal focus return, and native touch scrolling.
- Give each enhancement one managed lifecycle. Clean up animation frames, observers, listeners, media, and ScrollTriggers on route/preference changes.
- Coordinate overlay scroll locks and release them on every close path.
- Keep native cursor usability when enhancement is unavailable or inappropriate.
- Demo forms validate and provide review/completion states locally. They never imply a received request, booking, dispatch, or email.

### Delivery

- Build the runtime required by the site. There is no requirement to regenerate the previous static preview.
- Verify the built application independently from the development server.
- Evaluate hosting and ChatGPT Sites compatibility during release preparation. A passing Next build does not establish compatibility with every host.
- Preserve an existing Site's identity/audience if it is deliberately reused later; inspect current state in that publishing task.
- Hosting selection does not block local feature development. Do not claim publication or visitor access from local results.

## 6. Verification and completion

Use [the verification plan](verification.md) for commands, route/viewport coverage, interactions, performance targets, and evidence.

Core acceptance requires:

1. The six existing route families and selected new interactions work in the canonical application and its built runtime.
2. Palette/type/layout pass responsive and keyboard checks; full motion passes normal/reduced-motion lifecycle checks.
3. Unknown facts and development fixtures are absent from visitor content.
4. Demo forms clearly state nothing was sent and transmit/persist no entered personal data.
5. Applicable type checks, meaningful tests, application build, browser checks, and discovered-asset checks pass. Baseline failures and environment limitations remain explicitly unresolved.
6. Each phase records changed files, results, representative evidence, omitted content, asset deferrals, and limitations.

Use these status boundaries:

| Status | Meaning |
| --- | --- |
| Planned | Work described; no implementation or acceptance evidence yet. |
| In progress | Implementation started; acceptance incomplete. |
| Blocked on input | A specific module needs an identified missing input. Other work may continue. |
| Verified | Included work passed its acceptance gates against an identified source/build. |
| Deferred | Excluded module and reason recorded; not counted as verified. |
| Core beta verified | All included core work passes; optional modules remain explicitly deferred. |
| Production ready | Separate acceptance covers real services, content, operations, deployment, and audience. |

Do not describe the entire stage as fully complete while selected modules remain unimplemented. A local build or a shared URL alone does not establish a functioning production service.

## 7. Handoff

Start at 00, record the actual source state and baseline, then execute small reviewable packages. Keep status and evidence current.

This documentation update expands and reconciles the plan. It does not itself implement or publish the website.
