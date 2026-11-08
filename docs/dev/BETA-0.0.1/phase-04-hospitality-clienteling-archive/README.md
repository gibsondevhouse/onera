# Phase 04: Hospitality, Demo Inquiries & Selection

[← Stage BETA-0.0.1](../stage-BETA-0.0.1.md) · [Decisions & inputs](../decisions-and-inputs.md) · [Content & assets](../content-and-assets.md) · [Verification](../verification.md)

**Status:** Planned — implementation not started.  
**Goal:** Build a complete, accessible inquiry demonstration with honest outcomes and clear garment context.

## 1. Scope and entry gates

This phase depends on [Phase 00 application baseline](../phase-00-consolidation.md), Phase 01's visual foundation, Phase 02's garment context, and Phase 03's overlay and motion rules. The user confirmed Next.js as the sole application. Build the needed website directly in that application.

| Decision | Current direction | Effect here |
| --- | --- | --- |
| D01 — website foundation | Next.js is the sole application, confirmed by the user | One implementation and acceptance target |
| D02 — unconfirmed content | Omit until real details are supplied | No invented studios, service availability, delivery benefits or response promises |
| D03 — form workflow | Complete demo flow; nothing is sent | Local validation and explicit preview result; no email or submission integration |
| D04 — palette | Alabaster direction confirmed | Use Phase 01's approved surface tokens |
| D05 — motion | Full atmospheric direction confirmed | Use Phase 03's motion and accessible fallback rules |
| D06 — delivery | Select a compatible delivery route for the application when needed | No static export or second app is required to develop this phase |

The existing Next.js application contains optional commerce code; its current footer does not contain this inquiry section. Add the demo to that application while preserving disabled commerce and the absence of a connected request destination.

The demo demonstrates an interaction. It must not suggest that an appointment was requested, a swatch was dispatched, or a staff member received the entered details.

## 2. Existing and proposed file map

The active implementation root is `C:\Users\chris\Onéra`. Read its `AGENTS.md` and current framework guidance before writing code. Existing paths below are relative to that checkout; proposed files are named as code until created.

| Next.js source | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Mount the shared demo-inquiry provider once for the site |
| `src/components/footer.tsx` | Add a truthful demo entry point; this section is absent from the current React footer |
| `src/components/motion-provider.tsx` | Coordinate overlay scroll and full atmospheric motion |
| `src/app/garments/[slug]/page.tsx` | Pass garment context into the inquiry entry point |
| `src/components/header.tsx`, `cart-drawer.tsx`, `product-purchase.tsx`, `cart-provider.tsx` | Conditional refinement of existing commerce presentation |

Proposed files: `src/components/concierge-provider.tsx` for shared open / close and garment-context state, and `src/components/concierge-dialog.tsx` for the accessible client dialog. Keep the provider's state local to the current browser session, with no storage or network adapter. Use the shared stylesheet or established styling approach selected in Phase 01.

Mount the React dialog once at the shared application level so both garment actions and the footer can open it. The old preview may supply optional historical design evidence; it is not an implementation, migration or parity requirement.

## 3. Work package 4.1 — Demo content contract

Record the approved demo labels and unresolved service inputs in [Content & assets](../content-and-assets.md).

1. Label the entry point and dialog as a preview, such as “Explore the inquiry form — demo.” Put “Demo only. Nothing you enter is sent or saved” before the fields.
2. Remove unsupported claims about physical studios, client advisors, private residence visits, scheduling, response times or fulfillment.
3. Do not present unavailable services as working requests. A garment inquiry can demonstrate how garment context passes into a form without claiming that a real team is available.
4. If swatch interest is included as an optional demonstration, label it “Swatch interest — demo only” and explain that no swatch request or dispatch occurs. Otherwise omit it.
5. Keep unanswered service questions in the register, outside the public-facing demo copy. Real details can replace the omitted content later through an explicit content update.

Deliverable: a content table mapping every visible action to its demo purpose, wording and outcome. No operational service claim is needed for this phase to work.

## 4. Work package 4.2 — Global dialog shell

