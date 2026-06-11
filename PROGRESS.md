# Progress

Last updated: June 11, 2026

## Done

- Full site built per CLAUDE.md: index, about, and all five project pages, with the locked copy placed verbatim.
- Midnight design system in one shared `assets/css/styles.css` (tokens, hairlines, mono labels, 1140px content column, mobile breakpoint at 700px).
- Experience accordion wired in `assets/js/main.js` (real buttons, aria-expanded, keyboard operable, collapsed by default).
- Resume linked (`resume.pdf` in root) and LinkedIn/GitHub URLs live on every page.
- All media processed and placed:
  - Images batch-resized to web size and compressed (24MB of raw exports down to 7.5MB). Transparent CAD renders kept as PNG, everything else JPEG.
  - Videos converted from .MOV to muted, looping, autoplaying web MP4s with poster frames (83MB down to 8.8MB). Originals preserved in `_raw/` (gitignored).
  - Project page layouts rearranged around the real assets, with portrait media getting a narrower centered treatment instead of being cropped.

## Next

- Add `assets/images/favicon.png` and `assets/images/og.png` (the link tags already point there).
- Blue Origin accordion: confirm with manager whether the full copy (program names) is cleared; the softened NDA-safe version is live and the full bullets live in CLAUDE.md section 7.5. There's a marker comment in index.html.
- Push to GitHub and confirm Pages serves from the repo root; then click through the live site on a phone.
- Optional: `assets/images/me2110/me2110-2-alt.png` is an unused duplicate drivetrain render, swap it in or delete it.
- When the Fin Tabs rocket flies (integration slated for early Fall 2026), update "Where it stands" with launch results.
