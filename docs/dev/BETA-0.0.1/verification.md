# BETA-0.0.1 verification and evidence

[Stage plan](stage-BETA-0.0.1.md) | [Decisions](decisions-and-inputs.md) | [Content and assets](content-and-assets.md)

**Status:** Acceptance requirements for future implementation. This planning update does not record these checks as passed.

## 1. Target and evidence

Verify the rebuilt Next.js application in `website/`, in development and in its actual built runtime. The old preview app and its QA scripts are not acceptance targets.

Record source revision/recoverable snapshot, configuration, browser, viewport, and build. Do not describe a server as running without checking it. Store future evidence under `artifacts/beta-0.0.1/<phase>/` at the repository root.

Before changes, capture baseline routes/screenshots, meaningful check results, and known failures. Separate pre-existing problems from regressions. Read local instructions, installed framework guides, package scripts, and browser-test configuration before changing implementation.

## 2. Command gates

From the repository root, run applicable checks for the app:

```sh
npm --prefix website run typecheck
npm --prefix website run lint
npm --prefix website run build
```

There is no browser suite configured yet. Add one with the first interactive feature; do not claim historical preview QA as current-app acceptance.

Use `npm --prefix website run dev` for development. Verify the built application with `npm --prefix website run start` after a successful build; stop/reuse the development server or record an appropriate alternative port. Do not run both against the same port.

Run relevant checks after each work package, then the full applicable checks for integrated stage acceptance. A static snapshot check cannot substitute for TypeScript, application build, or browser behavior.

## 3. Route and viewport matrix

| Route | Main coverage |
| --- | --- |
| `/` | Hero/collection content, any selected carousel controls, motion, continuation navigation, empty state. |
| `/collections` | Real collection links, reading order, active navigation, empty state. |
| `/collections/the-gate-of-horn` | Look anchors, garment links, media/reveals. |
| `/garments/nyx-overcoat` | Gallery/viewer/zoom, confirmed content/options, demo inquiry. |
| `/garments/hypnos-dress` | Independent content/care and gallery; no copied wool claims. |
| `/philosophy` | Reading hierarchy, shared shell, conditional content. |

Inspect 320, 375, 767, 768, 1024, and 1440 CSS-pixel widths. Adjacent 767/768 checks exercise the breakpoint boundary. Include a short landscape viewport, text zoom, and long-content cases.

Verify no document horizontal overflow, clipped controls/text, broken media, duplicate main landmarks, or unreadable navigation. Reserve media dimensions and use sensible headings. Save representative interactive states, not only landing-page screenshots.

Verify the approved dark-only theme on every route and interactive state. Test contrast for text, icons, controls, borders, and focus indicators on each surface, and confirm the rendered palette does not switch with `prefers-color-scheme`.

## 4. Interaction acceptance

| Area | Cases |
| --- | --- |
| Navigation | Direct deep links, ordinary/modified click, new tab, hash links, Back/Forward, focus, sticky-header anchor offset, scroll restoration. |
| Collection controls, when included | Named buttons, keyboard controls, active state, boundaries, narrow scrolling, visible focus; no forced auto-advance. |
| Gallery | Thumbnail selection, accurate captions, viewer open/close, previous/next, zoom/pan limits, focus return, repeated open/close. |
| Dialogs | Initial/contained focus, Escape, close button, focus/scroll restoration, small-screen scrolling, safe areas, nested-overlay policy. |
| Demo form | Empty/invalid input, correction, review, edit, completion, reset/cancel/reopen; explicit “nothing sent” result. |
| Content | Unknowns omitted, fixtures absent, independent garment data, no invented services/locations/currencies. |
| Failure states | Empty content, unavailable facts, media failure, enhancement failure; native navigation and readable content remain. |

Verify touch behavior on a touch-capable environment where available. Mouse simulation does not establish physical-device touch acceptance; state untested device behavior explicitly.

For demo forms, inspect requests and storage: no contact payload leaves the browser, no email is opened/sent, no booking exists, and no entered details appear in URLs, browser storage, or analytics. Component memory may hold the current demo and is cleared according to Phase 04.

## 5. Motion and performance

- Full-motion mode delivers the selected atmosphere without delaying links, validation, or controls. Native touch and keyboard scrolling remain usable.
- Reduced motion presents readable content immediately, retains the native cursor, disables inertia/reveals, and uses still media. Changing the preference tears down active work.
- Repeated route/dialog cycles leave one managed lifecycle, with no accumulating RAF loops/listeners/ScrollTriggers or leaked scroll locks.
- Pause decorative video offscreen and while the tab is hidden; expose a pause control. Missing/failed footage leaves the still hero.
- Measure unexpected cumulative layout shift separately from deliberate user-requested disclosure. An accordion opening is not prohibited layout movement.
- Proposed lab targets: CLS at most 0.1 and LCP at most 2.5 seconds on a recorded mobile profile; no persistent console/runtime errors or sustained input/animation stalls. Record actual device/network conditions and measurements. These are targets, not current results or field guarantees.
- Inspect traces for repeated setup, long tasks, and frame drops. Tune motion rather than treating slowness itself as quality. Hidden-tab effects must not keep unnecessary work active.

## 6. Asset discovery

Check references in the actual application/build, not a historical saved inventory:

1. Cover public/emitted files, CSS `url()`, responsive image candidates, fonts, video sources/posters, and conditional modules.
2. Exercise states that trigger lazy/conditional requests. Capture failed requests, content-type mismatches, and decoding errors.
3. Check nonempty assets, image natural dimensions, font style loading, video fallback, and useful failure states.
4. Verify root/deep-link requests against the built runtime. HTML fallback with status 200 is not a successful image/script response.
5. Keep any new test/utility invocation documented here and attach its actual output.

No preview synchronization, snapshot regeneration, or preview parity is required.

## 7. Runtime and release handoff

Verify the application first. Hosting is selected for its server/client/data requirements; it does not impose another app or mandatory static export.

A later release task evaluates host compatibility, including ChatGPT Sites where appropriate. Verify the actual deployment build/runtime, client behavior, deep links, assets, service configuration, and intended visitor access. Read the current hosting workflow, retain existing identity/audience if deliberately reusing a Site, and record the returned version/URL.

Local success does not establish deployment or operational service acceptance. This planning task does not package, push, publish, or change access.

## 8. Phase evidence

Each handoff records:

- Changed source files and reason.
- Checks actually run, results, baseline failures, and environmental limits.
- Representative screenshots and interaction evidence.
- Content sources, omissions, and asset deferrals.
- Browser/device limits and untested cases.
- Per-package status: planned, in progress, blocked on input, verified, or deferred.

Core scope may be verified with explicitly deferred optional media. The deferred module is not marked complete, and production readiness requires a separate operational release.