Build one inquiry dialog per document. Use a native `<dialog>` opened with `showModal()`, a stable accessible title, a real close button and visible keyboard focus.

- The footer button opens the dialog across the six application routes. Give it `type="button"`, `aria-haspopup="dialog"` and the matching `aria-controls` value.
- Mount one client dialog through the shared provider. Client navigation, rerenders and development remounts must not duplicate listeners, dialog IDs or stored opener references.
- Retain the exact opening control. On open, focus the dialog title or first meaningful field while keeping the demo notice discoverable.
- Tab and Shift+Tab stay inside the modal. Escape and the close button dismiss it. Return focus to the opening control when that control still exists.
- Restore the preceding background scroll state when closed. Keep long dialog content scrollable when a software keyboard reduces the viewport.
- Coordinate with Phase 03's overlay rules. Reuse the existing `onera:overlay` / Lenis convention and `data-lenis-prevent` where appropriate; clean up overlay state when the dialog unmounts or navigation changes.
- Define backdrop dismissal and test it; clicking within the form must not dismiss the dialog accidentally.
- Before hydration or without JavaScript, avoid presenting an actionable control that does nothing. Provide plain preview information or an explicitly designed fallback; do not imply a contact destination exists.
- Prevent unintended stacked dialogs when a garment viewer, size guide or conditional cart is already open.

Deliverable: reliable open, dismiss, focus and scroll behavior before adding submission states.

## 5. Work package 4.3 — Form semantics and demo states

Use example information in this demonstration. Keep values in memory only; no network request, mail handoff, local storage or analytics capture is part of D03.

| Field | Proposed semantics | Validation |
| --- | --- | --- |
| Name | `name="name"`, `type="text"`, `autocomplete="name"` | Optional; persistent visible label |
| Email | `name="email"`, `type="email"`, `autocomplete="email"` | Required for demonstrating validation; guide use of a fictional address |
| Garment | `name="garment"`; slug plus visible title | Prefill from garment action; user can review the context |
| Interest | `name="interest"`; inquiry / optional demo swatch interest | Every option describes a demo, not service availability |
| Message | `name="message"`; labeled `<textarea>` | Optional; defined maximum length and character guidance |

Implement the following state contract:

| State | Visible behavior | Interaction / focus |
| --- | --- | --- |
| Closed | No dialog on screen | Entry point remains keyboard reachable |
| Editing | Fields and demo notice visible | User can enter or revise example information |
| Invalid | Inline field guidance and concise error summary | Preserve values; focus first invalid field |
| Preview complete | “Demo complete. Nothing was sent.” plus no-save guidance | Announce result and focus its heading; keep it visible |
| Edit again | Return to the same entered values during this open session | Focus the first editable field |
| Dismissed | Close and clear the demonstration values | Restore the opening control and scroll state |

Handle the form's `submit` event, prevent default, validate and render the preview result. Use “Preview inquiry” as the submit label. A `method="dialog"` submit that simply closes the form is insufficient because it provides neither a review state nor an honest result.

Required form behavior:

1. Use explicit labels, `name` attributes and suitable input types. Placeholders supplement labels rather than replacing them.
2. Associate help and error text with fields using stable IDs. Update `aria-invalid` only for invalid fields.
3. Preserve entered values after validation failure. Explain how to correct the input without implying that it reached a server.
4. Treat entered text as text. Do not interpolate it into HTML when rendering the review result.
5. Avoid a simulated “sending” spinner or invented network delay. The demo validates locally and then shows its result.
6. Keep result content within the dialog. A separate “Edit example” control returns to editing; “Close demo” dismisses and clears it.
7. Closing with Escape, the close button or allowed backdrop action follows the same cleanup policy. Tell users that closing clears the example if needed.

Deliverable: every state can be reached and reviewed, including invalid email, completed preview, edit-again and clean reopen. Confirm in browser network inspection that the form does not transmit its values.

## 6. Work package 4.4 — Garment context and optional swatch interest

Add secondary actions beside garment information only after the main PDP controls remain usable.

