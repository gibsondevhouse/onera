# Phase 03: Atmospheric Motion & Pacing

[Back to Stage BETA-0.0.1](../stage-BETA-0.0.1.md) | [DevPlan Master](../../README.md)

**Status:** Planned — implementation not started  
**Goal:** Deliver the selected full atmospheric motion direction, including smooth scrolling and a custom cursor, while keeping navigation and controls responsive.  
**Planning baseline:** October 24, 2026. This document describes proposed work; it does not certify implemented behavior.

## 1. Decisions and prerequisites

Use the shared [decisions and inputs](../decisions-and-inputs.md), [content and asset register](../content-and-assets.md), and [verification plan](../verification.md).

| Input | Required before | Work that may proceed without it |
| --- | --- | --- |
| **D01: Confirmed** — Next.js is the sole application | Implementation uses the application's recorded working directory | Preparing the Next.js work packages below |
| [Phase 00 application baseline](../phase-00-consolidation.md) complete | Implementing this phase against a verified application baseline | Auditing current interactions and lifecycle contracts |
| **D05: Confirmed** — full atmospheric motion, smooth scrolling, and custom cursor | Timing and visual review of the selected work | Lifecycle and fallback design |
| **D04: Confirmed alabaster**; Phase 01 typography and focus acceptance still pending | Final visual review | Lifecycle and fallback design |
| **D06: Runtime follows application requirements** | Release hosting compatibility review | Core application implementation and runtime checks |
| Approved video, poster, rights, placement, and encoding budget in the asset register | Adding any video source or download | Keeping the existing hero image |
| Approved interactive targets and labels | Enabling cursor labels | Auditing existing links and gallery controls |

Build the motion system in the sole Next.js application. The preview app is retired from development. D01 and D05 are settled and no longer block implementation planning. Ambient video remains conditional on approved assets; its absence does not block completion of the selected motion system. Under D02, omit unconfirmed claims and imagery; do not invent footage or a broken placeholder URL.

## 2. Existing application behavior

- The Next.js app already has a pathname-aware `MotionProvider`, Lenis/GSAP cleanup, focused-content reveals, and an overlay event that stops and starts Lenis.
- Its `TonalCursor` is restricted by pointer and motion preferences, follows `[data-cursor]` targets, and removes listeners when its pathname effect is cleaned up.
- Server-rendered content remains available when motion cannot initialize. Preserve that readable baseline.
- No ambient video is currently supplied in the application's public assets. Existing hero photography is the fallback.

Recheck these facts immediately before implementation. Phase 00 establishes the application baseline; this phase extends it. Build the runtime required by the application. Sites hosting compatibility may be evaluated for release without blocking core motion work or requiring another app or static export.

## 3. Target file map

Paths for proposed files are planning names; create them only when the corresponding module is selected.

