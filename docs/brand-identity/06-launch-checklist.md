# 6. Launch Checklist & Questions

**Track what's needed before launch. Post questions and concerns here.**

[← Design Foundation](05-design-foundation.md) | [Start Here](01-START-HERE.md) | [Next: Visual Identity →](07-visual-identity.md)

---

## Pre-Launch Checklist

Everything that needs to happen before Onéra launches. Check boxes as you complete each item.

---

### Brand Foundation (Completed?)

- [ ] Aesthetic vision finalized (Part 1 answers complete)
- [ ] Customer profile defined (Part 2 answers complete)
- [ ] Origin story & belief articulated (Part 3 answers complete)
- [ ] Foundation document written and approved

**Blocker or note:** ___________________________________________________________________

---

### Visual Identity (Completed?)

#### Color System
- [ ] Core palette finalized (primary + secondary colors)
- [ ] Colors tested on actual garments/fabrics
- [ ] Hex, RGB, CMYK, and Pantone values documented
- [ ] Color spec sheet created
- [ ] Accessible color combinations verified

**Blocker or note:** ___________________________________________________________________

#### Typography
- [ ] Display typeface selected and licensed
- [ ] Body typeface selected and licensed
- [ ] Font files obtained and installed
- [ ] Size hierarchy established (headings, body, labels)
- [ ] Usage guide written

**Blocker or note:** ___________________________________________________________________

#### Photography & Art Direction
- [ ] Photography mood/aesthetic finalized
- [ ] Reference images collected (3–5 minimum)
- [ ] Photographer brief written
- [ ] Sample shots approved
- [ ] Post-production/editing style defined

**Blocker or note:** ___________________________________________________________________

#### Layouts & Applications
- [ ] Website layout designed and coded
- [ ] Garment label/tag layout finalized
- [ ] Packaging design finalized
- [ ] Social media templates created
- [ ] Email template created

**Blocker or note:** ___________________________________________________________________

---

### Brand Voice & Messaging (Completed?)

- [ ] Brand voice defined (adjectives documented)
- [ ] One-line description written
- [ ] Short introduction (40–60 words) written
- [ ] Brand story (150–250 words) written and approved
- [ ] Primary tagline chosen
- [ ] Garment description templates written
- [ ] Customer care tone/examples documented
- [ ] Writing conventions guide created

**Blocker or note:** ___________________________________________________________________

---

### Design Assets (Completed?)

#### Wordmark
- [x] Final wordmark artwork finalized (Cormorant Garamond Light, weight 300, 0.12em tracking)
- [x] SVG file created (scalable: `artifacts/wordmark/onera-wordmark.svg` and `onera-wordmark-white.svg`)
- [x] PNG files exported (multiple sizes: `onera-wordmark.png`, `onera-wordmark-white.png`)
- [x] White version created and tested on colors (`onera-light-dark-proof.png`)
- [x] Usage guidelines documented (`artifacts/wordmark/wordmark-spec.json`)

**Note:** Digital vector wordmarks are validated and ready in `artifacts/wordmark/`. Physical print dies/stamps to be prepared with manufacturer.

#### Digital Assets
- [x] Logo files organized and named in `artifacts/wordmark/`
- [x] Color palette files exported ([logo-display-spec.json](../../artifacts/logo-display/logo-display-spec.json))
- [x] Web fonts loaded and optimized (`dist/_next/static/media/*.woff2`)
- [x] All font files in place
- [x] Web styles (CSS) finalized (`dist/assets/site.css`, `collections.css`, `gallery.css`, `social.css`)

**Note:** Static preview assets fully bundled in `web-app-onera/dist/`.

#### Print Assets
- [ ] Label artwork files created (production-ready)
- [ ] Packaging artwork finalized
- [ ] All files in correct color mode (CMYK for print)
- [ ] Bleed and safety areas marked
- [ ] Fonts outlined/embedded for printing

**Blocker or note:** Awaiting supplier specifications for label dimensions and packaging carton dielines.

