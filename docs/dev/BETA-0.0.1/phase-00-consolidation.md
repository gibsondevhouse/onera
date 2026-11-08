# Prerequisite 00: Application baseline

[Stage plan](stage-BETA-0.0.1.md) | [Decisions](decisions-and-inputs.md) | [Verification](verification.md)

**Status:** Planned — implementation not started.  
**Purpose:** Establish a recoverable, understood baseline for the one application that will become Onéra's website.

## 1. Confirmed source

The Next.js application at `C:\Users\chris\Onéra` is the sole development target under D01. The user chose to build what is needed and forget the preview app.

`Z:\onera\web-app-onera` has no active backlog, migration requirement, synchronization command, or acceptance role. Its files are retained as historical material; removing files or relocating the real application is not needed for this work.

`Z:\onera\docs` remains the planning workspace. References to source code do not move that code.

## 2. Work package 00.1 — Recoverable source state

1. Read the application's `AGENTS.md`, nested instructions, package scripts, and relevant installed Next.js guides.
2. Inspect source-control state and preserve unrelated edits. Record the actual branch/revision or recoverable source snapshot; do not assume the checkout is clean or Git-managed.
3. Inventory environment requirements using the example/configuration and safe presence checks. Do not print secret values or connect live services.
4. Establish a recoverable baseline before broad source changes. Keep evidence outside generated build directories.
5. Record the application root, runtime commands, available dependencies, and any existing source/configuration risks.

Deliverable: a short baseline record, preserved state, and a list of unrelated changes or environmental constraints.

## 3. Work package 00.2 — Runtime and checks

Run applicable checks using [Verification](verification.md) and capture their actual output. Existing scripts provide:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server, configured for port 3000. |
| `npm run typecheck` | TypeScript checking. |
| `npm test` | Existing meaningful application/commerce policy tests. |
| `npm run build` | Production application build. |
| `npm run start` | Serve the built application. |
| `npm run test:browser` | Existing Playwright suite; inspect server/fixture configuration first. |

Avoid duplicate server processes and occupied ports. Use a recorded alternative port only when needed. Distinguish a baseline failure from a regression. Framework/type/build failures should be resolved before accepting dependent changes; do not reframe them as successful checks.

Deliverable: known-good local runtime or a precise failure record, with baseline type/test/build results.

## 4. Work package 00.3 — Route, data, and component inventory

| Route or area | Existing source to inspect | Baseline questions |
| --- | --- | --- |
| Home | `src/app/page.tsx`, `src/components/hero-stagger.tsx` | Collection data, hero structure, empty state, interactive needs. |
| Collections | `src/app/collections/page.tsx`, `src/app/collections/[slug]/page.tsx` | Real links, look anchors, garment routing. |
| Garments | `src/app/garments/[slug]/page.tsx` | Per-garment content, media, gallery/viewer requirements. |
| Shared shell | `src/app/layout.tsx`, `src/components/header.tsx`, `src/components/footer.tsx`, `src/components/wordmark.tsx` | Provider boundaries, focus, navigation, responsive composition. |
| Content | `src/lib/content.ts`, `src/lib/types.ts`, `src/lib/demo.ts` | Real sources vs fixtures, unknown facts, source/status representation. |
| Images | `public/images/`, `src/components/editorial-image.tsx` | Provenance, garment association, dimensions, responsive delivery. |
| Motion | `src/components/motion-provider.tsx`, `src/components/tonal-cursor.tsx` | Setup/cleanup, pointer preferences, route changes, overlay events. |
| Optional commerce | `src/components/cart-provider.tsx`, `src/components/cart-drawer.tsx`, `src/components/product-purchase.tsx`, `src/lib/commerce-policy.ts` | Disabled mode, data boundaries, existing tests; no activation implied. |

Confirm these files still exist before editing. Proposed components in later phases are planning names; reuse an equivalent existing component when appropriate.

Capture the six existing URLs: home, collection index, The Gate of Horn, Nyx Overcoat, Hypnos Dress, and philosophy. Note current missing, empty, and error states, not only the ideal content state.

Deliverable: component/route map with retain, extend, replace, or omit decisions tied to the phase backlog.

## 5. Work package 00.4 — Content and interaction baseline

1. Audit current visitor-visible facts against [the content contract](content-and-assets.md). Existing demo copy does not become confirmed because it is in the app.
2. Mark unsupported facts/options for omission. Keep needed development fixtures isolated from the shared visitor interface.
3. Record existing navigation, gallery, focus, and modal behavior at narrow/desktop widths. Build new components from requirements rather than demanding parity with the old preview.
4. Inventory accessible native behavior and preserve it through enhancement.
5. Identify shared integration contracts for paper tokens, garment data, motion hooks, and overlay ownership before parallel Phase 02/03 work.

Deliverable: documented baseline plus an implementation map that lets Phase 01 proceed without another architecture question.

## 6. Delivery follows requirements

The app's server/client/data requirements determine its delivery runtime. Do not add a static export or another frontend just to reuse a former sharing setup.

During later release preparation, evaluate a compatible host, including ChatGPT Sites where supported. Prove the actual runtime/build, deep links, client behavior, assets, service boundaries, and intended visitor access. If adaptation is required, document it before changing deployment configuration.

Core application development does not wait for this hosting evaluation. This planning task does not publish, choose a paid host, change access, or reuse the old Site manifest automatically.

## 7. Exit gate

- [ ] Canonical application path and recoverable source state recorded.
- [ ] Unrelated work preserved and baseline failures separated from new work.
- [ ] Runtime, dependencies, routes, content sources, and provider/component boundaries understood.
- [ ] Actual type/test/build results recorded, with unresolved failures clearly identified.
- [ ] Unsupported content identified for omission; fixtures isolated.
- [ ] Existing browser behavior and initial responsive evidence captured.
- [ ] Shared ownership/contracts for Phases 01–04 recorded.
- [ ] No second app, static-export gate, or preview migration backlog introduced.

Application baseline verification unlocks the dependent phases. Hosting and publication remain separate release work.
