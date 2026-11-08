# 11. Design & Development Decisions

[← Project Status](10-project-status.md) | [Start Here](01-START-HERE.md)

---

[Documentation index](../README.md)

When you make a choice about the brand identity or development architecture, record it here—including *why* you chose it and what changed as a result. This keeps the thinking clear and the history traceable.

---

## Decision Log

| ID | Date | Decision | Why (The thinking behind it) | What changed |
| --- | --- | --- | --- | --- |
| B-001 | 2026-10-24 | Organize brand identity in `docs/brand-identity/` | Gives you a central place to develop and evolve the visual and verbal identity. | Created documentation structure. |
| DEV-001 | 2026-10-12 | Standalone static preview architecture (`web-app-onera/`) | Allows fast local visual inspection and UI interaction on port 3002 without requiring Next.js dev server or Sanity/Shopify backend dependencies. | Created `serve-preview.mjs`, `snapshot-report.json`, and static HTML/CSS dist bundle. |
| DEV-002 | 2026-10-18 | Component synchronization pipeline | Enables editing shared navigation header and footer in one place (`components/header.html` and `footer.html`) and propagating across all 6 static routes without a client runtime framework. | Created `scripts/sync-components.mjs`. |
| DEV-003 | 2026-10-18 | Vector wordmark specification (`wordmark-spec.json`) | Encodes exact glyph coordinates and 0.12em tracking into scalable SVG assets (`onera-wordmark.svg`, `onera-wordmark-white.svg`) to prevent font-loading layout shift. | Generated SVG and PNG vectors in `artifacts/wordmark/`. |
| DEV-004 | 2026-10-18 | WAI-ARIA accessible dialog & gallery architecture | Ensures accessibility compliance with modal focus traps, Escape key dismissal, focus restoration, and keyboard navigation for collection carousel and swatches. | Verified in `artifacts/frontend-refinement/qa-browser.json`. |

---

## Decisions In Progress

These are the big choices currently being defined:

| Topic | Where it's tracked | Status |
| --- | --- | --- |
| **What Onéra feels like to wear** (aesthetic, materials, signature details) | [Design Foundation](05-design-foundation.md) | Defining (Brand team) |
| **Visual identity standards** (wordmark usage, color on garments, photography mood) | [Visual Identity](07-visual-identity.md) | Defining (Brand team) |
| **How Onéra sounds** (voice, tagline, how to describe garments) | [Voice & Messaging](08-voice-and-messaging.md) | Defining (Brand team) |
| **Physical production assets** (labels, packaging, hang tag dies) | [Design Assets](09-design-assets.md) | Planning (Production team) |

---

## How to Use This Document

**When you make a design choice:**

1. Add it to the Decision Log above with an ID (B-002, B-003, etc.)
2. Write the date and the specific decision
3. Explain *why* you chose it (what was the reasoning? what problem were you solving?)
4. Note which document or asset changed as a result

**When you change your mind:**

1. Add a *new* entry (don't edit the old one)
2. Reference the earlier decision ID (e.g., "Supersedes B-005")
3. Explain what changed and why

This way, you have a complete story of how the brand evolved.

---

## Example Format

Here's what a filled-in entry might look like:

| ID | Date | Decision | Why | What changed |
| --- | --- | --- | --- | --- |
| B-002 | 2026-10-28 | Wordmark appears on inside label only, not front exterior | Keeps garments clean and minimal; wordmark shows on tags where customers expect it | Added usage guideline to Visual Identity |
| B-003 | 2026-11-05 | Supersedes B-002: Wordmark on front as small stamp on shoulder seam | Customer feedback—they want to know it's Onéra at a glance; small placement keeps aesthetic clean | Updated Visual Identity usage guide and label templates |

---

## Questions to Help You Decide

When you're stuck between two directions, ask:

1. **Does this serve the wearer?** (Not just you, not just the aesthetic—does it make sense for the person wearing it?)
2. **Is this true to the vision?** (Does it align with what Onéra is about, or am I compromising?)
3. **Can I explain it in one sentence?** (If you can't, it might be too complicated.)
4. **What happens if I change my mind later?** (Some decisions are easy to redo; some are expensive or permanent. Know the cost.)
5. **What would the next designer do?** (If someone had to carry this forward, would it be clear why you chose this?)
