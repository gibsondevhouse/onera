# 9. Design Assets

[← Brand Voice](08-voice-and-messaging.md) | [Start Here](01-START-HERE.md) | [Next: Project Status →](10-project-status.md)

---

[Documentation index](../README.md)

**Status:** Inventory of what exists. Final asset package in development.

---

## Wordmark Files

These are the ready-to-use versions of your logo. Use SVG when you can (it scales forever); use PNG when a raster image is needed.

### Current wordmarks

| Asset | SVG version | PNG version |
| --- | --- | --- |
| Olive wordmark (transparent background) | [SVG](../artifacts/wordmark/onera-wordmark.svg) | [PNG](../artifacts/wordmark/onera-wordmark.png) |
| White wordmark (transparent background) | [SVG](../artifacts/wordmark/onera-wordmark-white.svg) | [PNG](../artifacts/wordmark/onera-wordmark-white.png) |

**Note:** The white version needs a dark or colored background to show up.

---

## Design Files & References

These are the source files and specs—where the magic lives:

| File | What it is | How you'll use it |
| --- | --- | --- |
| [Wordmark specification](../../artifacts/wordmark/wordmark-spec.json) | Technical specs for the logo (fonts, spacing, colors, size) | Reference when sizing or reproducing the mark |
| [SVG export script](../../artifacts/wordmark/export-wordmark.py) | Python script that exports the logo | If you need to regenerate files |
| [Wordmark render script](../../artifacts/wordmark/render-wordmark.mjs) | JavaScript that displays and tests the logo | Testing how it looks in different contexts |
| [Validation record](../../artifacts/wordmark/wordmark-validation.json) | Records of logo testing | Reference for quality checks |
| [Nine-panel color display](../artifacts/logo-display/onera-logo-display-3x3.png) | Your logo in 9 color combinations | Reference for color explorations |
| [Display specification](../../artifacts/logo-display/logo-display-spec.json) | Technical details of the color display | Reference |
| [Preview website README](../../web-app-onera/README.md) | How the design preview website works | If you want to edit the website |
| [Website styles](../../web-app-onera/dist/assets/site.css) | Current colors and type treatments | The web version of your brand |

---

## The Original Application

Your wordmark is also built into the Onéra application itself. If you need to make changes or understand how it's integrated:

- **Location:** `C:\Users\chris\Onéra`
- **Logo component:** `src/components/wordmark.tsx`
- **Font setup:** `src/app/fonts.ts`

---

## What You're Building Next

These are the assets and deliverables tracked across the brand:

- [x] **Wordmark vector package** (SVG and high-res PNG for Olive `#413E07` and White `#FFFFFF`)
- [x] **Wordmark technical spec** ([wordmark-spec.json](../../artifacts/wordmark/wordmark-spec.json))
- [x] **Color palette specifications** ([logo-display-spec.json](../../artifacts/logo-display/logo-display-spec.json))
- [x] **Web styling & typography system** ([site.css](../../web-app-onera/dist/assets/site.css))
- [x] **Interactive design preview site** ([web-app-onera/README.md](../../web-app-onera/README.md))
- [ ] **Physical garment label & hang tag production files** (CMYK, bleed, fabric tag specs)
- [ ] **Packaging templates** (unboxing tissue, boxes, thank you stationery)
- [ ] **Digital social media templates** (Instagram editorial grid, story frames)
- [ ] **Print lookbook template** (high-res layout for seasonal collections)

---

## Asset Guidelines & Answers

1. **Where the wordmark lives:** On digital touchpoints (header/footer), garment interior woven labels (neck/waistband), hang tags, and appointment stationery.
2. **Printing on dark vs. light fabrics:** The Olive wordmark (`#413E07`) is used on pale linen, ivory silk, and limestone paper. The White wordmark (`#FFFFFF`) is used on dark wool, charcoal lining, and olive boxes.
3. **Manufacturer & print requirements:** Physical tags require vector EPS/PDF with converted outlines, Pantone Solid Uncoated color matches (Olive), and 3mm bleed margins.

---

[← Brand Voice](08-voice-and-messaging.md) | [Start Here](01-START-HERE.md) | [Next: Project Status →](10-project-status.md)
