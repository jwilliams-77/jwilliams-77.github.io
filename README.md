# jwilliams-77.github.io

Joel Williams' product design portfolio: a hand-coded static site (plain HTML, CSS, and a little vanilla JS, no build step) served by GitHub Pages from the repo root.

- `index.html` is the landing page; project pages live in `projects/`; `about.html` holds the about copy and an interests stripe; `contact.html` holds email and LinkedIn. About and Contact each have a résumé download button.
- One shared stylesheet at `assets/css/styles.css` (dark "midnight" theme; design tokens at the top). Its `<link>` tags carry a `?v=N` cache-busting query, bump N whenever `styles.css` or `main.js` changes.
- `assets/js/main.js` runs the experience accordion, the project preview modals, and the motion: tile hover previews, on-load entrances, and the scroll-reveal / "view work" peek on the home page. All motion is gated behind `prefers-reduced-motion`, and content is hidden/blurred only via JS so non-JS visitors still see everything.
- Clicking a work tile opens an in-page preview modal (a skimmable "mini project page" with a `Read More` link to the full page), cloned from per-project `<template>` blocks in `index.html`. Tiles keep their `href` as a no-JS fallback.
- Images live in `assets/images/<project>/`, videos in `assets/videos/<project>/` (short muted looping MP4s with poster frames). Raw exports stay in `_raw/`, which is gitignored.
- `CLAUDE.md` is the build brief and source of truth for copy and design rules. `PROGRESS.md` tracks what's done and what's next.

To preview locally: `python3 -m http.server 8000` from the repo root, then open http://localhost:8000.
