# BETA-0.0.1 content and asset requirements

[Stage plan](stage-BETA-0.0.1.md) | [Decisions](decisions-and-inputs.md) | [Verification](verification.md)

**Status:** Planning inventory, checked against local sources on October 24, 2026. Existing assets enable design work; they do not verify manufactured product facts.

## Content contract

Associate copy, measurements, imagery, and care with stable garment slugs such as `nyx-overcoat` and `hypnos-dress`. Facts belong to one garment or an explicitly identified shared service.

For every new factual field, record:

| Field | Requirement |
| --- | --- |
| Entity/field | Garment slug and property, such as `liningComposition`; do not reuse across garments by default. |
| Value/unit | Separate raw values/units from display formatting. |
| Evidence | User confirmation, product record, garment label, supplier specification, or another named source. |
| Status | `confirmed`, `unknown`, or `development-fixture`. Inherited demo copy starts unverified. |
| Approved use | Whether the value may appear in the beta visitor interface. |
| Date/source note | Supply date and limitations. |

Fit this contract into the existing application's content/types layer. Proposed field names describe requirements, not an implemented schema or another runtime store.

Only confirmed factual fields render. Omit unknowns rather than replacing them with plausible numbers or luxury copy. Development fixtures stay in development/tests and never appear in the shared visitor interface.

Label a crop as a crop. Digital enlargement is not optical detail. CSS texture is decoration, not evidence of a fabric weave.

## Product audit

| Area | Current limitation | Action |
| --- | --- | --- |
| Nyx materials | Inherited design copy describes double-faced wool and silk lining without attached manufacturing evidence. | Seek confirmation before final display. Do not substitute invented cupro, provenance, weight, or buttons. |
| Hypnos materials | Inherited copy describes silk. | Maintain an independent record; do not apply Nyx wool care. |
| Colors and sizes | Samples or fixtures do not establish actual availability. | Omit unsupported public options; test interaction with isolated fixtures. |
| Dimensions and fit | Previous examples supplied unsupported exact numbers. | Require real measurements and approved fit advice. |
| Appointments and swatches | No confirmed location, availability, recipient, or dispatch service. | Only an explicitly labeled demo interaction; no fictional cities or shipment promise. |
| Packaging, delivery, repairs | Production/service specifications are unconfirmed. | Omit the corresponding benefits and instructions. |

Existing brand documents provide context. A historical “existing” or “ready” label in those documents is not evidence for a new product/service assertion.

## Asset inventory and gates

The active asset source is the rebuilt Next.js application in `website/`. Application file paths here are relative to that directory unless linked to the shared artwork library.

| ID | Asset | Source/status | Use and fallback |
| --- | --- | --- | --- |
| A01 | Hero/archive photographs | **Not present in the rebuilt app.** Previous app images were lost with the source. | Request approved Onéra photography. Do not copy images from the Ziva Lagos visual reference. Until then, keep decorative CSS art clearly non-photographic. |
| A02 | Detail/fabric photograph | **Not present in the rebuilt app.** | Defer garment detail/gallery modules until approved, correctly associated images are supplied. |
| A03 | Wordmark | `website/public/brand/onera-wordmark-white.svg`; [artwork and specification](../../../artifacts/wordmark/). | Preserve glyphs, weight, spacing, and proportions. Keep wordmark geometry separate from display-type experiments. |
| A04 | Display and italic fonts | `website/src/app/layout.tsx` loads Cormorant Garamond and Manrope with `next/font/google`; source font files from the lost app were not recovered. | Verify actual loaded styles/features and decide whether to retain build-time Google font loading or use approved local licensed files. Do not assume ligature/numeral support. |
| A05 | Authentic macro photographs | **Required input; not supplied.** | Defer macro view; keep accurate current imagery/crops. |
| A06 | Garment interior/label photography | **Required input; not supplied.** | Omit unavailable views, thumbnails, and captions. |
| A07 | Ambient video/poster | **Required input; not supplied.** Former example filenames are not real footage. | Use the still hero until approved media meets Phase 03 gates. |
| A08 | Packaging image/specification | **Required input; not supplied.** | Omit unsupported claims and imagery. Meaningful confirmed text may form a text-only module; a visual ceremony needs its approved image. Omit an empty module. |

Historical files may supply useful originals if their provenance is verified. There is no dependency on maintaining, regenerating, or migrating the retired preview app.

The client-provided Ziva Lagos site is a layout reference only. Its text, photographs, logo, product data, and promotional offer are not Onéra assets or content.

## Asset intake

1. Record source, permitted use, garment/subject association, approval, and stable descriptive name.
2. Keep original masters separate from delivery derivatives. Do not overwrite canonical artwork while optimizing website assets.
3. Record dimensions, aspect ratio, size, format, alt text, and responsive derivatives. Fonts also need family/style/weight and source/license notes.
4. For video, record duration, encoding, file size, poster, still fallback, and decorative/informative purpose. Informative media needs its own accessible-content plan.
5. Update application asset coverage and verify references from the actual build, including CSS, responsive image candidates, fonts, posters, and conditional modules.
6. Test absence and decode/loading failures. Optional missing media must not leave broken frames or unusable controls.

## Completion record

Each phase lists confirmed facts, omitted fields, fixture limitations, and deferred modules. A deferred module is not tested or complete.

Do not generate convincing product proof, supplier details, packaging commitments, or service terms to close an input gate. The user's omission policy is the fallback.