1. “Explore inquiry — demo” opens the dialog with the garment title, slug and inquiry interest already set. The visible context must match Nyx or Hypnos correctly.
2. Optional demo swatch interest uses the same dialog, with a visible explanation that it does not request or dispatch a sample. Do not collect a postal address.
3. Omit real swatch request, booking and contact actions until the relevant service and destination details are supplied under D02.
4. Returning from the dialog preserves gallery and scroll context plus any confirmed garment selection. Unsupported color, size and fit samples are omitted from the visitor interface under D02; exercise their interaction design only through isolated development fixtures.
5. Use buttons for dialog actions and links for actual navigation. Give similar actions distinguishable accessible names when their garment context differs.
6. Test repeated opens from the footer and from each garment action; previous garment context must not leak into a later unrelated demo.

Deliverable: correct context on both garment routes, no unavailable service promise, and no regression in existing product exploration.

## 7. Work package 4.5 — Conditional selection and checkout language

This package applies to the existing optional Next.js commerce UI when commerce presentation is included in the agreed scope. Keep its enabled / disabled configuration intact.

- Preserve recognizable shopping meaning. “Selection” may be used for a shopping cart; an editorial “Archive” label needs a clear accessible explanation if retained.
- Keep “Continue to checkout” when the action opens Shopify checkout. Do not rename it as a reservation or atelier delivery service without that separate workflow.
- Quantity controls can be restyled or changed to a labeled select after a design choice. Preserve quantity limits, busy states, removal, unavailable items, prices and totals.
- Cover empty, populated, updating, failed and unavailable states. Keep errors visible and announced.
- Recheck focus and scroll behavior when the cart and demo inquiry dialog are opened in succession.

Deliverable: calm, clear wording with the transaction's actual meaning preserved. No commerce connection or credential changes follow from the demo-form decision.

## 8. Work package 4.6 — Conditional money formatting

For in-scope commerce UI, format the amount and `currencyCode` returned by the commerce system using `Intl.NumberFormat`. Use a consistent locale policy for product prices, line totals and cart totals. Check long amounts and supported zero-decimal currencies as applicable.

A currency / market selector is outside this formatting package. It needs store-market support, buyer context, product queries, cart repricing, persistence and checkout-currency behavior. Do not create a selector by changing symbols around unchanged amounts.

Deliverable: prices and totals format returned money consistently, and disabled commerce remains unavailable. The demo inquiry does not invent product prices or currencies.

## 9. Validation and completion evidence

Use the shared [verification matrix](../verification.md), then record this phase's results.

| Scenario | Required evidence |
| --- | --- |
| Global entry point | Open / close on all six Next.js application routes; one shared dialog instance and provider |
| Keyboard and focus | Tab / Shift+Tab, Escape, close, invalid field, result announcement and focus restoration |
| Small viewport | Usable at 320px and 375px, enlarged text and reduced height; no horizontal overflow |
| Demo outcome | Invalid input, preview result, edit-again, clear-on-close and clean reopen |
| No transmission | No form payload, mail draft, storage write or external request containing entered values |
| Garment context | Nyx and Hypnos prefills; footer starts without stale garment data; confirmed selections survive dismissal |
| Content | Demo notices present; unavailable services and unconfirmed facts omitted |
| Shared shell | Footer and global dialog render across all routes; client navigation and remounts do not duplicate handlers |
| Conditional commerce | Existing applicable tests plus cart, quantity, removal, errors and checkout handoff checks |

Run the applicable commands from the Next.js checkout after implementation, using its current scripts:

```powershell
npm run typecheck
npm test
npm run build
npm run test:browser
```

Add meaningful browser coverage for the new state contract and no-transmission behavior. Record any unavailable environment prerequisite honestly. Apply Phase 05's discovered-reference coverage and keep local interaction evidence separate from live-service acceptance.

Phase 04 closes when the Next.js application passes the matrix and the demo's outcome is clear throughout. A future deployed runtime must retain that behavior, but selecting or proving a host is not a prerequisite to developing the form. Real service activation, deployment and operational acceptance remain separate work.
