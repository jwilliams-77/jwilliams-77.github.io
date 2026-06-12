# jwilliams-77.github.io

Joel Williams' product design portfolio: a hand-coded static site (plain HTML, CSS, and a little vanilla JS, no build step) served by GitHub Pages from the repo root.

- `index.html` is the landing page; project pages live in `projects/`; `about.html` holds the about copy and contact block.
- One shared stylesheet at `assets/css/styles.css` (dark "midnight" theme; design tokens at the top). Its `<link>` tags carry a `?v=N` cache-busting query, bump N when the stylesheet changes.
- `assets/js/main.js` runs the experience accordion.
- Images live in `assets/images/<project>/`, videos in `assets/videos/<project>/` (short muted looping MP4s with poster frames). Raw exports stay in `_raw/`, which is gitignored.
- `CLAUDE.md` is the build brief and source of truth for copy and design rules. `PROGRESS.md` tracks what's done and what's next.

To preview locally: `python3 -m http.server 8000` from the repo root, then open http://localhost:8000.
