# Progress

Last updated: June 16, 2026

## Done

- Full site built per CLAUDE.md: index, about, and all five project pages, with the locked copy placed verbatim.
- Midnight design system in one shared `assets/css/styles.css` (tokens, hairlines, mono labels, 1140px content column, mobile breakpoint at 700px).
- Experience accordion wired in `assets/js/main.js` (real buttons, aria-expanded, keyboard operable, collapsed by default).
- Resume linked (`resume.pdf` in root) and LinkedIn/GitHub URLs live on every page.
- All media processed and placed: images batch-resized and compressed (raw exports preserved in `_raw/`, gitignored), videos converted to muted looping web MP4s with poster frames.
- Favicon (JW monogram) and og link-preview image generated in the site style; og:image points at the absolute live URL.
- Layout polish round with Joel:
  - Featured Focus Puck tile is a side-by-side card: exploded render on a white panel beside the caption.
  - Three-up work grid at 320px with per-tile fit treatments (crop window, contain, white panel for transparent renders).
  - Project page prose sits in a centered 720px reading column; heroes and figure rows break out to full width.
  - Project heroes render at natural aspect (no pillarbox fill).
  - Home hero enlarged (220px headshot, 48px name).
  - Race couch warehouse clip re-encoded with a deflicker filter.
  - Skills stripe extended: CATIA, FMEA, Fusion (CAM), C++.
  - "ME 2110 Robot" renamed to "Competition Task Robot" (tile, page title, h1); URL stays `projects/me2110.html`.
  - Stylesheet links carry a cache-busting version (`styles.css?v=N`, currently v=20). Bump the number whenever styles.css or main.js changes.
- Motion and interaction pass (all CSS-driven where possible, all gated by `prefers-reduced-motion`):
  - Tile hover preview: image blurs and recedes while a short teaser rises into the frame; teaser copy is in `index.html`. Dimming is done entirely through the overlay so white-panel tiles stay seamless.
  - Home hero + skills stripe have a staggered on-load entrance; the about page reuses the same entrance.
  - Selected work, just-for-fun, and experience sit blurred and dimmed (a "peek") on load and are non-clickable until cleared. A fixed "view work" button fades in after the hero settles; the first scroll, or clicking it, clears the peek and reveals each section as it enters view. Clicking glides down with a custom eased scroll (~900ms in `main.js`).
  - Project pages: each content block fades and rises as it scrolls into view.
- Contact split into its own page and About expanded:
  - New `contact.html` holds only email and LinkedIn (no GitHub), plus a résumé download button. The `contact` nav link points to it on every page.
  - About page has new two-paragraph copy, a résumé download button, and an `interests` stripe (Photography, Video editing, Weightlifting, Basketball, Guitar) reusing the skills-stripe styling. The old contact block is gone.
  - New `.resume-download` button component (hairline border, mono lowercase `download résumé ↓`, accent on hover), on both About and Contact, links to `resume.pdf` with the `download` attribute.
- CLAUDE.md fully synced to the built site: new about copy and interests stripe, contact page, résumé button, nav target, the skills list, robot rename and category tags, the tile hover teasers, and a Motion and interaction subsection. No em dashes anywhere.
- Polish pass: contact page rebuilt as a centered layout (heading, accent rule, intro line, two side-by-side Email/LinkedIn cards with flat icon chips, centered résumé button); "view work" cue is bright near-white text with no box and a blue hover; tile tease border made an opaque near-white so it reads identically over white-panel and photo tiles. Skills stripe extended with Python and the "Rapid prototyping" pill shortened to "Prototyping" (12 pills).
- Capitalization pass: UI labels switched from all-lowercase to Title Case (nav links, hero eyebrow, hero/footer links, section labels, category tags, the "View Work" cue, résumé button, footer copyright). Done by setting Title Case text in the markup and flipping `text-transform: lowercase` to `none` on those classes. Project metadata lines and Core Skills lines on the project pages were then Title Cased too (proper nouns and acronyms preserved), and the hero location switched to "Atlanta, GA". Only figure captions and the experience date ranges remain lowercase. CLAUDE.md typography rule, label references, and the §7 metadata/core-skills content synced. Stylesheet at `styles.css?v=22`.
- Race Couch project page: timeline expanded to "Aug 2023 to Dec 2023" and a Core Skills line added (Arduino, C++, SolidWorks, 3D Printing, Rapid Prototyping, System Integration); CLAUDE.md §7.10 synced.

## Next

- Blue Origin accordion: confirm with manager whether the full copy (program names) is cleared; the softened NDA-safe version is live and the full bullets live in CLAUDE.md section 7.5. There's a marker comment in index.html.
- Push to GitHub and confirm Pages serves from the repo root; then click through the live site on a phone and check that link previews pick up the og image.
- Unused spare images kept in the repo: `assets/images/me2110/me2110-2.jpg` (labeled drivetrain) and `assets/images/race-couch/race-couch-2.jpg` (wiring photo). Swap in or delete later.
- When the Fin Tabs rocket flies (integration slated for early Fall 2026), update "Where it stands" with launch results.
