# BETA-0.0.1 decisions and inputs

[Stage plan](stage-BETA-0.0.1.md) | [Content and assets](content-and-assets.md) | [Verification](verification.md)

Updated: November 8, 2026. This register records the user's answers and the replacement application decision. The site is under development; no external services are connected and nothing is published.

## Confirmed decisions

| ID | Topic | Direction | Basis and state |
| --- | --- | --- | --- |
| D01 | Application source | Rebuild one Next.js application in this repository's `website/` directory. Do not use the former static preview as source. | **Updated November 8, 2026: confirmed by user after the prior source was lost with their deactivated ChatGPT account.** This is the sole active application. Existing documentation and brand artifacts remain at the repository root; no old app migration or preview parity gate applies. |
| D02 | Unconfirmed content | Omit unconfirmed garment facts, locations, services, packaging benefits, delivery terms, and repair promises. | **Confirmed by user.** Unknown fields are absent from visitor content; fixtures do not become product claims. |
| D03 | Forms | Complete demo interactions ending with **“Demo complete. Nothing was sent.”** | **Confirmed by user.** No request endpoint, email sending, booking, or persistence is part of this beta. |
| D04 | Palette and theme | Dark-only website; retain olive `#413E07` and the existing wordmark. | **Updated November 8, 2026: confirmed by user on behalf of the client.** Do not offer a light/dark toggle or follow the visitor's system preference. Define and verify the dark surface palette in Phase 01; exact surface colors remain an implementation decision to document and validate. This defines website presentation, not manufacturing specifications. |
| D05 | Motion | Full atmospheric motion, including smooth scrolling and a custom cursor. | **Confirmed by user.** Reduced motion, native touch behavior, keyboard access, cleanup, and performance are acceptance requirements. |
| D06 | Delivery | Build the application/runtime needed; evaluate compatible hosting and sharing during release preparation. | **Confirmed direction.** ChatGPT sharing does not impose a static-only requirement. No duplicate app, mandatory static export, or former-preview hosting constraint. Specific host compatibility still needs proof before deployment. |
| D07 | Visual reference | Model the storefront structure on the client-provided Ziva Lagos website while keeping Onéra's identity and dark-only theme. | **Confirmed by user on November 8, 2026.** Use high-level patterns such as an announcement strip, centered wordmark, clear navigation, editorial lead, and collection-led sections. Do not copy its text, images, branding, or promotional offer. Do not show unconfirmed product details or nonfunctional search/cart controls; the lack of approved product imagery is an explicit current constraint. |

The user's answers do not establish garment specifications, inventory, studio locations, shipping coverage, or service capacity. All architecture choices needed to expand the application plan are settled; the remaining inputs affect specific features or a later release.

## Feature inputs that can wait

Do not make all development depend on these answers. Build the supported interface and omit unavailable content under D02.

| Input | Needed from | Required before | Behavior while unavailable |
| --- | --- | --- | --- |
| Composition, lining, closures, mill origin, weight | User or their named product source | Displaying each factual specification | Omit that field. Existing code is not product evidence. |
| Real colors/sizes, measurements, model details, fit advice | User or verified product records | Displaying actual choices or sizing guidance | Hide unsupported choices/advice. Use isolated development fixtures for interaction QA. |
| Genuine macro/interior/label photography | User or approved asset source | Enabling those gallery views | Keep accurate existing imagery/crops, with provenance recorded. |
| Garment-specific care | User, garment label, or approved product source | Showing care instructions | Omit instructions for that garment. |
| Packaging specification and photograph | User or supplier | Displaying factual packaging copy or its image, respectively | Omit unsupported copy/imagery. Meaningful confirmed text may appear without a photo; otherwise omit the module and record a deferral. |
| Approved ambient footage and poster | User or approved asset source | Enabling hero video | Keep the existing still hero; other motion proceeds. |
| Real inquiry destination, service terms, response owner | User | A later connected-form release | Keep the confirmed demo flow. |
| Host/domain, CMS workflow, live payments | User after a technical release proposal | Production release | Keep services disabled; develop and verify the application locally. |

## Ownership and changes

- The user owns brand, product, service, and audience decisions.
- The implementing agent owns technical proposals, component/data boundaries, fallbacks, and evidence.
- Record a changed answer here before changing dependent requirements. Date it and distinguish user direction from an implementation proposal.
- Do not infer product facts from samples or unanswered questions.
- Ask a narrow question when a missing answer blocks the dependent feature; continue independent work.

## Scope boundaries

This beta develops the website frontend and local demo interactions. Live appointments, message delivery, accounts, stock promises, payments, refunds, and fulfillment require separate implementation and acceptance.

Preserve existing CMS/Shopify disabled modes and meaningful tests. Their presence is not permission to add credentials or activate services.

The old preview folder is historical material. No new preview maintenance, regeneration, mandatory migration, or duplicate build is planned. Do not delete it or move the real application as part of this documentation task.

A passing local build or shared URL does not establish operational production readiness.