#### Deliverables
- [ ] Brand style guide/visual identity document (PDF)
- [x] Logo usage and technical spec sheet ([wordmark-spec.json](../../artifacts/wordmark/wordmark-spec.json))
- [x] Color display matrix ([logo-display-spec.json](../../artifacts/logo-display/logo-display-spec.json))
- [ ] Typography style guide
- [ ] Photography direction brief
- [ ] Social media template specs

**Blocker or note:** Technical asset specifications are complete in `artifacts/`; marketing PDF guides pending brand team.

---

### Technical Implementation (Completed?)

- [x] Website live and functional (Running locally on `http://127.0.0.1:3002` via `serve-preview.mjs`)
- [x] Logo placed correctly on website (Responsive header wordmark and footer display)
- [x] Brand colors applied across site (Olive `#413E07`, White `#FFFFFF`)
- [x] Typography rendering correctly (Cormorant Garamond & Manrope)
- [x] Responsive design tested (Verified at 320px, 767px, and 1440px with 0 overflow in `qa-browser.json`)
- [x] Links and navigation working (Breadcrumbs, collections carousel, look navigation, gallery modal)
- [ ] Email templates set up
- [ ] Social media accounts created with correct logo/branding

**Blocker or note:** Local static design preview is fully functional and QA verified. Next.js / Sanity / Shopify production deployment and live domain routing remain to be connected from `C:\Users\chris\Onéra`.

---

### Production & Manufacturing (Completed?)

- [ ] Label artwork approved by manufacturer
- [ ] Packaging artwork approved by supplier
- [ ] First samples received and approved
- [ ] Color accuracy verified (label, packaging, garment tags)
- [ ] Print quality acceptable
- [ ] Production specs finalized with suppliers

**Blocker or note:** ___________________________________________________________________

---

### Launch Readiness (Completed?)

- [ ] All documentation finalized
- [ ] Brand story and voice consistent across all touchpoints
- [ ] Photography/imagery ready to use
- [ ] Website ready for launch
- [ ] Initial collection photographed and described
- [ ] Social media content calendar started
- [ ] Press materials prepared
- [ ] Customer communication (welcome email, packaging inserts, etc.) written
- [ ] Internal team briefed on brand guidelines

**Blocker or note:** ___________________________________________________________________

---

## Questions & Concerns

Use this section to post questions, ideas, or blockers. Track decisions and next steps.

---

### Question 1

**Asked by:** [Your name or date]

**Question:** ___________________________________________________________________

___________________________________________________________________

**Answer/Decision:** ___________________________________________________________________

___________________________________________________________________

**Status:** ☐ Open | ☐ Answered | ☐ Decision made

---

### Question 2

**Asked by:** [Your name or date]

**Question:** ___________________________________________________________________

___________________________________________________________________

**Answer/Decision:** ___________________________________________________________________

___________________________________________________________________

**Status:** ☐ Open | ☐ Answered | ☐ Decision made

---

### Question 3

**Asked by:** [Your name or date]

**Question:** ___________________________________________________________________

___________________________________________________________________

**Answer/Decision:** ___________________________________________________________________

___________________________________________________________________

**Status:** ☐ Open | ☐ Answered | ☐ Decision made

---

### Question 4

**Asked by:** [Your name or date]

**Question:** ___________________________________________________________________

___________________________________________________________________

**Answer/Decision:** ___________________________________________________________________

___________________________________________________________________

**Status:** ☐ Open | ☐ Answered | ☐ Decision made

---

## Blockers & Decisions Needed

Track anything that's blocking progress or needs a decision.

| Blocker/Decision | What's holding us up? | Who decides? | Timeline |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |

---

## Notes & Breakthroughs

Jot down thoughts, ideas, or important realizations as you move through the project.

___________________________________________________________________

___________________________________________________________________

___________________________________________________________________

___________________________________________________________________

---

## Last Updated

**Date:** _______________

**What changed:** ___________________________________________________________________

---

[← Design Decisions](decisions.md) | [Start Here](01-START-HERE.md)
