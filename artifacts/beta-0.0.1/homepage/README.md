# Home page build evidence — 8 November 2026 (second pass: Ziva layout clone)

Screenshots of the placeholder build of the Onéra home page (`website/`), taken in the Claude desktop browser pane from the local dev server after the page was restructured to mirror zivalagos.com section for section.

Checks that passed on this build: `npm run typecheck`, `npm run lint`, `npm run build` (routes `/`, `/collections`, `/info`, `/philosophy` static); no horizontal overflow at 1392 or 375; header 96 px with the menu on one row at 1392; sticky header hides on scroll down and returns on scroll up; mobile drawer opens with nested menus, traps focus, closes on Escape; newsletter forms end with "Demo complete. Nothing was sent."

| File | View |
| --- | --- |
| desktop-1392-01 … 06 | Header + hero, new-in grid, season grid, slideshow, shop the look, newsletter + footer |
| mobile-375-01 … 04 | Header + hero, grid, slideshow, open drawer |

Compare with the reference captures in `artifacts/reference/zivalagos/full-page/`.
