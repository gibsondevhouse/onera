# Ziva Lagos reference captures

Captured 8 November 2026 from https://www.zivalagos.com/ for the UI audit in `docs/homepage-reference/01-zivalagos-ui-audit.md` and the clone guide in `docs/homepage-reference/02-homepage-clone-guide.md`.

These images are third-party reference material for internal design study only. Do not reuse them in Onéra assets or publish them.

## Full-page captures (`full-page/`)

Third-party overlays (chat bubble, discount pop-up and discount modal) were hidden before capture so the page structure is unobstructed. Each file is one continuous image of the whole home page.

| File | Viewport | Pixel size | Source | Use it for |
| --- | --- | --- | --- | --- |
| `home-desktop-1440-native.png` | 1440 px wide | 1440 × 8500 | Headless Chrome via DevTools protocol, 1× | Pixel measurement, spacing, type sizes at desktop |
| `home-mobile-390-native@2x.png` | 390 px wide, iPhone user agent, touch | 780 × 16868 (2×) | Headless Chrome via DevTools protocol | Pixel measurement at mobile; divide by 2 for CSS px |
| `home-desktop-1392-browser-pane.png` | 1392 × 924 viewport | 800 × 4796 (0.575×) | Claude desktop browser pane, 10 frames stitched | Visual walkthrough as seen in the pane; not for measuring |
| `home-mobile-375-browser-pane@2x.png` | 375 × 812 viewport | 750 × 16870 (2×) | Claude desktop browser pane, 11 frames stitched | Visual walkthrough at phone size |

Notes on the stitched pane captures: the hero is an autoplaying video, so frames captured seconds apart show different footage and the hero's bottom edge carries a visible seam. The sticky header is in scroll-up mode, so it appears only once at the top. Use the native captures for anything that needs exact pixels.

## Viewport frames (`frames/`)

The individual browser-pane screenshots the stitched images were built from. File names carry the CSS scroll offset (`03-y2772.jpg` = viewport top at 2772 px).

- `frames/desktop-1392/` — 10 frames, 800 × 531 each (0.575× of a 1392 × 924 viewport)
- `frames/mobile-375/` — 11 frames, 750 × 1624 each (2× of a 375 × 812 viewport)

## Section captures (root of this folder)

Earlier viewport screenshots used while writing the audit.

| File | Section |
| --- | --- |
| desktop-01-header-hero.jpg | Announcement bar, header, video hero |
| desktop-02-new-in-grid.jpg | "Shop New In" product grid |
| desktop-03-slideshow.jpg | Slideshow banner with CTAs and arrows |
| desktop-04-collection-list.jpg | "Shop Our Collections" tiles |
| desktop-05-shop-the-look.jpg | Hotspot image and placeholder product card |
| desktop-06-faq-newsletter.jpg | FAQ and newsletter grey blocks |
| desktop-07-footer.jpg | Footer blocks and bottom row |
| mobile-01-header-hero.jpg | Mobile header and hero |
| mobile-02-new-in-grid.jpg | Mobile two-column product grid |
| mobile-03-footer.jpg | Mobile stacked footer |

## Reproducing the captures (`tools/`)

`capture-fullpage.mjs` drives the locally installed Google Chrome in headless mode through the DevTools protocol (Node 22 or newer, no npm dependencies): it loads the page, hides fixed overlays, scrolls through to trigger lazy images and scroll reveals, then captures beyond the viewport at desktop and mobile emulation.

```bash
node artifacts/reference/zivalagos/tools/capture-fullpage.mjs <output-dir> <scratch-chrome-profile-dir>
```

`stitch-frames.swift` joins viewport screenshots into one image given the CSS viewport height, document height and each frame's scroll offset (macOS, CoreGraphics only):

```bash
swift artifacts/reference/zivalagos/tools/stitch-frames.swift out.png 924 8346 0:frame0.jpg 924:frame1.jpg ...
```