| Application target beneath `C:\Users\chris\Onéra\` | Planned responsibility after Phase 00 |
| --- | --- |
| `src/components/motion-provider.tsx` | Tune existing Lenis/GSAP behavior while retaining setup, scope, and teardown |
| `src/components/tonal-cursor.tsx` | Weighted pointer interpolation and cursor lifecycle |
| `src/components/tonal-cursor.module.css` | Cursor size, positioning, visibility, and preference fallback |
| `src/app/globals.css` | Shared timings and CSS reduced-motion behavior |
| `src/app/layout.tsx` | Mount client enhancement within the existing shell |
| `src/components/hero-stagger.tsx` and `src/app/page.tsx` | Deliberate home-only hero media integration |
| Proposed `src/components/route-reveal.tsx` | Pathname-aware entry reveal; persistent layout alone is insufficient |
| Proposed `src/components/ambient-video.tsx` | Optional client playback policy with cleanup |
| Proposed `public/media/` assets | Approved encodings and poster only; final filenames come from the asset register |
| `tests/browser/editorial.spec.ts` | Preserve existing navigation, overlay, keyboard, and editorial coverage |
| Proposed `tests/browser/motion.spec.ts` | Preference changes, animation lifecycle, focus, history, and media policy checks |

Read the application's `AGENTS.md` and relevant installed Next.js guides before coding. Accept behavior in the running application and its actual built runtime. Record any eventual hosting-specific differences separately during release review.

## 4. Shared interaction and lifecycle contract

1. Content, native links, focus indicators, and keyboard controls work before JavaScript and after enhancement failure.
2. Motion never delays click handling, route loading, scrolling input, form validation, or opening and closing a dialog.
3. Read `prefers-reduced-motion` at startup and observe changes during the session. Disabling motion restores final visible states immediately.
4. JavaScript animations require JavaScript cancellation; CSS overrides alone do not stop RAF loops, GSAP, Lenis, or video.
5. Each controller owns its listeners, observers, animation frame ID, timers, and animation handles. Initialization is idempotent and destruction releases all owned resources.
6. On route cleanup or unmount, cancel frames and timers, disconnect observers, remove listeners, revert animation styles, and destroy owned library instances.
7. On `pagehide`, release active work. On a restored `pageshow`, reinitialize safely once without clearing browser scroll restoration or replaying an obstructive entrance.
8. Pause work while the document is hidden. Resume only effects still allowed by current preferences and visibility.
9. Pointer decoration is `aria-hidden` and `pointer-events: none`. It never replaces the native pointer or the real control's name and focus ring.
10. Keep a small configuration object for enabled effects and timings. Record final values and the reason for them in phase evidence.

## 5. Work package M01 — Establish and tune the motion baseline

**Input gate:** Phase 00 complete. D01 application target and D05 smooth scrolling are confirmed.  
**Output:** Recorded comparison of current behavior and the selected tuning.

1. Capture the home and garment routes with motion enabled and reduced motion enabled before changing anything.
2. Use native wheel, touch, scrollbar dragging, Page Up/Down, Home/End, and anchors as the functional comparison baseline. Smooth scrolling must preserve each input's intended result.
3. Tune the existing Next.js Lenis instance in place. Preserve `syncTouch: false`, anchor support, overlay coordination, ScrollTrigger updates, and cleanup unless a tested requirement changes them.
4. Do not prescribe `1.45s` inertia as a brand requirement. Compare at least the current duration and one restrained alternative; choose the shortest setting that achieves the approved feel without perceived input lag.
5. Retain native touch scrolling and native fallback when motion is disabled or enhancement cannot initialize. Do not add a second scrolling engine.
6. Keep modal and drawer scrolling independent. Background scroll must stop when an overlay opens and resume at its prior position after closing.
7. Preserve focused-content handling: a reveal must never hide a link, field, or heading that has just received focus.

**Acceptance:** No dropped wheel input, unexpected touch interception, broken anchor placement, or background movement beneath an open overlay. Record actual timings; subjective approval alone does not replace these checks.

## 6. Work package M02 — Add cinematic content reveals

**Input gate:** Phase 00 complete and Phase 01 accepted. D05 atmospheric direction is confirmed.  
**Output:** Scoped Next.js reveals with readable fallback.

1. Start with opacity and small translation on nonessential decorative surfaces. Keep the hero heading and primary action immediately readable.
2. Extend the existing Next.js Lenis/GSAP pipeline. Keep one scoped global motion controller with explicit ownership.
3. Keep server-rendered content visible by default. Apply reveal states only after successful client initialization; failures restore readable content.
4. Apply a pending state only after initialization, with an escape path that restores visibility if setup fails. Offscreen content must also become visible on keyboard focus.
5. Reveal once and unobserve completed elements. Do not attach a per-element scroll listener or run a perpetual loop for completed reveals.
6. For Next.js, retain the existing `gsap.context` scope and `context.revert()` cleanup. Adjust presets rather than adding a second global reveal system.
7. Avoid clipping text, focus outlines, labels, or actionable image regions. Do not move layout boxes or alter image dimensions to animate them.

**Acceptance:** All content remains readable with JavaScript disabled, with enhancement initialization forced to fail, and after a live reduced-motion preference change. No reveal hides a keyboard target or causes a layout shift.

## 7. Work package M03 — Weighted custom cursor

**Input gate:** Phase 00 complete. D05 custom cursor is confirmed.  
**Output:** A bounded pointer enhancement over genuine interactive imagery.

1. Enable only while `(hover: hover) and (pointer: fine)` matches, reduced motion is off, and the document is visible. Observe preference and pointer-capability changes.
2. Use explicit targets such as existing `[data-cursor]` links or actual gallery zoom buttons. A whole `.oc-card` is not automatically interactive; sample concept cards must not imply a destination.
3. Keep pointer events updating target coordinates immediately. Initialize current coordinates from the first pointer position to avoid flying in from the top-left corner.
4. Use elapsed time for interpolation so the feel is consistent across display refresh rates. Keep centering independent from positioning and account for any size change.
5. Store exactly one RAF ID. Start only when a target is active; stop when settled, on pointer leave, blur, hidden document, capability change, reduced motion, or destruction.
6. Do not translate the actual link or button toward the pointer. Avoid moving hit targets and labels merely to simulate magnetism.
7. Use labels that match the control's actual action, such as “View image.” Decorative text must not become the only instruction or accessible name.

**Acceptance:** Repeated navigation and pointer entry never create duplicate cursors, listeners, or loops. Coarse pointers and reduced-motion sessions retain normal controls with no cursor decoration or background RAF activity.

## 8. Work package M04 — Route fades

**Input gate:** Phase 00 complete; implement within the confirmed atmospheric direction.  
**Output:** A short Next.js page entry transition that never blocks navigation.

1. Start with a proposed ceiling of 200ms; final timing requires visual review. The fade must not conceal loading failures or keep a transparent layer above controls.
2. Preserve Next.js links and navigation. A plain browser navigation or unsupported transition path must still work immediately.
3. Do not intercept links to run an exit timeout, fetch and replace page HTML, or synthesize a custom history stack. Downloads, external links, fragment links, modified clicks, middle-click, and opening a new tab keep native behavior.
4. Preserve Back/Forward history, restored scroll position, direct deep links, and fragment placement. Do not reset scroll on `pageshow` or force all arrivals to the top.
5. In Next.js, mount a client enhancement deliberately scoped to changing page content. The persistent root layout does not itself provide a new route animation lifecycle.
6. Keep the header and wordmark outside the animated surface where feasible. Preserve framework navigation and focus behavior; do not remount the entire shell to force a fade.
7. Any focus handoff must follow actual navigation completion and retain visible focus. Never move focus on decorative animation completion or when only a hash/history restoration occurs.
8. Disable route fades immediately under reduced motion. Keep the destination visible if support, hydration, or animation setup fails.

**Acceptance:** Test normal and modified links, keyboard activation, direct URLs, fragment links, reload, Back/Forward, and restoration from the browser's page cache. Each destination remains navigable without the enhancement.

## 9. Work package M05 — Optional ambient hero video

**Input gate:** The asset register contains approved footage and poster. D05 permits the atmospheric direction; until assets exist, this conditional module is **Deferred — no approved media** and the existing hero image remains the complete design baseline.  
**Output:** Home-only decorative media with explicit playback control and a complete still-image fallback.

1. Obtain approved imagery, usage rights, subject accuracy, crop/focal point, loop duration, encodings, and a poster before writing a video `src`. Do not use the former illustrative `nyx-courtyard-ambient.mp4` path.
2. Retain meaningful hero image alternative text where the image conveys collection information. Decorative video is not a substitute for editorial content or descriptive copy.
3. Reserve the final aspect ratio before media loads. Preserve the visible poster until playback is ready; decoding failure and blocked playback leave the poster visible.
4. Default to a poster with no video source requested when reduced motion is enabled. A live preference change pauses video and restores the poster immediately.
5. Keep media silent and inline. Start only when the module is allowed, on screen, and the document is visible; handle a rejected playback promise without an error overlay or repeated retries.
6. Provide a visible, keyboard-accessible Play/Pause button with a current accessible label and visible focus. An explicit user pause persists for the current page session and is not reversed by visibility changes.
7. Pause offscreen media using an observer and pause when the document is hidden. Resume only if the visitor has not paused and policy still permits playback.
8. Use a conservative still-image fallback when data-saving information is available. Absence of that signal does not justify eagerly downloading video before the hero is ready.
9. Destroy observers and listeners on cleanup. Stop playback and release resources owned by the module without removing shared poster assets.
10. Register all actual encodings and posters in the asset inventory. Check response status, MIME type, failed decoding, and unsupported-format fallback.

**Acceptance:** Poster-only, reduced motion, manual pause, offscreen pause, background-tab pause, blocked autoplay, missing media, and failed decoding are tested. No invented asset is required to render the home page.

## 10. Proposed performance limits

These are proposed implementation budgets to confirm during baseline review under the shared verification plan; D05 direction is settled. Exceptions require a measured reason recorded with the decision.

| Item | Proposed limit or evidence |
| --- | --- |
| Additional Next.js motion controller code | At most 8 KiB compressed beyond existing Lenis/GSAP dependencies; no duplicate animation library |
| Optional video controller | Home-only; include its code in the additional transfer budget |
| Decorative video | Initial proposal: at most 3 MiB per selected encoding, 1280px wide, 24fps; approve the actual export before loading it |
| Idle work | No recurring cursor RAF or reveal work after settling; no playback offscreen or in hidden tabs |
| Main thread | No new animation-handler task longer than 50ms in the recorded interaction trace |
| Layout stability | No layout shift caused by motion, cursor, route fades, or media insertion |
| Loading | Poster and primary text remain available before optional motion/media; compare cold-load metrics against the recorded baseline |

Record browser, viewport, device or emulation, network/CPU settings, transfer sizes, and traces. A local trace is evidence for that configuration, not a claim of production performance or physical touch testing.

## 11. Verification and exit record

Run the shared [verification matrix](../verification.md) against the running Next.js application and its built runtime, then add the following phase cases:

| Case | Required result |
| --- | --- |
| Startup and live reduced-motion change | Content visible; transforms reverted; custom cursor and any video stopped |
| Keyboard, focus, dialogs, and carousel | Existing controls remain immediate and understandable |
| Fine pointer, coarse pointer, capability change | Cursor policy updates without reload or duplicate resources |
| Ten route changes and repeated overlay open/close | No accumulating listeners, observers, animations, or RAF loops |
| Hidden tab, page exit, and history restoration | Work pauses/cleans up; restored page remains usable |
| JavaScript disabled or setup failure | Native content, links, images, and focus remain available |
| Optional media unavailable or forbidden | Still-image hero remains complete and no source is invented |
| Required widths and selected browsers | No horizontal overflow, clipped focus, hidden controls, or new layout shifts |
| Built runtime and direct deep links | Required client scripts load; smooth scroll, cursor, reveals, route fades, dialogs, and preference handling retain their tested behavior |

Test actual client hydration and motion in the application's production build. Any later Sites release compatibility investigation must test that chosen runtime honestly; it is a release consideration, not a prerequisite to core phase completion or a requirement to create a static duplicate.

Run the Next.js application's existing typecheck, tests, build, and relevant browser checks from its checkout as specified in the shared verification plan. Add targeted lifecycle and preference checks in the browser suite; record any physical-touch or browser coverage still unavailable.

**Exit evidence to complete:** Phase 00 acceptance; D05 implementation record; smooth-scroll/cursor/reveal/fade behavior in the running application and built runtime; build identity; final timings; approved asset IDs or deferred-media decision; changed files; command results; browser/viewport evidence; performance trace; reviewer and date.

**Current exit state:** Not started. D01 confirms Next.js as the sole application; D04 alabaster and D05 full atmospheric motion are confirmed. D06 makes runtime follow application requirements. Conditional video may remain deferred without invented assets; selected motion work with missing evidence remains incomplete.
