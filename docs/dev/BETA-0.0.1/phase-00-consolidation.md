# Prerequisite 00: Application baseline

[Stage plan](stage-BETA-0.0.1.md) | [Decisions](decisions-and-inputs.md) | [Verification](verification.md)

**Status:** In progress — replacement app scaffolded and initial runtime checks pass; the full route/content inventory remains open.

**Updated:** November 8, 2026.
**Purpose:** Establish a recoverable, understood baseline for the rebuilt application that will become Onéra's website.

## 1. Confirmed source

The prior Next.js application source was lost when the user's ChatGPT account was deactivated. The user chose to start from scratch on November 8, 2026. The replacement Next.js application in this repository's `website/` directory is the sole development target under D01.

The repository root continues to hold planning documents and approved identity artwork. The historical static preview is not used as source, and no preview migration or parity is required.

The fresh scaffold contains no product records, garment photography, commerce integration, or external-service credentials. Only the supplied white wordmark was copied into `website/public/brand/`.

## 2. Work package 00.1 — Recoverable source state

1. Read the application's `AGENTS.md`, nested instructions, package scripts, and relevant installed Next.js guides.
2. Inspect source-control state and preserve unrelated edits. Record the actual branch/revision or recoverable source snapshot; do not assume the checkout is clean or Git-managed.
3. Inventory environment requirements using the example/configuration and safe presence checks. Do not print secret values or connect live services.
4. Establish a recoverable baseline before broad source changes. Keep evidence outside generated build directories.
5. Record the application root, runtime commands, available dependencies, and any existing source/configuration risks.

Deliverable: this baseline record, preserved planning/artwork files, and explicit source-loss and asset limitations.

## 3. Work package 00.2 — Runtime and checks

Run applicable checks using [Verification](verification.md) and capture their actual output. Current app scripts provide:

| Command | Purpose |
| --- | --- |
| `npm --prefix website run dev` | Local development server. |
| `npm --prefix website run typecheck` | TypeScript checking. |
| `npm --prefix website run lint` | ESLint. |
| `npm --prefix website run build` | Production application build. |
| `npm --prefix website run start` | Serve the built application. |
| Not configured | Unit and Playwright browser suites; add focused tests as features are built. |

Avoid duplicate server processes and occupied ports. Use a recorded alternative port only when needed. Distinguish a baseline failure from a regression. Framework/type/build failures should be resolved before accepting dependent changes; do not reframe them as successful checks.

Deliverable: known-good local runtime or a precise failure record, with baseline type/test/build results.

**November 8 baseline:** Next.js 16.4.5, React 19.3.0, TypeScript 5, Tailwind CSS 4. `typecheck`, `lint`, and `build` passed. The built runtime returned HTTP 200 for `/`, `/collections`, and `/philosophy` on port 3035. No unit or browser test suite exists yet. The initial install reported 8 moderate dependency advisories; review before release rather than applying a breaking audit fix automatically.

## 4. Work package 00.3 — Route, data, and component inventory

| Route or area | Existing source to inspect | Baseline questions |
| --- | --- | --- |
| Home | `website/src/app/page.tsx` | Initial editorial hero and house introduction; no product records or photography. |
| Collections | `website/src/app/collections/page.tsx` | Initial collection landing page; collection detail/look routes remain to be built. |
| Philosophy | `website/src/app/philosophy/page.tsx` | Minimal house page; approved brand narrative is still pending. |
| Shared shell | `website/src/app/layout.tsx`, `website/src/components/site-header.tsx`, `website/src/components/site-footer.tsx` | Metadata, skip link, navigation, and shared layout. |
| Visual system | `website/src/app/globals.css` | Dark-only tokens, responsive shell styles, and reduced-motion CSS fallback. |
| Brand asset | `website/public/brand/onera-wordmark-white.svg` | Verified supplied vector wordmark. No garment photographs are present in the new app. |
| Content/data | Not implemented | No CMS, product records, fixtures, or commerce policies have been carried over. |
| Motion and commerce | Not implemented | Existing behavior from the lost app cannot be treated as present or verified. |

Confirm these files still exist before editing. Proposed components in later phases are planning names; reuse an equivalent existing component when appropriate.

The replacement app currently serves home, collections, and philosophy. The former six-route set is not recreated; collection detail and garment routes remain planned, subject to verified content/assets.

Deliverable: component/route map with retain, extend, replace, or omit decisions tied to the phase backlog.

## 5. Work package 00.4 — Content and interaction baseline

1. Audit current visitor-visible content against [the content contract](content-and-assets.md). No product records or demo fixtures were recovered with the old app.
2. Mark unsupported facts/options for omission. Keep needed development fixtures isolated from the shared visitor interface.
3. Record existing navigation, gallery, focus, and modal behavior at narrow/desktop widths. Build new components from requirements rather than demanding parity with the old preview.
4. Inventory accessible native behavior and preserve it through enhancement.
5. Identify shared integration contracts for dark-theme tokens, garment data, motion hooks, and overlay ownership before parallel Phase 02/03 work.

Deliverable: documented replacement baseline plus an implementation map. Phase 01 is underway against the new app; content, product routes, and assets remain incomplete.

## 6. Delivery follows requirements

The app's server/client/data requirements determine its delivery runtime. Do not add a static export or another frontend just to reuse a former sharing setup.

During later release preparation, evaluate a compatible host, including ChatGPT Sites where supported. Prove the actual runtime/build, deep links, client behavior, assets, service boundaries, and intended visitor access. If adaptation is required, document it before changing deployment configuration.

Core application development does not wait for this hosting evaluation. This planning task does not publish, choose a paid host, change access, or reuse the old Site manifest automatically.

## 7. Exit gate

- [x] Canonical application path and recoverable source state recorded; prior application loss documented.
- [ ] Unrelated work preserved and baseline failures separated from new work.
- [x] Runtime, dependencies, initial routes, content sources, and current component boundaries understood.
- [x] Actual type/lint/build and built-runtime smoke results recorded; absent test suites and dependency advisories identified.
- [x] Unsupported product/service content is absent; there are no development fixtures.
- [ ] Existing browser behavior and initial responsive evidence captured.
- [ ] Shared ownership/contracts for Phases 01–04 recorded.
- [ ] No second app, static-export gate, or preview migration backlog introduced.

Complete the remaining route, asset, content, and viewport inventory before considering the full baseline gate satisfied. Hosting and publication remain separate release work.
